-- ============================================================
-- GESTÃO DE CONFEITARIA — Schema Supabase (Postgres) v2
-- Com autenticação: cada usuário só acessa os PRÓPRIOS dados.
--
-- Instalação nova: rode este arquivo inteiro no SQL Editor.
-- Banco já existente (v1): rode supabase/migration_auth.sql
-- Depois: Auth → Sign In/Up → DESMARQUE "Confirm email"
-- ============================================================

-- ---------- INSUMOS ----------
create table if not exists insumos (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  categoria text not null default 'Ingredientes',
  quantidade numeric not null default 0,
  estoque_atual numeric not null default 0,
  unidade text not null default 'g',
  alerta_estoque_minimo numeric not null default 0,
  estoque_minimo numeric not null default 0,
  preco_pacote numeric not null default 0,
  qtd_pacote numeric not null default 1,
  kcal_100 numeric not null default 0,
  carb_100 numeric not null default 0,
  acucar_100 numeric not null default 0,
  prot_100 numeric not null default 0,
  gord_tot_100 numeric not null default 0,
  gord_sat_100 numeric not null default 0,
  gord_trans_100 numeric not null default 0,
  fibra_100 numeric not null default 0,
  sodio_100 numeric not null default 0,
  alergenicos text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- ---------- FICHAS TÉCNICAS ----------
create table if not exists fichas (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  categoria text not null default 'Docinhos',
  rendimento numeric not null default 1,
  margem_alvo numeric not null default 60,
  preco_praticado numeric not null default 0,
  tempo_preparo_min numeric not null default 0,
  dica_forno text not null default '',
  modo_preparo text not null default '',
  porcao_g numeric not null default 0,
  validade_dias integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists ficha_ingredientes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ficha_id text not null,
  insumo_id text,
  qtd numeric not null default 0,
  created_at timestamptz not null default now(),
  foreign key (user_id, ficha_id) references fichas(user_id, id) on delete cascade
);
create index if not exists idx_ficha_ingredientes_ficha on ficha_ingredientes(user_id, ficha_id);

-- ---------- PEDIDOS ----------
create table if not exists pedidos (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  cliente text not null default '',
  telefone text not null default '',
  data_entrega date,
  hora_entrega text not null default '',
  status text not null default 'aguardando'
    check (status in ('aguardando', 'a_produzir', 'producao', 'pronto')),
  canal text not null default 'WhatsApp',
  taxa_percentual numeric not null default 0,
  valor_total numeric not null default 0,
  valor_sinal numeric not null default 0,
  estoque_baixado boolean not null default false,
  data_baixa_estoque timestamptz,
  observacoes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists idx_pedidos_data_entrega on pedidos(user_id, data_entrega);
create index if not exists idx_pedidos_status on pedidos(user_id, status);

create table if not exists pedido_itens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pedido_id text not null,
  ficha_id text,
  nome text not null default '',
  qtd numeric not null default 1,
  preco_unit numeric not null default 0,
  created_at timestamptz not null default now(),
  foreign key (user_id, pedido_id) references pedidos(user_id, id) on delete cascade
);
create index if not exists idx_pedido_itens_pedido on pedido_itens(user_id, pedido_id);

-- ---------- LANÇAMENTOS (CAIXA) ----------
create table if not exists lancamentos (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  pedido_id text,
  data date not null,
  tipo text not null check (tipo in ('entrada', 'saida')),
  categoria text not null default 'Outros',
  descricao text not null default '',
  valor numeric not null default 0,
  forma text not null default 'PIX',
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists idx_lancamentos_data on lancamentos(user_id, data);
create index if not exists idx_lancamentos_pedido on lancamentos(user_id, pedido_id);

-- ---------- METAS (uma linha por usuário) ----------
create table if not exists metas (
  user_id uuid primary key references auth.users(id) on delete cascade,
  faturamento_mensal numeric not null default 0,
  faturamento_anual numeric not null default 0,
  custos_fixos_mensais numeric not null default 0,
  cmv_medio_percentual numeric not null default 0,
  taxa_app_media_percentual numeric not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------- PROMOÇÕES ----------
create table if not exists promocoes (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null default '',
  data_campanha date,
  ficha_id text,
  canal text not null default 'WhatsApp',
  taxa_canal numeric not null default 0,
  tipo_desconto text not null default 'percentual',
  desconto_percentual numeric not null default 0,
  preco_promocional_fixo numeric not null default 0,
  brinde_ativo boolean not null default false,
  brinde_tipo text not null default 'ficha',
  brinde_ficha_id text,
  brinde_nome_custom text not null default '',
  brinde_custo_custom numeric not null default 0,
  volume_vendas_projetado numeric not null default 0,
  status text not null default 'planejada'
    check (status in ('planejada', 'ativa', 'concluida')),
  observacoes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- ---------- CLIENTES ----------
create table if not exists clientes (
  id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  chave text,
  nome text not null default '',
  telefone text not null default '',
  endereco text not null default '',
  aniversario text not null default '',
  observacoes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id),
  unique (user_id, chave)
);

-- ---------- CARDÁPIO (grade de produção: dia → ficha → quantidade) ----------
-- ficha_id é text simples (sem FK): bancos v1 têm PK de fichas só em (id),
-- então FK composta (user_id, ficha_id) não seria válida. A limpeza na
-- exclusão da ficha é feita pelo trigger trg_ficha_apaga_cardapio.
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
create index if not exists idx_cardapios_user_data on cardapios(user_id, data);
create index if not exists idx_cardapios_user_ficha on cardapios(user_id, ficha_id);

-- ---------- MARCA (identidade visual: 1 linha por usuário) ----------
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

-- ---------- UPDATED_AT automático ----------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_insumos_updated on insumos;
create trigger trg_insumos_updated before update on insumos
  for each row execute function set_updated_at();

drop trigger if exists trg_fichas_updated on fichas;
create trigger trg_fichas_updated before update on fichas
  for each row execute function set_updated_at();

drop trigger if exists trg_pedidos_updated on pedidos;
create trigger trg_pedidos_updated before update on pedidos
  for each row execute function set_updated_at();

drop trigger if exists trg_metas_updated on metas;
create trigger trg_metas_updated before update on metas
  for each row execute function set_updated_at();

drop trigger if exists trg_promocoes_updated on promocoes;
create trigger trg_promocoes_updated before update on promocoes
  for each row execute function set_updated_at();

drop trigger if exists trg_clientes_updated on clientes;
create trigger trg_clientes_updated before update on clientes
  for each row execute function set_updated_at();

drop trigger if exists trg_marca_updated on marca;
create trigger trg_marca_updated before update on marca
  for each row execute function set_updated_at();

-- ---------- Excluir ficha remove os itens do cardápio ----------
create or replace function apagar_cardapio_da_ficha()
returns trigger language plpgsql as $$
begin
  delete from cardapios where user_id = old.user_id and ficha_id = old.id;
  return old;
end $$;

drop trigger if exists trg_ficha_apaga_cardapio on fichas;
create trigger trg_ficha_apaga_cardapio
  after delete on fichas
  for each row execute function apagar_cardapio_da_ficha();

-- ---------- RLS: cada usuário vê só o que é dele ----------
alter table insumos enable row level security;
alter table fichas enable row level security;
alter table ficha_ingredientes enable row level security;
alter table pedidos enable row level security;
alter table pedido_itens enable row level security;
alter table lancamentos enable row level security;
alter table metas enable row level security;
alter table promocoes enable row level security;
alter table clientes enable row level security;
alter table cardapios enable row level security;
alter table marca enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'insumos', 'fichas', 'ficha_ingredientes', 'pedidos',
    'pedido_itens', 'lancamentos', 'metas', 'promocoes', 'clientes', 'cardapios', 'marca'
  ] loop
    execute format('drop policy if exists %I on %I', t || '_permissiva', t);
    execute format('drop policy if exists %I on %I', t || '_dono', t);
    execute format(
      'create policy %I on %I for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t || '_dono', t
    );
  end loop;
end $$;
