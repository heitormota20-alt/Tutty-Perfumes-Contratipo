import React, { useState, useMemo } from 'react';
import { ShoppingCart, Plus, Minus, X, ArrowRight, Search, CheckCircle2, Heart, User, Star, ZoomIn, Info, ShieldCheck, Truck, Clock } from 'lucide-react';

// --- DATA ---
type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  accords: string[];
  price: number;
  oldPrice?: number;
  rating?: number;
  image: string;
};

const products: Product[] = [
  {
    id: 'la-vie',
    name: 'La Vie Est Belle',
    brand: 'LANCÔME',
    category: 'Feminino',
    accords: ['Doce', 'Baunilha', 'Frutado', 'Patchouli', 'Atalcado', 'Íris', 'Floral Branco', 'Terroso', 'Amadeirado'],
    price: 130,
    oldPrice: 260,
    rating: 4.8,
    image: '/La Vie Est Belle.jpg'
  },
  {
    id: 'delina',
    name: 'Delina Exclusif',
    brand: 'PERFUMS MARLY',
    category: 'Ocasional',
    accords: ['Rosa', 'Frutado', 'Baunilha', 'Âmbar', 'Tropical', 'Amadeirado', 'Atalcado', 'Especiado Quente', 'Floral', 'Almiscarado'],
    price: 130,
    oldPrice: 190,
    rating: 4.9,
    image: '/Delina Exclusif.jpg'
  },
  {
    id: 'scandal',
    name: 'Scandal',
    brand: 'JEAN PAUL GAULTIER',
    category: 'Feminino',
    accords: ['Mel', 'Doce', 'Floral Branco', 'Cítrico', 'Caramelo', 'Patchouli', 'Animálico', 'Cera de Abelha'],
    price: 130,
    rating: 4.7,
    image: '/Scandal(1).jpg'
  },
  {
    id: 'fakhar',
    name: 'Fakhar Rose',
    brand: 'LATTAFA',
    category: 'Exclusivos',
    accords: ['Tuberosa', 'Floral Branco', 'Frutado', 'Doce', 'Animálico', 'Cítrico', 'Verde', 'Amadeirado'],
    price: 130,
    oldPrice: 160,
    rating: 4.6,
    image: '/Fakhar-Rose.png'
  },
  {
    id: 'my-way',
    name: 'My Way',
    brand: 'Giorgio Armani',
    category: 'Feminino',
    accords: ['Floral Branco', 'Tuberosa', 'Cítrico', 'Animálico', 'Baunilha'],
    price: 130,
    rating: 4.8,
    image: '/My-Way.png'
  },
  {
    id: 'palatine',
    name: 'Palatine',
    brand: 'Parfums de Marly',
    category: 'Feminino',
    accords: ['Atalcado', 'Violeta', 'Floral', 'Almiscarado', 'Amadeirado', 'Cítrico', 'Frutado', 'Doce', 'Fresco', 'Lavanda'],
    price: 130,
    rating: 4.7,
    image: '/Platine.png'
  },
  {
    id: 'allure-homme-sport',
    name: 'Allure Homme Sport',
    brand: 'Chanel',
    category: 'Masculino',
    accords: ['Cítrico', 'Aromático', 'Baunilha', 'Aldeídico', 'Marinho', 'Doce', 'Fresco Especiado', 'Fresco', 'Âmbar', 'Atalcado'],
    price: 130,
    rating: 4.9,
    image: '/Allure.png'
  },
  {
    id: 'lady-million',
    name: 'Lady Million',
    brand: 'Rabanne',
    category: 'Feminino',
    accords: ['Floral Branco', 'Doce', 'Mel', 'Cítrico', 'Frutado', 'Floral', 'Patchouli', 'Animálico', 'Âmbar'],
    price: 130,
    rating: 4.8,
    image: '/Lady-Million.png'
  },
  {
    id: 'light-blue-edt',
    name: 'Light Blue Eau de Toilette',
    brand: 'Dolce&Gabbana',
    category: 'Feminino',
    accords: ['Cítrico', 'Amadeirado', 'Fresco', 'Frutado', 'Almiscarado', 'Floral Branco', 'Aromático', 'Verde', 'Atalcado'],
    price: 130,
    rating: 4.7,
    image: '/Light-Blue-Eau-de-Toilette.png'
  },
  {
    id: 'libre',
    name: 'Libre',
    brand: 'Yves Saint Laurent',
    category: 'Feminino',
    accords: ['Floral Branco', 'Cítrico', 'Lavanda', 'Baunilha', 'Aromático', 'Doce', 'Atalcado', 'Animálico', 'Almiscarado', 'Amadeirado'],
    price: 130,
    rating: 4.9,
    image: '/Libre.png'
  },
  {
    id: 'linterdit-edp',
    name: "L'Interdit Eau de Parfum",
    brand: 'Givenchy',
    category: 'Feminino',
    accords: ['Floral Branco', 'Tuberosa', 'Doce', 'Cítrico', 'Amadeirado', 'Patchouli', 'Baunilha', 'Frutado', 'Animálico'],
    price: 130,
    rating: 4.8,
    image: "/L'Interdit-Eau-de-Parfum.png"
  },
  {
    id: 'wanted',
    name: 'Wanted',
    brand: 'Azzaro',
    category: 'Masculino',
    accords: ['Aromático', 'Fresco Especiado', 'Fresco', 'Cítrico', 'Âmbar', 'Amadeirado', 'Especiado Quente', 'Frutado', 'Verde', 'Baunilha'],
    price: 130,
    rating: 4.7,
    image: '/Wanted.png'
  },
  {
    id: 'olympea',
    name: 'Olympéa',
    brand: 'Rabanne',
    category: 'Feminino',
    accords: ['Baunilha', 'Salgado', 'Floral Branco', 'Amadeirado', 'Âmbar', 'Atalcado', 'Cítrico', 'Balsâmico', 'Marinho', 'Fresco Especiado'],
    price: 130,
    rating: 4.8,
    image: '/Olympéa.png'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    brand: 'Rabanne',
    category: 'Masculino',
    accords: ['Cítrico', 'Baunilha', 'Lavanda', 'Terroso', 'Aromático', 'Amadeirado', 'Defumado', 'Frutado', 'Fresco', 'Fresco Especiado'],
    price: 130,
    rating: 4.6,
    image: '/Phantom.jpg'
  },
  {
    id: 'la-belle',
    name: 'La Belle',
    brand: 'Jean Paul Gaultier',
    category: 'Feminino',
    accords: ['Baunilha', 'Frutado', 'Doce', 'Atalcado', 'Aquático', 'Aromático', 'Âmbar', 'Amadeirado', 'Floral', 'Fresco'],
    price: 130,
    rating: 4.9,
    image: '/La-Belle.jpg'
  },
  {
    id: '212-vip-men',
    name: '212 VIP Men',
    brand: 'Carolina Herrera',
    category: 'Masculino',
    accords: ['Fresco Especiado', 'Aromático', 'Vodka', 'Amadeirado', 'Verde', 'Tropical', 'Cítrico', 'Frutado', 'Especiado Quente', 'Fresco'],
    price: 130,
    rating: 4.8,
    image: '/212VIP.png'
  },
  {
    id: 'aventus',
    name: 'Aventus',
    brand: 'Creed',
    category: 'Masculino',
    accords: ['Frutado', 'Doce', 'Amadeirado', 'Couro', 'Cítrico', 'Defumado', 'Almiscarado', 'Tropical', 'Fresco', 'Musgo'],
    price: 130,
    rating: 4.9,
    image: '/Aventus.png'
  },
  {
    id: 'royal-amber',
    name: 'Royal Amber',
    brand: 'Orientica Premium',
    category: 'Compartilhável',
    accords: ['Doce', 'Frutado', 'Almiscarado', 'Atalcado', 'Âmbar', 'Amadeirado', 'Ozônico', 'Fresco', 'Baunilha', 'Cítrico'],
    price: 130,
    rating: 4.8,
    image: '/Royal-Amber-Orientica-Premium-Perfume(1).jpg'
  },
  {
    id: 'terre-dhermes',
    name: "Terre d'Hermès",
    brand: 'Hermès',
    category: 'Masculino',
    accords: ['Cítrico', 'Amadeirado', 'Fresco Especiado', 'Aromático', 'Terroso', 'Especiado Quente'],
    price: 130,
    rating: 4.9,
    image: "/Terre-d'Hermès.png"
  },
  {
    id: 'layton',
    name: 'Layton',
    brand: 'Parfums de Marly',
    category: 'Compartilhável',
    accords: ['Especiado Quente', 'Fresco Especiado', 'Amadeirado', 'Baunilha', 'Aromático', 'Frutado', 'Atalcado', 'Lavanda', 'Fresco', 'Cítrico'],
    price: 130,
    rating: 4.9,
    image: '/Layton-Parfums-de-Marly-Eau-de-Parfum-Masculino.png'
  },
  {
    id: 'paradigme',
    name: 'Paradigme',
    brand: 'Prada',
    category: 'Masculino',
    accords: ['Fresco Especiado', 'Âmbar', 'Aromático', 'Amadeirado', 'Cítrico', 'Balsâmico', 'Especiado Quente', 'Almíscarado', 'Rosa', 'Atalcado'],
    price: 130,
    rating: 4.7,
    image: '/Paradigme.jpg'
  },
  {
    id: 'signature',
    name: 'Signature',
    brand: 'Montblanc',
    category: 'Feminino',
    accords: ['Baunilha', 'Floral', 'Cítrico', 'Almíscarado', 'Doce', 'Atalcado', 'Floral Amarelo', 'Âmbar'],
    price: 130,
    rating: 4.8,
    image: '/Signature.png'
  },
  {
    id: 'imagination',
    name: 'Imagination',
    brand: 'Louis Vuitton',
    category: 'Masculino',
    accords: ['Cítrico', 'Fresco Especiado', 'Fresco', 'Verde', 'Âmbar'],
    price: 130,
    rating: 4.9,
    image: '/Imagination.jpg'
  },
  {
    id: 'dylan-blue',
    name: 'Versace Pour Homme\nDylan Blue',
    brand: 'Versace',
    category: 'Masculino',
    accords: ['Âmbar', 'Cítrico', 'Fresco Especiado', 'Almíscarado', 'Aquático', 'Especiado Quente', 'Amadeirado', 'Fresco', 'Aromático'],
    price: 130,
    rating: 4.8,
    image: '/Versace-Pour-Homme-Dylan-Blue.png'
  }
];

