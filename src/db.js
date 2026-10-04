// Camada de persistência Supabase (fonte oficial) + LocalStorage (cache offline).
// Formato do app (camelCase) <-> formato do banco (snake_case).
// Tudo é isolado por usuário (coluna user_id + RLS).
import { supabase, bancoAtivo } from './supabase.js';

export { bancoAtivo };

const num = (v) => Number(v) || 0;
const txt = (v) => (v === null || v === undefined) ? '' : String(v);

async function uid() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error('sem-sessao');
  return data.user.id;
}

// ---------- leitura: linha -> objeto do app ----------
function mapInsumo(r) {
  return {
    id: r.id, nome: txt(r.nome), categoria: txt(r.categoria) || 'Ingredientes',
    quantidade: num(r.quantidade), estoqueAtual: num(r.estoque_atual),
    unidade: txt(r.unidade) || 'g',
    alertaEstoqueMinimo: num(r.alerta_estoque_minimo), estoqueMinimo: num(r.estoque_minimo),
    precoPacote: num(r.preco_pacote), qtdPacote: num(r.qtd_pacote) || 1,
    kcal100: num(r.kcal_100), carb100: num(r.carb_100), acucar100: num(r.acucar_100),
    prot100: num(r.prot_100), gordTot100: num(r.gord_tot_100), gordSat100: num(r.gord_sat_100),
    gordTrans100: num(r.gord_trans_100), fibra100: num(r.fibra_100), sodio100: num(r.sodio_100),
    alergenicos: txt(r.alergenicos)
  };
}

function mapFicha(r, ingredientes) {
  return {
    id: r.id, nome: txt(r.nome), categoria: txt(r.categoria) || 'Docinhos',
    rendimento: num(r.rendimento) || 1, margemAlvo: num(r.margem_alvo) || 60,
    precoPraticado: num(r.preco_praticado),
    tempoPreparoMin: num(r.tempo_preparo_min),
    dicaForno: txt(r.dica_forno), modoPreparo: txt(r.modo_preparo),
    porcaoG: num(r.porcao_g), validadeDias: parseInt(r.validade_dias, 10) || 0,
    ingredientes: (ingredientes || []).map(i => ({ insumoId: i.insumo_id, qtd: num(i.qtd) }))
  };
}

function mapPedido(r, itens) {
  return {
    id: r.id, cliente: txt(r.cliente), telefone: txt(r.telefone),
    dataEntrega: r.data_entrega || '', horaEntrega: txt(r.hora_entrega),
    status: txt(r.status) || 'aguardando', canal: txt(r.canal) || 'WhatsApp',
    taxaPercentual: num(r.taxa_percentual),
    valorTotal: num(r.valor_total), valorSinal: num(r.valor_sinal),
    estoqueBaixado: Boolean(r.estoque_baixado),
    ...(r.data_baixa_estoque ? { dataBaixaEstoque: r.data_baixa_estoque } : {}),
    observacoes: txt(r.observacoes),
    itens: (itens || []).map(i => ({
      fichaId: i.ficha_id || '', nome: txt(i.nome),
      qtd: num(i.qtd) || 1, precoUnit: num(i.preco_unit)
    }))
  };
}

function mapLancamento(r) {
  return {
    id: r.id, pedidoId: r.pedido_id || undefined,
    data: r.data || '', tipo: r.tipo, categoria: txt(r.categoria),
    descricao: txt(r.descricao), valor: num(r.valor), forma: txt(r.forma) || 'PIX'
  };
}

function mapMetas(r) {
  if (!r) return null;
  return {
    faturamentoMensal: num(r.faturamento_mensal),
    faturamentoAnual: num(r.faturamento_anual),
    custosFixosMensais: num(r.custos_fixos_mensais),
    cmvMedioPercentual: num(r.cmv_medio_percentual),
    taxaAppMediaPercentual: num(r.taxa_app_media_percentual)
  };
}

