import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '../../../../src/lib/auth'
import { initializeDatabase } from '../../../../src/lib/db'

const handlers = toNextJsHandler(auth)

async function handle(handler, request) {
  await initializeDatabase()
  return handler(request)
}

export const GET = (request) => handle(handlers.GET, request)
export const POST = (request) => handle(handlers.POST, request)
