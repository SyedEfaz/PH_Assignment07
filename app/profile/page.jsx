import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Storefront from '../../src/components/Storefront'
import { auth } from '../../src/lib/auth'
import { initializeDatabase } from '../../src/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  await initializeDatabase()
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/signin?next=%2Fprofile&reason=auth')
  return <Storefront page="profile" />
}
