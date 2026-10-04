# 🍰 Gestão de Confeitaria — Micro-SaaS

Sistema de gestão completo para confeitaria artesanal: precificação por custo, controle de estoque com previsão de ruptura, kanban de pedidos, DRE, cardápio temático, identidade de marca e etiqueta nutricional.

Desenvolvido para uso próprio em computador (PWA instalável), com dados na nuvem via Supabase e isolamento por usuário.

---

## 🧰 Stack tecnológica

### Frontend
| Tecnologia | Versão | Papel |
|---|---|---|
| **HTML5 + CSS3** | — | Estrutura e tema visual |
| **JavaScript (ES Modules)** | — | Toda a lógica do sistema, sem framework |
| **Tailwind CSS** | 4.x | Utilitários de estilo (build via `@tailwindcss/vite`) |
| **Vite** | 8.3.1 | Bundler, dev server (`--port 3000`) e build de produção |
| **Font Awesome** | 6 (CDN) | Ícones |
| **Google Fonts** | — | `Fraunces` (títulos) + `Inter` (interface) |

> A interface é **JavaScript puro** — sem React no bundle. (O `package.json` ainda declara dependências React herdadas do template inicial; elas não são usadas pelo código e podem ser removidas.)

### Backend / Banco de dados
| Tecnologia | Papel |
|---|---|
| **Supabase** | Plataforma BaaS completa |
| **PostgreSQL** | Banco relacional (12 tabelas) |
| **Supabase Auth** | Login e criação de conta por e-mail/senha |
| **PostgREST** | API REST automática |
| **Row Level Security (RLS)** | Isolamento por `user_id` — cada usuário só vê os próprios dados |
| **@supabase/supabase-js** | 2.39+ — cliente oficial |

### Infraestrutura
| Tecnologia | Papel |
|---|---|
| **Vercel** | Hospedagem e CI/CD (build a cada push) |
| **npm** | Gerenciador de dependências |
| **Service Worker + Web App Manifest** | PWA instalável, funciona offline com cache |

### Ferramentas de desenvolvimento
- **Node.js** 20+ (ambiente de build)
- **TypeScript** (apenas para `tsconfig.json` / tipos do Vite — o app é JS)
- **Scripts SQL** rodados manualmente no Supabase SQL Editor (migrations)

---

## 🗄️ Banco de dados — 12 tabelas

| Tabela | Função |
|---|---|
| `insumos` | Estoque, custo unitário e dados nutricionais (por 100 g) |
| `fichas` | Fichas técnicas: rendimento, margem alvo, porção, validade |
| `ficha_ingredientes` | Ingredientes de cada ficha (N:N) |
| `pedidos` | Encomendas com status, canal, sinal |
| `pedido_itens` | Itens de cada pedido |
| `lancamentos` | Livro caixa (entradas e saídas) |
| `metas` | Meta mensal/anual e custos fixos (1 linha por usuário) |
| `promocoes` | Campanhas promocionais salvas |
| `clientes` | Clientes com histórico e aniversário |
| `cardapios` | Grade de produção semanal (dia → ficha → quantidade) |
| `marca` | Identidade visual: logo, cores, slogan, contato (1 linha por usuário) |
| `perfis` | E-mail do usuário vinculado ao `auth.users` |

**Migrations** em `supabase/`:
```
schema.sql                  → instalação completa (tabelas + RLS + triggers)
migration_auth.sql          → v1 → v2: user_id + RLS por dono
migration_perfis.sql        → tabela de perfis
migration_cardapio.sql      → grade de produção
migration_marca.sql         → identidade da marca
migration_nutricional.sql   → nutrientes + porção/validade
```

**Segurança:** todas as tabelas com `user_id` + RLS, política `for all to authenticated using (auth.uid() = user_id)`.

---

## ⚙️ Funcionalidades

**Operação**
- Dashboard operacional com métricas, alertas e blocos recolhíveis
- Estoque com custo unitário, alertas de mínimo e paginação
- Previsão de ruptura (MRP): cruza agenda de 7 dias × consumo das fichas
- Grade de produção (produto × 7 dias) com navegação por setas, duplicar semana e lista de compras automática
- Kanban de pedidos com arrastar e soltar, agenda de produção e etiqueta de pedido
- Clientes sincronizados automaticamente dos pedidos

**Financeiro**
- Livro caixa com conciliação e cobrança por WhatsApp
- DRE mensal por competência de entrega
- Relatórios: evolução de 14 dias, metas, pró-labore e vendas por canal
- Relatório pronto para o contador (CSV) e fechamento do dia

**Comercial**
- Precificação automática por margem e taxa do canal (iFood/99Food por plano)
- Simulador de viabilidade de promoções com diagnóstico de margem
- Cardápio com datas temáticas (feriados móveis calculados) e Modo Apresentar
- Identidade da marca aplicada a etiquetas, cardápio e impressão
- Reajuste automático de preço quando o custo do insumo muda
- Etiqueta nutricional no padrão ANVISA (RDC 429/2020 + IN 75/2020)

**Interface**
- Autenticação por e-mail/senha
- Rotas por hash (`#/dashboard`, `#/cardapio`, …)
- Paleta de comando (Ctrl+K) e atalhos de teclado
- Central de notificações (sino)
- PWA instalável, com funcionamento offline
- Tema "Confeitaria Artesanal" (creme, cacau, terracota)

---

## 🚀 Instalação e execução

### Requisitos
- Node.js 20+
- Um projeto no [Supabase](https://supabase.com)

### 1. Banco de dados
No **Supabase → SQL Editor**, rode nesta ordem:
```
supabase/schema.sql        (instalação nova — já inclui todas as tabelas)
```
ou, se o banco já existe:
```
supabase/migration_auth.sql
supabase/migration_perfis.sql
supabase/migration_cardapio.sql
supabase/migration_marca.sql
supabase/migration_nutricional.sql
```

### 2. Variáveis de ambiente
Copie `.env.example` para `.env` e preencha:
```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

> ⚠️ O Vite **embute** essas variáveis no bundle no momento do build. Na Vercel, cadastre-as em **Settings → Environment Variables** (All Environments) **antes** de cada novo deploy.

### 3. Desenvolvimento
```bash
npm install
npm run dev      # http://localhost:3000
```

### 4. Build
```bash
npm run build    # gera dist/
npm run preview  # testa o build
```

### 5. Deploy (Vercel)
1. Conecte o repositório no projeto Vercel
2. Cadastre as duas variáveis de ambiente
3. Deploy — Framework Preset: **Vite**

---

## 📁 Estrutura do projeto
```
├── index.html              # shell da aplicação (hash routing)
├── src/
│   ├── app.js              # toda a lógica e as telas (~9.000 linhas)
│   ├── db.js               # camada Supabase: leitura/escrita e mapeamento
│   ├── auth.js             # login, criação de conta e perfil
│   ├── supabase.js         # cliente, health check e flag bancoAtivo
│   └── index.css           # tema e estilos globais
├── public/
│   ├── sw.js               # service worker (network-first)
│   ├── manifest.webmanifest
│   └── icon.svg
└── supabase/               # schema e migrations SQL
```

---

## 🔐 Segurança e privacidade
- Senhas gerenciadas pelo Supabase Auth (nunca expostas ao app)
- RLS ativa em todas as tabelas: `auth.uid() = user_id`
- Sem chave de service role no front-end — apenas a `anon key`
- Escape de conteúdo do usuário (`esc()`) em todas as interpolações de HTML

---

## 📄 Licença
Projeto pessoal. Todos os direitos reservados.
