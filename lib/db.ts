import { neon } from '@neondatabase/serverless'

let _sql: ReturnType<typeof neon> | undefined

function sql(...args: Parameters<ReturnType<typeof neon>>) {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!)
  return _sql(...args)
}

export default sql as ReturnType<typeof neon>