type CartItem = {
  id: string; // combination of productId and size
  product: Product;
  quantity: number;
  size: string;
  price: number;
};

// --- COMPONENTS ---
function ProductCard({
  product,
  isFavorite,
  toggleFavorite,
  setZoomedImage,
  setSelectedProductDetails,
  addToCart
}: {
  key?: React.Key;
  product: Product;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent, id: string) => void;
  setZoomedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedProductDetails: React.Dispatch<React.SetStateAction<{product: Product, size: '30ml' | '50ml' | '100ml'} | null>>;
  addToCart: (product: Product, size: string, price: number) => void;
}) {
  const sizePrices = { '30ml': 45, '50ml': 75, '100ml': 150 };
  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml'>('30ml');
  const currentPrice = sizePrices[selectedSize];
  const currentOldPrice = undefined;

  return (
    <div className="group flex flex-col bg-white border border-[var(--color-border-color)] overflow-hidden relative hover:shadow-card transition-all duration-200 hover:-translate-y-1">

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-section)]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
          <button
            onClick={(e) => toggleFavorite(e, product.id)}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-gray-200"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setZoomedImage(product.image); }}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-gray-200"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow px-4 pb-4 mt-4">
        <span className="text-[11px] text-[var(--color-text-muted)] tracking-wide mb-1 uppercase font-semibold">{product.category}</span>

        <h3 className="font-sans font-bold text-[15px] text-[var(--color-text-primary)] mb-1 leading-snug whitespace-pre-line">{product.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'fill-gray-200 text-gray-200'}`} />
          ))}
          <span className="text-[10px] text-[var(--color-text-muted)] ml-1">({product.rating})</span>
        </div>

        {/* Size Options */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {(['30ml', '50ml', '100ml'] as const).map(size => (
            <button
              key={size}
              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
              className={`px-3 py-1 rounded-[4px] text-[11px] font-bold border transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-end pb-1 pt-2">
          <div className="flex items-center gap-2 font-sans">
            <span className="text-[16px] font-bold text-[var(--color-text-primary)]">R$ {currentPrice.toFixed(2)}</span>
            {currentOldPrice && (
              <span className="text-[13px] text-[var(--color-text-muted)] line-through">R$ {currentOldPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product, selectedSize, currentPrice); }}
            className="w-[36px] h-[36px] shrink-0 border border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedProductDetails({ product, size: selectedSize }); }}
          className="w-full mt-3 py-2 bg-[var(--color-bg-section)] text-[12px] font-bold tracking-wide uppercase text-[var(--color-text-primary)] hover:bg-gray-100 transition-colors"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}

