import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, TrendingUp, AlertCircle, Clock, CloudSun, Quote, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">{greeting}, Dr. Amaral</h1>
          <p className="text-slate-500 font-light">Aqui está o resumo da sua clínica hoje.</p>
        </div>
        <div className="text-sm text-slate-500 bg-surface px-5 py-2.5 rounded-full shadow-sm border border-border flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </header>

      {/* Top Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-border flex items-center justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-accent/10 transition-transform group-hover:scale-110 group-hover:rotate-12">
            <CloudSun size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Previsão</p>
            <h3 className="text-3xl font-serif text-primary mb-1">24°C</h3>
            <p className="text-sm text-slate-500">Parcialmente nublado</p>
          </div>
        </div>

        {/* Quote Widget */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-sm md:col-span-2 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-6 top-6 text-white/10">
            <Quote size={80} />
          </div>
          <div className="relative z-10 max-w-lg">
            <p className="font-serif text-xl italic mb-3 leading-relaxed">
              "A odontologia é a profissão que exige dos que a ela se dedicam, o senso estético de um artista, a destreza manual de um cirurgião, os conhecimentos científicos de um médico e a paciência de um monge."
            </p>
            <p className="text-xs tracking-widest text-accent uppercase font-medium">— Papa Pio XII</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Consultas Hoje" 
          value="14" 
          trend="+2 vs ontem" 
          trendUp={true} 
          icon={CalendarCheck} 
        />
        <StatCard 
          title="Faturamento (Mês)" 
          value="R$ 65.430" 
          trend="+12% vs mês ant." 
          trendUp={true} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Novos Pacientes" 
          value="28" 
          trend="+5% vs mês ant." 
          trendUp={true} 
          icon={Users} 
        />
        <StatCard 
          title="Retornos Pendentes" 
          value="42" 
          trend="Profilaxia e Manutenção" 
          trendUp={false} 
          icon={AlertCircle} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agenda Hoje */}
        <div className="lg:col-span-2 bg-surface p-8 rounded-3xl shadow-sm border border-border">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-primary">Próximos Atendimentos</h2>
            <button className="text-sm font-medium text-accent hover:text-primary transition-colors flex items-center gap-1">
              Ver agenda completa <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: '09:00', patient: 'Ana Silva', proc: 'Avaliação Ortodôntica', room: 'Cadeira 1', status: 'Aguardando', statusColor: 'bg-amber-50 text-amber-700 border-amber-200' },
              { time: '09:30', patient: 'Carlos Mendes', proc: 'Restauração Resina', room: 'Cadeira 2', status: 'Em Atendimento', statusColor: 'bg-blue-50 text-blue-700 border-blue-200' },
              { time: '10:30', patient: 'Mariana Costa', proc: 'Profilaxia', room: 'Cadeira 1', status: 'Confirmado', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { time: '11:00', patient: 'Roberto Alves', proc: 'Extração', room: 'Cadeira 3', status: 'Confirmado', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-accent/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-bold text-primary">{row.time}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{row.room}</p>
                  </div>
                  <div className="w-px h-10 bg-border"></div>
                  <div>
                    <p className="font-serif text-lg text-primary group-hover:text-accent transition-colors">{row.patient}</p>
                    <p className="text-sm text-slate-500">{row.proc}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${row.statusColor}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* News & Updates */}
        <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border flex flex-col">
          <h2 className="text-2xl font-serif text-primary mb-6">Atualizações</h2>
          <div className="flex-1 space-y-6">
            <div className="group cursor-pointer">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Notícia do CRO</p>
              <h4 className="font-serif text-lg text-primary leading-snug group-hover:text-accent transition-colors mb-2">
                Novas diretrizes para harmonização orofacial publicadas.
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                O Conselho Federal de Odontologia atualizou as normas para procedimentos estéticos realizados por cirurgiões-dentistas.
              </p>
            </div>
            <div className="w-full h-px bg-border"></div>
            <div className="group cursor-pointer">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Dica de Gestão</p>
              <h4 className="font-serif text-lg text-primary leading-snug group-hover:text-accent transition-colors mb-2">
                Como aumentar a taxa de retorno para profilaxia.
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                Estratégias simples de comunicação via WhatsApp podem aumentar em até 40% o retorno de pacientes.
              </p>
            </div>
            <div className="w-full h-px bg-border"></div>
            <div className="group cursor-pointer">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Sistema</p>
              <h4 className="font-serif text-lg text-primary leading-snug group-hover:text-accent transition-colors mb-2">
                Nova funcionalidade de Odontograma Digital.
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2">
                Agora você pode registrar procedimentos diretamente no odontograma interativo durante o atendimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon }: any) {
  return (
    <div className="bg-surface p-6 rounded-3xl shadow-sm border border-border flex flex-col group hover:border-accent/50 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-2xl bg-slate-50 text-primary group-hover:bg-accent group-hover:text-white transition-colors">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${trendUp ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-3xl font-serif text-primary mb-1">{value}</p>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      </div>
    </div>
  );
}

