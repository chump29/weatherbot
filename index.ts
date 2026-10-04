import { error, info } from "@postfmly/logger"

import { init, shutdown } from "./utils/client.ts"
import { env } from "./utils/env.ts"

try {
  await init()

  info(`🟢 ${env.ACTIVITY}...`)
} catch (e: unknown) {
  error(e)

  await shutdown()
}
