import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'vehicles', label: 'Veículos' },
  { id: 'houses', label: 'Casas' },
  { id: 'coins', label: 'Coins' },
  { id: 'packs', label: 'Pacotes' },
];

const sortOptions = [
  { id: 'featured', label: 'Destaque' },
  { id: 'price-low', label: 'Preço: Menor para Maior' },
  { id: 'price-high', label: 'Preço: Maior para Menor' },
  { id: 'name', label: 'Nome' },
];

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Check for stored category from category section click
  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      localStorage.removeItem('selectedCategory');
    }
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-midnight pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
            Loja
          </h1>
          <p className="text-muted-foreground">
            Veículos, casas, moedas e pacotes.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn-secondary flex items-center justify-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros</span>
          </button>

          {/* Desktop filters */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Category filters */}
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-4 pr-8 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="lg:hidden mb-6 p-4 bg-card rounded-xl border border-border">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Categorias</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Ordenar Por</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-2 px-3 text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="default" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tente ajustar seus filtros ou termo de busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
