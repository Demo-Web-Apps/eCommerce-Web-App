#!/bin/bash

ASSET_DIR="frontend/src/assets"
mkdir -p "$ASSET_DIR"

# Amazon Fire HD 10 Tablet
curl -L "https://i.ebayimg.com/images/g/gcwAAOSwrrhhkAgX/s-l1200.jpg" -o "$ASSET_DIR/fire-hd-10.jpg"

# Apple iPhone 14 Pro
curl -L "https://files.refurbed.com/ii/iphone-14-pro-1662623063.jpg?t=fitdesign&h=600&w=800&t=convert&f=webp" -o "$ASSET_DIR/iphone-14-pro.jpg"

# Samsung Galaxy S23 Ultra
curl -L "https://cdn11.bigcommerce.com/s-8ek7z3h3jn/images/stencil/1280x1280/products/8270/40885/samsung-galaxy-s23-ultra-256gb-purple-or-sm-s918blideub__31651.1722438083.jpg?c=1" -o "$ASSET_DIR/galaxy-s23-ultra.jpg"

# Sony Bravia 65\" 4K TV
curl -L "https://cdn11.bigcommerce.com/s-8ek7z3h3jn/images/stencil/1280x1280/products/9015/50104/sony-bravia-65-smart-4k-ultra-hd-hdr-led-tv-with-google-tv-and-assistant-or-kd65x75wlu__82791.1722438198.jpg?c=1" -o "$ASSET_DIR/sony-bravia-65.jpg"

# Dell XPS 13 Laptop
curl -L "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/spi/platinum/oled/notebook-xps-13-9350-oled-silver-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400" -o "$ASSET_DIR/dell-xps-13.jpg"

# Apple MacBook Pro 16\"
curl -L "https://backfromthefuture.ie/cdn/shop/files/111945_sp799-mbp13touch-space_394x.jpg?v=1723201011" -o "$ASSET_DIR/macbook-pro-16.jpg"

# Amazon Echo Dot (5th Gen)
curl -L "https://media.currys.biz/i/currysprod/M10244665_blue?$l-large$&fmt=auto" -o "$ASSET_DIR/echo-dot-5th-gen.jpg"

# Logitech MX Master 3S Mouse
curl -L "https://media.currys.biz/i/currysprod/10238899?$l-large$&fmt=auto" -o "$ASSET_DIR/mx-master-3s.jpg"

# Samsung Galaxy Tab S8
curl -L "https://www.celticrepairs.ie/wp-content/uploads/2022/04/Samsung-Galaxy-Tab-S8-Screen-Repair.jpg" -o "$ASSET_DIR/galaxy-tab-s8.jpg"

# LG OLED C2 55\" 4K TV
curl -L "https://www.electrocity.ie/acd-cgi/img/v1/wp-content/uploads/2024/07/lg-oled-evo-ai-g4-4k-ultra-hd-smart-oled-tv11.jpg?quality=90&width=1500&height=1080" -o "$ASSET_DIR/lg-oled-c2-55.jpg"

echo "All images downloaded to $ASSET_DIR"