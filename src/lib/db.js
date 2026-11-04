import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './auth-schema'

const databaseUrl = process.env.TURSO_DATABASE_URL || 'file:./data/bazador.db'

if (databaseUrl.startsWith('file:')) {
  mkdirSync(resolve('data'), { recursive: true })
}

const client = createClient({
  url: databaseUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

let initialization

export async function initializeDatabase() {
  initialization ||= client.batch([
    `CREATE TABLE IF NOT EXISTS "user" ("id" text PRIMARY KEY NOT NULL, "name" text NOT NULL, "email" text NOT NULL UNIQUE, "emailVerified" integer DEFAULT false NOT NULL, "image" text, "createdAt" integer NOT NULL, "updatedAt" integer NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS "session" ("id" text PRIMARY KEY NOT NULL, "expiresAt" integer NOT NULL, "token" text NOT NULL UNIQUE, "createdAt" integer NOT NULL, "updatedAt" integer NOT NULL, "ipAddress" text, "userAgent" text, "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE)`,
    `CREATE TABLE IF NOT EXISTS "account" ("id" text PRIMARY KEY NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" integer, "refreshTokenExpiresAt" integer, "scope" text, "password" text, "createdAt" integer NOT NULL, "updatedAt" integer NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS "verification" ("id" text PRIMARY KEY NOT NULL, "identifier" text NOT NULL, "value" text NOT NULL, "expiresAt" integer NOT NULL, "createdAt" integer, "updatedAt" integer)`,
  ], 'write').catch((error) => {
    initialization = undefined
    throw error
  })
  await initialization
}
