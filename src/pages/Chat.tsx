import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Paperclip, MoreVertical, Tag, UserCheck, Phone, CheckCheck, Clock, Circle } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    from: 'patient' | 'agent';
    time: string;
    status?: 'sent' | 'delivered' | 'read';
}

interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    status: 'online' | 'offline' | 'typing';
    tag: string;
    agent: string;
    messages: Message[];
}

const tagColors: Record<string, string> = {
    'Implante': 'bg-violet-100 text-violet-700',
    'Retorno': 'bg-amber-100 text-amber-700',
    'Orçamento': 'bg-blue-100 text-blue-700',
    'Urgência': 'bg-rose-100 text-rose-700',
    'Clareamento': 'bg-teal-100 text-teal-700',
    'Novo': 'bg-emerald-100 text-emerald-700',
};

const initialChats: Chat[] = [
    {
        id: 1, name: 'Ana Paula Mendes', avatar: 'AP', tag: 'Implante', agent: 'Dra. Carla', status: 'online',
        lastMessage: 'Oi, gostaria de saber sobre implantes', time: '09:42', unread: 2,
        messages: [
            { id: 1, text: 'Olá! Vi o post de vocês no Instagram sobre implantes.', from: 'patient', time: '09:40' },
            { id: 2, text: 'Gostaria de saber sobre os valores e o procedimento.', from: 'patient', time: '09:41' },
            { id: 3, text: 'Olá Ana! Tudo bem? 😊 Claro, posso te explicar tudo sobre implantes dentais.', from: 'agent', time: '09:43', status: 'read' },
            { id: 4, text: 'O processo é bastante tranquilo. Primeiro fazemos uma avaliação gratuita.', from: 'agent', time: '09:44', status: 'read' },
        ]
    },
    {
        id: 2, name: 'Carlos Silva', avatar: 'CS', tag: 'Orçamento', agent: 'Recepção', status: 'typing',
        lastMessage: 'Qual o valor do tratamento completo?', time: '09:35', unread: 1,
        messages: [
            { id: 1, text: 'Boa tarde! Vocês fazem parcelamento?', from: 'patient', time: '09:30' },
            { id: 2, text: 'Boa tarde, Carlos! Sim, parcelamos em até 12x sem juros no cartão.', from: 'agent', time: '09:32', status: 'read' },
            { id: 3, text: 'Qual o valor do tratamento completo de ortodontia?', from: 'patient', time: '09:35' },
        ]
    },
    {
        id: 3, name: 'Fernanda Costa', avatar: 'FC', tag: 'Retorno', agent: 'Dra. Carla', status: 'offline',
        lastMessage: 'Confirmo a consulta de quinta!', time: 'Ontem', unread: 0,
        messages: [
            { id: 1, text: 'Oi! Quero confirmar minha consulta de quinta às 15h.', from: 'patient', time: 'Ontem, 16:00' },
            { id: 2, text: 'Confirmado, Fernanda! Te esperamos na quinta às 15h. 🦷', from: 'agent', time: 'Ontem, 16:05', status: 'read' },
            { id: 3, text: 'Confirmo a consulta de quinta! Obrigada.', from: 'patient', time: 'Ontem, 16:06' },
        ]
    },
    {
        id: 4, name: 'Roberto Lima', avatar: 'RL', tag: 'Urgência', agent: 'Recepção', status: 'online',
        lastMessage: 'Estou com muita dor, é urgente!', time: '09:10', unread: 3,
        messages: [
            { id: 1, text: 'Bom dia! Estou com muita dor de dente desde ontem.', from: 'patient', time: '09:08' },
            { id: 2, text: 'A dor é insuportável, preciso ser atendido hoje!', from: 'patient', time: '09:09' },
            { id: 3, text: 'Estou com muita dor, é urgente!', from: 'patient', time: '09:10' },
        ]
    },
    {
        id: 5, name: 'Juliana Rocha', avatar: 'JR', tag: 'Clareamento', agent: 'Dra. Carla', status: 'offline',
        lastMessage: 'Quanto tempo dura o resultado?', time: '08:55', unread: 0,
        messages: [
            { id: 1, text: 'Olá! Tenho interesse no clareamento dental.', from: 'patient', time: '08:50' },
            { id: 2, text: 'Oi Juliana! O clareamento que realizamos dura em média 2 a 3 anos com os cuidados certos.', from: 'agent', time: '08:52', status: 'read' },
            { id: 3, text: 'Quanto tempo dura o resultado?', from: 'patient', time: '08:55' },
        ]
    },
];

const avatarColors = ['bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-teal-500'];

export default function Chat() {
    const [chats, setChats] = useState<Chat[]>(initialChats);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selected = chats.find(c => c.id === selectedId)!;

    const filteredChats = chats.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => { scrollToBottom(); }, [selectedId, selected?.messages.length]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMsg: Message = {
            id: Date.now(),
            text: input,
            from: 'agent',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };
        setChats(prev => prev.map(c =>
            c.id === selectedId
                ? { ...c, messages: [...c.messages, newMsg], lastMessage: input, time: newMsg.time, unread: 0 }
                : c
        ));
        setInput('');
    };

    const markRead = (id: number) => {
        setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
        setSelectedId(id);
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Chat List */}
            <div className="w-80 flex-shrink-0 border-r border-border flex flex-col">
                <div className="p-4 border-b border-border">
                    <h2 className="font-serif text-xl text-primary mb-3">Chat Omnichannel</h2>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar conversa..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat, i) => (
                        <button
                            key={chat.id}
                            onClick={() => markRead(chat.id)}
                            className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-border/50 ${selectedId === chat.id ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
                        >
                            <div className="relative flex-shrink-0">
                                <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}>
                                    {chat.avatar}
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-emerald-500' : chat.status === 'typing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-800 truncate">{chat.name}</span>
                                    <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-400 truncate mt-0.5">{chat.lastMessage}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${tagColors[chat.tag] || 'bg-slate-100 text-slate-500'}`}>
                                        {chat.tag}
                                    </span>
                                    {chat.unread > 0 && (
                                        <span className="bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Chat Header */}
                <div className="px-6 py-3.5 border-b border-border flex items-center justify-between bg-surface">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${avatarColors[chats.findIndex(c => c.id === selectedId) % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}>
                            {selected?.avatar}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">{selected?.name}</p>
                            <p className="text-xs text-slate-400">
                                {selected?.status === 'typing' ? <span className="text-amber-500 animate-pulse">digitando...</span> : selected?.agent}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Tag */}
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-full border flex items-center gap-1 ${tagColors[selected?.tag] || ''}`}>
                            <Tag size={10} />
                            {selected?.tag}
                        </span>
                        {/* Transfer */}
                        <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-border px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
                            <UserCheck size={13} />
                            Transferir
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/40">
                    <AnimatePresence initial={false}>
                        {selected?.messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.from === 'agent' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${msg.from === 'agent'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white text-slate-800 rounded-bl-sm border border-slate-100'
                                    }`}>
                                    <p className="leading-relaxed">{msg.text}</p>
                                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.from === 'agent' ? 'text-white/60' : 'text-slate-300'}`}>
                                        <span className="text-[10px]">{msg.time}</span>
                                        {msg.from === 'agent' && (
                                            msg.status === 'read'
                                                ? <CheckCheck size={12} className="text-blue-300" />
                                                : <CheckCheck size={12} />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="px-4 py-3 border-t border-border bg-surface flex items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-600 transition p-1.5">
                        <Paperclip size={18} />
                    </button>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        placeholder="Escreva uma mensagem..."
                        className="flex-1 py-2.5 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
