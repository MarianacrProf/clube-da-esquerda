import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ShoppingBag, 
  Gift, 
  Star,
  Heart,
  Search,
  Filter,
  Tag,
  Truck,
  Crown,
  Users,
  Plus,
  ExternalLink,
  Package,
  Sparkles
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "gifts" | "apparel" | "books" | "accessories" | "collaborative";
  seller: {
    name: string;
    avatar: string;
    type: "club" | "partner" | "member";
  };
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Kit Brindes Clube da Esquerda",
    description: "Kit completo com caneca, adesivos, boton e bandana com estampa exclusiva da onça",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    category: "gifts",
    seller: {
      name: "Clube da Esquerda",
      avatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=100",
      type: "club"
    },
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isFeatured: true,
    tags: ["Kit", "Exclusivo", "Caneca"]
  },
  {
    id: 2,
    name: "Camiseta 'Resistência Popular'",
    description: "Camiseta 100% algodão com estampa serigrafada, design inspirado na luta popular brasileira",
    price: 39.90,
    originalPrice: 49.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "apparel",
    seller: {
      name: "Clube da Esquerda",
      avatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=100",
      type: "club"
    },
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: true,
    tags: ["Camiseta", "Resistência", "Algodão"]
  },
  {
    id: 3,
    name: "Livro: 'Democracia Participativa'",
    description: "Coletânea de textos sobre democracia participativa no Brasil, organizado por membros do Clube",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    category: "books",
    seller: {
      name: "Clube da Esquerda",
      avatar: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=100",
      type: "club"
    },
    rating: 4.7,
    reviews: 89,
    inStock: true,
    tags: ["Livro", "Política", "Democracia"]
  },
  {
    id: 4,
    name: "Artesanato Indígena - Colar",
    description: "Colar artesanal produzido por comunidade indígena parceira, renda revertida integralmente",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    category: "collaborative",
    seller: {
      name: "Comunidade Guarani",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      type: "partner"
    },
    rating: 5.0,
    reviews: 45,
    inStock: true,
    isFeatured: true,
    tags: ["Artesanato", "Indígena", "Solidário"]
  },
  {
    id: 5,
    name: "Produtos Orgânicos - MST",
    description: "Cesta com produtos orgânicos do MST: arroz, feijão, açúcar mascavo e café",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    category: "collaborative",
    seller: {
      name: "MST - Movimento dos Trabalhadores Rurais",
      avatar: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100",
      type: "partner"
    },
    rating: 4.9,
    reviews: 123,
    inStock: true,
    tags: ["Orgânico", "MST", "Agricultura"]
  },
  {
    id: 6,
    name: "Ecobag Personalizada",
    description: "Ecobag reutilizável com estampa exclusiva, produzida por cooperativa de costureiras",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "accessories",
    seller: {
      name: "Cooperativa Mãos Unidas",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
      type: "partner"
    },
    rating: 4.6,
    reviews: 67,
    inStock: true,
    tags: ["Ecológico", "Cooperativa", "Sustentável"]
  }
];

const categories = [
  { id: "all", name: "Todos", icon: ShoppingBag },
  { id: "gifts", name: "Brindes", icon: Gift },
  { id: "apparel", name: "Roupas", icon: Package },
  { id: "books", name: "Livros", icon: Package },
  { id: "accessories", name: "Acessórios", icon: Tag },
  { id: "collaborative", name: "Colaborativos", icon: Users }
];

export function StoreAndGifts() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = mockProducts.filter(product => product.isFeatured);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const getSellerBadge = (type: "club" | "partner" | "member") => {
    switch (type) {
      case "club":
        return <Badge className="bg-green-100 text-green-700"><Crown className="w-3 h-3 mr-1" />Clube</Badge>;
      case "partner":
        return <Badge className="bg-blue-100 text-blue-700"><Users className="w-3 h-3 mr-1" />Parceiro</Badge>;
      case "member":
        return <Badge className="bg-purple-100 text-purple-700">Membro</Badge>;
    }
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-green-700 mb-4">🛍️ Loja e Brindes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Produtos oficiais do Clube da Esquerda e parceiros colaborativos.
          <span className="block mt-2 font-medium text-green-600">
            Apoie a causa comprando com propósito!
          </span>
        </p>
      </motion.div>

      {/* Produtos em destaque */}
      {featuredProducts.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <h2 className="text-yellow-700">Em Destaque</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={`featured-${product.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-orange-50">
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
                      </Badge>
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 left-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          favorites.includes(product.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600"
                        }`} 
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <ImageWithFallback
                          src={product.seller.avatar}
                          alt={product.seller.name}
                          className="rounded-full object-cover"
                        />
                      </Avatar>
                      <span className="text-sm text-gray-600">{product.seller.name}</span>
                      {getSellerBadge(product.seller.type)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {product.rating} ({product.reviews})
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Comprar" : "Esgotado"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600">
            <ShoppingBag className="w-3 h-3 mr-1" />
            {cart.length} no carrinho
          </Badge>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-blue-100 text-blue-700">Novo</Badge>
                  )}
                  {product.seller.type === "partner" && (
                    <Badge className="bg-purple-100 text-purple-700">
                      <Users className="w-3 h-3 mr-1" />
                      Colaborativo
                    </Badge>
                  )}
                </div>
                
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 left-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-600"
                    }`} 
                  />
                </button>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                  {product.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                {/* Vendedor */}
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <ImageWithFallback
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <span className="text-sm text-gray-600 flex-1 truncate">
                    {product.seller.name}
                  </span>
                  {getSellerBadge(product.seller.type)}
                </div>
                
                {/* Preço e ações */}
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating} ({product.reviews})
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => addToCart(product.id)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Comprar" : "Esgotado"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredProducts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-600 mb-2">Nenhum produto encontrado</h3>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}

      {/* Informações sobre colaboração */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-center text-green-700 mb-4">🤝 Economia Solidária</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Parceiros Colaborativos</h4>
            <p className="text-sm text-gray-600">
              Cooperativas, comunidades e movimentos sociais vendem diretamente
            </p>
          </div>
          <div>
            <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Renda Integral</h4>
            <p className="text-sm text-gray-600">
              100% da renda dos produtos colaborativos vai para os produtores
            </p>
          </div>
          <div>
            <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium mb-2">Frete Solidário</h4>
            <p className="text-sm text-gray-600">
              Entrega gratuita para doações acima de R$ 100
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Quero ser Parceiro Colaborativo
          </Button>
        </div>
      </motion.div>
    </div>
  );
}