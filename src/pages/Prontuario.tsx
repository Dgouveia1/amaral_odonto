import React, { useState } from 'react';
import Odontograma from '../components/Odontograma';
import { FileText, Image as ImageIcon, Syringe, Save, Plus, Clock, Package, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Prontuario() {
  const [activeTab, setActiveTab] = useState('odontograma');
  const [odontogramaData, setOdontogramaData] = useState<any>({});
  const [materiaisUsados, setMateriaisUsados] = useState<{ id: number, nome: string, qtd: number }[]>([]);
  const [showMaterialSelect, setShowMaterialSelect] = useState(false);

  const handleToothChange = (number: number, face: any, status: any) => {
    setOdontogramaData((prev: any) => {
      const tooth = prev[number] || { faces: {}, whole: null };
      if (face === 'WHOLE') {
        return { ...prev, [number]: { ...tooth, whole: status } };
      }
      return { ...prev, [number]: { ...tooth, faces: { ...tooth.faces, [face]: status } } };
    });
  };

  const addMaterial = (nome: string) => {
    setMateriaisUsados(prev => {
      const existing = prev.find(m => m.nome === nome);
      if (existing) {
        return prev.map(m => m.nome === nome ? { ...m, qtd: m.qtd + 1 } : m);
      }
      return [...prev, { id: Date.now(), nome, qtd: 1 }];
    });
    setShowMaterialSelect(false);
  };

  const removeMaterial = (id: number) => {
    setMateriaisUsados(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Atendimento Clínico</h1>
          <p className="text-slate-500 font-light flex items-center gap-2">
            Paciente: <span className="font-semibold text-primary">Ana Silva</span> 
            <span className="w-1 h-1 rounded-full bg-slate-300"></span> 28 anos
            <span className="w-1 h-1 rounded-full bg-slate-300"></span> Convênio SulAmérica
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface text-primary rounded-full shadow-sm border border-border hover:border-accent/50 transition-colors text-sm font-medium">
            <Clock size={16} /> Histórico
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-light transition-colors text-sm">
            <Save size={16} /> Finalizar Sessão
          </button>
        </div>
      </header>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'odontograma', label: 'Odontograma & Procedimentos', icon: FileText },
          { id: 'materiais', label: 'Materiais Utilizados', icon: Package },
          { id: 'anamnese', label: 'Anamnese', icon: FileText },
          { id: 'evolucao', label: 'Evolução', icon: Clock },
          { id: 'protese', label: 'Lab. Prótese', icon: Syringe },
          { id: 'imagem', label: 'Imagens', icon: ImageIcon },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all rounded-full whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'bg-surface text-slate-500 border border-border hover:border-accent/30 hover:text-primary'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
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
            {activeTab === 'odontograma' && (
              <div className="space-y-8">
                <Odontograma data={odontogramaData} onChange={handleToothChange} />
                
                <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-primary">Procedimentos Realizados (Hoje)</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full hover:bg-accent/20 transition-colors">
                      <Plus size={16} /> Adicionar Procedimento
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                          16
                        </div>
                        <div>
                          <p className="font-medium text-primary">Restauração em Resina Composta</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Face Oclusal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-lg text-primary">R$ 250,00</span>
                        <button className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materiais' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border min-h-[400px]">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-serif text-primary mb-1">Materiais Utilizados</h2>
                    <p className="text-sm text-slate-500">Registre os insumos gastos nesta sessão para baixa no estoque.</p>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowMaterialSelect(!showMaterialSelect)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
                    >
                      <Plus size={16} /> Adicionar Material <ChevronDown size={14} className={`transition-transform ${showMaterialSelect ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showMaterialSelect && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-2xl shadow-xl z-10 overflow-hidden">
                        <div className="p-2 max-h-60 overflow-y-auto">
                          {['Resina Composta A2', 'Ácido Fosfórico 37%', 'Adesivo Universal', 'Anestésico Lidocaína', 'Agulha Gengival Curta', 'Sugador Descartável'].map(mat => (
                            <button 
                              key={mat}
                              onClick={() => addMaterial(mat)}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                            >
                              {mat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {materiaisUsados.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Package size={48} strokeWidth={1} className="mb-4 opacity-50" />
                    <p>Nenhum material registrado nesta sessão.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {materiaisUsados.map(mat => (
                      <div key={mat.id} className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-accent/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                            <Package size={18} />
                          </div>
                          <p className="font-medium text-primary">{mat.nome}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1 rounded-full border border-border">
                            <button 
                              onClick={() => setMateriaisUsados(prev => prev.map(m => m.id === mat.id && m.qtd > 1 ? { ...m, qtd: m.qtd - 1 } : m))}
                              className="text-slate-400 hover:text-primary"
                            >-</button>
                            <span className="text-sm font-bold w-4 text-center">{mat.qtd}</span>
                            <button 
                              onClick={() => setMateriaisUsados(prev => prev.map(m => m.id === mat.id ? { ...m, qtd: m.qtd + 1 } : m))}
                              className="text-slate-400 hover:text-primary"
                            >+</button>
                          </div>
                          <button 
                            onClick={() => removeMaterial(mat.id)}
                            className="text-xs font-medium text-rose-500 hover:text-rose-700 px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Other tabs remain similar but styled with new classes */}
            {activeTab === 'anamnese' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border space-y-8">
                <h2 className="text-2xl font-serif text-primary mb-2">Anamnese Odontológica</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {['Sangramento Gengival', 'Sensibilidade Dentinária', 'Alergia a Anestésicos'].map(item => (
                      <label key={item} className="flex items-center gap-4 p-4 border border-border rounded-2xl hover:border-accent/50 cursor-pointer transition-colors group">
                        <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-accent flex items-center justify-center">
                          {/* Checked state would go here */}
                        </div>
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {['Uso de Anticoagulantes', 'Diabetes', 'Hipertensão'].map(item => (
                      <label key={item} className="flex items-center gap-4 p-4 border border-border rounded-2xl hover:border-accent/50 cursor-pointer transition-colors group">
                        <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-accent flex items-center justify-center"></div>
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Queixa Principal Odontológica</label>
                  <textarea className="w-full p-5 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-slate-50/50" rows={4} placeholder="Descreva a queixa principal do paciente..."></textarea>
                </div>
              </div>
            )}

            {activeTab === 'evolucao' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                <h2 className="text-2xl font-serif text-primary mb-6">Evolução do Tratamento</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50/50 rounded-2xl border border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-primary">23/02/2026 - 10:30</span>
                      <span className="text-xs font-bold tracking-widest text-accent uppercase">Dr. Amaral</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Realizada profilaxia e raspagem supragengival. Paciente apresentou leve sangramento na região anterior inferior. Orientada sobre higiene oral.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Nova Evolução</label>
                    <textarea className="w-full p-5 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all bg-slate-50/50" rows={5} placeholder="Descreva os procedimentos realizados nesta sessão..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'protese' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                <h2 className="text-2xl font-serif text-primary mb-6">Pedido para Laboratório de Prótese</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Tipo de Trabalho</label>
                    <select className="w-full p-4 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none bg-slate-50/50 appearance-none">
                      <option>Coroa Metalocerâmica</option>
                      <option>Coroa E-max (Porcelana Pura)</option>
                      <option>Placa de Bruxismo (Acrílico)</option>
                      <option>Prótese Total (PT)</option>
                      <option>Lente de Contato Dental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Cor (Escala Vita)</label>
                    <select className="w-full p-4 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none bg-slate-50/50 appearance-none">
                      <option>A1</option>
                      <option>A2</option>
                      <option>A3</option>
                      <option>B1</option>
                      <option>BL1 (Bleach)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Especificações e Observações</label>
                    <textarea className="w-full p-5 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none bg-slate-50/50" rows={4} placeholder="Detalhes do preparo, término cervical, etc..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'imagem' && (
              <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                <h2 className="text-2xl font-serif text-primary mb-6">Pedido de Exames Radiográficos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    'Radiografia Panorâmica',
                    'Periapical Completa',
                    'Periapical (Dente Específico)',
                    'Interproximal (Bite-wing)',
                    'Tomografia Cone Beam',
                    'Escaneamento Intraoral'
                  ].map(exame => (
                    <label key={exame} className="flex items-center gap-4 p-4 border border-border rounded-2xl hover:border-accent/50 cursor-pointer transition-colors group">
                      <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-accent flex items-center justify-center"></div>
                      <span className="text-sm font-medium text-slate-700">{exame}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Justificativa / Região</label>
                  <textarea className="w-full p-5 border border-border rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none bg-slate-50/50" rows={3} placeholder="Ex: Avaliação de implante na região do 36..."></textarea>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