function ProductDetailsModal({
  product,
  initialSize = '30ml',
  onClose,
  isFavorite,
  toggleFavorite,
  addToCart
}: {
  product: Product;
  initialSize?: '30ml' | '50ml' | '100ml';
  onClose: () => void;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent, id: string) => void;
  addToCart: (product: Product, size: string, price: number) => void;
}) {
  const sizePrices = { '30ml': 45, '50ml': 75, '100ml': 150 };
  const [selectedSize, setSelectedSize] = useState<'30ml' | '50ml' | '100ml'>(initialSize || '30ml');
  const currentPrice = sizePrices[selectedSize];
  const currentOldPrice = undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl bg-white shadow-2xl rounded-[10px] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-sm backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-[var(--color-bg-section)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider mt-2 mb-1 uppercase font-semibold">
            {product.category}
          </span>
          <h2 className="text-2xl font-bold font-sans text-gray-900 mb-1 leading-snug whitespace-pre-line">{product.name}</h2>
          <span className="text-sm text-[var(--color-text-muted)] mb-6 block font-medium uppercase tracking-wide">{product.brand}</span>

          {/* Size Options */}
          <div className="flex items-center gap-2 mb-6">
            {(['30ml', '50ml', '100ml'] as const).map(size => (
              <button
                key={size}
                onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                className={`px-4 py-2 rounded-[6px] text-[12px] font-bold border transition-colors ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 font-sans mb-8">
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">R$ {currentPrice.toFixed(2)}</span>
            {currentOldPrice && (
              <span className="text-sm text-[var(--color-text-muted)] line-through">R$ {currentOldPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Principais Acordes</h4>
            <div className="flex flex-wrap gap-2">
              {product.accords.map(accord => (
                <span key={accord} className="px-3 py-1 bg-[var(--color-bg-section)] border border-[var(--color-border-color)] text-[var(--color-text-primary)] text-[11px] font-medium tracking-wide">
                  {accord}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-3">
            <button
              onClick={() => { addToCart(product, selectedSize, currentPrice); onClose(); }}
              className="flex-1 bg-black text-white font-bold tracking-wide uppercase text-sm flex items-center justify-center gap-2 py-3 hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Adicionar
            </button>
            <button
              onClick={(e) => {
                toggleFavorite(e as any, product.id);
              }}
              className="w-12 h-12 flex items-center justify-center border border-[var(--color-border-color)] hover:border-black transition-colors bg-[var(--color-bg-base)]"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[var(--color-text-primary)]'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<{product: Product, size: '30ml' | '50ml' | '100ml'} | null>(null);

  // Derived state
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const categories = ['Todos', 'Feminino', 'Masculino', 'Compartilhável', 'Ocasional', 'Exclusivos'];

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'Todos') {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return list;
  }, [selectedCategory, searchQuery]);

  const searchPreviewResults = useMemo(() => {
    if (searchQuery.trim().length < 3) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 5); // Limit to 5 results for the preview
  }, [searchQuery]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Cart Handlers
  const addToCart = (product: Product, size: string = '30ml', price: number = 45) => {
    const cartItemId = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity: 1, size, price }];
    });
    setIsCartOpen(true);
  };

  const buyNow = (product: Product, size: string = '30ml', price: number = 45) => {
    const cartItemId = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity: 1, size, price }];
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const renderProductCard = (product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
      isFavorite={favorites.includes(product.id)}
      toggleFavorite={toggleFavorite}
      setZoomedImage={setZoomedImage}
      setSelectedProductDetails={setSelectedProductDetails}
      addToCart={addToCart}
    />
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-base)] font-sans text-[var(--color-text-primary)]">
      {/* NAVBAR */}
      <header className="w-full bg-white sticky top-0 z-40 border-b border-[var(--color-border-color)] h-[72px] flex items-center">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 md:px-12 lg:px-20">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0">
            <img src="/Logo.svg" alt="TUTY" className="h-[30px] md:h-10 object-contain transition-all" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <div className="hidden flex-col items-center justify-center">
              <h2 className="text-[36px] font-serif uppercase tracking-tight leading-none text-black">TUTY</h2>
            </div>
          </div>

          {/* Search Field (Replacing Links) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar fragrâncias..."
                className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:border-black font-sans transition-colors"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {/* Search Preview Dropdown */}
              {searchPreviewResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border-color)] rounded-lg shadow-xl overflow-hidden z-50">
                  {searchPreviewResults.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setSelectedProductDetails({ product: p, size: '30ml' });
                        setSearchQuery('');
                        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-[var(--color-bg-section)] cursor-pointer border-b border-[var(--color-border-color)] last:border-0 transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-md" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{p.name}</span>
                        <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wide">{p.brand}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 text-[var(--color-text-primary)] shrink-0">
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden hover:text-[var(--color-accent)] transition-colors"
            >
              <Search className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>

            {/* WhatsApp Contact */}
            <a
              href={`https://api.whatsapp.com/send?phone=5511994115997&text=${encodeURIComponent("Olá! Vim pelo site da Tuty Perfumes e gostaria de conhecer melhor os produtos disponíveis. Poderia me enviar mais informações? \u{1F338}")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors hidden lg:flex items-center gap-2 text-[14px] font-medium border-r border-[var(--color-border-color)] pr-5 mr-1"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              +55 11 99411-5997
            </a>

            <button className="hover:text-[var(--color-accent)] transition-colors hidden sm:block">
              <Heart className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-[var(--color-accent)] transition-colors relative"
            >
              <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="hover:text-[var(--color-accent)] transition-colors hidden sm:block">
              <User className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="md:hidden w-full bg-white border-b border-[var(--color-border-color)] px-6 py-4 animate-in slide-in-from-top-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar fragrâncias..."
              className="w-full border border-gray-300 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:border-black font-sans transition-colors"
              autoFocus
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            
            {/* Search Preview Dropdown */}
            {searchPreviewResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border-color)] rounded-lg shadow-xl overflow-hidden z-50">
                {searchPreviewResults.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setSelectedProductDetails({ product: p, size: '30ml' });
                      setSearchQuery('');
                      setIsMobileSearchOpen(false);
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-[var(--color-bg-section)] cursor-pointer border-b border-[var(--color-border-color)] last:border-0 transition-colors"
                  >
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-md" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[var(--color-text-primary)]">{p.name}</span>
                      <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wide">{p.brand}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] bg-black overflow-hidden flex items-end md:items-center justify-center pb-[50px] md:pb-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(min-width: 768px)" srcSet="/lady-million-banner-1.png" />
            <img
              src="/Banner-Mobile.png"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=2000";
                e.currentTarget.onerror = null;
              }}
              className="w-full h-full object-cover object-center opacity-100 md:opacity-80"
              alt="Perfume Hero"
              referrerPolicy="no-referrer"
            />
          </picture>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent"></div>
        </div>

        <div className="relative z-10 w-full mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 flex flex-col items-center md:items-start">
          <div className="max-w-[650px] relative z-10 pt-8 md:py-12 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-[20px] sm:text-[24px] md:text-[60px] lg:text-[72px] leading-[1.1] font-sans font-bold text-white mb-2 md:mb-6 tracking-tight">
              A Essência que Define Você
            </h1>

            <p className="text-white/90 text-[11px] sm:text-[12px] md:text-[18px] leading-relaxed mb-5 md:mb-10 font-normal max-w-lg px-2 md:px-0">
              Descubra nossa coleção de perfumes premium. Fragrâncias únicas e marcantes para todos os momentos, acompanhando sua personalidade e estilo.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent text-white border border-white px-[20px] py-[10px] md:px-[32px] md:py-[16px] text-[10px] md:text-[14px] font-bold rounded-none hover:bg-white hover:text-black flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest group"
              >
                Ver Coleção
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="bg-white border-y border-[var(--color-border-color)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border-color)]">
          <div className="flex items-center justify-start md:justify-center gap-4 py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-section)] flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
              <Truck strokeWidth={1.5} className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[var(--color-text-primary)] text-[15px]">Frete Grátis</h4>
              <p className="text-[var(--color-text-muted)] text-[13px]">Compras acima de R$ 200</p>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-center gap-4 py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-section)] flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
              <ShieldCheck strokeWidth={1.5} className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[var(--color-text-primary)] text-[15px]">Pagamento Seguro</h4>
              <p className="text-[var(--color-text-muted)] text-[13px]">Checkout 100% Seguro</p>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-center gap-4 py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-section)] flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[var(--color-text-primary)] text-[15px]">Suporte Especializado</h4>
              <p className="text-[var(--color-text-muted)] text-[13px]">Atendimento via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS SECTION */}
      <section className="hidden md:block mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 pt-16 pb-8">
        <h2 className="text-[28px] font-sans font-bold text-[var(--color-text-primary)] tracking-tight mb-8 text-center md:text-left">
          Os Mais pedidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(renderProductCard)}
        </div>
      </section>

      {/* PRODUCT COLLECTION SECTION */}
      <section id="shop" className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 pt-8 pb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <h2 className="text-[32px] font-sans font-bold text-[var(--color-text-primary)] tracking-tight">
            Catálogo
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-[14px] font-medium rounded-[var(--radius-sm)] transition-all ${selectedCategory === cat
                    ? 'bg-[var(--color-cta)] text-white shadow-sm'
                    : 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-section)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT LOOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(renderProductCard)}
        </div>
      </section>



      {/* DRAWER & MODALS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={cartTotal}
      />

      {zoomedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setZoomedImage(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative z-10 max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img src={zoomedImage} alt="Zoomed Product" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
          </div>
        </div>
      )}

      {selectedProductDetails && (
        <ProductDetailsModal
          product={selectedProductDetails.product}
          initialSize={selectedProductDetails.size}
          onClose={() => setSelectedProductDetails(null)}
          isFavorite={favorites.includes(selectedProductDetails.product.id)}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      )}

      {/* FOOTER */}
      <footer className="w-full py-3 md:py-4 border-t border-[var(--color-border-color)] mt-auto bg-white">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-[12px] md:text-sm text-[var(--color-text-primary)] font-medium mb-0.5">
            Tuty Perfumes Contratipo | Direitos reservados do site
          </p>
          <p className="text-[10px] md:text-xs text-[var(--color-text-muted)]">
            Criado por Heitor Mota
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- COMPONENTS ---

