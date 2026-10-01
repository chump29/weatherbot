import { parse } from "node:path"

import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  type HexColorString,
  InteractionContextType,
  MessageFlags,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder
} from "discord.js"

import { author, version } from "../../package.json" with { type: "json" }
import { bucket } from "../../utils/bucket.ts"
import { env } from "../../utils/env.ts"

const { COLOR, LOGO_URL, NAME } = env as Pick<typeof env, "COLOR" | "LOGO_URL" | "NAME">

const create = (): RESTPostAPIChatInputApplicationCommandsJSONBody =>
  new SlashCommandBuilder()
    .setName(parse(import.meta.filename).name)
    .setDescription(`Information about ${NAME}`)
    .setContexts(InteractionContextType.Guild)
    .toJSON()

const invoke = async (interaction: ChatInputCommandInteraction): Promise<void> => {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral })

  if (!bucket.allow(interaction.user.username)) {
    await interaction.editReply({ content: "❌ Rate limit exceeded" })

    return
  }

  await interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor(COLOR as HexColorString)
        .setAuthor({
          iconURL: LOGO_URL,
          name: `${NAME} v${version}`
        })
        .setThumbnail(LOGO_URL)
        .setDescription("- Displays current weather by zip code")
        .setFooter({
          text: `By ${author.name}`
        })
    ]
  })
}

export { create, invoke }
