import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Phone, Mail, Tag, Clock, ChevronRight, Search, Filter, MoreHorizontal } from 'lucide-react';

const stages = [
  { id: 'novo', label: 'Novo Lead', color: 'bg-blue-500', light: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'contato', label: 'Em Contato', color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'agendado', label: 'Agendado', color: 'bg-violet-500', light: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'convertido', label: 'Convertido', color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
];

const initialLeads = [
  { id: 1, name: 'Ana Paula Mendes', phone: '(11) 99812-3344', source: 'Instagram', stage: 'novo', lastContact: 'Hoje, 09:30', procedure: 'Implante', avatar: 'AP' },
  { id: 2, name: 'Carlos Eduardo Silva', phone: '(11) 97654-2211', source: 'Google', stage: 'contato', lastContact: 'Ontem, 14:00', procedure: 'Clareamento', avatar: 'CE' },
  { id: 3, name: 'Fernanda Costa', phone: '(11) 98765-0099', source: 'Indicação', stage: 'contato', lastContact: 'Hoje, 11:00', procedure: 'Ortodontia', avatar: 'FC' },
  { id: 4, name: 'Roberto Lima', phone: '(11) 91234-5678', source: 'Facebook', stage: 'agendado', lastContact: 'Ontem, 16:20', procedure: 'Implante', avatar: 'RL' },
  { id: 5, name: 'Juliana Rocha', phone: '(11) 94567-8901', source: 'Instagram', stage: 'agendado', lastContact: '2 dias atrás', procedure: 'Lentes', avatar: 'JR' },
  { id: 6, name: 'Marcos Pereira', phone: '(11) 93456-7890', source: 'Google', stage: 'convertido', lastContact: '3 dias atrás', procedure: 'Ortodontia', avatar: 'MP' },
  { id: 7, name: 'Beatriz Santos', phone: '(11) 92345-6789', source: 'Indicação', stage: 'convertido', lastContact: '1 semana atrás', procedure: 'Implante', avatar: 'BS' },
];

const sourceColors: Record<string, string> = {
  Instagram: 'bg-pink-100 text-pink-700',
  Google: 'bg-blue-100 text-blue-700',
  Facebook: 'bg-indigo-100 text-indigo-700',
  Indicação: 'bg-teal-100 text-teal-700',
};

const avatarColors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-teal-500'];

export default function Crm() {
  const [leads] = useState(initialLeads);
  const [search, setSearch] = useState('');

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.procedure.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary tracking-wide">CRM de Leads</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie e acompanhe seus potenciais pacientes</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm">
          <UserPlus size={16} />
          Novo Lead
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((s, i) => {
          const count = leads.filter(l => l.stage === s.id).length;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-surface rounded-2xl p-5 border border-border"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${s.color} mb-3`} />
              <p className="text-2xl font-semibold text-primary">{count}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome ou procedimento..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-sm text-slate-600 hover:bg-slate-50 transition">
          <Filter size={16} />
          Filtrar
        </button>
      </div>

      {/* Kanban Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {stages.map((stage, si) => {
          const stageLeads = filtered.filter(l => l.stage === stage.id);
          return (
            <div key={stage.id} className="bg-surface rounded-2xl border border-border overflow-hidden">
              {/* Column Header */}
              <div className={`px-4 py-3 border-b border-border flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <span className="text-sm font-medium text-slate-700">{stage.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 min-h-[200px]">
                {stageLeads.map((lead, i) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: si * 0.05 + i * 0.05 }}
                    className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${avatarColors[lead.id % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                          {lead.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 leading-tight">{lead.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{lead.procedure}</p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Phone size={11} />
                        <span className="text-xs">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={11} />
                        <span className="text-xs">{lead.lastContact}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${sourceColors[lead.source] || 'bg-slate-100 text-slate-600'}`}>
                        {lead.source}
                      </span>
                      <button className="text-xs text-primary flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                        Ver <ChevronRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-slate-300 text-xs">
                    Nenhum lead
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
