/**
 * Build-time constants injected by the build pipelines.
 *
 * Lives under config/ rather than types/ because types/ ships in `files`: a bare
 * global declared there would leak `__WORKER_SRC__` into every consumer program
 * that picked the file up.
 *
 * Declared here rather than inside the consuming module on purpose: a `define`-based
 * substitution only replaces identifiers that are not bound in scope, and a
 * module-level `declare const` binds the name and silently disables the
 * replacement.
 */

/**
 * Pre-bundled Web Worker source, injected from `src/module/worker.entry.ts`
 * by config/worker-src.js. See PERFORMANCE.md "Worker Safety".
 */
declare const __WORKER_SRC__: string;
