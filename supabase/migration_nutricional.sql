-- ============================================================
-- GESTÃO DE CONFEITARIA — Migration: Dados nutricionais (etiqueta ANVISA)
--
-- Banco já existente: rode este arquivo no SQL Editor do Supabase.
-- Instalação nova: rode supabase/schema.sql (já inclui estas colunas).
--
-- Nutrientes por 100 g de insumo (base da tabela nutricional).
-- Alergênicos: texto livre separado por vírgula (ex: "Glúten, Leite").
-- Ficha: porção padrão (g) e validade (dias) para a etiqueta.
-- ============================================================

alter table insumos add column if not exists kcal_100 numeric not null default 0;
alter table insumos add column if not exists carb_100 numeric not null default 0;
alter table insumos add column if not exists acucar_100 numeric not null default 0;
alter table insumos add column if not exists prot_100 numeric not null default 0;
alter table insumos add column if not exists gord_tot_100 numeric not null default 0;
alter table insumos add column if not exists gord_sat_100 numeric not null default 0;
alter table insumos add column if not exists gord_trans_100 numeric not null default 0;
alter table insumos add column if not exists fibra_100 numeric not null default 0;
alter table insumos add column if not exists sodio_100 numeric not null default 0;
alter table insumos add column if not exists alergenicos text not null default '';

alter table fichas add column if not exists porcao_g numeric not null default 0;
alter table fichas add column if not exists validade_dias integer not null default 0;

-- ---------- Verificação ----------
-- select nome, kcal_100, carb_100, alergenicos from insumos limit 5;
-- select nome, porcao_g, validade_dias from fichas limit 5;
