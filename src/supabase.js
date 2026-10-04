import { createClient } from '@supabase/supabase-js';

// A conexão vem de public/config.js, carregado pelo index.html.
// Motivo: esse arquivo NÃO passa pelo build, então o app conecta no Supabase
// mesmo que a hospedagem não tenha nenhuma variável de ambiente configurada.
// Se o config.js não existir, caímos nas variáveis de ambiente (Vercel/.env).
const cfg = (typeof window !== 'undefined' && window.__SUPABASE__) || {};

const rawUrl = String(
  cfg.url
  || import.meta.env.VITE_SUPABASE_URL
  || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  || import.meta.env.SUPABASE_URL
  || ''
).trim();
// Normaliza: sem barra final e sem /rest/v1 (causa 404 no Auth)
const url = rawUrl.replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const anonKey = cfg.key
  || import.meta.env.VITE_SUPABASE_ANON_KEY
  || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || import.meta.env.SUPABASE_ANON_KEY;

export const bancoAtivo = Boolean(url && anonKey && !String(url).includes('xyzcompany'));

export const supabaseUrl = url;
export const supabaseAnonKey = anonKey;

export const supabase = bancoAtivo ? createClient(url, anonKey) : null;
