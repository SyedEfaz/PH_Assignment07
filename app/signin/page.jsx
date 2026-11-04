import Storefront from '../../src/components/Storefront'

export default async function SignInPage({ searchParams }) {
  const { next, reason } = await searchParams
  return <Storefront page="signin" nextPath={typeof next === 'string' ? next : '/'} redirectNotice={reason === 'auth'} />
}
