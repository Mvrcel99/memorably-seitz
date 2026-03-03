import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { handleLogin, isLoading } = useLogin();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-sans flex flex-col">
      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-md space-y-8 bg-slate-50 p-10 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">Willkommen zurück</h1>
            <p className="text-slate-500 mt-2">Anmeldung für Systemzugang</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">E-Mail Adresse</label>
              <Input 
                type="email" 
                placeholder="E-Mail Adresse" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full py-6 px-6 border-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Passwort</label>
              <Input 
                type="password" 
                placeholder="Passwort" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full py-6 px-6 border-slate-200"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full rounded-full py-7 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg transition-all active:scale-95"
            >
              {isLoading ? "Wird angemeldet..." : "Anmelden"}
            </Button>
          </form>
          <Separator className="bg-slate-200" />
        </div>
      </main>
      <footer className="py-8 text-center text-xs text-slate-400">© 2026 Memorably</footer>
    </div>
  );
};

export default Login;