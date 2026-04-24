// Stub db shim for one-thing-out - routes to useActivityDB pattern
// This is a no-op stub. Real DB access goes through useActivityDB hook.
const sql = async (...args: any[]) => [];
export default sql;
