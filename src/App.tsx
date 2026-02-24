import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Stethoscope, DollarSign, Package, LogOut, Menu, X, Megaphone, MessageCircle, Briefcase, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Pacientes from './pages/Pacientes';
import Prontuario from './pages/Prontuario';
import Financeiro from './pages/Financeiro';
import Estoque from './pages/Estoque';
import Crm from './pages/Crm';
import Marketing from './pages/Marketing';
import Chat from './pages/Chat';

// ── Theme Context ──────────────────────────────────────────────
const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({ dark: false, toggle: () => { } });
export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Loading Screen ─────────────────────────────────────────────
function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 border-t-2 border-accent rounded-full animate-spin mb-8"></div>
        <h1 className="font-serif text-5xl tracking-widest font-light mb-2">AMARAL</h1>
        <p className="text-xs tracking-[0.3em] text-accent uppercase">Odontologia de Excelência</p>
      </motion.div>
    </motion.div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────
function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const location = useLocation();
  const { dark, toggle } = useTheme();

  const navItems = [
    { path: '/', label: 'Início', icon: LayoutDashboard },
    { path: '/agenda', label: 'Agenda', icon: Calendar },
    { path: '/pacientes', label: 'Pacientes', icon: Users },
    { path: '/prontuario', label: 'Atendimento', icon: Stethoscope },
    { path: '/financeiro', label: 'Financeiro', icon: DollarSign },
    { path: '/estoque', label: 'Estoque', icon: Package },
    { path: '/crm', label: 'CRM', icon: Briefcase },
    { path: '/marketing', label: 'Marketing', icon: Megaphone },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl tracking-wider text-primary">AMARAL</h1>
            <p className="text-[9px] tracking-[0.2em] text-accent uppercase mt-1">Odontologia</p>
          </div>
          <button className="lg:hidden text-primary" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-6 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                  }`}
              >
                <item.icon size={20} className={isActive ? 'text-accent' : 'text-slate-400'} strokeWidth={isActive ? 2 : 1.5} />
                <span className={`text-sm ${isActive ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
          >
            <motion.div
              key={dark ? 'moon' : 'sun'}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </motion.div>
            <span className="text-sm">{dark ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>

          {/* Logout */}
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors">
            <LogOut size={20} strokeWidth={1.5} />
            <span className="text-sm">Sair do Sistema</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ── Layout ─────────────────────────────────────────────────────
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans selection:bg-accent/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-surface border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="text-primary p-2 -ml-2">
            <Menu size={24} />
          </button>
          <h1 className="font-serif text-xl tracking-wider text-primary">AMARAL</h1>
          <div className="w-8" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>

        {!loading && (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/prontuario" element={<Prontuario />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}
