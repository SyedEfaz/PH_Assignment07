'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '../lib/auth-client'
import toast from 'react-hot-toast'

const API_BASE = 'https://openapi.programming-hero.com/api/bazardor'
const EMPTY_PRODUCTS = []
const numberFormatter = new Intl.NumberFormat('bn-BD')
const percentFormatter = new Intl.NumberFormat('bn-BD', { maximumFractionDigits: 1 })
const banglaDate = new Intl.DateTimeFormat('bn-BD', { dateStyle: 'long' }).format(new Date())

async function fetchApi(path, signal) {
  const response = await fetch(`${API_BASE}${path}`, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json()
}

function formatNumber(value) {
  return numberFormatter.format(value)
}

function formatUnit(unit) {
  const units = { kg: 'কেজি', litre: 'লিটার', dozen: 'ডজন', piece: 'পিস' }
  return units[unit] || unit
}

function getPriceChange(product) {
  if (product.change.dir === 'up') return { arrow: '▲', className: 'change-up' }
  if (product.change.dir === 'down') return { arrow: '▼', className: 'change-down' }
  return { arrow: '—', className: 'change-flat' }
}

function getSafeNextPath(path) {
  return path.startsWith('/') && !path.startsWith('//') ? path : '/'
}

export default function Storefront({ page, categoryId = '', productId = '', nextPath = '/', redirectNotice = false }) {
  const router = useRouter()
  const route = { page, categoryId, id: productId }
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [productsResult, setProductsResult] = useState({ key: '', products: [], error: '' })
  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [detailsResult, setDetailsResult] = useState({ key: '', product: null, error: '' })
  const [sortOrder, setSortOrder] = useState('default')
  const [cart, setCart] = useState({})
  const [favorites, setFavorites] = useState([])
  const [storageLoaded, setStorageLoaded] = useState(false)
  const [notice, setNotice] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const { data: session } = authClient.useSession()
  const user = session?.user

  useEffect(() => {
    if (page === 'signin' && redirectNotice) toast.error('এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন')
  }, [page, redirectNotice])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bazardor-cart')
      const savedFavorites = localStorage.getItem('bazardor-favorites')
      // Rehydrate browser-only shopping state after the server-rendered markup hydrates.
      // oxlint-disable-next-line react/set-state-in-effect
      if (savedCart) setCart(JSON.parse(savedCart))
      // oxlint-disable-next-line react/set-state-in-effect
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    } catch {
      toast.error('সংরক্ষিত পছন্দের তালিকা পড়া যায়নি')
    } finally {
      setStorageLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!storageLoaded) return
    localStorage.setItem('bazardor-cart', JSON.stringify(cart))
    localStorage.setItem('bazardor-favorites', JSON.stringify(favorites))
  }, [cart, favorites, storageLoaded])

  const activeCategory = route.page === 'category' ? route.categoryId : category
  const productsRequestKey = `${activeCategory || 'all'}-${refreshKey}`
  const productsLoading = productsResult.key !== productsRequestKey
  const productsError = productsResult.key === productsRequestKey ? productsResult.error || categoriesError : ''
  const products = productsResult.key === productsRequestKey ? productsResult.products : EMPTY_PRODUCTS
  const detailsRequestKey = `${route.id || ''}-${refreshKey}`
  const detailsLoading = route.page === 'product' && detailsResult.key !== detailsRequestKey
  const detailsError = detailsResult.key === detailsRequestKey ? detailsResult.error : ''
  const product = detailsResult.key === detailsRequestKey ? detailsResult.product : null

  useEffect(() => {
    const controller = new AbortController()
    const requestKey = `${activeCategory || 'all'}-${refreshKey}`
    const query = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : ''
    fetchApi(`/products${query}`, controller.signal)
      .then((data) => setProductsResult({ key: requestKey, products: data, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setProductsResult({ key: requestKey, products: [], error: error.message })
      })
    return () => controller.abort()
  }, [activeCategory, refreshKey])

  useEffect(() => {
    const controller = new AbortController()
    fetchApi('/categories', controller.signal)
      .then((data) => {
        setCategories(data)
        setCategoriesError('')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setCategoriesError(error.message)
      })
    return () => controller.abort()
  }, [refreshKey])

  useEffect(() => {
    if (route.page !== 'product' || !route.id || !user) return undefined
    const controller = new AbortController()
    const requestKey = `${route.id}-${refreshKey}`
    fetchApi(`/products/${encodeURIComponent(route.id)}`, controller.signal)
      .then((data) => setDetailsResult({ key: requestKey, product: data, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setDetailsResult({ key: requestKey, product: null, error: error.message })
      })
    return () => controller.abort()
  }, [route.id, route.page, refreshKey, user])

  function navigate(path) {
    router.push(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addToCart(id) {
    setCart((items) => ({ ...items, [id]: (items[id] || 0) + 1 }))
    setNotice('Added to your basket')
    window.setTimeout(() => setNotice(''), 1800)
  }

  function toggleFavorite(id) {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  async function submitAuth(event) {
    event.preventDefault()
    setAuthLoading(true)
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const password = String(form.get('password') || '')
    const redirectPath = getSafeNextPath(nextPath)
    try {
      if (route.page === 'signup') {
        const result = await authClient.signUp.email({
          name: String(form.get('name') || ''),
          email,
          password,
        })
        if (result.error) throw new Error(result.error.message)
        toast.success('অ্যাকাউন্ট তৈরি হয়েছে')
        router.push(redirectPath)
      } else {
        const result = await authClient.signIn.email({ email, password })
        if (result.error) throw new Error(result.error.message)
        toast.success('সফলভাবে সাইন ইন হয়েছে')
        router.push(redirectPath)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'সাইন ইন করা যায়নি। আবার চেষ্টা করুন।')
    } finally {
      setAuthLoading(false)
    }
  }

  async function signInSocial(provider) {
    setAuthLoading(true)
    try {
      const result = await authClient.signIn.social({ provider, callbackURL: getSafeNextPath(nextPath) })
      if (result.error) throw new Error(result.error.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'সোশ্যাল সাইন ইন করা যায়নি')
      setAuthLoading(false)
    }
  }

  async function signOut() {
    try {
      const result = await authClient.signOut()
      if (result.error) throw new Error(result.error.message)
      toast.success('সাইন আউট হয়েছে')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'সাইন আউট করা যায়নি')
    }
  }

  async function updateProfile(event) {
    event.preventDefault()
    const name = String(new FormData(event.currentTarget).get('name') || '').trim()
    if (!name) {
      toast.error('আপনার নাম লিখুন')
      return
    }
    try {
      const result = await authClient.updateUser({ name })
      if (result.error) throw new Error(result.error.message)
      toast.success('প্রোফাইল আপডেট হয়েছে')
      router.push('/profile')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'প্রোফাইল আপডেট করা যায়নি')
    }
  }

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => `${product.nameBn} ${product.categoryNameBn}`.toLowerCase().includes(search.toLowerCase()))
    if (sortOrder === 'ascending') return filtered.slice().sort((a, b) => a.today - b.today)
    if (sortOrder === 'descending') return filtered.slice().sort((a, b) => b.today - a.today)
    return filtered
  }, [products, search, sortOrder])
  const risingProducts = useMemo(() => products.filter((item) => item.change.dir === 'up').slice().sort((a, b) => b.change.pct - a.change.pct).slice(0, 6), [products])
  const fallingProducts = useMemo(() => products.filter((item) => item.change.dir === 'down').slice().sort((a, b) => b.change.pct - a.change.pct).slice(0, 6), [products])

  function renderProducts(items) {
    if (productsLoading) return <div className="product-grid skeleton-grid" role="status" aria-label="পণ্য লোড হচ্ছে">{Array.from({ length: 6 }, (_, index) => <article className="product-card skeleton-card" key={index}><div className="skeleton-image" /><div className="skeleton-lines"><span /><span /><span /></div></article>)}</div>
    if (productsError) return <div className="empty-state api-error" role="alert"><p>পণ্য লোড করা যায়নি: {productsError}</p><button className="primary-button" onClick={() => setRefreshKey((value) => value + 1)}>আবার চেষ্টা করুন</button></div>
    if (items.length === 0) return <p className="empty-state">কোনো পণ্য পাওয়া যায়নি।</p>
    return <div className="product-grid">
      {items.map((product) => (
        <article className="product-card" key={product.id}>
          <button className={`favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={`Add ${product.nameBn} to favorites`}>{favorites.includes(product.id) ? '♥' : '♡'}</button>
          <button className="product-image" onClick={() => navigate(`/product/${product.slug}`)} aria-label={`View ${product.nameBn}`}>
            <span>{product.image}</span>
          </button>
          <div className="product-info">
            <span className="product-category">{product.categoryNameBn}</span>
            <button className="product-name" onClick={() => navigate(`/product/${product.slug}`)}>{product.nameBn}</button>
            <span className="product-unit">প্রতি {formatUnit(product.unit)}</span>
            <div className="product-price-row"><span>আজকের দাম</span><strong>{formatNumber(product.today)} টাকা</strong></div>
            <div className="product-bottom"><span className={`change-badge ${getPriceChange(product).className}`}>{getPriceChange(product).arrow} {percentFormatter.format(product.change.pct)}%</span><button className="add-button" onClick={() => addToCart(product.id)} aria-label={`Add ${product.nameBn} to basket`}>{cart[product.id] ? `+ ${formatNumber(cart[product.id])}` : '+'}</button></div>
          </div>
        </article>
      ))}
    </div>
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="topline">
          <button className="brand bazar-brand" onClick={() => navigate('/')} aria-label="বাজার দর হোম"><span className="brand-mark">🛒</span><span>বাজার দর<small>{banglaDate}</small></span></button>
          <div className="location"><span className="pin">⌖</span><span><small>Deliver to</small><strong>Dhaka, Bangladesh</strong></span><span className="chevron">⌄</span></div>
          <form className="searchbox" onSubmit={(event) => { event.preventDefault(); navigate('/') }}>
            <span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search fresh products..." aria-label="Search products" /><button aria-label="Submit search">Search</button>
          </form>
          <div className="header-actions">
            <button className="icon-action" onClick={() => navigate('/profile')} aria-label="Favorites">♡</button>
            <button className="icon-action cart-action" onClick={() => setNotice(cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} in your basket` : 'Your basket is empty')} aria-label="Shopping basket">♧{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</button>
            {user ? <><button className="account-link" onClick={() => navigate('/profile')}>{user.name}</button><button className="signout-button header-signout" onClick={signOut}>সাইন আউট</button></> : <div className="auth-links"><button className="account-link" onClick={() => navigate('/signin')}>সাইন ইন</button><button className="header-signup" onClick={() => navigate('/signup')}>সাইন আপ</button></div>}
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={route.page === 'home' && !category ? 'nav-active' : ''} onClick={() => { setCategory(''); navigate('/') }}>Home</button>
          <button className={route.page === 'category' ? 'nav-active' : ''} onClick={() => navigate('/category')}>Shop by category <span>⌄</span></button>
          {categories.map((item) => <button key={item.id} className={category === item.id || route.categoryId === item.slug ? 'nav-active' : ''} onClick={() => { setSortOrder('default'); navigate(`/category/${item.slug}`) }}>{item.nameBn}</button>)}
          <span className="nav-spacer" /><button className="offer-link" onClick={() => { setCategory(''); navigate('/') }}>✦ &nbsp;Special offers</button>
          {user ? <><button className="account-mobile" onClick={() => navigate('/profile')}>{user.name}</button><button className="account-mobile account-mobile-signout" onClick={signOut}>সাইন আউট</button></> : <><button className="account-mobile" onClick={() => navigate('/signin')}>সাইন ইন</button><button className="account-mobile" onClick={() => navigate('/signup')}>সাইন আপ</button></>}
        </nav>
        <div className="price-ticker" aria-label="আজকের বাজারদর"><div className="ticker-track">{[...products, ...products].map((item, index) => <span key={`${item.id}-${index}`}><b>{item.image}</b> {item.nameBn} <strong>{formatNumber(item.today)} টাকা/{formatUnit(item.unit)}</strong> <i className={getPriceChange(item).className}>{getPriceChange(item).arrow} {percentFormatter.format(item.change.pct)}%</i></span>)}</div></div>
      </header>

      <main>
        {route.page === 'home' && <>
          <section className="hero-banner">
            <div className="hero-copy"><span className="eyebrow"><span className="fresh-dot" /> আজকের বাজারের হালনাগাদ তথ্য</span><h1>প্রতিদিনের বাজারদর <span>জানুন এক নজরে</span></h1><p>দেশের বিভিন্ন বাজার থেকে সংগৃহীত পণ্যের<br className="desktop-break" /> নির্ভরযোগ্য দাম দেখুন সহজেই।</p><button className="primary-button" onClick={() => document.getElementById('shop-products')?.scrollIntoView({ behavior: 'smooth' })}>সব পণ্য দেখুন <span>→</span></button><div className="hero-trust"><span>✓ বাজারভিত্তিক দাম</span><span>✓ প্রতিদিন হালনাগাদ</span></div></div>
            <div className="hero-art" aria-label="Basket of fresh produce"><div className="sun-shape" /><span className="produce p1">🥬</span><span className="produce p2">🥕</span><span className="produce p3">🥑</span><span className="produce p4">🍊</span><span className="produce p5">🍎</span><span className="produce p6">🌿</span><div className="basket"><span>FRESH</span></div><div className="art-shadow" /></div>
            <div className="hero-dots"><span className="selected" /><span /><span /></div>
          </section>
          <section className="benefit-row"><div><span className="benefit-icon">♧</span><span><strong>Farm fresh</strong><small>Picked fresh every day</small></span></div><div><span className="benefit-icon">♧</span><span><strong>100% natural</strong><small>No harmful chemicals</small></span></div><div><span className="benefit-icon">♧</span><span><strong>Fast delivery</strong><small>At your door in hours</small></span></div><div><span className="benefit-icon">♧</span><span><strong>Best prices</strong><small>Fresh deals every day</small></span></div></section>
          <section className="trend-section"><div className="section-heading"><div><span className="eyebrow">MARKET MOVEMENT</span><h2>আজ দাম বেড়েছে ▲</h2><p>যে পণ্যগুলোর দাম আজ সবচেয়ে বেশি বেড়েছে</p></div></div>{renderProducts(risingProducts)}</section>
          <section className="trend-section"><div className="section-heading"><div><span className="eyebrow">MARKET MOVEMENT</span><h2>আজ দাম কমেছে ▼</h2><p>যে পণ্যগুলোর দাম আজ কমেছে</p></div></div>{renderProducts(fallingProducts)}</section>
          <section className="shop-section" id="shop-products">
            <div className="section-heading"><div><span className="eyebrow">আজকের বাজারদর</span><h2>সব পণ্য</h2><p>আজকের বাজারের পণ্যের হালনাগাদ দাম।</p></div><button className="text-link" onClick={() => navigate('/category')}>সব ক্যাটাগরি <span>→</span></button></div>
            <div className="category-tabs"><button className={!category ? 'tab-active' : ''} onClick={() => setCategory('')}>সব পণ্য</button>{categories.map((item) => <button key={item.id} className={category === item.id ? 'tab-active' : ''} onClick={() => setCategory(item.id)}>{item.icon} {item.nameBn}</button>)}</div>
            {renderProducts(visibleProducts)}
          </section>
          <section className="newsletter"><div><span className="eyebrow">A LITTLE FRESHNESS IN YOUR INBOX</span><h2>Get the freshest deals first</h2><p>Sign up for our newsletter and enjoy 10% off your first order.</p></div><form onSubmit={(event) => { event.preventDefault(); setNotice('Thanks for subscribing!'); event.currentTarget.reset() }}><input type="email" placeholder="Your email address" required aria-label="Email address" /><button className="primary-button">Subscribe <span>→</span></button></form></section>
        </>}

        {route.page === 'category' && <section className="page-section category-page"><div className="breadcrumb"><button onClick={() => navigate('/')}>হোম</button><span> / </span> {route.categoryId ? categories.find((item) => item.slug === route.categoryId)?.nameBn || 'ক্যাটাগরি' : 'ক্যাটাগরি'}</div><div className="page-title"><div><span className="eyebrow">বাজারদরের ক্যাটাগরি</span><h1>{route.categoryId ? categories.find((item) => item.slug === route.categoryId)?.nameBn || 'ক্যাটাগরি পাওয়া যায়নি' : 'সব ক্যাটাগরি'}</h1><p>বিভিন্ন পণ্যের আজকের বাজারদর দেখুন।</p></div></div><div className="category-tabs"><button className={!route.categoryId ? 'tab-active' : ''} onClick={() => navigate('/category')}>সব পণ্য</button>{categories.map((item) => <button key={item.id} className={route.categoryId === item.slug ? 'tab-active' : ''} onClick={() => { setSortOrder('default'); navigate(`/category/${item.slug}`) }}>{item.icon} {item.nameBn}</button>)}</div><div className="category-sort"><label htmlFor="sort-products">সাজান:</label><select id="sort-products" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="default">ডিফল্ট</option><option value="ascending">দাম: কম থেকে বেশি</option><option value="descending">দাম: বেশি থেকে কম</option></select></div>{route.categoryId && !productsLoading && !productsError && visibleProducts.length === 0 ? <div className="empty-category"><span>🔎</span><h2>এই ক্যাটাগরিতে কোনো পণ্য নেই</h2><button className="primary-button" onClick={() => navigate('/')}>হোম পেজে ফিরে যান</button></div> : renderProducts(visibleProducts)}</section>}

        {route.page === 'product' && <section className="page-section product-page"><div className="breadcrumb"><button onClick={() => navigate('/')}>হোম</button><span> / </span><button onClick={() => navigate(`/category/${product?.category || ''}`)}>{product?.categoryNameBn || 'পণ্য'}</button><span> / </span>{product?.nameBn || ''}</div>{detailsLoading && <p className="empty-state" role="status">পণ্যের তথ্য লোড হচ্ছে...</p>}{detailsError && <div className="empty-state api-error" role="alert"><p>পণ্যের তথ্য লোড করা যায়নি: {detailsError}</p><button className="primary-button" onClick={() => setRefreshKey((value) => value + 1)}>আবার চেষ্টা করুন</button></div>}{product && !detailsLoading && <><div className="detail-card"><div className="detail-image"><span>{product.image}</span><span className="fresh-badge">{product.categoryIcon} {product.categoryNameBn}</span></div><div className="detail-info"><span className="eyebrow">{product.categoryNameBn}</span><h1>{product.nameBn}</h1><p className="detail-description">বিভিন্ন বাজার থেকে সংগৃহীত আজকের হালনাগাদ দাম। বাজারভেদে দামের পার্থক্য থাকতে পারে।</p><div className="detail-price">{formatNumber(product.today)} টাকা<span> / প্রতি {formatUnit(product.unit)}</span></div><span className={`change-badge ${getPriceChange(product).className}`}>{getPriceChange(product).arrow} {percentFormatter.format(product.change.pct)}% গতকালের তুলনায়</span><div className="detail-actions"><button className="primary-button" onClick={() => addToCart(product.id)}>তালিকায় যোগ করুন <span>→</span></button><button className="detail-favorite" onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? '♥ পছন্দের তালিকায় আছে' : '♡ পছন্দের তালিকায় যোগ করুন'}</button></div><div className="delivery-note">সর্বশেষ হালনাগাদ: আজকের বাজার জরিপ</div></div></div><section className="product-details"><h2>বাজারভিত্তিক আজকের দাম</h2><div className="price-summary"><div><span>সর্বনিম্ন</span><strong>{formatNumber(Math.min(...product.markets.map((market) => market.min)))} টাকা</strong></div><div><span>সর্বোচ্চ</span><strong>{formatNumber(Math.max(...product.markets.map((market) => market.max)))} টাকা</strong></div><div><span>গড় দাম</span><strong>{formatNumber(Math.round(product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) / product.markets.length))} টাকা</strong></div></div><div className="market-table"><div className="market-row market-head"><strong>বাজার</strong><strong>বিভাগ</strong><strong>সর্বনিম্ন</strong><strong>সর্বোচ্চ</strong></div>{product.markets.map((market) => <div className="market-row" key={`${market.market}-${market.division}`}><span>{market.market}</span><span>{market.division}</span><span>{formatNumber(market.min)} টাকা</span><span>{formatNumber(market.max)} টাকা</span></div>)}</div></section></>}</section>}

        {(route.page === 'signin' || route.page === 'signup') && <section className="auth-page"><div className="auth-card"><span className="auth-icon">🛒</span><span className="eyebrow">বাজার দর</span><h1>{route.page === 'signup' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'আপনার অ্যাকাউন্টে সাইন ইন করুন'}</h1><p>{route.page === 'signup' ? 'আজকের বাজারদর সহজে জানতে নিবন্ধন করুন।' : 'বাজারদর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।'}</p><form onSubmit={submitAuth}>{route.page === 'signup' && <label>নাম<input name="name" type="text" placeholder="আপনার নাম" autoComplete="name" required /></label>}<label>ইমেইল<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label><label>পাসওয়ার্ড<input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength="8" autoComplete={route.page === 'signup' ? 'new-password' : 'current-password'} required /></label><button className="primary-button auth-submit" disabled={authLoading}>{authLoading ? 'অপেক্ষা করুন...' : route.page === 'signup' ? 'সাইন আপ' : 'সাইন ইন'} <span>→</span></button></form><div className="social-divider"><span>অথবা</span></div><div className="social-buttons"><button type="button" disabled={authLoading} onClick={() => signInSocial('google')}>Google দিয়ে চালিয়ে যান</button></div><div className="auth-switch">{route.page === 'signup' ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'নতুন ব্যবহারকারী?'} <button onClick={() => navigate(route.page === 'signup' ? '/signin' : '/signup')}>{route.page === 'signup' ? 'সাইন ইন' : 'সাইন আপ করুন'}</button></div></div></section>}

        {route.page === 'profile' && <section className="page-section profile-page"><div className="breadcrumb"><button onClick={() => navigate('/')}>হোম</button><span> / </span> আমার প্রোফাইল</div><div className="profile-content"><div className="profile-heading"><span className="eyebrow">আপনার বাজার দর অ্যাকাউন্ট</span><h1>আমার প্রোফাইল</h1><p>আপনার অ্যাকাউন্টের তথ্য ও পছন্দের পণ্য দেখুন।</p></div><div className="profile-card"><div className="profile-user"><div className="avatar">{(user?.name || 'G').slice(0, 1).toUpperCase()}</div><div><h2>{user?.name || 'ব্যবহারকারী'}</h2><p>{user?.email}</p></div><button className="signout-button" onClick={signOut}>সাইন আউট</button><button className="profile-update-button" onClick={() => navigate('/profile/update')}>তথ্য পরিবর্তন</button></div><div className="profile-stats"><div><span>ঝুড়ির পণ্য</span><strong>{formatNumber(cartCount)}</strong></div><div><span>পছন্দের পণ্য</span><strong>{formatNumber(favorites.length)}</strong></div></div></div><div className="favorites-heading"><h2>আপনার পছন্দের পণ্য</h2><span>{formatNumber(favorites.length)} টি</span></div>{renderProducts(products.filter((item) => favorites.includes(item.id)))}</div></section>}

        {route.page === 'update-profile' && <section className="auth-page"><div className="auth-card"><span className="auth-icon">👤</span><span className="eyebrow">প্রোফাইল সেটিংস</span><h1>ব্যক্তিগত তথ্য পরিবর্তন</h1><p>আপনার নাম হালনাগাদ করুন।</p><form onSubmit={updateProfile}><label>নাম<input name="name" type="text" defaultValue={user?.name || ''} autoComplete="name" required /></label><button className="primary-button auth-submit">তথ্য আপডেট করুন <span>→</span></button></form><div className="auth-switch"><button onClick={() => navigate('/profile')}>প্রোফাইলে ফিরে যান</button></div></div></section>}

        {route.page === 'not-found' && <section className="page-section not-found"><span>404</span><h1>পৃষ্ঠাটি পাওয়া যায়নি</h1><button className="primary-button" onClick={() => navigate('/')}>হোম পেজে ফিরে যান</button></section>}
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><span className="brand-mark">🛒</span><span>বাজার দর<small>আজকের বাজার, আপনার হাতেই</small></span><p>বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখুন।</p></div><div><h3>ক্যাটাগরি</h3><button onClick={() => navigate('/')}>হোম</button><button onClick={() => navigate('/category')}>সব ক্যাটাগরি</button><button onClick={() => { if (categories[0]) navigate(`/category/${categories[0].slug}`) }}>পণ্যের দাম</button></div><div><h3>আপনার অ্যাকাউন্ট</h3><button onClick={() => navigate('/profile')}>আমার প্রোফাইল</button><button onClick={() => navigate('/signin')}>সাইন ইন</button><button onClick={() => navigate('/signup')}>সাইন আপ</button></div><div><h3>বাজারদর সম্পর্কে</h3><p>বিভিন্ন এলাকার বাজার থেকে সংগৃহীত সাম্প্রতিক দাম।</p><span className="footer-contact">সর্বশেষ হালনাগাদ: {banglaDate}</span></div></div><div className="footer-bottom"><span>© ২০২৫ বাজার দর। সর্বস্বত্ব সংরক্ষিত।</span><span>বাংলাদেশের বাজারদর</span></div></footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}
