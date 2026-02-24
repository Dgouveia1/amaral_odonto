import React, { useState } from 'react';
import { Package, Plus, Search, AlertTriangle, ArrowDown, ArrowUp, Filter, Edit, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Estoque() {
  const [searchTerm, setSearchTerm] = useState('');

  const materiais = [
    { id: 1, nome: 'Resina Composta A2', categoria: 'Restaurador', qtd: 15, min: 5, unidade: 'Seringa', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 2, nome: 'Anestésico Lidocaína', categoria: 'Anestesia', qtd: 2, min: 10, unidade: 'Caixa', status: 'Baixo', statusColor: 'bg-rose-100 text-rose-700' },
    { id: 3, nome: 'Luva Procedimento P', categoria: 'EPI', qtd: 8, min: 10, unidade: 'Caixa', status: 'Atenção', statusColor: 'bg-amber-100 text-amber-700' },
    { id: 4, nome: 'Ácido Fosfórico 37%', categoria: 'Restaurador', qtd: 12, min: 3, unidade: 'Seringa', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 5, nome: 'Fio de Sutura Nylon 5-0', categoria: 'Cirurgia', qtd: 20, min: 5, unidade: 'Envelope', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Estoque Odontológico</h1>
          <p className="text-slate-500 font-light">Controle de materiais e insumos da clínica.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface text-primary rounded-full shadow-sm border border-border hover:border-rose-200 hover:text-rose-600 transition-colors text-sm font-medium">
            <ArrowDown size={16} /> Saída Manual
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-light transition-colors text-sm">
            <ArrowUp size={16} /> Entrada de Material
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-3xl shadow-sm border border-border flex items-center gap-6 hover:border-accent/30 transition-colors">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Total de Itens</h3>
            <p className="text-3xl font-serif text-primary">142</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-3xl shadow-sm border border-border flex items-center gap-6 hover:border-amber-300 transition-colors">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Em Atenção</h3>
            <p className="text-3xl font-serif text-primary">12</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-3xl shadow-sm border border-border flex items-center gap-6 hover:border-rose-300 transition-colors">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Baixo/Zerado</h3>
            <p className="text-3xl font-serif text-primary">5</p>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col flex-1">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar material..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-full focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border text-slate-600 rounded-full hover:bg-slate-50 transition-colors text-sm font-medium justify-center flex-1 sm:flex-none">
              <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-accent/10 text-accent font-medium rounded-full hover:bg-accent/20 transition-colors text-sm justify-center flex-1 sm:flex-none">
              <Plus size={16} /> Cadastrar
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-border bg-slate-50/30">
                <th className="px-6 py-4 font-bold">Material</th>
                <th className="px-6 py-4 font-bold">Categoria</th>
                <th className="px-6 py-4 font-bold">Quantidade</th>
                <th className="px-6 py-4 font-bold">Estoque Mín.</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {materiais.map((m) => (
                <motion.tr 
                  key={m.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5 font-medium text-primary group-hover:text-accent transition-colors">{m.nome}</td>
                  <td className="px-6 py-5 text-slate-600">{m.categoria}</td>
                  <td className="px-6 py-5 font-serif text-lg text-primary">{m.qtd} <span className="text-xs font-sans text-slate-400 uppercase tracking-wider ml-1">{m.unidade}</span></td>
                  <td className="px-6 py-5 text-slate-600">{m.min}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${m.statusColor}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando 5 de 142 itens</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded-lg bg-white text-slate-400 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1 border border-border rounded-lg bg-white hover:bg-slate-50 text-primary">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
