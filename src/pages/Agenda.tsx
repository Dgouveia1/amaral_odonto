import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, User, MoreHorizontal } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const cadeiras = ['Cadeira 1', 'Cadeira 2', 'Cadeira 3 (HOF)', 'Cadeira 4 (Orto)'];
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 to 18:00

  const appointments = [
    { id: 1, patient: 'Ana Silva', proc: 'Avaliação Ortodôntica', time: '09:00', duration: 30, cadeira: 'Cadeira 4 (Orto)', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { id: 2, patient: 'Carlos Mendes', proc: 'Restauração Resina', time: '10:00', duration: 60, cadeira: 'Cadeira 1', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { id: 3, patient: 'Mariana Costa', proc: 'Profilaxia', time: '14:30', duration: 45, cadeira: 'Cadeira 2', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { id: 4, patient: 'Roberto Alves', proc: 'Aplicação Toxina', time: '16:00', duration: 30, cadeira: 'Cadeira 3 (HOF)', color: 'bg-amber-50 border-amber-200 text-amber-800' },
  ];

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Agenda Odontológica</h1>
          <div className="flex items-center gap-4 mt-2">
            <button onClick={() => setCurrentDate(subDays(currentDate, 1))} className="p-2 rounded-full hover:bg-surface border border-border text-slate-500 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-medium text-primary capitalize min-w-[200px] text-center">
              {format(currentDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </h2>
            <button onClick={() => setCurrentDate(addDays(currentDate, 1))} className="p-2 rounded-full hover:bg-surface border border-border text-slate-500 transition-colors">
              <ChevronRight size={18} />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="text-xs font-bold tracking-widest uppercase text-accent hover:text-primary transition-colors ml-2">
              Hoje
            </button>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-light transition-colors text-sm">
          <Plus size={18} /> Novo Agendamento
        </button>
      </header>

      <div className="flex-1 bg-surface rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col">
        <div className="flex border-b border-border bg-slate-50/50">
          <div className="w-24 shrink-0 border-r border-border flex items-center justify-center">
            <Clock size={16} className="text-slate-400" />
          </div>
          {cadeiras.map(cadeira => (
            <div key={cadeira} className="flex-1 py-4 text-center border-r border-border last:border-0">
              <span className="font-serif text-lg text-primary">{cadeira.split(' ')[0]} {cadeira.split(' ')[1]}</span>
              {cadeira.includes('(') && (
                <span className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
                  {cadeira.split('(')[1].replace(')', '')}
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto relative scrollbar-hide">
          <div className="absolute inset-0 flex">
            <div className="w-24 shrink-0 border-r border-border bg-slate-50/30">
              {hours.map(hour => (
                <div key={hour} className="h-28 border-b border-border relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider text-slate-400 bg-surface px-2 rounded-full border border-border">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex relative">
              {cadeiras.map((cadeira, colIndex) => (
                <div key={cadeira} className="flex-1 border-r border-border last:border-0 relative">
                  {hours.map(hour => (
                    <div key={hour} className="h-28 border-b border-border/50 relative group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-accent/5 transition-opacity cursor-pointer flex items-center justify-center">
                        <Plus size={24} className="text-accent" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Render Appointments */}
                  {appointments.filter(a => a.cadeira === cadeira).map(appt => {
                    const [h, m] = appt.time.split(':').map(Number);
                    const top = ((h - 8) * 112) + ((m / 60) * 112);
                    const height = (appt.duration / 60) * 112;
                    
                    return (
                      <div 
                        key={appt.id}
                        className={`absolute left-2 right-2 rounded-2xl border p-3 shadow-sm cursor-pointer hover:shadow-md transition-all z-10 group ${appt.color}`}
                        style={{ top: `${top + 2}px`, height: `${height - 4}px` }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-serif text-sm font-bold truncate">{appt.patient}</div>
                          <MoreHorizontal size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs truncate opacity-80 mt-1">{appt.proc}</div>
                        <div className="text-[10px] font-bold tracking-wider uppercase mt-2 flex items-center gap-1 opacity-70">
                          <Clock size={10} /> {appt.time} ({appt.duration}m)
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
