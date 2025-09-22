import type { Product } from './products';
import { Link } from 'react-router-dom';

type Props = {
  onAddToCart: (product: Product) => void;
  products: Product[];
};

export default function ProductList({ onAddToCart, products }: Props) {
  return (
    <div id="product-list" className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }} data-testid="product-list">
      {products.map((product) => (
        <Link
          id={`product-link-${product.id}`}
          to={`/products/${product.id}`}
          key={product.id}
          style={{ textDecoration: 'none' }}
          data-testid={`product-link-${product.id}`}
        >
          <div
            id={`product-card-${product.id}`}
            className="product-card"
            data-testid={`product-card-${product.id}`}
            style={{
              border: '1px solid #e47911',
              borderRadius: 8,
              padding: 16,
              width: 250,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'box-shadow 0.2s, transform 0.2s, border 0.2s',
              cursor: 'pointer',
            }}
          >
            <img id={`product-image-${product.id}`} src={product.image} alt={product.name} style={{ width: 150, height: 150, objectFit: 'contain', marginBottom: 12 }} />
            <h2 id={`product-name-${product.id}`} style={{ color: '#131921', fontSize: 18, margin: '8px 0' }}>{product.name}</h2>
            <p id={`product-description-${product.id}`} style={{ color: '#555', fontSize: 14 }}>{product.description}</p>
            <div id={`product-category-${product.id}`} style={{ color: '#007185', fontWeight: 500, margin: '8px 0' }}>{product.category}</div>
            <div id={`product-price-${product.id}`} style={{ color: '#b12704', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>${product.price.toFixed(2)}</div>
            <button
              id={`add-to-cart-${product.id}`}
              data-testid={`add-to-cart-${product.id}`}
              style={{
                background: '#ffd814',
                color: '#111',
                border: '1px solid #fcd200',
                borderRadius: 4,
                padding: '8px 16px',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 8,
              }}
              onClick={e => { e.preventDefault(); onAddToCart(product); }}
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
} 