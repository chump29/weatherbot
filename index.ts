import { Bucket } from "@postfmly/checkrate"
import { error, info } from "@postfmly/logger"

import { init, shutdown } from "./utils/client.ts"

const bucket: Bucket = new Bucket()

try {
  await init()

  info("🟢 Running...")
} catch (e: unknown) {
  error(e)

  await shutdown()
}

export { bucket }