function mapPromocao(r) {
  return {
    id: r.id, nome: txt(r.nome), dataCampanha: r.data_campanha || '',
    fichaId: r.ficha_id || '', canal: txt(r.canal) || 'WhatsApp',
    taxaCanal: num(r.taxa_canal), tipoDesconto: txt(r.tipo_desconto) || 'percentual',
    descontoPercentual: num(r.desconto_percentual),
    precoPromocionalFixo: num(r.preco_promocional_fixo),
    brindeAtivo: Boolean(r.brinde_ativo), brindeTipo: txt(r.brinde_tipo) || 'ficha',
    brindeFichaId: r.brinde_ficha_id || '', brindeNomeCustom: txt(r.brinde_nome_custom),
    brindeCustoCustom: num(r.brinde_custo_custom),
    volumeVendasProjetado: num(r.volume_vendas_projetado),
    status: txt(r.status) || 'planejada', observacoes: txt(r.observacoes)
  };
}

function mapCliente(r) {
  return {
    id: r.id, chave: r.chave || undefined, nome: txt(r.nome),
    telefone: txt(r.telefone), endereco: txt(r.endereco),
    aniversario: txt(r.aniversario), observacoes: txt(r.observacoes)
  };
}

function mapMarca(r) {
  if (!r) return null;
  return {
    nome: txt(r.nome), slogan: txt(r.slogan), logo: txt(r.logo),
    corPrincipal: txt(r.cor_principal) || '#C65D3A',
    corSecundaria: txt(r.cor_secundaria) || '#3E2A23',
    corFundo: txt(r.cor_fundo) || '#FFF8F1',
    whatsapp: txt(r.whatsapp), instagram: txt(r.instagram),
    cidade: txt(r.cidade), desde: txt(r.desde),
    usarLogoEtiquetas: r.usar_logo_etiquetas !== false,
    usarLogoCardapio: r.usar_logo_cardapio !== false,
    usarAssinatura: r.usar_assinatura !== false
  };
}

// ---------- escrita: objeto do app -> linha ----------
const rowInsumo = (u, i) => ({
  user_id: u, id: i.id, nome: i.nome, categoria: i.categoria,
  quantidade: num(i.quantidade), estoque_atual: num(i.estoqueAtual ?? i.quantidade),
  unidade: i.unidade, alerta_estoque_minimo: num(i.alertaEstoqueMinimo),
  estoque_minimo: num(i.estoqueMinimo), preco_pacote: num(i.precoPacote),
  qtd_pacote: num(i.qtdPacote) || 1,
  kcal_100: num(i.kcal100), carb_100: num(i.carb100), acucar_100: num(i.acucar100),
  prot_100: num(i.prot100), gord_tot_100: num(i.gordTot100), gord_sat_100: num(i.gordSat100),
  gord_trans_100: num(i.gordTrans100), fibra_100: num(i.fibra100), sodio_100: num(i.sodio100),
  alergenicos: txt(i.alergenicos)
});

const rowFicha = (u, f) => ({
  user_id: u, id: f.id, nome: f.nome, categoria: f.categoria,
  rendimento: num(f.rendimento) || 1, margem_alvo: num(f.margemAlvo) || 60,
  preco_praticado: num(f.precoPraticado), tempo_preparo_min: num(f.tempoPreparoMin),
  dica_forno: txt(f.dicaForno), modo_preparo: txt(f.modoPreparo),
  porcao_g: num(f.porcaoG), validade_dias: parseInt(f.validadeDias, 10) || 0
});

const rowPedido = (u, p) => ({
  user_id: u, id: p.id, cliente: txt(p.cliente), telefone: txt(p.telefone),
  data_entrega: p.dataEntrega || null, hora_entrega: txt(p.horaEntrega),
  status: p.status, canal: p.canal, taxa_percentual: num(p.taxaPercentual),
  valor_total: num(p.valorTotal), valor_sinal: num(p.valorSinal),
  estoque_baixado: Boolean(p.estoqueBaixado),
  data_baixa_estoque: p.dataBaixaEstoque || null,
  observacoes: txt(p.observacoes)
});

const rowLancamento = (u, l) => ({
  user_id: u, id: l.id, pedido_id: l.pedidoId || null, data: l.data || null,
  tipo: l.tipo, categoria: l.categoria, descricao: txt(l.descricao),
  valor: num(l.valor), forma: l.forma
});

