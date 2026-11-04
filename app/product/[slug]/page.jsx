import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import Storefront from '../../../src/components/Storefront'
import { auth } from '../../../src/lib/auth'
import { initializeDatabase } from '../../../src/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }) {
  const { slug } = await params
  await initializeDatabase()
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}&reason=auth`)
  const response = await fetch('https://openapi.programming-hero.com/api/bazardor/products', { cache: 'no-store' })
  if (!response.ok) throw new Error(`Could not load products (${response.status})`)
  const products = await response.json()
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return <Storefront page="product" productId={String(product.id)} />
}
