import { Routes, Route, Link, useNavigate, Navigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import ProductList from './ProductList'
import type { Product } from './products'
import { products as allProducts } from './products'
import './App.css'
import amazonLogo from './assets/amazon-logo.png';
import { useToast } from './ToastContext';
import Breadcrumbs from './Breadcrumbs';

function Home({ onAddToCart, search }: { onAddToCart: (product: Product) => void, search: string }) {
  const featured = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 5)
  return (
    <div id="home-page" data-testid="home-page" className="home-page">
      <div id="hero-banner" className="hero-banner">
        <img id="hero-logo" src={amazonLogo} alt="Amazon Logo" className="amazon-logo invert-on-dark" />
        <h1 id="hero-title">Welcome to Shamazon</h1>
        <p id="hero-description">Shop the latest phones, tablets, TVs, computers, and more!</p>
        <div id="category-links" className="category-links">
          <Link id="category-link-phones" to="/products?category=Phones" className="category-link">Phones</Link>
          <Link id="category-link-tablets" to="/products?category=Tablets" className="category-link">Tablets</Link>
          <Link id="category-link-tvs" to="/products?category=Televisions" className="category-link">Televisions</Link>
          <Link id="category-link-computers" to="/products?category=Computers" className="category-link">Computers</Link>
          <Link id="category-link-other" to="/products?category=Other Technology" className="category-link">Other Tech</Link>
        </div>
      </div>
      <section id="featured-section" className="featured-section" data-testid="featured-section">
        <h2 id="featured-title" className="featured-title">Featured Products</h2>
        <div id="featured-row" className="featured-row">
          {featured.length === 0 ? (
            <div id="featured-empty" className="featured-empty">No products found.</div>
          ) : featured.map(product => (
            <Link
              id={`featured-link-${product.id}`}
              to={`/products/${product.id}`}
              key={product.id}
              style={{ textDecoration: 'none' }}
              data-testid={`featured-link-${product.id}`}
            >
              <div id={`featured-card-${product.id}`} className="featured-card" data-testid={`featured-card-${product.id}`}>
                <img id={`featured-img-${product.id}`} src={product.image} alt={product.name} className="featured-img" />
                <div id={`featured-info-${product.id}`} className="featured-info">
                  <div id={`featured-name-${product.id}`} className="featured-name">{product.name}</div>
                  <div id={`featured-price-${product.id}`} className="featured-price">${product.price.toFixed(2)}</div>
                  <button
                    id={`featured-add-btn-${product.id}`}
                    className="featured-add"
                    data-testid={`featured-add-${product.id}`}
                    onClick={e => { e.preventDefault(); onAddToCart(product); }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function Products({ onAddToCart, search, category }: { onAddToCart: (product: Product) => void, search: string, category?: string }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : [])
  const [selectedPrice, setSelectedPrice] = useState<string>('')

  const categories = Array.from(new Set(allProducts.map(p => p.category)))
  const priceRanges = [
    { label: 'Under $500', value: 'under-500', min: 0, max: 499.99 },
    { label: '$500 to $1000', value: '500-1000', min: 500, max: 1000 },
    { label: '$1000 to $2000', value: '1000-2000', min: 1000, max: 2000 },
    { label: 'Over $2000', value: 'over-2000', min: 2000, max: Infinity },
  ]

  let filtered = allProducts.filter(p => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    let matchesPrice = true
    if (selectedPrice) {
      const range = priceRanges.find(r => r.value === selectedPrice)
      if (range) {
        matchesPrice = p.price >= range.min && p.price <= range.max
      }
    }
    return matchesCategory && matchesSearch && matchesPrice
  })

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }
  const handlePriceChange = (val: string) => {
    setSelectedPrice(val)
  }

  return (
    <div id="products-layout" className="products-layout">
      <aside id="sidebar-filters" className="sidebar-filters" data-testid="sidebar-filters">
        <div id="category-filter-section" className="filter-section">
          <h3 id="category-filter-title">Category</h3>
          {categories.map(cat => (
            <label id={`category-label-${cat}`} key={cat}>
              <input
                id={`category-checkbox-${cat}`}
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                data-testid={`filter-category-${cat}`}
              />
              <span id={`category-text-${cat}`}>{cat}</span>
            </label>
          ))}
        </div>
        <div id="price-filter-section" className="filter-section">
          <h3 id="price-filter-title">Price</h3>
          {priceRanges.map(range => (
            <label id={`price-label-${range.value}`} key={range.value}>
              <input
                id={`price-radio-${range.value}`}
                type="radio"
                name="price"
                checked={selectedPrice === range.value}
                onChange={() => handlePriceChange(range.value)}
                data-testid={`filter-price-${range.value}`}
              />
              <span id={`price-text-${range.value}`}>{range.label}</span>
            </label>
          ))}
          <label id="price-label-all">
            <input
              id="price-radio-all"
              type="radio"
              name="price"
              checked={selectedPrice === ''}
              onChange={() => handlePriceChange('')}
              data-testid="filter-price-all"
            />
            <span id="price-text-all">All Prices</span>
          </label>
        </div>
      </aside>
      <main id="main-content" role="main" style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <h1 id="products-title" style={{ color: '#131921', textAlign: 'left', marginLeft: 16 }}>Products</h1>
        <ProductList onAddToCart={onAddToCart} products={filtered} />
      </main>
    </div>
  )
}

function Cart({ cart, onRemoveFromCart }: { cart: Product[]; onRemoveFromCart: (id: string) => void }) {
  const navigate = useNavigate();
  return (
    <div id="cart-page" data-testid="cart-page">
      <h1 id="cart-title" style={{ color: '#131921' }}>Cart</h1>
      {cart.length === 0 ? (
        <div id="cart-empty-container" data-testid="cart-empty" className="cart-empty-message">
          <span id="cart-empty-message" style={{
            display: 'inline-block',
            background: '#f6f6f6',
            border: '1.5px solid #e3e6e6',
            borderRadius: 10,
            padding: '32px 24px',
            color: '#555',
            fontSize: '1.25rem',
            fontWeight: 500,
            margin: '32px auto',
            boxShadow: '0 2px 8px rgba(35,47,62,0.07)',
            textAlign: 'center',
            maxWidth: 400,
          }}>
            <span id="cart-empty-icon" style={{ fontSize: '2.2rem', color: '#e47911', display: 'block', marginBottom: 12 }}>🛒</span>
            <span id="cart-empty-text">The cart is currently empty</span>
          </span>
        </div>
      ) : (
        <>
          <ul id="cart-list" style={{ listStyle: 'none', padding: 0 }} data-testid="cart-list">
            {cart.map((item, idx) => (
              <li
                id={`cart-item-${item.id}-${idx}`}
                key={item.id + '-' + idx}
                style={{
                  marginBottom: 16,
                  borderBottom: '1px solid #e47911',
                  paddingBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  background: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 1px 4px rgba(35,47,62,0.06)',
                  paddingTop: 8,
                  paddingLeft: 8,
                  cursor: 'pointer',
                  outline: 'none',
                  border: '2px solid transparent',
                  transition: 'border 0.18s',
                }}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/products/${item.id}`)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/products/${item.id}`) }}
                onFocus={e => e.currentTarget.style.border = '2px solid #e47911'}
                onBlur={e => e.currentTarget.style.border = '2px solid transparent'}
                aria-label={`View details for ${item.name}`}
                data-testid={`cart-item-${item.id}-${idx}`}
              >
                <img
                  id={`cart-item-img-${item.id}-${idx}`}
                  src={item.image}
                  alt={item.name}
                  style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 6, background: '#f6f6f6', boxShadow: '0 1px 2px rgba(35,47,62,0.07)' }}
                />
                <div id={`cart-item-info-${item.id}-${idx}`} style={{ flex: 1 }}>
                  <div id={`cart-item-name-${item.id}-${idx}`} style={{ fontWeight: 600, fontSize: 18, color: '#232f3e', marginBottom: 2 }}>{item.name}</div>
                  <div id={`cart-item-price-${item.id}-${idx}`} style={{ color: '#b12704', fontWeight: 700, fontSize: 16 }}>${item.price.toFixed(2)}</div>
                </div>
                <button
                  id={`remove-from-cart-${item.id}-${idx}`}
                  data-testid={`remove-from-cart-${item.id}-${idx}`}
                  aria-label={`Remove ${item.name} from cart`}
                  style={{ marginLeft: 8, background: '#fff', color: '#b12704', border: '1px solid #b12704', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 700 }}
                  onClick={e => { e.stopPropagation(); onRemoveFromCart(item.id); }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            id="proceed-to-checkout"
            data-testid="proceed-to-checkout"
            style={{
              background: '#ffd814',
              color: '#111',
              border: '1px solid #fcd200',
              borderRadius: 6,
              padding: '12px 32px',
              fontWeight: 700,
              fontSize: '1.15rem',
              marginTop: 24,
              boxShadow: '0 1px 2px rgba(35,47,62,0.07)',
              transition: 'background 0.2s',
              cursor: 'pointer',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => navigate('/checkout')}
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  )
}

function Checkout({ cart, onOrderPlaced, setOrders, orders, addresses, cards, setCards, defaultCardIdx, defaultAddressIdx }: { cart: Product[]; onOrderPlaced: () => void; setOrders: (orders: any[]) => void; orders: any[]; addresses: any[]; cards: any[]; setCards: (cards: any[]) => void; defaultCardIdx: number; defaultAddressIdx: number }) {
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(defaultAddressIdx)
  const [selectedCard, setSelectedCard] = useState(defaultCardIdx)
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ name: '', number: '', expiry: '', cvc: '' });
  function handleAddCardModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newCardForm.name || !/^\d{4} \d{4} \d{4} \d{4}$/.test(newCardForm.number) || !/^\d{2}\/\d{2}$/.test(newCardForm.expiry) || !/^\d{3,4}$/.test(newCardForm.cvc)) return;
    setCards([...cards, newCardForm]);
    setSelectedCard(cards.length - 1);
    setShowAddCardModal(false);
    setNewCardForm({ name: '', number: '', expiry: '', cvc: '' });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderConfirmed(true)
    // Save order to localStorage
    setOrders([...orders, {
      date: Date.now(),
      items: cart,
      address: addresses[selectedAddress],
      card: cards[selectedCard],
    }])
    onOrderPlaced()
  }

  if (orderConfirmed) {
    return (
      <div id="order-confirmation" data-testid="order-confirmation" style={{ textAlign: 'center', marginTop: 40 }}>
        <h2 id="order-confirmation-title" style={{ color: '#007600' }}>Thank you for your order!</h2>
        <p id="order-confirmation-message">Your order has been placed successfully.</p>
        <button
          id="back-to-products"
          data-testid="back-to-products"
          style={{ background: '#ffd814', color: '#111', border: '1px solid #fcd200', borderRadius: 4, padding: '8px 16px', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div id="checkout-page" data-testid="checkout-page" style={{
      display: 'flex',
      gap: 40,
      alignItems: 'flex-start',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(35,47,62,0.07)',
      padding: '40px 24px',
      maxWidth: 900,
      margin: '0 auto',
      flexWrap: 'wrap',
    }}>
      {/* Left: Product summary */}
      <div id="order-summary" style={{ flex: 1, minWidth: 280, maxWidth: 400, marginBottom: 32 }}>
        <h2 id="order-summary-title" style={{ color: '#232f3e', marginBottom: 18 }}>Order Summary</h2>
        {cart.length === 0 ? (
          <div id="checkout-empty" data-testid="checkout-empty">Your cart is empty.</div>
        ) : (
          <ul id="checkout-items-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cart.map((item, idx) => (
              <li id={`checkout-item-${item.id}-${idx}`} key={item.id + '-' + idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 18,
                background: '#f6f6f6',
                borderRadius: 8,
                padding: '10px 10px',
                boxShadow: '0 1px 4px rgba(35,47,62,0.06)',
              }}>
                <img id={`checkout-item-img-${item.id}-${idx}`} src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 6, background: '#fff', boxShadow: '0 1px 2px rgba(35,47,62,0.07)' }} />
                <div id={`checkout-item-info-${item.id}-${idx}`} style={{ flex: 1 }}>
                  <div id={`checkout-item-name-${item.id}-${idx}`} style={{ fontWeight: 600, fontSize: 16, color: '#232f3e', marginBottom: 2 }}>{item.name}</div>
                  <div id={`checkout-item-price-${item.id}-${idx}`} style={{ color: '#b12704', fontWeight: 700, fontSize: 15 }}>${item.price.toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div id="checkout-total" style={{
            borderTop: '1.5px solid #e3e6e6',
            marginTop: 18,
            paddingTop: 14,
            fontWeight: 700,
            fontSize: 18,
            color: '#232f3e',
            textAlign: 'right',
          }}>
            <span id="checkout-total-label">Total:</span> <span id="checkout-total-amount" style={{ color: '#b12704' }}>${total.toFixed(2)}</span>
          </div>
        )}
      </div>
      {/* Right: Credit card form */}
      <div id="payment-details" style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
        <h2 id="payment-details-title" style={{ color: '#232f3e', marginBottom: 18 }}>Payment Details</h2>
        {cart.length === 0 ? null : (
          <div id="payment-form-container" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(35,47,62,0.08)', padding: 32, minWidth: 320, maxWidth: 400, margin: '0 auto' }}>
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div id="payment-method-section" style={{ marginBottom: 18 }}>
                <label id="payment-method-label" className="form-label" style={{ marginBottom: 8, display: 'block' }}>Select Payment Method</label>
                <ul id="payment-cards-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cards.length === 0 && <li id="no-cards-message">No saved cards.</li>}
                  {cards.map((card: any, idx: number) => (
                    <li id={`payment-card-${idx}`} key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: selectedCard === idx ? '#f3f6fa' : '#f7fafc',
                      border: selectedCard === idx ? '2px solid #e47911' : '1.5px solid #e3e6e6',
                      borderRadius: 10,
                      padding: '12px 18px',
                      marginBottom: 12,
                      boxShadow: selectedCard === idx ? '0 2px 8px rgba(228,121,17,0.10)' : '0 1px 4px rgba(35,47,62,0.06)',
                      cursor: 'pointer',
                      transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
                    }}
                      onClick={() => setSelectedCard(idx)}
                    >
                      <input
                        id={`payment-card-radio-${idx}`}
                        type="radio"
                        name="checkout-card"
                        checked={selectedCard === idx}
                        onChange={() => setSelectedCard(idx)}
                        style={{ marginRight: 14, accentColor: '#e47911', width: 18, height: 18 }}
                      />
                      <span id={`payment-card-name-${idx}`} style={{ fontWeight: 500, color: '#232f3e', paddingRight: 16, minWidth: 90 }}>{card.name}</span>
                      <span id={`payment-card-number-${idx}`} style={{ letterSpacing: 2, color: '#232f3e', paddingRight: 16, minWidth: 80 }}>•••• {card.number.replace(/\s/g, '').slice(-4)}</span>
                      <span id={`payment-card-expiry-${idx}`} style={{ color: '#232f3e', minWidth: 70 }}>Exp: {card.expiry}</span>
                    </li>
                  ))}
                </ul>
                <button id="add-new-card-btn" type="button" onClick={() => setShowAddCardModal(true)} style={{ marginTop: 6, background: '#fff', color: '#007185', border: '1.5px solid #bfc5ce', borderRadius: 6, padding: '8px 18px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 1px 4px rgba(35,47,62,0.06)' }}>+ Add New Card</button>
              </div>
              {showAddCardModal && (
                <div id="add-card-modal-overlay" className="checkout-modal-overlay" onClick={() => setShowAddCardModal(false)}>
                  <div id="add-card-modal" className="checkout-modal" onClick={e => e.stopPropagation()}>
                    <button id="add-card-modal-close" className="checkout-modal-close" onClick={() => setShowAddCardModal(false)} aria-label="Close">×</button>
                    <h3 id="add-card-modal-title" style={{ color: '#232f3e', marginBottom: 18 }}>Add New Card</h3>
                    <form id="add-card-modal-form" onSubmit={handleAddCardModalSubmit}>
                      <label id="modal-card-name-label" className="form-label" htmlFor="modal-card-name">Name on Card</label>
                      <input id="modal-card-name" className="form-input" value={newCardForm.name} onChange={e => setNewCardForm(f => ({ ...f, name: e.target.value }))} required />
                      <label id="modal-card-number-label" className="form-label" htmlFor="modal-card-number">Card Number</label>
                      <input id="modal-card-number" className="form-input" value={newCardForm.number} onChange={e => {
                        let value = e.target.value.replace(/[^0-9]/g, '');
                        value = value.slice(0, 16);
                        value = value.replace(/(.{4})/g, '$1 ').trim();
                        setNewCardForm(f => ({ ...f, number: value }));
                      }} required inputMode="numeric" pattern="\d{4} \d{4} \d{4} \d{4}" maxLength={19} placeholder="1234 5678 9012 3456" />
                      <div id="modal-card-details" style={{ display: 'flex', gap: 12 }}>
                        <div id="modal-card-expiry-container" style={{ flex: 1 }}>
                          <label id="modal-card-expiry-label" className="form-label" htmlFor="modal-card-expiry">Expiry (MM/YY)</label>
                          <input id="modal-card-expiry" className="form-input" value={newCardForm.expiry} onChange={e => setNewCardForm(f => ({ ...f, expiry: e.target.value.replace(/[^0-9/]/g, '').slice(0,5) }))} required pattern="\d{2}/\d{2}" maxLength={5} placeholder="12/34" />
                        </div>
                        <div id="modal-card-cvc-container" style={{ flex: 1 }}>
                          <label id="modal-card-cvc-label" className="form-label" htmlFor="modal-card-cvc">CVC</label>
                          <input id="modal-card-cvc" className="form-input" value={newCardForm.cvc} onChange={e => setNewCardForm(f => ({ ...f, cvc: e.target.value.replace(/[^0-9]/g, '').slice(0,4) }))} required inputMode="numeric" pattern="\d{3,4}" maxLength={4} placeholder="123" />
                        </div>
                      </div>
                      <button id="add-card-submit" type="submit" style={{ background: '#e47911', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 16 }}>Add Card</button>
                    </form>
                  </div>
                </div>
              )}
              <button id="place-order" type="submit" data-testid="place-order" style={{ background: '#ffd814', color: '#111', border: '1px solid #fcd200', borderRadius: 6, padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', marginTop: 10, boxShadow: '0 1px 2px rgba(35,47,62,0.07)', transition: 'background 0.2s', width: '100%' }}>
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

function Account({ cards, setCards, addresses, setAddresses, orders, setOrders, cardForm, setCardForm, defaultCardIdx, setDefaultCardIdx, defaultAddressIdx, setDefaultAddressIdx, toast }: { cards: any[]; setCards: (cards: any[]) => void; addresses: any[]; setAddresses: (addresses: any[]) => void; orders: any[]; setOrders: (orders: any[]) => void; cardForm: any; setCardForm: (form: any) => void; defaultCardIdx: number; setDefaultCardIdx: (idx: number) => void; defaultAddressIdx: number; setDefaultAddressIdx: (idx: number) => void; toast: any }) {
  const [tab, setTab] = useState<'payment' | 'address' | 'orders'>('payment');
  const navigate = useNavigate();
  // Add card handler
  function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    if (!cardForm.name || !/^\d{16}$/.test(cardForm.number.replace(/\s/g, '')) || !/^\d{2}\/\d{2}$/.test(cardForm.expiry) || !/^\d{3,4}$/.test(cardForm.cvc)) return;
    setCards([...cards, cardForm]);
    setCardForm({ name: '', number: '', expiry: '', cvc: '' });
    toast.showToast('Card added!', 'success');
  }
  // Remove card handler
  function handleRemoveCard(idx: number) {
    setCards(cards.filter((_: any, i: number) => i !== idx));
    toast.showToast('Card removed.', 'info');
  }
  // Payment methods edit state
  const [editingCardIdx, setEditingCardIdx] = useState<number | null>(null);
  // Edit card handler
  function handleEditCard(idx: number) {
    setEditingCardIdx(idx);
    setCardForm(cards[idx]);
  }
  function handleSaveCard(e: React.FormEvent) {
    e.preventDefault();
    if (editingCardIdx === null) return;
    if (!cardForm.name || !/^\d{16}$/.test(cardForm.number.replace(/\s/g, '')) || !/^\d{2}\/\d{2}$/.test(cardForm.expiry) || !/^\d{3,4}$/.test(cardForm.cvc)) return;
    setCards(cards.map((c, i) => (i === editingCardIdx ? cardForm : c)));
    setCardForm({ name: '', number: '', expiry: '', cvc: '' });
    setEditingCardIdx(null);
  }
  function handleCancelEditCard() {
    setEditingCardIdx(null);
    setCardForm({ name: '', number: '', expiry: '', cvc: '' });
  }
  // Addresses state
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  useEffect(() => {
    localStorage.setItem('shamazon-addresses', JSON.stringify(addresses));
  }, [addresses]);
  function handleAddAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zip || !addressForm.country) return;
    setAddresses([...addresses, addressForm]);
    setAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: '' });
    toast.showToast('Address added!', 'success');
  }
  function handleRemoveAddress(idx: number) {
    setAddresses(addresses.filter((_: any, i: number) => i !== idx));
    toast.showToast('Address removed.', 'info');
  }
  // Addresses edit state
  const [editingAddressIdx, setEditingAddressIdx] = useState<number | null>(null);
  function handleEditAddress(idx: number) {
    setEditingAddressIdx(idx);
    setAddressForm(addresses[idx]);
  }
  function handleSaveAddress(e: React.FormEvent) {
    e.preventDefault();
    if (editingAddressIdx === null) return;
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.state || !addressForm.zip || !addressForm.country) return;
    setAddresses(addresses.map((a, i) => (i === editingAddressIdx ? addressForm : a)));
    setAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: '' });
    setEditingAddressIdx(null);
  }
  function handleCancelEditAddress() {
    setEditingAddressIdx(null);
    setAddressForm({ name: '', street: '', city: '', state: '', zip: '', country: '' });
  }
  // Order history state
  const [orderForm, setOrderForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });
  useEffect(() => {
    localStorage.setItem('shamazon-orders', JSON.stringify(orders));
  }, [orders]);
  return (
    <div id="account-page" data-testid="account-page" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(35,47,62,0.08)', padding: 32, minHeight: 400 }}>
      <h1 id="account-header" className="account-header">Account</h1>
      <div id="account-tabs" className="account-tabs">
        <button id="payment-tab" onClick={() => setTab('payment')} className={`account-tab${tab === 'payment' ? ' active' : ''}`}>Payment Methods</button>
        <button id="address-tab" onClick={() => setTab('address')} className={`account-tab${tab === 'address' ? ' active' : ''}`}>Addresses</button>
        <button id="orders-tab" onClick={() => setTab('orders')} className={`account-tab${tab === 'orders' ? ' active' : ''}`}>Order History</button>
      </div>
      {tab === 'payment' && (
        <div id="account-payment-methods" data-testid="account-payment-methods">
          <h2 id="payment-methods-title">Payment Methods</h2>
          <form id="payment-methods-form" onSubmit={editingCardIdx === null ? handleAddCard : handleSaveCard} style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <div id="payment-form-fields" style={{ display: 'flex', gap: 12, width: '100%' }}>
              <div id="payment-form-left" style={{ minWidth: 120, flex: 1 }}>
                <label id="pm-name-label" htmlFor="pm-name" className="form-label">Name on Card</label><br />
                <input id="pm-name" className="form-input" value={cardForm.name} onChange={e => setCardForm((f: any) => ({ ...f, name: e.target.value }))} required />
                <div id="pm-expiry-container" style={{ marginTop: 12 }}>
                  <label id="pm-expiry-label" htmlFor="pm-expiry" className="form-label">Expiry (MM/YY)</label><br />
                  <input id="pm-expiry" className="form-input" value={cardForm.expiry} onChange={e => setCardForm((f: any) => ({ ...f, expiry: e.target.value.replace(/[^0-9/]/g, '').slice(0,5) }))} required pattern="\d{2}/\d{2}" maxLength={5} placeholder="12/34" />
                </div>
              </div>
              <div id="payment-form-right" style={{ minWidth: 180, flex: 2 }}>
                <label id="pm-number-label" htmlFor="pm-number" className="form-label">Card Number</label><br />
                <input id="pm-number" className="form-input" value={cardForm.number} onChange={e => {
                  let value = e.target.value.replace(/[^0-9]/g, '');
                  value = value.slice(0, 16);
                  value = value.replace(/(.{4})/g, '$1 ').trim();
                  setCardForm((f: any) => ({ ...f, number: value }));
                }} required inputMode="numeric" pattern="\d{4} \d{4} \d{4} \d{4}" maxLength={19} placeholder="1234 5678 9012 3456" />
                <div id="pm-cvc-container" style={{ marginTop: 12 }}>
                  <label id="pm-cvc-label" htmlFor="pm-cvc" className="form-label">CVC</label><br />
                  <input id="pm-cvc" className="form-input" value={cardForm.cvc} onChange={e => setCardForm((f: any) => ({ ...f, cvc: e.target.value.replace(/[^0-9]/g, '').slice(0,4) }))} required inputMode="numeric" pattern="\d{3,4}" maxLength={4} placeholder="123" />
                </div>
              </div>
            </div>
            <button id="payment-form-submit" type="submit" style={{ background: '#e47911', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}>{editingCardIdx === null ? 'Add Card' : 'Save Changes'}</button>
            {editingCardIdx !== null && (
              <button id="payment-form-cancel" type="button" onClick={handleCancelEditCard} style={{ background: '#fff', color: '#232f3e', border: '1.5px solid #bfc5ce', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer', marginLeft: 8 }}>Cancel</button>
            )}
          </form>
          <ul id="saved-cards-list" style={{ listStyle: 'none', padding: 0 }}>
            {cards.length === 0 && <li id="no-saved-cards">No saved cards.</li>}
            {cards.map((card: typeof cardForm, idx: number) => (
              <li id={`saved-card-${idx}`} key={idx} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', background: '#f7fafc', borderRadius: 8, padding: 12, boxShadow: '0 4px 16px rgba(35,47,62,0.18)' }}>
                <div id={`saved-card-info-${idx}`} style={{ display: 'flex', flex: 1, minWidth: 320 }}>
                  <span id={`saved-card-name-${idx}`} style={{ fontWeight: 500, color: '#232f3e', paddingRight: 20 }}>{card.name}</span>
                  <span id={`saved-card-number-${idx}`} style={{ letterSpacing: 2, color: '#232f3e', paddingRight: 20 }}>•••• •••• •••• {card.number.slice(-4)}</span>
                  <span id={`saved-card-expiry-${idx}`} style={{ color: '#232f3e', paddingRight: 55 }}>Exp: {card.expiry}</span>
                </div>
                <div id={`saved-card-actions-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', minWidth: 120 }}>
                  <button id={`remove-card-${idx}`} onClick={() => handleRemoveCard(idx)} style={{ background: '#fff', color: '#b12704', border: '1px solid #b12704', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, width: 90 }}>Remove</button>
                  <button id={`edit-card-${idx}`} onClick={() => handleEditCard(idx)} style={{ background: '#fff', color: '#007185', border: '1px solid #007185', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, width: 90 }}>Edit</button>
                  {idx === defaultCardIdx ? (
                    <span id={`default-badge-${idx}`} className="default-badge">★ Default</span>
                  ) : (
                    <button id={`set-default-card-${idx}`} className="set-default-link" onClick={() => setDefaultCardIdx(idx)} type="button">Set as default</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'address' && (
        <div id="account-addresses" data-testid="account-addresses">
          <h2 id="addresses-title">Addresses</h2>
          <form id="addresses-form" onSubmit={editingAddressIdx === null ? handleAddAddress : handleSaveAddress} style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
            <div id="addr-name-container">
              <label id="addr-name-label" htmlFor="addr-name" className="form-label">Name</label><br />
              <input id="addr-name" className="form-input" value={addressForm.name} onChange={e => setAddressForm((f: any) => ({ ...f, name: e.target.value }))} required />
            </div>
            <div id="addr-street-container">
              <label id="addr-street-label" htmlFor="addr-street" className="form-label">Street</label><br />
              <input id="addr-street" className="form-input" value={addressForm.street} onChange={e => setAddressForm((f: any) => ({ ...f, street: e.target.value }))} required />
            </div>
            <div id="addr-city-container">
              <label id="addr-city-label" htmlFor="addr-city" className="form-label">City</label><br />
              <input id="addr-city" className="form-input" value={addressForm.city} onChange={e => setAddressForm((f: any) => ({ ...f, city: e.target.value }))} required />
            </div>
            <div id="addr-state-container">
              <label id="addr-state-label" htmlFor="addr-state" className="form-label">State</label><br />
              <input id="addr-state" className="form-input" value={addressForm.state} onChange={e => setAddressForm((f: any) => ({ ...f, state: e.target.value }))} required />
            </div>
            <div id="addr-zip-container">
              <label id="addr-zip-label" htmlFor="addr-zip" className="form-label">ZIP</label><br />
              <input id="addr-zip" className="form-input" value={addressForm.zip} onChange={e => setAddressForm((f: any) => ({ ...f, zip: e.target.value.replace(/[^0-9]/g, '').slice(0,10) }))} required inputMode="numeric" />
            </div>
            <div id="addr-country-container">
              <label id="addr-country-label" htmlFor="addr-country" className="form-label">Country</label><br />
              <input id="addr-country" className="form-input" value={addressForm.country} onChange={e => setAddressForm((f: any) => ({ ...f, country: e.target.value }))} required />
            </div>
            <button id="address-form-submit" type="submit" style={{ background: '#e47911', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}>{editingAddressIdx === null ? 'Add Address' : 'Save Changes'}</button>
            {editingAddressIdx !== null && (
              <button id="address-form-cancel" type="button" onClick={handleCancelEditAddress} style={{ background: '#fff', color: '#232f3e', border: '1.5px solid #bfc5ce', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer', marginLeft: 8 }}>Cancel</button>
            )}
          </form>
          <ul id="saved-addresses-list" style={{ listStyle: 'none', padding: 0 }}>
            {addresses.length === 0 && <li id="no-saved-addresses">No saved addresses.</li>}
            {addresses.map((addr: typeof addressForm, idx: number) => (
              <li id={`saved-address-${idx}`} key={idx} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16, background: '#f7fafc', borderRadius: 8, padding: 12 }}>
                <span id={`saved-address-name-${idx}`} style={{ fontWeight: 500 }}>{addr.name}</span>
                <span id={`saved-address-details-${idx}`}>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</span>
                <button id={`remove-address-${idx}`} onClick={() => handleRemoveAddress(idx)} style={{ background: '#fff', color: '#b12704', border: '1px solid #b12704', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                <button id={`edit-address-${idx}`} onClick={() => handleEditAddress(idx)} style={{ background: '#fff', color: '#007185', border: '1px solid #007185', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, marginLeft: 8 }}>Edit</button>
                {idx === defaultAddressIdx ? (
                  <span id={`default-address-badge-${idx}`} className="default-badge">★ Default</span>
                ) : (
                  <button id={`set-default-address-${idx}`} className="set-default-link" onClick={() => setDefaultAddressIdx(idx)} type="button">Set as default</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {tab === 'orders' && (
        <div id="account-orders" data-testid="account-orders">
          <h2 id="order-history-title" style={{ color: '#232f3e', fontWeight: 700, fontSize: '1.4rem', marginBottom: 24, borderBottom: '2px solid #e3e6e6', paddingBottom: 8, letterSpacing: 0.2 }}>Order History</h2>
          <ul id="orders-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {orders.length === 0 && <li id="no-orders-message" style={{ color: '#888', fontSize: '1.1rem', textAlign: 'center', marginTop: 32 }}>No previous orders.</li>}
            {orders.map((order: any, idx: number) => (
              <li id={`order-${idx}`} key={idx} style={{
                marginBottom: 28,
                background: '#fff',
                border: '1.5px solid #e3e6e6',
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(35,47,62,0.08)',
                padding: '24px 24px 18px 24px',
                position: 'relative',
              }}>
                <div id={`order-header-${idx}`} style={{ display: 'flex', alignItems: 'center', marginBottom: 10, gap: 16 }}>
                  <span id={`order-icon-${idx}`} style={{ fontSize: 22, color: '#e47911', marginRight: 8 }}>📦</span>
                  <span id={`order-number-${idx}`} style={{ fontWeight: 700, color: '#232f3e', fontSize: 18 }}>Order #{orders.length - idx}</span>
                  <span id={`order-date-${idx}`} style={{ color: '#555', fontSize: 14, marginLeft: 'auto', fontWeight: 500 }}>
                    Placed: {new Date(order.date).toLocaleString()}
                  </span>
                </div>
                <div id={`order-items-${idx}`} style={{ marginBottom: 12, background: '#f7fafc', borderRadius: 8, padding: '12px 14px' }}>
                  <strong id={`order-items-label-${idx}`} style={{ color: '#232f3e', fontSize: 15 }}>Items:</strong>
                  <div id={`order-items-grid-${idx}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                    {order.items.map((item: any, i: number) => (
                      <div
                        id={`order-item-${idx}-${i}`}
                        key={i}
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/products/${item.id}`)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/products/${item.id}`) }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          background: '#fff',
                          borderRadius: 8,
                          boxShadow: '0 1px 4px rgba(35,47,62,0.06)',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          outline: 'none',
                          border: '2px solid transparent',
                          transition: 'border 0.18s',
                        }}
                        onFocus={e => e.currentTarget.style.border = '2px solid #e47911'}
                        onBlur={e => e.currentTarget.style.border = '2px solid transparent'}
                        aria-label={`View details for ${item.name}`}
                      >
                        <img id={`order-item-img-${idx}-${i}`} src={item.image} alt={item.name} style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: 6, background: '#f6f6f6', marginRight: 6, boxShadow: '0 1px 2px rgba(35,47,62,0.07)' }} />
                        <span id={`order-item-name-${idx}-${i}`} style={{ fontWeight: 500, color: '#232f3e', flex: 1 }}>{item.name}</span>
                        <span id={`order-item-price-${idx}-${i}`} style={{ color: '#b12704', fontWeight: 700, marginLeft: 8, fontSize: 15 }}>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div id={`order-details-${idx}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 8 }}>
                  {order.address && (
                    <div id={`order-address-${idx}`} style={{ background: '#f6f6f6', borderRadius: 8, padding: '10px 16px', fontSize: 14, flex: 1, minWidth: 180 }}>
                      <span id={`order-address-label-${idx}`} style={{ color: '#007600', fontWeight: 600, marginRight: 6 }}>🏠 Ship to:</span>
                      <span id={`order-address-details-${idx}`}>{order.address.name}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</span>
                    </div>
                  )}
                  {order.card && (
                    <div id={`order-payment-${idx}`} style={{ background: '#f6f6f6', borderRadius: 8, padding: '10px 16px', fontSize: 14, flex: 1, minWidth: 140 }}>
                      <span id={`order-payment-label-${idx}`} style={{ color: '#e47911', fontWeight: 600, marginRight: 6 }}>💳 Paid with:</span>
                      <span id={`order-payment-details-${idx}`} style={{ color: '#232f3e', fontWeight: 600 }}>•••• {order.card.number.slice(-4)}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SignIn({ onSignIn }: { onSignIn: (user: any) => void }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('shamazon-users') || '[]');
    const user = users.find((u: any) => u.email === form.email && u.password === form.password);
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    localStorage.setItem('shamazon-current-user', JSON.stringify(user));
    onSignIn(user);
    navigate('/account');
  }
  return (
    <div id="signin-page" style={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(35,47,62,0.08)', padding: 32 }}>
      <h2 id="signin-header" className="account-header">Sign In</h2>
      <form id="signin-form" onSubmit={handleSubmit}>
        <label id="signin-email-label" className="form-label" htmlFor="signin-email">Email</label>
        <input className="form-input" id="signin-email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <label id="signin-password-label" className="form-label" htmlFor="signin-password">Password</label>
        <input className="form-input" id="signin-password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        {error && <div id="signin-error" style={{ color: '#b12704', marginBottom: 8 }}>{error}</div>}
        <button id="signin-submit" type="submit" style={{ background: '#e47911', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 12 }}>Sign In</button>
      </form>
      <div id="signin-signup-link" style={{ marginTop: 16, textAlign: 'left' }}>
        <Link id="signup-link" to="/signup" style={{ color: '#007185', fontWeight: 500, textDecoration: 'underline', fontSize: '0.95rem', display: 'inline-block', marginTop: 6 }}>
          Don't have an account, sign up?
        </Link>
      </div>
    </div>
  );
}

function SignUp({ onSignUp }: { onSignUp: (user: any) => void }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email and password required');
      return;
    }
    let users = JSON.parse(localStorage.getItem('shamazon-users') || '[]');
    if (users.find((u: any) => u.email === form.email)) {
      setError('Email already registered');
      return;
    }
    users.push(form);
    localStorage.setItem('shamazon-users', JSON.stringify(users));
    localStorage.setItem('shamazon-current-user', JSON.stringify(form));
    onSignUp(form);
    navigate('/account');
  }
  return (
    <div id="signup-page" style={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(35,47,62,0.08)', padding: 32 }}>
      <h2 id="signup-header" className="account-header">Sign Up</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
        <label id="signup-email-label" className="form-label" htmlFor="signup-email">Email</label>
        <input className="form-input" id="signup-email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
        <label id="signup-password-label" className="form-label" htmlFor="signup-password">Password</label>
        <input className="form-input" id="signup-password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        {error && <div id="signup-error" style={{ color: '#b12704', marginBottom: 8 }}>{error}</div>}
        <button id="signup-submit" type="submit" style={{ background: '#e47911', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 12 }}>Sign Up</button>
      </form>
      <div id="signup-signin-link" style={{ marginTop: 16, textAlign: 'left' }}>
        <Link id="signin-link" to="/signin" style={{ color: '#007185', fontWeight: 500, textDecoration: 'underline', fontSize: '0.95rem', display: 'inline-block', marginTop: 6 }}>
          Already have an account, sign in?
        </Link>
      </div>
    </div>
  );
}

function ProductPage({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find(p => p.id === id);
  if (!product) {
    return <div id="product-not-found" style={{ padding: 40, textAlign: 'center', color: '#b12704', fontWeight: 600, fontSize: 22 }}>Product not found.</div>;
  }
  return (
    <div id="product-page" style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(35,47,62,0.09)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img id="product-image" src={product.image} alt={product.name} style={{ width: 220, height: 220, objectFit: 'contain', borderRadius: 10, background: '#f6f6f6', marginBottom: 24, boxShadow: '0 1px 4px rgba(35,47,62,0.07)' }} />
      <h1 id="product-title" style={{ color: '#131921', fontSize: 28, fontWeight: 700, marginBottom: 10 }}>{product.name}</h1>
      <div id="product-category" style={{ color: '#007185', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{product.category}</div>
      <div id="product-price" style={{ color: '#b12704', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>${product.price.toFixed(2)}</div>
      <p id="product-description" style={{ color: '#555', fontSize: 16, marginBottom: 24, textAlign: 'center' }}>{product.description}</p>
      <button
        id="product-add-to-cart"
        style={{ background: '#ffd814', color: '#111', border: '1px solid #fcd200', borderRadius: 6, padding: '12px 32px', fontWeight: 700, fontSize: '1.1rem', marginTop: 8, boxShadow: '0 1px 2px rgba(35,47,62,0.07)', transition: 'background 0.2s', cursor: 'pointer' }}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Move cards, addresses, orders, and their setters to App
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem('shamazon-cards');
    return stored ? JSON.parse(stored) : [];
  });
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem('shamazon-addresses');
    return stored ? JSON.parse(stored) : [];
  });
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('shamazon-orders');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('shamazon-cards', JSON.stringify(cards));
  }, [cards]);
  useEffect(() => {
    localStorage.setItem('shamazon-addresses', JSON.stringify(addresses));
  }, [addresses]);
  useEffect(() => {
    localStorage.setItem('shamazon-orders', JSON.stringify(orders));
  }, [orders]);

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('shamazon-current-user');
    return stored ? JSON.parse(stored) : null;
  });
  function handleSignIn(u: any) {
    setUser(u);
    localStorage.setItem('shamazon-current-user', JSON.stringify(u));
  }
  function handleSignUp(u: any) {
    setUser(u);
    localStorage.setItem('shamazon-current-user', JSON.stringify(u));
  }
  function handleSignOut() {
    setUser(null);
    localStorage.removeItem('shamazon-current-user');
  }

  const toast = useToast();

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    toast.showToast(`${product.name} added to cart!`, 'success');
  };

  const handleRemoveFromCart = (id: string) => {
    const removed = cart.find(p => p.id === id);
    setCart(prev => prev.filter(p => p.id !== id));
    if (removed) toast.showToast(`${removed.name} removed from cart.`, 'info');
  };

  const handleOrderPlaced = () => {
    setCart([]);
    toast.showToast('Order placed successfully!', 'success');
  };

  // Parse category from query string for /products
  const getCategory = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('category') || undefined
  }

  // Live search dropdown logic
  const searchResults = search.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchFocus = () => {
    if (search.trim()) setShowDropdown(true)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setShowDropdown(!!e.target.value.trim())
  }
  const handleResultClick = (id: string) => {
    setShowDropdown(false)
    navigate('/products')
    setTimeout(() => {
      const el = document.querySelector(`[data-testid='product-card-${id}']`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  // Default card and address state
  const [defaultCardIdx, setDefaultCardIdx] = useState(() => {
    const stored = localStorage.getItem('shamazon-default-card');
    return stored ? JSON.parse(stored) : 0;
  });
  const [defaultAddressIdx, setDefaultAddressIdx] = useState(() => {
    const stored = localStorage.getItem('shamazon-default-address');
    return stored ? JSON.parse(stored) : 0;
  });
  useEffect(() => {
    localStorage.setItem('shamazon-default-card', JSON.stringify(defaultCardIdx));
  }, [defaultCardIdx]);
  useEffect(() => {
    localStorage.setItem('shamazon-default-address', JSON.stringify(defaultAddressIdx));
  }, [defaultAddressIdx]);

  return (
    <div id="app" className="App">
      <div id="skip-link-container" style={{ position: 'absolute', left: 0, top: 0 }}>
        <a id="skip-link" href="#main-content" className="skip-link">Skip to main content</a>
      </div>
      <nav id="navbar" role="navigation" data-testid="navbar" style={{ background: '#232f3e', padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div id="navbar-links" className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img id="navbar-logo" src={amazonLogo} alt="Amazon Logo" className="navbar-logo invert-on-dark" onClick={() => navigate('/')} />
          <Link id="nav-products" to="/products" data-testid="nav-products" style={{ color: '#fff', fontWeight: 700, marginRight: 16, textDecoration: 'none' }}>Products</Link>
          <Link id="nav-cart" to="/cart" data-testid="nav-cart" style={{ color: '#fff', fontWeight: 700, marginRight: 16, textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span id="cart-icon-container" style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
              <svg id="cart-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
                <circle cx="14" cy="14" r="13" stroke="#fff" strokeWidth="2" fill="#232f3e" />
                <path d="M8 10h12l-1.5 7.5a2 2 0 0 1-2 1.5h-5a2 2 0 0 1-2-1.5L8 10z" fill="#fff" />
                <circle cx="12" cy="20" r="1.2" fill="#e47911" />
                <circle cx="16" cy="20" r="1.2" fill="#e47911" />
              </svg>
              <span id="cart-badge" style={{ position: 'absolute', top: -6, right: -10, background: '#e47911', color: '#fff', borderRadius: '50%', fontSize: 13, fontWeight: 700, minWidth: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', boxShadow: '0 1px 4px rgba(35,47,62,0.12)' }}>{cart.length}</span>
            </span>
            <span id="cart-text" style={{ marginLeft: 4 }}>Cart</span>
          </Link>
          {user ? (
            <>
              <Link id="nav-account" to="/account" data-testid="nav-account" style={{ color: '#fff', fontWeight: 700, marginRight: 16, textDecoration: 'none' }}>Account</Link>
              <button id="sign-out-btn" onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>Sign Out</button>
            </>
          ) : (
            <>
              <Link id="nav-signin" to="/signin" style={{ color: '#fff', fontWeight: 700, marginRight: 16, textDecoration: 'none' }}>Sign In</Link>
            </>
          )}
        </div>
        <div id="search-bar-wrapper" className="search-bar-wrapper" style={{ maxWidth: 480, minWidth: 240, width: '100%' }}>
          <input
            id="search-bar"
            ref={searchRef}
            type="text"
            placeholder="Search Amazon..."
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            data-testid="search-bar"
            aria-label="Search products"
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 16,
              width: '100%',
              color: '#232f3e',
            }}
            autoComplete="off"
          />
          {showDropdown && searchResults.length > 0 && (
            <div id="search-dropdown" className="search-dropdown" ref={dropdownRef} data-testid="search-dropdown">
              {searchResults.map(product => (
                <div
                  id={`search-result-${product.id}`}
                  className="search-result"
                  key={product.id}
                  data-testid={`search-result-${product.id}`}
                  onClick={() => handleResultClick(product.id)}
                >
                  <img id={`search-result-img-${product.id}`} src={product.image} alt={product.name} className="search-result-img" />
                  <div id={`search-result-info-${product.id}`} className="search-result-info">
                    <div id={`search-result-name-${product.id}`} className="search-result-name">{product.name}</div>
                    <div id={`search-result-price-${product.id}`} className="search-result-price">${product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} search={search} />} />
        <Route path="/products" element={<Products onAddToCart={handleAddToCart} search={search} category={getCategory()} />} />
        <Route path="/products/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onOrderPlaced={handleOrderPlaced} setOrders={setOrders} orders={orders} addresses={addresses} cards={cards} setCards={setCards} defaultCardIdx={defaultCardIdx} defaultAddressIdx={defaultAddressIdx} />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/account" element={
          <Account
            cards={cards}
            setCards={setCards}
            addresses={addresses}
            setAddresses={setAddresses}
            orders={orders}
            setOrders={setOrders}
            cardForm={cardForm}
            setCardForm={setCardForm}
            defaultCardIdx={defaultCardIdx}
            setDefaultCardIdx={setDefaultCardIdx}
            defaultAddressIdx={defaultAddressIdx}
            setDefaultAddressIdx={setDefaultAddressIdx}
            toast={toast}
          />
        } />
      </Routes>
      <footer id="footer" className="footer" data-testid="footer">
        <div id="footer-links" className="footer-links">
          <a id="footer-link-legal" href="#" data-testid="footer-link-legal">Legal</a>
          <a id="footer-link-contact" href="#" data-testid="footer-link-contact">Contact</a>
          <a id="footer-link-privacy" href="#" data-testid="footer-link-privacy">Privacy</a>
          <a id="footer-link-terms" href="#" data-testid="footer-link-terms">Terms</a>
          <a id="footer-link-careers" href="#" data-testid="footer-link-careers">Careers</a>
          <a id="footer-link-help" href="#" data-testid="footer-link-help">Help</a>
        </div>
        <div id="footer-copy" className="footer-copy">&copy; {new Date().getFullYear()} Shamazon. Not affiliated with Amazon.com.</div>
      </footer>
    </div>
  )
}

export default App
