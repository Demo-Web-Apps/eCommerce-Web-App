import fireHd10 from './assets/fire-hd-10.jpg';
import iphone14Pro from './assets/iphone-14-pro.jpg';
import galaxyS23Ultra from './assets/galaxy-s23-ultra.jpg';
import sonyBravia65 from './assets/sony-bravia-65.jpg';
import dellXps13 from './assets/dell-xps-13.jpg';
import macbookPro16 from './assets/macbook-pro-16.jpg';
import echoDot5thGen from './assets/echo-dot-5th-gen.jpg';
import mxMaster3s from './assets/mx-master-3s.jpg';
import galaxyTabS8 from './assets/galaxy-tab-s8.jpg';
import lgOledC255 from './assets/lg-oled-c2-55.jpg';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Amazon Fire HD 10 Tablet',
    description: '10.1" 1080p Full HD, 32 GB, Black',
    price: 149.99,
    image: fireHd10,
    category: 'Tablets',
  },
  {
    id: '2',
    name: 'Apple iPhone 14 Pro',
    description: '6.1-inch display, 128GB, Space Black',
    price: 999.99,
    image: iphone14Pro,
    category: 'Phones',
  },
  {
    id: '3',
    name: 'Samsung Galaxy S23 Ultra',
    description: '6.8-inch display, 256GB, Phantom Black',
    price: 1199.99,
    image: galaxyS23Ultra,
    category: 'Phones',
  },
  {
    id: '4',
    name: 'Sony Bravia 65" 4K TV',
    description: 'Ultra HD Smart LED TV',
    price: 1299.99,
    image: sonyBravia65,
    category: 'Televisions',
  },
  {
    id: '5',
    name: 'Dell XPS 13 Laptop',
    description: '13.4-inch FHD, Intel i7, 16GB RAM, 512GB SSD',
    price: 1399.99,
    image: dellXps13,
    category: 'Computers',
  },
  {
    id: '6',
    name: 'Apple MacBook Pro 16"',
    description: 'M2 Pro, 16GB RAM, 1TB SSD',
    price: 2499.99,
    image: macbookPro16,
    category: 'Computers',
  },
  {
    id: '7',
    name: 'Amazon Echo Dot (5th Gen)',
    description: 'Smart speaker with Alexa',
    price: 49.99,
    image: echoDot5thGen,
    category: 'Other Technology',
  },
  {
    id: '8',
    name: 'Logitech MX Master 3S Mouse',
    description: 'Wireless performance mouse',
    price: 99.99,
    image: mxMaster3s,
    category: 'Other Technology',
  },
  {
    id: '9',
    name: 'Samsung Galaxy Tab S8',
    description: '11-inch, 128GB, Wi-Fi, Silver',
    price: 699.99,
    image: galaxyTabS8,
    category: 'Tablets',
  },
  {
    id: '10',
    name: 'LG OLED C2 55" 4K TV',
    description: 'Smart OLED evo TV',
    price: 1499.99,
    image: lgOledC255,
    category: 'Televisions',
  },
]; 