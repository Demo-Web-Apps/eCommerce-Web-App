import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Map for pretty names
  const pretty = (segment: string) => {
    if (segment === 'products') return 'Products';
    if (segment === 'cart') return 'Cart';
    if (segment === 'checkout') return 'Checkout';
    if (segment === 'account') return 'Account';
    if (segment === 'signin') return 'Sign In';
    if (segment === 'signup') return 'Sign Up';
    if (segment === 'orders') return 'Order History';
    if (segment === 'address' || segment === 'addresses') return 'Addresses';
    if (segment === 'payment') return 'Payment Methods';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  // Build links
  let to = '';
  return (
    <nav aria-label="Breadcrumb" style={{ margin: '18px 0 18px 0', fontSize: 15 }}>
      <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link to="/" style={{ color: '#007185', textDecoration: 'underline', fontWeight: 600 }}>Home</Link>
        </li>
        {pathnames.map((segment, idx) => {
          to += '/' + segment;
          const isLast = idx === pathnames.length - 1;
          return (
            <li key={to} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#bbb', margin: '0 4px' }}>/</span>
              {isLast ? (
                <span style={{ color: '#232f3e', fontWeight: 700 }}>{pretty(segment)}</span>
              ) : (
                <Link to={to} style={{ color: '#007185', textDecoration: 'underline', fontWeight: 600 }}>{pretty(segment)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 