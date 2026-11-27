import { unlink } from "node:fs/promises";

import { acquireExclusiveFile } from "../../../src/batch-settlement/storage/fileStorage";

async function main(): Promise<void> {
  const lockPath = process.argv[2];
  if (!lockPath) {
    throw new Error("usage: acquireExclusiveFile-worker.ts <lockPath>");
  }

  const handle = await acquireExclusiveFile(lockPath, { maxAttempts: 1000, retryIntervalMs: 1 });
  const holdStart = Date.now();
  process.stdout.write(`HOLD ${holdStart}\n`);
  await new Promise(resolve => setTimeout(resolve, 25));
  await handle.close();
  await unlink(lockPath).catch(() => {});
  process.stdout.write(`RELEASE ${Date.now()}\n`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
