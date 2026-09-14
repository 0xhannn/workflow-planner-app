# AGENTS.md — Repository Takeover Rules

Repository: `0xhannn/workflow-planner-app`  
Canonical branch: `main`  
Global project index: `0xhannn/repository-rules`

## Start here
1. Read `update.md` completely.
2. Inspect latest `main` and recent commits.
3. Read README/setup docs relevant to the task.
4. Read full source files before editing.

If docs and canonical code disagree, code is the technical source of truth; then update the handoff.

## Mandatory rules
- Never commit secrets, credentials, production private data, tokens, keys, or sensitive runtime files.
- Preserve local-first install/update behavior and user data safety described in `update.md`.
- Do not deploy, migrate production data, or perform destructive production actions without explicit owner approval.
- Prefer small coherent changes over broad rewrites.
- Do not rename the canonical branch during ordinary work.
- Never claim test/build/deploy/runtime success unless actually executed.
- Meaningful code/config/dependency/schema/integration/behavior changes must update the semantic/manual parts of `update.md`; auto Git history is not enough.
- Stricter repo-specific rules in `update.md`, README/docs, or task files remain binding.

## Before finishing
Run relevant checks, record what was actually tested and what remains unverified, update `update.md` when project state changed, and summarize changed files, validation, risks, and next work.

For takeover without chat history, start from `0xhannn/repository-rules`, then this repo's `update.md`.