// Handled inline above to match specific exact grid layout requirements easily

function CartDrawer({
  isOpen,
  onClose,
  cart,
  total,
  onUpdateQuantity,
  onRemove,
  onCheckout
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white border-l border-[var(--color-border-color)] shadow-[-5px_0_15px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-color)] px-7 py-5 bg-white">
          <h2 className="flex items-center gap-2 font-sans text-[22px] font-bold text-[var(--color-text-primary)] uppercase tracking-tight">
            Seu Carrinho
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text-primary)] focus:outline-none transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-[var(--color-text-muted)]">
              <ShoppingCart className="h-16 w-16 text-[var(--color-border-color)]" />
              <p className="text-[13px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">Seu carrinho está vazio.</p>
              <button
                onClick={onClose}
                className="mt-4 border border-black text-black bg-transparent px-6 py-3 text-[13px] font-bold hover:bg-black hover:text-white transition-colors rounded-none uppercase tracking-wider"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cart.map(item => (
                <li key={item.id} className="flex gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border-color)] relative bg-[var(--color-bg-section)] hover:shadow-card transition-shadow">
                  <div className="h-20 w-20 flex-shrink-0 bg-white border border-[var(--color-border-color)] rounded-[var(--radius-md)] overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <span className="text-[11px] text-[var(--color-text-muted)] uppercase mb-1">{item.product.category}</span>
                    <h4 className="font-sans font-bold text-[var(--color-text-primary)] text-[14px] leading-tight mb-1 whitespace-pre-line">{item.product.name}</h4>
                    <span className="text-[12px] text-[var(--color-text-secondary)] mb-1 block">Tamanho: {item.size}</span>
                    <span className="text-[15px] font-sans font-bold text-[var(--color-text-primary)]">
                      R$ {item.price.toFixed(2)}
                    </span>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded border border-[var(--color-border-color)] bg-white h-8 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-section)] disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val >= 1) {
                              onUpdateQuantity(item.id, val - item.quantity);
                            } else if (e.target.value === '') {
                              onUpdateQuantity(item.id, 1 - item.quantity);
                            }
                          }}
                          className="w-10 h-full text-center text-[13px] font-bold text-[var(--color-text-primary)] outline-none border-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-section)]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-[12px] font-medium text-[var(--color-text-muted)] hover:text-red-500 underline underline-offset-2 absolute top-4 right-4"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[var(--color-border-color)] bg-white px-6 py-6 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-10">
            {cart.reduce((a, b) => a + b.quantity, 0) > 10 && (
              <div className="mb-4 rounded-[var(--radius-md)] bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-2 text-[13px]">
                <div className="mt-0.5 text-yellow-600 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <p className="text-yellow-800 font-medium leading-tight">
                  Pedido acima de 10 unidades. Será tratado como <strong>encomenda</strong>.
                </p>
              </div>
            )}
            <div className="flex justify-between items-end mb-6">
              <span className="text-[15px] text-[var(--color-text-secondary)] font-medium">Subtotal</span>
              <span className="text-[24px] font-sans font-bold text-[var(--color-text-primary)]">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full border border-black text-black bg-transparent text-center py-[16px] rounded-none font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-black hover:text-white uppercase tracking-wider transition-colors shadow-none"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CheckoutModal({
  isOpen,
  onClose,
  cart,
  total
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
}) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalItems = cart.reduce((a, b) => a + b.quantity, 0);
    const isSpecialOrder = totalItems > 10;
    
    const whatsappNumber = '5511994115997';
    let message = `*NOVO PEDIDO - Contratipo Tuty Perfum*\n\n`;
    if (isSpecialOrder) {
      message += `*\u{26A0}\u{FE0F} PEDIDO SOB ENCOMENDA (>10 ITENS)*\n\n`;
    }
    message += `*\u{1F464} Cliente:* ${formData.name}\n`;
    message += `*\u{1F4CD} Endereço:* ${formData.address}\n`;
    message += `*\u{1F4B3} Pagamento:* ${formData.paymentMethod}\n\n`;
    message += `*\u{1F6CD}\u{FE0F} Produtos:*\n`;
    cart.forEach(item => {
      message += `${item.quantity}x ${item.product.name.replace('\n', ' ')} (${item.size}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*\u{1F4B0} Total:* R$ ${total.toFixed(2)}`;
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white border-b border-[var(--color-border-color)] px-6 py-5 flex items-center justify-between">
          <h2 className="font-sans font-bold text-[24px] text-[var(--color-text-primary)] uppercase tracking-tight">Finalizar Pedido</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-[var(--color-bg-section)] text-[var(--color-text-muted)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form id="checkout-form" onSubmit={handleSubmit} className="px-6 py-6 border-b border-[var(--color-border-color)] max-h-[70vh] overflow-y-auto">
          <div className="mb-6 rounded-[var(--radius-md)] bg-[var(--color-bg-section)] border border-[var(--color-border-color)] p-4 flex items-center gap-3 text-[14px]">
            <CheckCircle2 className="h-5 w-5 text-[var(--color-sale-green)] shrink-0" />
            <span className="font-medium text-[var(--color-text-primary)]">
              Resumo do Pedido: {cart.reduce((a, b) => a + b.quantity, 0)} itens • <strong className="font-bold border-b border-[var(--color-text-primary)] pb-0.5">R$ {total.toFixed(2)}</strong>
            </span>
          </div>

          {cart.reduce((a, b) => a + b.quantity, 0) > 10 && (
            <div className="mb-6 rounded-[var(--radius-md)] bg-yellow-50 border border-yellow-200 p-4 flex items-start gap-3 text-[14px]">
              <div className="mt-0.5 text-yellow-600 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <p className="text-yellow-800 font-medium leading-relaxed">
                <strong>Aviso Importante:</strong> Seu pedido possui mais de 10 perfumes. Por se tratar de uma quantidade elevada, este pedido será tratado como <strong>encomenda</strong> e terá um prazo de entrega diferenciado. Nossa equipe entrará em contato via WhatsApp com os detalhes.
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[13px] font-medium mb-1.5 text-[var(--color-text-secondary)]">
                Nome Completo
              </label>
              <input
                id="name"
                required
                type="text"
                placeholder="Ex. Maria Silva"
                className="w-full border border-[var(--color-border-color)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-[13px] font-medium mb-1.5 text-[var(--color-text-secondary)]">
                Endereço de Entrega
              </label>
              <input
                id="address"
                required
                type="text"
                placeholder="Rua Principal, 123, Bairro..."
                className="w-full border border-[var(--color-border-color)] rounded-[var(--radius-md)] px-4 py-3 text-[14px] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="pt-2">
              <label className="block text-[13px] font-medium mb-2.5 text-[var(--color-text-secondary)]">
                Forma de Pagamento
              </label>
              <div className="flex flex-col gap-3">
                {['Pix', 'Cartão de Crédito', 'Cartão de Débito'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 cursor-pointer p-4 border rounded-[var(--radius-md)] text-[14px] transition-colors ${formData.paymentMethod === method
                        ? 'border-[var(--color-primary)] bg-[rgba(61,26,0,0.03)] font-bold text-[var(--color-text-primary)] shadow-sm'
                        : 'border-[var(--color-border-color)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-section)]'
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      required
                      className="sr-only"
                      checked={formData.paymentMethod === method}
                      onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.paymentMethod === method ? 'border-[var(--color-primary)]' : 'border-[#ccc]'}`}>
                      {formData.paymentMethod === method && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>}
                    </div>
                    {method}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 bg-white">
          <button
            form="checkout-form"
            type="submit"
            className="w-full border border-black text-black bg-white text-center py-[16px] rounded-none font-bold text-[14px] flex items-center justify-center gap-[10px] hover:bg-black hover:text-white transition-all group uppercase tracking-wider shadow-none"
          >
            <span>Finalizar no WhatsApp</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