const rowPromocao = (u, p) => ({
  user_id: u, id: p.id, nome: txt(p.nome), data_campanha: p.dataCampanha || null,
  ficha_id: p.fichaId || null, canal: p.canal, taxa_canal: num(p.taxaCanal),
  tipo_desconto: p.tipoDesconto, desconto_percentual: num(p.descontoPercentual),
  preco_promocional_fixo: num(p.precoPromocionalFixo),
  brinde_ativo: Boolean(p.brindeAtivo), brinde_tipo: p.brindeTipo,
  brinde_ficha_id: p.brindeFichaId || null, brinde_nome_custom: txt(p.brindeNomeCustom),
  brinde_custo_custom: num(p.brindeCustoCustom),
  volume_vendas_projetado: num(p.volumeVendasProjetado),
  status: p.status, observacoes: txt(p.observacoes)
});

const rowCliente = (u, c) => ({
  user_id: u, id: c.id, chave: c.chave || null, nome: txt(c.nome),
  telefone: txt(c.telefone), endereco: txt(c.endereco),
  aniversario: txt(c.aniversario), observacoes: txt(c.observacoes)
});

const rowMarca = (u, m) => ({
  user_id: u, nome: txt(m.nome), slogan: txt(m.slogan), logo: txt(m.logo),
  cor_principal: txt(m.corPrincipal) || '#C65D3A',
  cor_secundaria: txt(m.corSecundaria) || '#3E2A23',
  cor_fundo: txt(m.corFundo) || '#FFF8F1',
  whatsapp: txt(m.whatsapp), instagram: txt(m.instagram),
  cidade: txt(m.cidade), desde: txt(m.desde),
  usar_logo_etiquetas: m.usarLogoEtiquetas !== false,
  usar_logo_cardapio: m.usarLogoCardapio !== false,
  usar_assinatura: m.usarAssinatura !== false
});

