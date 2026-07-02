import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronLeft, Search, ShoppingBag, User, X } from "lucide-react";
import "./styles.css";

const API = "http://localhost:8080/api";
const categories = ["ALL", "BAGS", "SHOES", "APPAREL", "ACCESSORIES", "NEW_ARRIVALS"];
const fallbackProducts = [
  ["Maison Leather Tote", "BAGS", 1290000, "/images/products/maison-tote.svg"],
  ["Atelier Mini Bag", "NEW_ARRIVALS", 980000, "/images/products/atelier-mini.svg"],
  ["Silk Signature Scarf", "ACCESSORIES", 360000, "/images/products/silk-scarf.svg"],
  ["Classic Leather Loafer", "SHOES", 720000, "/images/products/classic-loafer.svg"],
  ["Ganymede Black Coat", "NEW_ARRIVALS", 2450000, "/images/products/ganymede-black-coat.png", "/images/products/ganymede-black-coat-model.png"],
  ["Minimal Gold Bracelet", "ACCESSORIES", 540000, "/images/products/gold-bracelet.svg"],
  ["Burgundy Compact Wallet", "ACCESSORIES", 420000, "/images/products/burgundy-wallet.svg"],
  ["Ganymede Black Knit", "APPAREL", 690000, "/images/products/ganymede-black-knit.png", "/images/products/ganymede-black-knit-model.png"]
].map((p, i) => ({
  id: i + 1,
  name: p[0],
  category: p[1],
  price: p[2],
  thumbnailUrl: p[3],
  images: [p[3], p[4]].filter(Boolean),
  stock: 20,
  description: "Original GANYMEDE piece crafted for a restrained luxury wardrobe."
}));

const copy = {
  en: {
    collection: "COLLECTION",
    atelier: "ATELIER",
    signIn: "SIGN IN",
    bag: "BAG",
    search: "Search",
    season: "AUTUMN / WINTER - SEOUL",
    heroTitle: "The quiet weight of well-made things",
    heroBody: "GANYMEDE composes a wardrobe of restraint: considered tailoring, elevated knitwear, and outerwear built to outlast the season.",
    discover: "DISCOVER THE COLLECTION",
    heroImage: "The Overcoat",
    made: "MADE IN SEOUL",
    fibers: "NATURAL FIBERS ONLY",
    considered: "CONSIDERED, NOT SEASONAL",
    shipping: "COMPLIMENTARY GLOBAL SHIPPING",
    edit: "THE EDIT",
    signature: "Signature pieces",
    viewAll: "VIEW ALL",
    atelierTitle: "An obsession with the unseen",
    atelierBody: "Every GANYMEDE garment begins with the cloth. We work with small circles of mills and finish each interior seam, collar, and hardware choice with quiet intent.",
    explore: "EXPLORE THE WARDROBE",
    knitTitle: "Weightless warmth, quiet lines",
    knitBody: "Extra-fine knitwear shaped for calm silhouettes and daily wear.",
    shopKnit: "SHOP KNITWEAR",
    pieces: "pieces",
    back: "COLLECTION",
    colour: "COLOUR",
    size: "SIZE",
    selectSize: "PLEASE SELECT A SIZE",
    addBag: "ADD TO BAG",
    buyNow: "BUY NOW",
    details: "DETAILS",
    care: "FABRIC & CARE",
    returns: "SHIPPING & RETURNS",
    also: "You may also like",
    cartTitle: "Shopping Bag",
    order: "Order Summary",
    subtotal: "Subtotal",
    total: "TOTAL",
    checkout: "SIGN IN TO CHECKOUT",
    continue: "CONTINUE SHOPPING",
    loginTitle: "Sign In",
    registerTitle: "Register",
    welcome: "WELCOME BACK",
    email: "EMAIL ADDRESS",
    password: "PASSWORD",
    name: "NAME",
    phone: "PHONE",
    create: "CREATE ACCOUNT",
    mypage: "My GANYMEDE",
    logout: "LOGOUT"
  },
  ko: {
    collection: "컬렉션",
    atelier: "아틀리에",
    signIn: "로그인",
    bag: "백",
    search: "검색",
    season: "가을 / 겨울 - 서울",
    heroTitle: "잘 만든 것들이 주는 조용한 무게",
    heroBody: "가니메데는 절제된 테일러링, 고급 니트웨어, 오래 입는 아우터로 조용한 럭셔리의 옷장을 제안합니다.",
    discover: "컬렉션 보기",
    heroImage: "오버코트",
    made: "서울 제작",
    fibers: "천연 섬유 중심",
    considered: "유행보다 완성도",
    shipping: "무료 배송",
    edit: "에디트",
    signature: "시그니처 피스",
    viewAll: "전체 보기",
    atelierTitle: "보이지 않는 디테일에 대한 집착",
    atelierBody: "가니메데의 옷은 원단에서 시작합니다. 칼라, 봉제, 단추, 안감까지 오래 입을수록 조용히 드러나는 완성도를 추구합니다.",
    explore: "옷장 둘러보기",
    knitTitle: "가벼운 온기, 정제된 선",
    knitBody: "일상에서 오래 입을 수 있도록 차분한 실루엣으로 완성한 니트웨어.",
    shopKnit: "니트웨어 보기",
    pieces: "개 상품",
    back: "컬렉션",
    colour: "색상",
    size: "사이즈",
    selectSize: "사이즈를 선택해주세요",
    addBag: "장바구니 담기",
    buyNow: "바로 구매",
    details: "상세 정보",
    care: "소재 및 관리",
    returns: "배송 및 반품",
    also: "함께 보면 좋은 상품",
    cartTitle: "쇼핑백",
    order: "주문 요약",
    subtotal: "상품 금액",
    total: "총 결제 금액",
    checkout: "결제 진행",
    continue: "계속 쇼핑하기",
    loginTitle: "로그인",
    registerTitle: "회원가입",
    welcome: "다시 만나 반가워요",
    email: "이메일",
    password: "비밀번호",
    name: "이름",
    phone: "전화번호",
    create: "계정 만들기",
    mypage: "마이 가니메데",
    logout: "로그아웃"
  }
};

