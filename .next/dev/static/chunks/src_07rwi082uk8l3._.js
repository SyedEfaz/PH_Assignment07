(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Storefront.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Storefront
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const API_BASE = 'https://openapi.programming-hero.com/api/bazardor';
const EMPTY_PRODUCTS = [];
const numberFormatter = new Intl.NumberFormat('bn-BD');
const percentFormatter = new Intl.NumberFormat('bn-BD', {
    maximumFractionDigits: 1
});
const banglaDate = new Intl.DateTimeFormat('bn-BD', {
    dateStyle: 'long'
}).format(new Date());
async function fetchApi(path, signal) {
    const response = await fetch(`${API_BASE}${path}`, {
        signal
    });
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    return response.json();
}
function formatNumber(value) {
    return numberFormatter.format(value);
}
function formatUnit(unit) {
    const units = {
        kg: 'কেজি',
        litre: 'লিটার',
        dozen: 'ডজন',
        piece: 'পিস'
    };
    return units[unit] || unit;
}
function getPriceChange(product) {
    if (product.change.dir === 'up') return {
        arrow: '▲',
        className: 'change-up'
    };
    if (product.change.dir === 'down') return {
        arrow: '▼',
        className: 'change-down'
    };
    return {
        arrow: '—',
        className: 'change-flat'
    };
}
function Storefront({ page, categoryId = '', productId = '', nextPath = '/', redirectNotice = false }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const route = {
        page,
        categoryId,
        id: productId
    };
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [productsResult, setProductsResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: '',
        products: [],
        error: ''
    });
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categoriesError, setCategoriesError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [refreshKey, setRefreshKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [detailsResult, setDetailsResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: '',
        product: null,
        error: ''
    });
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('default');
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [storageLoaded, setStorageLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: session, isPending: sessionPending } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const user = session?.user;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            if (page === 'signin' && redirectNotice) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন');
        }
    }["Storefront.useEffect"], [
        page,
        redirectNotice
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            try {
                const savedCart = localStorage.getItem('bazardor-cart');
                const savedFavorites = localStorage.getItem('bazardor-favorites');
                // Rehydrate browser-only shopping state after the server-rendered markup hydrates.
                // oxlint-disable-next-line react/set-state-in-effect
                if (savedCart) setCart(JSON.parse(savedCart));
                // oxlint-disable-next-line react/set-state-in-effect
                if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
            } catch  {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('সংরক্ষিত পছন্দের তালিকা পড়া যায়নি');
            } finally{
                setStorageLoaded(true);
            }
        }
    }["Storefront.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            if (!storageLoaded) return;
            localStorage.setItem('bazardor-cart', JSON.stringify(cart));
            localStorage.setItem('bazardor-favorites', JSON.stringify(favorites));
        }
    }["Storefront.useEffect"], [
        cart,
        favorites,
        storageLoaded
    ]);
    const activeCategory = route.page === 'category' ? route.categoryId : category;
    const productsRequestKey = `${activeCategory || 'all'}-${refreshKey}`;
    const productsLoading = productsResult.key !== productsRequestKey;
    const productsError = productsResult.key === productsRequestKey ? productsResult.error || categoriesError : '';
    const products = productsResult.key === productsRequestKey ? productsResult.products : EMPTY_PRODUCTS;
    const detailsRequestKey = `${route.id || ''}-${refreshKey}`;
    const detailsLoading = route.page === 'product' && detailsResult.key !== detailsRequestKey;
    const detailsError = detailsResult.key === detailsRequestKey ? detailsResult.error : '';
    const product = detailsResult.key === detailsRequestKey ? detailsResult.product : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            const controller = new AbortController();
            const requestKey = `${activeCategory || 'all'}-${refreshKey}`;
            const query = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : '';
            fetchApi(`/products${query}`, controller.signal).then({
                "Storefront.useEffect": (data)=>setProductsResult({
                        key: requestKey,
                        products: data,
                        error: ''
                    })
            }["Storefront.useEffect"]).catch({
                "Storefront.useEffect": (error)=>{
                    if (error.name !== 'AbortError') setProductsResult({
                        key: requestKey,
                        products: [],
                        error: error.message
                    });
                }
            }["Storefront.useEffect"]);
            return ({
                "Storefront.useEffect": ()=>controller.abort()
            })["Storefront.useEffect"];
        }
    }["Storefront.useEffect"], [
        activeCategory,
        refreshKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            const controller = new AbortController();
            fetchApi('/categories', controller.signal).then({
                "Storefront.useEffect": (data)=>{
                    setCategories(data);
                    setCategoriesError('');
                }
            }["Storefront.useEffect"]).catch({
                "Storefront.useEffect": (error)=>{
                    if (error.name !== 'AbortError') setCategoriesError(error.message);
                }
            }["Storefront.useEffect"]);
            return ({
                "Storefront.useEffect": ()=>controller.abort()
            })["Storefront.useEffect"];
        }
    }["Storefront.useEffect"], [
        refreshKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Storefront.useEffect": ()=>{
            if (route.page !== 'product' || !route.id || !user) return undefined;
            const controller = new AbortController();
            const requestKey = `${route.id}-${refreshKey}`;
            fetchApi(`/products/${encodeURIComponent(route.id)}`, controller.signal).then({
                "Storefront.useEffect": (data)=>setDetailsResult({
                        key: requestKey,
                        product: data,
                        error: ''
                    })
            }["Storefront.useEffect"]).catch({
                "Storefront.useEffect": (error)=>{
                    if (error.name !== 'AbortError') setDetailsResult({
                        key: requestKey,
                        product: null,
                        error: error.message
                    });
                }
            }["Storefront.useEffect"]);
            return ({
                "Storefront.useEffect": ()=>controller.abort()
            })["Storefront.useEffect"];
        }
    }["Storefront.useEffect"], [
        route.id,
        route.page,
        refreshKey,
        user
    ]);
    function navigate(path) {
        router.push(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    function addToCart(id) {
        setCart((items)=>({
                ...items,
                [id]: (items[id] || 0) + 1
            }));
        setNotice('Added to your basket');
        window.setTimeout(()=>setNotice(''), 1800);
    }
    function toggleFavorite(id) {
        setFavorites((items)=>items.includes(id) ? items.filter((item)=>item !== id) : [
                ...items,
                id
            ]);
    }
    async function submitAuth(event) {
        event.preventDefault();
        setAuthLoading(true);
        const form = new FormData(event.currentTarget);
        const email = String(form.get('email') || '');
        const password = String(form.get('password') || '');
        try {
            if (route.page === 'signup') {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signUp.email({
                    name: String(form.get('name') || ''),
                    email,
                    password
                });
                if (result.error) throw new Error(result.error.message);
                const signOutResult = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signOut();
                if (signOutResult.error) throw new Error(signOutResult.error.message);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।');
                router.push('/signin');
            } else {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signIn.email({
                    email,
                    password
                });
                if (result.error) throw new Error(result.error.message);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('সফলভাবে সাইন ইন হয়েছে');
                router.push(nextPath.startsWith('/') && !nextPath.startsWith('//') ? nextPath : '/');
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error instanceof Error ? error.message : 'সাইন ইন করা যায়নি। আবার চেষ্টা করুন।');
        } finally{
            setAuthLoading(false);
        }
    }
    async function signInSocial(provider) {
        setAuthLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signIn.social({
                provider,
                callbackURL: '/'
            });
            if (result.error) throw new Error(result.error.message);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error instanceof Error ? error.message : 'সোশ্যাল সাইন ইন করা যায়নি');
            setAuthLoading(false);
        }
    }
    async function signOut() {
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].signOut();
            if (result.error) throw new Error(result.error.message);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('সাইন আউট হয়েছে');
            router.push('/');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error instanceof Error ? error.message : 'সাইন আউট করা যায়নি');
        }
    }
    async function updateProfile(event) {
        event.preventDefault();
        const name = String(new FormData(event.currentTarget).get('name') || '').trim();
        if (!name) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('আপনার নাম লিখুন');
            return;
        }
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].updateUser({
                name
            });
            if (result.error) throw new Error(result.error.message);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('প্রোফাইল আপডেট হয়েছে');
            router.push('/profile');
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error instanceof Error ? error.message : 'প্রোফাইল আপডেট করা যায়নি');
        }
    }
    const cartCount = Object.values(cart).reduce((sum, quantity)=>sum + quantity, 0);
    const visibleProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Storefront.useMemo[visibleProducts]": ()=>{
            const filtered = products.filter({
                "Storefront.useMemo[visibleProducts].filtered": (product)=>`${product.nameBn} ${product.categoryNameBn}`.toLowerCase().includes(search.toLowerCase())
            }["Storefront.useMemo[visibleProducts].filtered"]);
            if (sortOrder === 'ascending') return filtered.slice().sort({
                "Storefront.useMemo[visibleProducts]": (a, b)=>a.today - b.today
            }["Storefront.useMemo[visibleProducts]"]);
            if (sortOrder === 'descending') return filtered.slice().sort({
                "Storefront.useMemo[visibleProducts]": (a, b)=>b.today - a.today
            }["Storefront.useMemo[visibleProducts]"]);
            return filtered;
        }
    }["Storefront.useMemo[visibleProducts]"], [
        products,
        search,
        sortOrder
    ]);
    const risingProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Storefront.useMemo[risingProducts]": ()=>products.filter({
                "Storefront.useMemo[risingProducts]": (item)=>item.change.dir === 'up'
            }["Storefront.useMemo[risingProducts]"]).slice().sort({
                "Storefront.useMemo[risingProducts]": (a, b)=>b.change.pct - a.change.pct
            }["Storefront.useMemo[risingProducts]"]).slice(0, 6)
    }["Storefront.useMemo[risingProducts]"], [
        products
    ]);
    const fallingProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Storefront.useMemo[fallingProducts]": ()=>products.filter({
                "Storefront.useMemo[fallingProducts]": (item)=>item.change.dir === 'down'
            }["Storefront.useMemo[fallingProducts]"]).slice().sort({
                "Storefront.useMemo[fallingProducts]": (a, b)=>b.change.pct - a.change.pct
            }["Storefront.useMemo[fallingProducts]"]).slice(0, 6)
    }["Storefront.useMemo[fallingProducts]"], [
        products
    ]);
    function renderProducts(items) {
        if (productsLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "product-grid skeleton-grid",
            role: "status",
            "aria-label": "পণ্য লোড হচ্ছে",
            children: Array.from({
                length: 6
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "product-card skeleton-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "skeleton-image"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 223,
                            columnNumber: 220
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "skeleton-lines",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 223,
                                    columnNumber: 286
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 223,
                                    columnNumber: 294
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 223,
                                    columnNumber: 302
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 223,
                            columnNumber: 254
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/components/Storefront.jsx",
                    lineNumber: 223,
                    columnNumber: 160
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Storefront.jsx",
            lineNumber: 223,
            columnNumber: 33
        }, this);
        if (productsError) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "empty-state api-error",
            role: "alert",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "পণ্য লোড করা যায়নি: ",
                        productsError
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Storefront.jsx",
                    lineNumber: 224,
                    columnNumber: 83
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "primary-button",
                    onClick: ()=>setRefreshKey((value)=>value + 1),
                    children: "আবার চেষ্টা করুন"
                }, void 0, false, {
                    fileName: "[project]/src/components/Storefront.jsx",
                    lineNumber: 224,
                    columnNumber: 126
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Storefront.jsx",
            lineNumber: 224,
            columnNumber: 31
        }, this);
        if (items.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "empty-state",
            children: "কোনো পণ্য পাওয়া যায়নি।"
        }, void 0, false, {
            fileName: "[project]/src/components/Storefront.jsx",
            lineNumber: 225,
            columnNumber: 36
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "product-grid",
            children: items.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "product-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}`,
                            onClick: ()=>toggleFavorite(product.id),
                            "aria-label": `Add ${product.nameBn} to favorites`,
                            children: favorites.includes(product.id) ? '♥' : '♡'
                        }, void 0, false, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "product-image",
                            onClick: ()=>navigate(`/product/${product.slug}`),
                            "aria-label": `View ${product.nameBn}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: product.image
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "product-info",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-category",
                                    children: product.categoryNameBn
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "product-name",
                                    onClick: ()=>navigate(`/product/${product.slug}`),
                                    children: product.nameBn
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "product-unit",
                                    children: [
                                        "প্রতি ",
                                        formatUnit(product.unit)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "product-price-row",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "আজকের দাম"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 237,
                                            columnNumber: 48
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                formatNumber(product.today),
                                                " টাকা"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 237,
                                            columnNumber: 70
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "product-bottom",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `change-badge ${getPriceChange(product).className}`,
                                            children: [
                                                getPriceChange(product).arrow,
                                                " ",
                                                percentFormatter.format(product.change.pct),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 238,
                                            columnNumber: 45
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "add-button",
                                            onClick: ()=>addToCart(product.id),
                                            "aria-label": `Add ${product.nameBn} to basket`,
                                            children: cart[product.id] ? `+ ${formatNumber(cart[product.id])}` : '+'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 238,
                                            columnNumber: 200
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    ]
                }, product.id, true, {
                    fileName: "[project]/src/components/Storefront.jsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Storefront.jsx",
            lineNumber: 226,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "topline",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "brand bazar-brand",
                                onClick: ()=>navigate('/'),
                                "aria-label": "বাজার দর হোম",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-mark",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 249,
                                        columnNumber: 105
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "বাজার দর",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: banglaDate
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 249,
                                                columnNumber: 157
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 249,
                                        columnNumber: 143
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "location",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pin",
                                        children: "⌖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 250,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: "Deliver to"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 250,
                                                columnNumber: 73
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Dhaka, Bangladesh"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 250,
                                                columnNumber: 98
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 250,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "chevron",
                                        children: "⌄"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 250,
                                        columnNumber: 139
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "searchbox",
                                onSubmit: (event)=>{
                                    event.preventDefault();
                                    navigate('/');
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⌕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: (event)=>setSearch(event.target.value),
                                        placeholder: "Search fresh products...",
                                        "aria-label": "Search products"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 252,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-label": "Submit search",
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 252,
                                        columnNumber: 171
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-action",
                                        onClick: ()=>navigate('/profile'),
                                        "aria-label": "Favorites",
                                        children: "♡"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-action cart-action",
                                        onClick: ()=>setNotice(cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} in your basket` : 'Your basket is empty'),
                                        "aria-label": "Shopping basket",
                                        children: [
                                            "♧",
                                            cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "cart-count",
                                                children: cartCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 256,
                                                columnNumber: 233
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this),
                                    sessionPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "account-loading",
                                        role: "status",
                                        children: "লোড হচ্ছে..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 257,
                                        columnNumber: 31
                                    }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "account-link",
                                                onClick: ()=>navigate('/profile'),
                                                children: user.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 257,
                                                columnNumber: 110
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "signout-button header-signout",
                                                onClick: signOut,
                                                children: "সাইন আউট"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 257,
                                                columnNumber: 200
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 257,
                                        columnNumber: 108
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-links",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "account-link",
                                                onClick: ()=>navigate('/signin'),
                                                children: "সাইন ইন"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 257,
                                                columnNumber: 319
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "header-signup",
                                                onClick: ()=>navigate('/signup'),
                                                children: "সাইন আপ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 257,
                                                columnNumber: 404
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 257,
                                        columnNumber: 291
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "main-nav",
                        "aria-label": "Main navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: route.page === 'home' && !category ? 'nav-active' : '',
                                onClick: ()=>{
                                    setCategory('');
                                    navigate('/');
                                },
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: route.page === 'category' ? 'nav-active' : '',
                                onClick: ()=>navigate('/category'),
                                children: [
                                    "Shop by category ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "⌄"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 262,
                                        columnNumber: 132
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: category === item.id || route.categoryId === item.slug ? 'nav-active' : '',
                                    onClick: ()=>{
                                        setSortOrder('default');
                                        navigate(`/category/${item.slug}`);
                                    },
                                    children: item.nameBn
                                }, item.id, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 263,
                                    columnNumber: 37
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "nav-spacer"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "offer-link",
                                onClick: ()=>{
                                    setCategory('');
                                    navigate('/');
                                },
                                children: "✦  Special offers"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 264,
                                columnNumber: 42
                            }, this),
                            !sessionPending && (user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "account-mobile",
                                        onClick: ()=>navigate('/profile'),
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 265,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "account-mobile account-mobile-signout",
                                        onClick: signOut,
                                        children: "সাইন আউট"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 265,
                                        columnNumber: 133
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 265,
                                columnNumber: 39
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "account-mobile",
                                        onClick: ()=>navigate('/signin'),
                                        children: "সাইন ইন"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 265,
                                        columnNumber: 234
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "account-mobile",
                                        onClick: ()=>navigate('/signup'),
                                        children: "সাইন আপ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 265,
                                        columnNumber: 321
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 265,
                                columnNumber: 232
                            }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-ticker",
                        "aria-label": "আজকের বাজারদর",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ticker-track",
                            children: [
                                ...products,
                                ...products
                            ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: item.image
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 267,
                                            columnNumber: 179
                                        }, this),
                                        " ",
                                        item.nameBn,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                formatNumber(item.today),
                                                " টাকা/",
                                                formatUnit(item.unit)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 267,
                                            columnNumber: 213
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: getPriceChange(item).className,
                                            children: [
                                                getPriceChange(item).arrow,
                                                " ",
                                                percentFormatter.format(item.change.pct),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 267,
                                            columnNumber: 286
                                        }, this)
                                    ]
                                }, `${item.id}-${index}`, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 267,
                                    columnNumber: 145
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 267,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Storefront.jsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    route.page === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "hero-banner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-copy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "eyebrow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "fresh-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 66
                                                    }, this),
                                                    " আজকের বাজারের হালনাগাদ তথ্য"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 273,
                                                columnNumber: 40
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                children: [
                                                    "প্রতিদিনের বাজারদর ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "জানুন এক নজরে"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 154
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 273,
                                                columnNumber: 131
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "দেশের বিভিন্ন বাজার থেকে সংগৃহীত পণ্যের",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "desktop-break"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 227
                                                    }, this),
                                                    " নির্ভরযোগ্য দাম দেখুন সহজেই।"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 273,
                                                columnNumber: 185
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "primary-button",
                                                onClick: ()=>document.getElementById('shop-products')?.scrollIntoView({
                                                        behavior: 'smooth'
                                                    }),
                                                children: [
                                                    "সব পণ্য দেখুন ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 438
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 273,
                                                columnNumber: 292
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hero-trust",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓ বাজারভিত্তিক দাম"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 489
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "✓ প্রতিদিন হালনাগাদ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 520
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 273,
                                                columnNumber: 461
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-art",
                                        "aria-label": "Basket of fresh produce",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sun-shape"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 76
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p1",
                                                children: "🥬"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 105
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p2",
                                                children: "🥕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 143
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p3",
                                                children: "🥑"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 181
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p4",
                                                children: "🍊"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 219
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p5",
                                                children: "🍎"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 257
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "produce p6",
                                                children: "🌿"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 295
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "basket",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "FRESH"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 274,
                                                    columnNumber: 357
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 333
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "art-shadow"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 274,
                                                columnNumber: 381
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hero-dots",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "selected"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 275,
                                                columnNumber: 40
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 275,
                                                columnNumber: 69
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 275,
                                                columnNumber: 77
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 275,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "benefit-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "benefit-icon",
                                                children: "♧"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Farm fresh"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 94
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Picked fresh every day"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 121
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 88
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 277,
                                        columnNumber: 44
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "benefit-icon",
                                                children: "♧"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 176
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "100% natural"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 221
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "No harmful chemicals"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 250
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 215
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 277,
                                        columnNumber: 171
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "benefit-icon",
                                                children: "♧"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 303
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Fast delivery"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 348
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "At your door in hours"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 378
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 342
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 277,
                                        columnNumber: 298
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "benefit-icon",
                                                children: "♧"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 432
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Best prices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 477
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Fresh deals every day"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 277,
                                                        columnNumber: 505
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 277,
                                                columnNumber: 471
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 277,
                                        columnNumber: 427
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "trend-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-heading",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eyebrow",
                                                    children: "MARKET MOVEMENT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 278,
                                                    columnNumber: 84
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: "আজ দাম বেড়েছে ▲"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 278,
                                                    columnNumber: 132
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "যে পণ্যগুলোর দাম আজ সবচেয়ে বেশি বেড়েছে"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 278,
                                                    columnNumber: 157
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 278,
                                            columnNumber: 79
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 278,
                                        columnNumber: 46
                                    }, this),
                                    renderProducts(risingProducts)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "trend-section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-heading",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eyebrow",
                                                    children: "MARKET MOVEMENT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 84
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: "আজ দাম কমেছে ▼"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 132
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "যে পণ্যগুলোর দাম আজ কমেছে"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 155
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 279,
                                            columnNumber: 79
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 279,
                                        columnNumber: 46
                                    }, this),
                                    renderProducts(fallingProducts)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "shop-section",
                                id: "shop-products",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "eyebrow",
                                                        children: "আজকের বাজারদর"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 281,
                                                        columnNumber: 51
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        children: "সব পণ্য"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 281,
                                                        columnNumber: 97
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "আজকের বাজারের পণ্যের হালনাগাদ দাম।"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 281,
                                                        columnNumber: 113
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 281,
                                                columnNumber: 46
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-link",
                                                onClick: ()=>navigate('/category'),
                                                children: [
                                                    "সব ক্যাটাগরি ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 281,
                                                        columnNumber: 241
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 281,
                                                columnNumber: 160
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "category-tabs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: !category ? 'tab-active' : '',
                                                onClick: ()=>setCategory(''),
                                                children: "সব পণ্য"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 282,
                                                columnNumber: 44
                                            }, this),
                                            categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: category === item.id ? 'tab-active' : '',
                                                    onClick: ()=>setCategory(item.id),
                                                    children: [
                                                        item.icon,
                                                        " ",
                                                        item.nameBn
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 282,
                                                    columnNumber: 168
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this),
                                    renderProducts(visibleProducts)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "newsletter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "eyebrow",
                                                children: "A LITTLE FRESHNESS IN YOUR INBOX"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 285,
                                                columnNumber: 48
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Get the freshest deals first"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 285,
                                                columnNumber: 113
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Sign up for our newsletter and enjoy 10% off your first order."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 285,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 285,
                                        columnNumber: 43
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: (event)=>{
                                            event.preventDefault();
                                            setNotice('Thanks for subscribing!');
                                            event.currentTarget.reset();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                placeholder: "Your email address",
                                                required: true,
                                                "aria-label": "Email address"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 285,
                                                columnNumber: 347
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "primary-button",
                                                children: [
                                                    "Subscribe ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 285,
                                                        columnNumber: 483
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 285,
                                                columnNumber: 438
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 285,
                                        columnNumber: 225
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 271,
                        columnNumber: 35
                    }, this),
                    route.page === 'category' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "page-section category-page",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/'),
                                        children: "হোম"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 115
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: " / "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 165
                                    }, this),
                                    " ",
                                    route.categoryId ? categories.find((item)=>item.slug === route.categoryId)?.nameBn || 'ক্যাটাগরি' : 'ক্যাটাগরি'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 288,
                                columnNumber: 87
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "page-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "eyebrow",
                                            children: "বাজারদরের ক্যাটাগরি"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 288,
                                            columnNumber: 336
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            children: route.categoryId ? categories.find((item)=>item.slug === route.categoryId)?.nameBn || 'ক্যাটাগরি পাওয়া যায়নি' : 'সব ক্যাটাগরি'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 288,
                                            columnNumber: 388
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "বিভিন্ন পণ্যের আজকের বাজারদর দেখুন।"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 288,
                                            columnNumber: 529
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 288,
                                    columnNumber: 331
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 288,
                                columnNumber: 303
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-tabs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: !route.categoryId ? 'tab-active' : '',
                                        onClick: ()=>navigate('/category'),
                                        children: "সব পণ্য"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 614
                                    }, this),
                                    categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: route.categoryId === item.slug ? 'tab-active' : '',
                                            onClick: ()=>{
                                                setSortOrder('default');
                                                navigate(`/category/${item.slug}`);
                                            },
                                            children: [
                                                item.icon,
                                                " ",
                                                item.nameBn
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 288,
                                            columnNumber: 752
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 288,
                                columnNumber: 583
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-sort",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "sort-products",
                                        children: "সাজান:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 990
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "sort-products",
                                        value: sortOrder,
                                        onChange: (event)=>setSortOrder(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "default",
                                                children: "ডিফল্ট"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 288,
                                                columnNumber: 1135
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ascending",
                                                children: "দাম: কম থেকে বেশি"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 288,
                                                columnNumber: 1174
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "descending",
                                                children: "দাম: বেশি থেকে কম"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 288,
                                                columnNumber: 1226
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 1035
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 288,
                                columnNumber: 959
                            }, this),
                            route.categoryId && !productsLoading && !productsError && visibleProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-category",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🔎"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 1416
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "এই ক্যাটাগরিতে কোনো পণ্য নেই"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 1431
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-button",
                                        onClick: ()=>navigate('/'),
                                        children: "হোম পেজে ফিরে যান"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 288,
                                        columnNumber: 1468
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 288,
                                columnNumber: 1384
                            }, this) : renderProducts(visibleProducts)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 288,
                        columnNumber: 39
                    }, this),
                    route.page === 'product' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "page-section product-page",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/'),
                                        children: "হোম"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 113
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: " / "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 163
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate(`/category/${product?.category || ''}`),
                                        children: product?.categoryNameBn || 'পণ্য'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 179
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: " / "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 296
                                    }, this),
                                    product?.nameBn || ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 290,
                                columnNumber: 85
                            }, this),
                            detailsLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "empty-state",
                                role: "status",
                                children: "পণ্যের তথ্য লোড হচ্ছে..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 290,
                                columnNumber: 360
                            }, this),
                            detailsError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state api-error",
                                role: "alert",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "পণ্যের তথ্য লোড করা যায়নি: ",
                                            detailsError
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 499
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "primary-button",
                                        onClick: ()=>setRefreshKey((value)=>value + 1),
                                        children: "আবার চেষ্টা করুন"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 548
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 290,
                                columnNumber: 447
                            }, this),
                            product && !detailsLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detail-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "detail-image",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: product.image
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 759
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "fresh-badge",
                                                        children: [
                                                            product.categoryIcon,
                                                            " ",
                                                            product.categoryNameBn
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 787
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 290,
                                                columnNumber: 729
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "detail-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "eyebrow",
                                                        children: product.categoryNameBn
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 906
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        children: product.nameBn
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 963
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "detail-description",
                                                        children: "বিভিন্ন বাজার থেকে সংগৃহীত আজকের হালনাগাদ দাম। বাজারভেদে দামের পার্থক্য থাকতে পারে।"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 988
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "detail-price",
                                                        children: [
                                                            formatNumber(product.today),
                                                            " টাকা",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    " / প্রতি ",
                                                                    formatUnit(product.unit)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 1173
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 1109
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `change-badge ${getPriceChange(product).className}`,
                                                        children: [
                                                            getPriceChange(product).arrow,
                                                            " ",
                                                            percentFormatter.format(product.change.pct),
                                                            "% গতকালের তুলনায়"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 1227
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "detail-actions",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "primary-button",
                                                                onClick: ()=>addToCart(product.id),
                                                                children: [
                                                                    "তালিকায় যোগ করুন ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "→"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                                        lineNumber: 290,
                                                                        columnNumber: 1521
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 1430
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "detail-favorite",
                                                                onClick: ()=>toggleFavorite(product.id),
                                                                children: favorites.includes(product.id) ? '♥ পছন্দের তালিকায় আছে' : '♡ পছন্দের তালিকায় যোগ করুন'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 1544
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 1398
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "delivery-note",
                                                        children: "সর্বশেষ হালনাগাদ: আজকের বাজার জরিপ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 1729
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 290,
                                                columnNumber: 877
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 700
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "product-details",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "বাজারভিত্তিক আজকের দাম"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 290,
                                                columnNumber: 1849
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "price-summary",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "সর্বনিম্ন"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 1916
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    formatNumber(Math.min(...product.markets.map((market)=>market.min))),
                                                                    " টাকা"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 1938
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 1911
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "সর্বোচ্চ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2043
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    formatNumber(Math.max(...product.markets.map((market)=>market.max))),
                                                                    " টাকা"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2064
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 2038
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "গড় দাম"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2169
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: [
                                                                    formatNumber(Math.round(product.markets.reduce((total, market)=>total + (market.min + market.max) / 2, 0) / product.markets.length)),
                                                                    " টাকা"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2189
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 2164
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 290,
                                                columnNumber: 1880
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "market-table",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "market-row market-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "বাজার"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2429
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "বিভাগ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2451
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "সর্বনিম্ন"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2473
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "সর্বোচ্চ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 290,
                                                                columnNumber: 2499
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 290,
                                                        columnNumber: 2389
                                                    }, this),
                                                    product.markets.map((market)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "market-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: market.market
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 2635
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: market.division
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 2663
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        formatNumber(market.min),
                                                                        " টাকা"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 2693
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        formatNumber(market.max),
                                                                        " টাকা"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 2737
                                                                }, this)
                                                            ]
                                                        }, `${market.market}-${market.division}`, true, {
                                                            fileName: "[project]/src/components/Storefront.jsx",
                                                            lineNumber: 290,
                                                            columnNumber: 2563
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 290,
                                                columnNumber: 2359
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 290,
                                        columnNumber: 1812
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 290,
                                columnNumber: 698
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 290,
                        columnNumber: 38
                    }, this),
                    (route.page === 'signin' || route.page === 'signup') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "auth-page",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "auth-icon",
                                    children: "🛒"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "eyebrow",
                                    children: "বাজার দর"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 161
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    children: route.page === 'signup' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'আপনার অ্যাকাউন্টে সাইন ইন করুন'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 202
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: route.page === 'signup' ? 'আজকের বাজারদর সহজে জানতে নিবন্ধন করুন।' : 'বাজারদর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 301
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: submitAuth,
                                    children: [
                                        route.page === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "নাম",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    name: "name",
                                                    type: "text",
                                                    placeholder: "আপনার নাম",
                                                    autoComplete: "name",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 491
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 481
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "ইমেইল",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    name: "email",
                                                    type: "email",
                                                    placeholder: "you@example.com",
                                                    autoComplete: "email",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 598
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 586
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "পাসওয়ার্ড",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    name: "password",
                                                    type: "password",
                                                    placeholder: "কমপক্ষে ৮ অক্ষর",
                                                    minLength: "8",
                                                    autoComplete: route.page === 'signup' ? 'new-password' : 'current-password',
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 718
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 701
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "primary-button auth-submit",
                                            disabled: authLoading,
                                            children: [
                                                authLoading ? 'অপেক্ষা করুন...' : route.page === 'signup' ? 'সাইন আপ' : 'সাইন ইন',
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 292,
                                                    columnNumber: 1051
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 897
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 425
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "social-divider",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "অথবা"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 292,
                                        columnNumber: 1113
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 1081
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "social-buttons",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: authLoading,
                                            onClick: ()=>signInSocial('google'),
                                            children: "Google দিয়ে চালিয়ে যান"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 1168
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: authLoading,
                                            onClick: ()=>signInSocial('github'),
                                            children: "GitHub দিয়ে চালিয়ে যান"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 1285
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 1136
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-switch",
                                    children: [
                                        route.page === 'signup' ? 'আগে থেকেই অ্যাকাউন্ট আছে?' : 'নতুন ব্যবহারকারী?',
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>navigate(route.page === 'signup' ? '/signin' : '/signup'),
                                            children: route.page === 'signup' ? 'সাইন ইন' : 'সাইন আপ করুন'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 292,
                                            columnNumber: 1515
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 292,
                                    columnNumber: 1408
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 292,
                            columnNumber: 97
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 292,
                        columnNumber: 66
                    }, this),
                    route.page === 'profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "page-section profile-page",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/'),
                                        children: "হোম"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 294,
                                        columnNumber: 113
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: " / "
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 294,
                                        columnNumber: 163
                                    }, this),
                                    " আমার প্রোফাইল"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 294,
                                columnNumber: 85
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "profile-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "profile-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "eyebrow",
                                                children: "আপনার বাজার দর অ্যাকাউন্ট"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 265
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                children: "আমার প্রোফাইল"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 323
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "আপনার অ্যাকাউন্টের তথ্য ও পছন্দের পণ্য দেখুন।"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 345
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 294,
                                        columnNumber: 232
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "profile-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "profile-user",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "avatar",
                                                        children: (user?.name || 'G').slice(0, 1).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 463
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                children: user?.name || 'ব্যবহারকারী'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 545
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: user?.email
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 583
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 540
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "signout-button",
                                                        onClick: signOut,
                                                        children: "সাইন আউট"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 609
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "profile-update-button",
                                                        onClick: ()=>navigate('/profile/update'),
                                                        children: "তথ্য পরিবর্তন"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 679
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 433
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "profile-stats",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "ঝুড়ির পণ্য"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 829
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: formatNumber(cartCount)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 853
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 824
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "পছন্দের পণ্য"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 906
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: formatNumber(favorites.length)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Storefront.jsx",
                                                                lineNumber: 294,
                                                                columnNumber: 931
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Storefront.jsx",
                                                        lineNumber: 294,
                                                        columnNumber: 901
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 793
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 294,
                                        columnNumber: 403
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "favorites-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "আপনার পছন্দের পণ্য"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 1033
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    formatNumber(favorites.length),
                                                    " টি"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 294,
                                                columnNumber: 1060
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 294,
                                        columnNumber: 998
                                    }, this),
                                    renderProducts(products.filter((item)=>favorites.includes(item.id)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 294,
                                columnNumber: 199
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 294,
                        columnNumber: 38
                    }, this),
                    route.page === 'update-profile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "auth-page",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "auth-icon",
                                    children: "👤"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 103
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "eyebrow",
                                    children: "প্রোফাইল সেটিংস"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 140
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    children: "ব্যক্তিগত তথ্য পরিবর্তন"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 188
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "আপনার নাম হালনাগাদ করুন।"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 220
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: updateProfile,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "নাম",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    name: "name",
                                                    type: "text",
                                                    defaultValue: user?.name || '',
                                                    autoComplete: "name",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 292
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 296,
                                            columnNumber: 282
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "primary-button auth-submit",
                                            children: [
                                                "তথ্য আপডেট করুন ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Storefront.jsx",
                                                    lineNumber: 296,
                                                    columnNumber: 457
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Storefront.jsx",
                                            lineNumber: 296,
                                            columnNumber: 394
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 251
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-switch",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/profile'),
                                        children: "প্রোফাইলে ফিরে যান"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 296,
                                        columnNumber: 516
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Storefront.jsx",
                                    lineNumber: 296,
                                    columnNumber: 487
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Storefront.jsx",
                            lineNumber: 296,
                            columnNumber: 76
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 296,
                        columnNumber: 45
                    }, this),
                    route.page === 'not-found' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "page-section not-found",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "404"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 298,
                                columnNumber: 84
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "পৃষ্ঠাটি পাওয়া যায়নি"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 298,
                                columnNumber: 100
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "primary-button",
                                onClick: ()=>navigate('/'),
                                children: "হোম পেজে ফিরে যান"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 298,
                                columnNumber: 131
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 298,
                        columnNumber: 40
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Storefront.jsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "site-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "footer-brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-mark",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 98
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "বাজার দর",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: "আজকের বাজার, আপনার হাতেই"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Storefront.jsx",
                                                lineNumber: 301,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 136
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখুন।"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 196
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 68
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "ক্যাটাগরি"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 287
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/'),
                                        children: "হোম"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 305
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/category'),
                                        children: "সব ক্যাটাগরি"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 355
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (categories[0]) navigate(`/category/${categories[0].slug}`);
                                        },
                                        children: "পণ্যের দাম"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 422
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 282
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "আপনার অ্যাকাউন্ট"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 543
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/profile'),
                                        children: "আমার প্রোফাইল"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 568
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/signin'),
                                        children: "সাইন ইন"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 635
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>navigate('/signup'),
                                        children: "সাইন আপ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 695
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 538
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "বাজারদর সম্পর্কে"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 766
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "বিভিন্ন এলাকার বাজার থেকে সংগৃহীত সাম্প্রতিক দাম।"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 791
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "footer-contact",
                                        children: [
                                            "সর্বশেষ হালনাগাদ: ",
                                            banglaDate
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Storefront.jsx",
                                        lineNumber: 301,
                                        columnNumber: 847
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 761
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 301,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-bottom",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "© ২০২৫ বাজার দর। সর্বস্বত্ব সংরক্ষিত।"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 960
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "বাংলাদেশের বাজারদর"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Storefront.jsx",
                                lineNumber: 301,
                                columnNumber: 1010
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Storefront.jsx",
                        lineNumber: 301,
                        columnNumber: 929
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Storefront.jsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "toast",
                role: "status",
                children: notice
            }, void 0, false, {
                fileName: "[project]/src/components/Storefront.jsx",
                lineNumber: 302,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Storefront.jsx",
        lineNumber: 246,
        columnNumber: 5
    }, this);
}
_s(Storefront, "R9xbRP4aA0vPKIYTMyxBZDutXnY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession
    ];
});
_c = Storefront;
var _c;
__turbopack_context__.k.register(_c, "Storefront");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth-client.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authClient",
    ()=>authClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/client/react/index.mjs [app-client] (ecmascript) <locals>");
'use client';
;
const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAuthClient"])();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_07rwi082uk8l3._.js.map