import { describe, expect, jest, test } from "bun:test"

import { fakerEN_US as fake } from "@faker-js/faker"
import {
  type ChatInputCommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  type User
} from "discord.js"
import { find } from "zipcodes-us"

interface ICommandFile {
  create: () => RESTPostAPIChatInputApplicationCommandsJSONBody
  invoke: (interaction: ChatInputCommandInteraction) => Promise<void>
}

const testSlashCommand = (name: string, command: ICommandFile): void => {
  describe(`/${name}`, (): void => {
    test("create", (): void => {
      const c: RESTPostAPIChatInputApplicationCommandsJSONBody = command.create()

      expect(c.name).toBe(name)
      expect(c.description).not.toBeEmpty()
      expect(c.contexts ?? []).not.toBeEmpty()
    })

    test("invoke", async (): Promise<void> => {
      let zipCode: string = ""

      if (name === "weather") {
        let zip: ReturnType<typeof find>
        do {
          zipCode = fake.location.zipCode("#####")

          zip = find(zipCode)
        } while (!zip.isValid)
      }

      const interaction: ChatInputCommandInteraction = {
        createdTimestamp: fake.date.past().getTime(),
        deferReply: jest.fn().mockResolvedValue(undefined),
        editReply: jest.fn().mockResolvedValue(undefined),
        user: {
          username: fake.internet.username()
        } as User,
        options: {
          getString: jest.fn().mockReturnValue(zipCode)
        }
      } as unknown as ChatInputCommandInteraction

      expect(await command.invoke(interaction)).toBeUndefined()
    })
  })
}

export { type ICommandFile, testSlashCommand }
