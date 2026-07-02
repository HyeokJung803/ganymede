import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search, ShoppingBag, User, Heart, Minus, Plus } from "lucide-react";
import "./styles.css";

const API = "http://localhost:8080/api";
const categories = ["ALL", "BAGS", "SHOES", "APPAREL", "ACCESSORIES", "NEW_ARRIVALS"];
const fallbackProducts = [
  ["Maison Leather Tote", "BAGS", 1290000, "/images/products/maison-tote.svg"],
  ["Atelier Mini Bag", "NEW_ARRIVALS", 980000, "/images/products/atelier-mini.svg"],
  ["Silk Signature Scarf", "ACCESSORIES", 360000, "/images/products/silk-scarf.svg"],
  ["Classic Leather Loafer", "SHOES", 720000, "/images/products/classic-loafer.svg"],
  ["Cashmere Long Coat", "NEW_ARRIVALS", 2450000, "/images/products/cashmere-coat.svg"],
  ["Minimal Gold Bracelet", "ACCESSORIES", 540000, "/images/products/gold-bracelet.svg"],
  ["Burgundy Compact Wallet", "ACCESSORIES", 420000, "/images/products/burgundy-wallet.svg"],
  ["Soft Cashmere Knit", "APPAREL", 690000, "/images/products/cashmere-knit.svg"]
].map((p, i) => ({ id: i + 1, name: p[0], category: p[1], price: p[2], thumbnailUrl: p[3], images: [p[3]], stock: 20, description: "Original GANY piece crafted for a restrained luxury wardrobe." }));

function money(value) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);
}

function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(fallbackProducts);
  const [selected, setSelected] = useState(fallbackProducts[0]);
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

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

  return (
    <>
      <header className="nav">
        <button className="brand" onClick={() => setPage("home")}>GANY</button>
        <nav>{categories.slice(1).map((c) => <button key={c} onClick={() => { setCategory(c); setPage("shop"); }}>{c.replace("_", " ")}</button>)}</nav>
        <div className="tools">
          <div className="search"><Search size={17} /><input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setPage("shop")} /></div>
          <button title="Account" onClick={() => setPage(token ? "mypage" : "login")}><User size={19} /></button>
          <button title="Wishlist"><Heart size={19} /></button>
          <button title="Cart" onClick={() => setPage("cart")}><ShoppingBag size={19} /><span>{cart.length}</span></button>
        </div>
      </header>

      {page === "home" && <Home products={products} open={(p) => { setSelected(p); setPage("detail"); }} />}
      {page === "shop" && <Shop products={visibleProducts} category={category} setCategory={setCategory} open={(p) => { setSelected(p); setPage("detail"); }} />}
      {page === "detail" && <Detail product={selected} addToCart={addToCart} />}
      {page === "cart" && <Cart cart={cart} reload={loadCart} headers={headers} checkout={(form) => checkout(form)} />}
      {page === "login" && <Auth auth={auth} />}
      {page === "mypage" && <MyPage user={user} token={token} logout={() => { localStorage.removeItem("token"); setToken(""); setUser(null); setCart([]); setPage("home"); }} />}
    </>
  );
}

function Home({ products, open }) {
  return <main>
    <section className="hero">
      <img src="/images/products/cashmere-coat.svg" alt="" />
      <div>
        <p>NEW SEASON</p>
        <h1>GANY</h1>
        <span>Quiet luxury pieces for a modern wardrobe.</span>
      </div>
    </section>
    <ProductGrid title="Curated Collection" products={products.slice(0, 4)} open={open} />
  </main>;
}

function Shop({ products, category, setCategory, open }) {
  return <main className="page">
    <div className="page-head"><h1>Collection</h1><p>{products.length} pieces</p></div>
    <div className="filters">{categories.map((c) => <button className={category === c ? "active" : ""} onClick={() => setCategory(c)} key={c}>{c.replace("_", " ")}</button>)}</div>
    <ProductGrid products={products} open={open} />
  </main>;
}

function ProductGrid({ title, products, open }) {
  return <section className="products">
    {title && <h2>{title}</h2>}
    <div className="grid">{products.map((product) => <button className="card" key={product.id} onClick={() => open(product)}>
      <img src={product.thumbnailUrl} alt={product.name} />
      <span>{product.category.replace("_", " ")}</span>
      <strong>{product.name}</strong>
      <p>{money(product.price)}</p>
    </button>)}</div>
  </section>;
}

function Detail({ product, addToCart }) {
  const [qty, setQty] = useState(1);
  return <main className="detail">
    <div className="gallery"><img src={product.thumbnailUrl} alt={product.name} /></div>
    <section>
      <span>{product.category.replace("_", " ")}</span>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <strong>{money(product.price)}</strong>
      <label>Color<select><option>Black</option><option>Ivory</option><option>Deep Green</option></select></label>
      <label>Size<select><option>One Size</option><option>S</option><option>M</option><option>L</option></select></label>
      <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><b>{qty}</b><button onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div>
      <button className="primary" onClick={() => addToCart(product, qty)}>Add to Bag</button>
      <button className="secondary" onClick={() => addToCart(product, qty)}>Buy Now</button>
    </section>
  </main>;
}

function Cart({ cart, reload, headers, checkout }) {
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  async function remove(id) {
    await fetch(`${API}/cart/${id}`, { method: "DELETE", headers });
    reload();
  }
  return <main className="page split">
    <section><h1>Shopping Bag</h1>{cart.map((item) => <div className="line" key={item.id}><img src={item.imageUrl} alt="" /><div><b>{item.name}</b><p>{money(item.price)} x {item.quantity}</p></div><button onClick={() => remove(item.id)}>Remove</button></div>)}</section>
    <form className="panel" onSubmit={(e) => { e.preventDefault(); checkout(e.currentTarget); }}>
      <h2>Order</h2><p>Total {money(total)}</p>
      <input name="recipientName" placeholder="Recipient name" required />
      <input name="recipientPhone" placeholder="Phone" required />
      <input name="postalCode" placeholder="Postal code" required />
      <input name="address" placeholder="Address" required />
      <input name="detailAddress" placeholder="Detail address" />
      <button className="primary" disabled={!cart.length}>Create Order</button>
    </form>
  </main>;
}

function Auth({ auth }) {
  return <main className="auth">
    <form onSubmit={(e) => { e.preventDefault(); auth("login", Object.fromEntries(new FormData(e.currentTarget))); }}>
      <h1>Login</h1><input name="email" placeholder="Email" /><input name="password" type="password" placeholder="Password" /><button className="primary">Login</button>
    </form>
    <form onSubmit={(e) => { e.preventDefault(); auth("register", Object.fromEntries(new FormData(e.currentTarget))); }}>
      <h1>Join GANY</h1><input name="name" placeholder="Name" /><input name="email" placeholder="Email" /><input name="phone" placeholder="Phone" /><input name="password" type="password" placeholder="Password" /><button className="secondary">Register</button>
    </form>
  </main>;
}

function MyPage({ user, token, logout }) {
  return <main className="page"><h1>My GANY</h1>{token ? <><p>{user?.name} / {user?.email}</p><button className="secondary" onClick={logout}>Logout</button></> : <p>Please login first.</p>}</main>;
}

createRoot(document.getElementById("root")).render(<App />);
