-- ============================================================
-- GESTÃO DE CONFEITARIA — Migration: Identidade da Marca
--
-- Banco já existente: rode este arquivo no SQL Editor do Supabase.
-- Instalação nova: rode supabase/schema.sql (já inclui esta tabela).
--
-- Uma linha por usuário (user_id é a PK). O campo `logo` recebe a
-- imagem já reduzida no navegador (dataURL ~30-60 KB), então a linha
-- fica bem abaixo do limite de tamanho do Postgres/PostgREST.
-- ============================================================

create table if not exists marca (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nome text not null default '',
  slogan text not null default '',
  logo text not null default '',
  cor_principal text not null default '#C65D3A',
  cor_secundaria text not null default '#3E2A23',
  cor_fundo text not null default '#FFF8F1',
  whatsapp text not null default '',
  instagram text not null default '',
  cidade text not null default '',
  desde text not null default '',
  usar_logo_etiquetas boolean not null default true,
  usar_logo_cardapio boolean not null default true,
  usar_assinatura boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ---------- updated_at automático ----------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_marca_updated on marca;
create trigger trg_marca_updated before update on marca
  for each row execute function set_updated_at();

-- ---------- RLS: cada usuário só vê/edita a própria identidade ----------
alter table marca enable row level security;

drop policy if exists marca_permissiva on marca;
drop policy if exists marca_dono on marca;

create policy marca_dono on marca
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- Verificação ----------
-- select nome, slogan, cor_principal, length(logo) as bytes_logo
-- from marca where user_id = auth.uid();
