import { parse } from "node:path"

import { error } from "@postfmly/logger"
import { type Nullable } from "@postfmly/types"

import {
  AttachmentBuilder,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  type HexColorString,
  InteractionContextType,
  MessageFlags,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
  type SlashCommandStringOption
} from "discord.js"
import { digits, nonEmpty, pipe, type SafeParseResult, safeParse, string, trim } from "valibot"
import { find } from "zipcodes-us"

import { bucket } from "../../utils/bucket.ts"
import { env } from "../../utils/env.ts"

const { COLOR } = env as Pick<typeof env, "COLOR">

const ZIP_LEN: number = 5

const ZipCodeSchema = pipe(string(), trim(), nonEmpty(), digits())

const create = (): RESTPostAPIChatInputApplicationCommandsJSONBody =>
  new SlashCommandBuilder()
    .setName(parse(import.meta.filename).name)
    .setDescription("Display current weather")
    .addStringOption(
      (option: SlashCommandStringOption): SlashCommandStringOption =>
        option
          .setName("zipcode")
          .setDescription("Zip Code")
          .setRequired(true)
          .setMinLength(ZIP_LEN)
          .setMaxLength(ZIP_LEN)
    )
    .setContexts(InteractionContextType.Guild)
    .toJSON()

const getImage = async (city: string, state: string, zipcode: string): Promise<Nullable<AttachmentBuilder>> => {
  try {
    const location: string = `${city}, ${state} (${zipcode})`.replaceAll(" ", "+")

    const response: Response = await fetch(`https://wttr.in/${location}_0q.png`)
    if (!response.ok) {
      error(`Fetch error status: ${response.status}`)

      return null
    }

    return new AttachmentBuilder(Buffer.from(await response.arrayBuffer()), { name: `weather-${zipcode}.png` })
  } catch (e: unknown) {
    error(`Could not get weather for ${zipcode}`, e)

    return null
  }
}

const invoke = async (interaction: ChatInputCommandInteraction): Promise<void> => {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral })

  if (!bucket.allow(interaction.user.username)) {
    await interaction.editReply({ content: "❌ Rate limit exceeded" })

    return
  }

  const zipcode: string = interaction.options.getString("zipcode") as string

  const z: SafeParseResult<typeof ZipCodeSchema> = safeParse(ZipCodeSchema, zipcode)
  if (!z.success) {
    await interaction.editReply({ content: "-# > ❌ Invalid zip code format" })

    return
  }

  const zip: ReturnType<typeof find> = find(z.output)
  if (!(zip.isValid && zip.city)) {
    await interaction.editReply({ content: "-# > ❌ Zip code not found" })

    return
  }

  const file: Nullable<AttachmentBuilder> = await getImage(zip.city, zip.stateCode, z.output)
  if (!file) {
    await interaction.editReply({ content: "-# > ❌ Could not get weather" })

    return
  }

  await interaction.editReply({
    embeds: [new EmbedBuilder().setColor(COLOR as HexColorString).setImage(`attachment://weather-${z.output}.png`)],
    files: [file]
  })
}

export { create, invoke }
