import { supabase, bancoAtivo } from './supabase.js';

export { bancoAtivo };

export async function sessaoAtual() {
  if (!bancoAtivo) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

export async function entrar(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) throw error;
  return data;
}

export async function criarConta(email, senha) {
  const { data, error } = await supabase.auth.signUp({ email, password: senha });
  if (error) throw error;
  return data;
}

export async function sair() {
  if (!bancoAtivo) return;
  await supabase.auth.signOut();
}

export function emailDaSessao(sessao) {
  return sessao?.user?.email || '';
}

// Garante a linha do usuário em perfis (independe do trigger do banco)
export async function garantirPerfil() {
  if (!bancoAtivo) return;
  try {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return;
    await supabase.from('perfis').upsert(
      { id: user.id, email: user.email || '' },
      { onConflict: 'id' }
    );
  } catch (err) {
    console.error('Perfil não sincronizado:', err);
  }
}
