import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Eye, MousePointerClick, UserCheck, DollarSign, Megaphone, BarChart3, RefreshCw } from 'lucide-react';

const campaigns = [
    { id: 1, name: 'Implante Dental – Campanha Maio', status: 'ativo', budget: 'R$ 1.200', spent: 'R$ 847', impressions: 42300, clicks: 1890, leads: 37, cpl: 'R$ 22,89', roi: '+312%', platform: 'Meta Ads' },
    { id: 2, name: 'Clareamento – Promoção Inverno', status: 'ativo', budget: 'R$ 600', spent: 'R$ 512', impressions: 27800, clicks: 1102, leads: 24, cpl: 'R$ 21,33', roi: '+245%', platform: 'Meta Ads' },
    { id: 3, name: 'Ortodontia – Awareness', status: 'pausado', budget: 'R$ 800', spent: 'R$ 800', impressions: 61000, clicks: 2430, leads: 19, cpl: 'R$ 42,10', roi: '+98%', platform: 'Meta Ads' },
    { id: 4, name: 'Lentes de Resina – Captação', status: 'ativo', budget: 'R$ 900', spent: 'R$ 310', impressions: 18500, clicks: 780, leads: 13, cpl: 'R$ 23,84', roi: '+189%', platform: 'Meta Ads' },
];

const kpis = [
    { label: 'Impressões', value: '149.600', icon: Eye, trend: '+18%', up: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cliques', value: '6.202', icon: MousePointerClick, trend: '+12%', up: true, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Leads Gerados', value: '93', icon: UserCheck, trend: '+27%', up: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Custo por Lead', value: 'R$ 26,38', icon: DollarSign, trend: '-9%', up: false, color: 'text-amber-600', bg: 'bg-amber-50' },
];

// Simple bar chart data simulation
const weeklyLeads = [
    { day: 'Seg', leads: 8 },
    { day: 'Ter', leads: 14 },
    { day: 'Qua', leads: 11 },
    { day: 'Qui', leads: 19 },
    { day: 'Sex', leads: 22 },
    { day: 'Sáb', leads: 13 },
    { day: 'Dom', leads: 6 },
];

const maxLeads = Math.max(...weeklyLeads.map(d => d.leads));

export default function Marketing() {
    const [period, setPeriod] = useState('30d');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-3xl text-primary tracking-wide">Marketing & Mídia</h1>
                    <p className="text-slate-500 text-sm mt-1">Métricas de desempenho das campanhas Meta Ads</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-surface border border-border rounded-xl overflow-hidden text-sm">
                        {['7d', '30d', '90d'].map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-2 transition-colors ${period === p ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-sm text-slate-600 hover:bg-slate-50 transition">
                        <RefreshCw size={14} />
                        Sync
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-surface rounded-2xl p-5 border border-border"
                    >
                        <div className={`w-10 h-10 ${kpi.bg} ${kpi.color} rounded-xl flex items-center justify-center mb-4`}>
                            <kpi.icon size={20} />
                        </div>
                        <p className="text-2xl font-semibold text-primary">{kpi.value}</p>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-slate-500">{kpi.label}</p>
                            <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {kpi.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart + Top Source */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Leads Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-surface rounded-2xl border border-border p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-medium text-primary text-sm">Leads por Dia</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Últimos 7 dias</p>
                        </div>
                        <BarChart3 size={18} className="text-slate-300" />
                    </div>
                    <div className="flex items-end gap-3 h-40">
                        {weeklyLeads.map((d, i) => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.leads / maxLeads) * 100}%` }}
                                    transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                                    className="w-full bg-primary/80 rounded-t-lg hover:bg-primary transition-colors cursor-default"
                                    style={{ minHeight: '4px' }}
                                    title={`${d.leads} leads`}
                                />
                                <span className="text-[10px] text-slate-400">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Conversion Funnel */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-surface rounded-2xl border border-border p-6"
                >
                    <h3 className="font-medium text-primary text-sm mb-6">Funil de Conversão</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Impressões', value: 149600, pct: 100, color: 'bg-blue-400' },
                            { label: 'Cliques', value: 6202, pct: 4.1, color: 'bg-violet-400' },
                            { label: 'Leads', value: 93, pct: 1.5, color: 'bg-emerald-400' },
                            { label: 'Agendados', value: 41, pct: 0.7, color: 'bg-amber-400' },
                        ].map((step, i) => (
                            <div key={step.label}>
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>{step.label}</span>
                                    <span className="font-medium text-slate-700">{step.value.toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${step.pct}%` }}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                        className={`h-full ${step.color} rounded-full`}
                                        style={{ minWidth: '6px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Campaigns Table */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-surface rounded-2xl border border-border overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                    <Megaphone size={18} className="text-primary" />
                    <h3 className="font-medium text-primary text-sm">Campanhas Ativas</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-slate-50/60">
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Campanha</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Investido</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Impressões</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Cliques</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Leads</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">CPL</th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {campaigns.map((c, i) => (
                                <motion.tr
                                    key={c.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.06 }}
                                    className="hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.status === 'ativo' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            <div>
                                                <p className="font-medium text-slate-800 text-sm">{c.name}</p>
                                                <p className="text-xs text-slate-400">{c.platform}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right text-slate-600 text-xs">{c.spent} / <span className="text-slate-400">{c.budget}</span></td>
                                    <td className="px-4 py-4 text-right text-slate-600 text-xs">{c.impressions.toLocaleString('pt-BR')}</td>
                                    <td className="px-4 py-4 text-right text-slate-600 text-xs">{c.clicks.toLocaleString('pt-BR')}</td>
                                    <td className="px-4 py-4 text-right">
                                        <span className="text-xs font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-full">{c.leads}</span>
                                    </td>
                                    <td className="px-4 py-4 text-right text-slate-600 text-xs">{c.cpl}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-xs font-semibold text-emerald-600">{c.roi}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
