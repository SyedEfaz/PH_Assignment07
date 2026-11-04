import Storefront from '../../../src/components/Storefront'

export default async function CategoryPage({ params }) {
  const { slug } = await params
  return <Storefront page="category" categoryId={slug} />
}