async function getAll(tabela, userId, order = null) {
  let q = supabase.from(tabela).select('*').eq('user_id', userId);
  if (order) q = q.order(order, { ascending: true });
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

// Tabela opcional: se ainda não existir a migration, não derruba a carga toda
async function getAllOpcional(tabela, userId) {
  try {
    return await getAll(tabela, userId);
  } catch (err) {
    if (/does not exist|schema cache|PGRST/i.test(err?.message || '')) {
      console.warn(`Tabela "${tabela}" ainda não existe — rode a migration correspondente.`);
      return [];
    }
    throw err;
  }
}

// ---------- API ----------
// Carrega tudo do banco (só do usuário logado). Lança erro se falhar.
export async function carregarBanco() {
  const userId = await uid();
  const [ins, fic, fIng, ped, pIt, lan, met, pro, cli, mrc] = await Promise.all([
    getAll('insumos', userId, 'nome'),
    getAll('fichas', userId, 'nome'),
    getAll('ficha_ingredientes', userId),
    getAll('pedidos', userId, 'data_entrega'),
    getAll('pedido_itens', userId),
    getAll('lancamentos', userId, 'data'),
    getAll('metas', userId),
    getAll('promocoes', userId, 'data_campanha'),
    getAll('clientes', userId, 'nome'),
    getAllOpcional('marca', userId)
  ]);

  const ingPorFicha = {};
  fIng.forEach(i => { (ingPorFicha[i.ficha_id] = ingPorFicha[i.ficha_id] || []).push(i); });
  const itensPorPedido = {};
  pIt.forEach(i => { (itensPorPedido[i.pedido_id] = itensPorPedido[i.pedido_id] || []).push(i); });

  return {
    insumos: ins.map(mapInsumo),
    fichas: fic.map(f => mapFicha(f, ingPorFicha[f.id])),
    pedidos: ped.map(p => mapPedido(p, itensPorPedido[p.id])),
    lancamentos: lan.map(mapLancamento),
    metas: mapMetas(met[0]) || null,
    promocoes: pro.map(mapPromocao),
    clientes: cli.map(mapCliente),
    marca: mapMarca(mrc[0])
  };
}

const UUID_ZERO = '00000000-0000-0000-0000-000000000000';

async function upsert(tabela, linhas, conflict) {
  if (!linhas || linhas.length === 0) return;
  // Bancos v1 têm PK só em (id); o schema novo usa PK composta (user_id,id).
  // Tenta na ordem: o pedido original, depois 'id', depois 'user_id,id',
  // depois 'user_id' (marca/metas). A primeira que o banco aceitar vence.
  const tentativas = [];
  if (conflict) tentativas.push(conflict);
  for (const c of ['id', 'user_id,id', 'user_id']) {
    if (!tentativas.includes(c)) tentativas.push(c);
  }
  let ultimoErro = null;
  for (const c of tentativas) {
    const { error } = await supabase.from(tabela).upsert(linhas, { onConflict: c });
    if (!error) return;
    ultimoErro = error;
    const msg = String(error.message || '');
    // Só vale tentar a próxima chave se o erro for de ON CONFLICT;
    // qualquer outro erro (RLS, rede, coluna) aborta na hora.
    if (error.code !== '42P10' && !/ON CONFLICT|no unique|exclusion constraint/i.test(msg)) {
      throw error;
    }
  }
  throw ultimoErro;
}

// Persiste uma coleção inteira (chamado pelo saveData com as STORAGE_KEYS).
export async function persistirColecao(key, estado) {
  if (!bancoAtivo) return;
  const userId = await uid();
  if (key === 'confeitaria_insumos') {
    await upsert('insumos', estado.insumos.map(i => rowInsumo(userId, i)), 'user_id,id');
  } else if (key === 'confeitaria_fichas') {
    await upsert('fichas', estado.fichas.map(f => rowFicha(userId, f)), 'user_id,id');
    await supabase.from('ficha_ingredientes').delete().eq('user_id', userId).neq('id', UUID_ZERO);
    const todos = [];
    estado.fichas.forEach(f => (f.ingredientes || []).forEach(ing => {
      if (ing.insumoId && num(ing.qtd) > 0) {
        todos.push({ user_id: userId, ficha_id: f.id, insumo_id: ing.insumoId, qtd: num(ing.qtd) });
      }
    }));
    if (todos.length > 0) {
      const { error } = await supabase.from('ficha_ingredientes').insert(todos);
      if (error) throw error;
    }
  } else if (key === 'confeitaria_pedidos') {
    await upsert('pedidos', estado.pedidos.map(p => rowPedido(userId, p)), 'user_id,id');
    await supabase.from('pedido_itens').delete().eq('user_id', userId).neq('id', UUID_ZERO);
    const todos = [];
    estado.pedidos.forEach(p => (p.itens || []).forEach(it => {
      todos.push({
        user_id: userId, pedido_id: p.id, ficha_id: it.fichaId || null,
        nome: txt(it.nome), qtd: num(it.qtd) || 1, preco_unit: num(it.precoUnit)
      });
    }));
    if (todos.length > 0) {
      const { error } = await supabase.from('pedido_itens').insert(todos);
      if (error) throw error;
    }
  } else if (key === 'confeitaria_lancamentos') {
    await upsert('lancamentos', estado.lancamentos.map(l => rowLancamento(userId, l)), 'user_id,id');
  } else if (key === 'confeitaria_metas') {
    const m = estado.metas || {};
    await upsert('metas', [{
      user_id: userId,
      faturamento_mensal: num(m.faturamentoMensal),
      faturamento_anual: num(m.faturamentoAnual),
      custos_fixos_mensais: num(m.custosFixosMensais),
      cmv_medio_percentual: num(m.cmvMedioPercentual),
      taxa_app_media_percentual: num(m.taxaAppMediaPercentual)
    }], 'user_id');
  } else if (key === 'confeitaria_promocoes') {
    await upsert('promocoes', estado.promocoes.map(p => rowPromocao(userId, p)), 'user_id,id');
  } else if (key === 'confeitaria_clientes') {
    await upsert('clientes', estado.clientes.map(c => rowCliente(userId, c)), 'user_id,id');
  } else if (key === 'confeitaria_marca') {
    await upsert('marca', [rowMarca(userId, estado.marca || {})], 'user_id');
  }
}

export async function excluirDoBanco(tabela, id) {
  if (!bancoAtivo) return;
  const userId = await uid();
  const { error } = await supabase.from(tabela).delete().eq('user_id', userId).eq('id', id);
  if (error) throw error;
}

export async function excluirLoteDoBanco(tabela, ids) {
  if (!bancoAtivo || !ids || ids.length === 0) return;
  const userId = await uid();
  const { error } = await supabase.from(tabela).delete().eq('user_id', userId).in('id', ids);
  if (error) throw error;
}