function money(value) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);
}

function categoryLabel(category) {
  return category.replace("_", " ");
}

function Logo() {
  return (
    <span className="wordmark">
      <img src="/images/brand/ganymede-logo-transparent.png" alt="GANYMEDE" />
    </span>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [products, setProducts] = useState(fallbackProducts);
  const [selected, setSelected] = useState(fallbackProducts[4]);
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const t = copy[lang];

  const headers = token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };

  useEffect(() => {
    fetch(`${API}/products`).then((r) => r.json()).then(setProducts).catch(() => setProducts(fallbackProducts));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/auth/me`, { headers }).then((r) => r.json()).then(setUser).catch(() => setUser(null));
    loadCart();
  }, [token]);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const inCategory = category === "ALL" || product.category === category;
    const inSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return inCategory && inSearch;
  }), [products, category, search]);

  async function auth(path, payload) {
    const res = await fetch(`${API}/auth/${path}`, { method: "POST", headers, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setPage("home");
    }
  }

  async function loadCart() {
    if (!token) return;
    const data = await fetch(`${API}/cart`, { headers }).then((r) => r.json()).catch(() => []);
    setCart(Array.isArray(data) ? data : []);
  }

  async function addToCart(product, quantity = 1) {
    if (!token) {
      setPage("login");
      return;
    }
    await fetch(`${API}/cart`, { method: "POST", headers, body: JSON.stringify({ productId: product.id, quantity }) });
    await loadCart();
    setPage("cart");
  }

  async function checkout(form) {
    await fetch(`${API}/orders`, { method: "POST", headers, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    setCart([]);
    setPage("mypage");
  }

  function openProduct(product) {
    setSelected(product);
    setPage("detail");
  }

  return (
    <>
      <header className="nav">
        <nav className="nav-left">
          <button onClick={() => { setCategory("ALL"); setPage("shop"); }}>{t.collection}</button>
          <button onClick={() => setPage("home")}>{t.atelier}</button>
        </nav>
        <button className="brand" onClick={() => setPage("home")} aria-label="GANYMEDE home">
          <Logo />
        </button>
        <div className="tools">
          <button className="lang" onClick={() => setLang(lang === "en" ? "ko" : "en")}>{lang === "en" ? "KR" : "EN"}</button>
          <label className="search"><Search size={14} /><input placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setPage("shop")} /></label>
          <button onClick={() => setPage(token ? "mypage" : "login")}><User size={15} /> {t.signIn}</button>
          <button className="bag-button" onClick={() => setPage("cart")}><ShoppingBag size={15} /> {t.bag}<span>{cart.length}</span></button>
        </div>
      </header>

      {page === "home" && <Home t={t} products={products} setPage={setPage} open={openProduct} />}
      {page === "shop" && <Shop t={t} products={visibleProducts} category={category} setCategory={setCategory} open={openProduct} />}
      {page === "detail" && <Detail t={t} product={selected} setPage={setPage} addToCart={addToCart} products={products} open={openProduct} />}
      {page === "cart" && <Cart t={t} cart={cart} reload={loadCart} headers={headers} checkout={(form) => checkout(form)} setPage={setPage} />}
      {page === "login" && <Auth t={t} auth={auth} />}
      {page === "mypage" && <MyPage t={t} user={user} token={token} logout={() => { localStorage.removeItem("token"); setToken(""); setUser(null); setCart([]); setPage("home"); }} />}
      {page !== "login" && <Footer t={t} />}
    </>
  );
}

function Home({ t, products, setPage, open }) {
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{t.season}</p>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroBody}</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setPage("shop")}>{t.discover}</button>
          <button className="link-button" onClick={() => setPage("shop")}>{t.atelier}</button>
        </div>
      </div>
      <button className="hero-image" onClick={() => open(products[4] || products[0])}>
        <img src="/images/products/ganymede-black-coat-model.png" alt="GANYMEDE black coat" />
        <span>{t.heroImage}</span>
      </button>
    </section>
    <div className="promise">
      <span>{t.made}</span><span>{t.fibers}</span><span>{t.considered}</span><span>{t.shipping}</span>
    </div>
    <ProductGrid eyebrow={t.edit} title={t.signature} action={t.viewAll} products={products.slice(0, 4)} open={open} setPage={setPage} />
    <section className="atelier-block">
      <div className="atelier-image">
        <img src="/images/brand/ganymede-logo-transparent.png" alt="GANYMEDE logo" />
      </div>
      <div>
        <p className="eyebrow">{t.atelier}</p>
        <h2>{t.atelierTitle}</h2>
        <p>{t.atelierBody}</p>
        <button className="link-button" onClick={() => setPage("shop")}>{t.explore}</button>
      </div>
    </section>
    <section className="quiet-section">
      <p className="eyebrow">KNITWEAR</p>
      <h2>{t.knitTitle}</h2>
      <p>{t.knitBody}</p>
      <button className="primary" onClick={() => setPage("shop")}>{t.shopKnit}</button>
    </section>
  </main>;
}

function Shop({ t, products, category, setCategory, open }) {
  return <main className="page">
    <div className="page-head"><h1>{t.collection}</h1><p>{products.length} {t.pieces}</p></div>
    <div className="filters">{categories.map((c) => <button className={category === c ? "active" : ""} onClick={() => setCategory(c)} key={c}>{c === "ALL" ? "ALL" : categoryLabel(c)}</button>)}</div>
    <ProductGrid products={products} open={open} />
  </main>;
}

function ProductGrid({ eyebrow, title, action, products, open, setPage }) {
  return <section className="products">
    {(title || action) && <div className="section-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <button className="link-button" onClick={() => setPage("shop")}>{action}</button>}</div>}
    <div className="grid">{products.map((product) => <button className="card" key={product.id} onClick={() => open(product)}>
      <span className="card-media">
        <img src={product.thumbnailUrl} alt={product.name} />
        {product.images?.[1] && <img className="hover-image" src={product.images[1]} alt={`${product.name} worn by model`} />}
      </span>
      <span className="card-meta"><span>{categoryLabel(product.category)}</span><span>{money(product.price)}</span></span>
      <strong>{product.name}</strong>
    </button>)}</div>
  </section>;
}

function Detail({ t, product, setPage, addToCart, products, open }) {
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  return <main className="detail-page">
    <button className="back" onClick={() => setPage("shop")}><ChevronLeft size={14} /> {t.back}</button>
    <div className="detail">
      <aside className="thumbs">
        {(product.images?.length ? product.images : [product.thumbnailUrl]).map((src) => <button key={src}><img src={src} alt="" /></button>)}
      </aside>
      <div className="gallery"><img src={product.thumbnailUrl} alt={product.name} /><span>{product.name}</span></div>
      <section>
        <p className="eyebrow">{categoryLabel(product.category)}</p>
        <h1>{product.name}</h1>
        <strong>{money(product.price)}</strong>
        <p>{product.description}</p>
        <div className="option-row"><span>{t.colour}</span><b>BLACK</b></div>
        <div className="swatches"><button className="active">BLACK</button><button>CHARCOAL</button></div>
        <div className="option-row"><span>{t.size}</span><button>SIZE GUIDE</button></div>
        <div className="sizes">{["XS", "S", "M", "L", "XL"].map((s) => <button key={s}>{s}</button>)}</div>
        <p className="hint">{t.selectSize}</p>
        <div className="buy-row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><b>{qty}</b><button onClick={() => setQty(qty + 1)}>+</button></div><button className="primary" onClick={() => addToCart(product, qty)}>{t.addBag}</button></div>
        <button className="secondary" onClick={() => addToCart(product, qty)}>{t.buyNow}</button>
        <div className="accordions"><p><span>{t.details}</span><b>-</b></p><ul><li>Premium fabric selected for daily wear</li><li>Clean silhouette with subtle GANYMEDE identity</li><li>Finished in Seoul</li></ul><p><span>{t.care}</span><b>+</b></p><p><span>{t.returns}</span><b>+</b></p></div>
      </section>
    </div>
    <ProductGrid title={t.also} products={related} open={open} />
  </main>;
}

function Cart({ t, cart, reload, headers, checkout, setPage }) {
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  async function remove(id) {
    await fetch(`${API}/cart/${id}`, { method: "DELETE", headers });
    reload();
  }
  return <main className="page split">
    <section><h1>{t.cartTitle}</h1>{cart.map((item) => <div className="line" key={item.id}><img src={item.imageUrl} alt="" /><div><b>{item.name}</b><p>{money(item.price)} x {item.quantity}</p></div><button onClick={() => remove(item.id)}><X size={14} /></button></div>)}<button className="link-button" onClick={() => setPage("shop")}>{t.continue}</button></section>
    <form className="panel" onSubmit={(e) => { e.preventDefault(); checkout(e.currentTarget); }}>
      <h2>{t.order}</h2><p><span>{t.subtotal}</span><b>{money(total)}</b></p><p><span>{t.shipping}</span><b>0</b></p><p className="panel-total"><span>{t.total}</span><b>{money(total)}</b></p>
      <input name="recipientName" placeholder="Recipient name" required />
      <input name="recipientPhone" placeholder="Phone" required />
      <input name="postalCode" placeholder="Postal code" required />
      <input name="address" placeholder="Address" required />
      <input name="detailAddress" placeholder="Detail address" />
      <button className="primary" disabled={!cart.length}>{t.checkout}</button>
    </form>
  </main>;
}

function Auth({ t, auth }) {
  return <main className="auth">
    <section className="auth-art"><img src="/images/brand/ganymede-logo-transparent.png" alt="GANYMEDE logo" /></section>
    <div className="auth-forms">
      <form onSubmit={(e) => { e.preventDefault(); auth("login", Object.fromEntries(new FormData(e.currentTarget))); }}>
        <p className="eyebrow">{t.welcome}</p><h1>{t.loginTitle}</h1><input name="email" placeholder={t.email} /><input name="password" type="password" placeholder={t.password} /><button className="primary">{t.signIn}</button>
      </form>
      <form onSubmit={(e) => { e.preventDefault(); auth("register", Object.fromEntries(new FormData(e.currentTarget))); }}>
        <h1>{t.registerTitle}</h1><input name="name" placeholder={t.name} /><input name="email" placeholder={t.email} /><input name="phone" placeholder={t.phone} /><input name="password" type="password" placeholder={t.password} /><button className="secondary">{t.create}</button>
      </form>
    </div>
  </main>;
}

function MyPage({ t, user, token, logout }) {
  return <main className="page"><h1>{t.mypage}</h1>{token ? <><p>{user?.name} / {user?.email}</p><button className="secondary" onClick={logout}>{t.logout}</button></> : <p>Please login first.</p>}</main>;
}

function Footer({ t }) {
  return <footer className="footer">
    <div><Logo /><p>A Seoul house of quiet luxury. Considered garments, made to endure.</p></div>
    <div><b>SHOP</b><span>Outerwear</span><span>Knitwear</span><span>Tailoring</span></div>
    <div><b>HOUSE</b><span>{t.atelier}</span><span>Sustainability</span><span>Client Care</span></div>
    <div><b>NEWSLETTER</b><label><input placeholder="Email address" /><button>SUBSCRIBE</button></label></div>
  </footer>;
}

createRoot(document.getElementById("root")).render(<App />);
