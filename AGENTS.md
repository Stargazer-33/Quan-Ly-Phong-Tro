# CodeGraph

Use CodeGraph MCP tools for code-structure questions such as symbol lookup, callers/callees, dependency relationships, and change impact. Prefer `codegraph_get_edit_context` before substantial edits to understand related code. Use normal file reads and edits for known paths, exact text searches, and file changes.

If the workspace graph is empty or results look stale, call `codegraph_reindex_workspace`.
