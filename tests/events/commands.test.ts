import { readdir } from "node:fs/promises"
import { default as path } from "node:path"

import { type ICommandFile, testSlashCommand } from "../helpers.ts"

const dir: string = "events/commands"

const commands: string[] = (await readdir(dir)).filter((file: string): boolean => file.endsWith(".ts"))

await Promise.all(
  commands.map(async (command: string): Promise<void> => {
    const { create, invoke } = (await import(`${path.join("../..", dir)}/${command}`)) satisfies ICommandFile

    testSlashCommand(path.basename(command, ".ts"), { create, invoke })
  })
)
