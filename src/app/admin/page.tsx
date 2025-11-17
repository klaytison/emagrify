'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Mail,
  CheckCircle2,
  XCircle,
  Gift,
  Ban,
  RefreshCw,
  Trash2,
  Edit,
} from 'lucide-react';
import Link from 'next/link';

interface Subscription {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  amount: number;
}

export default function AdminPage() {
  const [searchEmail, setSearchEmail] = useState('');
  const [giftEmail, setGiftEmail] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showManageDialog, setShowManageDialog] = useState(false);

  const stats = {
    totalRevenue: 47500,
    monthRevenue: 12350,
    activeSubscriptions: 487,
    newThisMonth: 52,
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      email: 'maria@email.com',
      name: 'Maria Silva',
      status: 'active',
      startDate: '15/01/2024',
      amount: 95,
    },
    {
      id: '2',
      email: 'joao@email.com',
      name: 'João Santos',
      status: 'active',
      startDate: '14/01/2024',
      amount: 95,
    },
    {
      id: '3',
      email: 'ana@email.com',
      name: 'Ana Costa',
      status: 'expired',
      startDate: '10/12/2023',
      amount: 95,
    },
  ]);

  const handleGiftSubscription = () => {
    alert(`Assinatura concedida para: ${giftEmail}`);
    setGiftEmail('');
  };

  const handleManageClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowManageDialog(true);
  };

  const handleCancelSubscription = () => {
    if (selectedSubscription) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === selectedSubscription.id 
          ? { ...sub, status: 'cancelled' as const }
          : sub
      ));
      alert(`Assinatura de ${selectedSubscription.name} cancelada com sucesso!`);
      setShowManageDialog(false);
    }
  };

  const handleRenewSubscription = () => {
    if (selectedSubscription) {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === selectedSubscription.id 
          ? { ...sub, status: 'active' as const }
          : sub
      ));
      alert(`Assinatura de ${selectedSubscription.name} renovada com sucesso!`);
      setShowManageDialog(false);
    }
  };

  const handleDeleteSubscription = () => {
    if (selectedSubscription && confirm(`Tem certeza que deseja DELETAR permanentemente a assinatura de ${selectedSubscription.name}? Esta ação não pode ser desfeita.`)) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== selectedSubscription.id));
      alert(`Assinatura de ${selectedSubscription.name} deletada permanentemente!`);
      setShowManageDialog(false);
    }
  };

  const handleSendEmail = () => {
    if (selectedSubscription) {
      alert(`E-mail enviado para ${selectedSubscription.email}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-white border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#2A2A2A]">Emagrify Admin</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">Voltar ao Site</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#2A2A2A] mb-2">
              Painel Administrativo
            </h1>
            <p className="text-lg text-gray-600">
              Gerencie assinaturas e acompanhe o desempenho
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Receita Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#7BE4B7]">
                  R$ {stats.totalRevenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-gray-600 mt-1">Desde o início</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Receita do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#FF7A00]">
                  R$ {stats.monthRevenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-sm text-gray-600 mt-1">Janeiro 2024</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Assinaturas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#6ECBF5]">
                  {stats.activeSubscriptions}
                </div>
                <p className="text-sm text-gray-600 mt-1">Usuários ativos</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Novos Este Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#7BE4B7]">
                  +{stats.newThisMonth}
                </div>
                <p className="text-sm text-gray-600 mt-1">Crescimento</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="subscriptions" className="space-y-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
              <TabsTrigger value="gift">Conceder Acesso</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions" className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2A2A2A]">Gerenciar Assinaturas</CardTitle>
                  <CardDescription>
                    Busque e gerencie assinaturas de usuários
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Buscar por e-mail..."
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button className="bg-[#7BE4B7] text-white">
                      Buscar
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center text-white font-bold text-lg">
                            {sub.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-[#2A2A2A]">{sub.name}</div>
                            <div className="text-sm text-gray-600">{sub.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Início</div>
                            <div className="font-medium text-[#2A2A2A]">
                              {sub.startDate}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-600">Valor</div>
                            <div className="font-medium text-[#2A2A2A]">R$ {sub.amount}</div>
                          </div>

                          {sub.status === 'active' ? (
                            <Badge className="bg-[#7BE4B7] text-white flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Ativa
                            </Badge>
                          ) : sub.status === 'cancelled' ? (
                            <Badge className="bg-red-500 text-white flex items-center gap-1">
                              <Ban className="w-3 h-3" />
                              Cancelada
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-400 text-white flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Expirada
                            </Badge>
                          )}

                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleManageClick(sub)}
                          >
                            Gerenciar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gift Tab */}
            <TabsContent value="gift" className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2A2A2A] flex items-center gap-2">
                    <Gift className="w-6 h-6 text-[#FF7A00]" />
                    Conceder Assinatura Gratuita
                  </CardTitle>
                  <CardDescription>
                    Dê acesso premium para usuários específicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gift-email">E-mail do Usuário</Label>
                      <Input
                        id="gift-email"
                        type="email"
                        placeholder="usuario@email.com"
                        value={giftEmail}
                        onChange={(e) => setGiftEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração</Label>
                      <select
                        id="duration"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="30">30 dias</option>
                        <option value="60">60 dias</option>
                        <option value="90">90 dias</option>
                        <option value="365">1 ano</option>
                      </select>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-[#FF7A00] to-[#7BE4B7] text-white"
                      onClick={handleGiftSubscription}
                      disabled={!giftEmail}
                    >
                      <Gift className="mr-2 w-5 h-5" />
                      Conceder Assinatura
                    </Button>
                  </div>

                  <div className="bg-[#FF7A00]/10 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Importante:</strong> O usuário receberá um e-mail automático 
                      informando sobre o acesso concedido. A assinatura será ativada imediatamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2A2A2A]">Análises e Métricas</CardTitle>
                  <CardDescription>
                    Acompanhe o desempenho da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-[#7BE4B7]/10 to-[#6ECBF5]/10 rounded-xl">
                        <div className="text-sm text-gray-600 mb-2">Taxa de Conversão</div>
                        <div className="text-4xl font-bold text-[#7BE4B7]">12.5%</div>
                        <div className="text-sm text-gray-600 mt-2">
                          De visitantes para assinantes
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-[#FF7A00]/10 to-[#7BE4B7]/10 rounded-xl">
                        <div className="text-sm text-gray-600 mb-2">Taxa de Retenção</div>
                        <div className="text-4xl font-bold text-[#FF7A00]">87%</div>
                        <div className="text-sm text-gray-600 mt-2">
                          Usuários que renovam mensalmente
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-[#6ECBF5]/10 to-[#7BE4B7]/10 rounded-xl">
                        <div className="text-sm text-gray-600 mb-2">Ticket Médio</div>
                        <div className="text-4xl font-bold text-[#6ECBF5]">R$ 95</div>
                        <div className="text-sm text-gray-600 mt-2">
                          Valor médio por assinatura
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-[#7BE4B7]/10 to-[#FF7A00]/10 rounded-xl">
                        <div className="text-sm text-gray-600 mb-2">Churn Rate</div>
                        <div className="text-4xl font-bold text-[#7BE4B7]">13%</div>
                        <div className="text-sm text-gray-600 mt-2">
                          Taxa de cancelamento mensal
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Manage Subscription Dialog */}
      <Dialog open={showManageDialog} onOpenChange={setShowManageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#2A2A2A]">
              Gerenciar Assinatura
            </DialogTitle>
            <DialogDescription>
              {selectedSubscription && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7BE4B7] to-[#6ECBF5] flex items-center justify-center text-white font-bold text-lg">
                      {selectedSubscription.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2A2A2A]">{selectedSubscription.name}</div>
                      <div className="text-sm text-gray-600">{selectedSubscription.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-xs text-gray-600">Status</div>
                      <div className="font-medium text-[#2A2A2A] capitalize">{selectedSubscription.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Início</div>
                      <div className="font-medium text-[#2A2A2A]">{selectedSubscription.startDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Valor</div>
                      <div className="font-medium text-[#2A2A2A]">R$ {selectedSubscription.amount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">ID</div>
                      <div className="font-medium text-[#2A2A2A]">#{selectedSubscription.id}</div>
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <Button 
              className="w-full justify-start bg-[#7BE4B7] text-white hover:bg-[#7BE4B7]/90"
              onClick={handleRenewSubscription}
            >
              <RefreshCw className="mr-2 w-4 h-4" />
              Renovar Assinatura
            </Button>

            <Button 
              className="w-full justify-start bg-[#6ECBF5] text-white hover:bg-[#6ECBF5]/90"
              onClick={handleSendEmail}
            >
              <Mail className="mr-2 w-4 h-4" />
              Enviar E-mail
            </Button>

            <Button 
              variant="outline"
              className="w-full justify-start border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00]/10"
              onClick={handleCancelSubscription}
            >
              <Ban className="mr-2 w-4 h-4" />
              Cancelar Assinatura
            </Button>

            <Button 
              variant="outline"
              className="w-full justify-start border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleDeleteSubscription}
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Deletar Permanentemente
            </Button>
          </div>

          <DialogFooter>
            <Button 
              variant="ghost" 
              onClick={() => setShowManageDialog(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
