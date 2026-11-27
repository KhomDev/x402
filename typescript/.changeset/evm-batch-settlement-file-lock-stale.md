---
"@x402/evm": patch
---

File-backed batch-settlement storage now serializes stale lock-file recovery, so two callers that both see a dead owner's marker cannot remove each other's replacement and hold the same lock at once.
