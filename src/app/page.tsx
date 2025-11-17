'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Dumbbell, 
  Apple, 
  TrendingDown, 
  Award, 
  Calculator,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Target,
  Brain,
  Utensils,
  Camera,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado (verifica cookie)
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        setIsLoggedIn(response.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold text-[#2A2A2A]">Emagrify</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-[#2A2A2A] hover:text-[#7BE4B7] transition-colors">
                Funcionalidades
              </a>
              <a href="#testimonials" className="text-[#2A2A2A] hover:text-[#7BE4B7] transition-colors">
                Depoimentos
              </a>
              <Link href="/receitas" className="text-[#2A2A2A] hover:text-[#7BE4B7] transition-colors">
                Receitas Grátis
              </Link>
              <a href="#news" className="text-[#2A2A2A] hover:text-[#7BE4B7] transition-colors">
                Notícias
              </a>
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-[#2A2A2A] hidden md:inline-flex"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button variant="ghost" className="text-[#2A2A2A] hidden md:inline-flex" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
              )}
              <Button 
                className="bg-gradient-to-r from-[#7BE4B7] to-[#6ECBF5] text-white hover:opacity-90 transition-opacity"
                asChild
              >
                <Link href="/checkout">Assinar Agora</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#features" className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7]">
                Funcionalidades
              </a>
              <a href="#testimonials" className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7]">
                Depoimentos
              </a>
              <Link href="/receitas" className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7]">
                Receitas Grátis
              </Link>
              <a href="#news" className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7]">
                Notícias
              </a>
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7] w-full text-left"
                >
                  Sair
                </button>
              ) : (
                <Link href="/login" className="block py-2 text-[#2A2A2A] hover:text-[#7BE4B7]">
                  Entrar
                </Link>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7BE4B7]/10 via-white to-[#6ECBF5]/10 py-12 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90">
                🔥 Promoção: De R$125 por apenas R$95/mês
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-[#2A2A2A] leading-tight">
                Transforme seu corpo e sua <span className="text-[#7BE4B7]">vida</span>
              </h1>
              
              <p className="text-lg text-gray-600">
                Plataforma completa com dietas personalizadas, treinos exclusivos, 
                acompanhamento diário e suporte científico para sua jornada de transformação.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#7BE4B7] to-[#6ECBF5] text-white hover:opacity-90 transition-opacity text-lg px-8"
                  asChild
                >
                  <Link href="/checkout">
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#7BE4B7] text-[#2A2A2A] hover:bg-[#7BE4B7]/10"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Funcionalidades
                </Button>
              </div>

              <div className="flex items-center gap-4 sm:gap-8 pt-4 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#7BE4B7]">50k+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Usuários Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#FF7A00]">15kg</div>
                  <div className="text-xs sm:text-sm text-gray-600">Média Perdida</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#6ECBF5]">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-600">Avaliação</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#7BE4B7]/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#7BE4B7] flex-shrink-0" />
                    <span className="font-medium text-[#2A2A2A] text-sm sm:text-base">Dietas Personalizadas com IA</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#6ECBF5]/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#6ECBF5] flex-shrink-0" />
                    <span className="font-medium text-[#2A2A2A] text-sm sm:text-base">Treinos Adaptados ao Seu Nível</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#FF7A00]/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A00] flex-shrink-0" />
                    <span className="font-medium text-[#2A2A2A] text-sm sm:text-base">Acompanhamento Diário</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#7BE4B7]/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#7BE4B7] flex-shrink-0" />
                    <span className="font-medium text-[#2A2A2A] text-sm sm:text-base">Base Científica Comprovada</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-[#7BE4B7]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-[#6ECBF5]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-12 sm:py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-[#7BE4B7] text-white mb-4">
              Funcionalidades Completas
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Ferramentas profissionais baseadas em ciência para sua transformação completa
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature Cards */}
            <Link href="/calculadora-carboidratos">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#2A2A2A]">Calculadora de Carboidratos</CardTitle>
                  <CardDescription>
                    Tire foto do seu prato e descubra os nutrientes instantaneamente com IA
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/quiz-perda-peso">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#7BE4B7] flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#2A2A2A]">Quiz Personalizado</CardTitle>
                  <CardDescription>
                    Responda perguntas e receba uma dieta e treino feitos especialmente para você
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/calculadora-imc">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6ECBF5] to-[#7BE4B7] flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#2A2A2A]">Calculadora de IMC</CardTitle>
                  <CardDescription>
                    Calcule seu Índice de Massa Corporal e entenda sua faixa de peso ideal
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/desafios">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7BE4B7] to-[#FF7A00] flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#2A2A2A]">Sistema de Desafios</CardTitle>
                  <CardDescription>
                    Desafios diários, semanais e mensais com recompensas e gamificação
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6ECBF5] to-[#FF7A00] flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[#2A2A2A]">Monitor de Progresso</CardTitle>
                <CardDescription>
                  Acompanhe peso, medidas, fotos e evolução com gráficos detalhados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#6ECBF5] flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[#2A2A2A]">Treinamento Mental</CardTitle>
                <CardDescription>
                  Mude sua mentalidade e supere barreiras psicológicas com técnicas comprovadas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[#2A2A2A]">Menopausa & Menstruação</CardTitle>
                <CardDescription>
                  Planos especiais para mulheres com orientações sobre hormônios e peso
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6ECBF5] to-[#7BE4B7] flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-[#2A2A2A]">Base Científica</CardTitle>
                <CardDescription>
                  Todas as recomendações baseadas em estudos científicos reconhecidos
                </CardDescription>
              </CardHeader>
            </Card>

            <Link href="/receitas">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#7BE4B7] flex items-center justify-center mb-4">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-[#2A2A2A]">Receitas Internacionais</CardTitle>
                  <CardDescription>
                    Centenas de receitas saudáveis do mundo todo com passo a passo
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="bg-[#FF7A00] text-white mb-4">
              Histórias Reais
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
              Transformações que inspiram
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como o Emagrify mudou a vida de milhares de pessoas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Maria Silva',
                age: 34,
                lost: '18kg',
                time: '4 meses',
                story: 'Depois de anos tentando, finalmente consegui! O acompanhamento diário e os desafios me mantiveram motivada.',
                rating: 5
              },
              {
                name: 'João Santos',
                age: 42,
                lost: '25kg',
                time: '6 meses',
                story: 'Perdi peso de forma saudável e ganhei massa muscular. Os treinos personalizados fizeram toda diferença!',
                rating: 5
              },
              {
                name: 'Ana Costa',
                age: 38,
                lost: '12kg',
                time: '3 meses',
                story: 'O quiz de menopausa mudou minha vida. Finalmente entendi meu corpo e consegui emagrecer.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-none shadow-lg bg-gradient-to-br from-[#F4F4F4] to-white">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-[#2A2A2A] text-base sm:text-lg">{testimonial.name}</CardTitle>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.age} anos</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF7A00] text-[#FF7A00]" />
                    ))}
                  </div>

                  <div className="flex gap-4 mb-4">
                    <Badge className="bg-[#7BE4B7] text-white text-xs sm:text-sm">
                      -{testimonial.lost}
                    </Badge>
                    <Badge className="bg-[#6ECBF5] text-white text-xs sm:text-sm">
                      {testimonial.time}
                    </Badge>
                  </div>

                  <CardDescription className="text-sm sm:text-base text-gray-700">
                    "{testimonial.story}"
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-[#7BE4B7] text-[#2A2A2A] hover:bg-[#7BE4B7]/10"
            >
              Ver Todos os Depoimentos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] text-white">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Comece sua transformação hoje
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Junte-se a mais de 50.000 pessoas que já transformaram suas vidas com o Emagrify
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto mb-8">
            <div className="text-5xl sm:text-6xl font-bold mb-2">R$ 95</div>
            <div className="text-lg sm:text-xl mb-2">
              <span className="line-through opacity-70">R$ 125</span>
              <Badge className="ml-2 bg-[#FF7A00] text-white">24% OFF</Badge>
            </div>
            <div className="text-base sm:text-lg opacity-90">por 30 dias</div>
          </div>

          <Button 
            size="lg"
            className="bg-white text-[#7BE4B7] hover:bg-gray-100 text-base sm:text-lg px-8 sm:px-12"
            asChild
          >
            <Link href="/checkout">
              Assinar Agora
              <Zap className="ml-2 w-5 h-5" />
            </Link>
          </Button>

          <p className="mt-6 text-xs sm:text-sm opacity-80">
            Cancele quando quiser • Acesso imediato • Suporte 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2A2A2A] text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">Emagrify</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Transformando vidas através da saúde e bem-estar
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Funcionalidades</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/quiz-perda-peso">Dietas Personalizadas</Link></li>
                <li><Link href="/desafios">Sistema de Desafios</Link></li>
                <li><Link href="/calculadora-imc">Calculadoras</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Recursos</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/receitas">Receitas Grátis</Link></li>
                <li><Link href="/calculadora-carboidratos">Calculadoras</Link></li>
                <li>Artigos Científicos</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-sm sm:text-base">Suporte</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Termos de Uso</li>
                <li><Link href="/admin">Admin</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>© 2024 Emagrify. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
