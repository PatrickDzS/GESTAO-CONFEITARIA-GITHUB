import { createClient } from '@supabase/supabase-js';

// O Vite só embute variáveis VITE_* no bundle. A integração nativa
// Vercel↔Supabase cria nomes SEM esse prefixo, então aceitamos os dois:
// se algum dia o build expor os outros nomes, o app conecta sozinho.
const rawUrl = String(
  import.meta.env.VITE_SUPABASE_URL
  || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  || import.meta.env.SUPABASE_URL
  || ''
).trim();
// Normaliza: sem barra final e sem /rest/v1 (causa 404 no Auth)
const url = rawUrl.replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || import.meta.env.SUPABASE_ANON_KEY;

export const bancoAtivo = Boolean(url && anonKey && !String(url).includes('xyzcompany'));

export const supabaseUrl = url;
export const supabaseAnonKey = anonKey;

export const supabase = bancoAtivo ? createClient(url, anonKey) : null;

// Diagnóstico do que CHEGOU no bundle (sem expor a chave).
// Usado na tela de login e em Configurações → Banco de dados.
export function diagSupabase() {
  const host = url ? String(url.split('://')[1] || url).split('/')[0] : '';
  const fonte = import.meta.env.VITE_SUPABASE_URL ? 'VITE_ (manual)'
    : (import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL ? 'integração Vercel' : 'nenhuma');
  return {
    bancoAtivo,
    fonte,
    temUrl: Boolean(url),
    host: host || '(ausente)',
    temKey: Boolean(anonKey),
    keyResumo: anonKey ? (String(anonKey).slice(0, 6) + '…' + String(anonKey).slice(-4) + ' · ' + String(anonKey).length + ' chars') : '(ausente)'
  };
}
