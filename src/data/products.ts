import type { Product } from '@/types';

export const products: Product[] = [
  // Vehicles
  {
    id: 'veh-1',
    name: 'Progen Emerus',
    description: 'Hipercarro de velocidade máxima com manuseio de elite. Perfeito para fugas e para impressionar.',
    price: 69.90,
    category: 'vehicles',
    image: '/images/vehicle_emerus.jpg',
    featured: true,
    specs: [
      { label: 'Velocidade Máx', value: '210 km/h' },
      { label: 'Aceleração', value: '2.8s' },
      { label: 'Manuseio', value: 'Elite' },
    ],
  },
  {
    id: 'veh-2',
    name: 'Ocelot Pariah',
    description: 'O carro esportivo mais rápido de sua categoria. Design elegante encontra potência bruta.',
    price: 49.90,
    category: 'vehicles',
    image: '/images/product_vehicle_1.jpg',
    specs: [
      { label: 'Velocidade Máx', value: '220 km/h' },
      { label: 'Aceleração', value: '3.2s' },
      { label: 'Manuseio', value: 'Esportivo' },
    ],
  },
  {
    id: 'veh-3',
    name: 'Truffade Thrax',
    description: 'Excelência de hipercarro com aceleração e estilo incomparáveis.',
    price: 89.90,
    category: 'vehicles',
    image: '/images/product_vehicle_2.jpg',
    specs: [
      { label: 'Velocidade Máx', value: '200 km/h' },
      { label: 'Aceleração', value: '2.4s' },
      { label: 'Manuseio', value: 'Elite' },
    ],
  },
  
  // Houses
  {
    id: 'house-1',
    name: 'Mansão Moderna',
    description: 'Mansão moderna de luxo com piscina, garagem para 10 veículos e vista para o oceano.',
    price: 149.90,
    category: 'houses',
    image: '/images/product_house_1.jpg',
    specs: [
      { label: 'Garagem', value: '10 carros' },
      { label: 'Localização', value: 'Vinewood' },
      { label: 'Estilo', value: 'Moderno' },
    ],
  },
  {
    id: 'house-2',
    name: 'Villa Frente-Mar',
    description: 'Propriedade deslumbrante de frente para o mar com acesso privativo e vista panorâmica.',
    price: 199.90,
    category: 'houses',
    image: '/images/product_house_2.jpg',
    featured: true,
    specs: [
      { label: 'Garagem', value: '6 carros' },
      { label: 'Localização', value: 'Del Perro' },
      { label: 'Estilo', value: 'Contemporâneo' },
    ],
  },
  {
    id: 'house-3',
    name: 'Cobertura de Luxo',
    description: 'Cobertura luxuosa no centro da cidade com vista da cidade e móveis de alto padrão.',
    price: 119.90,
    category: 'houses',
    image: '/images/category_houses.jpg',
    specs: [
      { label: 'Garagem', value: '4 carros' },
      { label: 'Localização', value: 'Centro' },
      { label: 'Estilo', value: 'Luxo' },
    ],
  },
  
  // Coins
  {
    id: 'coins-1',
    name: '500K Coins',
    description: 'Meio milhão de dólares no jogo para gastar no que quiser.',
    price: 29.90,
    category: 'coins',
    image: '/images/product_coins_1.jpg',
  },
  {
    id: 'coins-2',
    name: '1M Coins',
    description: 'Um milhão de dólares no jogo. Melhor custo-benefício para jogadores casuais.',
    price: 49.90,
    category: 'coins',
    image: '/images/category_coins.jpg',
  },
  {
    id: 'coins-3',
    name: '5M Coins',
    description: 'Cinco milhões de dólares no jogo. Para quem quer ter tudo.',
    price: 179.90,
    category: 'coins',
    featured: true,
    image: '/images/category_coins.jpg',
  },
  {
    id: 'coins-4',
    name: '10M Coins',
    description: 'Dez milhões de dólares no jogo. Pacote de riqueza definitivo.',
    price: 299.90,
    category: 'coins',
    image: '/images/category_coins.jpg',
  },
  
  // Packs
  {
    id: 'pack-1',
    name: 'Pacote Iniciante',
    description: 'Perfeito para novos jogadores: 500K coins + 1 veículo + apartamento pequeno.',
    price: 89.90,
    category: 'packs',
    image: '/images/product_pack_1.jpg',
    specs: [
      { label: 'Coins', value: '500K' },
      { label: 'Veículo', value: '1' },
      { label: 'Propriedade', value: 'Apartamento' },
    ],
  },
  {
    id: 'pack-2',
    name: 'Pacote Empresário',
    description: 'Pacote para jogadores sérios: 2M coins + 2 veículos + propriedade comercial.',
    price: 249.90,
    category: 'packs',
    image: '/images/category_packs.jpg',
    featured: true,
    specs: [
      { label: 'Coins', value: '2M' },
      { label: 'Veículo', value: '2' },
      { label: 'Propriedade', value: 'Escritório' },
    ],
  },
  {
    id: 'pack-3',
    name: 'Pacote Magnata',
    description: 'O pacote definitivo: 5M coins + 3 veículos + mansão + negócio.',
    price: 549.90,
    category: 'packs',
    image: '/images/category_packs.jpg',
    specs: [
      { label: 'Coins', value: '5M' },
      { label: 'Veículo', value: '3' },
      { label: 'Propriedade', value: 'Mansão' },
    ],
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getProductsByCategory = (category: Product['category']) => 
  products.filter(p => p.category === category);

export const getProductById = (id: string) => products.find(p => p.id === id);
