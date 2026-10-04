-- ============================================================
-- MIGRAÇÃO v1 -> v2: adiciona autenticação e isolamento por usuário
-- Rode UMA VEZ no SQL Editor (banco criado com o schema v1).
-- Depois: crie sua conta no app e rode o BACKFILL com seu UUID.
-- ============================================================

-- 1. Coluna user_id em todas as tabelas
alter table insumos add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table fichas add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table ficha_ingredientes add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table pedidos add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table pedido_itens add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table lancamentos add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table promocoes add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table clientes add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- 2. Metas: vira uma linha por usuário (PK passa a ser user_id)
alter table metas drop constraint if exists metas_pkey;
alter table metas add column if not exists user_id uuid references auth.users(id) on delete cascade;
do $$
begin
  if exists (select 1 from information_schema.columns where table_name = 'metas' and column_name = 'id') then
    delete from metas a using metas b
      where a.ctid < b.ctid and coalesce(a.user_id::text, '') = coalesce(b.user_id::text, '');
    alter table metas drop column id;
  end if;
end $$;
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'metas_pkey') then
    -- Remove a linha seed sem dono (o app recria via upsert no 1º salvamento)
    delete from metas where user_id is null;
    alter table metas add primary key (user_id);
  end if;
end $$;
alter table clientes drop constraint if exists clientes_chave_key;
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'clientes_user_chave_unique') then
    alter table clientes add constraint clientes_user_chave_unique unique (user_id, chave);
  end if;
end $$;

-- 3. RLS: troca política aberta por isolamento do dono
do $$
declare t text;
begin
  foreach t in array array[
    'insumos', 'fichas', 'ficha_ingredientes', 'pedidos',
    'pedido_itens', 'lancamentos', 'metas', 'promocoes', 'clientes'
  ] loop
    execute format('drop policy if exists %I on %I', t || '_permissiva', t);
    execute format('drop policy if exists %I on %I', t || '_dono', t);
    execute format(
      'create policy %I on %I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t || '_dono', t
    );
  end loop;
end $$;

-- 4. BACKFILL: após criar sua conta no app, descubra seu UUID em
--    Authentication → Users, troque abaixo e rode UMA VEZ por tabela
--    que já tiver dados:
--
-- update insumos            set user_id = 'SEU-UUID' where user_id is null;
-- update fichas             set user_id = 'SEU-UUID' where user_id is null;
-- update ficha_ingredientes set user_id = 'SEU-UUID' where user_id is null;
-- update pedidos            set user_id = 'SEU-UUID' where user_id is null;
-- update pedido_itens       set user_id = 'SEU-UUID' where user_id is null;
-- update lancamentos        set user_id = 'SEU-UUID' where user_id is null;
-- update metas              set user_id = 'SEU-UUID' where user_id is null;
-- update promocoes          set user_id = 'SEU-UUID' where user_id is null;
-- update clientes           set user_id = 'SEU-UUID' where user_id is null;
