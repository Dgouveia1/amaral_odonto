import React, { useState } from 'react';
import { DollarSign, Search, FileText, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Financeiro() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Financeiro</h1>
          <p className="text-slate-500 font-light">Gestão de orçamentos, mensalidades e inadimplência.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface text-primary rounded-full shadow-sm border border-border hover:border-accent/50 transition-colors text-sm font-medium">
            <FileText size={16} /> Relatórios
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-light transition-colors text-sm">
            <Plus size={16} /> Nova Receita/Despesa
          </button>
        </div>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'overview', label: 'Visão Geral' },
          { id: 'orcamentos', label: 'Orçamentos' },
          { id: 'mensalidades', label: 'Mensalidades (Orto)' },
          { id: 'inadimplencia', label: 'Inadimplência' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-medium text-sm transition-all rounded-full whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'bg-surface text-slate-500 border border-border hover:border-accent/30 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <TrendingUp size={24} />
                      </div>
                    </div>
                    <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2">Receita Mensal</h3>
                    <p className="text-4xl font-serif text-primary">R$ 65.430</p>
                    <p className="text-xs font-medium text-emerald-600 mt-3 flex items-center gap-1">
                      +12% vs mês anterior
                    </p>
                  </div>
                  <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border hover:border-rose-200 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <TrendingDown size={24} />
                      </div>
                    </div>
                    <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2">Despesas Mensais</h3>
                    <p className="text-4xl font-serif text-primary">R$ 18.200</p>
                    <p className="text-xs font-medium text-rose-600 mt-3 flex items-center gap-1">
                      +5% vs mês anterior
                    </p>
                  </div>
                  <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border hover:border-amber-200 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                    <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2">A Receber (Inadimplência)</h3>
                    <p className="text-4xl font-serif text-primary">R$ 4.500</p>
                    <p className="text-xs font-medium text-slate-500 mt-3 flex items-center gap-1">
                      12 pacientes em atraso
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                    <h2 className="text-2xl font-serif text-primary mb-6">Orçamentos (Mês Atual)</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-5 bg-slate-50/50 rounded-2xl border border-border hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <CheckCircle size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-primary group-hover:text-emerald-700 transition-colors">Aprovados</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">18 orçamentos</p>
                          </div>
                        </div>
                        <span className="font-serif text-xl text-emerald-600">R$ 42.000</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-slate-50/50 rounded-2xl border border-border hover:border-amber-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <AlertTriangle size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-primary group-hover:text-amber-700 transition-colors">Aguardando Aprovação</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">5 orçamentos</p>
                          </div>
                        </div>
                        <span className="font-serif text-xl text-amber-600">R$ 15.300</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-slate-50/50 rounded-2xl border border-border hover:border-rose-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                            X
                          </div>
                          <div>
                            <p className="font-medium text-primary group-hover:text-rose-700 transition-colors">Reprovados</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">3 orçamentos</p>
                          </div>
                        </div>
                        <span className="font-serif text-xl text-rose-600">R$ 8.500</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                    <h2 className="text-2xl font-serif text-primary mb-8">KPIs Odontológicos</h2>
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="font-medium text-slate-600">Taxa de Conversão de Orçamentos</span>
                          <span className="font-bold text-primary text-lg">75%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div className="bg-accent h-full rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-600">Ticket Médio por Tratamento</span>
                          <span className="font-serif text-xl text-primary">R$ 2.350</span>
                        </div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Baseado nos orçamentos aprovados este mês</p>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-600">Retorno de Profilaxia (A Chamar)</span>
                          <span className="font-serif text-xl text-primary">42 pacientes</span>
                        </div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Última profilaxia &gt; 6 meses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inadimplencia' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h2 className="text-2xl font-serif text-primary">Pacientes em Atraso</h2>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar paciente..." 
                      className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50/50 border border-border rounded-full focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-border bg-slate-50/30">
                        <th className="px-6 py-4 font-bold">Paciente</th>
                        <th className="px-6 py-4 font-bold">Contato</th>
                        <th className="px-6 py-4 font-bold">Valor Vencido</th>
                        <th className="px-6 py-4 font-bold">Vencimento</th>
                        <th className="px-6 py-4 font-bold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-border">
                      <tr className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5 font-medium text-primary">Mariana Costa</td>
                        <td className="px-6 py-5 text-slate-600">(11) 99876-5432</td>
                        <td className="px-6 py-5 font-serif text-lg text-rose-600">R$ 150,00</td>
                        <td className="px-6 py-5 text-slate-600">10/02/2026 <span className="text-xs text-rose-500 font-medium ml-1">(13 dias)</span></td>
                        <td className="px-6 py-5 text-right">
                          <button className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-full hover:bg-emerald-100 transition-colors text-xs border border-emerald-200">
                            Cobrar WhatsApp
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5 font-medium text-primary">Roberto Alves</td>
                        <td className="px-6 py-5 text-slate-600">(11) 98765-1234</td>
                        <td className="px-6 py-5 font-serif text-lg text-rose-600">R$ 300,00</td>
                        <td className="px-6 py-5 text-slate-600">05/02/2026 <span className="text-xs text-rose-500 font-medium ml-1">(18 dias)</span></td>
                        <td className="px-6 py-5 text-right">
                          <button className="px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-full hover:bg-emerald-100 transition-colors text-xs border border-emerald-200">
                            Cobrar WhatsApp
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
