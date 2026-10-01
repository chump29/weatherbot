import { error, info } from "@postfmly/logger"

import { init, shutdown } from "./utils/client.ts"

try {
  await init()

  info("🟢 Running...")
} catch (e: unknown) {
  error(e)

  await shutdown()
}
