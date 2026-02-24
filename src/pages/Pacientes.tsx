import React, { useState } from 'react';
import { Search, Plus, Filter, Phone, FileText, DollarSign, Edit, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pacientes() {
  const [searchTerm, setSearchTerm] = useState('');

  const pacientes = [
    { id: 1, nome: 'Ana Silva', cpf: '123.456.789-00', telefone: '(11) 98765-4321', plano: 'Plano Ortodôntico Mensal', status: 'Ativo', statusColor: 'bg-emerald-100 text-emerald-700', avatar: 'AS' },
    { id: 2, nome: 'Carlos Mendes', cpf: '987.654.321-11', telefone: '(11) 91234-5678', plano: 'Particular', status: 'Ativo', statusColor: 'bg-emerald-100 text-emerald-700', avatar: 'CM' },
    { id: 3, nome: 'Mariana Costa', cpf: '456.789.123-22', telefone: '(11) 99876-5432', plano: 'Prevenção Anual', status: 'Atraso', statusColor: 'bg-rose-100 text-rose-700', avatar: 'MC' },
    { id: 4, nome: 'Roberto Alves', cpf: '321.654.987-33', telefone: '(11) 98765-1234', plano: 'Particular', status: 'Inativo', statusColor: 'bg-slate-100 text-slate-700', avatar: 'RA' },
  ];

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Pacientes</h1>
          <p className="text-slate-500 font-light">Gerenciamento de pacientes e planos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-light transition-colors text-sm">
          <Plus size={18} /> Novo Paciente
        </button>
      </header>

      <div className="bg-surface rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col flex-1">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou telefone..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-full focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border text-slate-600 rounded-full hover:bg-slate-50 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
            <Filter size={16} /> Filtros
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-border bg-slate-50/30">
                <th className="px-6 py-4 font-bold">Paciente</th>
                <th className="px-6 py-4 font-bold">CPF</th>
                <th className="px-6 py-4 font-bold">Contato</th>
                <th className="px-6 py-4 font-bold">Plano/Convênio</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border">
              {pacientes.map((p) => (
                <motion.tr 
                  key={p.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center font-serif font-bold text-sm">
                        {p.avatar}
                      </div>
                      <span className="font-medium text-primary group-hover:text-accent transition-colors">{p.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600">{p.cpf}</td>
                  <td className="px-6 py-5 text-slate-600">{p.telefone}</td>
                  <td className="px-6 py-5 text-slate-600">{p.plano}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors" title="WhatsApp">
                        <MessageCircle size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-full transition-colors" title="Prontuário">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors" title="Financeiro">
                        <DollarSign size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors ml-2">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando 4 de 128 pacientes</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border rounded-lg bg-white text-slate-400 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1 border border-border rounded-lg bg-white hover:bg-slate-50 text-primary">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
