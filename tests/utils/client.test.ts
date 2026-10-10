import { default as process } from "node:process"

import { beforeAll, describe, expect, jest, spyOn, test } from "bun:test"

import { simpleFaker as fake } from "@faker-js/faker"
import { type ClientUser, type Client as DiscordClient } from "discord.js"

import { Client } from "../../utils/client.ts"
import { env } from "../../utils/env.ts"

let infoSpy: jest.Mock
let onSpy: jest.Mock
let exitSpy: jest.Mock

const tag: string = `${env.NAME}#${fake.string.numeric({ allowLeadingZeros: false, length: 4 })}`

beforeAll(async (): Promise<void> => {
  infoSpy = spyOn(console, "info").mockImplementation((): void => undefined) // suppress
  onSpy = spyOn(process, "on").mockImplementation((): typeof process => process)
  exitSpy = spyOn(process, "exit").mockImplementation((): never => undefined as never)

  await Client.init({
    destroy: jest.fn().mockResolvedValue(undefined),
    login: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
    once: jest.fn(),
    user: {
      displayName: env.NAME,
      tag
    } as ClientUser
  } as unknown as DiscordClient)
})

describe("client", (): void => {
  test("init", async (): Promise<void> => {
    await Client.shutdown()

    const COUNT: number = 9
    expect(infoSpy).toHaveBeenCalledTimes(COUNT)

    const LOGIN_NUM: number = 5
    expect(infoSpy).toHaveBeenNthCalledWith(LOGIN_NUM, expect.any(String), expect.stringContaining(env.NAME))
    expect(infoSpy).toHaveBeenNthCalledWith(LOGIN_NUM, expect.any(String), expect.stringContaining(tag))

    process.emit("SIGINT")
    expect(onSpy).toHaveBeenNthCalledWith(1, "SIGINT", expect.any(Function))

    process.emit("SIGTERM")
    expect(onSpy).toHaveBeenNthCalledWith(2, "SIGTERM", expect.any(Function))

    expect(exitSpy).toHaveBeenCalledTimes(1)
    expect(exitSpy).toHaveBeenCalledWith(0)
  })
})
