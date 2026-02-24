import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Face = 'V' | 'L' | 'P' | 'M' | 'D' | 'O' | 'I';
type Status = 'Hígido' | 'Cariado' | 'Restaurado' | 'Extraído' | 'Ausente' | 'Canal Tratado' | 'Prótese';

interface ToothState {
  faces: Partial<Record<Face, Status>>;
  whole: Status | null;
}

const statusColors: Record<Status, string> = {
  'Hígido': '#f8fafc', // slate-50
  'Cariado': '#ef4444', // red-500
  'Restaurado': '#3b82f6', // blue-500
  'Extraído': '#1a1a1a', // primary
  'Ausente': '#94a3b8', // slate-400
  'Canal Tratado': '#8b5cf6', // violet-500
  'Prótese': '#d4af37', // accent
};

const Tooth: React.FC<{ 
  number: number, 
  state: ToothState, 
  onClick: (face: Face | 'WHOLE') => void,
  isUpper: boolean
}> = ({ 
  number, 
  state, 
  onClick, 
  isUpper 
}) => {
  const topFace: Face = isUpper ? 'V' : 'L';
  const bottomFace: Face = isUpper ? 'P' : 'V';
  
  const isRightSide = number >= 11 && number <= 18 || number >= 41 && number <= 48 || number >= 51 && number <= 55 || number >= 81 && number <= 85;
  const leftFace: Face = isRightSide ? 'D' : 'M';
  const rightFace: Face = isRightSide ? 'M' : 'D';
  
  const isAnterior = [1,2,3].includes(number % 10);
  const centerFace: Face = isAnterior ? 'I' : 'O';

  const getColor = (face: Face) => {
    if (state.whole && state.whole !== 'Hígido') {
      return statusColors[state.whole] || statusColors['Hígido'];
    }
    const status = state.faces[face];
    return status ? statusColors[status] : statusColors['Hígido'];
  };

  const isExtracted = state.whole === 'Extraído' || state.whole === 'Ausente';

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-bold tracking-widest text-slate-400">{number}</span>
      <div className="relative w-12 h-12 cursor-pointer group" onClick={() => onClick('WHOLE')}>
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-105">
          {/* Top */}
          <polygon 
            points="0,0 40,0 30,10 10,10" 
            fill={getColor(topFace)} 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="1"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onClick(topFace); }}
          />
          {/* Bottom */}
          <polygon 
            points="0,40 40,40 30,30 10,30" 
            fill={getColor(bottomFace)} 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="1"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onClick(bottomFace); }}
          />
          {/* Left */}
          <polygon 
            points="0,0 10,10 10,30 0,40" 
            fill={getColor(leftFace)} 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="1"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onClick(leftFace); }}
          />
          {/* Right */}
          <polygon 
            points="40,0 30,10 30,30 40,40" 
            fill={getColor(rightFace)} 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="1"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onClick(rightFace); }}
          />
          {/* Center */}
          <rect 
            x="10" y="10" width="20" height="20" 
            fill={getColor(centerFace)} 
            stroke="rgba(26,26,26,0.1)" 
            strokeWidth="1"
            className="hover:opacity-80 transition-opacity"
            onClick={(e) => { e.stopPropagation(); onClick(centerFace); }}
          />
          
          {isExtracted && (
            <g pointerEvents="none">
              <line x1="0" y1="0" x2="40" y2="40" stroke="rgba(26,26,26,0.8)" strokeWidth="2" />
              <line x1="40" y1="0" x2="0" y2="40" stroke="rgba(26,26,26,0.8)" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default function Odontograma({ 
  data, 
  onChange 
}: { 
  data: Record<number, ToothState>, 
  onChange: (tooth: number, face: Face | 'WHOLE', status: Status) => void 
}) {
  const [selectedStatus, setSelectedStatus] = useState<Status>('Cariado');

  const handleToothClick = (number: number, face: Face | 'WHOLE') => {
    onChange(number, face, selectedStatus);
  };

  const renderRow = (teeth: number[], isUpper: boolean) => (
    <div className="flex gap-3 justify-center mb-8">
      {teeth.map(num => (
        <Tooth 
          key={num} 
          number={num} 
          state={data[num] || { faces: {}, whole: null }} 
          onClick={(face) => handleToothClick(num, face)}
          isUpper={isUpper}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <h2 className="text-2xl font-serif text-primary">Odontograma Digital</h2>
        <div className="flex gap-2 flex-wrap bg-slate-50/50 p-2 rounded-2xl border border-border">
          {(Object.keys(statusColors) as Status[]).map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all ${
                selectedStatus === status 
                  ? 'bg-white shadow-sm text-primary ring-1 ring-border' 
                  : 'text-slate-500 hover:text-primary hover:bg-white/50'
              }`}
            >
              <div className="w-3 h-3 rounded-full border border-border/50 shadow-inner" style={{ backgroundColor: statusColors[status] }} />
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="min-w-[900px] px-4">
          {/* Permanentes Superiores */}
          {renderRow([18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28], true)}
          {/* Decíduos Superiores */}
          {renderRow([55,54,53,52,51, 61,62,63,64,65], true)}
          
          <div className="h-px w-full bg-border my-12 relative flex items-center justify-center">
            <div className="bg-surface px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              Linha Média
            </div>
          </div>

          {/* Decíduos Inferiores */}
          {renderRow([85,84,83,82,81, 71,72,73,74,75], false)}
          {/* Permanentes Inferiores */}
          {renderRow([48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38], false)}
        </div>
      </div>
    </div>
  );
}
