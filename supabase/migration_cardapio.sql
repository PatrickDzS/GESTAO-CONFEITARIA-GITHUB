-- ============================================================
-- GESTÃO DE CONFEITARIA — Migration: Cardápio (grade de produção)
--
-- Banco já existente: rode este arquivo no SQL Editor do Supabase.
-- Instalação nova: rode supabase/schema.sql (já inclui esta tabela).
--
-- Modelo: 1 linha por (usuário, dia, posição) = quanto produzir
-- daquele produto no dia.
-- Espelha o estado do app: { 'YYYY-MM-DD': { fichaId: quantidade } }
--
-- NOTA: ficha_id é TEXT simples (sem foreign key), igual em
-- promocoes/pedido_itens — porque em bancos criados pelo schema v1
-- a tabela fichas tem PK apenas em (id), e uma FK composta
-- (user_id, ficha_id) falharia com erro 42830.
-- A limpeza ao excluir uma ficha é feita por trigger abaixo.
-- ============================================================

-- ---------- CARDÁPIO ----------
create table if not exists cardapios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  data date not null,
  ordem integer not null default 0,
  ficha_id text,
  quantidade numeric not null default 1,
  criado_em timestamptz not null default now(),
  unique (user_id, data, ordem)
);

-- hotfix: se a tabela foi criada numa tentativa anterior sem a coluna
alter table cardapios add column if not exists quantidade numeric not null default 1;

create index if not exists idx_cardapios_user_data on cardapios(user_id, data);
create index if not exists idx_cardapios_user_ficha on cardapios(user_id, ficha_id);

-- ---------- Trigger: excluir ficha remove do cardápio ----------
create or replace function apagar_cardapio_da_ficha()
returns trigger language plpgsql as $$
begin
  delete from cardapios
  where user_id = old.user_id and ficha_id = old.id;
  return old;
end $$;

drop trigger if exists trg_ficha_apaga_cardapio on fichas;
create trigger trg_ficha_apaga_cardapio
  after delete on fichas
  for each row execute function apagar_cardapio_da_ficha();

-- ---------- RLS: cada usuário só vê/edita o próprio cardápio ----------
alter table cardapios enable row level security;

drop policy if exists cardapios_permissiva on cardapios;
drop policy if exists cardapios_dono on cardapios;

create policy cardapios_dono on cardapios
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- Limpeza opcional: remove semanas já passadas ----------
-- delete from cardapios where data < current_date;

-- ---------- Verificação ----------
-- select data, ordem, ficha_id, quantidade
-- from cardapios
-- where user_id = auth.uid()
-- order by data, ordem;
