'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Search, Clock, ChefHat, Globe } from 'lucide-react';
import Link from 'next/link';

const recipes = [
  {
    id: 1,
    name: 'Salada Mediterrânea',
    country: 'Grécia',
    category: 'Almoço',
    calories: 320,
    protein: 12,
    carbs: 28,
    fats: 18,
    prepTime: 15,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    ingredients: [
      '2 tomates grandes',
      '1 pepino',
      '1 cebola roxa',
      '100g queijo feta',
      'Azeitonas pretas',
      'Azeite extra virgem',
      'Orégano',
    ],
  },
  {
    id: 2,
    name: 'Frango Teriyaki',
    country: 'Japão',
    category: 'Jantar',
    calories: 380,
    protein: 35,
    carbs: 25,
    fats: 12,
    prepTime: 30,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    ingredients: [
      '400g peito de frango',
      '3 colheres molho teriyaki',
      '1 colher gengibre ralado',
      '2 dentes alho',
      'Gergelim',
      'Cebolinha',
    ],
  },
  {
    id: 3,
    name: 'Bowl de Açaí Proteico',
    country: 'Brasil',
    category: 'Café da Manhã',
    calories: 420,
    protein: 25,
    carbs: 52,
    fats: 15,
    prepTime: 10,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    ingredients: [
      '200g polpa de açaí',
      '1 banana',
      '30g whey protein',
      'Granola',
      'Frutas variadas',
      'Mel',
    ],
  },
  {
    id: 4,
    name: 'Curry de Grão de Bico',
    country: 'Índia',
    category: 'Almoço',
    calories: 350,
    protein: 18,
    carbs: 45,
    fats: 10,
    prepTime: 40,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    ingredients: [
      '400g grão de bico cozido',
      '2 tomates',
      '1 cebola',
      'Leite de coco',
      'Curry em pó',
      'Coentro',
      'Gengibre',
    ],
  },
  {
    id: 5,
    name: 'Salmão com Aspargos',
    country: 'Noruega',
    category: 'Jantar',
    calories: 420,
    protein: 38,
    carbs: 12,
    fats: 24,
    prepTime: 25,
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    ingredients: [
      '200g filé de salmão',
      '200g aspargos',
      'Limão',
      'Alho',
      'Azeite',
      'Ervas finas',
    ],
  },
  {
    id: 6,
    name: 'Tacos de Peixe',
    country: 'México',
    category: 'Jantar',
    calories: 380,
    protein: 28,
    carbs: 35,
    fats: 14,
    prepTime: 20,
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    ingredients: [
      '300g peixe branco',
      'Tortilhas integrais',
      'Repolho roxo',
      'Abacate',
      'Limão',
      'Coentro',
      'Molho picante',
    ],
  },
];

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-white border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#2A2A2A]">Emagrify</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">Voltar</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-[#7BE4B7] text-white mb-4">
              🌍 Receitas Gratuitas
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
              Receitas Saudáveis do Mundo
            </h1>
            <p className="text-lg text-gray-600">
              Centenas de receitas nutritivas e deliciosas de diversos países
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="border-none shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar receitas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-4 w-full md:w-auto">
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="Café da Manhã">Café</TabsTrigger>
                    <TabsTrigger value="Almoço">Almoço</TabsTrigger>
                    <TabsTrigger value="Jantar">Jantar</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Recipes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-[#2A2A2A]">
                      <Globe className="w-3 h-3 mr-1" />
                      {recipe.country}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      className={
                        recipe.difficulty === 'easy'
                          ? 'bg-[#7BE4B7] text-white'
                          : 'bg-[#FF7A00] text-white'
                      }
                    >
                      {recipe.difficulty === 'easy' ? 'Fácil' : 'Médio'}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-[#2A2A2A]">{recipe.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      {recipe.category}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#7BE4B7]/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-[#7BE4B7]">{recipe.calories}</div>
                      <div className="text-xs text-gray-600">kcal</div>
                    </div>
                    <div className="bg-[#FF7A00]/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-[#FF7A00]">{recipe.protein}g</div>
                      <div className="text-xs text-gray-600">prot</div>
                    </div>
                    <div className="bg-[#6ECBF5]/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-[#6ECBF5]">{recipe.carbs}g</div>
                      <div className="text-xs text-gray-600">carbs</div>
                    </div>
                    <div className="bg-[#7BE4B7]/10 rounded-lg p-2">
                      <div className="text-lg font-bold text-[#7BE4B7]">{recipe.fats}g</div>
                      <div className="text-xs text-gray-600">gord</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#2A2A2A] mb-2">Ingredientes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <li key={idx}>• {ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <li className="text-[#7BE4B7] font-medium">
                          + {recipe.ingredients.length - 4} mais...
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#7BE4B7] to-[#6ECBF5] text-white">
                    Ver Receita Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Nenhuma receita encontrada</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
