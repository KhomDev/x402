import { acquireExclusiveFile } from "../../../src/batch-settlement/storage/fileStorage";

const lockPath = process.argv[2];
if (!lockPath) {
  throw new Error("usage: acquireExclusiveFile-worker.ts <lockPath>");
}

const handle = await acquireExclusiveFile(lockPath, { maxAttempts: 1000, retryIntervalMs: 1 });
const holdStart = Date.now();
process.stdout.write(`HOLD ${holdStart}\n`);
await new Promise(resolve => setTimeout(resolve, 25));
const holdEnd = Date.now();
process.stdout.write(`RELEASE ${holdEnd}\n`);
await handle.close();
