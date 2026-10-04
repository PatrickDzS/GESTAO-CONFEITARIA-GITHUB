-- ============================================================
-- PERFIS: dados extras do usuário ligados ao login (auth.users)
-- O login em si fica no auth.users (criado sozinho no cadastro).
-- Rode UMA VEZ no SQL Editor.
-- ============================================================

create table if not exists perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  nome text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table perfis enable row level security;

drop policy if exists perfis_dono on perfis;
create policy perfis_dono on perfis
  for all to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Cria o perfil automaticamente a cada novo cadastro
create or replace function criar_perfil_novo_usuario()
returns trigger language plpgsql security definer as $$
begin
  insert into perfis (id, email) values (new.id, coalesce(new.email, ''));
  return new;
end $$;

drop trigger if exists trg_criar_perfil on auth.users;
create trigger trg_criar_perfil
  after insert on auth.users
  for each row execute function criar_perfil_novo_usuario();

-- Verificação (rode após criar sua conta no app):
-- select * from perfis;
-- select id, email, created_at from auth.users;
