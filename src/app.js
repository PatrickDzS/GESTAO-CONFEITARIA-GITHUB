// SISTEMA DE GESTÃO PARA CONFEITARIA - JAVASCRIPT PURO
// Dados salvos localmente no navegador (LocalStorage) para persistência completa
import './index.css';
import { bancoAtivo, carregarBanco, persistirColecao, excluirDoBanco, excluirLoteDoBanco } from './db.js';
import { supabaseUrl, supabaseAnonKey } from './supabase.js';
import { sessaoAtual, entrar, criarConta, sair, emailDaSessao, garantirPerfil } from './auth.js';

const STORAGE_KEYS = {
  INSUMOS: 'confeitaria_insumos',
  FICHAS: 'confeitaria_fichas',
  PEDIDOS: 'confeitaria_pedidos',
  LANCAMENTOS: 'confeitaria_lancamentos',
  METAS: 'confeitaria_metas',
  PROMOCOES: 'confeitaria_promocoes',
  CLIENTES: 'confeitaria_clientes',
  MARCA: 'confeitaria_marca'
};

// Estado inicial: vazio (fonte oficial: Supabase; LocalStorage como cache offline)

const METAS_BASE = {
  faturamentoMensal: 0,
  faturamentoAnual: 0,
  custosFixosMensais: 0,
  cmvMedioPercentual: 0,
  taxaAppMediaPercentual: 0
};

const OPORTUNIDADES_CALENDARIO = [
  {
    id: 'op-pascoa',
    periodo: 'Março / Abril',
    nome: 'Páscoa Confeiteira',
    icone: 'fa-egg',
    cor: 'purple',
    sugestao: 'Ovos de Colher & Mini Ovos com Brinde',
    fichaRecomendadaId: 'fic-3',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'leve_ganhe',
    descontoSugestao: 0,
    precoSugestao: 48.00,
    brindeAtivo: true,
    brindeFichaId: 'fic-3',
    volumeSugerido: 40,
    estrategia: 'Incentive encomendas antecipadas com sinal de 50%. Ofereça caixa degustação como brinde para pedidos fechados com 10 dias de antecedência.'
  },
  {
    id: 'op-dia-das-maes',
    periodo: '2º Domingo de Maio',
    nome: 'Dia das Mães',
    icone: 'fa-heart',
    cor: 'pink',
    sugestao: 'Bolo Especial + Caixa c/ 4 Brigadeiros',
    fichaRecomendadaId: 'fic-2',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'combo',
    descontoSugestao: 10,
    precoSugestao: 105.00,
    brindeAtivo: true,
    brindeFichaId: 'fic-3',
    volumeSugerido: 35,
    estrategia: 'Combo presenteável: monte uma embalagem cartonada com fita e tag "Com Amor". Alto apelo emocional e ticket médio elevado.'
  },
  {
    id: 'op-namorados',
    periodo: '12 de Junho',
    nome: 'Dia dos Namorados',
    icone: 'fa-champagne-glasses',
    cor: 'rose',
    sugestao: 'Bolo Vulcão a Dois com Brinde Romântico',
    fichaRecomendadaId: 'fic-2',
    canalRecomendado: 'iFood',
    taxaRecomendada: 23,
    tipoMecanica: 'leve_ganhe',
    descontoSugestao: 0,
    precoSugestao: 110.00,
    brindeAtivo: true,
    brindeFichaId: 'fic-3',
    volumeSugerido: 30,
    estrategia: 'Dia de altíssima demanda no delivery. Mantenha o preço com a margem do app (23%) e use a caixinha de brigadeiros como cortesia exclusiva no iFood.'
  },
  {
    id: 'op-junina',
    periodo: 'Junho / Julho',
    nome: 'Festas Juninas & Julinas',
    icone: 'fa-fire',
    cor: 'amber',
    sugestao: 'Combos de Docinhos de Paçoca & Bolos Caseiros',
    fichaRecomendadaId: 'fic-1',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'percentual',
    descontoSugestao: 12,
    precoSugestao: 140.00,
    brindeAtivo: false,
    brindeFichaId: '',
    volumeSugerido: 25,
    estrategia: 'Vendas para festas corporativas e escolas. Desconto progressivo para pedidos a partir de 2 centos de docinhos típicos.'
  },
  {
    id: 'op-dia-dos-pais',
    periodo: '2º Domingo de Agosto',
    nome: 'Dia dos Pais',
    icone: 'fa-user-tie',
    cor: 'blue',
    sugestao: 'Caixa Degustação Cacau Belga & Café',
    fichaRecomendadaId: 'fic-3',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'combo',
    descontoSugestao: 0,
    precoSugestao: 32.00,
    brindeAtivo: false,
    brindeFichaId: '',
    volumeSugerido: 45,
    estrategia: 'Lembrancinhas com visual refinado e sóbrio. Ideal para vendas corporativas e presentear pais no almoço de domingo.'
  },
  {
    id: 'op-professores',
    periodo: '15 de Outubro',
    nome: 'Dia dos Professores',
    icone: 'fa-graduation-cap',
    cor: 'emerald',
    sugestao: 'Lembrancinhas em Escala (Caixinhas 4 Brigadeiros)',
    fichaRecomendadaId: 'fic-3',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'percentual',
    descontoSugestao: 15,
    precoSugestao: 22.00,
    brindeAtivo: false,
    brindeFichaId: '',
    volumeSugerido: 70,
    estrategia: 'Data de altíssimo volume e baixo CMV unitário. Famílias compram de 3 a 5 caixinhas para os professores. Excelente giro!'
  },
  {
    id: 'op-criancas',
    periodo: '12 de Outubro',
    nome: 'Dia das Crianças',
    icone: 'fa-cake-candles',
    cor: 'cyan',
    sugestao: 'Kit Confeiteiro Mirim (Bolo + Confeitos)',
    fichaRecomendadaId: 'fic-2',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'leve_ganhe',
    descontoSugestao: 0,
    precoSugestao: 88.00,
    brindeAtivo: true,
    brindeFichaId: 'fic-3',
    volumeSugerido: 20,
    estrategia: 'Venda uma experiência divertida! Caixa com bolo + bisnaga de brigadeiro e potinhos de confeitos para a criança confeitar com os pais.'
  },
  {
    id: 'op-black-friday',
    periodo: 'Novembro (Black Friday)',
    nome: 'Black Friday Confeiteira',
    icone: 'fa-tag',
    cor: 'slate',
    sugestao: 'Desconto Relâmpago nos Apps em Produtos de Alta Margem',
    fichaRecomendadaId: 'fic-1',
    canalRecomendado: 'iFood',
    taxaRecomendada: 23,
    tipoMecanica: 'percentual',
    descontoSugestao: 18,
    precoSugestao: 148.00,
    brindeAtivo: false,
    brindeFichaId: '',
    volumeSugerido: 45,
    estrategia: 'Use apenas receitas com margem líquida superior a 55% para não queimar caixa no delivery. O objetivo é capturar clientes para o Natal!'
  },
  {
    id: 'op-natal',
    periodo: 'Dezembro (Natal)',
    nome: 'Natal & Ceias de Fim de Ano',
    icone: 'fa-sleigh',
    cor: 'red',
    sugestao: 'Chocotones Recheados & Sobremesas na Taça',
    fichaRecomendadaId: 'fic-2',
    canalRecomendado: 'WhatsApp',
    taxaRecomendada: 0,
    tipoMecanica: 'combo',
    descontoSugestao: 0,
    precoSugestao: 115.00,
    brindeAtivo: true,
    brindeFichaId: 'fic-3',
    volumeSugerido: 60,
    estrategia: 'A época de maior faturamento do ano! Em vez de desconto, use brindes (mini caixinha natalina) para quem fechar com 50% de sinal antecipado.'
  }
];

// ==========================================
// CALENDÁRIO TEMÁTICO DA CONFEITARIA (base do Cardápio)
// Feriados fixos + móveis calculados + datas que vendem doce.
// `busca`: palavras-chave para casar com nome/categoria das fichas.
// ==========================================
const DATAS_TEMATICAS = [
  { id: 'dt-ano-novo', nome: 'Ano Novo', tipo: 'feriado', icone: 'fa-champagne-glasses', cor: 'amber', fixo: { dia: 1, mes: 1 }, descricao: 'Ceias e festas de Réveillon: sobremesas para compartilhar.', busca: ['bolo', 'torta', 'festa', 'travessa'], estrategia: 'Ofereça sobremesas grandes para ceia com encomenda até 28/12.', antecedencia: 10 },
  { id: 'dt-volta-aulas', nome: 'Volta às Aulas', tipo: 'tematica', icone: 'fa-school', cor: 'blue', fixo: { dia: 5, mes: 2 }, descricao: 'Lanches individuais e mini porções para a lancheira.', busca: ['mini', 'pote', 'bolo', 'cookie'], estrategia: 'Kits semanais de lanche com entrega na segunda-feira.', antecedencia: 7 },
  { id: 'dt-carnaval', nome: 'Carnaval', tipo: 'feriado', icone: 'fa-masks-theater', cor: 'purple', movel: 'carnaval', descricao: 'Docinhos coloridos para blocos e festas.', busca: ['brigadeiro', 'beijinho', 'docinho', 'cento'], estrategia: 'Centos coloridos por tema de bloco, pronta-entrega no fim de semana.', antecedencia: 10 },
  { id: 'dt-mulher', nome: 'Dia da Mulher', tipo: 'tematica', icone: 'fa-venus', cor: 'pink', fixo: { dia: 8, mes: 3 }, descricao: 'Mimos e caixinhas para empresas e parceiros.', busca: ['morango', 'coração', 'presente', 'bolo'], estrategia: 'Prospecção B2B: caixinhas corporativas para empresas da região.', antecedencia: 12 },
  { id: 'dt-pascoa', nome: 'Páscoa', tipo: 'tematica', icone: 'fa-egg', cor: 'amber', movel: 'pascoa', descricao: 'A data mais doce do ano: ovos de colher e mini ovos.', busca: ['chocolate', 'ovo', 'colher', 'trufado'], estrategia: 'Encomendas antecipadas com 50% de sinal + brinde para fechar cedo.', antecedencia: 21 },
  { id: 'dt-tiradentes', nome: 'Tiradentes', tipo: 'feriado', icone: 'fa-flag', cor: 'slate', fixo: { dia: 21, mes: 4 }, descricao: 'Feriadão: viagens e visitas pedem bolo de pote e pronta-entrega.', busca: ['pote', 'bolo', 'viagem'], estrategia: 'Pronta-entrega no fim de semana prolongado, sem encomenda.', antecedencia: 4 },
  { id: 'dt-trabalho', nome: 'Dia do Trabalho', tipo: 'feriado', icone: 'fa-briefcase', cor: 'slate', fixo: { dia: 1, mes: 5 }, descricao: 'Feriado de meio de semana: movimento de última hora.', busca: ['bolo', 'pote', 'torta'], estrategia: 'Cardápio enxuto de pronta-entrega, foco no WhatsApp.', antecedencia: 4 },
  { id: 'dt-maes', nome: 'Dia das Mães', tipo: 'tematica', icone: 'fa-heart', cor: 'rose', movel: 'maes', descricao: 'Segunda data mais forte: corações, flores e café da manhã.', busca: ['coração', 'morango', 'presente', 'bolo', 'café'], estrategia: 'Cestas de café da manhã + bolo coração; sinal de 50% para garantir.', antecedencia: 18 },
  { id: 'dt-namorados', nome: 'Dia dos Namorados', tipo: 'tematica', icone: 'fa-heart-crack', cor: 'red', fixo: { dia: 12, mes: 6 }, descricao: 'Morango + chocolate: combos românticos para dois.', busca: ['morango', 'chocolate', 'coração', 'bolo'], estrategia: 'Combo casal (bolo + 4 doces) com entrega agendada no dia.', antecedencia: 12 },
  { id: 'dt-junina', nome: 'Festa Junina', tipo: 'tematica', icone: 'fa-fire', cor: 'amber', fixo: { dia: 24, mes: 6 }, descricao: 'Amendoim, paçoca e milho em versão confeitaria o mês todo.', busca: ['amendoim', 'paçoca', 'milho', 'bolo', 'pé'], estrategia: 'Linha junina no cardápio de junho inteiro, não só no dia.', antecedencia: 10 },
  { id: 'dt-inverno', nome: 'Clima de Inverno', tipo: 'tematica', icone: 'fa-mug-hot', cor: 'blue', fixo: { dia: 10, mes: 7 }, descricao: 'Frio pede chocolate quente em forma de bolo: vulcões e caldas.', busca: ['chocolate', 'vulcão', 'bolo', 'cenoura'], estrategia: 'Destaque nos bolos de chocolate com calha extra no delivery.', antecedencia: 5 },
  { id: 'dt-pais', nome: 'Dia dos Pais', tipo: 'tematica', icone: 'fa-shirt', cor: 'blue', movel: 'pais', descricao: 'Chocolate intenso e cerveja na massa: linha masculina.', busca: ['chocolate', 'bolo', 'torta'], estrategia: 'Versão "pai": bolo vulcão + cerveja artesanal de parceiro.', antecedencia: 14 },
  { id: 'dt-brigadeiro', nome: 'Dia do Brigadeiro', tipo: 'tematica', icone: 'fa-candy-cane', cor: 'purple', fixo: { dia: 10, mes: 9 }, descricao: 'Data oficial do doce mais amado: edições especiais.', busca: ['brigadeiro', 'gourmet', 'cento'], estrategia: 'Sabores limitados só nesta semana + combo degustação.', antecedencia: 7 },
  { id: 'dt-independencia', nome: 'Independência', tipo: 'feriado', icone: 'fa-flag', cor: 'slate', fixo: { dia: 7, mes: 9 }, descricao: 'Feriado: pronta-entrega e encomendas de festa.', busca: ['bolo', 'torta', 'pote'], estrategia: 'Pronta-entrega no feriado, sem temática específica.', antecedencia: 4 },
  { id: 'dt-primavera', nome: 'Chegada da Primavera', tipo: 'tematica', icone: 'fa-seedling', cor: 'emerald', fixo: { dia: 23, mes: 9 }, descricao: 'Flores e frutas frescas: morango, limão e maracujá.', busca: ['morango', 'limão', 'maracujá', 'fruta', 'bolo'], estrategia: 'Linha fresca/frutada para sair do chocolate do inverno.', antecedencia: 7 },
  { id: 'dt-outubro-rosa', nome: 'Outubro Rosa (mês)', tipo: 'campanha', icone: 'fa-ribbon', cor: 'pink', fixo: { dia: 1, mes: 10 }, descricao: 'Mês de conscientização: doces rosas com propósito.', busca: ['morango', 'rosa', 'brigadeiro'], estrategia: 'Parte da renda de um produto rosa para a causa + divulgação.', antecedencia: 10 },
  { id: 'dt-criancas', nome: 'N. Sra. Aparecida / Dia das Crianças', tipo: 'feriado', icone: 'fa-children', cor: 'cyan', fixo: { dia: 12, mes: 10 }, descricao: 'Festas infantis: kits festa e doces decorados.', busca: ['festa', 'brigadeiro', 'beijinho', 'cento', 'bolo'], estrategia: 'Kit festa infantil (bolo + 50 doces) com tema da criança.', antecedencia: 14 },
  { id: 'dt-halloween', nome: 'Halloween', tipo: 'tematica', icone: 'fa-ghost', cor: 'purple', fixo: { dia: 31, mes: 10 }, descricao: 'Doces ou travessuras: decoração divertida vende.', busca: ['chocolate', 'brigadeiro', 'decorado'], estrategia: 'Caixinha travessura com doces decorados, edição limitada.', antecedencia: 10 },
  { id: 'dt-finados', nome: 'Finados', tipo: 'feriado', icone: 'fa-cross', cor: 'slate', fixo: { dia: 2, mes: 11 }, descricao: 'Data sensível: operação normal, sem promoção temática.', busca: ['bolo', 'torta'], estrategia: 'Sem ação temática; mantenha o cardápio regular.', antecedencia: 0 },
  { id: 'dt-blackfriday', nome: 'Black Friday', tipo: 'tematica', icone: 'fa-bag-shopping', cor: 'red', movel: 'blackfriday', descricao: 'Queima de estoque e combos agressivos de fim de ano.', busca: ['combo', 'cento', 'brigadeiro', 'promoção'], estrategia: 'Combo com margem mínima de 22% (valide no simulador).', antecedencia: 10 },
  { id: 'dt-consciencia', nome: 'Consciência Negra', tipo: 'feriado', icone: 'fa-flag', cor: 'slate', fixo: { dia: 20, mes: 11 }, descricao: 'Feriado: pronta-entrega e encomendas.', busca: ['bolo', 'torta', 'pote'], estrategia: 'Pronta-entrega no feriado, sem temática específica.', antecedencia: 4 },
  { id: 'dt-natal', nome: 'Natal', tipo: 'tematica', icone: 'fa-gifts', cor: 'red', fixo: { dia: 25, mes: 12 }, descricao: 'Pico de faturamento: presentes comestíveis e ceias.', busca: ['chocolate', 'presente', 'bolo', 'natal', 'panetone'], estrategia: 'Catálogo de presentes com faixas de preço + entrega agendada.', antecedencia: 25 }
];

// Feriados móveis calculados (Páscoa pelo algoritmo de Meeus; demais por deslocamento)
function pascoaISO(ano) {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function somarDiasISO(iso, n) {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function enesimoDiaSemanaISO(ano, mes, diaSemana, n) {
  // n-ésimo `diaSemana` (0=dom) do mês. Ex: 2º domingo de maio.
  const d = new Date(ano, mes - 1, 1);
  let count = 0;
  while (true) {
    if (d.getDay() === diaSemana) {
      count++;
      if (count === n) break;
    }
    d.setDate(d.getDate() + 1);
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function ultimaSextaNovembroBlackFriday(ano) {
  // Black Friday = 4ª sexta-feira de novembro
  return enesimoDiaSemanaISO(ano, 11, 5, 4);
}

// Resolve a data ISO de uma entrada temática no ano informado
function resolverDataTematica(entry, ano) {
  if (entry.fixo) return `${ano}-${String(entry.fixo.mes).padStart(2, '0')}-${String(entry.fixo.dia).padStart(2, '0')}`;
  const pascoa = pascoaISO(ano);
  if (entry.movel === 'pascoa') return pascoa;
  if (entry.movel === 'carnaval') return somarDiasISO(pascoa, -47);
  if (entry.movel === 'corpus') return somarDiasISO(pascoa, 60);
  if (entry.movel === 'maes') return enesimoDiaSemanaISO(ano, 5, 0, 2);
  if (entry.movel === 'pais') return enesimoDiaSemanaISO(ano, 8, 0, 2);
  if (entry.movel === 'blackfriday') return ultimaSextaNovembroBlackFriday(ano);
  return null;
}

// Todas as datas de um mês, ordenadas, com contagem regressiva
function datasTematicasDoMes(ano, mes) {
  const hoje = diaISO(0);
  return DATAS_TEMATICAS
    .map(e => ({ entry: e, iso: resolverDataTematica(e, ano) }))
    .filter(x => x.iso && Number(x.iso.split('-')[1]) === mes)
    .sort((a, b) => a.iso.localeCompare(b.iso))
    .map(x => {
      const diff = Math.round((new Date(x.iso + 'T12:00:00') - new Date(hoje + 'T12:00:00')) / 86400000);
      return { ...x, diff };
    });
}

// Próximas datas (para o sino): inclui antecedência de divulgação
function proximasDatasTematicas(dias = 21) {
  const hoje = diaISO(0);
  const ano = new Date().getFullYear();
  const out = [];
  [ano, ano + 1].forEach(a => {
    DATAS_TEMATICAS.forEach(e => {
      const iso = resolverDataTematica(e, a);
      if (!iso) return;
      const diff = Math.round((new Date(iso + 'T12:00:00') - new Date(hoje + 'T12:00:00')) / 86400000);
      if (diff >= 0 && diff <= dias) out.push({ entry: e, iso, diff });
    });
  });
  return out.sort((a, b) => a.diff - b.diff);
}

function rotuloCountdown(diff) {
  if (diff === 0) return 'é hoje! 🎉';
  if (diff === 1) return 'é amanhã';
  if (diff > 1) return `em ${diff} dias`;
  if (diff === -1) return 'foi ontem';
  return `há ${Math.abs(diff)} dias`;
}

// ESTADO GLOBAL
let insumos = [];
let fichas = [];
let pedidos = [];
let lancamentos = [];
let metas = {};
let promocoes = [];
let clientes = [];
let currentTab = 'dashboard';

// ESTADO DO CARDÁPIO (planejador mensal + semanal)
// Persistência só-local (confeitaria_cardapios): sobrevive ao sync do Supabase.
// Cardápio = grade de produção: { 'YYYY-MM-DD': { fichaId: quantidade } }
let cardapios = {};
let cardapioMes = new Date().toISOString().slice(0, 7); // YYYY-MM
let cardapioSemanaOffset = 0; // 0 = semana atual, ±n semanas
let cardapioFiltro = ''; // busca por nome do produto
let cardapioSoEscalados = false; // mostra só linhas com quantidade > 0

// Aceita o formato antigo (array de ids) e converte para o novo (objeto fichaId → qtd)
function normalizarCardapios(bruto) {
  const out = {};
  Object.keys(bruto || {}).forEach(iso => {
    const dia = bruto[iso];
    if (Array.isArray(dia)) {
      if (!dia.length) return;
      out[iso] = {};
      dia.forEach(id => { out[iso][id] = 1; });
    } else if (dia && typeof dia === 'object') {
      const limpo = {};
      Object.keys(dia).forEach(id => {
        const q = Math.max(0, Number(dia[id]) || 0);
        if (q > 0) limpo[id] = q;
      });
      if (Object.keys(limpo).length) out[iso] = limpo;
    }
  });
  return out;
}

function carregarCardapios() {
  try {
    cardapios = normalizarCardapios(JSON.parse(localStorage.getItem('confeitaria_cardapios')));
  } catch (e) { cardapios = {}; }
}

function salvarCardapios() {
  try {
    localStorage.setItem('confeitaria_cardapios', JSON.stringify(cardapios));
    setStatusSalvo('ok', 'Cardápio salvo ✓');
  } catch (e) { /* armazenamento cheio: mantém em memória */ }
}

// Segunda-feira da semana (offset em semanas a partir da atual)
function segundaDaSemana(offset = 0) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const dow = (d.getDay() + 6) % 7; // 0 = segunda
  d.setDate(d.getDate() - dow + offset * 7);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function diasDaSemanaCardapio(offset = 0) {
  const seg = segundaDaSemana(offset);
  return Array.from({ length: 7 }, (_, i) => somarDiasISO(seg, i));
}

// Casa fichas com as palavras-chave da data e ordena por margem (com preço primeiro)
function sugerirFichasParaData(entry, limite = 3) {
  if (!fichas.length || !entry.busca) return [];
  const kws = entry.busca.map(k => String(k).toLowerCase());
  const pontuadas = [];
  fichas.forEach(f => {
    const nome = String(f.nome || '').toLowerCase();
    const cat = String(f.categoria || '').toLowerCase();
    let pts = 0;
    kws.forEach(k => {
      if (nome.includes(k)) pts += 2;
      else if (cat.includes(k)) pts += 1;
    });
    if (pts <= 0) return;
    const rend = Number(f.rendimento) > 0 ? Number(f.rendimento) : 1;
    const cmvU = calcularCMVFicha(f) / rend;
    const preco = Number(f.precoPraticado) || 0;
    const margem = preco > 0 ? ((preco - cmvU) / preco) * 100 : null;
    pontuadas.push({ ficha: f, pts, cmvU, preco, margem });
  });
  pontuadas.sort((a, b) => {
    if ((a.margem ?? -1) !== (b.margem ?? -1)) return (b.margem ?? -1) - (a.margem ?? -1);
    return b.pts - a.pts;
  });
  return pontuadas.slice(0, limite);
}

// Data temática (se houver) para um dia ISO — usada como selo na semana
function tematicaDoDia(iso) {
  const ano = Number(iso.split('-')[0]);
  const hit = DATAS_TEMATICAS
    .map(e => ({ entry: e, d: resolverDataTematica(e, ano) }))
    .find(x => x.d === iso);
  return hit ? hit.entry : null;
}

// PLANOS DE ENTREGA (comissão + 3,2% pagamento online)
// iFood Básico (própria): 12% + 3,2% (+R$ 110/mês se faturar +R$ 1.800)
// iFood Entrega (plataforma): 23% + 3,2%
// 99 Marketplace (própria): 10,9% + 3,2% • 99 Full (plataforma): 8,9% + 3,2% (+ custo logístico variável)
const TAXAS_DELIVERY = {
  iFood: {
    plataforma: { comissao: 23, pagamento: 3.2, rotulo: 'Entrega iFood' },
    propria: { comissao: 12, pagamento: 3.2, rotulo: 'Básico iFood' }
  },
  '99Food': {
    plataforma: { comissao: 8.9, pagamento: 3.2, rotulo: 'Full Service 99' },
    propria: { comissao: 10.9, pagamento: 3.2, rotulo: 'Marketplace 99' }
  }
};
let planoEntrega = localStorage.getItem('confeitaria_plano_entrega') || 'plataforma'; // 'plataforma' | 'propria'
if (!['plataforma', 'propria'].includes(planoEntrega)) planoEntrega = 'plataforma';

function detalheTaxaCanal(canal) {
  const t = TAXAS_DELIVERY[canal];
  if (!t) return { total: 0, rotulo: 'Venda direta (sem taxa)' };
  const p = t[planoEntrega] || t.plataforma;
  return {
    total: +((p.comissao + p.pagamento).toFixed(2)),
    rotulo: `${p.rotulo} (${String(p.comissao).replace('.', ',')}% + ${String(p.pagamento).replace('.', ',')}%)`
  };
}

function taxaEfetivaCanal(canal) {
  return detalheTaxaCanal(canal).total;
}

// ==========================================
// IDENTIDADE DA MARCA (aba Marca)
// Alimenta etiquetas, ficha, cardápio, apresentação e WhatsApp.
// ==========================================
const MARCA_PADRAO = {
  nome: '',
  slogan: '',
  logo: '',
  corPrincipal: '#C65D3A',
  corSecundaria: '#3E2A23',
  corFundo: '#FFF8F1',
  whatsapp: '',
  instagram: '',
  cidade: '',
  desde: '',
  usarLogoEtiquetas: true,
  usarLogoCardapio: true,
  usarAssinatura: true
};
let marca = { ...MARCA_PADRAO };

function marcaPreta() { return !!(marca.nome || marca.logo); }
function corMarca(campo = 'corPrincipal') {
  const v = String(marca[campo] || '').trim();
  return /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : MARCA_PADRAO[campo];
}

// Contato em uma linha, usado nos rodapés de impressão e no WhatsApp
function assinaturaMarca() {
  const partes = [];
  if (marca.whatsapp) partes.push('WhatsApp ' + marca.whatsapp);
  if (marca.instagram) partes.push(marca.instagram);
  if (marca.cidade) partes.push(marca.cidade);
  return partes.join(' • ');
}

// Cabeçalho reutilizável (etiqueta / ficha / impressão)
function cabecalhoMarca(tamanho = 'normal') {
  if (!marcaPreta()) return '';
  const grande = tamanho === 'grande';
  const comLogo = marca.logo && marca.usarLogoEtiquetas;
  return `<div class="marca-cabecalho" style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
    ${comLogo ? `<img src="${esc(marca.logo)}" alt="" style="width:${grande ? 64 : 44}px;height:auto;object-fit:contain" />` : ''}
    <div style="text-align:left">
      <div style="font-family:Georgia,serif;font-weight:800;font-size:${grande ? 22 : 16}px;color:${corMarca('corSecundaria')}">${esc(marca.nome)}</div>
      ${marca.slogan ? `<div style="font-size:${grande ? 13 : 11}px;color:${corMarca('corPrincipal')}">${esc(marca.slogan)}</div>` : ''}
    </div>
  </div>`;
}

// Rodapé com contato (usado nas impressões)
function rodapeMarca() {
  const a = assinaturaMarca();
  if (!a || !marca.usarAssinatura) return '';
  return `<p style="margin-top:10px;font-size:11px;text-align:center;color:#666">${esc(a)}</p>`;
}

// ==========================================
// ABA MARCA — identidade visual que aparece nos impressos
// ==========================================
// Lê o formulário para o estado SEM perder nada (preserva a logo já enviada)
function lerMarcaDoFormulario() {
  const val = (id) => (document.getElementById(id)?.value || '').trim();
  const el = (id) => document.getElementById(id);
  marca = {
    ...marca,
    nome: val('mkNome'),
    slogan: val('mkSlogan'),
    corPrincipal: el('mkCor1')?.value || marca.corPrincipal,
    corSecundaria: el('mkCor2')?.value || marca.corSecundaria,
    corFundo: el('mkCor3')?.value || marca.corFundo,
    whatsapp: val('mkWhats'),
    instagram: val('mkInsta'),
    cidade: val('mkCidade'),
    desde: val('mkDesde'),
    usarLogoEtiquetas: el('mkLogoEt') ? !!el('mkLogoEt').checked : marca.usarLogoEtiquetas,
    usarLogoCardapio: el('mkLogoCard') ? !!el('mkLogoCard').checked : marca.usarLogoCardapio,
    usarAssinatura: el('mkAssinatura') ? !!el('mkAssinatura').checked : marca.usarAssinatura
  };
}

function salvarMarca() {
  lerMarcaDoFormulario();
  saveData(STORAGE_KEYS.MARCA);
  renderMarca();
  showToast('Identidade da marca salva!');
}

// Chamado a cada tecla: sincroniza o estado e atualiza SÓ a prévia (sem redesenhar = sem perder o foco)
function aoDigitarMarca() {
  lerMarcaDoFormulario();
  atualizarPreviaMarca();
}

// Alternar "onde a marca aparece": sincroniza antes de redesenhar para não perder o digitado
function aoAlternarMarca() {
  lerMarcaDoFormulario();
  renderMarca();
}

// Redimensiona a logo no navegador (mantém o banco leve) e devolve dataURL
function processarLogoMarca(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (!/^image\//.test(file.type)) { showToast('Selecione um arquivo de imagem.', false); return; }
  if (file.size > 8 * 1024 * 1024) { showToast('Imagem muito grande (máx. 8 MB).', false); input.value = ''; return; }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxL = 480;
      const escala = Math.min(1, maxL / Math.max(img.width, img.height));
      const cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(img.width * escala));
      cv.height = Math.max(1, Math.round(img.height * escala));
      const ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      lerMarcaDoFormulario();
      marca.logo = cv.toDataURL('image/png');
      renderMarca();
      showToast('Logo atualizada! Não esqueça de salvar.');
    };
    img.onerror = () => showToast('Não consegui ler essa imagem.', false);
    img.src = reader.result;
  };
  reader.onerror = () => showToast('Falha ao ler o arquivo.', false);
  reader.readAsDataURL(file);
}

function removerLogoMarca() {
  lerMarcaDoFormulario();
  marca.logo = '';
  renderMarca();
}

function restaurarCoresTema() {
  lerMarcaDoFormulario();
  marca.corPrincipal = MARCA_PADRAO.corPrincipal;
  marca.corSecundaria = MARCA_PADRAO.corSecundaria;
  marca.corFundo = MARCA_PADRAO.corFundo;
  renderMarca();
}

const campo = (id, label, valor, placeholder = '', tipo = 'text') => `
  <div>
    <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
    <input type="${tipo}" id="${id}" value="${esc(valor)}" placeholder="${esc(placeholder)}" oninput="aoDigitarMarca()" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:border-[#C65D3A] focus:outline-none" />
  </div>`;

const campoCor = (id, label, valor) => `
  <div>
    <label class="block text-xs font-semibold text-slate-700 mb-1">${label}</label>
    <div class="flex items-center gap-2">
      <input type="color" id="${id}" value="${corMarca(id === 'mkCor1' ? 'corPrincipal' : id === 'mkCor2' ? 'corSecundaria' : 'corFundo')}" oninput="document.getElementById('${id}Texto').value=this.value; aoDigitarMarca()" class="w-11 h-9 rounded-lg border border-slate-300 cursor-pointer p-1 bg-white" />
      <input type="text" id="${id}Texto" value="${esc(corMarca(id === 'mkCor1' ? 'corPrincipal' : id === 'mkCor2' ? 'corSecundaria' : 'corFundo'))}" oninput="document.getElementById('${id}').value=this.value; aoDigitarMarca()" class="w-28 border border-slate-300 rounded-lg px-2 py-2 text-xs font-mono uppercase text-slate-700 focus:border-[#C65D3A] focus:outline-none" />
    </div>
  </div>`;

function renderMarca() {
  const container = document.getElementById('tab-marca');
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Identidade da Marca</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Preencha uma vez: identidade aparece nas etiquetas, fichas, cardápio e no Modo Apresentar</p>
      </div>
      <button onclick="salvarMarca()" class="px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs transition-all cursor-pointer" style="background:linear-gradient(135deg,#D96C75,#C65D3A)">
        <i class="fa-solid fa-check"></i> Salvar identidade
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Formulário -->
      <div class="lg:col-span-7 space-y-4">
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-signature text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Nome e assinatura</h3>
          </div>
          ${campo('mkNome', 'Nome da marca (nome fantasia)', marca.nome, 'Ex: Doce Mel')}
          ${campo('mkSlogan', 'Assinatura / slogan', marca.slogan, 'Ex: Feito à mão, com calma')}
          <div class="grid grid-cols-2 gap-3">
            ${campo('mkDesde', 'Desde (opcional)', marca.desde, 'Ex: 2021')}
            ${campo('mkCidade', 'Cidade / bairro', marca.cidade, 'Ex: Centro — SP')}
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-image text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Logo</h3>
            </div>
            ${marca.logo ? `<button onclick="removerLogoMarca()" class="text-[11px] font-bold text-red-500 hover:text-red-700 cursor-pointer">Remover</button>` : ''}
          </div>
          <div class="flex items-center gap-4">
            <div class="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
              ${marca.logo ? `<img src="${esc(marca.logo)}" alt="Logo" class="max-w-full max-h-full object-contain p-1" />` : '<i class="fa-solid fa-cloud-arrow-up text-slate-300 text-xl"></i>'}
            </div>
            <div class="text-xs text-slate-500 space-y-1.5">
              <p>PNG ou JPG com fundo transparente (quadrado ~500px).</p>
              <p>A imagem é reduzida no navegador antes de salvar, então não pesa no banco.</p>
              <label class="inline-block px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer">
                <i class="fa-solid fa-upload"></i> Escolher imagem
                <input type="file" accept="image/*" class="hidden" onchange="processarLogoMarca(this)" />
              </label>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-palette text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Cores</h3>
            </div>
            <button onclick="restaurarCoresTema()" class="text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer">Voltar ao tema do app</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${campoCor('mkCor1', 'Principal', marca.corPrincipal)}
            ${campoCor('mkCor2', 'Textos', marca.corSecundaria)}
            ${campoCor('mkCor3', 'Fundo', marca.corFundo)}
          </div>
          <p class="text-[11px] text-slate-400">
            Dica: a principal é o acento (chamadas, botões), a de textos dá contraste e o fundo é a cor do papel/caixa.
          </p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <i class="fa-solid fa-address-book text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Contato</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${campo('mkWhats', 'WhatsApp (com DDD)', marca.whatsapp, 'Ex: (11) 98888-7777')}
            ${campo('mkInsta', 'Instagram', marca.instagram, 'Ex: @docemel')}
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <i class="fa-solid fa-eye text-[#C65D3A]"></i>
            <h3 class="font-bold text-slate-900 text-sm">Onde a marca aparece</h3>
          </div>
          <div class="pt-3 space-y-2.5">
            ${[
              ['mkLogoEt', 'Logo nas etiquetas e fichas impressas', marca.usarLogoEtiquetas],
              ['mkLogoCard', 'Logo no cardápio e no Modo Apresentar', marca.usarLogoCardapio],
              ['mkAssinatura', 'Contato no rodapé dos impressos', marca.usarAssinatura]
            ].map(([id, l, v]) => `
              <label class="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input type="checkbox" id="${id}" ${v ? 'checked' : ''} onchange="aoAlternarMarca()" class="w-4 h-4 accent-[#C65D3A]" />
                ${l}
              </label>`).join('')}
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-5 space-y-4">
        <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-20">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-mobile-screen text-[#C65D3A]"></i>
              <h3 class="font-bold text-slate-900 text-sm">Prévia</h3>
            </div>
            <span class="text-[10px] text-slate-400">aparece ao salvar</span>
          </div>

          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1.5">Etiqueta de pedido</p>
          <div class="rounded-xl border border-dashed border-slate-200 p-3 bg-white" id="pvEtiqueta">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              ${marca.logo && marca.usarLogoEtiquetas ? `<img src="${esc(marca.logo)}" style="width:34px;height:auto;object-fit:contain" />` : ''}
              <div>
                <div data-pv="nome" style="font-family:Georgia,serif;font-weight:800;font-size:15px;color:${corMarca('corSecundaria')}">${esc(marca.nome || 'Nome da marca')}</div>
                <div data-pv="slogan" style="font-size:10px;color:${corMarca('corPrincipal')}">${esc(marca.slogan || 'sua assinatura aqui')}</div>
              </div>
            </div>
            <p class="text-[11px] text-slate-600">Ana Souza</p>
            <p class="text-[11px] text-slate-600">2x Bolo Vulcão • 1x Caixa Presente</p>
            <p data-pv="assinatura" class="text-[10px] text-slate-400 mt-2">${esc(assinaturaMarca() || 'seu contato aqui')}</p>
          </div>

          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-4 mb-1.5">Cabeçalho do cardápio</p>
          <div class="rounded-xl border border-dashed border-slate-200 p-4" id="pvCardapio" style="background:${corMarca('corFundo')}">
            <div class="flex items-center gap-2.5">
              ${marca.logo && marca.usarLogoCardapio ? `<img src="${esc(marca.logo)}" style="width:40px;height:auto;object-fit:contain" />` : ''}
              <div>
                <div data-pv="nome" style="font-family:Georgia,serif;font-weight:800;font-size:16px;color:${corMarca('corSecundaria')}">${esc(marca.nome || 'Nome da marca')}</div>
                <div data-pv="slogan" style="font-size:11px;color:${corMarca('corPrincipal')}">${esc(marca.slogan || 'sua assinatura aqui')}</div>
              </div>
            </div>
            <div class="grid grid-cols-7 gap-1 mt-3">
              ${['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map(d => `<div class="text-center text-[9px] font-black py-1 rounded" style="background:${corMarca('corPrincipal')};color:#fff">${d}</div>`).join('')}
            </div>
          </div>

          <p class="text-[11px] text-slate-400 mt-4 leading-relaxed">
            A identidade é usada na impressão de etiquetas e fichas, no cardápio, no Modo Apresentar e na assinatura do WhatsApp.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Atualiza SÓ a prévia (textos + cores), sem redesenhar = sem perder o foco do que digita
function atualizarPreviaMarca() {
  const c1 = corMarca('corPrincipal');
  const c2 = corMarca('corSecundaria');
  const c3 = corMarca('corFundo');
  document.querySelectorAll('#pvEtiqueta [data-pv="nome"], #pvCardapio [data-pv="nome"]').forEach(el => {
    el.textContent = marca.nome || 'Nome da marca';
    el.style.color = c2;
  });
  document.querySelectorAll('[data-pv="slogan"]').forEach(el => {
    el.textContent = marca.slogan || 'sua assinatura aqui';
    el.style.color = c1;
  });
  document.querySelectorAll('[data-pv="assinatura"]').forEach(el => {
    el.textContent = assinaturaMarca() || 'seu contato aqui';
  });
  const card = document.getElementById('pvCardapio');
  if (card) card.style.background = c3;
  document.querySelectorAll('#pvCardapio .grid > div').forEach(el => el.style.background = c1);
}

// ==========================================
// LUCRO POR PEDIDO (tempo real no Kanban)
// ==========================================
function lucroPorPedido(p) {
  const fin = calcularFinanceiroPedido(p);
  const margem = fin.total > 0 ? (fin.lucroLiquido / fin.total) * 100 : 0;
  return { total: fin.total, cmvTotal: fin.cmvTotal, taxaApp: fin.taxaApp, lucro: fin.lucroLiquido, margem };
}

// Selo de margem com semáforo (verde >= 40%, azul >= 22%, vermelho abaixo)
function seloMargemPedido(p) {
  const L = lucroPorPedido(p);
  const cls = L.margem >= 40 ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : L.margem >= 22 ? 'bg-blue-100 text-blue-800 border-blue-200'
    : 'bg-red-100 text-red-800 border-red-200';
  const icone = L.margem >= 22 ? 'fa-circle-check' : 'fa-triangle-exclamation';
  return { L, html: `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${cls}" title="Lucro ${formatMoeda(L.lucro)} sobre ${formatMoeda(L.total)}"><i class="fa-solid ${icone}"></i> ${L.margem.toFixed(0)}%</span>` };
}

// ==========================================
// REAJUSTE AUTOMÁTICO DE PREÇO (mantém margem)
// ==========================================
function sugerirReajustePreco(ficha) {
  if (!ficha) return null;
  const cmv = calcularCMVFicha(ficha);
  const rend = Number(ficha.rendimento) > 0 ? Number(ficha.rendimento) : 1;
  const cmvU = cmv / rend;
  const margemAlvo = ((Number(ficha.margemAlvo) || 60) / 100);
  const precoAtual = Number(ficha.precoPraticado) || 0;
  const precoSugerido = margemAlvo < 1 ? cmvU / (1 - margemAlvo) : cmvU * 2.5;
  const diferenca = precoSugerido - precoAtual;
  const pct = precoAtual > 0 ? (diferenca / precoAtual) * 100 : 0;
  return { cmvU, margemAlvo, precoAtual, precoSugerido, diferenca, pct };
}

// Aplica o reajuste sugerido em uma ficha (sem taxa de canal)
function aplicarReajustePreco(fichaId) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) { showToast('Ficha não encontrada.', false); return; }
  const s = sugerirReajustePreco(f);
  if (!s) return;
  if (Math.abs(s.diferenca) < 0.5) { showToast('Preço já está alinhado com a margem alvo.'); return; }
  if (!confirm(`Ajustar "${f.nome}" de ${formatMoeda(s.precoAtual)} para ${formatMoeda(s.precoSugerido)}?\n\nMantém a margem alvo de ${Math.round(s.margemAlvo * 100)}% sobre o CMV atual.`)) return;
  f.precoPraticado = Math.round(s.precoSugerido * 100) / 100;
  saveData(STORAGE_KEYS.FICHAS);
  renderCurrentTab();
  showToast(`Preço de "${f.nome}" ajustado para ${formatMoeda(f.precoPraticado)}!`);
}

// ==========================================
// ASSISTENTE POR VOZ/TEXTO (cria pedido e escala produção)
// ==========================================
let assistenteOuvindo = false;

function mostrarBarraAssistente() {
  const bar = document.getElementById('assistenteBar');
  if (!bar) return;
  bar.classList.remove('hidden');
  const inp = document.getElementById('assistenteInput');
  if (inp) setTimeout(() => inp.focus(), 60);
}

function alternarAssistente() {
  const btn = document.getElementById('btnAssistente');
  mostrarBarraAssistente();
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    showToast('Sem voz neste navegador — digite o pedido no campo abaixo.');
    return;
  }
  if (assistenteOuvindo) { pararAssistente(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = 'pt-BR';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  assistenteOuvindo = true;
  if (btn) {
    btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-orange-50');
    btn.classList.add('animate-pulse', 'bg-red-500', 'text-white');
    btn.title = 'Ouvindo… clique para parar';
    btn.setAttribute('aria-label', 'Parar de ouvir');
  }
  const inp = document.getElementById('assistenteInput');
  if (inp) inp.placeholder = 'Ouvindo… fale agora 🎙️';
  rec.onresult = (e) => {
    const texto = e.results[0][0].transcript;
    document.getElementById('assistenteInput').value = texto;
    processarAssistente(texto);
  };
  rec.onerror = () => { pararAssistente(); showToast('Não consegui ouvir. Tente de novo ou digite.', false); };
  rec.onend = () => pararAssistente();
  rec.start();
}

function pararAssistente() {
  assistenteOuvindo = false;
  const btn = document.getElementById('btnAssistente');
  if (btn) {
    btn.classList.remove('animate-pulse', 'bg-red-500', 'text-white');
    btn.classList.add('bg-white', 'text-slate-700', 'hover:bg-orange-50');
    btn.innerHTML = '<i class="fa-solid fa-microphone text-base"></i>';
    btn.title = 'Assistente por voz: diga o que produzir';
    btn.setAttribute('aria-label', 'Assistente por voz');
  }
  const inp = document.getElementById('assistenteInput');
  if (inp) inp.placeholder = 'Ex: "20 brigadeiros sábado 14h" e Enter cria o pedido';
}

// Interpreta "20 brigadeiros sábado 14h" / "bolo de chocolate 20 unidades amanhã"
function processarAssistente(texto) {
  const t = String(texto || '').toLowerCase().trim();
  if (!t) return;
  const qtdMatch = t.match(/(\d+)\s*(un|unidades|unid|pç|pecas?|peças)?/);
  const qtd = qtdMatch ? Math.max(1, parseInt(qtdMatch[1], 10)) : 1;
  const ficha = fichas.find(f => t.includes(f.nome.toLowerCase())) || fichas[0];
  if (!ficha) { showToast('Cadastre fichas para o assistente funcionar.', false); return; }
  const hoje = new Date();
  let dataEntrega = diaISO(0);
  if (/amanh/.test(t)) dataEntrega = diaISO(1);
  else if (/depois de amanh/.test(t)) dataEntrega = diaISO(2);
  const horaMatch = t.match(/(\d{1,2})[:h](\d{2})?/);
  const horaEntrega = horaMatch ? `${horaMatch[1].padStart(2, '0')}:${(horaMatch[2] || '00').padStart(2, '0')}` : '12:00';
  const precoUnit = Number(ficha.precoPraticado) || 0;
  const valorTotal = qtd * precoUnit;
  const novo = {
    id: 'ped-' + Date.now(),
    cliente: 'Cliente (assistente)',
    telefone: '',
    dataEntrega, horaEntrega,
    status: 'aguardando',
    canal: 'WhatsApp',
    taxaPercentual: 0,
    valorTotal, valorSinal: 0,
    estoqueBaixado: false,
    itens: [{ fichaId: ficha.id, nome: ficha.nome, qtd, precoUnit }],
    observacoes: `Criado pelo assistente: "${texto}"`
  };
  pedidos.unshift(novo);
  saveData(STORAGE_KEYS.PEDIDOS);
  renderCurrentTab();
  showToast(`Pedido criado: ${qtd}x ${ficha.nome} para ${dataEntrega.split('-').reverse().join('/')} às ${horaEntrega}`);
}

// ==========================================
// RELATÓRIO PRO CONTADOR (PDF/CSV em 1 clique)
// ==========================================
function gerarRelatorioContador() {
  const hoje = new Date();
  const mes = hoje.toISOString().slice(0, 7);
  const dre = calcularDRE(mes);
  const linhas = [
    'RELATÓRIO PARA CONTABILIDADE',
    `Gerado em ${hoje.toLocaleDateString('pt-BR')} às ${hoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
    `Período: ${mes}`,
    '',
    '=== DRE DO MÊS ===',
    `Faturamento: ${formatMoeda(dre.faturamento)}`,
    `(-) CMV (insumos): ${formatMoeda(dre.cmv)}`,
    `(-) Taxas de apps: ${formatMoeda(dre.taxas)}`,
    `Lucro bruto: ${formatMoeda(dre.lucroBruto)}`,
    `(-) Custos fixos: ${formatMoeda(dre.custosFixos)}`,
    `(-) Pró-labore: ${formatMoeda(dre.proLabore)}`,
    `(-) Outras saídas: ${formatMoeda(dre.outrasSaidas)}`,
    `Lucro líquido: ${formatMoeda(dre.lucroLiquido)} (${dre.margem.toFixed(1)}%)`,
    '',
    '=== PEDIDOS DO MÊS ===',
    'Cliente;Data;Canal;Itens;Valor;Sinal;Lucro',
    ...pedidos.filter(p => (p.dataEntrega || '').startsWith(mes)).map(p => {
      const L = lucroPorPedido(p);
      const itens = (p.itens || []).map(i => `${i.qtd}x ${i.nome}`).join(', ');
      return `${p.cliente};${p.dataEntrega};${p.canal};${itens};${p.valorTotal};${p.valorSinal};${L.lucro.toFixed(2)}`;
    }),
    '',
    '=== LANÇAMENTOS DO CAIXA ===',
    'Data;Tipo;Categoria;Descrição;Valor',
    ...lancamentos.filter(l => (l.data || '').startsWith(mes)).map(l => `${l.data};${l.tipo};${l.categoria};${l.descricao};${l.valor}`),
    '',
    '=== ESTOQUE ATUAL ===',
    'Insumo;Quantidade;Unidade;Custo unit.;Valor em estoque',
    ...insumos.map(i => `${i.nome};${i.quantidade};${i.unidade};${getCustoUnitario(i).toFixed(2)};${(getCustoUnitario(i) * (Number(i.quantidade) || 0)).toFixed(2)}`)
  ];
  const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio-contador-${mes}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Relatório do contador baixado (CSV)!');
}

// ==========================================
// MODO FECHAMENTO DO DIA (3 perguntas)
// ==========================================
function abrirFechamentoDia() {
  const hoje = diaISO(0);
  const pedidosHoje = pedidos.filter(p => p.dataEntrega === hoje);
  const faturamentoHoje = pedidosHoje.reduce((a, p) => a + (Number(p.valorTotal) || 0), 0);
  const lucroHoje = pedidosHoje.reduce((a, p) => a + lucroPorPedido(p).lucro, 0);
  const saldoCaixa = lancamentos.filter(l => l.tipo === 'entrada').reduce((a, l) => a + Number(l.valor), 0)
    - lancamentos.filter(l => l.tipo === 'saida').reduce((a, l) => a + Number(l.valor), 0);
  const itensFaltando = insumos.filter(i => (Number(i.quantidade) || 0) <= (Number(i.alertaEstoqueMinimo) || 0));
  abrirModal(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-moon text-purple-600"></i> Fechamento do dia
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Faturamento hoje</p>
          <p class="text-lg font-black text-emerald-700">${formatMoeda(faturamentoHoje)}</p>
        </div>
        <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-purple-700">Lucro hoje</p>
          <p class="text-lg font-black text-purple-700">${formatMoeda(lucroHoje)}</p>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-600">Saldo caixa</p>
          <p class="text-lg font-black ${saldoCaixa >= 0 ? 'text-emerald-700' : 'text-red-600'}">${formatMoeda(saldoCaixa)}</p>
        </div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p class="text-xs font-bold text-slate-700 mb-1">📦 Pedidos de hoje (${pedidosHoje.length})</p>
        ${pedidosHoje.length === 0 ? '<p class="text-[11px] text-slate-400">Nenhum pedido para hoje.</p>' : pedidosHoje.map(p => `
          <div class="flex items-center justify-between text-[11px] py-1">
            <span class="text-slate-700">${p.cliente} • ${(p.itens || []).map(i => `${i.qtd}x ${i.nome}`).join(', ')}</span>
            <span class="font-bold text-slate-900">${formatMoeda(p.valorTotal)}</span>
          </div>`).join('')}
      </div>
      <div class="p-3 rounded-xl ${itensFaltando.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}">
        <p class="text-xs font-bold ${itensFaltando.length > 0 ? 'text-amber-800' : 'text-emerald-800'} mb-1">
          ${itensFaltando.length > 0 ? `⚠️ ${itensFaltando.length} insumo(s) abaixo do mínimo` : '✅ Estoque OK'}
        </p>
        ${itensFaltando.length === 0 ? '' : itensFaltando.map(i => `
          <p class="text-[11px] text-amber-900">• ${i.nome}: ${i.quantidade}${i.unidade} (mín. ${i.alertaEstoqueMinimo}${i.unidade})</p>`).join('')}
      </div>
      <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
        <button onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs">Fechar</button>
        <button onclick="gerarRelatorioContador(); fecharModal();" class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs">
          <i class="fa-solid fa-file-arrow-down"></i> Exportar relatório
        </button>
      </div>
    </div>
  `);
}

// Troca o modelo de entrega e reaplica a taxa no simulador e nos novos pedidos
function setPlanoEntrega(modo) {
  planoEntrega = modo === 'propria' ? 'propria' : 'plataforma';
  localStorage.setItem('confeitaria_plano_entrega', planoEntrega);
  if (simuladorPromo && ['iFood', '99Food'].includes(simuladorPromo.canal)) {
    simuladorPromo.taxaCanal = taxaEfetivaCanal(simuladorPromo.canal);
  }
  renderCurrentTab();
}

// Estado do Simulador Interativo de Promoções
let simuladorPromo = {
  fichaId: 'fic-2', // Bolo Vulcão Chocolate Belga
  canal: 'iFood',   // 'WhatsApp', 'iFood', '99Food', 'Balcao', 'Outro'
  taxaCanal: 26.2,  // sincronizado abaixo conforme o plano de entrega
  tipoDesconto: 'percentual', // 'percentual', 'valor_fixo', 'combo', 'leve_ganhe'
  descontoPercentual: 15,
  precoPromocionalFixo: 80.00,
  brindeAtivo: true,
  brindeTipo: 'ficha', // 'ficha' ou 'custom'
  brindeFichaId: 'fic-3', // Caixa Presente c/ 4 Brigadeiros
  brindeNomeCustom: 'Tag Artesanal + Fita de Cetim',
  brindeCustoCustom: 2.50,
  volumeVendasProjetado: 30
};
// Sincroniza a taxa inicial com o plano de entrega salvo
simuladorPromo.taxaCanal = taxaEfetivaCanal(simuladorPromo.canal);

// INICIALIZAÇÃO
let appCarregado = false;
let modoLogin = 'entrar'; // 'entrar' | 'criar'
let emailLogado = '';

// Promessa com prazo: o Supabase não tem timeout próprio e uma
// requisição pendurada travaria o boot no "Carregando…" para sempre.
function comTimeout(promessa, ms, rotulo) {
  let timer = null;
  const limite = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error(rotulo || ('tempo esgotado (' + ms + 'ms)'))), ms);
  });
  return Promise.race([
    Promise.resolve(promessa).finally(() => { if (timer) clearTimeout(timer); }),
    limite
  ]);
}

// Cede a vez para o navegador pintar antes do trabalho pesado.
// Sem isso, o "Carregando…" nem aparece e a tela parece congelada.
function proximoFrame() {
  return new Promise(res => setTimeout(res, 30));
}

async function initApp() {
  window.__appBooted = true;
  appCarregado = true;
  esconderLogin();
  garantirPerfil().catch(() => {});
  const dash = document.getElementById('tab-dashboard');
  if (dash) {
    dash.innerHTML = `<div class="bg-white p-8 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">Carregando dados do banco…</div>`;
  }
  await proximoFrame();
  try {
    // Nunca trava no "Carregando…": 25 s no banco, depois cai para o cache local
    await comTimeout(loadData(), 25000, 'banco demorou demais — usando dados locais');
    initSidebar();
    aplicarEstadoGrupos();
    updateBadges();
    renderCurrentTab();
  } catch (err) {
    console.error('Falha no boot, caindo para o cache local:', err);
    window.__erroBoot = String((err && err.message) || err);
    try {
      carregarCacheLocal();
      initSidebar();
      aplicarEstadoGrupos();
      updateBadges();
      renderCurrentTab();
      showToast('Falha ao iniciar (' + window.__erroBoot + '). Usando dados locais.', false);
    } catch (err2) {
      console.error('Falha até no modo local:', err2);
      if (dash) {
        dash.innerHTML = `
          <div class="bg-white p-8 rounded-2xl border border-red-200 text-center space-y-3">
            <p class="text-base font-bold text-red-700"><i class="fa-solid fa-triangle-exclamation"></i> Não consegui abrir o app</p>
            <p class="text-xs text-slate-600 font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">${esc(String((err2 && err2.message) || err2))}</p>
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <button onclick="window.location.reload()" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer">Recarregar</button>
            </div>
            <p class="text-[11px] text-slate-400">Se persistir, abra o console (F12) e me mande o erro em vermelho.</p>
          </div>`;
      }
    }
  }
}

function mostrarLogin() {
  const tela = document.getElementById('loginScreen');
  if (tela) {
    tela.classList.remove('hidden');
    tela.classList.add('flex');
  }
}

function esconderLogin() {
  const tela = document.getElementById('loginScreen');
  if (tela) {
    tela.classList.add('hidden');
    tela.classList.remove('flex');
  }
}

function trocarModoLogin() {
  modoLogin = modoLogin === 'entrar' ? 'criar' : 'entrar';
  const btn = document.getElementById('loginBtn');
  const sub = document.getElementById('loginSubtitulo');
  const alt = document.getElementById('loginAlternarTexto');
  const erro = document.getElementById('loginErro');
  if (erro) erro.classList.add('hidden');
  if (modoLogin === 'criar') {
    if (btn) btn.textContent = 'Criar conta';
    if (sub) sub.textContent = 'Crie sua conta — seus dados ficam isolados e privados';
    if (alt) alt.textContent = 'Já tem conta? Entrar';
  } else {
    if (btn) btn.textContent = 'Entrar';
    if (sub) sub.textContent = 'Entre para acessar seus dados com segurança';
    if (alt) alt.textContent = 'Não tem conta? Criar agora';
  }
}

function traduzirErroAuth(err) {
  const m = String(err?.message || err || '');
  console.error('Auth falhou:', err);
  if (m.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (m.includes('already registered') || m.includes('already exists')) return 'Este e-mail já tem conta. Clique em Entrar.';
  if (m.includes('Password should be')) return 'A senha precisa de ao menos 6 caracteres.';
  if (m.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar (ou desative a confirmação no Supabase).';
  if (m.includes('Signups not allowed')) return 'Cadastro desativado no Supabase: ative "Allow new users" em Auth.';
  if (m.includes('Database error saving new user')) return 'Erro ao criar usuário no banco (trigger de perfil?). Veja o console (F12).';
  if (m.includes('Failed to fetch') || m.includes('NetworkError')) return 'Sem conexão com o Supabase. Confira URL/keys e a internet.';
  if (m.includes('Invalid API key')) return 'Chave do Supabase inválida. Confira a anon key no .env / Vercel.';
  if (m.includes('rate limit') || m.includes('429')) return 'Muitas tentativas. Aguarde 1 minuto e tente de novo.';
  return `Não foi possível autenticar (${m.slice(0, 120)}). Veja o console (F12).`;
}

async function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const erro = document.getElementById('loginErro');
  const btn = document.getElementById('loginBtn');
  if (erro) erro.classList.add('hidden');
  if (btn) { btn.disabled = true; btn.textContent = 'Aguarde…'; }
  try {
    if (modoLogin === 'criar') {
      const res = await criarConta(email, senha);
      if (!res.session) {
        throw new Error('Conta criada! Verifique seu e-mail para confirmar e entre em seguida.');
      }
    } else {
      await entrar(email, senha);
    }
    appCarregado = false;
    location.hash = '#/dashboard';
    await renderRota();
  } catch (err) {
    if (erro) {
      erro.textContent = traduzirErroAuth(err);
      erro.classList.remove('hidden');
    }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = modoLogin === 'criar' ? 'Criar conta' : 'Entrar'; }
  }
}

async function fazerLogout() {
  if (!confirm('Sair do sistema?')) return;
  fecharModal();
  await sair().catch(() => {});
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  location.hash = '#/login';
  window.location.reload();
}

function normalizarInsumo(item) {
  if (!item) return item;
  const qtd = Number(item.quantidade !== undefined ? item.quantidade : (item.estoqueAtual !== undefined ? item.estoqueAtual : 0)) || 0;
  const min = Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : (item.estoqueMinimo !== undefined ? item.estoqueMinimo : 0)) || 0;
  item.quantidade = qtd;
  item.estoqueAtual = qtd;
  item.alertaEstoqueMinimo = min;
  item.estoqueMinimo = min;
  item.nome = item.nome || 'Insumo';
  item.unidade = item.unidade || 'g';
  item.categoria = item.categoria || 'Ingredientes';
  item.precoPacote = Number(item.precoPacote) || 0;
  item.qtdPacote = Number(item.qtdPacote) || 1;
  // Nutrientes por 100 g (base da etiqueta nutricional ANVISA)
  item.kcal100 = Number(item.kcal100) || 0;
  item.carb100 = Number(item.carb100) || 0;
  item.acucar100 = Number(item.acucar100) || 0;
  item.prot100 = Number(item.prot100) || 0;
  item.gordTot100 = Number(item.gordTot100) || 0;
  item.gordSat100 = Number(item.gordSat100) || 0;
  item.gordTrans100 = Number(item.gordTrans100) || 0;
  item.fibra100 = Number(item.fibra100) || 0;
  item.sodio100 = Number(item.sodio100) || 0;
  item.alergenicos = item.alergenicos || '';
  return item;
}

// ==========================================
// MINI-TABELA DE REFERÊNCIA (valores por 100 g, base TACO/Unicamp)
// Preenche o insumo com 1 clique — SEMPRE revise com seu rótulo.
// ==========================================
// [kcal, carb, acucar, prot, gordTot, gordSat, gordTrans, fibra, sodio(mg), alergenicos]
const MINI_TACO = [
  { chave: ['acucar refinado', 'acucar cristal', 'acucar'], v: [387, 99.5, 99.5, 0.3, 0, 0, 0, 0, 0], a: '' },
  { chave: ['acucar mascavo'], v: [376, 97.3, 96, 0.4, 0, 0, 0, 0, 28], a: '' },
  { chave: ['farinha de trigo', 'farinha'], v: [360, 75.1, 1, 9.8, 1.4, 0.2, 0, 2.3, 1], a: 'Glúten' },
  { chave: ['chocolate meio amargo', 'meio amargo'], v: [540, 56, 48, 4.9, 35, 20, 0, 7, 11], a: 'Soja' },
  { chave: ['chocolate ao leite', 'ao leite'], v: [540, 59, 55, 7, 32, 19, 0, 2, 100], a: 'Leite, Soja' },
  { chave: ['chocolate branco'], v: [547, 59, 59, 6, 32, 19, 0, 0.5, 110], a: 'Leite, Soja' },
  { chave: ['cacau em po', 'cacau'], v: [300, 45, 10, 20, 13, 8, 0, 30, 20], a: '' },
  { chave: ['manteiga'], v: [726, 0.1, 0.1, 0.4, 82, 52, 3, 0, 580], a: 'Leite' },
  { chave: ['margarina'], v: [720, 0.5, 0, 0.2, 80, 20, 0, 0, 700], a: 'Leite, Soja' },
  { chave: ['ovo'], v: [143, 1.6, 1.6, 13.3, 8.9, 2.8, 0, 0, 126], a: 'Ovos' },
  { chave: ['leite integral', 'leite de vaca'], v: [61, 4.8, 4.8, 3.2, 3.2, 1.9, 0, 0, 41], a: 'Leite' },
  { chave: ['leite condensado'], v: [321, 54.4, 54.4, 7.7, 8.4, 5, 0, 0, 130], a: 'Leite' },
  { chave: ['creme de leite'], v: [196, 4.5, 4.5, 2.3, 19.8, 12, 0, 0, 50], a: 'Leite' },
  { chave: ['leite em po'], v: [496, 38.3, 38.3, 26.4, 26.8, 16, 0, 0, 370], a: 'Leite, Soja' },
  { chave: ['fermento quimico', 'fermento em po', 'po royal'], v: [90, 40, 0, 5, 0, 0, 0, 0, 9000], a: '' },
  { chave: ['bicarbonato'], v: [0, 0, 0, 0, 0, 0, 0, 0, 27360], a: '' },
  { chave: ['amendoim'], v: [582, 20.4, 4, 27.2, 46.9, 6.5, 0, 8.7, 5], a: 'Amendoim' },
  { chave: ['coco ralado', 'coco seco'], v: [550, 23, 8, 6, 50, 44, 0, 14, 20], a: '' },
  { chave: ['morango'], v: [30, 6.8, 4, 0.9, 0.3, 0.1, 0, 1.7, 2], a: '' }
];

function referenciaNutricional(nome) {
  const n = normalizarTexto(nome || '');
  if (!n) return null;
  return MINI_TACO.find(e => e.chave.some(k => n.includes(k))) || null;
}

// Preenche os campos do modal com a referência (sem salvar ainda)
function preencherNutriReferencia() {
  const nome = document.getElementById('insNome')?.value || '';
  const ref = referenciaNutricional(nome);
  if (!ref) { showToast('Sem referência para este nome. Preencha pelo rótulo.', false); return; }
  const ids = ['insKcal', 'insCarb', 'insAcucar', 'insProt', 'insGordTot', 'insGordSat', 'insGordTrans', 'insFibra', 'insSodio'];
  ids.forEach((id, i) => { const el = document.getElementById(id); if (el) el.value = ref.v[i]; });
  const al = document.getElementById('insAlergenicos');
  if (al && !al.value.trim() && ref.a) al.value = ref.a;
  showToast('Valores de referência preenchidos — confira com seu rótulo!');
}

function carregarCacheLocal() {
  const storedInsumos = localStorage.getItem(STORAGE_KEYS.INSUMOS);
  insumos = storedInsumos ? JSON.parse(storedInsumos) : [];
  insumos.forEach(normalizarInsumo);
  fichas = JSON.parse(localStorage.getItem(STORAGE_KEYS.FICHAS)) || [];
  pedidos = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEDIDOS)) || [];
  lancamentos = JSON.parse(localStorage.getItem(STORAGE_KEYS.LANCAMENTOS)) || [];
  metas = JSON.parse(localStorage.getItem(STORAGE_KEYS.METAS)) || { ...METAS_BASE };
  promocoes = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROMOCOES)) || [];
  clientes = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTES)) || [];
  marca = { ...MARCA_PADRAO, ...(JSON.parse(localStorage.getItem(STORAGE_KEYS.MARCA) || '{}') || {}) };
  sincronizarClientesDosPedidos(false);
  carregarCardapios();
  _dadosVersao++;
}

function aplicarEstadoBanco(banco) {
  insumos = (banco.insumos || []).map(normalizarInsumo);
  fichas = banco.fichas || [];
  pedidos = banco.pedidos || [];
  lancamentos = banco.lancamentos || [];
  metas = banco.metas || { ...METAS_BASE };
  promocoes = banco.promocoes || [];
  clientes = banco.clientes || [];
  marca = { ...MARCA_PADRAO, ...(banco.marca || {}) };
  sincronizarClientesDosPedidos(false);
  // Atualiza o cache local com o que veio do banco
  Object.values(STORAGE_KEYS).forEach(gravarCacheLocalSeguro);
  _dadosVersao++;
}

function escreverCacheLocal(key) {
  if (key === STORAGE_KEYS.INSUMOS) localStorage.setItem(STORAGE_KEYS.INSUMOS, JSON.stringify(insumos));
  if (key === STORAGE_KEYS.FICHAS) localStorage.setItem(STORAGE_KEYS.FICHAS, JSON.stringify(fichas));
  if (key === STORAGE_KEYS.PEDIDOS) localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidos));
  if (key === STORAGE_KEYS.LANCAMENTOS) localStorage.setItem(STORAGE_KEYS.LANCAMENTOS, JSON.stringify(lancamentos));
  if (key === STORAGE_KEYS.METAS) localStorage.setItem(STORAGE_KEYS.METAS, JSON.stringify(metas));
  if (key === STORAGE_KEYS.PROMOCOES) localStorage.setItem(STORAGE_KEYS.PROMOCOES, JSON.stringify(promocoes));
  if (key === STORAGE_KEYS.CLIENTES) localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(clientes));
  if (key === STORAGE_KEYS.MARCA) localStorage.setItem(STORAGE_KEYS.MARCA, JSON.stringify(marca));
}

async function loadData() {
  if (bancoAtivo) {
    try {
      aplicarEstadoBanco(await carregarBanco());
      return;
    } catch (err) {
      if (err && err.message === 'sem-sessao') {
        mostrarLogin();
        return;
      }
      window.__erroBanco = String((err && err.message) || err);
      console.error('Falha ao carregar do Supabase, usando cache local:', err);
      const msg = (err && err.message) ? err.message : '';
      if (/does not exist|schema cache|PGRST/i.test(msg)) {
        showToast('Falta rodar uma migration no Supabase (detalhes no console).', false);
      } else if (/fetch|network|Failed to fetch/i.test(msg)) {
        showToast('Sem internet: usando os dados locais.', false);
      } else {
        showToast('Não consegui ler o banco. Usando os dados locais.', false);
      }
    }
  }
  carregarCacheLocal();
}

function coletarEstado() {
  return { insumos, fichas, pedidos, lancamentos, metas, promocoes, clientes, marca };
}

function saveData(key) {
  if (key === STORAGE_KEYS.INSUMOS) {
    insumos.forEach(normalizarInsumo);
  }
  // Dados mudaram: invalida os caches de cálculo (financeiro, caixa, MRP)
  _dadosVersao++;
  // O BANCO É A FONTE. A gravação no Supabase não pode depender de nada local:
  // antes ela vinha depois do localStorage, e se o navegador estourasse a cota
  // (logo da marca é dataURL e pesa muito) o saveData morria ali e o banco
  // nunca recebia nada — o item aparecia na tela e sumia ao recarregar.
  if (bancoAtivo) {
    setStatusSalvo('salvando');
    persistirColecao(key, coletarEstado())
      .then(() => {
        // Cache local só é atualizado DEPOIS do banco: se ele falhar,
        // o próximo save reenvia tudo e nada fica perdido.
        gravarCacheLocalSeguro(key);
        setStatusSalvo('ok', 'Salvo ✓ ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      })
      .catch(err => {
        console.error('Falha ao salvar no Supabase:', err);
        const msg = String((err && err.message) || err);
        if (msg === 'sem-sessao') {
          // Sem login o banco não aceita gravação (RLS exige auth.uid()).
          setStatusSalvo('erro', 'Entre na sua conta');
          showToast('Você não está logada. Entre na sua conta para salvar no banco.', false);
          try { mostrarLogin(); } catch (e) { /* sem tela de login */ }
          return;
        }
        setStatusSalvo('erro', 'Não salvou no banco');
        showToast('O banco recusou a gravação: ' + msg.slice(0, 120), false);
      });
  } else {
    gravarCacheLocalSeguro(key);
    setStatusSalvo('ok', 'Salvo ✓ (local)');
  }
  updateBadges();
}

// Cache local nunca pode derrubar o salvamento: cota estourada é ignorada.
function gravarCacheLocalSeguro(key) {
  try {
    escreverCacheLocal(key);
  } catch (err) {
    console.warn('Cache local não gravado (cota do navegador):', err);
  }
}

function formatMoeda(valor) {
  return (valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Escapa texto do usuário antes de interpolar em HTML (anti-XSS)
function esc(v) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function showToast(msg, isSuccess = true) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast) return;

  toastMsg.textContent = msg;
  toastIcon.className = isSuccess ? 'fa-solid fa-circle-check text-emerald-400' : 'fa-solid fa-circle-exclamation text-amber-400';
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2800);
}

// ==========================================
// COMPARAÇÃO DE ESTOQUE & ATUALIZAÇÃO DO BADGE NO CABEÇALHO
// ==========================================

/**
 * Compara a quantidade atual do inventário com o limite mínimo de estoque
 * e retorna detalhes completos sobre a necessidade de reposição.
 * @param {Object} item Insumo para verificação
 * @returns {{
 *   needsRestock: boolean,
 *   currentQuantity: number,
 *   minimumThreshold: number,
 *   falta: number,
 *   percentual: number,
 *   item: Object
 * }}
 */
function compararEstoqueComMinimo(item) {
  if (!item) {
    return {
      needsRestock: false,
      currentQuantity: 0,
      minimumThreshold: 0,
      falta: 0,
      percentual: 100,
      item: null
    };
  }

  const currentQuantity = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
  const minimumThreshold = Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : item.estoqueMinimo) || 0;

  // Um item precisa de reposição quando seu estoque atual está menor ou igual ao limite mínimo (ou zerado/negativo)
  const needsRestock = minimumThreshold > 0 ? (currentQuantity <= minimumThreshold) : (currentQuantity <= 0);
  const falta = needsRestock ? Number(Math.max(0, minimumThreshold - currentQuantity).toFixed(2)) : 0;
  const percentual = minimumThreshold > 0 ? Math.round((currentQuantity / minimumThreshold) * 100) : 100;

  return {
    needsRestock,
    currentQuantity,
    minimumThreshold,
    falta,
    percentual,
    item
  };
}

/**
 * Retorna se um insumo individual necessita de reposição.
 * @param {Object} item 
 * @returns {boolean}
 */
function itemPrecisaReposicao(item) {
  return compararEstoqueComMinimo(item).needsRestock;
}

/**
 * Retorna todos os itens da lista de estoque que necessitam de reposição.
 * @param {Array} lista Lista de insumos (padrão: lista global `insumos`)
 * @returns {Array}
 */
function obterItensParaRepor(lista = insumos) {
  const listaAlvo = Array.isArray(lista) ? lista : insumos;
  return listaAlvo.filter(item => itemPrecisaReposicao(item));
}

/**
 * Conta os itens com estoque abaixo do mínimo.
 * O número alimenta a central de notificações (sino).
 * @param {Array} listaInsumos Lista opcional de insumos (default: insumos)
 * @returns {number} Quantidade de itens que precisam de reposição
 */
function updateHeaderStockBadge(listaInsumos = insumos) {
  const itensParaRepor = obterItensParaRepor(listaInsumos);
  return itensParaRepor.length;
}

function updateBadges() {
  updateHeaderStockBadge();
  renderNotificacoes();
}

// ==========================================
// STATUS DE SALVAMENTO no header ("Salvando…" / "Salvo ✓")
// ==========================================
let _statusSalvoTimer = null;
function setStatusSalvo(estado, texto) {
  const el = document.getElementById('statusSalvo');
  if (!el) return;
  const mapa = {
    salvando: { icone: 'fa-solid fa-spinner', cor: 'text-slate-400', txt: 'Salvando…' },
    ok: { icone: 'fa-solid fa-check', cor: 'text-emerald-600', txt: 'Salvo' },
    erro: { icone: 'fa-solid fa-triangle-exclamation', cor: 'text-amber-600', txt: 'Só no navegador' }
  };
  const s = mapa[estado] || mapa.salvando;
  el.className = `hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap ${s.cor}`;
  el.innerHTML = `<i class="${s.icone} text-[10px] ${estado === 'salvando' ? 'fa-spin' : ''}"></i><span>${texto || s.txt}</span>`;
  if (_statusSalvoTimer) clearTimeout(_statusSalvoTimer);
  if (estado !== 'salvando') {
    _statusSalvoTimer = setTimeout(() => el.classList.add('hidden'), estado === 'erro' ? 6000 : 2500);
  }
}

// ==========================================
// CONTROLE DO MENU LATERAL (SIDEBAR)
// Começa SEMPRE fechado ao entrar no app: o menu só abre pelo botão.
// O estado vale para a sessão (nada é gravado no navegador).
// ==========================================
let isSidebarOpen = false;

function initSidebar() {
  isSidebarOpen = false;
  applySidebarState();
}

function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  applySidebarState();
}

function openSidebar() {
  isSidebarOpen = true;
  applySidebarState();
}

function closeSidebar() {
  isSidebarOpen = false;
  applySidebarState();
}

function applySidebarState() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  if (!sidebar) return;

  if (isSidebarOpen) {
    document.body.classList.add('sidebar-open');
    document.body.classList.remove('sidebar-closed');
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');

    // No mobile (< 1024px), ativa o backdrop escuro
    if (backdrop) {
      if (window.innerWidth < 1024) {
        backdrop.classList.remove('hidden');
      } else {
        backdrop.classList.add('hidden');
      }
    }

    if (toggleBtn) {
      toggleBtn.setAttribute('title', 'Recolher Menu Lateral');
      toggleBtn.classList.add('bg-pink-50', 'text-pink-600', 'border-pink-200');
      toggleBtn.classList.remove('bg-slate-100', 'text-slate-700', 'border-slate-200');
    }
  } else {
    document.body.classList.remove('sidebar-open');
    document.body.classList.add('sidebar-closed');
    sidebar.classList.remove('sidebar-expanded');
    sidebar.classList.add('sidebar-collapsed');

    if (backdrop) {
      backdrop.classList.add('hidden');
    }

    if (toggleBtn) {
      toggleBtn.setAttribute('title', 'Abrir Menu Lateral');
      toggleBtn.classList.remove('bg-pink-50', 'text-pink-600', 'border-pink-200');
      toggleBtn.classList.add('bg-slate-100', 'text-slate-700', 'border-slate-200');
    }
  }
}

// Fechar backdrop automaticamente no resize para desktop
window.addEventListener('resize', () => {
  const backdrop = document.getElementById('sidebarBackdrop');
  if (window.innerWidth >= 1024 && backdrop) {
    backdrop.classList.add('hidden');
  }
});

// NAVEGAÇÃO DE ABAS
function switchTab(tabId) {
  currentTab = tabId;
  const alvo = '#/' + tabId;
  if (location.hash !== alvo) {
    ignorarHash = true;
    location.hash = alvo;
  }
  fecharNotifPanel();
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('tab-enter');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-pink-600', 'text-white', 'shadow-xs');
    btn.classList.add('text-slate-700', 'hover:text-slate-900', 'hover:bg-slate-100');
  });

  const activeSection = document.getElementById(`tab-${tabId}`);
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);

  if (activeSection) {
    activeSection.classList.remove('hidden');
    // Anima só na troca de aba (força reflow para reiniciar a animação)
    void activeSection.offsetWidth;
    activeSection.classList.add('tab-enter');
  }
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-pink-600', 'text-white', 'shadow-xs');
    activeBtn.classList.remove('text-slate-700', 'hover:text-slate-900', 'hover:bg-slate-100');
  }

  // Se tela menor que 1024px (mobile), recolhe o menu lateral após clique
  if (window.innerWidth < 1024) {
    closeSidebar();
  }

  // Grupo da sidebar: expande sozinho ao navegar para um sub-item
  expandirGrupoDaRota(tabId);

  renderCurrentTab();
}

// ==========================================
// GRUPOS DA SIDEBAR (Produção / Vendas / Financeiro) — colapsáveis com memória
// ==========================================
const GRUPOS_SIDEBAR = {
  producao: { chave: 'confeitaria_grupo_producao', abas: ['estoque', 'fichas', 'mrp'] },
  vendas: { chave: 'confeitaria_grupo_vendas', abas: ['pedidos', 'cardapio', 'clientes', 'promocoes', 'marca'] },
  financeiro: { chave: 'confeitaria_grupo_financeiro', abas: ['caixa', 'dre', 'relatorios'] }
};

function grupoAberto(id) {
  const g = GRUPOS_SIDEBAR[id];
  if (!g) return true;
  return localStorage.getItem(g.chave) !== 'fechado';
}

function aplicarEstadoGrupos() {
  Object.keys(GRUPOS_SIDEBAR).forEach(id => {
    const body = document.querySelector(`[data-grupo-body="${id}"]`);
    const chev = document.querySelector(`[data-chevron="${id}"]`);
    const head = document.getElementById(`grupoHeader-${id}`);
    const aberto = grupoAberto(id);
    if (body) body.classList.toggle('hidden', !aberto);
    if (chev) chev.style.transform = aberto ? '' : 'rotate(-90deg)';
    if (head) head.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
}

function toggleGrupo(id) {
  const g = GRUPOS_SIDEBAR[id];
  if (!g) return;
  localStorage.setItem(g.chave, grupoAberto(id) ? 'fechado' : 'aberto');
  aplicarEstadoGrupos();
}

function expandirGrupoDaRota(tabId) {
  Object.keys(GRUPOS_SIDEBAR).forEach(id => {
    if (GRUPOS_SIDEBAR[id].abas.includes(tabId)) {
      localStorage.setItem(GRUPOS_SIDEBAR[id].chave, 'aberto');
    }
  });
  aplicarEstadoGrupos();
}

// ==========================================
// ROTEADOR (cada página tem sua URL: #/login, #/estoque, ...)
// ==========================================
const ROTAS_VALIDAS = ['dashboard', 'estoque', 'fichas', 'pedidos', 'clientes', 'mrp', 'caixa', 'promocoes', 'dre', 'relatorios', 'cardapio', 'marca'];
const TITULOS_ROTAS = {
  login: 'Entrar', dashboard: 'Visão Geral', estoque: 'Estoque',
  fichas: 'Fichas Técnicas', pedidos: 'Pedidos', clientes: 'Clientes',
  mrp: 'Previsão de Compras', caixa: 'Livro Caixa', promocoes: 'Promoções',
  dre: 'DRE do Mês', relatorios: 'Relatórios', cardapio: 'Cardápio', marca: 'Marca'
};
let ignorarHash = false;

function rotaDaURL() {
  const h = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
  if (h === 'login') return 'login';
  return ROTAS_VALIDAS.includes(h) ? h : 'dashboard';
}

window.addEventListener('hashchange', () => {
  if (ignorarHash) {
    ignorarHash = false;
    return;
  }
  renderRota();
});

async function renderRota() {
  const rota = rotaDaURL();
  document.title = `${TITULOS_ROTAS[rota] || 'Visão Geral'} • Gestão de Confeitaria`;
  if (rota === 'login') {
    if (bancoAtivo) {
      const s = await sessaoAtual().catch(() => null);
      if (s) {
        emailLogado = emailDaSessao(s);
        if (location.hash !== '#/dashboard') {
          ignorarHash = true;
          location.hash = '#/dashboard';
        }
        esconderLogin();
        if (!appCarregado) {
          currentTab = 'dashboard';
          await initApp();
        } else if (currentTab !== 'dashboard') {
          switchTab('dashboard');
        }
        return;
      }
    }
    mostrarLogin();
    window.scrollTo(0, 0);
    return;
  }
  if (bancoAtivo) {
    const s = await sessaoAtual().catch(() => null);
    if (!s) {
      mostrarLogin();
      if (location.hash !== '#/login') {
        ignorarHash = true;
        location.hash = '#/login';
      }
      return;
    }
    emailLogado = emailDaSessao(s);
  }
  esconderLogin();
  if (!appCarregado) {
    currentTab = rota;
    await initApp();
  } else if (rota !== currentTab) {
    switchTab(rota);
  }
  window.scrollTo(0, 0);
}

// ==========================================
// PAGINAÇÃO (listas longas: estoque, clientes, caixa, fichas)
// ==========================================
const PAGINACAO = {
  estoque: { pagina: 1, porPagina: 12 },
  clientes: { pagina: 1, porPagina: 9 },
  caixa: { pagina: 1, porPagina: 12 },
  fichas: { pagina: 1, porPagina: 6 }
};

function paginar(chave, lista) {
  const cfg = PAGINACAO[chave];
  const total = Math.max(1, Math.ceil(lista.length / cfg.porPagina));
  if (cfg.pagina > total) cfg.pagina = total;
  if (cfg.pagina < 1) cfg.pagina = 1;
  const ini = (cfg.pagina - 1) * cfg.porPagina;
  return { itens: lista.slice(ini, ini + cfg.porPagina), total, atual: cfg.pagina };
}

function botoesPaginacao(chave, total, atual) {
  if (total <= 1) return '';
  const nums = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - atual) <= 1) nums.push(i);
    else if (nums[nums.length - 1] !== '…') nums.push('…');
  }
  const base = 'min-w-8 h-8 px-2 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer';
  return `<div class="flex items-center justify-center gap-1.5 py-4 flex-wrap">
    <button ${atual <= 1 ? 'disabled' : `onclick="irPagina('${chave}', ${atual - 1})"`} class="${base} bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-default" aria-label="Página anterior">‹</button>
    ${nums.map(n => n === '…' ? `<span class="text-xs text-slate-400 px-1">…</span>` : `<button onclick="irPagina('${chave}', ${n})" class="${base} ${n === atual ? 'text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}" ${n === atual ? 'style="background:linear-gradient(135deg,#D96C75,#C65D3A)"' : ''}>${n}</button>`).join('')}
    <button ${atual >= total ? 'disabled' : `onclick="irPagina('${chave}', ${atual + 1})"`} class="${base} bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-default" aria-label="Próxima página">›</button>
  </div>`;
}

const RENDER_PAGINA = {
  estoque: () => renderStockRows(),
  clientes: () => renderClientes(),
  caixa: () => renderCaixa(),
  fichas: () => renderFichas()
};

function irPagina(chave, n) {
  PAGINACAO[chave].pagina = n;
  RENDER_PAGINA[chave]();
}

function renderCurrentTab() {
  if (currentTab === 'dashboard') renderDashboard();
  if (currentTab === 'estoque') renderEstoque();
  if (currentTab === 'fichas') renderFichas();
  if (currentTab === 'pedidos') renderPedidos();
  if (currentTab === 'mrp') renderMRP();
  if (currentTab === 'caixa') renderCaixa();
  if (currentTab === 'clientes') renderClientes();
  if (currentTab === 'promocoes') renderPromocoes();
  if (currentTab === 'dre') renderDRE();
  if (currentTab === 'relatorios') renderRelatorios();
  if (currentTab === 'cardapio') renderCardapio();
  if (currentTab === 'marca') renderMarca();
}

// CÁLCULO DE CUSTO DO INSUMO
function getCustoUnitario(insumo) {
  if (!insumo || !insumo.qtdPacote || insumo.qtdPacote <= 0) return 0;
  return insumo.precoPacote / insumo.qtdPacote;
}

// CÁLCULO DE CMV DA FICHA TÉCNICA
function calcularCMVFicha(ficha) {
  if (!ficha || !ficha.ingredientes) return 0;
  return ficha.ingredientes.reduce((total, ing) => {
    const ins = insumos.find(i => i.id === ing.insumoId || (ing.nome && i.nome && i.nome.toLowerCase() === ing.nome.toLowerCase()));
    if (!ins) return total;
    const custoUnit = getCustoUnitario(ins);
    return total + (custoUnit * (Number(ing.qtd) || 0));
  }, 0);
}

// PRECIFICAÇÃO AUTOMÁTICA (markup por margem + taxa do canal)
// Mapa estático de cores do calendário comercial (classes literais p/ o Tailwind gerar no build)
const MAPA_CORES_CALENDARIO = {
  purple: 'bg-purple-100 text-purple-700',
  pink: 'bg-pink-100 text-pink-700',
  rose: 'bg-rose-100 text-rose-700',
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  slate: 'bg-slate-100 text-slate-700',
  red: 'bg-red-100 text-red-700'
};
// Preço = CMV / ((1 - margem) * (1 - taxaCanal)) — garante margem líquida após app
function calcularPrecoFicha(ficha, taxaCanalPercent = 0) {
  const cmvTotal = calcularCMVFicha(ficha);
  const rendimento = Number(ficha?.rendimento) > 0 ? Number(ficha.rendimento) : 1;
  const cmvUnit = cmvTotal / rendimento;
  const margem = Math.min(0.9, Math.max(0, (Number(ficha?.margemAlvo) || 60) / 100));
  const taxa = Math.min(0.9, Math.max(0, (Number(taxaCanalPercent) || 0) / 100));
  const divisor = (1 - margem) * (1 - taxa);
  const precoTotal = divisor > 0 ? cmvTotal / divisor : cmvTotal * 2.5;
  const precoUnit = precoTotal / rendimento;
  const precoPraticado = Number(ficha?.precoPraticado) || 0;
  const baseReal = precoPraticado > 0 ? precoPraticado : precoTotal;
  const margemReal = baseReal > 0 ? ((baseReal - cmvTotal - baseReal * taxa) / baseReal) * 100 : 0;
  return { cmvTotal, cmvUnit, rendimento, margem: margem * 100, taxa: taxa * 100, precoTotal, precoUnit, precoPraticado, margemReal };
}

// DRE MENSAL — competência por dataEntrega do pedido + caixa por data do lançamento
let dreMes = new Date().toISOString().slice(0, 7); // YYYY-MM
function setDreMes(valor) {
  if (valor) dreMes = valor;
  if (currentTab === 'dre') renderDRE();
  else renderCaixa();
}
function calcularDRE(mesStr) {
  const prefix = mesStr || dreMes;
  const peds = pedidos.filter(p => (p.dataEntrega || '').startsWith(prefix));
  let faturamento = 0, cmv = 0, taxas = 0;
  peds.forEach(p => {
    const fin = calcularFinanceiroPedido(p);
    faturamento += fin.total; cmv += fin.cmvTotal; taxas += fin.taxaApp;
  });
  const lancMes = lancamentos.filter(l => (l.data || '').startsWith(prefix));
  const entradasCaixa = lancMes.filter(l => l.tipo === 'entrada').reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const saidasInsumos = lancMes.filter(l => l.tipo === 'saida' && l.categoria === 'Compra de Insumos').reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const custosFixos = (Number(metas.custosFixosMensais) || 0)
    + lancMes.filter(l => l.tipo === 'saida' && l.categoria === 'Custo Fixo').reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const proLabore = lancMes.filter(l => l.categoria === 'Pró-Labore').reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const outrasSaidas = lancMes.filter(l => l.tipo === 'saida' && !['Compra de Insumos', 'Custo Fixo', 'Pró-Labore'].includes(l.categoria)).reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const lucroBruto = faturamento - cmv - taxas;
  const lucroLiquido = faturamento - cmv - taxas - custosFixos - proLabore - outrasSaidas;
  const margem = faturamento > 0 ? (lucroLiquido / faturamento) * 100 : 0;
  return { prefix, qtdPedidos: peds.length, faturamento, cmv, taxas, lucroBruto, custosFixos, saidasInsumos, proLabore, outrasSaidas, entradasCaixa, lucroLiquido, margem };
}

// CÁLCULOS FINANCEIROS DO PEDIDO
// Cache de cálculos por versão dos dados: dashboard, Kanban, caixa, DRE e sino
// chamam as mesmas contas dezenas de vezes por render. Sem isso, cada render
// recalcula CMV de todos os pedidos em todos os loops (O(P×I×G)) e filtra
// lançamentos por pedido (O(P×L)). Com cache: 1º cálculo real, resto O(1).
let _dadosVersao = 0;
let _finCache = { versao: -1, mapa: {} };
let _lancsPorPedido = null;
let _lancsVersao = -1;

function indiceLancsPorPedido() {
  if (_lancsPorPedido && _lancsVersao === _dadosVersao) return _lancsPorPedido;
  _lancsPorPedido = {};
  lancamentos.forEach(l => {
    if (!l.pedidoId) return;
    (_lancsPorPedido[l.pedidoId] = _lancsPorPedido[l.pedidoId] || []).push(l);
  });
  _lancsVersao = _dadosVersao;
  return _lancsPorPedido;
}

function calcularFinanceiroPedido(pedido) {
  const id = pedido && pedido.id;
  if (id) {
    if (_finCache.versao !== _dadosVersao) _finCache = { versao: _dadosVersao, mapa: {} };
    if (_finCache.mapa[id]) return _finCache.mapa[id];
    const fin = _calcularFinanceiroPedido(pedido);
    _finCache.mapa[id] = fin;
    return fin;
  }
  return _calcularFinanceiroPedido(pedido);
}

function _calcularFinanceiroPedido(pedido) {
  const total = Number(pedido.valorTotal) || 0;
  let cmvTotal = 0;

  if (pedido.itens && pedido.itens.length > 0) {
    pedido.itens.forEach(item => {
      const ficha = fichas.find(f => f.id === item.fichaId || (item.nome && f.nome && f.nome.toLowerCase() === item.nome.toLowerCase()));
      if (ficha) {
        const rendimento = Number(ficha.rendimento) > 0 ? Number(ficha.rendimento) : 1;
        const cmvUnit = calcularCMVFicha(ficha) / rendimento;
        cmvTotal += cmvUnit * (Number(item.qtd) || 1);
      }
    });
  }

  const taxaApp = total * ((Number(pedido.taxaPercentual) || 0) / 100);
  const lucroLiquido = total - cmvTotal - taxaApp;

  return {
    total,
    sinal: Number(pedido.valorSinal) || 0,
    restante: total - (Number(pedido.valorSinal) || 0),
    cmvTotal,
    taxaApp,
    lucroLiquido
  };
}

// ==========================================
// CÁLCULO DE INSUMOS E BAIXA DE ESTOQUE POR PEDIDO
// ==========================================
function calcularInsumosDoPedido(pedido) {
  if (!pedido || !pedido.itens) return [];
  const consumoMap = {};

  pedido.itens.forEach(item => {
    const ficha = fichas.find(f => f.id === item.fichaId || (item.nome && f.nome && f.nome.toLowerCase() === item.nome.toLowerCase()));
    if (ficha && ficha.ingredientes) {
      const rendimento = Number(ficha.rendimento) > 0 ? Number(ficha.rendimento) : 1;
      const fator = (Number(item.qtd) || 1) / rendimento;
      ficha.ingredientes.forEach(ing => {
        const ins = insumos.find(i => i.id === ing.insumoId || (ing.nome && i.nome && i.nome.toLowerCase() === ing.nome.toLowerCase()));
        if (ins) {
          if (!consumoMap[ins.id]) {
            consumoMap[ins.id] = {
              insumoId: ins.id,
              nome: ins.nome,
              unidade: ins.unidade,
              qtdConsumo: 0,
              estoqueAtual: Number(ins.estoqueAtual) || 0,
              estoqueMinimo: Number(ins.estoqueMinimo) || 0
            };
          }
          consumoMap[ins.id].qtdConsumo += (Number(ing.qtd) || 0) * fator;
        }
      });
    }
  });

  return Object.values(consumoMap);
}

// ==========================================
// PREVISÃO DE ESTOQUE MRP — agenda 7 dias × consumo das fichas
// Cruza pedidos ativos (não entregues, sem baixa) com data de entrega
// nos próximos 7 dias e projeta ruptura por insumo com sugestão de compra.
// ==========================================
function formatarQtdMRP(qtd, unidade) {
  const n = Number(qtd) || 0;
  const txt = n >= 100 ? n.toFixed(0) : (n >= 10 ? n.toFixed(1) : n.toFixed(2));
  return `${txt.replace('.', ',').replace(/,0+$/, '').replace(/(\,\d)0$/, '$1')}${unidade ? esc(unidade) : ''}`;
}

let _mrpCache = { chave: null, valor: null };
function calcularPrevisaoEstoqueMRP(diasAlcance = 7) {
  // Cache: dashboard + sino chamam no mesmo render; chave barata invalida ao mudar dados
  try {
    const chave = diasAlcance + '|' + pedidos.length + '|' + fichas.length + '|' + insumos.length + '|'
      + pedidos.map(p => `${p.id}:${p.status}:${p.dataEntrega || ''}:${p.estoqueBaixado ? 1 : 0}:${(p.itens || []).map(it => `${it.fichaId || it.nome}:${it.qtd}`).join(',')}`).join(';') + '|'
      + fichas.map(f => `${f.id}:${f.rendimento || 1}:${(f.ingredientes || []).map(ing => `${ing.insumoId}:${ing.qtd}`).join(',')}`).join(';') + '|'
      + insumos.map(i => `${i.id}:${Number(i.estoqueAtual ?? i.quantidade) || 0}`).join(';');
    if (_mrpCache.chave === chave && _mrpCache.valor) return _mrpCache.valor;
    const valor = _calcularPrevisaoEstoqueMRP(diasAlcance);
    _mrpCache = { chave, valor };
    return valor;
  } catch (e) {
    return _calcularPrevisaoEstoqueMRP(diasAlcance);
  }
}

function _calcularPrevisaoEstoqueMRP(diasAlcance = 7) {
  const hojeISO = diaISO(0);
  const limiteISO = diaISO(diasAlcance - 1);
  // Pedidos que ainda vão consumir estoque: ativos, sem baixa, com entrega até o limite
  // (inclui atrasados e sem data — sem data conta como "precisa agora", dia 0)
  const alvos = pedidos.filter(p =>
    p.status !== 'pronto' &&
    !p.estoqueBaixado &&
    (!p.dataEntrega || p.dataEntrega <= limiteISO)
  );

  // Consumo por insumo por dia: { insumoId: { insumo, porDia: {iso: qtd}, pedidos: Set } }
  const mapa = {};
  const diasComProducao = new Set();
  alvos.forEach(p => {
    const isoAlvo = (!p.dataEntrega || p.dataEntrega < hojeISO) ? hojeISO : p.dataEntrega;
    diasComProducao.add(isoAlvo);
    (p.itens || []).forEach(item => {
      const ficha = fichas.find(f => f.id === item.fichaId || (item.nome && f.nome && f.nome.toLowerCase() === item.nome.toLowerCase()));
      if (!ficha || !ficha.ingredientes) return;
      const rendimento = Number(ficha.rendimento) > 0 ? Number(ficha.rendimento) : 1;
      const fator = (Number(item.qtd) || 1) / rendimento;
      ficha.ingredientes.forEach(ing => {
        const ins = insumos.find(i => i.id === ing.insumoId || (ing.nome && i.nome && i.nome.toLowerCase() === ing.nome.toLowerCase()));
        if (!ins) return;
        if (!mapa[ins.id]) {
          mapa[ins.id] = { insumo: ins, porDia: {}, total: 0, pedidosIds: new Set() };
        }
        const qtd = (Number(ing.qtd) || 0) * fator;
        mapa[ins.id].porDia[isoAlvo] = (mapa[ins.id].porDia[isoAlvo] || 0) + qtd;
        mapa[ins.id].total += qtd;
        mapa[ins.id].pedidosIds.add(p.id);
      });
    });
  });

  const alertas = [];
  Object.values(mapa).forEach(({ insumo, porDia, total, pedidosIds }) => {
    const estoque = Number(insumo.estoqueAtual ?? insumo.quantidade) || 0;
    const minimo = Number(insumo.alertaEstoqueMinimo ?? insumo.estoqueMinimo) || 0;
    const saldoProjetado = estoque - total;
    // Dia da ruptura: primeiro dia em que o acumulado supera o estoque
    let acumulado = 0;
    let diaRupturaISO = null;
    for (let d = 0; d < diasAlcance; d++) {
      const iso = diaISO(d);
      acumulado += porDia[iso] || 0;
      if (acumulado > estoque) { diaRupturaISO = iso; break; }
    }
    const deficit = Math.max(0, total - estoque);
    const qtdPacote = Number(insumo.qtdPacote) > 0 ? Number(insumo.qtdPacote) : 1;
    const pacotesSugeridos = deficit > 0 ? Math.ceil(deficit / qtdPacote) : 0;
    const custoUnit = getCustoUnitario(insumo);
    const critico = saldoProjetado < 0;
    const atencao = !critico && saldoProjetado < minimo;
    if (critico || atencao) {
      alertas.push({
        insumoId: insumo.id,
        nome: insumo.nome,
        unidade: insumo.unidade || 'g',
        estoque, minimo, total, saldoProjetado, deficit,
        diaRupturaISO, critico,
        pedidosAfetados: pedidosIds.size,
        pacotesSugeridos, qtdPacote,
        custoEstimado: pacotesSugeridos * (Number(insumo.precoPacote) || custoUnit * qtdPacote)
      });
    }
  });

  // Críticos (com ruptura) primeiro, ordenados pelo dia que acaba; depois atenção por menor saldo
  alertas.sort((a, b) => {
    if (a.critico !== b.critico) return a.critico ? -1 : 1;
    if (a.critico && b.critico) return (a.diaRupturaISO || '').localeCompare(b.diaRupturaISO || '');
    return a.saldoProjetado - b.saldoProjetado;
  });

  return { alertas, totalPedidos: alvos.length, diasComProducao: diasComProducao.size, alcance: diasAlcance };
}

function rotuloRupturaMRP(alerta) {
  if (!alerta.diaRupturaISO) return 'estoque insuficiente';
  const iso = alerta.diaRupturaISO;
  if (iso === diaISO(0)) return 'acaba hoje';
  if (iso === diaISO(1)) return 'acaba amanhã';
  const nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const dow = new Date(iso + 'T12:00:00').getDay();
  return `termina ${nomes[dow]} (${iso.split('-').reverse().slice(0, 2).join('/')})`;
}

function abrirModalConfirmarBaixa(pedidoId) {
  const ped = pedidos.find(p => p.id === pedidoId);
  if (!ped) return;

  const insumosConsumo = calcularInsumosDoPedido(ped);
  const temInsumos = insumosConsumo.length > 0;
  const algumInsuficiente = insumosConsumo.some(i => (i.estoqueAtual - i.qtdConsumo) < 0);

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-boxes-packing"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">
            ${ped.estoqueBaixado ? 'Status da Baixa de Estoque' : 'Confirmar Baixa de Estoque'}
          </h3>
          <p class="text-xs text-slate-500">
            Pedido #${ped.id} • Cliente: <strong>${ped.cliente}</strong>
          </p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Resumo dos itens do pedido -->
      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <p class="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Itens do Pedido:</p>
        <ul class="space-y-0.5 text-slate-600">
          ${(ped.itens || []).map(it => `
            <li class="flex items-center justify-between">
              <span>• <strong>${it.qtd}x</strong> ${it.nome}</span>
              <span class="text-slate-400">${formatMoeda((it.qtd || 1) * (it.precoUnit || 0))}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      ${ped.estoqueBaixado ? `
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <div>
              <p class="font-bold text-xs">Baixa de estoque já efetuada</p>
              <p class="text-[11px] text-emerald-700">
                ${ped.dataBaixaEstoque ? `Data da baixa: ${new Date(ped.dataBaixaEstoque).toLocaleString('pt-BR')}` : 'Os insumos correspondentes já foram debitados do estoque.'}
              </p>
            </div>
          </div>
          <button onclick="estornarEstoquePedido('${ped.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs">
            <i class="fa-solid fa-rotate-left mr-1"></i> Estornar Estoque
          </button>
        </div>
      ` : ''}

      ${algumInsuficiente && !ped.estoqueBaixado ? `
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2.5 text-xs">
          <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base shrink-0 mt-0.5"></i>
          <div>
            <p class="font-bold">Atenção: Saldo de insumo insuficiente</p>
            <p class="text-[11px] text-amber-700 mt-0.5">
              Um ou mais ingredientes ficarão com saldo negativo. O sistema permite confirmar a baixa para manter o registro real do consumo.
            </p>
          </div>
        </div>
      ` : ''}

      <!-- Tabela de Insumos a Serem Debitados -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wider">Insumos que serão consumidos:</p>
          <span class="text-[11px] text-slate-400">${insumosConsumo.length} ingredientes</span>
        </div>

        ${temInsumos ? `
          <div class="overflow-x-auto border border-slate-200 rounded-xl max-h-56 overflow-y-auto">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
                <tr>
                  <th class="p-2.5">Insumo</th>
                  <th class="p-2.5 text-center">Consumo</th>
                  <th class="p-2.5 text-center">Estoque Atual</th>
                  <th class="p-2.5 text-center">Novo Saldo</th>
                  <th class="p-2.5 text-center">Situação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${insumosConsumo.map(item => {
                  const novoSaldo = Number((item.estoqueAtual - item.qtdConsumo).toFixed(3));
                  const isNegativo = novoSaldo < 0;
                  const isBaixo = novoSaldo <= item.estoqueMinimo;

                  return `
                    <tr class="hover:bg-slate-50/60">
                      <td class="p-2.5 font-semibold text-slate-800">${item.nome}</td>
                      <td class="p-2.5 text-center font-bold text-pink-600">
                        -${item.qtdConsumo.toFixed(2)} ${item.unidade}
                      </td>
                      <td class="p-2.5 text-center text-slate-500">
                        ${item.estoqueAtual.toFixed(2)} ${item.unidade}
                      </td>
                      <td class="p-2.5 text-center font-bold ${isNegativo ? 'text-red-600' : isBaixo ? 'text-amber-600' : 'text-emerald-600'}">
                        ${novoSaldo.toFixed(2)} ${item.unidade}
                      </td>
                      <td class="p-2.5 text-center">
                        ${isNegativo ? `
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">Insuficiente</span>
                        ` : isBaixo ? `
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">Ficará Baixo</span>
                        ` : `
                          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Disponível</span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-dashed border-slate-200">
            Nenhum ingrediente configurado nas fichas técnicas para os itens deste pedido.
          </div>
        `}
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
          Fechar
        </button>
        ${!ped.estoqueBaixado && temInsumos ? `
          <button 
            type="button" 
            onclick="darBaixaEstoquePedido('${ped.id}')" 
            class="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <i class="fa-solid fa-check-double"></i> Confirmar Baixa no Estoque
          </button>
        ` : ''}
      </div>
    </div>
  `);
}

function darBaixaEstoquePedido(pedidoId) {
  const ped = pedidos.find(p => p.id === pedidoId);
  if (!ped) return;

  if (ped.estoqueBaixado) {
    showToast('O estoque deste pedido já foi baixado anteriormente!', false);
    fecharModal();
    return;
  }

  const itensConsumidos = calcularInsumosDoPedido(ped);
  if (itensConsumidos.length === 0) {
    showToast('Este pedido não possui ingredientes vinculados para baixa.', false);
    fecharModal();
    return;
  }

  let itensAtualizados = 0;
  itensConsumidos.forEach(itemConsumo => {
    const ins = insumos.find(i => i.id === itemConsumo.insumoId);
    if (ins) {
      const atual = Number(ins.quantidade !== undefined ? ins.quantidade : ins.estoqueAtual) || 0;
      const novoValor = Number((atual - itemConsumo.qtdConsumo).toFixed(3));
      ins.estoqueAtual = novoValor;
      ins.quantidade = novoValor;
      itensAtualizados++;
    }
  });

  ped.estoqueBaixado = true;
  ped.dataBaixaEstoque = new Date().toISOString();

  saveData(STORAGE_KEYS.INSUMOS);
  saveData(STORAGE_KEYS.PEDIDOS);
  updateBadges();
  fecharModal();

  showToast(`Baixa de estoque realizada! ${itensAtualizados} insumos debitados.`);
  renderCurrentTab();
}

function estornarEstoquePedido(pedidoId) {
  const ped = pedidos.find(p => p.id === pedidoId);
  if (!ped) return;

  if (!ped.estoqueBaixado) {
    showToast('Este pedido ainda não teve baixa de estoque realizada!', false);
    return;
  }

  if (!confirm(`Deseja realmente estornar os insumos do pedido de "${ped.cliente}" de volta ao estoque físico?`)) {
    return;
  }

  const itensConsumidos = calcularInsumosDoPedido(ped);
  let itensAtualizados = 0;
  itensConsumidos.forEach(itemConsumo => {
    const ins = insumos.find(i => i.id === itemConsumo.insumoId);
    if (ins) {
      const atual = Number(ins.quantidade !== undefined ? ins.quantidade : ins.estoqueAtual) || 0;
      const novoValor = Number((atual + itemConsumo.qtdConsumo).toFixed(3));
      ins.estoqueAtual = novoValor;
      ins.quantidade = novoValor;
      itensAtualizados++;
    }
  });

  ped.estoqueBaixado = false;
  delete ped.dataBaixaEstoque;

  saveData(STORAGE_KEYS.INSUMOS);
  saveData(STORAGE_KEYS.PEDIDOS);
  updateBadges();
  fecharModal();

  showToast(`Estorno concluído! Insumos de "${ped.cliente}" devolvidos ao estoque.`);
  renderCurrentTab();
}

// ==========================================
// INTEGRAÇÃO DE PEDIDOS COM O FLUXO DE CAIXA
// ==========================================

function obterLancamentosDoPedido(pedidoId) {
  if (!pedidoId) return [];
  const idx = indiceLancsPorPedido();
  return idx[pedidoId] || [];
}

function calcularStatusCaixaPedido(pedido) {
  if (!pedido) return { totalLancado: 0, valorLiquidoEsperado: 0, saldoPendente: 0, status: 'pendente', lancamentos: [] };
  
  const fin = calcularFinanceiroPedido(pedido);
  // Valor que efetivamente entra no caixa (descontada a taxa de intermediação de app, se houver)
  const valorLiquidoEsperado = Number((fin.total - fin.taxaApp).toFixed(2));
  
  const lancs = obterLancamentosDoPedido(pedido.id);
  const totalLancado = Number(lancs.filter(l => l.tipo === 'entrada').reduce((acc, l) => acc + (Number(l.valor) || 0), 0).toFixed(2));
  
  const saldoPendente = Number(Math.max(0, valorLiquidoEsperado - totalLancado).toFixed(2));
  
  let status = 'pendente';
  if (totalLancado >= valorLiquidoEsperado && valorLiquidoEsperado > 0) {
    status = 'quitado';
  } else if (totalLancado > 0) {
    status = 'parcial';
  }

  return {
    totalLancado,
    valorLiquidoEsperado,
    saldoPendente,
    status,
    lancamentos: lancs
  };
}

function abrirModalLancarCaixa(pedidoId, sugestaoTipo = null) {
  const ped = pedidos.find(p => p.id === pedidoId);
  if (!ped) return;

  const fin = calcularFinanceiroPedido(ped);
  const statusCaixa = calcularStatusCaixaPedido(ped);
  const sinalEsperado = Number(ped.valorSinal) || 0;

  // Determinar sugestão inicial de valor e descrição
  let valorSugerido = statusCaixa.saldoPendente;
  let descSugerida = `Venda Pedido #${ped.id} - ${ped.cliente}`;

  if (sugestaoTipo === 'sinal' || (statusCaixa.totalLancado === 0 && sinalEsperado > 0)) {
    valorSugerido = sinalEsperado;
    descSugerida = `Sinal Pedido #${ped.id} - ${ped.cliente}`;
  } else if (sugestaoTipo === 'restante' || (statusCaixa.totalLancado > 0 && statusCaixa.saldoPendente > 0)) {
    valorSugerido = statusCaixa.saldoPendente;
    descSugerida = `Restante Pedido #${ped.id} - ${ped.cliente}`;
  } else if (statusCaixa.status === 'quitado') {
    valorSugerido = 0;
  }

  // Forma de pagamento sugerida
  const formaSugerida = (ped.canal === 'iFood' || ped.canal === '99Food') ? 'Repasse App' : 'PIX';

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-cash-register"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">
            Lançar Recebimento no Caixa
          </h3>
          <p class="text-xs text-slate-500">
            Pedido #${ped.id} • Cliente: <strong>${ped.cliente}</strong> (${ped.canal || 'Balcão'})
          </p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Card Resumo Financeiro do Pedido -->
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
        <div class="flex items-center justify-between font-bold text-slate-800">
          <span>Valor Total Bruto:</span>
          <span>${formatMoeda(fin.total)}</span>
        </div>
        ${fin.taxaApp > 0 ? `
          <div class="flex items-center justify-between text-red-500 font-semibold">
            <span>Taxa do Canal (${ped.taxaPercentual}%):</span>
            <span>-${formatMoeda(fin.taxaApp)}</span>
          </div>
        ` : ''}
        <div class="flex items-center justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
          <span>Valor Líquido a Receber:</span>
          <span class="text-teal-700 font-extrabold text-sm">${formatMoeda(statusCaixa.valorLiquidoEsperado)}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 text-[11px]">
          <div>
            <span class="text-slate-500 block">Já Lançado no Caixa:</span>
            <span class="font-bold text-emerald-600">${formatMoeda(statusCaixa.totalLancado)}</span>
          </div>
          <div class="text-right">
            <span class="text-slate-500 block">Saldo Pendente:</span>
            <span class="font-bold ${statusCaixa.saldoPendente > 0 ? 'text-amber-600' : 'text-slate-400'}">${formatMoeda(statusCaixa.saldoPendente)}</span>
          </div>
        </div>
      </div>

      <!-- Lançamentos Existentes Deste Pedido -->
      ${statusCaixa.lancamentos.length > 0 ? `
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-xs font-bold text-slate-700 uppercase tracking-wider">Lançamentos já feitos no Caixa:</p>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${statusCaixa.lancamentos.length} registro(s)</span>
          </div>
          <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl max-h-32 overflow-y-auto text-xs bg-white">
            ${statusCaixa.lancamentos.map(l => `
              <div class="p-2.5 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <p class="font-semibold text-slate-800">${l.descricao}</p>
                  <p class="text-[10px] text-slate-500">${l.data} • Forma: ${l.forma}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-emerald-600">+${formatMoeda(l.valor)}</span>
                  <button onclick="excluirLancamento('${l.id}')" title="Excluir este lançamento" class="text-slate-400 hover:text-red-600 p-1 cursor-pointer">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Formulário de Novo Lançamento -->
      <form id="formLancarCaixaPedido" onsubmit="confirmarLancarPedidoNoCaixa(event, '${ped.id}')" class="space-y-3 pt-1">
        <div class="flex items-center justify-between">
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">Novo Lançamento:</label>
          <!-- Atalhos Rápidos -->
          <div class="flex items-center gap-1.5">
            ${sinalEsperado > 0 && statusCaixa.totalLancado < sinalEsperado ? `
              <button 
                type="button" 
                onclick="definirValoresRapidosLancarCaixa(${sinalEsperado}, '${ped.id}', 'sinal')"
                class="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer"
              >
                Sinal (${formatMoeda(sinalEsperado)})
              </button>
            ` : ''}
            ${statusCaixa.saldoPendente > 0 ? `
              <button 
                type="button" 
                onclick="definirValoresRapidosLancarCaixa(${statusCaixa.saldoPendente}, '${ped.id}', '${statusCaixa.totalLancado > 0 ? 'restante' : 'total'}')"
                class="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 cursor-pointer"
              >
                ${statusCaixa.totalLancado > 0 ? 'Restante' : 'Quitar'} (${formatMoeda(statusCaixa.saldoPendente)})
              </button>
            ` : ''}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Data do Recebimento</label>
            <input type="date" id="lanPedData" value="${new Date().toISOString().split('T')[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
            <select id="lanPedForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500">
              <option value="PIX" ${formaSugerida === 'PIX' ? 'selected' : ''}>PIX</option>
              <option value="Dinheiro">Dinheiro em Espécie</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="Repasse App" ${formaSugerida === 'Repasse App' ? 'selected' : ''}>Repasse App (${ped.canal || 'App'})</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2">
            <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
            <input type="text" id="lanPedDescricao" value="${esc(descSugerida)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-teal-500" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Valor a Entrar (R$)</label>
            <input type="number" step="0.01" id="lanPedValor" value="${valorSugerido.toFixed(2)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold text-xs focus:outline-teal-500" />
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-200">
          <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-check"></i> Confirmar Lançamento no Caixa
          </button>
        </div>
      </form>
    </div>
  `);
}

function definirValoresRapidosLancarCaixa(valor, pedidoId, tipo) {
  const inputValor = document.getElementById('lanPedValor');
  const inputDesc = document.getElementById('lanPedDescricao');
  const ped = pedidos.find(p => p.id === pedidoId);
  const rotulo = tipo === 'sinal' ? 'Sinal' : (tipo === 'restante' ? 'Restante' : 'Total');
  if (inputValor) inputValor.value = Number(valor).toFixed(2);
  if (inputDesc) inputDesc.value = `${rotulo} Pedido #${pedidoId} - ${ped ? ped.cliente : ''}`;
}

function confirmarLancarPedidoNoCaixa(event, pedidoId) {
  event.preventDefault();
  const ped = pedidos.find(p => p.id === pedidoId);
  if (!ped) return;

  const data = document.getElementById('lanPedData').value;
  const forma = document.getElementById('lanPedForma').value;
  const descricao = document.getElementById('lanPedDescricao').value.trim();
  const valor = Number(document.getElementById('lanPedValor').value) || 0;

  if (valor <= 0) {
    alert('Informe um valor válido maior que zero para o lançamento!');
    return;
  }

  const novoLancamento = {
    id: 'lan-' + Date.now(),
    pedidoId: ped.id,
    data,
    tipo: 'entrada',
    categoria: 'Venda de Pedido',
    forma,
    descricao: descricao || `Venda Pedido #${ped.id} - ${ped.cliente}`,
    valor
  };

  lancamentos.unshift(novoLancamento);
  saveData(STORAGE_KEYS.LANCAMENTOS);
  fecharModal();

  showToast(`Recebimento de ${formatMoeda(valor)} lançado no Caixa!`);
  renderCurrentTab();
}

function abrirModalLancarCompraMRPCaixa(custoTotal) {
  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Registrar Compra de Insumos no Caixa</h3>
          <p class="text-xs text-slate-500">Lançamento de despesa gerada pela lista de compras do MRP</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <form onsubmit="confirmarLancarCompraMRPCaixa(event)" class="mt-4 space-y-3 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data da Compra</label>
          <input type="date" id="lanMRPData" value="${new Date().toISOString().split('T')[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
          <select id="lanMRPForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500">
            <option value="PIX">PIX</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
        <input type="text" id="lanMRPDescricao" value="Compra de insumos p/ encomendas ativas (MRP)" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-red-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Valor Total Pago (R$)</label>
        <input type="number" step="0.01" id="lanMRPValor" value="${Number(custoTotal || 0).toFixed(2)}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold text-sm focus:outline-red-500" />
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer">
          Cancelar
        </button>
        <button type="submit" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer">
          <i class="fa-solid fa-arrow-up-long"></i> Lançar Saída no Caixa
        </button>
      </div>
    </form>
  `);
}

function confirmarLancarCompraMRPCaixa(e) {
  e.preventDefault();
  const data = document.getElementById('lanMRPData').value;
  const forma = document.getElementById('lanMRPForma').value;
  const descricao = document.getElementById('lanMRPDescricao').value.trim();
  const valor = Number(document.getElementById('lanMRPValor').value) || 0;

  if (valor <= 0) {
    alert('Informe um valor válido maior que zero!');
    return;
  }

  lancamentos.unshift({
    id: 'lan-' + Date.now(),
    data,
    tipo: 'saida',
    categoria: 'Compra de Insumos',
    forma,
    descricao,
    valor
  });

  saveData(STORAGE_KEYS.LANCAMENTOS);
  fecharModal();
  showToast(`Despesa de ${formatMoeda(valor)} lançada no Caixa!`);
  renderCurrentTab();
}

// ==========================================
// 1. MÓDULO DASHBOARD & METAS
// ==========================================
// ==========================================
// BLOCOS COLAPSÁVEIS (dashboard) — estado salvo no navegador.
// Funciona só no DOM (data-bloco / data-bloco-toggle / data-bloco-body),
// o que evita reescrever os templates grandes.
// ==========================================
function blocoAberto(id) {
  return localStorage.getItem(`confeitaria_bloco_${id}`) !== 'fechado';
}

// Liga os blocos recolhíveis marcados com data-bloco / data-bloco-toggle / data-bloco-body.
// Feito no DOM (depois do innerHTML) para não precisar reescrever os templates grandes.
function ligarBlocosColapsaveis() {
  document.querySelectorAll('[data-bloco-toggle]').forEach(btn => {
    if (btn.dataset.ligado === '1') return;
    btn.dataset.ligado = '1';
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const id = btn.dataset.blocoToggle;
      const body = document.querySelector('[data-bloco-body="' + id + '"]');
      if (!body) return;
      const aberto = !body.classList.contains('hidden');
      body.classList.toggle('hidden', aberto);
      const icone = btn.querySelector('i');
      if (icone) icone.style.transform = aberto ? 'rotate(-90deg)' : '';
      btn.title = aberto ? 'Expandir bloco' : 'Recolher bloco';
      localStorage.setItem('confeitaria_bloco_' + id, aberto ? 'fechado' : 'aberto');
    });
  });
  // Aplica o estado salvo
  document.querySelectorAll('[data-bloco]').forEach(card => {
    const id = card.dataset.bloco;
    const body = document.querySelector('[data-bloco-body="' + id + '"]');
    const btn = document.querySelector('[data-bloco-toggle="' + id + '"]');
    if (!body || !btn || blocoAberto(id)) return;
    body.classList.add('hidden');
    const icone = btn.querySelector('i');
    if (icone) icone.style.transform = 'rotate(-90deg)';
  });
}

function renderDashboard() {
  const container = document.getElementById('tab-dashboard');
  if (!container) return;

  // 1. Cálculos de Faturamento & Vendas Reais
  const faturamentoTotal = pedidos.reduce((acc, p) => acc + (Number(p.valorTotal) || 0), 0);
  const totalSinalRecebido = pedidos.reduce((acc, p) => acc + (Number(p.valorSinal) || 0), 0);
  const totalSaldoPendente = Math.max(0, faturamentoTotal - totalSinalRecebido);

  // 2. Cálculos de Pedidos & Operação Real
  const totalPedidosQtd = pedidos.length;
  const pedidosAguardando = pedidos.filter(p => p.status === 'aguardando').length;
  const pedidosAProduzir = pedidos.filter(p => p.status === 'a_produzir').length;
  const pedidosProducao = pedidos.filter(p => p.status === 'producao').length;
  const pedidosProntos = pedidos.filter(p => p.status === 'pronto').length;
  const pedidosAtivosQtd = pedidosAguardando + pedidosAProduzir + pedidosProducao;
  const ticketMedioAtual = totalPedidosQtd > 0 ? (faturamentoTotal / totalPedidosQtd) : 0;

  // 3. Cálculos de Custos Reais (CMV, Taxas e Fixos)
  let totalCMV = 0;
  let totalTaxas = 0;
  let totalLucroPedidos = 0;

  pedidos.forEach(p => {
    const fin = calcularFinanceiroPedido(p);
    totalCMV += fin.cmvTotal;
    totalTaxas += fin.taxaApp;
    totalLucroPedidos += fin.lucroLiquido;
  });

  const custosFixos = Number(metas.custosFixosMensais ?? 0);
  const custoTotalConsolidado = totalCMV + totalTaxas + custosFixos;
  const cmvPercentual = faturamentoTotal > 0 ? ((totalCMV / faturamentoTotal) * 100) : 0;
  const taxasPercentual = faturamentoTotal > 0 ? ((totalTaxas / faturamentoTotal) * 100) : 0;

  // Despesas pagas no caixa
  const totalSaidasCaixa = lancamentos.filter(l => l.tipo === 'saida').reduce((acc, l) => acc + (Number(l.valor) || 0), 0);
  const totalEntradasCaixa = lancamentos.filter(l => l.tipo === 'entrada').reduce((acc, l) => acc + (Number(l.valor) || 0), 0);
  const saldoCaixaAtual = totalEntradasCaixa - totalSaidasCaixa;

  // 4. Lucro Líquido Real & Margem Operacional
  const totalLucroReal = faturamentoTotal - totalCMV - totalTaxas - custosFixos;
  const margemLucroReal = faturamentoTotal > 0 ? ((totalLucroReal / faturamentoTotal) * 100) : 0;

  // 5. Capital em Estoque e Alertas
  const valorTotalEstoque = insumos.reduce((acc, i) => acc + (getCustoUnitario(i) * (Number(i.estoqueAtual) || 0)), 0);
  const itensEstoqueBaixo = insumos.filter(i => (Number(i.estoqueAtual) || 0) <= (Number(i.estoqueMinimo) || 0));

  // 6. Metas & Pró-labore
  const metaMes = Number(metas.faturamentoMensal ?? 0);
  const metaAno = Number(metas.faturamentoAnual ?? 0);
  const progressoMeta = metaMes > 0 ? Math.min(100, Math.round((faturamentoTotal / metaMes) * 100)) : 0;
  const faturamentoFaltante = Math.max(0, metaMes - faturamentoTotal);

  const ticketRef = ticketMedioAtual > 0 ? ticketMedioAtual : 85.00;
  const pedidosNecMes = Math.ceil(metaMes / ticketRef);
  const pedidosNecAno = Math.ceil(metaAno / ticketRef);
  const pedidosFaltantes = Math.max(0, pedidosNecMes - totalPedidosQtd);

  // Projeção de Pró-labore com a meta
  const cmvEstMeta = metaMes * (Number(metas.cmvMedioPercentual ?? 0) / 100);
  const taxasEstMeta = metaMes * (Number(metas.taxaAppMediaPercentual ?? 0) / 100);
  const proLaboreProjetado = Math.max(0, metaMes - cmvEstMeta - taxasEstMeta - custosFixos);

  // 7. Comparativo por Canal de Venda
  const canais = {
    'WhatsApp': { nome: 'WhatsApp / Venda Direta', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-emerald-500', icone: 'fa-whatsapp' },
    'iFood': { nome: 'iFood Delivery', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-red-500', icone: 'fa-motorcycle' },
    '99Food': { nome: '99Food / Outros Apps', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-amber-500', icone: 'fa-utensils' },
    'Balcão': { nome: 'Balcão / Encomenda', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-blue-500', icone: 'fa-store' }
  };

  pedidos.forEach(p => {
    const canalNome = p.canal || 'WhatsApp';
    if (!canais[canalNome]) {
      canais[canalNome] = { nome: canalNome, pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-indigo-500', icone: 'fa-tag' };
    }
    canais[canalNome].pedidos += 1;
    canais[canalNome].faturamento += Number(p.valorTotal) || 0;
    const fin = calcularFinanceiroPedido(p);
    canais[canalNome].taxa += fin.taxaApp;
  });

  // 8. Próximos Pedidos Ordenados por Data/Hora de Entrega
  const proximosPedidos = [...pedidos]
    .filter(p => p.status !== 'pronto')
    .sort((a, b) => (a.dataEntrega + a.horaEntrega).localeCompare(b.dataEntrega + b.horaEntrega))
    .slice(0, 5);

  container.innerHTML = `
    <!-- Top Header do Dashboard com Ações Rápidas -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Painel de Controle Operacional</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          O dia a dia: agenda, estoque para os próximos 7 dias e próximas entregas
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button 
          onclick="abrirModalPedido()" 
          class="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <i class="fa-solid fa-plus text-xs"></i> Novo Pedido
        </button>
        <button 
          onclick="abrirModalLancamento()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
        >
          <i class="fa-solid fa-receipt text-teal-600"></i> Lançar Caixa
        </button>
        <button 
          onclick="switchTab('cardapio')" 
          class="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          title="Montar o cardápio da semana e ver datas temáticas"
        >
          <i class="fa-solid fa-calendar-days"></i> Cardápio
        </button>
        <button 
          onclick="abrirModalMetas()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          title="Ajustar metas mensais e custos fixos"
        >
          <i class="fa-solid fa-sliders text-pink-600"></i> Metas
        </button>
        <button 
          onclick="abrirFechamentoDia()" 
          class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
          title="Resumo do dia: faturamento, lucro, pedidos e estoque"
        >
          <i class="fa-solid fa-moon text-purple-600"></i> Fechar o dia
        </button>
      </div>
    </div>

    <!-- Banner de Alertas Operacionais Imediatos (se houver estoque baixo ou pedidos aguardando) -->
    ${(itensEstoqueBaixo.length > 0 || pedidosAguardando > 0) ? `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${itensEstoqueBaixo.length > 0 ? `
          <div class="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-triangle-exclamation text-sm"></i>
              </span>
              <div class="truncate">
                <p class="text-xs font-bold leading-tight">Alerta de Estoque: ${itensEstoqueBaixo.length} insumo(s) crítico(s)</p>
                <p class="text-[11px] text-amber-700 truncate">${itensEstoqueBaixo.map(i => i.nome).join(', ')}</p>
              </div>
            </div>
            <button onclick="switchTab('estoque')" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 shrink-0 cursor-pointer transition-colors">
              Repor
            </button>
          </div>
        ` : ''}

        ${pedidosAguardando > 0 ? `
          <div class="p-3.5 rounded-2xl bg-purple-50/90 border border-purple-200/80 text-purple-900 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-clock text-sm"></i>
              </span>
              <div class="truncate">
                <p class="text-xs font-bold leading-tight">${pedidosAguardando} pedido(s) aguardando confirmação</p>
                <p class="text-[11px] text-purple-700">Verifique sinais e aprove para iniciar a produção</p>
              </div>
            </div>
            <button onclick="switchTab('pedidos')" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-200/80 hover:bg-purple-300 text-purple-900 shrink-0 cursor-pointer transition-colors">
              Ver Kanban
            </button>
          </div>
        ` : ''}
      </div>
    ` : ''}

    <!-- CARDS DE MÉTRICAS PRINCIPAIS DINÂMICOS: Faturamento, Pedidos, Custos e Lucro Líquido -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- CARD 1: FATURAMENTO -->
      <div id="card-faturamento" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-pink-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Faturamento</span>
          <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-sack-dollar"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">${formatMoeda(faturamentoTotal)}</p>
          <div class="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Meta (${formatMoeda(metaMes)})</span>
            <span class="font-bold text-pink-600">${progressoMeta}%</span>
          </div>
          <div class="mt-1 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div class="bg-pink-600 h-full rounded-full transition-all duration-500" style="width: ${progressoMeta}%"></div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span class="text-emerald-600 font-semibold" title="Sinais já recebidos">
            <i class="fa-solid fa-circle-check text-[10px] mr-1"></i>Sinal: ${formatMoeda(totalSinalRecebido)}
          </span>
          <span class="text-slate-500 font-medium" title="Saldo pendente a receber">
            A rec.: <strong class="text-slate-700">${formatMoeda(totalSaldoPendente)}</strong>
          </span>
        </div>
      </div>

      <!-- CARD 2: PEDIDOS -->
      <div id="card-pedidos" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pedidos</span>
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-receipt"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">
            ${totalPedidosQtd} <span class="text-xs font-semibold text-slate-500">pedidos</span>
          </p>
          <p class="text-xs font-medium text-slate-500 mt-1">
            Ticket Médio: <strong class="text-slate-800">${formatMoeda(ticketMedioAtual)}</strong>
          </p>
          <div class="mt-2 flex items-center gap-1.5 flex-wrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
              ${pedidosAtivosQtd} em produção
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
              ${pedidosProntos} entregues
            </span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onclick="switchTab('pedidos')" class="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
            Abrir Kanban <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
          <span class="text-slate-400">${pedidosAguardando} aguardando</span>
        </div>
      </div>

      <!-- CARD 3: CUSTOS (CMV DAS FICHAS TÉCNICAS + TAXAS + FIXOS) -->
      <div id="card-custos" class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-200 transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Custos</span>
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black text-slate-900 leading-tight">${formatMoeda(custoTotalConsolidado)}</p>
          <div class="mt-1.5 space-y-1 text-xs">
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-cookie-bite text-amber-500 text-[10px]"></i> Insumos (Fichas):</span>
              <strong class="text-slate-800">${formatMoeda(totalCMV)} <span class="font-normal text-[11px] text-slate-500">(${cmvPercentual.toFixed(1)}%)</span></strong>
            </div>
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-percent text-rose-400 text-[10px]"></i> Taxas de Canais:</span>
              <strong class="text-slate-800">${formatMoeda(totalTaxas)} <span class="font-normal text-[11px] text-slate-500">(${taxasPercentual.toFixed(1)}%)</span></strong>
            </div>
            <div class="flex items-center justify-between text-slate-600">
              <span class="flex items-center gap-1"><i class="fa-solid fa-building text-slate-400 text-[10px]"></i> Custos Fixos:</span>
              <strong class="text-slate-800">${formatMoeda(custosFixos)}</strong>
            </div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <button onclick="switchTab('fichas')" class="text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer">
            Fichas Técnicas <i class="fa-solid fa-chevron-right text-[9px]"></i>
          </button>
          <span class="text-slate-500" title="Estoque em insumos">
            Estoque: <strong class="text-slate-700">${formatMoeda(valorTotalEstoque)}</strong>
          </span>
        </div>
      </div>

      <!-- CARD 4: LUCRO LÍQUIDO -->
      <div id="card-lucro" data-card="lucro-liquido" class="bg-white p-4 sm:p-5 rounded-2xl border ${totalLucroReal >= 0 ? 'border-emerald-200/80 bg-emerald-50/20' : 'border-red-200 bg-red-50/20'} shadow-xs flex flex-col justify-between transition-all">
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Lucro Líquido</span>
          <div class="w-10 h-10 rounded-xl ${totalLucroReal >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-wallet"></i>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-2xl font-black ${totalLucroReal >= 0 ? 'text-emerald-600' : 'text-red-600'} leading-tight">
            ${formatMoeda(totalLucroReal)}
          </p>
          <div class="mt-2 flex items-center justify-between text-xs">
            <span class="font-medium text-slate-500">Margem Real:</span>
            <span class="font-bold px-2 py-0.5 rounded-md ${margemLucroReal >= 40 ? 'bg-emerald-100 text-emerald-800' : margemLucroReal >= 20 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}">
              ${margemLucroReal.toFixed(1)}%
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mt-2">
            Resultado real livre após insumos, taxas e custos fixos
          </p>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span class="font-semibold ${totalLucroReal >= 0 ? 'text-emerald-700' : 'text-red-700'} flex items-center gap-1">
            <i class="fa-solid ${totalLucroReal >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i>
            ${totalLucroReal >= 0 ? 'Operação Positiva' : 'Abaixo do Ponto'}
          </span>
          <button onclick="switchTab('caixa')" class="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer">
            Caixa: <strong class="${saldoCaixaAtual >= 0 ? 'text-teal-700' : 'text-red-600'}">${formatMoeda(saldoCaixaAtual)}</strong>
          </button>
        </div>
      </div>

    </div>

    <!-- BLOCO 1.6: PREVISÃO DE ESTOQUE MRP — próximos 7 dias -->
    ${(() => {
      const mrp = calcularPrevisaoEstoqueMRP(7);
      const criticos = mrp.alertas.filter(a => a.critico).length;
      const cards = mrp.alertas.slice(0, 4).map(a => {
        const pct = a.total > 0 ? Math.min(100, Math.max(0, (a.estoque / a.total) * 100)) : 100;
        return `<div class="rounded-xl border ${a.critico ? 'border-red-200 bg-red-50/60' : 'border-amber-200 bg-amber-50/60'} p-3">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-slate-900 text-sm truncate">${esc(a.nome)}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${a.critico ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-800 border border-amber-200'}">
              ${a.critico ? `<i class="fa-solid fa-triangle-exclamation"></i> ${rotuloRupturaMRP(a)}` : 'Atenção'}
            </span>
          </div>
          <div class="mt-2 h-1.5 rounded-full bg-white border border-slate-200 overflow-hidden">
            <div class="h-full rounded-full ${a.critico ? 'bg-red-500' : 'bg-amber-400'}" style="width:${pct.toFixed(0)}%"></div>
          </div>
          <p class="text-[11px] text-slate-600 mt-1.5">
            Estoque <strong>${formatarQtdMRP(a.estoque, a.unidade)}</strong> • precisa <strong>${formatarQtdMRP(a.total, a.unidade)}</strong> em ${a.pedidosAfetados} pedido(s)
            ${a.critico ? ` • falta <strong class="text-red-700">${formatarQtdMRP(a.deficit, a.unidade)}</strong>` : ` • sobra <strong>${formatarQtdMRP(a.saldoProjetado, a.unidade)}</strong>`}
          </p>
          ${a.critico && a.pacotesSugeridos > 0 ? `
          <p class="text-[11px] font-semibold text-slate-800 mt-1 flex items-center gap-1">
            <i class="fa-solid fa-cart-shopping text-emerald-600"></i>
            Comprar ${a.pacotesSugeridos}x pct (${formatarQtdMRP(a.qtdPacote, a.unidade)}/pct)${a.custoEstimado > 0 ? ` ≈ ${formatMoeda(a.custoEstimado)}` : ''}
          </p>` : ''}
        </div>`;
      }).join('');
      const corIconeM = criticos > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600';
      return `<div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs" data-bloco="mrp">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 rounded-xl ${corIconeM} flex items-center justify-center text-lg shrink-0">
              <i class="fa-solid fa-boxes-stacked"></i>
            </span>
            <div class="min-w-0">
              <h3 class="font-bold text-slate-900 text-base truncate">Previsão de estoque — 7 dias</h3>
              <p class="text-xs text-slate-500">${mrp.totalPedidos} pedido(s) na agenda • ${criticos > 0 ? `<strong class="text-red-600">${criticos} insumo(s) em ruptura</strong>` : '<strong class="text-emerald-600">estoque OK para a agenda</strong>'}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button onclick="switchTab('estoque')" class="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">Ver estoque</button>
            <button data-bloco-toggle="mrp" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center cursor-pointer" title="Recolher bloco">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
        <div data-bloco-body="mrp" class="mt-3">
        ${mrp.alertas.length === 0
          ? `<div class="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
               <p class="text-sm font-bold text-emerald-800"><i class="fa-solid fa-circle-check"></i> Tudo certo!</p>
               <p class="text-[11px] text-emerald-700 mt-0.5">Nenhum insumo estoura nos próximos 7 dias com a agenda atual.</p>
             </div>`
          : `<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">${cards}</div>
             ${mrp.alertas.length > 4 ? `<p class="text-[11px] text-slate-400 mt-2">+${mrp.alertas.length - 4} outro(s) em atenção — abra o sino <i class="fa-solid fa-bell"></i> para ver todos.</p>` : ''}`}
        </div>
      </div>`;
    })()}

    <!-- BLOCO 2: ATALHO PARA RELATÓRIOS (metas, canais e evolução foram para a aba Relatórios) -->
    <div class="bg-gradient-to-r from-indigo-50 via-white to-purple-50 rounded-2xl border border-indigo-100 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-sm">Metas, canais e evolução em Relatórios</h3>
          <p class="text-xs text-slate-500">Progresso do mês: <strong class="text-pink-600">${progressoMeta}%</strong> de ${formatMoeda(metaMes)} • pró-labore projetado: <strong>${formatMoeda(proLaboreProjetado)}</strong></p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="abrirModalMetas()" class="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-2 rounded-xl transition-colors cursor-pointer">
          <i class="fa-solid fa-sliders"></i> Metas
        </button>
        <button onclick="switchTab('relatorios')" class="text-xs font-bold text-white px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer" style="background:linear-gradient(135deg,#4F46E5,#7C3AED)">
          Ver relatórios <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </button>
      </div>
    </div>

    <!-- BLOCO 3: PRÓXIMAS ENTREGAS PRIORITÁRIAS & ATALHOS KANBAN -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs" data-bloco="entregas">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
            <i class="fa-solid fa-calendar-check"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Próximas Entregas Pendentes</h3>
            <p class="text-xs text-slate-500">Fila de encomendas ativas organizada por cronograma</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="switchTab('pedidos')" class="text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
            <i class="fa-solid fa-table-columns"></i> Kanban
          </button>
          <button data-bloco-toggle="entregas" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center cursor-pointer" title="Recolher bloco">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>

      <div data-bloco-body="entregas" class="mt-4 overflow-x-auto">
        ${proximosPedidos.length > 0 ? `
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th class="px-3 py-2.5 rounded-l-lg">Cliente</th>
                <th class="px-3 py-2.5">Entrega Programada</th>
                <th class="px-3 py-2.5">Itens do Pedido</th>
                <th class="px-3 py-2.5">Canal</th>
                <th class="px-3 py-2.5">Valor Total</th>
                <th class="px-3 py-2.5">Status</th>
                <th class="px-3 py-2.5">Estoque</th>
                <th class="px-3 py-2.5">Caixa</th>
                <th class="px-3 py-2.5 text-right rounded-r-lg">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${proximosPedidos.map(p => {
                const statusBadge = 
                  p.status === 'aguardando' ? 'bg-amber-100 text-amber-800' :
                  p.status === 'a_produzir' ? 'bg-blue-100 text-blue-800' :
                  p.status === 'producao' ? 'bg-purple-100 text-purple-800' :
                  'bg-emerald-100 text-emerald-800';

                const statusNome = 
                  p.status === 'aguardando' ? 'Aguardando' :
                  p.status === 'a_produzir' ? 'A Produzir' :
                  p.status === 'producao' ? 'Em Produção' :
                  'Pronto / Entregue';

                const itensTexto = (p.itens || []).map(i => `${i.qtd}x ${i.nome}`).join(', ') || 'Nenhum item';

                return `
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="px-3 py-3 font-bold text-slate-900">
                      ${p.cliente}
                      <span class="block text-[10px] font-normal text-slate-400">#${p.id}</span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="font-semibold text-slate-800">${p.dataEntrega || 'Sem data'}</span>
                      <span class="block text-[10px] text-slate-500">${p.horaEntrega ? `às ${p.horaEntrega}` : ''}</span>
                    </td>
                    <td class="px-3 py-3 text-slate-600 max-w-xs truncate" title="${itensTexto}">
                      ${itensTexto}
                    </td>
                    <td class="px-3 py-3">
                      <span class="inline-flex items-center gap-1 font-semibold text-[11px] text-slate-700">
                        ${p.canal === 'iFood' ? '<i class="fa-solid fa-motorcycle text-red-500"></i>' : p.canal === '99Food' ? '<i class="fa-solid fa-utensils text-amber-500"></i>' : '<i class="fa-brands fa-whatsapp text-emerald-500"></i>'}
                        ${p.canal || 'WhatsApp'}
                      </span>
                    </td>
                    <td class="px-3 py-3 font-bold text-slate-900">
                      ${formatMoeda(p.valorTotal)}
                      <span class="block text-[10px] font-normal text-slate-400">Sinal: ${formatMoeda(p.valorSinal)}</span>
                    </td>
                    <td class="px-3 py-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}">
                        ${statusNome}
                      </span>
                    </td>
                    <td class="px-3 py-3">
                      ${p.estoqueBaixado ? `
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800" title="Insumos já debitados do estoque">
                          <i class="fa-solid fa-check text-[9px]"></i> Baixado
                        </span>
                      ` : `
                        <button onclick="abrirModalConfirmarBaixa('${p.id}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors cursor-pointer" title="Dar baixa nos insumos deste pedido">
                          <i class="fa-solid fa-box-archive text-[9px]"></i> Baixar
                        </button>
                      `}
                    </td>
                    <td class="px-3 py-3">
                      ${(() => {
                        const sc = calcularStatusCaixaPedido(p);
                        if (sc.status === 'quitado') {
                          return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800" title="Quitado no caixa: ${formatMoeda(sc.totalLancado)}"><i class="fa-solid fa-check text-[9px]"></i> Quitado</span>`;
                        } else if (sc.status === 'parcial') {
                          return `<button onclick="abrirModalLancarCaixa('${p.id}', 'restante')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer" title="Lançado ${formatMoeda(sc.totalLancado)} • Falta ${formatMoeda(sc.saldoPendente)}"><i class="fa-solid fa-clock-rotate-left text-[9px]"></i> ${formatMoeda(sc.totalLancado)}</button>`;
                        } else {
                          return `<button onclick="abrirModalLancarCaixa('${p.id}')" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors cursor-pointer" title="Lançar recebimento no caixa"><i class="fa-solid fa-plus text-[9px]"></i> Lançar</button>`;
                        }
                      })()}
                    </td>
                    <td class="px-3 py-3 text-right">
                      <button onclick="abrirModalPedido('${p.id}')" class="text-xs text-pink-600 hover:text-pink-800 font-semibold px-2 py-1 rounded bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                        Editar
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        ` : `
          <div class="py-8 text-center text-slate-400">
            <i class="fa-solid fa-box-open text-3xl mb-2 text-slate-300"></i>
            <p class="text-xs font-medium">Nenhum pedido pendente de entrega no momento.</p>
            <button onclick="abrirModalPedido()" class="mt-3 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer">
              + Cadastrar Primeiro Pedido
            </button>
          </div>
        `}
      </div>
    </div>
  `;
  ligarBlocosColapsaveis();
}

// ==========================================
// ABA RELATÓRIOS (grupo Financeiro): evolução, metas e canais
// ==========================================
function calcularResumoRelatorios() {
  const faturamentoTotal = pedidos.reduce((acc, p) => acc + (Number(p.valorTotal) || 0), 0);
  const totalPedidosQtd = pedidos.length;
  const ticketMedioAtual = totalPedidosQtd > 0 ? (faturamentoTotal / totalPedidosQtd) : 0;
  const metaMes = Number(metas.faturamentoMensal ?? 0);
  const metaAno = Number(metas.faturamentoAnual ?? 0);
  const progressoMeta = metaMes > 0 ? Math.min(100, Math.round((faturamentoTotal / metaMes) * 100)) : 0;
  const faturamentoFaltante = Math.max(0, metaMes - faturamentoTotal);
  const ticketRef = ticketMedioAtual > 0 ? ticketMedioAtual : 85.00;
  const pedidosNecMes = Math.ceil(metaMes / ticketRef);
  const pedidosNecAno = Math.ceil(metaAno / ticketRef);
  const pedidosFaltantes = Math.max(0, pedidosNecMes - totalPedidosQtd);
  const custosFixos = Number(metas.custosFixosMensais ?? 0);
  const cmvEstMeta = metaMes * (Number(metas.cmvMedioPercentual ?? 0) / 100);
  const taxasEstMeta = metaMes * (Number(metas.taxaAppMediaPercentual ?? 0) / 100);
  const proLaboreProjetado = Math.max(0, metaMes - cmvEstMeta - taxasEstMeta - custosFixos);
  const canais = {
    'WhatsApp': { nome: 'WhatsApp / Venda Direta', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-emerald-500' },
    'iFood': { nome: 'iFood Delivery', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-red-500' },
    '99Food': { nome: '99Food / Outros Apps', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-amber-500' },
    'Balcão': { nome: 'Balcão / Encomenda', pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-blue-500' }
  };
  pedidos.forEach(p => {
    const canalNome = p.canal || 'WhatsApp';
    if (!canais[canalNome]) {
      canais[canalNome] = { nome: canalNome, pedidos: 0, faturamento: 0, taxa: 0, cor: 'bg-indigo-500' };
    }
    canais[canalNome].pedidos += 1;
    canais[canalNome].faturamento += Number(p.valorTotal) || 0;
    canais[canalNome].taxa += calcularFinanceiroPedido(p).taxaApp;
  });
  return {
    faturamentoTotal, totalPedidosQtd, ticketMedioAtual, metaMes, metaAno,
    progressoMeta, faturamentoFaltante, ticketRef, pedidosNecMes, pedidosNecAno,
    pedidosFaltantes, custosFixos, cmvEstMeta, taxasEstMeta, proLaboreProjetado, canais
  };
}

function renderRelatorios() {
  const container = document.getElementById('tab-relatorios');
  if (!container) return;
  const R = calcularResumoRelatorios();

  const dias = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const total = pedidos.filter(p => p.dataEntrega === iso).reduce((a, p) => a + (Number(p.valorTotal) || 0), 0);
    dias.push({
      iso, total, hoje: i === 0,
      rotulo: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
    });
  }
  const maxDia = Math.max(1, ...dias.map(d => d.total));
  const soma14 = dias.reduce((a, d) => a + d.total, 0);
  const larg = 560 / 14;
  const barras = dias.map((d, i) => {
    const h = Math.max(3, (d.total / maxDia) * 128);
    const x = (i * larg + 4).toFixed(1);
    const cx = (i * larg + larg / 2).toFixed(1);
    return `<rect x="${x}" y="${(150 - h).toFixed(1)}" width="${(larg - 8).toFixed(1)}" height="${h.toFixed(1)}" rx="4" fill="${d.hoje ? '#C65D3A' : '#EFC9B5'}"><title>${d.rotulo}: ${formatMoeda(d.total)}</title></rect>`
      + `<text x="${cx}" y="165" font-size="9" text-anchor="middle" fill="#94a3b8">${d.rotulo}</text>`;
  }).join('');

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Relatórios</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Evolução, metas e canais • grupo Financeiro</p>
      </div>
      <button onclick="abrirModalMetas()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer">
        <i class="fa-solid fa-sliders text-pink-600"></i> Ajustar Metas
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex items-center justify-between pb-2">
        <div>
          <h3 class="font-bold text-slate-900 text-base">Faturamento — últimos 14 dias</h3>
          <p class="text-xs text-slate-500">Por data de entrega • período: <strong class="text-slate-700">${formatMoeda(soma14)}</strong></p>
        </div>
      </div>
      <svg viewBox="0 0 560 175" class="w-full" role="img" aria-label="Gráfico de faturamento por dia">
        <line x1="0" y1="150" x2="560" y2="150" stroke="#e2e8f0" stroke-width="1" />
        ${barras}
      </svg>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-bullseye"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-base">Metas Operacionais & Pró-Labore</h3>
                <p class="text-xs text-slate-500">Planejamento financeiro de vendas e sustentabilidade</p>
              </div>
            </div>
            <button onclick="abrirModalMetas()" class="text-xs font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
              <i class="fa-solid fa-sliders"></i> Configurar
            </button>
          </div>
          <div class="mt-5">
            <div class="flex justify-between text-xs font-semibold mb-1.5">
              <span class="text-slate-700">Progresso do Mês: ${formatMoeda(R.faturamentoTotal)} de ${formatMoeda(R.metaMes)}</span>
              <span class="text-pink-600 font-bold">${R.progressoMeta}%</span>
            </div>
            <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-500" style="width: ${R.progressoMeta}%"></div>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>${R.totalPedidosQtd} pedidos realizados</span>
              <span>${R.faturamentoFaltante > 0 ? `Faltam ${formatMoeda(R.faturamentoFaltante)} para bater a meta` : 'Meta do mês superada! 🎉'}</span>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-600">Meta Mensal</span>
                <span class="text-xs font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md">${formatMoeda(R.metaMes)}</span>
              </div>
              <p class="mt-2 text-2xl font-black text-slate-900">${R.pedidosNecMes} <span class="text-xs font-medium text-slate-500">pedidos</span></p>
              <p class="text-[11px] text-slate-500 mt-1">
                ${R.pedidosFaltantes > 0 ? `Faltam <strong>${R.pedidosFaltantes}</strong> pedidos a ${formatMoeda(R.ticketRef)}` : 'Meta de pedidos alcançada!'}
              </p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-600">Meta Anual</span>
                <span class="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">${formatMoeda(R.metaAno)}</span>
              </div>
              <p class="mt-2 text-2xl font-black text-slate-900">${R.pedidosNecAno} <span class="text-xs font-medium text-slate-500">pedidos</span></p>
              <p class="text-[11px] text-slate-500 mt-1">
                Ritmo recomendado: ~${Math.ceil(R.pedidosNecAno / 12)} pedidos por mês
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 p-4 rounded-xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-pink-900">Projeção de Pró-Labore Líquido</p>
              <p class="text-2xl font-black text-slate-900 mt-0.5">${formatMoeda(R.proLaboreProjetado)} <span class="text-xs font-normal text-slate-600">/ mês</span></p>
              <p class="text-[11px] text-slate-600 mt-0.5">Disponível para retirada da confeiteira ao atingir a meta mensal</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-white text-pink-600 flex items-center justify-center text-xl shadow-xs shrink-0">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
          </div>
          <div class="mt-3 pt-3 border-t border-pink-200/70 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Insumos (${metas.cmvMedioPercentual}%)</span>
              <strong class="text-slate-800">${formatMoeda(R.cmvEstMeta)}</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Taxas Apps (${metas.taxaAppMediaPercentual}%)</span>
              <strong class="text-slate-800">${formatMoeda(R.taxasEstMeta)}</strong>
            </div>
            <div>
              <span class="text-slate-500 block text-[11px]">(-) Custos Fixos</span>
              <strong class="text-slate-800">${formatMoeda(R.custosFixos)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-chart-pie"></i>
              </div>
              <div>
                <h3 class="font-bold text-slate-900 text-base">Vendas por Canal</h3>
                <p class="text-xs text-slate-500">Faturamento e retenção por plataforma</p>
              </div>
            </div>
            <button onclick="switchTab('promocoes')" class="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
              <i class="fa-solid fa-calculator"></i> Viabilidade
            </button>
          </div>
          <div class="mt-4 space-y-3">
            ${Object.keys(R.canais).map(key => {
              const c = R.canais[key];
              const pct = R.faturamentoTotal > 0 ? Math.round((c.faturamento / R.faturamentoTotal) * 100) : 0;
              const margemCanal = c.faturamento > 0 ? Math.max(0, c.faturamento - c.taxa) : 0;
              return `
                <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full ${c.cor}"></span>
                      ${c.nome}
                    </span>
                    <span class="text-xs font-semibold text-slate-600">${c.pedidos} pedido(s) (${pct}%)</span>
                  </div>
                  <div class="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="${c.cor} h-full rounded-full" style="width: ${pct}%"></div>
                  </div>
                  <div class="mt-2 flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-900">${formatMoeda(c.faturamento)}</span>
                    <span class="text-[11px] text-slate-500">
                      Taxas: <strong class="text-rose-600">${formatMoeda(c.taxa)}</strong> | Líq: <strong class="text-emerald-700">${formatMoeda(margemCanal)}</strong>
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
          <i class="fa-solid fa-lightbulb text-blue-500 mt-0.5"></i>
          <div>
            <span class="font-bold">Dica Operacional:</span> Canais diretos (WhatsApp) não cobram taxa de intermediação. Incentive clientes do iFood a migrarem para o WhatsApp através de mimos e cupons em compras futuras.
          </div>
        </div>
      </div>
    </div>
  `;
}

// Modal de Ajuste de Metas
function abrirModalMetas() {
  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-sliders text-pink-600"></i> Ajustar Metas e Parâmetros
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formMetas" onsubmit="salvarMetas(event)" class="mt-4 space-y-4 text-sm">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Meta de Faturamento Mensal (R$)</label>
        <input type="number" step="0.01" id="metaMesInput" value="${metas.faturamentoMensal}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Meta de Faturamento Anual (R$)</label>
        <input type="number" step="0.01" id="metaAnoInput" value="${metas.faturamentoAnual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Custos Fixos Mensais (Luz, Gás, Internet, MEI - R$)</label>
        <input type="number" step="0.01" id="custosFixosInput" value="${metas.custosFixosMensais}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">CMV Médio Previsto (%)</label>
          <input type="number" step="1" id="cmvMedioInput" value="${metas.cmvMedioPercentual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Taxa de App Média (%)</label>
          <input type="number" step="1" id="taxaAppMediaInput" value="${metas.taxaAppMediaPercentual}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">Salvar Configurações</button>
      </div>
    </form>
  `);
}

function salvarMetas(e) {
  e.preventDefault();
  const lerNumero = (id, padrao) => {
    const n = Number(document.getElementById(id).value);
    return Number.isFinite(n) ? n : padrao;
  };
  metas.faturamentoMensal = lerNumero('metaMesInput', 0);
  metas.faturamentoAnual = lerNumero('metaAnoInput', 0);
  metas.custosFixosMensais = lerNumero('custosFixosInput', 0);
  metas.cmvMedioPercentual = lerNumero('cmvMedioInput', 0);
  metas.taxaAppMediaPercentual = lerNumero('taxaAppMediaInput', 0);

  saveData(STORAGE_KEYS.METAS);
  fecharModal();
  showToast(`Metas salvas: meta ${formatMoeda(metas.faturamentoMensal)}, fixos ${formatMoeda(metas.custosFixosMensais)}.`);
  renderDashboard();
}

// ==========================================
// 2. MÓDULO ESTOQUE & INSUMOS (DETALHADO E COMPLETO)
// ==========================================
let estoqueFiltroCategoria = 'todas';
let estoqueFiltroStatus = 'todos'; // 'todos' | 'critico' | 'atencao' | 'seguro'
let estoqueBusca = '';

function getStatusEstoque(item) {
  const comparison = compararEstoqueComMinimo(item);
  const qtd = comparison.currentQuantity;
  const min = comparison.minimumThreshold;
  const percentual = comparison.percentual;

  if (min <= 0) {
    return {
      status: 'seguro',
      label: 'Sem Alerta Mínimo',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      iconClass: 'fa-regular fa-circle-check text-slate-500',
      mensagem: 'Alerta não configurado',
      falta: 0,
      percentual: 100
    };
  }

  if (comparison.needsRestock) {
    const falta = comparison.falta;
    return {
      status: 'critico',
      label: 'Abaixo do Mínimo',
      badgeClass: 'bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-200/60',
      iconClass: 'fa-solid fa-triangle-exclamation text-red-600 animate-pulse',
      mensagem: falta > 0 ? `Repor ${falta.toLocaleString('pt-BR')} ${item.unidade}` : 'No limite mínimo',
      falta,
      percentual
    };
  }

  if (qtd <= min * 1.25) {
    return {
      status: 'atencao',
      label: 'Próximo ao Mínimo',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200',
      iconClass: 'fa-solid fa-circle-exclamation text-amber-600',
      mensagem: `Estoque em atenção (${percentual}%)`,
      falta: 0,
      percentual
    };
  }

  return {
    status: 'seguro',
    label: 'Estoque Seguro',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    iconClass: 'fa-solid fa-circle-check text-emerald-600',
    mensagem: `Abastecido (${percentual}%)`,
    falta: 0,
    percentual
  };
}

// Utilitário para normalizar texto (busca sem acentos e minúsculas)
function normalizarTexto(txt) {
  return (txt || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Filtra a lista de insumos com base na busca em tempo real (por nome ou categoria),
 * além dos filtros de categoria e status de alerta.
 * @param {Array} lista 
 * @returns {Array}
 */
function filtrarInsumosEstoque(lista = insumos) {
  const termo = normalizarTexto(estoqueBusca);
  return (lista || []).filter(item => {
    // Filtro por Categoria
    const matchCat = estoqueFiltroCategoria === 'todas' || item.categoria === estoqueFiltroCategoria;
    
    // Filtro por Nome ou Categoria em tempo real
    const nomeNorm = normalizarTexto(item.nome);
    const catNorm = normalizarTexto(item.categoria);
    const matchBusca = !termo || nomeNorm.includes(termo) || catNorm.includes(termo);

    if (!matchCat || !matchBusca) return false;

    // Filtro por Status
    if (estoqueFiltroStatus === 'todos') return true;
    const statusObj = getStatusEstoque(item);
    return statusObj.status === estoqueFiltroStatus;
  });
}

function renderStockTable(customItens = null) {
  const container = document.getElementById('tab-estoque');
  if (!container) return;

  const totalItens = insumos.length;
  const valorTotalEstoque = insumos.reduce((acc, item) => {
    const qtd = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
    return acc + (getCustoUnitario(item) * qtd);
  }, 0);

  const itensCriticos = insumos.filter(i => itemPrecisaReposicao(i)).length;

  const itensAtencao = insumos.filter(i => {
    const qtd = Number(i.quantidade !== undefined ? i.quantidade : i.estoqueAtual) || 0;
    const min = Number(i.alertaEstoqueMinimo !== undefined ? i.alertaEstoqueMinimo : i.estoqueMinimo) || 0;
    return min > 0 && qtd > min && qtd <= min * 1.25;
  }).length;

  const itensSeguros = totalItens - itensCriticos - itensAtencao;

  // Atualiza automaticamente o badge no cabeçalho
  updateHeaderStockBadge();

  // Injeção da estrutura base e cabeçalhos na seção tab-estoque
  container.innerHTML = `
    <!-- Top Bar & Header da Seção -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shadow-xs">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-bold text-slate-900 text-lg">Estoque</h2>
              ${itensCriticos > 0 ? `
                <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${itensCriticos} em alerta
                </span>
              ` : ''}
            </div>
            <p class="text-xs text-slate-500">Controle completo de nomes, quantidades, unidades de medida e alertas de estoque mínimo</p>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="abrirModalInsumo()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer active:scale-95">
          <i class="fa-solid fa-plus"></i> Novo Insumo
        </button>
      </div>
    </div>

    <!-- BARRA DE PESQUISA NO TOPO DA SEÇÃO DE ESTOQUE (FILTRO EM TEMPO REAL) -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
      <div class="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <!-- Input de Pesquisa em Tempo Real (Nome ou Categoria) -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i class="fa-solid fa-magnifying-glass text-sm"></i>
          </div>
          <input 
            type="text" 
            id="stockSearchInput"
            data-testid="stock-search-bar"
            placeholder="Buscar por nome ou categoria em tempo real (ex: Leite, Farinha, Embalagens)..." 
            value="${estoqueBusca}"
            oninput="filtrarEstoqueBusca(this.value)"
            class="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all text-slate-800 placeholder-slate-400 shadow-2xs"
            aria-label="Buscar insumos por nome ou categoria"
          />
          <button 
            id="stockSearchClearBtn" 
            onclick="limparBuscaEstoque()" 
            class="${estoqueBusca ? '' : 'hidden'} absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer" 
            title="Limpar pesquisa"
            aria-label="Limpar pesquisa"
          >
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>

        <!-- Indicador de Resultados em Tempo Real -->
        <div class="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
          <span id="stockSearchCounter" class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs whitespace-nowrap">
            ${totalItens} insumos cadastrados
          </span>

          ${estoqueBusca ? `
            <button onclick="limparBuscaEstoque()" class="text-xs font-semibold text-pink-600 hover:text-pink-800 hover:underline cursor-pointer">
              Limpar busca
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Filtro Rápido de Categorias & Alertas -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <!-- Categorias -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span class="text-slate-400 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap mr-1">Categorias:</span>
          <button onclick="filtrarEstoqueCategoria('todas')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${estoqueFiltroCategoria === 'todas' ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            Todas (${totalItens})
          </button>
          <button onclick="filtrarEstoqueCategoria('Ingredientes')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${estoqueFiltroCategoria === 'Ingredientes' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            <i class="fa-solid fa-bowl-food mr-1"></i> Ingredientes
          </button>
          <button onclick="filtrarEstoqueCategoria('Embalagens')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${estoqueFiltroCategoria === 'Embalagens' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            <i class="fa-solid fa-box mr-1"></i> Embalagens
          </button>
          <button onclick="filtrarEstoqueCategoria('Decoração')" class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${estoqueFiltroCategoria === 'Decoração' ? 'bg-purple-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            <i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Decoração
          </button>
        </div>

        <!-- Alerta de Estoque Mínimo -->
        <div class="flex items-center gap-1.5 overflow-x-auto">
          <span class="text-slate-400 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap mr-1">Alerta:</span>
          <button onclick="filtrarEstoqueStatus('todos')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${estoqueFiltroStatus === 'todos' ? 'bg-slate-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
            Todos
          </button>
          <button onclick="filtrarEstoqueStatus('critico')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${estoqueFiltroStatus === 'critico' ? 'bg-red-600 text-white shadow-2xs' : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'}">
            <i class="fa-solid fa-triangle-exclamation text-[10px]"></i> 🚨 Mínimo (${itensCriticos})
          </button>
          <button onclick="filtrarEstoqueStatus('atencao')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${estoqueFiltroStatus === 'atencao' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'}">
            <i class="fa-solid fa-circle-exclamation text-[10px]"></i> ⚠️ Atenção (${itensAtencao})
          </button>
          <button onclick="filtrarEstoqueStatus('seguro')" class="px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${estoqueFiltroStatus === 'seguro' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'}">
            <i class="fa-solid fa-circle-check text-[10px]"></i> ✅ Seguro (${itensSeguros})
          </button>
        </div>
      </div>
    </div>

    <!-- Cards de Resumo & Alertas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total de Insumos -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Total de Insumos</span>
          <div class="text-2xl font-bold text-slate-900 mt-0.5">${totalItens} <span class="text-xs font-normal text-slate-500">itens</span></div>
          <span class="text-[11px] text-slate-500 mt-1 block">Ingredientes, embalagens e outros</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-base">
          <i class="fa-solid fa-layer-group"></i>
        </div>
      </div>

      <!-- 2. Alerta de Estoque Mínimo (Crítico) -->
      <div class="bg-white p-4 rounded-2xl border ${itensCriticos > 0 ? 'border-red-200 bg-red-50/20' : 'border-slate-200'} shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block flex items-center gap-1.5">
            <span>Alerta de Estoque Mínimo</span>
            ${itensCriticos > 0 ? '<span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>' : ''}
          </span>
          <div class="text-2xl font-bold ${itensCriticos > 0 ? 'text-red-600' : 'text-slate-900'} mt-0.5">
            ${itensCriticos} <span class="text-xs font-semibold ${itensCriticos > 0 ? 'text-red-500' : 'text-slate-500'}">abaixo do mínimo</span>
          </div>
          <button onclick="filtrarEstoqueStatus('critico')" class="text-[11px] font-semibold text-red-600 hover:text-red-800 underline mt-1 block text-left cursor-pointer">
            ${itensCriticos > 0 ? 'Ver itens em alerta crítico →' : 'Nenhum item crítico'}
          </button>
        </div>
        <div class="w-10 h-10 rounded-xl ${itensCriticos > 0 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'} flex items-center justify-center text-base">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
      </div>

      <!-- 3. Estoque em Atenção -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Próximos ao Mínimo</span>
          <div class="text-2xl font-bold text-amber-600 mt-0.5">${itensAtencao} <span class="text-xs font-normal text-slate-500">itens</span></div>
          <button onclick="filtrarEstoqueStatus('atencao')" class="text-[11px] font-semibold text-amber-600 hover:text-amber-800 underline mt-1 block text-left cursor-pointer">
            Itens até 25% do limite →
          </button>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </div>

      <!-- 4. Patrimônio em Estoque -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 block">Patrimônio em Estoque</span>
          <div class="text-2xl font-bold text-emerald-600 mt-0.5">${formatMoeda(valorTotalEstoque)}</div>
          <span class="text-[11px] text-slate-500 mt-1 block">Valor total custo investido</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-base">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
      </div>
    </div>

    <!-- Tabela da Seção Estoque & Insumos -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="overflow-x-auto">
        <table id="stockTable" class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <tr>
              <th class="py-3.5 px-4">Nome do Insumo</th>
              <th class="py-3.5 px-4">Quantidade</th>
              <th class="py-3.5 px-3">Unidade</th>
              <th class="py-3.5 px-4">Alerta de Estoque Mínimo</th>
              <th class="py-3.5 px-4">Custo & Embalagem</th>
              <th class="py-3.5 px-4 text-right">Ações Rápidas</th>
            </tr>
          </thead>
          <tbody id="stockTableBody" class="divide-y divide-slate-100">
          </tbody>
        </table>
      </div>
      <div id="stockPager" class="px-4"></div>
    </div>
  `;

  // Renderiza as linhas dinâmicas da tabela
  renderStockRows(customItens);
}

/**
 * Criação e injeção dinâmica das linhas da tabela de estoque (Dynamic Row Creation)
 * sem recriar o container superior, garantindo foco e digitação contínua na barra de busca.
 * @param {Array|null} customItens 
 */
function renderStockRows(customItens = null) {
  const tbody = document.getElementById('stockTableBody');
  if (!tbody) return;

  const itensFiltrados = Array.isArray(customItens) ? customItens : filtrarInsumosEstoque();
  const pag = paginar('estoque', itensFiltrados);

  // Atualiza o contador de resultados da barra de busca
  const counterEl = document.getElementById('stockSearchCounter');
  if (counterEl) {
    if (estoqueBusca.trim().length > 0 || estoqueFiltroCategoria !== 'todas' || estoqueFiltroStatus !== 'todos') {
      counterEl.textContent = `${itensFiltrados.length} de ${insumos.length} insumos encontrados`;
      counterEl.className = 'text-xs font-semibold text-pink-700 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200 shadow-2xs whitespace-nowrap';
    } else {
      counterEl.textContent = `${insumos.length} insumos cadastrados`;
      counterEl.className = 'text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs whitespace-nowrap';
    }
  }

  // Atualiza a visibilidade do botão de limpar busca
  const clearBtn = document.getElementById('stockSearchClearBtn');
  if (clearBtn) {
    if (estoqueBusca.trim().length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }

  tbody.innerHTML = '';

  if (itensFiltrados.length === 0) {
    const emptyTr = document.createElement('tr');
    emptyTr.id = 'stockTableEmptyRow';
    emptyTr.innerHTML = `
      <td colspan="6" class="py-12 text-center text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-slate-300 block"></i>
        <p class="font-semibold text-slate-700">Nenhum insumo encontrado</p>
        <p class="text-xs text-slate-400 mt-1">
          ${estoqueBusca.trim() 
            ? `Não encontramos insumos com nome ou categoria contendo "<strong>${esc(estoqueBusca)}</strong>".` 
            : 'Tente ajustar os filtros de categoria ou alerta.'}
        </p>
        ${estoqueBusca.trim() || estoqueFiltroCategoria !== 'todas' || estoqueFiltroStatus !== 'todos' ? `
          <button onclick="limparFiltrosEstoque()" class="mt-3 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200 transition-colors cursor-pointer inline-flex items-center gap-1.5">
            <i class="fa-solid fa-rotate-left"></i> Limpar filtros e busca
          </button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(emptyTr);
    const pagerVazio = document.getElementById('stockPager');
    if (pagerVazio) pagerVazio.innerHTML = '';
    return;
  }

  pag.itens.forEach(item => {
    const custoUnit = getCustoUnitario(item);
    const qtd = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
    const min = Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : item.estoqueMinimo) || 0;
    const statusObj = getStatusEstoque(item);

    const tr = document.createElement('tr');
    tr.id = `stock-row-${item.id}`;
    tr.className = `hover:bg-slate-50/90 transition-colors border-b border-slate-100 ${
      statusObj.status === 'critico' ? 'bg-red-50/20' : ''
    }`;

    tr.innerHTML = `
      <!-- Campo: Nome & Categoria -->
      <td class="py-3.5 px-4">
        <div class="flex flex-col">
          <span class="font-bold text-slate-900 text-sm">${item.nome}</span>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-md ${
              item.categoria === 'Ingredientes' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              item.categoria === 'Embalagens' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              'bg-purple-50 text-purple-700 border border-purple-200'
            }">
              ${item.categoria}
            </span>
          </div>
        </div>
      </td>

      <!-- Campo: Quantidade -->
      <td class="py-3.5 px-4">
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1">
            <span class="font-extrabold text-slate-900 text-base">${qtd.toLocaleString('pt-BR')}</span>
            <span class="text-xs text-slate-500 font-medium">${item.unidade}</span>
          </div>
          <!-- Barra visual de proporção em relação ao mínimo -->
          <div class="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden" title="Nível: ${statusObj.percentual}% do estoque mínimo">
            <div class="h-1.5 rounded-full ${
              statusObj.status === 'critico' ? 'bg-red-500' : 
              (statusObj.status === 'atencao' ? 'bg-amber-500' : 'bg-emerald-500')
            }" style="width: ${Math.min(100, Math.max(8, statusObj.percentual))}%"></div>
          </div>
        </div>
      </td>

      <!-- Campo: Unidade -->
      <td class="py-3.5 px-3">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
          ${item.unidade}
        </span>
      </td>

      <!-- Campo: Alerta de Estoque Mínimo -->
      <td class="py-3.5 px-4">
        <div class="space-y-1">
          <div class="text-xs text-slate-600 font-medium flex items-center gap-1">
            <span>Mínimo:</span>
            <strong class="text-slate-800 font-bold">${min.toLocaleString('pt-BR')} ${item.unidade}</strong>
          </div>
          <div>
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${statusObj.badgeClass}">
              <i class="${statusObj.iconClass} text-[10px]"></i> ${statusObj.label}
            </span>
          </div>
          ${statusObj.status === 'critico' && statusObj.falta > 0 ? `
            <div class="text-[11px] text-red-600 font-semibold flex items-center gap-1 mt-0.5">
              <i class="fa-solid fa-arrow-down text-[9px]"></i> Repor mín. ${statusObj.falta.toLocaleString('pt-BR')} ${item.unidade}
            </div>
          ` : ''}
        </div>
      </td>

      <!-- Campo: Custo & Embalagem -->
      <td class="py-3.5 px-4">
        <div class="text-xs">
          <div class="font-bold text-slate-900">${formatMoeda(item.precoPacote)} <span class="font-normal text-slate-500">/ pct (${item.qtdPacote}${item.unidade})</span></div>
          <div class="text-[11px] text-slate-500 mt-0.5 font-medium">
            Custo: <strong class="text-slate-700">${formatMoeda(custoUnit)}/${item.unidade}</strong>
          </div>
        </div>
      </td>

      <!-- Ações Rápidas: Reposição, Ajuste Físico, Edição e Exclusão -->
      <td class="py-3.5 px-4 text-right whitespace-nowrap">
        <div class="inline-flex items-center gap-1">
          <button 
            onclick="reporEstoqueRapido('${item.id}')" 
            title="Repor +1 pacote (+${item.qtdPacote}${item.unidade})"
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <i class="fa-solid fa-plus text-[10px]"></i> Repor
          </button>
          <button 
            onclick="abrirModalAjusteQuantidade('${item.id}')" 
            title="Ajustar Quantidade (Inventário / Perda)"
            class="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-sliders text-xs"></i>
          </button>
          <button 
            onclick="abrirModalInsumo('${item.id}')" 
            title="Editar Insumo"
            class="p-1.5 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-pen-to-square text-xs"></i>
          </button>
          <button 
            onclick="abrirModalConfirmarExclusaoInsumo('${item.id}')" 
            title="Excluir Insumo"
            aria-label="Excluir Insumo"
            class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  const pager = document.getElementById('stockPager');
  if (pager) pager.innerHTML = botoesPaginacao('estoque', pag.total, pag.atual);
}

function renderEstoque() {
  renderStockTable();
}

function filtrarEstoqueCategoria(cat) {
  estoqueFiltroCategoria = cat;
  PAGINACAO.estoque.pagina = 1;
  renderEstoque();
}

function filtrarEstoqueStatus(status) {
  estoqueFiltroStatus = status;
  PAGINACAO.estoque.pagina = 1;
  renderEstoque();
}

/**
 * Filtra os insumos por nome ou categoria em tempo real
 * Atualiza instantaneamente as linhas da tabela sem perda de foco.
 * @param {string} val 
 */
function filtrarEstoqueBusca(val) {
  estoqueBusca = val !== undefined ? String(val) : '';
  PAGINACAO.estoque.pagina = 1;
  
  // Sincroniza o valor do input caso a função seja chamada externamente
  const searchInput = document.getElementById('stockSearchInput');
  if (searchInput && searchInput.value !== estoqueBusca) {
    searchInput.value = estoqueBusca;
  }

  const tableBody = document.getElementById('stockTableBody');
  if (tableBody) {
    renderStockRows();
  } else {
    renderStockTable();
  }
}

function limparBuscaEstoque() {
  estoqueBusca = '';
  const searchInput = document.getElementById('stockSearchInput');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
  const tableBody = document.getElementById('stockTableBody');
  if (tableBody) {
    renderStockRows();
  } else {
    renderStockTable();
  }
}

function limparFiltrosEstoque() {
  estoqueBusca = '';
  estoqueFiltroCategoria = 'todas';
  estoqueFiltroStatus = 'todos';
  renderEstoque();
}

// Reposição rápida (+1 pacote com 1 clique e registro no fluxo de caixa)
function reporEstoqueRapido(id) {
  const item = insumos.find(i => i.id === id);
  if (!item) return;

  const qtdAdicionada = Number(item.qtdPacote) || 1;
  const novaQtd = (Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0) + qtdAdicionada;
  item.quantidade = novaQtd;
  item.estoqueAtual = novaQtd;

  saveData(STORAGE_KEYS.INSUMOS);

  // Registro de saída automática no fluxo de caixa
  lancamentos.unshift({
    id: 'lan-' + Date.now(),
    data: new Date().toISOString().split('T')[0],
    tipo: 'saida',
    categoria: 'Compra de Insumos',
    descricao: `Reposição rápida: +1 pct (${qtdAdicionada}${item.unidade}) de ${item.nome}`,
    valor: Number(item.precoPacote) || 0,
    forma: 'PIX'
  });
  saveData(STORAGE_KEYS.LANCAMENTOS);

  showToast(`Reposição de +${qtdAdicionada}${item.unidade} adicionada ao estoque!`);
  renderEstoque();
}

// Modal de Ajuste Rápido de Quantidade (Inventário / Conferência Física)
function abrirModalAjusteQuantidade(id) {
  const item = insumos.find(i => i.id === id);
  if (!item) return;

  const qtdAtual = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
  const minAtual = Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : item.estoqueMinimo) || 0;

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">
          <i class="fa-solid fa-sliders"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Ajuste de Quantidade em Estoque</h3>
          <p class="text-xs text-slate-500">${item.nome} (${item.categoria})</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>

    <form onsubmit="salvarAjusteQuantidade(event, '${item.id}')" class="mt-4 space-y-4 text-sm">
      <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
        <div>
          <span class="text-xs text-slate-500 block">Quantidade Atual Registrada</span>
          <span class="text-lg font-bold text-slate-900">${qtdAtual.toLocaleString('pt-BR')} ${item.unidade}</span>
        </div>
        <div class="text-right">
          <span class="text-xs text-slate-500 block">Alerta de Estoque Mínimo</span>
          <span class="text-sm font-bold text-amber-700">${minAtual.toLocaleString('pt-BR')} ${item.unidade}</span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Nova Quantidade Física (${item.unidade}) *</label>
        <input 
          type="number" 
          step="any" 
          id="novaQtdInput" 
          value="${qtdAtual}" 
          required 
          class="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-bold text-slate-800 focus:outline-pink-500 bg-white" 
        />
        <p class="text-[11px] text-slate-500 mt-1">Insira a contagem real após conferência física de inventário ou descarte.</p>
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer shadow-xs">Confirmar Ajuste</button>
      </div>
    </form>
  `);
}

function salvarAjusteQuantidade(e, id) {
  e.preventDefault();
  const item = insumos.find(i => i.id === id);
  if (!item) return;

  const novaQtd = Number(document.getElementById('novaQtdInput').value);
  if (isNaN(novaQtd) || novaQtd < 0) {
    alert('Por favor, informe uma quantidade válida maior ou igual a zero.');
    return;
  }

  item.quantidade = novaQtd;
  item.estoqueAtual = novaQtd;
  saveData(STORAGE_KEYS.INSUMOS);
  fecharModal();
  showToast(`Quantidade de ${item.nome} ajustada para ${novaQtd.toLocaleString('pt-BR')} ${item.unidade}!`);
  renderEstoque();
}

// Modal Completo de Insumo (Cadastro e Edição com Previsão em Tempo Real)
function abrirModalInsumo(id = null) {
  const item = id ? insumos.find(i => i.id === id) : null;
  const qtdPadrao = item ? (Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0) : 1000;
  const minPadrao = item ? (Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : item.estoqueMinimo) || 0) : 500;
  const precoPadrao = item ? (Number(item.precoPacote) || 0) : 10;
  const qtdPacotePadrao = item ? (Number(item.qtdPacote) || 1) : 1000;
  const unidadePadrao = item ? item.unidade : 'g';

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
          <i class="fa-solid fa-boxes-stacked"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">${item ? 'Editar Insumo' : 'Novo Insumo do Estoque'}</h3>
          <p class="text-xs text-slate-500">Defina nome, quantidade, unidade e alerta de estoque mínimo</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>

    <form id="formInsumo" onsubmit="salvarInsumo(event, '${id || ''}')" class="mt-4 space-y-4 text-sm">
      <!-- Nome do Insumo -->
      <div>
        <label class="block text-xs font-bold text-slate-700 mb-1">Nome do Insumo *</label>
        <input 
          type="text" 
          id="insNome" 
          value="${item ? item.nome : ''}" 
          placeholder="Ex: Leite Condensado Piracanjuba 395g" 
          required 
          class="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
        />
      </div>

      <!-- Categoria e Unidade -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Categoria *</label>
          <select id="insCategoria" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white">
            <option value="Ingredientes" ${item && item.categoria === 'Ingredientes' ? 'selected' : ''}>Ingredientes</option>
            <option value="Embalagens" ${item && item.categoria === 'Embalagens' ? 'selected' : ''}>Embalagens</option>
            <option value="Decoração" ${item && item.categoria === 'Decoração' ? 'selected' : ''}>Decoração</option>
            <option value="Outros" ${item && item.categoria === 'Outros' ? 'selected' : ''}>Outros</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Unidade de Medida *</label>
          <select id="insUnidade" onchange="atualizarPreviaModalInsumo()" class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white">
            <option value="g" ${unidadePadrao === 'g' ? 'selected' : ''}>Gramas (g)</option>
            <option value="kg" ${unidadePadrao === 'kg' ? 'selected' : ''}>Quilos (kg)</option>
            <option value="ml" ${unidadePadrao === 'ml' ? 'selected' : ''}>Mililitros (ml)</option>
            <option value="L" ${unidadePadrao === 'L' ? 'selected' : ''}>Litros (L)</option>
            <option value="un" ${unidadePadrao === 'un' ? 'selected' : ''}>Unidade (un)</option>
          </select>
        </div>
      </div>

      <!-- Quantidade em Estoque e Alerta de Estoque Mínimo -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/70">
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">
            Quantidade Atual em Estoque *
          </label>
          <input 
            type="number" 
            step="any" 
            id="insQuantidade" 
            value="${qtdPadrao}" 
            oninput="atualizarPreviaModalInsumo()" 
            required 
            placeholder="Ex: 3950" 
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold bg-white focus:outline-pink-500" 
          />
          <p class="text-[10px] text-slate-500 mt-0.5">Saldo real disponível</p>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-800 mb-1">
            Alerta de Estoque Mínimo *
          </label>
          <input 
            type="number" 
            step="any" 
            id="insAlertaEstoqueMinimo" 
            value="${minPadrao}" 
            oninput="atualizarPreviaModalInsumo()" 
            required 
            placeholder="Ex: 1580" 
            class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold bg-white focus:outline-pink-500" 
          />
          <p class="text-[10px] text-slate-500 mt-0.5">Dispara aviso quando atingido</p>
        </div>
      </div>

      <!-- Embalagem de Compra & Preço de Custo -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Preço da Embalagem/Pacote (R$) *</label>
          <input 
            type="number" 
            step="0.01" 
            id="insPrecoPacote" 
            value="${precoPadrao}" 
            oninput="atualizarPreviaModalInsumo()" 
            placeholder="Ex: 6.80" 
            required 
            class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Qtd na Embalagem/Pacote *</label>
          <input 
            type="number" 
            step="any" 
            id="insQtdPacote" 
            value="${qtdPacotePadrao}" 
            oninput="atualizarPreviaModalInsumo()" 
            placeholder="Ex: 395" 
            required 
            class="w-full border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-pink-500 bg-white" 
          />
        </div>
      </div>

      <!-- Tabela Nutricional (por 100 g) + Alergênicos — base da etiqueta ANVISA -->
      <details class="bg-white rounded-xl border border-slate-200 text-xs" ${item && (item.kcal100 > 0 || item.alergenicos) ? 'open' : ''}>
        <summary class="cursor-pointer px-3.5 py-2.5 font-bold text-slate-700 flex items-center justify-between select-none">
          <span><i class="fa-solid fa-apple-whole text-emerald-600"></i> Tabela nutricional (por 100 g) e alergênicos</span>
          <span class="text-[10px] font-medium text-slate-400">para a etiqueta da ficha</span>
        </summary>
        <div class="px-3.5 pb-3.5 pt-1 space-y-2.5">
          <button type="button" onclick="preencherNutriReferencia()" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
            <i class="fa-solid fa-book-open"></i> Preencher valores de referência
          </button>
          <div class="grid grid-cols-3 gap-2">
            ${[
              ['insKcal', 'Energia (kcal)', item?.kcal100 || 0],
              ['insCarb', 'Carboidratos (g)', item?.carb100 || 0],
              ['insAcucar', 'Açúcares (g)', item?.acucar100 || 0],
              ['insProt', 'Proteínas (g)', item?.prot100 || 0],
              ['insGordTot', 'Gord. totais (g)', item?.gordTot100 || 0],
              ['insGordSat', 'Gord. saturadas (g)', item?.gordSat100 || 0],
              ['insGordTrans', 'Gord. trans (g)', item?.gordTrans100 || 0],
              ['insFibra', 'Fibra (g)', item?.fibra100 || 0],
              ['insSodio', 'Sódio (mg)', item?.sodio100 || 0]
            ].map(([id, label, val]) => `
              <div>
                <label class="block text-[10px] font-bold text-slate-600 mb-0.5">${label}</label>
                <input type="number" step="any" min="0" id="${id}" value="${val}" class="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-slate-800 bg-white focus:outline-pink-500" />
              </div>`).join('')}
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-600 mb-0.5">Alergênicos (separados por vírgula)</label>
            <input type="text" id="insAlergenicos" value="${esc(item?.alergenicos || '')}" placeholder="Ex: Glúten, Leite, Ovos, Amendoim, Soja" class="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 bg-white focus:outline-pink-500" />
          </div>
          <p class="text-[10px] text-slate-400">Valores de referência da tabela — sempre confira com o rótulo do seu fornecedor.</p>
        </div>
      </details>

      <!-- Pré-visualização Dinâmica do Custo e Status do Alerta -->
      <div id="insumoPreviaCard" class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
        <!-- Preenchido via atualizarPreviaModalInsumo() -->
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer shadow-xs">
          ${item ? 'Salvar Alterações' : 'Cadastrar Insumo'}
        </button>
      </div>
    </form>
  `);

  // Executa pré-visualização inicial
  atualizarPreviaModalInsumo();
}

function atualizarPreviaModalInsumo() {
  const card = document.getElementById('insumoPreviaCard');
  if (!card) return;

  const preco = Number(document.getElementById('insPrecoPacote')?.value) || 0;
  const qtdPacote = Number(document.getElementById('insQtdPacote')?.value) || 1;
  const unidade = document.getElementById('insUnidade')?.value || 'g';
  const quantidade = Number(document.getElementById('insQuantidade')?.value) || 0;
  const alertaMinimo = Number(document.getElementById('insAlertaEstoqueMinimo')?.value) || 0;

  const custoUnit = qtdPacote > 0 ? (preco / qtdPacote) : 0;
  
  let statusBadge = '';
  if (quantidade <= alertaMinimo) {
    const falta = Math.max(0, alertaMinimo - quantidade);
    statusBadge = `
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-red-100 text-red-700 border border-red-200">
        <i class="fa-solid fa-triangle-exclamation"></i> 🚨 Abaixo do Mínimo (${falta > 0 ? `Falta ${falta} ${unidade}` : 'No limite'})
      </span>
    `;
  } else if (quantidade <= alertaMinimo * 1.25) {
    statusBadge = `
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-amber-100 text-amber-800 border border-amber-200">
        <i class="fa-solid fa-circle-exclamation"></i> ⚠️ Próximo ao Mínimo
      </span>
    `;
  } else {
    statusBadge = `
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-xs bg-emerald-100 text-emerald-700 border border-emerald-200">
        <i class="fa-solid fa-circle-check"></i> ✅ Estoque Seguro
      </span>
    `;
  }

  card.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <span class="text-slate-500 font-medium block">Custo Unitário Calculado</span>
        <span class="text-sm font-extrabold text-slate-900">${formatMoeda(custoUnit)} / ${unidade}</span>
      </div>
      <div class="text-right">
        <span class="text-slate-500 font-medium block mb-0.5">Status do Alerta</span>
        ${statusBadge}
      </div>
    </div>
  `;
}

function salvarInsumo(e, id) {
  e.preventDefault();
  const nome = document.getElementById('insNome').value.trim();
  const categoria = document.getElementById('insCategoria').value;
  const unidade = document.getElementById('insUnidade').value;
  const precoPacote = Number(document.getElementById('insPrecoPacote').value) || 0;
  const qtdPacote = Number(document.getElementById('insQtdPacote').value) || 1;
  const quantidade = Number(document.getElementById('insQuantidade').value) || 0;
  const alertaEstoqueMinimo = Number(document.getElementById('insAlertaEstoqueMinimo').value) || 0;
  const lerNum = (id) => Number(document.getElementById(id)?.value) || 0;
  const nutri = {
    kcal100: lerNum('insKcal'), carb100: lerNum('insCarb'), acucar100: lerNum('insAcucar'),
    prot100: lerNum('insProt'), gordTot100: lerNum('insGordTot'), gordSat100: lerNum('insGordSat'),
    gordTrans100: lerNum('insGordTrans'), fibra100: lerNum('insFibra'), sodio100: lerNum('insSodio'),
    alergenicos: (document.getElementById('insAlergenicos')?.value || '').trim()
  };

  if (id) {
    const item = insumos.find(i => i.id === id);
    if (item) {
      item.nome = nome;
      item.categoria = categoria;
      item.unidade = unidade;
      item.precoPacote = precoPacote;
      item.qtdPacote = qtdPacote;
      item.quantidade = quantidade;
      item.estoqueAtual = quantidade;
      item.alertaEstoqueMinimo = alertaEstoqueMinimo;
      item.estoqueMinimo = alertaEstoqueMinimo;
      Object.assign(item, nutri);
    }
  } else {
    insumos.push({
      id: 'ins-' + Date.now(),
      nome,
      categoria,
      unidade,
      precoPacote,
      qtdPacote,
      quantidade,
      estoqueAtual: quantidade,
      alertaEstoqueMinimo,
      ...nutri,
      estoqueMinimo: alertaEstoqueMinimo
    });
  }

  saveData(STORAGE_KEYS.INSUMOS);
  fecharModal();
  showToast(id ? 'Insumo atualizado com sucesso!' : 'Novo insumo cadastrado com sucesso!');
  PAGINACAO.estoque.pagina = 1;
  renderEstoque();
}

function abrirModalConfirmarExclusaoInsumo(id) {
  const item = insumos.find(i => i.id === id);
  if (!item) return;

  const qtd = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
  const custoUnit = getCustoUnitario(item);
  const fichasVinculadas = fichas.filter(f => (f.ingredientes || []).some(ing => ing.insumoId === id));
  const temFichas = fichasVinculadas.length > 0;

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Confirmar Exclusão de Insumo</h3>
          <p class="text-xs text-slate-500">Remoção definitiva do item da lista de estoque</p>
        </div>
      </div>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>

    <div class="mt-4 space-y-4 text-sm">
      <!-- Card com resumo do Insumo -->
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-900 text-base">${item.nome}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-md font-medium ${
            item.categoria === 'Ingredientes' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            item.categoria === 'Embalagens' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
            'bg-purple-50 text-purple-700 border border-purple-200'
          }">${item.categoria}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
          <div>Estoque Atual: <strong class="text-slate-900">${qtd.toLocaleString('pt-BR')} ${item.unidade}</strong></div>
          <div>Custo Unitário: <strong class="text-slate-900">${formatMoeda(custoUnit)}/${item.unidade}</strong></div>
        </div>
      </div>

      ${temFichas ? `
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1.5">
          <div class="flex items-center gap-1.5 font-bold text-amber-800">
            <i class="fa-solid fa-circle-exclamation text-amber-600"></i>
            <span>Atenção: Insumo vinculado a receitas</span>
          </div>
          <p class="text-amber-700">
            Este insumo está vinculado a <strong>${fichasVinculadas.length} ficha(s) técnica(s)</strong>:
          </p>
          <ul class="list-disc list-inside font-medium text-amber-800 pl-1 space-y-0.5">
            ${fichasVinculadas.slice(0, 4).map(f => `<li>${f.nome}</li>`).join('')}
            ${fichasVinculadas.length > 4 ? `<li>... e mais ${fichasVinculadas.length - 4} receita(s)</li>` : ''}
          </ul>
          <p class="text-[11px] text-amber-700 mt-1">
            Excluir este insumo removerá o item do estoque e poderá impactar o cálculo de CMV dessas fichas técnicas.
          </p>
        </div>
      ` : `
        <p class="text-xs text-slate-600">
          Tem certeza de que deseja remover permanentemente o insumo <strong>"${item.nome}"</strong> da lista de estoque? Esta ação não poderá ser desfeita.
        </p>
      `}

      <!-- Rodapé com Botões de Ação -->
      <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
        <button 
          type="button" 
          onclick="fecharModal()" 
          class="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-xs cursor-pointer transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          id="btnConfirmarExclusaoInsumo"
          onclick="executarExclusaoInsumo('${item.id}')" 
          class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
        >
          <i class="fa-solid fa-trash-can"></i> Confirmar Exclusão
        </button>
      </div>
    </div>
  `);
}

function executarExclusaoInsumo(id) {
  const item = insumos.find(i => i.id === id);
  const nomeItem = item ? item.nome : 'Insumo';

  insumos = insumos.filter(i => i.id !== id);
  if (bancoAtivo) excluirDoBanco('insumos', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.INSUMOS);
  updateBadges();
  fecharModal();
  showToast(`Insumo "${nomeItem}" removido do estoque.`);
  renderStockTable();
}

// ==========================================
// 3. MÓDULO FICHAS TÉCNICAS (DETALHADO E COMPLETO)
// ==========================================
function renderFichas() {
  const container = document.getElementById('tab-fichas');
  if (!container) return;

  const pagFichas = paginar('fichas', fichas);

  container.innerHTML = `
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-book-bookmark"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Fichas Técnicas & Formação de Preço</h2>
          <p class="text-xs text-slate-500">Cálculo de CMV exato vinculado aos insumos do estoque</p>
        </div>
      </div>
      <button onclick="abrirModalFicha()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2">
        <i class="fa-solid fa-plus"></i> Nova Ficha Técnica
      </button>
    </div>

    <!-- Grid de Fichas Técnicas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      ${pagFichas.itens.map(ficha => {
        const P = calcularPrecoFicha(ficha, 0);
        const PApp = calcularPrecoFicha(ficha, taxaEfetivaCanal('iFood'));
        const cmvTotal = P.cmvTotal;
        const rendimento = P.rendimento;
        const cmvUnitario = P.cmvUnit;
        const precoDireto = P.precoTotal;
        const precoApp = PApp.precoTotal;

        return `
          <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
            <div class="p-5 border-b border-slate-100">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ${ficha.categoria || 'Geral'}
                  </span>
                  <h3 class="font-bold text-slate-900 text-base mt-1.5">${ficha.nome}</h3>
                  <p class="text-xs text-slate-500">Rendimento: <strong>${rendimento} unidade(s)/porção</strong></p>
                </div>
                <div class="flex items-center gap-1">
                  <button onclick="abrirModalFicha('${ficha.id}')" class="p-1.5 text-slate-400 hover:text-slate-700"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button onclick="excluirFicha('${ficha.id}')" class="p-1.5 text-slate-400 hover:text-red-600"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>

              <!-- Ingredientes da Ficha -->
              <div class="mt-4">
                <p class="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Ingredientes & Insumos Utilizados:</p>
                <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  ${ficha.ingredientes.map(ing => {
                    const ins = insumos.find(i => i.id === ing.insumoId);
                    const custo = ins ? (getCustoUnitario(ins) * ing.qtd) : 0;
                    return `
                      <div class="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50 border border-slate-100">
                        <span class="text-slate-700">${ins ? ins.nome : 'Insumo excluído'}</span>
                        <div class="text-right">
                          <span class="text-slate-500 font-medium">${ing.qtd}${ins ? ins.unidade : ''}</span>
                          <span class="font-semibold text-slate-900 ml-2">${formatMoeda(custo)}</span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Preços e Sugestões -->
            <div class="p-5 bg-slate-50/70 border-t border-slate-100 space-y-3">
              <!-- CMV Total -->
              <div class="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span class="text-slate-600 font-medium">Custo Total de Insumos (CMV):</span>
                <span class="text-sm font-bold text-slate-900">${formatMoeda(cmvTotal)} ${rendimento > 1 ? `<span class="text-xs text-slate-500 font-normal">(${formatMoeda(cmvUnitario)}/un)</span>` : ''}</span>
              </div>

              <!-- Cards de Sugestão de Preço -->
              <div class="grid grid-cols-2 gap-3 pt-1">
                <!-- Venda Direta / WhatsApp -->
                <div class="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <i class="fa-brands fa-whatsapp text-sm"></i> Venda Direta
                  </div>
                  <p class="text-base font-black text-slate-900 mt-1">${formatMoeda(precoDireto)}</p>
                  <p class="text-[10px] text-emerald-600 font-medium mt-0.5">Sem taxas de app (${ficha.margemAlvo || 60}% margem)${rendimento > 1 ? ` • ${formatMoeda(P.precoUnit)}/un` : ''}</p>
                </div>

                <!-- Apps (iFood / 99Food) -->
                <div class="p-3 rounded-xl bg-white border border-red-200 shadow-2xs">
                  <div class="flex items-center gap-1.5 text-xs font-bold text-red-700">
                    <i class="fa-solid fa-motorcycle text-sm"></i> Preço nos Apps
                  </div>
                  <p class="text-base font-black text-slate-900 mt-1">${formatMoeda(precoApp)}</p>
                  <p class="text-[10px] text-red-600 font-medium mt-0.5">+${taxaEfetivaCanal('iFood')}% taxa iFood embutida${rendimento > 1 ? ` • ${formatMoeda(PApp.precoUnit)}/un` : ''}</p>
                </div>
              </div>
              <!-- Preço praticado + margem real -->
              <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                <span class="text-slate-500">Praticado: <strong class="text-slate-900">${P.precoPraticado > 0 ? formatMoeda(P.precoPraticado) : '—'}</strong>
                  ${P.precoPraticado > 0 ? `<span class="ml-1 px-1.5 py-0.5 rounded font-bold ${P.margemReal >= (ficha.margemAlvo || 60) ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${P.margemReal.toFixed(1)}% real</span>` : ''}
                </span>
                <button onclick="abrirModalFicha('${ficha.id}')" class="text-pink-700 font-bold hover:underline cursor-pointer">Ajustar preço</button>
              </div>
              ${(() => {
                const s = sugerirReajustePreco(ficha);
                if (!s || s.precoAtual <= 0 || s.diferenca < 0.5) return '';
                return `<div class="flex items-center justify-between gap-2 text-xs bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                  <span class="text-amber-800"><i class="fa-solid fa-arrow-trend-up"></i> Reajuste p/ manter ${Math.round(s.margemAlvo * 100)}%: <strong>${formatMoeda(s.precoSugerido)}</strong> (+${s.pct.toFixed(0)}%)</span>
                  <button onclick="aplicarReajustePreco('${ficha.id}')" class="px-2 py-0.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold cursor-pointer shrink-0">Aplicar</button>
                </div>`;
              })()}
              ${ficha.tempoPreparoMin || ficha.dicaForno || ficha.modoPreparo ? `
              <details class="pt-2 text-xs">
                <summary class="cursor-pointer font-bold text-slate-700">Modo de preparo ${ficha.tempoPreparoMin ? `• ${ficha.tempoPreparoMin}min` : ''} ${ficha.dicaForno ? `• ${ficha.dicaForno}` : ''}</summary>
                <p class="mt-1.5 whitespace-pre-line text-slate-600 bg-white border border-slate-200 rounded-lg p-2.5">${ficha.modoPreparo || '—'}</p>
              </details>` : ''}
              <div class="mt-1 flex items-center gap-3">
                <button onclick="imprimirFicha('${ficha.id}')" class="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-print"></i> Imprimir ficha</button>
                <button onclick="abrirEtiquetaNutricional('${ficha.id}')" class="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-apple-whole"></i> Etiqueta nutricional</button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    ${botoesPaginacao('fichas', pagFichas.total, pagFichas.atual)}
  `;
}

// Modal de Ficha Técnica
let tempIngredientesFicha = [];

function abrirModalFicha(id = null) {
  const ficha = id ? fichas.find(f => f.id === id) : null;
  tempIngredientesFicha = ficha ? JSON.parse(JSON.stringify(ficha.ingredientes)) : [];

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-book-bookmark text-emerald-500"></i> ${ficha ? 'Editar Ficha Técnica' : 'Nova Ficha Técnica'}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formFicha" onsubmit="salvarFicha(event, '${id || ''}')" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div class="col-span-2">
          <label class="block text-xs font-semibold text-slate-700 mb-1">Nome da Receita / Produto</label>
          <input type="text" id="ficNome" value="${ficha ? ficha.nome : ''}" placeholder="Ex: Cento de Brigadeiro Gourmet" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
          <input type="text" id="ficCategoria" value="${ficha ? ficha.categoria : 'Docinhos'}" placeholder="Docinhos, Bolos, Presentes" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Rendimento (unidades)</label>
          <input type="number" step="1" id="ficRendimento" value="${ficha ? ficha.rendimento : 1}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Margem Líquida Alvo (%)</label>
        <input type="number" step="1" id="ficMargem" value="${ficha ? (ficha.margemAlvo || 60) : 60}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Preço Praticado (R$) — o que você cobra hoje</label>
        <input type="number" step="0.01" min="0" id="ficPrecoPraticado" value="${ficha?.precoPraticado || ''}" placeholder="Ex: 180.00" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        <p class="text-[11px] text-slate-400 mt-1">Usado para calcular a margem real no card. Sugestão automática aparece após salvar.</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Tempo de preparo (min)</label>
          <input type="number" step="1" min="0" id="ficTempo" value="${ficha?.tempoPreparoMin || ''}" placeholder="Ex: 90" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Temperatura / dica forno</label>
          <input type="text" id="ficForno" value="${ficha?.dicaForno || ''}" placeholder="Ex: 180°C por 35min" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Modo de preparo (passo a passo)</label>
        <textarea id="ficModoPreparo" rows="4" placeholder="1. Misture...&#10;2. Leve ao forno..." class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">${ficha?.modoPreparo || ''}</textarea>
      </div>

      <!-- Insumos da Receita -->
      <div class="pt-2 border-t border-slate-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase">Ingredientes do Estoque</span>
          <button type="button" onclick="adicionarLinhaIngrediente()" class="text-xs text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1">
            <i class="fa-solid fa-plus"></i> Adicionar Insumo
          </button>
        </div>

        <div id="listaIngredientesModal" class="space-y-2 max-h-48 overflow-y-auto pr-1">
          <!-- Gerado dinamicamente -->
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">${ficha ? 'Salvar Ficha' : 'Cadastrar Ficha'}</button>
      </div>
    </form>
  `);

  renderLinhasIngredientesModal();
}

function renderLinhasIngredientesModal() {
  const container = document.getElementById('listaIngredientesModal');
  if (!container) return;

  if (tempIngredientesFicha.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-2 text-center">Nenhum ingrediente adicionado ainda. Clique acima para adicionar.</p>`;
    return;
  }

  container.innerHTML = tempIngredientesFicha.map((item, idx) => {
    return `
      <div class="flex items-center gap-2">
        <select onchange="atualizarTempIngrediente(${idx}, 'insumoId', this.value)" class="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800">
          <option value="">Selecione o insumo...</option>
          ${insumos.map(ins => `
            <option value="${ins.id}" ${ins.id === item.insumoId ? 'selected' : ''}>
              ${ins.nome} (${ins.unidade}) - ${formatMoeda(getCustoUnitario(ins))}/${ins.unidade}
            </option>
          `).join('')}
        </select>
        <input 
          type="number" 
          step="0.1" 
          value="${item.qtd}" 
          placeholder="Qtd"
          oninput="atualizarTempIngrediente(${idx}, 'qtd', this.value)"
          class="w-20 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <button type="button" onclick="removerLinhaIngrediente(${idx})" class="text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
      </div>
    `;
  }).join('');
}

function adicionarLinhaIngrediente() {
  if (insumos.length === 0) {
    alert('Cadastre primeiro insumos no Estoque!');
    return;
  }
  tempIngredientesFicha.push({ insumoId: insumos[0].id, qtd: 100 });
  renderLinhasIngredientesModal();
}

function removerLinhaIngrediente(idx) {
  tempIngredientesFicha.splice(idx, 1);
  renderLinhasIngredientesModal();
}

function atualizarTempIngrediente(idx, campo, valor) {
  if (tempIngredientesFicha[idx]) {
    tempIngredientesFicha[idx][campo] = campo === 'qtd' ? (Number(valor) || 0) : valor;
  }
}

function salvarFicha(e, id) {
  e.preventDefault();
  const nome = document.getElementById('ficNome').value.trim();
  const categoria = document.getElementById('ficCategoria').value.trim();
  const rendimento = Number(document.getElementById('ficRendimento').value) || 1;
  const margemAlvo = Number(document.getElementById('ficMargem').value) || 60;
  const precoPraticado = Number(document.getElementById('ficPrecoPraticado')?.value) || 0;
  const tempoPreparoMin = Number(document.getElementById('ficTempo')?.value) || 0;
  const dicaForno = document.getElementById('ficForno')?.value.trim() || '';
  const modoPreparo = document.getElementById('ficModoPreparo')?.value.trim() || '';

  const validIngredientes = tempIngredientesFicha.filter(i => i.insumoId && i.qtd > 0);

  if (validIngredientes.length === 0) {
    alert('Adicione pelo menos um ingrediente com quantidade válida à receita.');
    return;
  }

  if (id) {
    const ficha = fichas.find(f => f.id === id);
    if (ficha) {
      ficha.nome = nome;
      ficha.categoria = categoria;
      ficha.rendimento = rendimento;
      ficha.margemAlvo = margemAlvo;
      ficha.precoPraticado = precoPraticado;
      ficha.tempoPreparoMin = tempoPreparoMin;
      ficha.dicaForno = dicaForno;
      ficha.modoPreparo = modoPreparo;
      ficha.ingredientes = validIngredientes;
    }
  } else {
    fichas.push({
      id: 'fic-' + Date.now(),
      nome,
      categoria,
      rendimento,
      margemAlvo,
      precoPraticado,
      tempoPreparoMin,
      dicaForno,
      modoPreparo,
      ingredientes: validIngredientes
    });
  }

  saveData(STORAGE_KEYS.FICHAS);
  fecharModal();
  showToast('Ficha Técnica gravada!');
  renderFichas();
}

function excluirFicha(id) {
  if (!confirm('Deseja excluir esta ficha técnica?')) return;
  fichas = fichas.filter(f => f.id !== id);
  if (bancoAtivo) excluirDoBanco('fichas', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.FICHAS);
  showToast('Ficha excluída.');
  renderFichas();
}

// ==========================================
// 4. MÓDULO GESTÃO DE PEDIDOS (KANBAN DETALHADO COM DRAG & DROP)
// ==========================================
let draggedPedidoId = null;

const NOMES_COLUNAS_KANBAN = {
  'aguardando': 'Aguardando',
  'a_produzir': 'A Produzir',
  'producao': 'Em Produção',
  'pronto': 'Entregue'
};

function handleDragStart(e, id) {
  draggedPedidoId = id;
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  }
  const card = document.getElementById(`ped-card-${id}`);
  if (card) {
    setTimeout(() => {
      card.classList.add('opacity-40', 'scale-95');
    }, 0);
  }
}

function handleDragEnd(e) {
  if (draggedPedidoId) {
    const card = document.getElementById(`ped-card-${draggedPedidoId}`);
    if (card) {
      card.classList.remove('opacity-40', 'scale-95');
    }
  }
  draggedPedidoId = null;
  document.querySelectorAll('.kanban-dropzone').forEach(el => {
    el.classList.remove('bg-pink-50/80', 'border-pink-400', 'border-dashed', 'ring-2', 'ring-pink-300');
  });
}

function handleDragOver(e, status) {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move';
  }
  const zone = document.getElementById(`dropzone-${status}`);
  if (zone) {
    zone.classList.add('bg-pink-50/80', 'border-pink-400', 'border-dashed', 'ring-2', 'ring-pink-300');
  }
}

function handleDragLeave(e, status) {
  const zone = document.getElementById(`dropzone-${status}`);
  if (zone && (!e.relatedTarget || !zone.contains(e.relatedTarget))) {
    zone.classList.remove('bg-pink-50/80', 'border-pink-400', 'border-dashed', 'ring-2', 'ring-pink-300');
  }
}

function handleDrop(e, novoStatus) {
  e.preventDefault();
  const id = (e.dataTransfer && e.dataTransfer.getData('text/plain')) || draggedPedidoId;
  handleDragEnd(e);
  if (!id) return;

  const ped = pedidos.find(p => p.id === id);
  if (!ped || ped.status === novoStatus) return;

  ped.status = novoStatus;
  saveData(STORAGE_KEYS.PEDIDOS);
  showToast(`Pedido de ${ped.cliente} movido para "${NOMES_COLUNAS_KANBAN[novoStatus] || novoStatus}"!`);
  renderPedidos();
}

// AGENDA DE PRODUÇÃO SEMANAL — o que produzir por dia + insumos agregados
let agendaAlcance = 7;
function setAgendaAlcance(dias) {
  agendaAlcance = Number(dias) || 7;
  renderPedidos();
}
function diaISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}
function nomeDia(iso) {
  const d = new Date(iso + 'T12:00:00');
  const hoje = diaISO(0), amanha = diaISO(1);
  if (iso === hoje) return 'Hoje';
  if (iso === amanha) return 'Amanhã';
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
}
function pedidosDoDia(iso) {
  return pedidos
    .filter(p => p.status !== 'pronto' && (p.dataEntrega || '') === iso)
    .sort((a, b) => (a.horaEntrega || '').localeCompare(b.horaEntrega || ''));
}
function renderAgendaProducao() {
  const dias = [];
  for (let i = 0; i < agendaAlcance; i++) {
    const iso = diaISO(i);
    const lista = pedidosDoDia(iso);
    // Agrega fichas
    const fichasMap = {};
    lista.forEach(p => (p.itens || []).forEach(it => {
      const k = it.fichaId || it.nome;
      if (!fichasMap[k]) fichasMap[k] = { nome: it.nome, qtd: 0 };
      fichasMap[k].qtd += Number(it.qtd) || 0;
    }));
    // Agrega insumos
    const insumosMap = {};
    lista.forEach(p => calcularInsumosDoPedido(p).forEach(c => {
      if (!insumosMap[c.insumoId]) insumosMap[c.insumoId] = { ...c, qtdConsumo: 0 };
      insumosMap[c.insumoId].qtdConsumo += c.qtdConsumo;
    }));
    const insumosArr = Object.values(insumosMap);
    const faltantes = insumosArr.filter(c => (Number(c.estoqueAtual) || 0) - c.qtdConsumo < 0);
    dias.push({ iso, lista, fichasMap: Object.values(fichasMap), insumosArr, faltantes });
  }
  const totalAtivos = pedidos.filter(p => p.status !== 'pronto').length;
  const semData = pedidos.filter(p => p.status !== 'pronto' && !p.dataEntrega);
  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2"><i class="fa-solid fa-calendar-day text-blue-600"></i> Agenda de Produção</h3>
          <p class="text-xs text-slate-500">${totalAtivos} pedido(s) ativo(s) • o que fazer por dia, com insumos somados</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          ${[3, 7, 14].map(d => `<button onclick="setAgendaAlcance(${d})" class="px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${agendaAlcance === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}">${d} dias</button>`).join('')}
          <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-700 cursor-pointer"><i class="fa-solid fa-print mr-1"></i> Imprimir</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-4">
        ${dias.map(d => `
          <div class="rounded-xl border ${d.iso === diaISO(0) ? 'border-blue-300 ring-1 ring-blue-200' : 'border-slate-200'} overflow-hidden">
            <div class="px-3 py-2 ${d.iso === diaISO(0) ? 'bg-blue-50' : 'bg-slate-50'} border-b border-slate-200 flex items-center justify-between">
              <strong class="text-xs text-slate-800 capitalize">${nomeDia(d.iso)} <span class="text-slate-400 font-normal">• ${d.iso.split('-').reverse().join('/')}</span></strong>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${d.lista.length ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}">${d.lista.length}</span>
            </div>
            <div class="p-2.5 space-y-2">
              ${d.lista.length === 0 ? `<p class="text-[11px] text-slate-400 text-center py-3">Nada para entregar.</p>` : `
                ${d.lista.map(p => `
                  <div class="p-2 rounded-lg border border-slate-200 hover:border-blue-300 text-xs">
                    <div class="flex items-center justify-between gap-1">
                      <strong class="text-slate-900 truncate">${p.horaEntrega || '--:--'} • ${p.cliente}</strong>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">${p.status.replace('_', ' ')}</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-0.5 truncate">${(p.itens || []).map(it => `${it.qtd}x ${it.nome}`).join(' • ')}</p>
                    <div class="flex items-center gap-1 mt-1.5">
                      ${p.status === 'a_produzir' ? `<button onclick="moverPedidoStatus('${p.id}','producao')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-600 text-white cursor-pointer">Produzir</button>` : ''}
                      ${p.status !== 'pronto' ? `<button onclick="moverPedidoStatus('${p.id}','pronto')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-600 text-white cursor-pointer">Pronto</button>` : ''}
                      ${!p.estoqueBaixado ? `<button onclick="abrirModalConfirmarBaixa('${p.id}')" class="px-2 py-0.5 text-[10px] font-bold rounded bg-white border border-pink-300 text-pink-700 cursor-pointer">Baixa</button>` : `<span class="text-[10px] text-emerald-600 font-bold">✓ Baixado</span>`}
                      <button onclick="abrirModalPedido('${p.id}')" class="px-2 py-0.5 text-[10px] rounded bg-white border border-slate-200 text-slate-500 cursor-pointer">Abrir</button>
                      <button onclick="imprimirEtiquetaPedido('${p.id}')" title="Imprimir etiqueta" class="px-2 py-0.5 text-[10px] rounded bg-white border border-slate-200 text-slate-500 cursor-pointer"><i class="fa-solid fa-print"></i></button>
                    </div>
                  </div>
                `).join('')}
                ${d.fichasMap.length ? `<div class="p-2 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px]"><strong class="text-blue-900">Produzir no dia:</strong> ${d.fichasMap.map(f => `${f.qtd}x ${f.nome}`).join(' • ')}</div>` : ''}
                ${d.insumosArr.length ? `<div class="p-2 rounded-lg ${d.faltantes.length ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'} border text-[11px]">
                  <strong class="${d.faltantes.length ? 'text-red-800' : 'text-slate-700'}">Insumos do dia ${d.faltantes.length ? `(${d.faltantes.length} em falta!)` : '(OK)'}:</strong>
                  <span class="text-slate-600">${d.insumosArr.map(c => `${c.nome} ${c.qtdConsumo.toFixed(0)}${c.unidade}`).join(' • ')}</span>
                </div>` : ''}
              `}
            </div>
          </div>
        `).join('')}
      </div>
      ${semData.length ? `<p class="px-4 pb-3 text-[11px] text-amber-700">${semData.length} pedido(s) ativo(s) sem data de entrega — abra o pedido e preencha a data para aparecer na agenda.</p>` : ''}
    </div>
  `;
}

function renderPedidos() {
  const container = document.getElementById('tab-pedidos');
  if (!container) return;

  const colunas = [
    { id: 'aguardando', titulo: 'Aguardando', subtitulo: 'Sinal pendente', cor: 'amber', icon: 'fa-hourglass-start', bgBadge: 'bg-amber-100 text-amber-800' },
    { id: 'a_produzir', titulo: 'A Produzir', subtitulo: 'Pronto p/ fila', cor: 'blue', icon: 'fa-list-check', bgBadge: 'bg-blue-100 text-blue-800' },
    { id: 'producao', titulo: 'Em Produção', subtitulo: 'Na cozinha/forno', cor: 'purple', icon: 'fa-kitchen-set', bgBadge: 'bg-purple-100 text-purple-800' },
    { id: 'pronto', titulo: 'Entregue', subtitulo: 'Finalizado', cor: 'emerald', icon: 'fa-circle-check', bgBadge: 'bg-emerald-100 text-emerald-800' }
  ];

  container.innerHTML = `
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-slate-900 text-lg">Quadro Kanban de Pedidos</h2>
            <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hidden sm:inline-flex items-center gap-1">
              <i class="fa-solid fa-hand-pointer text-slate-400"></i> Arraste ou altere o status
            </span>
          </div>
          <p class="text-xs text-slate-500">Mova pedidos entre as etapas e acompanhe margem e lucro real</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="exportarCSV('pedidos')" class="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-file-csv"></i> Exportar CSV
        </button>
        <button onclick="abrirModalPedido()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2">
          <i class="fa-solid fa-plus"></i> Novo Pedido
        </button>
      </div>
    </div>

    ${renderAgendaProducao()}

    <!-- Kanban Board Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
      ${colunas.map(col => {
        const pedidosCol = pedidos.filter(p => p.status === col.id);
        const totalCol = pedidosCol.reduce((acc, p) => acc + (Number(p.valorTotal) || 0), 0);

        return `
          <div 
            id="dropzone-${col.id}"
            ondragover="handleDragOver(event, '${col.id}')"
            ondragleave="handleDragLeave(event, '${col.id}')"
            ondrop="handleDrop(event, '${col.id}')"
            class="kanban-dropzone bg-slate-100/90 rounded-2xl p-3.5 border-2 border-transparent transition-all min-h-[540px] flex flex-col"
          >
            <!-- Header da Coluna -->
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg ${col.bgBadge} flex items-center justify-center text-xs">
                  <i class="fa-solid ${col.icon}"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-800 text-sm leading-tight">${col.titulo}</h3>
                  <span class="text-[10px] text-slate-500">${col.subtitulo}</span>
                </div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-800 shadow-2xs border border-slate-200">
                ${pedidosCol.length}
              </span>
            </div>

            <div class="flex justify-between items-center text-[11px] text-slate-500 font-medium py-2.5 border-b border-slate-200/60 mb-3">
              <span>Volume da etapa:</span>
              <strong class="text-slate-800 text-xs">${formatMoeda(totalCol)}</strong>
            </div>

            <!-- Cards dos Pedidos -->
            <div class="space-y-3 flex-1 overflow-y-auto">
              ${pedidosCol.length === 0 ? `
                <div class="py-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1.5 p-4">
                  <i class="fa-solid fa-inbox text-2xl text-slate-300"></i>
                  <span>Nenhum pedido em <strong>${col.titulo}</strong></span>
                  <span class="text-[11px] text-slate-400">Arraste um pedido para cá</span>
                </div>
              ` : pedidosCol.map(ped => {
                const fin = calcularFinanceiroPedido(ped);
                const isPagoTotal = fin.restante <= 0;

                return `
                  <div 
                    id="ped-card-${ped.id}"
                    draggable="true"
                    ondragstart="handleDragStart(event, '${ped.id}')"
                    ondragend="handleDragEnd(event)"
                    class="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-2.5 cursor-grab active:cursor-grabbing select-none"
                  >
                    <!-- Drag Grip & Cliente & WhatsApp -->
                    <div class="flex items-start justify-between gap-1.5">
                      <div class="flex items-start gap-2 flex-1 min-w-0">
                        <div class="text-slate-300 hover:text-slate-500 pt-0.5" title="Arraste para mover">
                          <i class="fa-solid fa-grip-vertical text-sm"></i>
                        </div>
                        <div class="min-w-0 flex-1">
                          <h4 class="font-bold text-slate-900 text-sm leading-snug truncate">${esc(ped.cliente)}</h4>
                          <a 
                            href="https://wa.me/55${String(ped.telefone || '').replace(/\D/g, '')}" 
                            target="_blank" 
                            rel="noopener"
                            class="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold hover:underline mt-0.5"
                            onclick="event.stopPropagation()"
                          >
                            <i class="fa-brands fa-whatsapp"></i> ${esc(ped.telefone)}
                          </a>
                        </div>
                      </div>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                        ped.canal === 'WhatsApp' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        ped.canal === 'iFood' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }">
                        ${ped.canal} (${ped.taxaPercentual || 0}%)
                      </span>
                    </div>

                    <!-- Data e Hora de Entrega -->
                    <div class="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                      <i class="fa-regular fa-clock text-slate-400"></i>
                      <span>Entrega: <strong>${ped.dataEntrega || 'Hoje'} às ${ped.horaEntrega || '12:00'}</strong></span>
                    </div>

                    <!-- Itens do Pedido -->
                    <div class="text-xs text-slate-700 space-y-1">
                      ${(ped.itens || []).slice(0, 3).map(it => `
                        <div class="flex justify-between gap-2">
                          <span class="text-slate-600 truncate">${it.qtd}x ${esc(it.nome)}</span>
                          <span class="font-medium shrink-0">${formatMoeda(it.precoUnit * it.qtd)}</span>
                        </div>
                      `).join('')}
                      ${(ped.itens || []).length > 3 ? `
                        <p class="text-[11px] text-slate-400 font-medium">+${(ped.itens || []).length - 3} item(ns) — abra para ver tudo</p>
                      ` : ''}
                    </div>

                    <!-- Observações -->
                    ${ped.observacoes ? `
                      <div class="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-100 line-clamp-2" title="${esc(ped.observacoes)}">
                        <i class="fa-solid fa-note-sticky mr-1 text-amber-600"></i> ${esc(ped.observacoes)}
                      </div>
                    ` : ''}

                    <!-- Resumo Financeiro do Pedido -->
                    <div class="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div class="flex justify-between font-bold text-slate-900 text-[13px]">
                        <span>Total</span>
                        <span>${formatMoeda(fin.total)}</span>
                      </div>
                      <div class="flex justify-between items-center text-xs font-bold text-emerald-700">
                        <span>Lucro ${seloMargemPedido(ped).html}</span>
                        <span>${formatMoeda(fin.lucroLiquido)}</span>
                      </div>
                      <details class="text-[11px] text-slate-500">
                        <summary class="cursor-pointer hover:text-slate-700 font-medium select-none">Detalhes</summary>
                        <div class="pt-1 space-y-0.5">
                          <div class="flex justify-between">
                            <span>Sinal</span>
                            <span class="${isPagoTotal ? 'text-emerald-600 font-semibold' : 'text-amber-600'}">
                              ${formatMoeda(fin.sinal)}${isPagoTotal ? '' : ` • falta ${formatMoeda(fin.restante)}`}
                            </span>
                          </div>
                          <div class="flex justify-between">
                            <span>CMV insumos</span>
                            <span>-${formatMoeda(fin.cmvTotal)}</span>
                          </div>
                          ${fin.taxaApp > 0 ? `
                            <div class="flex justify-between text-red-500">
                              <span>Taxa app (${ped.taxaPercentual}%)</span>
                              <span>-${formatMoeda(fin.taxaApp)}</span>
                            </div>
                          ` : ''}
                        </div>
                      </details>
                    </div>

                    <!-- Baixa de Estoque dos Insumos -->
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      ${ped.estoqueBaixado ? `
                        <span class="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]" title="${ped.dataBaixaEstoque ? `Baixado em ${new Date(ped.dataBaixaEstoque).toLocaleDateString('pt-BR')}` : 'Estoque baixado'}">
                          <i class="fa-solid fa-boxes-packing text-emerald-600"></i> Estoque Baixado
                        </span>
                        <button onclick="estornarEstoquePedido('${ped.id}')" title="Estornar insumos de volta ao estoque" class="text-slate-400 hover:text-red-600 text-[10px] font-semibold underline cursor-pointer">
                          Estornar
                        </button>
                      ` : `
                        <span class="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                          <i class="fa-solid fa-box-open text-slate-400"></i> Estoque:
                        </span>
                        <button onclick="abrirModalConfirmarBaixa('${ped.id}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-pink-700 hover:text-pink-800 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                          <i class="fa-solid fa-box-archive text-[10px]"></i> Baixar Estoque
                        </button>
                      `}
                    </div>

                    <!-- Integração com Livro Caixa -->
                    ${(() => {
                      const sc = calcularStatusCaixaPedido(ped);
                      return `
                        <div class="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          ${sc.status === 'quitado' ? `
                            <span class="inline-flex items-center gap-1 font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md text-[10px]" title="Lançado no caixa: ${formatMoeda(sc.totalLancado)}">
                              <i class="fa-solid fa-cash-register text-teal-600"></i> Caixa: Quitado
                            </span>
                            <button onclick="abrirModalLancarCaixa('${ped.id}')" title="Ver lançamentos deste pedido no caixa" class="text-slate-400 hover:text-teal-700 text-[10px] font-semibold underline cursor-pointer">
                              Ver Caixa
                            </button>
                          ` : sc.status === 'parcial' ? `
                            <span class="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[10px]" title="Lançado: ${formatMoeda(sc.totalLancado)} | Falta: ${formatMoeda(sc.saldoPendente)}">
                              <i class="fa-solid fa-clock-rotate-left text-amber-600"></i> Caixa: ${formatMoeda(sc.totalLancado)}
                            </span>
                            <button onclick="abrirModalLancarCaixa('${ped.id}', 'restante')" title="Lançar restante pendente no caixa" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                              + Restante (${formatMoeda(sc.saldoPendente)})
                            </button>
                            ${(() => { const wpp = linkCobranca(ped); return wpp ? `
                            <a href="${wpp}" target="_blank" rel="noopener" title="Cobrar restante no WhatsApp" class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer">
                              <i class="fa-brands fa-whatsapp text-[11px]"></i>
                            </a>` : ''; })()}
                          ` : `
                            <span class="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                              <i class="fa-solid fa-cash-register text-slate-400"></i> Caixa:
                            </span>
                            <button onclick="abrirModalLancarCaixa('${ped.id}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer">
                              <i class="fa-solid fa-plus text-[9px]"></i> Lançar no Caixa
                            </button>
                          `}
                        </div>
                      `;
                    })()}

                    <!-- Seletor Rápido de Status (Alternativa ao Arrastar) -->
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <div class="flex items-center gap-1 text-xs">
                        <span class="text-[10px] font-semibold text-slate-400">Status:</span>
                        <select 
                          onchange="moverPedidoStatus('${ped.id}', this.value)" 
                          class="text-[11px] font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-1.5 py-1 text-slate-700 focus:outline-pink-500 cursor-pointer"
                        >
                          <option value="aguardando" ${ped.status === 'aguardando' ? 'selected' : ''}>Aguardando</option>
                          <option value="a_produzir" ${ped.status === 'a_produzir' ? 'selected' : ''}>A Produzir</option>
                          <option value="producao" ${ped.status === 'producao' ? 'selected' : ''}>Em Produção</option>
                          <option value="pronto" ${ped.status === 'pronto' ? 'selected' : ''}>Entregue</option>
                        </select>
                      </div>

                      <div class="flex items-center gap-1">
                        <button onclick="imprimirEtiquetaPedido('${ped.id}')" title="Imprimir etiqueta" class="p-1 text-slate-400 hover:text-slate-700 text-xs cursor-pointer">
                          <i class="fa-solid fa-print"></i>
                        </button>
                        <button onclick="abrirModalPedido('${ped.id}')" title="Editar Pedido" class="p-1 text-slate-400 hover:text-slate-700 text-xs">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button onclick="excluirPedido('${ped.id}')" title="Excluir Pedido" class="p-1 text-slate-400 hover:text-red-600 text-xs">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Botões Rápidos de Avançar / Retroceder -->
                    <div class="flex items-center justify-between pt-1 text-[10px]">
                      ${col.id !== 'aguardando' ? `
                        <button onclick="moverPedidoStatus('${ped.id}', '${getPrevStatus(col.id)}')" class="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 p-1 hover:bg-slate-100 rounded">
                          <i class="fa-solid fa-chevron-left text-[9px]"></i> Voltar
                        </button>
                      ` : '<span></span>'}
                      ${col.id !== 'pronto' ? `
                        <button onclick="moverPedidoStatus('${ped.id}', '${getNextStatus(col.id)}')" class="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 p-1 hover:bg-pink-50 rounded">
                          Avançar <i class="fa-solid fa-chevron-right text-[9px]"></i>
                        </button>
                      ` : '<span class="text-emerald-600 font-bold flex items-center gap-1"><i class="fa-solid fa-check text-[10px]"></i> Concluído</span>'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getPrevStatus(curr) {
  if (curr === 'pronto') return 'producao';
  if (curr === 'producao') return 'a_produzir';
  if (curr === 'a_produzir') return 'aguardando';
  return 'aguardando';
}

function getNextStatus(curr) {
  if (curr === 'aguardando') return 'a_produzir';
  if (curr === 'a_produzir') return 'producao';
  if (curr === 'producao') return 'pronto';
  return 'pronto';
}

function moverPedidoStatus(id, novoStatus) {
  const ped = pedidos.find(p => p.id === id);
  if (!ped) return;

  const statusAnterior = ped.status;
  ped.status = novoStatus;
  saveData(STORAGE_KEYS.PEDIDOS);

  // 1. Se avançou para 'producao' ou 'pronto' e ainda não teve baixa no estoque, oferece a conferência/baixa
  if ((novoStatus === 'producao' || novoStatus === 'pronto') && !ped.estoqueBaixado) {
    const insumosConsumo = calcularInsumosDoPedido(ped);
    if (insumosConsumo.length > 0) {
      showToast(`Pedido de ${ped.cliente} movido para "${NOMES_COLUNAS_KANBAN[novoStatus] || novoStatus}"!`);
      renderCurrentTab();
      setTimeout(() => {
        abrirModalConfirmarBaixa(id);
      }, 250);
      return;
    }
  }

  // 2. Se avançou para 'pronto' (Entregue) e há saldo pendente de recebimento no caixa, sugere o lançamento
  if (novoStatus === 'pronto') {
    const statusCaixa = calcularStatusCaixaPedido(ped);
    if (statusCaixa.saldoPendente > 0) {
      showToast(`Pedido de ${ped.cliente} entregue! Lançamento do restante no Caixa pendente.`);
      renderCurrentTab();
      setTimeout(() => {
        abrirModalLancarCaixa(id, 'restante');
      }, 300);
      return;
    }
  }

  showToast(`Pedido de ${ped.cliente} alterado para "${NOMES_COLUNAS_KANBAN[novoStatus] || novoStatus}"!`);
  renderCurrentTab();
}

// Modal de Criação / Edição de Pedido
let tempItensPedido = [];

function abrirModalPedido(id = null) {
  const ped = id ? pedidos.find(p => p.id === id) : null;
  tempItensPedido = ped ? JSON.parse(JSON.stringify(ped.itens)) : [];

  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-clipboard-list text-purple-600"></i> ${ped ? 'Editar Pedido' : 'Novo Pedido'}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formPedido" onsubmit="salvarPedido(event, '${id || ''}')" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Nome do Cliente</label>
          <input type="text" id="pedCliente" value="${ped ? ped.cliente : ''}" placeholder="Ex: Mariana Silva" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
          <input type="text" id="pedTelefone" value="${ped ? ped.telefone : ''}" placeholder="Ex: 11987654321" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data da Entrega</label>
          <input type="date" id="pedDataEntrega" value="${ped ? ped.dataEntrega : new Date().toISOString().split('T')[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Hora da Entrega</label>
          <input type="time" id="pedHoraEntrega" value="${ped ? ped.horaEntrega : '14:00'}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Canal de Origem</label>
          <select id="pedCanal" onchange="atualizarTaxaPorCanal(this.value)" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="WhatsApp" ${ped && ped.canal === 'WhatsApp' ? 'selected' : ''}>WhatsApp / Venda Direta (0%)</option>
            <option value="iFood" ${ped && ped.canal === 'iFood' ? 'selected' : ''}>iFood (23%)</option>
            <option value="99Food" ${ped && ped.canal === '99Food' ? 'selected' : ''}>99Food (18%)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Taxa do Canal (%)</label>
          <input type="number" step="0.5" id="pedTaxaPercentual" value="${ped ? ped.taxaPercentual : 0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <!-- Itens do Pedido (Produtos / Fichas) -->
      <div class="pt-2 border-t border-slate-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-700 uppercase">Itens do Pedido</span>
          <button type="button" onclick="adicionarItemPedido()" class="text-xs text-pink-600 font-semibold hover:text-pink-700 flex items-center gap-1">
            <i class="fa-solid fa-plus"></i> Adicionar Produto
          </button>
        </div>

        <div id="listaItensPedidoModal" class="space-y-2 max-h-40 overflow-y-auto pr-1">
          <!-- Gerado dinamicamente -->
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Valor Total (R$)</label>
          <input type="number" step="0.01" id="pedValorTotal" value="${ped ? ped.valorTotal : 0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 font-bold text-slate-900 focus:outline-pink-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Sinal Pago (R$)</label>
          <input type="number" step="0.01" id="pedValorSinal" value="${ped ? ped.valorSinal : 0}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Status do Pedido</label>
        <select id="pedStatus" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
          <option value="aguardando" ${ped && ped.status === 'aguardando' ? 'selected' : ''}>Aguardando</option>
          <option value="a_produzir" ${ped && ped.status === 'a_produzir' ? 'selected' : ''}>A Produzir</option>
          <option value="producao" ${ped && ped.status === 'producao' ? 'selected' : ''}>Em Produção</option>
          <option value="pronto" ${ped && ped.status === 'pronto' ? 'selected' : ''}>Entregue</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Observações (Tema, Decoração, Alergias)</label>
        <textarea id="pedObservacoes" rows="2" placeholder="Ex: Placa de chocolate Parabéns Lucas..." class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-pink-500">${ped ? (ped.observacoes || '') : ''}</textarea>
      </div>

      ${!ped ? `
        <!-- Integração Caixa: Entrada Automática do Sinal -->
        <div class="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-2.5 text-xs text-teal-900">
          <input type="checkbox" id="pedLancarSinalCaixa" checked class="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer" />
          <label for="pedLancarSinalCaixa" class="cursor-pointer">
            <span class="font-bold block">Registrar sinal recebido automaticamente no Caixa</span>
            <span class="text-[11px] text-teal-700">Se o valor do sinal for maior que R$ 0,00, cria imediatamente uma entrada correspondente no Livro Caixa.</span>
          </label>
        </div>
      ` : ''}

      ${ped ? (() => {
        const sc = calcularStatusCaixaPedido(ped);
        return `
          <!-- Integração com Livro Caixa (Modo Edição) -->
          <div class="p-3 rounded-xl border ${sc.status === 'quitado' ? 'bg-teal-50 border-teal-200 text-teal-900' : sc.status === 'parcial' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'} flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-cash-register ${sc.status === 'quitado' ? 'text-teal-600' : sc.status === 'parcial' ? 'text-amber-600' : 'text-slate-400'} text-base"></i>
              <div>
                <p class="font-bold">
                  ${sc.status === 'quitado' ? 'Caixa: 100% Quitado' : sc.status === 'parcial' ? `Caixa Parcial: ${formatMoeda(sc.totalLancado)} recebido` : 'Nenhum lançamento no Caixa'}
                </p>
                <p class="text-[11px] ${sc.status === 'quitado' ? 'text-teal-700' : sc.status === 'parcial' ? 'text-amber-700' : 'text-slate-500'}">
                  ${sc.saldoPendente > 0 ? `Falta lançar ${formatMoeda(sc.saldoPendente)} no caixa` : `Total líquido de ${formatMoeda(sc.valorLiquidoEsperado)} registrado no caixa`}
                </p>
              </div>
            </div>
            <button type="button" onclick="abrirModalLancarCaixa('${ped.id}')" class="px-2.5 py-1 text-xs font-bold rounded ${sc.status === 'quitado' ? 'bg-white border border-teal-300 text-teal-800 hover:bg-teal-100' : 'bg-teal-600 hover:bg-teal-700 text-white'} cursor-pointer shadow-2xs">
              ${sc.status === 'quitado' ? 'Ver Lançamentos' : 'Lançar no Caixa'}
            </button>
          </div>
        `;
      })() : ''}

      ${ped ? `
        <div class="p-3 rounded-xl border ${ped.estoqueBaixado ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'} flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <i class="fa-solid ${ped.estoqueBaixado ? 'fa-boxes-packing text-emerald-600' : 'fa-box-open text-slate-400'} text-base"></i>
            <div>
              <p class="font-bold">${ped.estoqueBaixado ? 'Estoque já baixado para este pedido' : 'Insumos pendentes de baixa no estoque'}</p>
              <p class="text-[11px] ${ped.estoqueBaixado ? 'text-emerald-700' : 'text-slate-500'}">
                ${ped.estoqueBaixado && ped.dataBaixaEstoque ? `Baixa registrada em: ${new Date(ped.dataBaixaEstoque).toLocaleDateString('pt-BR')}` : 'Você pode conferir os ingredientes e dar baixa agora.'}
              </p>
            </div>
          </div>
          ${ped.estoqueBaixado ? `
            <button type="button" onclick="estornarEstoquePedido('${ped.id}')" class="px-2.5 py-1 text-xs font-bold rounded bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer shadow-2xs">
              Estornar
            </button>
          ` : `
            <button type="button" onclick="abrirModalConfirmarBaixa('${ped.id}')" class="px-2.5 py-1 text-xs font-bold rounded bg-pink-600 hover:bg-pink-700 text-white cursor-pointer shadow-2xs">
              Baixar Insumos
            </button>
          `}
        </div>
      ` : ''}

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold">${ped ? 'Salvar Pedido' : 'Criar Pedido'}</button>
      </div>
    </form>
  `);

  renderItensPedidoModal();
}

function atualizarTaxaPorCanal(canal) {
  const taxaInput = document.getElementById('pedTaxaPercentual');
  if (!taxaInput) return;
  taxaInput.value = taxaEfetivaCanal(canal);
}

function renderItensPedidoModal() {
  const container = document.getElementById('listaItensPedidoModal');
  if (!container) return;

  if (tempItensPedido.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 py-1 text-center">Nenhum produto adicionado.</p>`;
    return;
  }

  container.innerHTML = tempItensPedido.map((item, idx) => {
    return `
      <div class="flex items-center gap-2">
        <select onchange="selecionarFichaItemPedido(${idx}, this.value)" class="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800">
          <option value="">Selecione a receita...</option>
          ${fichas.map(f => `
            <option value="${f.id}" ${f.id === item.fichaId ? 'selected' : ''}>${f.nome}</option>
          `).join('')}
        </select>
        <input 
          type="number" 
          step="1" 
          value="${item.qtd || 1}" 
          placeholder="Qtd"
          oninput="atualizarItemPedidoCampo(${idx}, 'qtd', this.value)"
          class="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <input 
          type="number" 
          step="0.01" 
          value="${item.precoUnit || 0}" 
          placeholder="Preço R$"
          oninput="atualizarItemPedidoCampo(${idx}, 'precoUnit', this.value)"
          class="w-24 border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800" 
        />
        <button type="button" onclick="removerItemPedido(${idx})" class="text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash-can text-xs"></i></button>
      </div>
    `;
  }).join('');
}

function adicionarItemPedido() {
  const primeiraFicha = fichas[0];
  tempItensPedido.push({
    fichaId: primeiraFicha ? primeiraFicha.id : '',
    nome: primeiraFicha ? primeiraFicha.nome : 'Produto',
    qtd: 1,
    precoUnit: 80.00
  });
  renderItensPedidoModal();
  recalcularTotalPedidoModal();
}

function selecionarFichaItemPedido(idx, fichaId) {
  const ficha = fichas.find(f => f.id === fichaId);
  if (ficha && tempItensPedido[idx]) {
    tempItensPedido[idx].fichaId = ficha.id;
    tempItensPedido[idx].nome = ficha.nome;
    // Sugere preço direto
    const cmv = calcularCMVFicha(ficha);
    const precoSugerido = Math.round((cmv / (1 - ((ficha.margemAlvo || 60)/100))));
    tempItensPedido[idx].precoUnit = precoSugerido;
  }
  renderItensPedidoModal();
  recalcularTotalPedidoModal();
}

function atualizarItemPedidoCampo(idx, campo, valor) {
  if (tempItensPedido[idx]) {
    tempItensPedido[idx][campo] = Number(valor) || 0;
    recalcularTotalPedidoModal();
  }
}

function removerItemPedido(idx) {
  tempItensPedido.splice(idx, 1);
  renderItensPedidoModal();
  recalcularTotalPedidoModal();
}

function recalcularTotalPedidoModal() {
  const total = tempItensPedido.reduce((acc, it) => acc + ((it.qtd || 1) * (it.precoUnit || 0)), 0);
  const totalInput = document.getElementById('pedValorTotal');
  if (totalInput) totalInput.value = total.toFixed(2);
}

function salvarPedido(e, id) {
  e.preventDefault();
  const cliente = document.getElementById('pedCliente').value.trim();
  const telefone = document.getElementById('pedTelefone').value.trim();
  const dataEntrega = document.getElementById('pedDataEntrega').value;
  const horaEntrega = document.getElementById('pedHoraEntrega').value;
  const canal = document.getElementById('pedCanal').value;
  const taxaPercentual = Number(document.getElementById('pedTaxaPercentual').value) || 0;
  const valorTotal = Number(document.getElementById('pedValorTotal').value) || 0;
  const valorSinal = Number(document.getElementById('pedValorSinal').value) || 0;
  const status = document.getElementById('pedStatus').value;
  const observacoes = document.getElementById('pedObservacoes').value.trim();
  const lancarSinalCaixa = document.getElementById('pedLancarSinalCaixa')?.checked;

  if (tempItensPedido.length === 0) {
    alert('Adicione pelo menos um item ao pedido!');
    return;
  }

  if (id) {
    const ped = pedidos.find(p => p.id === id);
    if (ped) {
      ped.cliente = cliente;
      ped.telefone = telefone;
      ped.dataEntrega = dataEntrega;
      ped.horaEntrega = horaEntrega;
      ped.canal = canal;
      ped.taxaPercentual = taxaPercentual;
      ped.valorTotal = valorTotal;
      ped.valorSinal = valorSinal;
      ped.status = status;
      ped.observacoes = observacoes;
      ped.itens = tempItensPedido;
    }
  } else {
    const novoPedido = {
      id: 'ped-' + Date.now(),
      cliente,
      telefone,
      dataEntrega,
      horaEntrega,
      canal,
      taxaPercentual,
      valorTotal,
      valorSinal,
      status,
      observacoes,
      itens: tempItensPedido,
      estoqueBaixado: false
    };
    pedidos.push(novoPedido);

    // Lançar sinal automaticamente se checkbox marcado e valorSinal > 0
    if (lancarSinalCaixa && valorSinal > 0) {
      const forma = (canal === 'iFood' || canal === '99Food') ? 'Repasse App' : 'PIX';
      lancamentos.unshift({
        id: 'lan-' + Date.now(),
        pedidoId: novoPedido.id,
        data: new Date().toISOString().split('T')[0],
        tipo: 'entrada',
        categoria: 'Venda de Pedido',
        forma,
        descricao: `Sinal Pedido #${novoPedido.id} - ${cliente}`,
        valor: valorSinal
      });
      saveData(STORAGE_KEYS.LANCAMENTOS);
    }
  }

  saveData(STORAGE_KEYS.PEDIDOS);
  upsertClienteFromPedido(cliente, telefone);
  fecharModal();
  showToast('Pedido registrado com sucesso!');
  renderCurrentTab();
}

function excluirPedido(id) {
  const ped = pedidos.find(p => p.id === id);
  if (!ped) return;

  if (ped.estoqueBaixado) {
    const estornar = confirm(`Atenção: O pedido de "${ped.cliente}" já teve baixa de estoque realizada.\n\nDeseja devolver os insumos ao estoque físico antes de excluir?`);
    if (estornar) {
      const itensConsumidos = calcularInsumosDoPedido(ped);
      itensConsumidos.forEach(itemConsumo => {
        const ins = insumos.find(i => i.id === itemConsumo.insumoId);
        if (ins) {
          const atual = Number(ins.quantidade !== undefined ? ins.quantidade : ins.estoqueAtual) || 0;
          const novoValor = Number((atual + itemConsumo.qtdConsumo).toFixed(3));
          ins.estoqueAtual = novoValor;
          ins.quantidade = novoValor;
        }
      });
      saveData(STORAGE_KEYS.INSUMOS);
      updateBadges();
    }
  } else {
    if (!confirm(`Deseja realmente excluir o pedido de "${ped.cliente}"?`)) return;
  }

  // Verificar se há lançamentos vinculados no caixa
  const lancsDoPedido = obterLancamentosDoPedido(id);
  if (lancsDoPedido.length > 0) {
    const totalLancs = lancsDoPedido.reduce((a, b) => a + (Number(b.valor) || 0), 0);
    const removerLancs = confirm(`Este pedido possui ${lancsDoPedido.length} lançamento(s) no Caixa (Total: ${formatMoeda(totalLancs)}).\n\nDeseja remover também esses lançamentos do Livro Caixa?`);
    if (removerLancs) {
      const idsLancs = lancsDoPedido.map(l => l.id);
      lancamentos = lancamentos.filter(l => l.pedidoId !== id);
      if (bancoAtivo) excluirLoteDoBanco('lancamentos', idsLancs).catch(err => console.error(err));
      saveData(STORAGE_KEYS.LANCAMENTOS);
    }
  }

  pedidos = pedidos.filter(p => p.id !== id);
  if (bancoAtivo) excluirDoBanco('pedidos', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.PEDIDOS);
  showToast('Pedido removido com sucesso.');
  renderCurrentTab();
}

// ==========================================
// 5. MÓDULO PREVISÃO DE COMPRAS (CALCULADORA MRP)
// ==========================================
function renderMRP() {
  const container = document.getElementById('tab-mrp');
  if (!container) return;

  // 1. Ler pedidos ativos que AINDA NÃO tiveram baixa dada no estoque
  // (pedidos com estoque já baixado já tiveram seus insumos deduzidos do saldo físico)
  const pedidosAtivos = pedidos.filter(p => p.status !== 'pronto' && !p.estoqueBaixado);

  // 2. Somar todos os ingredientes necessários
  const necessidadePorInsumo = {}; // { insumoId: totalNecessario }

  pedidosAtivos.forEach(ped => {
    (ped.itens || []).forEach(item => {
      const ficha = fichas.find(f => f.id === item.fichaId);
      if (ficha && ficha.ingredientes) {
        const fator = (item.qtd || 1) / (ficha.rendimento || 1);
        ficha.ingredientes.forEach(ing => {
          if (!necessidadePorInsumo[ing.insumoId]) {
            necessidadePorInsumo[ing.insumoId] = 0;
          }
          necessidadePorInsumo[ing.insumoId] += (ing.qtd * fator);
        });
      }
    });
  });

  // 3. Montar tabela comparando com Estoque Atual
  const listaCompras = [];
  let custoTotalEstimado = 0;

  insumos.forEach(ins => {
    const necessario = necessidadePorInsumo[ins.id] || 0;
    if (necessario > 0) {
      const estoqueAtual = ins.estoqueAtual || 0;
      const saldo = estoqueAtual - necessario;
      const falta = saldo < 0 ? Math.abs(saldo) : 0;
      
      // Quantidade de pacotes inteiros a comprar (arredondado para cima)
      const pacotesAComprar = falta > 0 ? Math.ceil(falta / ins.qtdPacote) : 0;
      const custoEstimado = pacotesAComprar * ins.precoPacote;
      custoTotalEstimado += custoEstimado;

      listaCompras.push({
        insumo: ins,
        necessario,
        estoqueAtual,
        saldo,
        falta,
        pacotesAComprar,
        custoEstimado
      });
    }
  });

  container.innerHTML = `
    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Previsão de Compras (Calculadora MRP)</h2>
          <p class="text-xs text-slate-500">Cálculo de necessidades para ${pedidosAtivos.length} pedido(s) ativos na fila</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <span class="text-xs text-slate-500 block">Custo Estimado da Lista</span>
          <span class="text-base font-bold text-slate-900">${formatMoeda(custoTotalEstimado)}</span>
        </div>
        ${custoTotalEstimado > 0 ? `
          <button onclick="abrirModalLancarCompraMRPCaixa(${custoTotalEstimado})" class="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer" title="Registrar despesa desta compra de insumos diretamente no Livro Caixa">
            <i class="fa-solid fa-receipt"></i> Lançar no Caixa
          </button>
        ` : ''}
        <button onclick="copiarListaComprasWhatsApp()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-brands fa-whatsapp text-base"></i> Copiar WhatsApp
        </button>
      </div>
    </div>

    <!-- Tabela MRP -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Comparativo: Necessidade dos Pedidos Ativos vs. Estoque Atual
        </span>
        <span class="text-xs text-slate-500">
          ${listaCompras.filter(i => i.falta > 0).length} itens precisam de reposição
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-600 uppercase">
            <tr>
              <th class="py-3.5 px-4">Insumo</th>
              <th class="py-3.5 px-3">Necessidade Total</th>
              <th class="py-3.5 px-3">Estoque Atual</th>
              <th class="py-3.5 px-3">Saldo Projetado</th>
              <th class="py-3.5 px-3">Falta</th>
              <th class="py-3.5 px-3">Pacotes a Comprar</th>
              <th class="py-3.5 px-4 text-right">Custo Estimado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${listaCompras.length === 0 ? `
              <tr>
                <td colspan="7" class="py-8 text-center text-slate-400">
                  <i class="fa-solid fa-clipboard-check text-2xl mb-2 block"></i>
                  Nenhum ingrediente demandado pelos pedidos ativos.
                </td>
              </tr>
            ` : listaCompras.map(row => {
              const precisaComprar = row.falta > 0;
              return `
                <tr class="hover:bg-slate-50/80 transition-colors ${precisaComprar ? 'bg-rose-50/30' : ''}">
                  <td class="py-3.5 px-4 font-semibold text-slate-900">
                    ${row.insumo.nome}
                    <span class="text-xs text-slate-400 font-normal block">${row.insumo.categoria}</span>
                  </td>
                  <td class="py-3.5 px-3 font-semibold text-slate-800">
                    ${row.necessario} ${row.insumo.unidade}
                  </td>
                  <td class="py-3.5 px-3 text-slate-700">
                    ${row.estoqueAtual} ${row.insumo.unidade}
                  </td>
                  <td class="py-3.5 px-3">
                    <span class="text-xs font-bold ${row.saldo < 0 ? 'text-red-600' : 'text-emerald-600'}">
                      ${row.saldo > 0 ? '+' : ''}${row.saldo} ${row.insumo.unidade}
                    </span>
                  </td>
                  <td class="py-3.5 px-3">
                    ${precisaComprar ? `
                      <span class="font-bold text-red-600">${row.falta} ${row.insumo.unidade}</span>
                    ` : `
                      <span class="text-xs text-emerald-600 font-medium">Suficiente</span>
                    `}
                  </td>
                  <td class="py-3.5 px-3">
                    ${precisaComprar ? `
                      <span class="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-red-100 text-red-800 border border-red-200">
                        <i class="fa-solid fa-basket-shopping"></i> Comprar ${row.pacotesAComprar} pct (${row.insumo.qtdPacote}${row.insumo.unidade}/pct)
                      </span>
                    ` : `
                      <span class="text-xs text-slate-400">0 pct</span>
                    `}
                  </td>
                  <td class="py-3.5 px-4 text-right font-bold ${precisaComprar ? 'text-slate-900' : 'text-slate-400'}">
                    ${formatMoeda(row.custoEstimado)}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Botão Copiar Lista de Compras para WhatsApp (mesmo filtro da tabela: ignora baixados)
function copiarListaComprasWhatsApp() {
  const pedidosAtivos = pedidos.filter(p => p.status !== 'pronto' && !p.estoqueBaixado);
  const necessidadePorInsumo = {};

  pedidosAtivos.forEach(ped => {
    (ped.itens || []).forEach(item => {
      const ficha = fichas.find(f => f.id === item.fichaId);
      if (ficha && ficha.ingredientes) {
        const fator = (item.qtd || 1) / (ficha.rendimento || 1);
        ficha.ingredientes.forEach(ing => {
          if (!necessidadePorInsumo[ing.insumoId]) necessidadePorInsumo[ing.insumoId] = 0;
          necessidadePorInsumo[ing.insumoId] += (ing.qtd * fator);
        });
      }
    });
  });

  const itensParaComprar = [];
  let totalEstimado = 0;

  insumos.forEach(ins => {
    const necessario = necessidadePorInsumo[ins.id] || 0;
    const falta = Math.max(0, necessario - (ins.estoqueAtual || 0));
    if (falta > 0) {
      const pacotes = Math.ceil(falta / ins.qtdPacote);
      const custo = pacotes * ins.precoPacote;
      totalEstimado += custo;
      itensParaComprar.push(`• *${ins.nome}*: ${pacotes}x pacote(s) [${ins.qtdPacote}${ins.unidade}] (~${formatMoeda(custo)})`);
    }
  });

  if (itensParaComprar.length === 0) {
    showToast('O estoque atual é suficiente para todos os pedidos ativos!');
    return;
  }

  const texto = [
    `🛒 *LISTA DE COMPRAS - CONFEITARIA* 🎂`,
    `Data: ${new Date().toLocaleDateString('pt-BR')}`,
    `Pedidos na fila: ${pedidosAtivos.length} pedidos`,
    `----------------------------------`,
    `*ITENS A COMPRAR NO MERCADO:*`,
    ...itensParaComprar,
    `----------------------------------`,
    `💰 *Custo Total Estimado: ${formatMoeda(totalEstimado)}*`
  ].join('\n');

  navigator.clipboard.writeText(texto).then(() => {
    showToast('Lista de compras copiada para o WhatsApp!');
  }).catch(() => {
    alert('Texto da lista de compras:\n\n' + texto);
  });
}

// ==========================================
// 6. MÓDULO FLUXO FINANCEIRO (CAIXA)
// ==========================================
// Bloco DRE reutilizado na aba Caixa e na aba DRE (grupo Financeiro)
function htmlBlocoDRE(dre) {
  return `
    <!-- DRE MENSAL -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2"><i class="fa-solid fa-scale-balanced text-purple-600"></i> DRE do Mês — Resultado Real</h3>
          <p class="text-xs text-slate-500">Competência pela data de entrega dos pedidos + caixa pela data do lançamento</p>
        </div>
        <div class="flex items-center gap-2">
          <input type="month" value="${dre.prefix}" onchange="setDreMes(this.value)" class="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800" />
          <button onclick="exportarCSV('caixa')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer">CSV</button>
        </div>
      </div>
      <div class="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">Faturamento (${dre.qtdPedidos} pedidos)</p><p class="text-base font-black text-slate-900">${formatMoeda(dre.faturamento)}</p></div>
        <div class="p-3 rounded-xl bg-red-50/60 border border-red-100"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) CMV insumos</p><p class="text-base font-bold text-red-700">−${formatMoeda(dre.cmv)}</p></div>
        <div class="p-3 rounded-xl bg-red-50/60 border border-red-100"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Taxas apps</p><p class="text-base font-bold text-red-700">−${formatMoeda(dre.taxas)}</p></div>
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">Lucro bruto</p><p class="text-base font-black text-emerald-700">${formatMoeda(dre.lucroBruto)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Custos fixos</p><p class="font-bold">−${formatMoeda(dre.custosFixos)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Pró-labore</p><p class="font-bold">−${formatMoeda(dre.proLabore)}</p></div>
        <div class="p-3 rounded-xl bg-white border border-slate-200"><p class="text-slate-500 font-semibold uppercase text-[10px]">(−) Outras saídas</p><p class="font-bold">−${formatMoeda(dre.outrasSaidas)}</p></div>
        <div class="p-3 rounded-xl ${dre.lucroLiquido >= 0 ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200'} border"><p class="text-slate-500 font-semibold uppercase text-[10px]">= Lucro líquido (${dre.margem.toFixed(1)}%)</p><p class="text-base font-black ${dre.lucroLiquido >= 0 ? 'text-purple-700' : 'text-red-700'}">${formatMoeda(dre.lucroLiquido)}</p></div>
      </div>
      ${dre.faturamento === 0 ? `<p class="px-4 pb-3 text-[11px] text-amber-700">Sem pedidos com entrega em ${dre.prefix}. Troque o mês ou confira a data de entrega dos pedidos.</p>` : ''}
    </div>`;
}

function renderDRE() {
  const container = document.getElementById('tab-dre');
  if (!container) return;
  const dre = calcularDRE(dreMes);
  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">DRE do Mês</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Demonstrativo do resultado • grupo Financeiro</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="gerarRelatorioContador()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer" title="Baixa CSV com DRE, pedidos, caixa e estoque do mês">
          <i class="fa-solid fa-file-arrow-down"></i> Relatório p/ contador
        </button>
        <button onclick="switchTab('caixa')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-2 transition-all shadow-2xs cursor-pointer">
          <i class="fa-solid fa-cash-register text-teal-600"></i> Abrir Livro Caixa
        </button>
      </div>
    </div>
    ${htmlBlocoDRE(dre)}
    <div class="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-2.5">
      <i class="fa-solid fa-lightbulb text-blue-500 mt-0.5"></i>
      <div>Margem líquida saudável para confeitaria fica entre <strong>20% e 40%</strong>. Abaixo disso, revise o CMV nas fichas ou as taxas dos canais em Promoções.</div>
    </div>
  `;
}

function renderCaixa() {
  const container = document.getElementById('tab-caixa');
  if (!container) return;

  const totalEntradas = lancamentos.filter(l => l.tipo === 'entrada').reduce((acc, l) => acc + Number(l.valor), 0);
  const totalSaidas = lancamentos.filter(l => l.tipo === 'saida').reduce((acc, l) => acc + Number(l.valor), 0);
  const totalProLabore = lancamentos.filter(l => l.categoria === 'Pró-Labore').reduce((acc, l) => acc + Number(l.valor), 0);
  const saldoCaixa = totalEntradas - totalSaidas;

  // Conciliação de pedidos com saldo a receber
  const pedidosComSaldoPendente = pedidos.map(p => ({
    pedido: p,
    statusCaixa: calcularStatusCaixaPedido(p)
  })).filter(item => item.statusCaixa.saldoPendente > 0);

  const totalPendenteGeral = pedidosComSaldoPendente.reduce((acc, item) => acc + item.statusCaixa.saldoPendente, 0);
  const pagCaixa = paginar('caixa', lancamentos);
  const dre = calcularDRE(dreMes);

  container.innerHTML = `
    ${htmlBlocoDRE(dre)}

    <!-- Top Bar & Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-cash-register"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saldo em Caixa</p>
          <p class="text-xl font-black ${saldoCaixa >= 0 ? 'text-teal-600' : 'text-red-600'}">${formatMoeda(saldoCaixa)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-arrow-down-long"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Entradas</p>
          <p class="text-xl font-bold text-slate-900">${formatMoeda(totalEntradas)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-arrow-up-long"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Saídas</p>
          <p class="text-xl font-bold text-slate-900">${formatMoeda(totalSaidas)}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-hand-holding-dollar"></i>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pró-Labore Retirado</p>
          <p class="text-xl font-bold text-purple-600">${formatMoeda(totalProLabore)}</p>
        </div>
      </div>
    </div>

    <!-- Conciliação com Pedidos: Receitas Pendentes de Lançamento -->
    ${pedidosComSaldoPendente.length > 0 ? `
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/70">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-200/70 text-amber-800 flex items-center justify-center text-sm font-bold">
              <i class="fa-solid fa-cash-register"></i>
            </div>
            <div>
              <h4 class="font-bold text-amber-950 text-xs sm:text-sm">
                ${pedidosComSaldoPendente.length} Pedido(s) com Recebimentos Pendentes de Registro no Caixa
              </h4>
              <p class="text-[11px] text-amber-800">
                Receita líquida total a dar entrada no caixa: <strong class="text-amber-900">${formatMoeda(totalPendenteGeral)}</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${pedidosComSaldoPendente.map(({ pedido: p, statusCaixa: sc }) => `
            <div class="bg-white rounded-xl p-3 border border-amber-200 flex items-center justify-between text-xs shadow-2xs">
              <div class="truncate mr-2">
                <span class="font-bold text-slate-900 block truncate">${esc(p.cliente)}</span>
                <span class="text-[10px] text-slate-500">
                  #${p.id} • Falta lançar: <strong class="text-amber-700">${formatMoeda(sc.saldoPendente)}</strong>
                </span>
              </div>
              <button onclick="abrirModalLancarCaixa('${p.id}')" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-2xs shrink-0 cursor-pointer transition-colors flex items-center gap-1">
                <i class="fa-solid fa-plus text-[9px]"></i> Lançar
              </button>
              ${(() => { const wpp = linkCobranca(p); return wpp ? `
              <a href="${wpp}" target="_blank" rel="noopener" title="Cobrar saldo no WhatsApp" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-2xs shrink-0 cursor-pointer transition-colors flex items-center gap-1">
                <i class="fa-brands fa-whatsapp text-[11px]"></i> Cobrar
              </a>` : ''; })()}
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Actions & Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base">Livro Caixa (Entradas e Saídas)</h3>
          <p class="text-xs text-slate-500">Histórico de movimentações financeiras operacionais</p>
        </div>
        <button onclick="abrirModalLancamento()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer">
          <i class="fa-solid fa-plus"></i> Novo Lançamento
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-700">
          <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
            <tr>
              <th class="py-3.5 px-4">Data</th>
              <th class="py-3.5 px-3">Tipo</th>
              <th class="py-3.5 px-3">Categoria</th>
              <th class="py-3.5 px-4">Descrição / Origem</th>
              <th class="py-3.5 px-3">Forma</th>
              <th class="py-3.5 px-4 text-right">Valor</th>
              <th class="py-3.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${lancamentos.length === 0 ? `
              <tr>
                <td colspan="7" class="py-8 text-center text-slate-400">Nenhum lançamento no caixa.</td>
              </tr>
            ` : pagCaixa.itens.map(l => `
              <tr class="hover:bg-slate-50/80 transition-colors">
                <td class="py-3.5 px-4 text-xs font-medium text-slate-600">${l.data}</td>
                <td class="py-3.5 px-3">
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    l.tipo === 'entrada' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }">
                    ${l.tipo === 'entrada' ? '+ Entrada' : '- Saída'}
                  </span>
                </td>
                <td class="py-3.5 px-3 text-xs font-semibold text-slate-700">${l.categoria}</td>
                <td class="py-3.5 px-4 text-slate-900 font-medium">
                  ${l.descricao}
                  ${l.pedidoId ? `
                    <button onclick="abrirModalPedido('${l.pedidoId}')" class="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded hover:bg-teal-100 transition-colors ml-1.5 cursor-pointer" title="Ver Detalhes do Pedido">
                      <i class="fa-solid fa-clipboard-list text-[9px]"></i> #${l.pedidoId.replace('ped-', '')}
                    </button>
                  ` : ''}
                </td>
                <td class="py-3.5 px-3 text-xs text-slate-500">${l.forma || 'PIX'}</td>
                <td class="py-3.5 px-4 text-right font-bold ${l.tipo === 'entrada' ? 'text-emerald-600' : 'text-slate-900'}">
                  ${l.tipo === 'entrada' ? '+' : '-'}${formatMoeda(l.valor)}
                </td>
                <td class="py-3.5 px-3 text-right">
                  <button onclick="excluirLancamento('${l.id}')" title="Excluir Lançamento" class="text-slate-400 hover:text-red-600 p-1 cursor-pointer"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ${botoesPaginacao('caixa', pagCaixa.total, pagCaixa.atual)}
    </div>
  `;
}

function abrirModalLancamento() {
  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-cash-register text-teal-500"></i> Novo Lançamento de Caixa
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form id="formLancamento" onsubmit="salvarLancamento(event)" class="mt-4 space-y-4 text-sm">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Tipo de Movimentação</label>
          <select id="lanTipo" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="entrada">Entrada (+)</option>
            <option value="saida">Saída (-)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Data</label>
          <input type="date" id="lanData" value="${new Date().toISOString().split('T')[0]}" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Categoria</label>
          <select id="lanCategoria" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="Venda de Pedido">Venda de Pedido</option>
            <option value="Compra de Insumos">Compra de Insumos</option>
            <option value="Pró-Labore">Retirada de Pró-Labore</option>
            <option value="Custo Fixo">Custo Fixo (Gás, Luz, MEI)</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Forma de Pagamento</label>
          <select id="lanForma" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500">
            <option value="PIX">PIX</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Repasse App">Repasse App</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Vincular a um Pedido (Opcional)</label>
        <select id="lanPedidoId" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-pink-500">
          <option value="">Nenhum (Lançamento avulso)</option>
          ${pedidos.map(p => `
            <option value="${p.id}">Pedido #${p.id} - ${p.cliente} (${formatMoeda(p.valorTotal)})</option>
          `).join('')}
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Descrição</label>
        <input type="text" id="lanDescricao" placeholder="Ex: Compra de embalagens no atacado" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-pink-500" />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Valor (R$)</label>
        <input type="number" step="0.01" id="lanValor" placeholder="0.00" required class="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold focus:outline-pink-500" />
      </div>

      <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer">Salvar Lançamento</button>
      </div>
    </form>
  `);
}

function salvarLancamento(e) {
  e.preventDefault();
  const tipo = document.getElementById('lanTipo').value;
  const data = document.getElementById('lanData').value;
  const categoria = document.getElementById('lanCategoria').value;
  const forma = document.getElementById('lanForma').value;
  const descricao = document.getElementById('lanDescricao').value.trim();
  const valor = Number(document.getElementById('lanValor').value) || 0;
  const pedidoId = document.getElementById('lanPedidoId')?.value || null;

  lancamentos.unshift({
    id: 'lan-' + Date.now(),
    pedidoId: pedidoId || undefined,
    data,
    tipo,
    categoria,
    forma,
    descricao,
    valor
  });

  saveData(STORAGE_KEYS.LANCAMENTOS);
  fecharModal();
  showToast('Lançamento registrado!');
  PAGINACAO.caixa.pagina = 1;
  renderCurrentTab();
}

function excluirLancamento(id) {
  if (!confirm('Deseja excluir este lançamento?')) return;
  lancamentos = lancamentos.filter(l => l.id !== id);
  if (bancoAtivo) excluirDoBanco('lancamentos', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.LANCAMENTOS);
  showToast('Lançamento removido.');
  renderCurrentTab();
}

// Copia as quantidades de uma semana para outra (offset relativo à atual)
function duplicarSemanaCardapio(origemOffset, destinoOffset) {
  const origem = diasDaSemanaCardapio(origemOffset);
  const destino = diasDaSemanaCardapio(destinoOffset);
  const temAlgo = origem.some(iso => Object.keys(cardapios[iso] || {}).length > 0);
  if (!temAlgo) { showToast('A semana de origem está vazia.', false); return; }
  const lblOrigem = origem[0].split('-').reverse().slice(0, 2).join('/');
  const lblDestino = destino[0].split('-').reverse().slice(0, 2).join('/');
  const destinoTemDados = destino.some(iso => Object.keys(cardapios[iso] || {}).length > 0);
  if (destinoTemDados && !confirm(`A semana de ${lblDestino} já tem quantidades. Sobrescrever?`)) return;
  destino.forEach((iso, i) => {
    const src = cardapios[origem[i]] || {};
    if (Object.keys(src).length) cardapios[iso] = JSON.parse(JSON.stringify(src));
    else delete cardapios[iso];
  });
  salvarCardapios();
  renderCardapio();
  showToast(`Cardápio de ${lblOrigem} copiado para ${lblDestino}!`);
}

// Navegação por teclado na grade de produção (setas + Enter + Esc)
function tecladoGradeCardapio(e) {
  const el = e.target;
  if (!el || el.tagName !== 'INPUT' || el.type !== 'number') return;
  if (!el.dataset.grade) return;
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    e.preventDefault();
    const proximo = moverFocoGrade(el, 1, false);
    if (proximo) { proximo.focus(); proximo.select(); }
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const anterior = moverFocoGrade(el, -1, false);
    if (anterior) { anterior.focus(); anterior.select(); }
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const passo = e.key === 'ArrowDown' ? 7 : -7;
    const abaixo = moverFocoGrade(el, passo, true);
    if (abaixo) { abaixo.focus(); abaixo.select(); }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    el.value = el.dataset.valorOriginal || '';
    el.blur();
  }
}

function moverFocoGrade(atual, passo, pularLinha) {
  const grade = document.getElementById('gradeCardapio');
  if (!grade) return null;
  const celulas = Array.from(grade.querySelectorAll('input[data-grade]'));
  const i = celulas.indexOf(atual);
  if (i < 0) return null;
  const destino = i + passo;
  if (destino < 0 || destino >= celulas.length) return null;
  // Setas ← → não devem pular para a próxima linha ao fim/dia
  if (!pularLinha) {
    const colunas = 7;
    if (Math.floor(i / colunas) !== Math.floor(destino / colunas)) return null;
  }
  return celulas[destino];
}

// Modal: copiar a semana atual (ou anterior) para a próxima
function abrirModalDuplicarSemana() {
  const opcoes = (sel) => {
    return [-2, -1, 0, 1, 2].map(o => {
      const dias = diasDaSemanaCardapio(o);
      const lbl = dias[0].split('-').reverse().slice(0, 2).join('/') + ' a ' + dias[6].split('-').reverse().slice(0, 2).join('/');
      const nome = o === 0 ? 'Esta semana' : o < 0 ? `${Math.abs(o)} semana(s) atrás` : `Em ${o} semana(s)`;
      const qtd = dias.reduce((a, iso) => a + Object.keys(cardapios[iso] || {}).length, 0);
      return `<option value="${o}" ${o === sel ? 'selected' : ''}>${nome} — ${lbl} (${qtd} produto(s))</option>`;
    }).join('');
  };
  abrirModal(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-copy text-emerald-600"></i> Duplicar cardápio da semana
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form onsubmit="confirmarDuplicarSemana(event)" class="mt-4 space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Copiar de</label>
        <select id="dupOrigem" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">${opcoes(cardapioSemanaOffset)}</select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Copiar para</label>
        <select id="dupDestino" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800">${opcoes(cardapioSemanaOffset + 1)}</select>
      </div>
      <p class="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
        As quantidades são copiadas mantendo o mesmo dia da semana (seg→seg, ter→ter). Útil quando o cardápio se repete: você só ajusta o que mudou.
      </p>
      <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
        <button type="button" onclick="fecharModal()" class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs">Duplicar</button>
      </div>
    </form>
  `);
}

function confirmarDuplicarSemana(e) {
  e.preventDefault();
  const origem = Number(document.getElementById('dupOrigem').value) || 0;
  const destino = Number(document.getElementById('dupDestino').value) || 0;
  fecharModal();
  duplicarSemanaCardapio(origem, destino);
}

// ==========================================
// 7. MÓDULO VIABILIDADE DE PROMOÇÕES & CALENDÁRIO COMERCIAL
// ==========================================

// ==========================================
// ABA CARDÁPIO — planejador mensal temático + montador da semana
// ==========================================
function mudarMesCardapio(valor) {
  if (valor) cardapioMes = valor;
  renderCardapio();
}

function semanaCardapio(delta) {
  if (delta === 0) cardapioSemanaOffset = 0;
  else cardapioSemanaOffset += delta;
  renderCardapio();
}

// Quantidade planejada de uma ficha em um dia (0 = não produces)
function qtdCardapioNoDia(iso, fichaId) {
  const dia = cardapios[iso];
  if (!dia || Array.isArray(dia)) return 0;
  return Math.max(0, Number(dia[fichaId]) || 0);
}

function definirQtdCardapio(iso, fichaId, valor) {
  const qtd = Math.max(0, Number(valor) || 0);
  if (!cardapios[iso] || Array.isArray(cardapios[iso])) cardapios[iso] = {};
  if (qtd > 0) cardapios[iso][fichaId] = qtd;
  else delete cardapios[iso][fichaId];
  if (Object.keys(cardapios[iso]).length === 0) delete cardapios[iso];
  salvarCardapios();
  renderCardapio();
}

function definirQtdCardapioSilencioso(iso, fichaId, qtd) {
  if (!cardapios[iso] || Array.isArray(cardapios[iso])) cardapios[iso] = {};
  if (qtd > 0) cardapios[iso][fichaId] = qtd;
  else delete cardapios[iso][fichaId];
  if (Object.keys(cardapios[iso]).length === 0) delete cardapios[iso];
}

function aplicarFiltroCardapio(valor) {
  cardapioFiltro = String(valor || '').trim().toLowerCase();
  renderCardapio();
  const inp = document.getElementById('cardapioBusca');
  if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
}

function alternarSoEscalados() {
  cardapioSoEscalados = !cardapioSoEscalados;
  renderCardapio();
}

function escalarTodos(diasDaSemana) {
  if (!confirm(`Preencher todos os ${diasDaSemana} dias com 1 unidade de cada ficha?\n\nUse como ponto de partida e ajuste as quantidades.`)) return;
  preencherComOpcoes(1, false);
}

// Preenche a semana com N unidades de cada produto (usado pelo botão e pelo menu)
function preencherComOpcoes(qtd, perguntar = true) {
  if (fichas.length === 0) { showToast('Cadastre fichas técnicas primeiro.', false); return; }
  if (perguntar && !confirm(`Preencher os 7 dias com ${qtd} un de cada produto?`)) return;
  const dias = diasDaSemanaCardapio(cardapioSemanaOffset);
  dias.forEach(iso => fichas.forEach(f => definirQtdCardapioSilencioso(iso, f.id, qtd)));
  salvarCardapios();
  renderCardapio();
  showToast(`Cardápio preenchido com ${qtd} un. de cada produto. Ajuste as quantidades agora.`);
}

function copiarDaSemanaAnterior() {
  duplicarSemanaCardapio(-1, 0);
}

function toggleMenuPreencher() {
  const m = document.getElementById('menuPreencher');
  if (m) m.classList.toggle('hidden');
}

function fecharMenuPreencher() {
  const m = document.getElementById('menuPreencher');
  if (m) m.classList.add('hidden');
}

function limparSemanaCardapio() {
  const dias = diasDaSemanaCardapio(cardapioSemanaOffset);
  if (!dias.some(iso => Object.keys(cardapios[iso] || {}).length > 0)) return;
  if (!confirm('Limpar toda a produção planejada desta semana?')) return;
  dias.forEach(iso => delete cardapios[iso]);
  salvarCardapios();
  renderCardapio();
  showToast('Produção da semana limpa.');
}

// Totais da semana: quantidade, receita, custo (CMV), lucro e insumos exigidos
function resumoCardapioSemana(offset = 0) {
  const dias = diasDaSemanaCardapio(offset);
  const porFicha = {}; // { fichaId: { qtd, receita, custo } }
  const porDia = {};   // { iso: { qtd, receita, custo, itens } }
  let qtdTotal = 0, receita = 0, custo = 0;

  dias.forEach(iso => {
    const dia = cardapios[iso] || {};
    porDia[iso] = { qtd: 0, receita: 0, custo: 0, itens: 0 };
    Object.keys(dia).forEach(fid => {
      const f = fichas.find(x => x.id === fid);
      if (!f) return;
      const qtd = Math.max(0, Number(dia[fid]) || 0);
      if (qtd <= 0) return;
      const rend = Number(f.rendimento) > 0 ? Number(f.rendimento) : 1;
      const cmvU = calcularCMVFicha(f) / rend;
      const preco = Number(f.precoPraticado) || 0;
      const rec = qtd * preco;
      const cus = qtd * cmvU;
      qtdTotal += qtd; receita += rec; custo += cus;
      porDia[iso].qtd += qtd; porDia[iso].receita += rec; porDia[iso].custo += cus; porDia[iso].itens += 1;
      if (!porFicha[fid]) porFicha[fid] = { qtd: 0, receita: 0, custo: 0 };
      porFicha[fid].qtd += qtd; porFicha[fid].receita += rec; porFicha[fid].custo += cus;
    });
  });

  return {
    dias, porFicha, porDia, qtdTotal, receita, custo,
    lucro: receita - custo,
    margem: receita > 0 ? ((receita - custo) / receita) * 100 : 0,
    diasAtivos: Object.values(porDia).filter(d => d.itens > 0).length,
    insumos: insumosDaProducaoPlanejada(offset)
  };
}

// Insumos exigidos pela produção planejada × estoque atual
function insumosDaProducaoPlanejada(offset = 0) {
  const dias = diasDaSemanaCardapio(offset);
  const mapa = {};
  dias.forEach(iso => {
    const dia = cardapios[iso] || {};
    Object.keys(dia).forEach(fid => {
      const f = fichas.find(x => x.id === fid);
      if (!f || !Array.isArray(f.ingredientes)) return;
      const qtd = Math.max(0, Number(dia[fid]) || 0);
      if (qtd <= 0) return;
      const rend = Number(f.rendimento) > 0 ? Number(f.rendimento) : 1;
      const fator = qtd / rend;
      f.ingredientes.forEach(ing => {
        const ins = insumos.find(i => i.id === ing.insumoId);
        if (!ins) return;
        if (!mapa[ins.id]) mapa[ins.id] = { insumo: ins, necessario: 0 };
        mapa[ins.id].necessario += (Number(ing.qtd) || 0) * fator;
      });
    });
  });
  return Object.values(mapa).map(({ insumo, necessario }) => {
    const estoque = Number(insumo.estoqueAtual ?? insumo.quantidade) || 0;
    return {
      id: insumo.id,
      nome: insumo.nome,
      unidade: insumo.unidade || 'g',
      qtdPacote: Number(insumo.qtdPacote) > 0 ? Number(insumo.qtdPacote) : 1,
      precoPacote: Number(insumo.precoPacote) || 0,
      necessario, estoque,
      falta: Math.max(0, necessario - estoque),
      critico: necessario > estoque
    };
  }).sort((a, b) => (b.critico - a.critico) || (b.falta - a.falta));
}

// Joga a ficha no simulador de Promoções e navega para lá
function simularPromoCardapio(fichaId) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) { showToast('Ficha não encontrada.', false); return; }
  simuladorPromo.fichaId = f.id;
  simuladorPromo.canal = 'WhatsApp';
  simuladorPromo.taxaCanal = 0;
  simuladorPromo.tipoDesconto = 'percentual';
  simuladorPromo.descontoPercentual = 15;
  simuladorPromo.brindeAtivo = false;
  switchTab('promocoes');
  setTimeout(() => {
    const el = document.getElementById('secao-simulador');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
  showToast(`"${f.nome}" carregada no simulador!`);
}

function textoCardapioWhats() {
  const R = resumoCardapioSemana(cardapioSemanaOffset);
  const nomes = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO'];
  const ini = R.dias[0].split('-').reverse().slice(0, 2).join('/');
  const fim = R.dias[6].split('-').reverse().slice(0, 2).join('/');
  const linhas = [`*🧁 CARDÁPIO DA SEMANA — ${ini} a ${fim}*`, ''];
  R.dias.forEach((iso, i) => {
    const dia = cardapios[iso] || {};
    const itens = Object.keys(dia)
      .map(fid => ({ f: fichas.find(x => x.id === fid), qtd: Number(dia[fid]) || 0 }))
      .filter(x => x.f && x.qtd > 0)
      .sort((a, b) => b.qtd - a.qtd);
    const ddmm = iso.split('-').reverse().slice(0, 2).join('/');
    const tema = tematicaDoDia(iso);
    const d = R.porDia[iso];
    linhas.push(`*${nomes[i]} ${ddmm}*${tema ? ` — ${tema.nome} 🎉` : ''}`);
    if (itens.length === 0) {
      linhas.push('_sem produção programada_');
    } else {
      itens.forEach(x => {
        const preco = Number(x.f.precoPraticado) || 0;
        linhas.push(`• ${x.qtd}x ${x.f.nome}${preco > 0 ? ` — ${formatMoeda(preco)}/un` : ''}`);
      });
      linhas.push(`_${d.itens} produto(s) • ${d.qtd} un • ${formatMoeda(d.receita)}_`);
    }
    linhas.push('');
  });
  linhas.push('*RESUMO DA SEMANA*');
  linhas.push(`Produção total: ${R.qtdTotal} unidades em ${R.diasAtivos} dia(s)`);
  linhas.push(`Receita prevista: ${formatMoeda(R.receita)}`);
  linhas.push(`Custo (CMV): ${formatMoeda(R.custo)}`);
  linhas.push(`Lucro previsto: ${formatMoeda(R.lucro)} (${R.margem.toFixed(1)}%)`);
  const faltando = R.insumos.filter(i => i.critico);
  if (faltando.length > 0) {
    linhas.push('');
    linhas.push(`⚠️ *Insumos insuficientes:* ${faltando.map(i => `${i.nome} (falta ${i.falta.toFixed(0)}${i.unidade})`).join(', ')}`);
  }
  linhas.push('');
  const assinatura = assinaturaMarca();
  linhas.push(marca.nome ? `*${marca.nome}*${marca.slogan ? ' — ' + marca.slogan : ''}` : '_Encomendas pelo WhatsApp!_');
  if (assinatura) linhas.push(assinatura);
  return linhas.join('\n');
}

function copiarCardapioWhats() {
  const texto = textoCardapioWhats();
  navigator.clipboard.writeText(texto).then(() => {
    showToast('Cardápio copiado para o WhatsApp!');
  }).catch(() => {
    alert('Texto do cardápio:\n\n' + texto);
  });
}

// Lista de compras do que falta para a produção planejada
function copiarComprasCardapio() {
  const R = resumoCardapioSemana(cardapioSemanaOffset);
  if (!R.insumos.length) { showToast('Nenhuma produção planejada nesta semana.', false); return; }
  const faltando = R.insumos.filter(i => i.critico);
  if (!faltando.length) {
    showToast('Estoque cobre toda a produção planejada! 🎉');
    return;
  }
  const linhas = ['*🛒 LISTA DE COMPRAS — produção da semana*', ''];
  faltando.forEach(i => {
    const qtdPacote = i.qtdPacote > 0 ? i.qtdPacote : 1;
    const pct = Math.ceil(i.falta / qtdPacote);
    const custo = i.precoPacote > 0 ? ` — ${formatMoeda(pct * i.precoPacote)}` : '';
    linhas.push(`• ${i.nome}: comprar ${pct}x pacote(s) de ${qtdPacote}${i.unidade} (falta ${i.falta.toFixed(0)}${i.unidade})${custo}`);
  });
  const totalCusto = faltando.reduce((a, i) => a + (i.precoPacote > 0 ? Math.ceil(i.falta / (i.qtdPacote || 1)) * i.precoPacote : 0), 0);
  if (totalCusto > 0) linhas.push('', `*Total estimado: ${formatMoeda(totalCusto)}*`);
  const texto = linhas.join('\n');
  navigator.clipboard.writeText(texto).then(() => {
    showToast('Lista de compras copiada!');
  }).catch(() => alert('Lista de compras:\n\n' + texto));
}

// ==========================================
// MODO APRESENTAÇÃO: tela cheia, pronta para foto / Status do WhatsApp
// ==========================================
function abrirModoApresentacao() {
  const R = resumoCardapioSemana(cardapioSemanaOffset);
  const nomes = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
  const ini = R.dias[0].split('-').reverse().slice(0, 2).join('/');
  const fim = R.dias[6].split('-').reverse().slice(0, 2).join('/');
  const c1 = corMarca('corPrincipal');
  const c2 = corMarca('corSecundaria');
  const c3 = corMarca('corFundo');

  const colunas = R.dias.map((iso, i) => {
    const itens = Object.keys(cardapios[iso] || {})
      .map(fid => ({ f: fichas.find(x => x.id === fid), qtd: Number(cardapios[iso][fid]) || 0 }))
      .filter(x => x.f && x.qtd > 0);
    return `<div class="flex-1 min-w-0">
      <div class="text-center pb-2 mb-2 border-b-2" style="border-color:${c1}">
        <p class="text-xs font-black tracking-wider" style="color:${c2}">${nomes[i]}</p>
        <p class="text-[10px]" style="color:${c1}">${iso.split('-').reverse().slice(0, 2).join('/')}</p>
      </div>
      ${itens.length === 0
        ? `<p class="text-[10px] italic text-center py-4" style="color:${c1}99">—</p>`
        : itens.map(x => `<div class="mb-2.5">
            <p class="text-sm font-bold leading-tight" style="color:${c2}">${esc(x.f.nome)}</p>
            <p class="text-[11px]" style="color:${c1}">
              ${x.qtd} un${Number(x.f.precoPraticado) > 0 ? ` • ${formatMoeda(Number(x.f.precoPraticado))} cada` : ''}
            </p>
          </div>`).join('')}
    </div>`;
  }).join('');

  const el = document.createElement('div');
  el.id = 'modoApresentacao';
  el.className = 'fixed inset-0 z-50 overflow-y-auto';
  el.style.background = c3;
  const comLogo = marca.logo && marca.usarLogoCardapio;
  el.innerHTML = `
    <div class="max-w-5xl mx-auto px-5 py-8 sm:py-12">
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="flex items-center gap-4 min-w-0">
          ${comLogo ? `<img src="${esc(marca.logo)}" alt="" class="w-16 h-16 object-contain shrink-0" />` : ''}
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-[0.25em]" style="color:${c1}">Cardápio da Semana</p>
            <h2 class="text-3xl sm:text-4xl font-black mt-1" style="font-family: Georgia, serif; color:${c2}">${ini} a ${fim}</h2>
            <p class="text-sm mt-1" style="color:${c1}">${R.diasAtivos} dia(s) de produção • ${R.qtdTotal} unidades</p>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="window.print()" class="px-3.5 py-2 rounded-xl bg-white border text-xs font-bold transition-colors cursor-pointer" style="border-color:${c2};color:${c2}">
            <i class="fa-solid fa-print"></i> Imprimir
          </button>
          <button onclick="fecharModoApresentacao()" class="w-9 h-9 rounded-xl bg-white border flex items-center justify-center transition-colors cursor-pointer" style="border-color:${c2};color:${c2}" title="Fechar (Esc)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      ${marca.slogan && marca.usarAssinatura ? `<p class="text-center text-sm mb-4" style="color:${c2}">${esc(marca.slogan)}</p>` : ''}

      <div class="bg-white rounded-3xl shadow-sm px-5 py-6" style="border:1px solid ${c2}22">
        ${R.qtdTotal === 0
          ? `<p class="text-center text-sm py-12" style="color:${c1}">Nada programado para esta semana. Volte ao Cardápio e monte a produção.</p>`
          : `<div class="flex gap-4">${colunas}</div>`}
      </div>

      ${R.qtdTotal > 0 ? `
      <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${c2}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${c1}">Unidades</p>
          <p class="text-xl font-black" style="color:${c2}">${R.qtdTotal}</p>
        </div>
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${c2}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${c1}">Receita prevista</p>
          <p class="text-xl font-black" style="color:${c2}">${formatMoeda(R.receita)}</p>
        </div>
        <div class="bg-white rounded-2xl px-4 py-3" style="border:1px solid ${c2}22">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${c1}">Produtos</p>
          <p class="text-xl font-black" style="color:${c2}">${Object.keys(R.porFicha).length}</p>
        </div>
        <div class="rounded-2xl px-4 py-3" style="background:${c2}">
          <p class="text-[10px] font-bold uppercase tracking-wider" style="color:${c1}">Encomendas</p>
          <p class="text-xl font-black text-white text-center mt-0.5">📲</p>
        </div>
      </div>` : ''}

      <p class="text-center text-xs mt-8" style="color:${c2}">
        ${marca.nome ? `<strong>${esc(marca.nome)}</strong> • ` : ''}${esc(assinaturaMarca() || 'Encomendas pelo WhatsApp!')}
      </p>
    </div>`;
  document.body.appendChild(el);
}

function fecharModoApresentacao() {
  const el = document.getElementById('modoApresentacao');
  if (el) el.remove();
}

function imprimirCardapio() {
  const R = resumoCardapioSemana(cardapioSemanaOffset);
  const nomes = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const ini = R.dias[0].split('-').reverse().join('/');
  const fim = R.dias[6].split('-').reverse().join('/');
  const linhasProdutos = Object.keys(R.porFicha).map(fid => {
    const f = fichas.find(x => x.id === fid);
    if (!f) return '';
    const p = R.porFicha[fid];
    return `<tr class="border-b border-slate-100">
      <td class="py-1.5 pr-2 font-semibold">${esc(f.nome)}</td>
      ${R.dias.map(iso => `<td class="py-1.5 px-1 text-center">${qtdCardapioNoDia(iso, fid) || ''}</td>`).join('')}
      <td class="py-1.5 px-2 text-right font-bold">${p.qtd}</td>
    </tr>`;
  }).join('');

  abrirModal(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900">🧁 ${marca.nome ? esc(marca.nome) + ' — Cardápio' : 'Cardápio'} ${ini} a ${fim}</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    ${cabecalhoMarca('grande')}
    ${R.qtdTotal === 0 ? `<p class="text-xs text-slate-400 text-center py-6">Nada programado para esta semana.</p>` : `
    <table class="w-full mt-3 text-[11px] text-slate-700">
      <thead>
        <tr class="bg-slate-50 text-slate-500 uppercase text-[9px] font-bold tracking-wider">
          <th class="py-1.5 pr-2 text-left rounded-l-lg">Produto</th>
          ${nomes.map(n => `<th class="py-1.5 px-1 text-center">${n.slice(0, 3)}</th>`).join('')}
          <th class="py-1.5 px-2 text-right rounded-r-lg">Total</th>
        </tr>
      </thead>
      <tbody>${linhasProdutos}</tbody>
      <tfoot>
        <tr class="border-t-2 border-slate-200 font-bold text-slate-900">
          <td class="py-2 pr-2">Total</td>
          ${R.dias.map(iso => `<td class="py-2 px-1 text-center">${R.porDia[iso].qtd || ''}</td>`).join('')}
          <td class="py-2 px-2 text-right">${R.qtdTotal}</td>
        </tr>
      </tfoot>
    </table>
    <div class="grid grid-cols-2 gap-2 mt-3 text-[11px]">
      <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Receita prevista</p>
        <p class="font-black text-emerald-700">${formatMoeda(R.receita)}</p>
      </div>
      <div class="p-2 rounded-lg bg-red-50 border border-red-200">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Custo (CMV)</p>
        <p class="font-black text-red-700">${formatMoeda(R.custo)}</p>
      </div>
      <div class="p-2 rounded-lg bg-purple-50 border border-purple-200 col-span-2">
        <p class="text-slate-500 font-semibold uppercase text-[9px]">Lucro previsto</p>
        <p class="font-black text-purple-700">${formatMoeda(R.lucro)} <span class="text-[10px] font-bold">(${R.margem.toFixed(1)}%)</span></p>
      </div>
    </div>
    ${R.insumos.filter(i => i.critico).length > 0 ? `
      <div class="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
        <p class="font-bold mb-1">⚠️ Insumos insuficientes para esta produção</p>
        ${R.insumos.filter(i => i.critico).map(i => `<p>• ${esc(i.nome)}: precisa ${i.necessario.toFixed(0)}${esc(i.unidade)} • falta <strong>${i.falta.toFixed(0)}${esc(i.unidade)}</strong></p>`).join('')}
      </div>` : ''}`}
    <button onclick="window.print()" class="mt-4 w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold transition-colors cursor-pointer">
      <i class="fa-solid fa-print"></i> Imprimir
    </button>
  `);
}

function renderCardapio() {
  const container = document.getElementById('tab-cardapio');
  if (!container) return;
  const [anoS, mesS] = String(cardapioMes || '').split('-');
  const ano = Number(anoS) || new Date().getFullYear();
  const mes = Number(mesS) || (new Date().getMonth() + 1);
  const datas = datasTematicasDoMes(ano, mes);
  const nomesMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const dias = diasDaSemanaCardapio(cardapioSemanaOffset);
  const nomesDia = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
  const iniLbl = dias[0].split('-').reverse().slice(0, 2).join('/');
  const fimLbl = dias[6].split('-').reverse().slice(0, 2).join('/');
  const hojeISO = diaISO(0);
  const R = resumoCardapioSemana(cardapioSemanaOffset);
  const insumosCriticos = R.insumos.filter(i => i.critico);

  // Linhas da grade: fichas filtradas pela busca / toggle "só escalados"
  const linhasGrade = fichas.filter(f => {
    if (cardapioFiltro && !`${f.nome} ${f.categoria || ''}`.toLowerCase().includes(cardapioFiltro)) return false;
    if (cardapioSoEscalados && !R.porFicha[f.id]) return false;
    return true;
  });

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Cardápio do Mês & da Semana</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Datas que vendem doce + grade de produção da semana (quanto fazer, de quê e a custo)</p>
      </div>
      <div class="flex items-center gap-2">
        <input type="month" value="${cardapioMes}" onchange="mudarMesCardapio(this.value)" class="border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold" />
      </div>
    </div>

    <!-- BLOCO A: DATAS TEMÁTICAS DO MÊS -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-calendar-days"></i>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">${nomesMes[mes - 1]} de ${ano}</h3>
          <p class="text-xs text-slate-500">${datas.length} data(s) temática(s) • sugestões casadas com as suas fichas</p>
        </div>
      </div>
      ${datas.length === 0 ? `<p class="text-xs text-slate-400 text-center py-6">Nenhuma data temática neste mês.</p>` : `
      <div class="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
        ${datas.map(({ entry: e, iso, diff }) => {
          const sug = sugerirFichasParaData(e, 3);
          const ddmm = iso.split('-').reverse().slice(0, 2).join('/');
          const divulgarAte = somarDiasISO(iso, -(e.antecedencia || 0)).split('-').reverse().slice(0, 2).join('/');
          const naHora = diff >= 0 && diff <= (e.antecedencia || 0) && (e.antecedencia || 0) > 0;
          const tipoLbl = e.tipo === 'feriado' ? 'Feriado' : e.tipo === 'campanha' ? 'Campanha' : 'Temática';
          const tipoCls = e.tipo === 'feriado' ? 'bg-slate-100 text-slate-600 border-slate-200' : e.tipo === 'campanha' ? 'bg-pink-100 text-pink-700 border-pink-200' : 'bg-orange-100 text-orange-700 border-orange-200';
          return `<div class="rounded-xl border ${diff === 0 ? 'border-orange-300 bg-orange-50/50' : 'border-slate-200'} p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-9 h-9 rounded-xl ${(MAPA_CORES_CALENDARIO[e.cor] || MAPA_CORES_CALENDARIO.slate)} flex items-center justify-center text-sm shrink-0">
                  <i class="fa-solid ${e.icone}"></i>
                </span>
                <div class="min-w-0">
                  <p class="font-bold text-slate-900 text-sm truncate">${esc(e.nome)}</p>
                  <p class="text-[11px] text-slate-500">${ddmm} • <strong class="${diff < 0 ? 'text-slate-400' : 'text-orange-600'}">${rotuloCountdown(diff)}</strong></p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${tipoCls}">${tipoLbl}</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-2 leading-relaxed">${esc(e.descricao)}</p>
            <p class="text-[11px] text-slate-600 mt-1">💡 ${esc(e.estrategia)}</p>
            ${naHora ? `<p class="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mt-2">⏰ Hora de agir: divulgue até ${divulgarAte}!</p>` : ''}
            <div class="mt-2.5 pt-2.5 border-t border-slate-100">
              <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Produtos sugeridos (por margem)</p>
              ${sug.length === 0 ? `<p class="text-[11px] text-slate-400">Cadastre fichas para receber sugestões.</p>` : sug.map(s => `
                <div class="flex items-center justify-between gap-2 py-1">
                  <span class="text-xs font-semibold text-slate-800 truncate">${esc(s.ficha.nome)}${s.margem != null ? ` <span class="text-[10px] font-bold ${s.margem >= 40 ? 'text-emerald-600' : s.margem >= 22 ? 'text-blue-600' : 'text-amber-600'}">${s.margem.toFixed(0)}%</span>` : ''}</span>
                  <button onclick="simularPromoCardapio('${s.ficha.id}')" class="text-[10px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg border border-rose-100 transition-colors shrink-0 cursor-pointer">
                    Simular <i class="fa-solid fa-arrow-right text-[9px]"></i>
                  </button>
                </div>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>`}
    </div>

    <!-- BLOCO B: GRADE DE PRODUÇÃO (produto × dia) -->
    <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
            <i class="fa-solid fa-table-cells"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Grade de produção — ${iniLbl} a ${fimLbl}</h3>
            <p class="text-xs text-slate-500">${R.qtdTotal} un em ${R.diasAtivos} dia(s) • digite a quantidade a produzir em cada dia</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <button onclick="semanaCardapio(-1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer" title="Semana anterior">‹</button>
          <button onclick="semanaCardapio(0)" class="px-3 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer">Hoje</button>
          <button onclick="semanaCardapio(1)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer" title="Próxima semana">›</button>
        </div>
      </div>

      <!-- Resumo financeiro da semana -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
        <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Receita prevista</p>
          <p class="text-lg font-black text-emerald-700">${formatMoeda(R.receita)}</p>
          <p class="text-[10px] text-emerald-600">${R.qtdTotal} unidades</p>
        </div>
        <div class="p-2.5 rounded-xl bg-red-50 border border-red-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-red-700">Custo (CMV)</p>
          <p class="text-lg font-black text-red-700">${formatMoeda(R.custo)}</p>
          <p class="text-[10px] text-red-600">insumos da ficha</p>
        </div>
        <div class="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
          <p class="text-[10px] font-bold uppercase tracking-wider text-purple-700">Lucro previsto</p>
          <p class="text-lg font-black text-purple-700">${formatMoeda(R.lucro)}</p>
          <p class="text-[10px] text-purple-600">${R.margem.toFixed(1)}% de margem</p>
        </div>
        <div class="p-2.5 rounded-xl ${insumosCriticos.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}">
          <p class="text-[10px] font-bold uppercase tracking-wider ${insumosCriticos.length > 0 ? 'text-amber-700' : 'text-slate-600'}">Estoque</p>
          <p class="text-lg font-black ${insumosCriticos.length > 0 ? 'text-amber-700' : 'text-emerald-700'}">${insumosCriticos.length > 0 ? `${insumosCriticos.length} falta` : 'OK'}</p>
          <p class="text-[10px] ${insumosCriticos.length > 0 ? 'text-amber-600' : 'text-slate-500'}">${R.insumos.length} insumo(s) usado(s)</p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <div class="relative flex-1 min-w-48">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]"></i>
          <input id="cardapioBusca" type="text" value="${esc(cardapioFiltro)}" oninput="aplicarFiltroCardapio(this.value)" placeholder="Filtrar produto..." class="w-full pl-7 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:border-emerald-400 focus:outline-none" />
        </div>
        <button onclick="alternarSoEscalados()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${cardapioSoEscalados ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}">
          <i class="fa-solid fa-filter"></i> Só escalados
        </button>
        <!-- Botão com atalhos: clique = preencher, caret = menu -->
        <div class="relative">
          <div class="flex items-stretch rounded-lg border border-slate-200 overflow-hidden">
            <button onclick="escalarTodos(7)" class="px-2.5 py-1.5 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5" title="Preencher 1 un de cada produto em todos os dias">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Preencher semana
            </button>
            <button onclick="toggleMenuPreencher()" class="px-1.5 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-500 border-l border-slate-200 transition-colors cursor-pointer" title="Mais atalhos de preenchimento">
              <i class="fa-solid fa-chevron-down text-[9px]"></i>
            </button>
          </div>
          <div id="menuPreencher" class="hidden absolute right-0 z-20 mt-1 w-56 bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 text-left">
            <button onclick="preencherComOpcoes(1); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-1 text-slate-400"></i> 1 un de cada produto
            </button>
            <button onclick="preencherComOpcoes(2); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-2 text-slate-400"></i> 2 un de cada produto
            </button>
            <button onclick="copiarDaSemanaAnterior(); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer border-t border-slate-100 mt-1 pt-2.5">
              <i class="fa-solid fa-copy text-slate-400"></i> Repetir a semana anterior
            </button>
            <button onclick="abrirModalDuplicarSemana(); fecharMenuPreencher();" class="w-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer">
              <i class="fa-solid fa-calendar-plus text-slate-400"></i> Duplicar para outra semana…
            </button>
          </div>
        </div>
        <button onclick="abrirModoApresentacao()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg text-white shadow-xs transition-colors cursor-pointer" style="background:linear-gradient(135deg,#D96C75,#C65D3A)" title="Abrir em tela cheia para foto / Status do WhatsApp">
          <i class="fa-solid fa-expand"></i> Apresentar
        </button>
        <button onclick="limparSemanaCardapio()" class="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer">
          Limpar
        </button>
      </div>

      ${fichas.length === 0 ? `
        <div class="mt-4 py-8 text-center border border-dashed border-slate-200 rounded-xl">
          <i class="fa-solid fa-book-bookmark text-3xl text-slate-300 mb-2"></i>
          <p class="text-xs text-slate-500 font-semibold">Cadastre suas fichas técnicas para montar a grade</p>
          <button onclick="switchTab('fichas')" class="mt-3 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer">Ir para Fichas Técnicas</button>
        </div>` : linhasGrade.length === 0 ? `
        <div class="mt-4 py-6 text-center border border-dashed border-slate-200 rounded-xl">
          <p class="text-xs text-slate-400">${cardapioSoEscalados ? 'Nenhum produto escalado nesta semana — desligue o filtro "Só escalados".' : 'Nenhum produto encontrado para o filtro "' + esc(cardapioFiltro) + '".'}</p>
        </div>` : `
      <!-- Tabela: produtos × dias -->
      <div class="mt-3 overflow-x-auto border border-slate-200 rounded-xl" id="gradeCardapio">
        <table class="w-full text-xs min-w-[760px]">
          <thead class="bg-slate-50">
            <tr class="text-slate-500 uppercase text-[9px] font-bold tracking-wider">
              <th class="py-2 px-2.5 text-left rounded-tl-lg sticky left-0 bg-slate-50 z-10 min-w-44">Produto</th>
              ${dias.map((iso, i) => {
                const ddmm = iso.split('-').reverse().slice(0, 2).join('/');
                const tema = tematicaDoDia(iso);
                const ehHoje = iso === hojeISO;
                return `<th class="py-2 px-1.5 text-center ${ehHoje ? 'bg-emerald-50 text-emerald-700' : ''}" title="${tema ? esc(tema.nome) : ''}">
                  <span class="block font-black">${nomesDia[i]}</span>
                  <span class="block font-semibold text-[9px] text-slate-400">${ddmm}</span>
                  ${tema ? '<i class="fa-solid fa-star text-purple-400 text-[8px]"></i>' : ''}
                </th>`;
              }).join('')}
              <th class="py-2 px-2.5 text-right rounded-tr-lg">Total</th>
              <th class="py-2 px-2.5 text-right">Lucro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${linhasGrade.map(f => {
              const rend = Number(f.rendimento) > 0 ? Number(f.rendimento) : 1;
              const cmvU = calcularCMVFicha(f) / rend;
              const preco = Number(f.precoPraticado) || 0;
              const p = R.porFicha[f.id] || { qtd: 0, receita: 0, custo: 0 };
              const lucroLinha = p.receita - p.custo;
              return `<tr class="hover:bg-emerald-50/30 transition-colors">
                <td class="py-1.5 px-2.5 sticky left-0 bg-white z-10">
                  <span class="font-bold text-slate-800 block truncate" title="${esc(f.nome)}">${esc(f.nome)}</span>
                  <span class="text-[10px] text-slate-400">${preco > 0 ? `${formatMoeda(preco)}/un` : 'sem preço'}${cmvU > 0 ? ` • CMV ${formatMoeda(cmvU)}` : ''}</span>
                </td>
                ${dias.map(iso => {
                  const q = qtdCardapioNoDia(iso, f.id);
                  return `<td class="py-1 px-1 text-center">
                    <input type="number" min="0" step="1" value="${q || ''}" placeholder="–"
                      data-grade="1" data-valor-original="${q || ''}"
                      onchange="definirQtdCardapio('${iso}', '${f.id}', this.value)"
                      onkeydown="tecladoGradeCardapio(event)"
                      class="w-11 h-7 text-center text-xs font-bold rounded-lg border transition-colors ${q > 0 ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-400'} focus:border-emerald-500 focus:outline-none focus:bg-white" />
                  </td>`;
                }).join('')}
                <td class="py-1.5 px-2.5 text-right font-black ${p.qtd > 0 ? 'text-slate-900' : 'text-slate-300'}">${p.qtd || '–'}</td>
                <td class="py-1.5 px-2.5 text-right font-bold ${lucroLinha >= 0 ? 'text-emerald-600' : 'text-red-600'}">${p.qtd > 0 ? formatMoeda(lucroLinha) : '–'}</td>
              </tr>`;
            }).join('')}
          </tbody>
          <tfoot>
            <tr class="bg-slate-50 border-t-2 border-slate-200 text-[10px] font-bold text-slate-600">
              <td class="py-2 px-2.5 sticky left-0 bg-slate-50 z-10">Total por dia</td>
              ${dias.map(iso => `<td class="py-2 px-1 text-center text-slate-800">${R.porDia[iso].qtd || '–'}</td>`).join('')}
              <td class="py-2 px-2.5 text-right text-slate-900">${R.qtdTotal}</td>
              <td class="py-2 px-2.5 text-right ${R.lucro >= 0 ? 'text-emerald-600' : 'text-red-600'}">${formatMoeda(R.lucro)}</td>
            </tr>
          </tfoot>
        </table>
      </div>`}

      ${insumosCriticos.length > 0 ? `
      <div class="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
        <div class="flex items-center justify-between gap-2">
          <p class="text-xs font-bold text-amber-900"><i class="fa-solid fa-triangle-exclamation"></i> ${insumosCriticos.length} insumo(s) insuficiente(s) para esta produção</p>
          <button onclick="copiarComprasCardapio()" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0">
            <i class="fa-solid fa-cart-shopping"></i> Lista de compras
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-1.5">
          ${insumosCriticos.slice(0, 8).map(i => `
            <span class="text-[10px] font-bold text-amber-900 bg-white border border-amber-200 rounded-lg px-2 py-1">
              ${esc(i.nome)}: precisa ${i.necessario.toFixed(0)}${esc(i.unidade)} • <span class="text-red-600">falta ${i.falta.toFixed(0)}${esc(i.unidade)}</span>
            </span>`).join('')}
          ${insumosCriticos.length > 8 ? `<span class="text-[10px] text-amber-700">+${insumosCriticos.length - 8}</span>` : ''}
        </div>
      </div>` : ''}

      <div class="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <button onclick="copiarCardapioWhats()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-brands fa-whatsapp"></i> Copiar p/ WhatsApp
        </button>
        <button onclick="imprimirCardapio()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-solid fa-print"></i> Imprimir
        </button>
        <button onclick="copiarComprasCardapio()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
          <i class="fa-solid fa-cart-shopping text-emerald-600"></i> Compras
        </button>
      </div>
    </div>
  `;
}

function renderPromocoes() {
  const container = document.getElementById('tab-promocoes');
  if (!container) return;

  // 1. Cálculos do Simulador
  const fichaBase = fichas.find(f => f.id === simuladorPromo.fichaId) || fichas[0];
  const cmvBaseTotal = fichaBase ? calcularCMVFicha(fichaBase) : 0;
  const rendimentoBase = (fichaBase && fichaBase.rendimento) || 1;
  const cmvBaseUnitario = cmvBaseTotal / rendimentoBase;

  // Preço de Tabela (Normal)
  const margemAlvo = ((fichaBase && fichaBase.margemAlvo) || 60) / 100;
  const precoTabelaDireto = margemAlvo < 1 ? cmvBaseTotal / (1 - margemAlvo) : cmvBaseTotal * 2.5;
  const taxaCanalNum = Number(simuladorPromo.taxaCanal) || 0;
  const precoTabelaCanal = taxaCanalNum < 100 ? precoTabelaDireto / (1 - (taxaCanalNum / 100)) : precoTabelaDireto;

  const precoNormal = (simuladorPromo.canal === 'WhatsApp' || simuladorPromo.canal === 'Balcao') 
    ? precoTabelaDireto 
    : precoTabelaCanal;

  // Preço Promocional
  let precoPromo = precoNormal;
  if (simuladorPromo.tipoDesconto === 'percentual') {
    const desc = Number(simuladorPromo.descontoPercentual) || 0;
    precoPromo = precoNormal * (1 - (desc / 100));
  } else if (simuladorPromo.tipoDesconto === 'valor_fixo' || simuladorPromo.tipoDesconto === 'combo') {
    precoPromo = Number(simuladorPromo.precoPromocionalFixo) || (precoNormal * 0.85);
  } else if (simuladorPromo.tipoDesconto === 'leve_ganhe') {
    precoPromo = precoNormal;
  }

  // Custo do Brinde (se ativo)
  let custoBrinde = 0;
  let nomeBrinde = 'Sem brinde';
  if (simuladorPromo.brindeAtivo) {
    if (simuladorPromo.brindeTipo === 'ficha' && simuladorPromo.brindeFichaId) {
      const bFicha = fichas.find(f => f.id === simuladorPromo.brindeFichaId);
      if (bFicha) {
        custoBrinde = calcularCMVFicha(bFicha) / (bFicha.rendimento || 1);
        nomeBrinde = bFicha.nome;
      }
    } else {
      custoBrinde = Number(simuladorPromo.brindeCustoCustom) || 0;
      nomeBrinde = simuladorPromo.brindeNomeCustom || 'Cortesia especial';
    }
  }

  // Custos e Comissões Unitários
  const custoInsumosUnitario = cmvBaseUnitario + custoBrinde;
  const comissaoAppUnitario = precoPromo * (taxaCanalNum / 100);
  const lucroLiquidoUnitario = precoPromo - comissaoAppUnitario - custoInsumosUnitario;
  const margemLiquidaPromo = precoPromo > 0 ? (lucroLiquidoUnitario / precoPromo) * 100 : 0;

  // Venda Normal (para comparação)
  const comissaoNormalUnitario = precoNormal * (taxaCanalNum / 100);
  const lucroNormalUnitario = precoNormal - comissaoNormalUnitario - cmvBaseUnitario;
  const margemNormal = precoNormal > 0 ? (lucroNormalUnitario / precoNormal) * 100 : 0;

  // Totais para o Volume Projetado
  const vol = Number(simuladorPromo.volumeVendasProjetado) || 1;
  const faturamentoPromoTotal = precoPromo * vol;
  const cmvPromoTotal = custoInsumosUnitario * vol;
  const comissoesPromoTotal = comissaoAppUnitario * vol;
  const lucroLiquidoTotal = lucroLiquidoUnitario * vol;

  const faturamentoNormalTotal = precoNormal * vol;
  const lucroNormalTotal = lucroNormalUnitario * vol;

  // Ponto de Equilíbrio / Breakeven em Volume
  // Quantas unidades na promoção são necessárias para empatar com o lucro normal de `vol` unidades:
  let volBreakeven = null;
  let percentVolExtra = null;
  if (lucroLiquidoUnitario > 0 && lucroNormalTotal > 0) {
    volBreakeven = Math.ceil(lucroNormalTotal / lucroLiquidoUnitario);
    percentVolExtra = Math.round(((volBreakeven / vol) - 1) * 100);
  }

  // Diagnóstico de Viabilidade
  let diagColor = 'emerald';
  let diagIcon = 'fa-circle-check';
  let diagTitulo = 'Promoção Altamente Viável & Lucrativa';
  let diagTexto = 'Margem de contribuição saudável (> 40%). Cobre os custos dos insumos e as comissões do canal com folga, garantindo lucro real.';

  if (lucroLiquidoUnitario <= 0) {
    diagColor = 'red';
    diagIcon = 'fa-triangle-exclamation';
    diagTitulo = 'Prejuízo Imediato: Promoção Inviável';
    diagTexto = 'O preço promocional não cobre o custo dos ingredientes + brinde + comissão do app. Você pagará para trabalhar!';
  } else if (margemLiquidaPromo < 22) {
    diagColor = 'amber';
    diagIcon = 'fa-circle-exclamation';
    diagTitulo = 'Atenção: Margem Muito Apertada (< 22%)';
    diagTexto = 'Risco elevado. Qualquer desperdício na cozinha ou taxa extra pode zerar o lucro. Recomendada apenas para queima de estoque perecível.';
  } else if (margemLiquidaPromo < 40) {
    diagColor = 'blue';
    diagIcon = 'fa-circle-info';
    diagTitulo = 'Viabilidade Moderada (Foco em Volume / Conquista)';
    diagTexto = 'Margem aceitável para atração de novos clientes e aumento de pedidos no delivery. Avalie a capacidade do seu forno e bancada.';
  }

  // Campanhas ativas
  const campanhasAtivas = promocoes.filter(p => p.status === 'ativa').length;
  const lucroProjetadoTodas = promocoes.reduce((acc, p) => {
    const f = fichas.find(item => item.id === p.fichaId);
    const cmv = f ? calcularCMVFicha(f) / (f.rendimento || 1) : 0;
    const taxa = (Number(p.taxaCanal) || 0) / 100;
    const pr = Number(p.precoPromocionalFixo) || 0;
    const bCusto = p.brindeAtivo ? (p.brindeTipo === 'ficha' && p.brindeFichaId ? (calcularCMVFicha(fichas.find(x => x.id === p.brindeFichaId) || {}) / 1) : (Number(p.brindeCustoCustom) || 0)) : 0;
    const lucroU = pr - (pr * taxa) - (cmv + bCusto);
    return acc + (lucroU * (Number(p.volumeVendasProjetado) || 0));
  }, 0);

  container.innerHTML = `
    <!-- Header do Módulo -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-tags"></i>
        </div>
        <div>
          <h2 class="font-bold text-slate-900 text-lg">Viabilidade de Promoções & Calendário Comercial</h2>
          <p class="text-xs text-slate-500">Simulador de margem e lucro real considerando CMV exato, comissões de apps (iFood/99Food) e brindes</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="salvarPromoDoSimulador()" class="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
          <i class="fa-solid fa-bookmark"></i> Salvar Campanha
        </button>
        <button onclick="resetarSimulador()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 transition-colors" title="Restaurar valores padrão">
          <i class="fa-solid fa-arrow-rotate-left"></i>
        </button>
      </div>
    </div>

    <!-- Indicadores Rápidos do Módulo -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-bullhorn"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Campanhas Ativas</span>
          <h4 class="text-base font-bold text-slate-900">${campanhasAtivas} em execução</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Lucro Proj. Total</span>
          <h4 class="text-base font-bold text-emerald-600">${formatMoeda(lucroProjetadoTodas)}</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Oportunidades</span>
          <h4 class="text-base font-bold text-slate-900">${OPORTUNIDADES_CALENDARIO.length} datas no ano</h4>
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
          <i class="fa-solid fa-percent"></i>
        </div>
        <div>
          <span class="text-[11px] text-slate-500 font-medium">Taxa Média Apps</span>
          <h4 class="text-base font-bold text-slate-900">${metas.taxaAppMediaPercentual ?? 0}%</h4>
        </div>
      </div>
    </div>

    <!-- SEÇÃO 1: SIMULADOR INTERATIVO DE VIABILIDADE -->
    <!-- Modelo de entrega: joga as taxas nos valores abaixo -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
      <div class="grid grid-cols-2 gap-1.5" role="group" aria-label="Modelo de entrega">
        <button
          type="button"
          onclick="setPlanoEntrega('plataforma')"
          class="text-xs font-bold py-2 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            planoEntrega === 'plataforma'
              ? 'text-white shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }"
          ${planoEntrega === 'plataforma' ? 'style="background:linear-gradient(135deg,#D96C75,#C65D3A);border-color:#C65D3A"' : ''}
        >
          <i class="fa-solid fa-motorcycle"></i> Entrega da plataforma
        </button>
        <button
          type="button"
          onclick="setPlanoEntrega('propria')"
          class="text-xs font-bold py-2 px-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            planoEntrega === 'propria'
              ? 'text-white shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }"
          ${planoEntrega === 'propria' ? 'style="background:linear-gradient(135deg,#D96C75,#C65D3A);border-color:#C65D3A"' : ''}
        >
          <i class="fa-solid fa-house"></i> Entrega própria
        </button>
      </div>
      <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">
        ${planoEntrega === 'plataforma'
          ? `Valendo: <strong>iFood ${taxaEfetivaCanal('iFood')}%</strong> (23 + 3,2) • <strong>99 ${taxaEfetivaCanal('99Food')}%</strong> (8,9 + 3,2, + logística variável no Full)`
          : `Valendo: <strong>iFood ${taxaEfetivaCanal('iFood')}%</strong> (12 + 3,2; +R$ 110/mês se faturar +R$ 1.800) • <strong>99 ${taxaEfetivaCanal('99Food')}%</strong> (10,9 + 3,2, sem mensalidade)`}
      </p>
    </div>
    <div id="secao-simulador" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Coluna Esquerda: Formulário de Configuração (5 colunas) -->
      <div class="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-calculator text-rose-500"></i> Parâmetros da Oferta
          </h3>
          <span class="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            Simulação Dinâmica
          </span>
        </div>

        <!-- 1. Produto Base -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Produto Base (Ficha Técnica)</label>
          <select 
            onchange="atualizarSimuladorCampo('fichaId', this.value)" 
            class="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-rose-500 bg-slate-50/50"
          >
            ${fichas.map(f => {
              const cmv = calcularCMVFicha(f) / (f.rendimento || 1);
              return `
                <option value="${f.id}" ${f.id === simuladorPromo.fichaId ? 'selected' : ''}>
                  ${f.nome} (CMV: ${formatMoeda(cmv)})
                </option>
              `;
            }).join('')}
          </select>
          <div class="flex justify-between items-center text-[11px] text-slate-500 mt-1">
            <span>CMV Unitário Base: <strong class="text-slate-800">${formatMoeda(cmvBaseUnitario)}</strong></span>
            <span>Preço Tabela Sugerido: <strong class="text-slate-800">${formatMoeda(precoNormal)}</strong></span>
          </div>
        </div>

        <!-- 2. Canal de Venda & Comissão -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Canal de Venda & Taxa de Comissão</label>
          <div class="grid grid-cols-3 gap-1.5 mb-2">
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('WhatsApp')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${
                simuladorPromo.canal === 'WhatsApp' 
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-2xs' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }"
            >
              <i class="fa-brands fa-whatsapp"></i> WhatsApp (0%)
            </button>
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('iFood')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${
                simuladorPromo.canal === 'iFood' 
                  ? 'bg-red-500 text-white border-red-600 shadow-2xs' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }"
            >
              <i class="fa-solid fa-motorcycle"></i> iFood (${taxaEfetivaCanal('iFood')}%)
            </button>
            <button 
              type="button" 
              onclick="selecionarCanalSimulador('99Food')"
              class="text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${
                simuladorPromo.canal === '99Food' 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-2xs' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }"
            >
              <i class="fa-solid fa-utensils"></i> 99Food (${taxaEfetivaCanal('99Food')}%)
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-500">Taxa Personalizada:</span>
            <div class="relative w-28">
              <input 
                type="number" 
                min="0" 
                max="100" 
                step="0.5"
                value="${simuladorPromo.taxaCanal}" 
                oninput="atualizarSimuladorCampo('taxaCanal', this.value)"
                class="w-full text-xs font-bold border border-slate-300 rounded-lg px-2 py-1 pr-6 text-slate-800 focus:outline-rose-500"
              />
              <span class="absolute right-2 top-1 text-xs text-slate-400 font-bold">%</span>
            </div>
            <span class="text-[11px] text-slate-400">taxa que o app desconta da venda</span>
          </div>
        </div>

        <!-- 3. Mecânica da Promoção -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Mecânica da Promoção</label>
          <div class="grid grid-cols-2 gap-2 mb-2.5">
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('percentual')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${
                simuladorPromo.tipoDesconto === 'percentual'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }"
            >
              <i class="fa-solid fa-percent text-rose-500 mr-1"></i> Desconto %
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('valor_fixo')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${
                simuladorPromo.tipoDesconto === 'valor_fixo'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }"
            >
              <i class="fa-solid fa-tag text-rose-500 mr-1"></i> Preço Fixo R$
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('leve_ganhe')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${
                simuladorPromo.tipoDesconto === 'leve_ganhe'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }"
            >
              <i class="fa-solid fa-gift text-rose-500 mr-1"></i> Compre & Ganhe
            </button>
            <button 
              type="button"
              onclick="selecionarMecanicaSimulador('combo')"
              class="text-xs font-medium p-2 rounded-xl border text-left transition-all ${
                simuladorPromo.tipoDesconto === 'combo'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold ring-1 ring-rose-300'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }"
            >
              <i class="fa-solid fa-layer-group text-rose-500 mr-1"></i> Combo Especial
            </button>
          </div>

          <!-- Campos dinâmicos do desconto -->
          ${simuladorPromo.tipoDesconto === 'percentual' ? `
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-semibold text-slate-700">Percentual de Desconto:</span>
                <span class="text-xs font-bold text-rose-600">${simuladorPromo.descontoPercentual}% OFF</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1" 
                value="${simuladorPromo.descontoPercentual}" 
                oninput="atualizarSimuladorCampo('descontoPercentual', this.value)" 
                class="w-full accent-rose-600 cursor-pointer"
              />
              <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5%</span>
                <span>15% (Recomendado)</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>
          ` : `
            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label class="block text-xs font-semibold text-slate-700 mb-1">Preço Promocional da Oferta (R$)</label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">R$</span>
                <input 
                  type="number" 
                  step="0.50" 
                  value="${simuladorPromo.precoPromocionalFixo || precoNormal.toFixed(2)}" 
                  oninput="atualizarSimuladorCampo('precoPromocionalFixo', this.value)" 
                  class="w-full text-sm font-bold border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-slate-900 focus:outline-rose-500"
                />
              </div>
              <p class="text-[11px] text-slate-500 mt-1">Preço normal de tabela: <strong>${formatMoeda(precoNormal)}</strong></p>
            </div>
          `}
        </div>

        <!-- 4. Inclusão de Brinde / Cortesia -->
        <div class="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input 
                type="checkbox" 
                ${simuladorPromo.brindeAtivo ? 'checked' : ''} 
                onchange="atualizarSimuladorCampo('brindeAtivo', this.checked)"
                class="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <i class="fa-solid fa-gift text-rose-500"></i> Oferecer Brinde / Cortesia ao Cliente
            </label>
            ${simuladorPromo.brindeAtivo ? `
              <span class="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                +${formatMoeda(custoBrinde)} CMV
              </span>
            ` : ''}
          </div>

          ${simuladorPromo.brindeAtivo ? `
            <div class="pt-2 border-t border-slate-200/80 space-y-2">
              <div class="flex gap-2">
                <button 
                  type="button" 
                  onclick="atualizarSimuladorCampo('brindeTipo', 'ficha')" 
                  class="text-xs font-semibold py-1 px-2.5 rounded-lg border transition-colors ${
                    simuladorPromo.brindeTipo === 'ficha' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-200'
                  }"
                >
                  Item das Fichas Técnicas
                </button>
                <button 
                  type="button" 
                  onclick="atualizarSimuladorCampo('brindeTipo', 'custom')" 
                  class="text-xs font-semibold py-1 px-2.5 rounded-lg border transition-colors ${
                    simuladorPromo.brindeTipo === 'custom' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-200'
                  }"
                >
                  Brinde Avulso / Embalagem
                </button>
              </div>

              ${simuladorPromo.brindeTipo === 'ficha' ? `
                <select 
                  onchange="atualizarSimuladorCampo('brindeFichaId', this.value)" 
                  class="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                >
                  ${fichas.map(f => {
                    const c = calcularCMVFicha(f) / (f.rendimento || 1);
                    return `
                      <option value="${f.id}" ${f.id === simuladorPromo.brindeFichaId ? 'selected' : ''}>
                        ${f.nome} (Custo: ${formatMoeda(c)})
                      </option>
                    `;
                  }).join('')}
                </select>
              ` : `
                <div class="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Nome do brinde (ex: Tag + Fita)" 
                    value="${simuladorPromo.brindeNomeCustom || ''}" 
                    oninput="atualizarSimuladorCampo('brindeNomeCustom', this.value)" 
                    class="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                  />
                  <input 
                    type="number" 
                    step="0.10" 
                    placeholder="Custo R$" 
                    value="${simuladorPromo.brindeCustoCustom || 0}" 
                    oninput="atualizarSimuladorCampo('brindeCustoCustom', this.value)" 
                    class="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-rose-500 bg-white"
                  />
                </div>
              `}
            </div>
          ` : ''}
        </div>

        <!-- 5. Volume de Vendas Estimado -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-xs font-semibold text-slate-700">Volume de Vendas Estimado</label>
            <span class="text-xs font-bold text-slate-900">${simuladorPromo.volumeVendasProjetado} unidades</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="150" 
            step="5" 
            value="${simuladorPromo.volumeVendasProjetado}" 
            oninput="atualizarSimuladorCampo('volumeVendasProjetado', this.value)" 
            class="w-full accent-slate-800 cursor-pointer"
          />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>5 un</span>
            <span>30 un</span>
            <span>75 un</span>
            <span>150 un</span>
          </div>
        </div>
      </div>

      <!-- Coluna Direita: Diagnóstico Financeiro & Margem Real (7 colunas) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Semáforo / Card de Diagnóstico Principal -->
        <div class="p-5 rounded-2xl border ${
          diagColor === 'emerald' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950' :
          diagColor === 'blue' ? 'bg-blue-50/90 border-blue-200 text-blue-950' :
          diagColor === 'amber' ? 'bg-amber-50/90 border-amber-200 text-amber-950' :
          'bg-red-50/90 border-red-200 text-red-950'
        } shadow-xs">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
              diagColor === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
              diagColor === 'blue' ? 'bg-blue-100 text-blue-700' :
              diagColor === 'amber' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }">
              <i class="fa-solid ${diagIcon}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <h3 class="font-bold text-base leading-tight">${diagTitulo}</h3>
                <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  diagColor === 'emerald' ? 'bg-emerald-200/70 text-emerald-900' :
                  diagColor === 'blue' ? 'bg-blue-200/70 text-blue-900' :
                  diagColor === 'amber' ? 'bg-amber-200/70 text-amber-900' :
                  'bg-red-200/70 text-red-900'
                }">
                  Margem: ${margemLiquidaPromo.toFixed(1)}%
                </span>
              </div>
              <p class="text-xs mt-1.5 opacity-90 leading-relaxed">${diagTexto}</p>
            </div>
          </div>
        </div>

        <!-- Grade de Métricas Chave do Impacto Financeiro -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Preço Promocional</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <h4 class="text-base font-bold text-slate-900">${formatMoeda(precoPromo)}</h4>
              ${precoPromo < precoNormal ? `
                <span class="text-[10px] line-through text-slate-400">${formatMoeda(precoNormal)}</span>
              ` : ''}
            </div>
            <span class="text-[10px] text-slate-500">por unidade na oferta</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Faturamento Projetado</span>
            <h4 class="text-base font-bold text-slate-900 mt-0.5">${formatMoeda(faturamentoPromoTotal)}</h4>
            <span class="text-[10px] text-slate-500">para ${vol} unidades</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Custo Total de Insumos</span>
            <h4 class="text-base font-bold text-slate-900 mt-0.5">${formatMoeda(cmvPromoTotal)}</h4>
            <span class="text-[10px] text-slate-500">${formatMoeda(custoInsumosUnitario)} /unidade</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-[11px] text-slate-500 font-medium block">Comissões do Canal</span>
            <h4 class="text-base font-bold ${taxaCanalNum > 0 ? 'text-amber-700' : 'text-slate-600'} mt-0.5">
              ${formatMoeda(comissoesPromoTotal)}
            </h4>
            <span class="text-[10px] text-slate-500">${simuladorPromo.canal} (${taxaCanalNum}%)</span>
          </div>

          <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs col-span-1 sm:col-span-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-slate-500 font-medium">Lucro Líquido Real Total</span>
              <span class="text-xs font-bold ${lucroLiquidoTotal > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'} px-2 py-0.5 rounded">
                ${formatMoeda(lucroLiquidoUnitario)} /un
              </span>
            </div>
            <h4 class="text-lg font-bold ${lucroLiquidoTotal > 0 ? 'text-emerald-600' : 'text-red-600'} mt-0.5">
              ${formatMoeda(lucroLiquidoTotal)}
            </h4>
            <span class="text-[10px] text-slate-500">dinheiro limpo no caixa após insumos, brindes e apps</span>
          </div>
        </div>

        <!-- Análise Comparativa & Breakeven de Volume -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 class="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <i class="fa-solid fa-scale-balanced text-indigo-500"></i> Comparativo: Venda Normal vs. Oferta Promocional
          </h4>

          <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div class="space-y-1">
              <span class="font-bold text-slate-500 text-[11px]">Cenário Preço Cheio</span>
              <p class="text-slate-700">Preço: <strong>${formatMoeda(precoNormal)}</strong></p>
              <p class="text-slate-700">Lucro por un.: <strong>${formatMoeda(lucroNormalUnitario)}</strong> (${margemNormal.toFixed(1)}%)</p>
              <p class="text-slate-700">Lucro em ${vol} un.: <strong class="text-slate-900">${formatMoeda(lucroNormalTotal)}</strong></p>
            </div>
            <div class="space-y-1 border-l border-slate-200 pl-3">
              <span class="font-bold text-rose-600 text-[11px]">Cenário da Promoção</span>
              <p class="text-slate-700">Preço: <strong>${formatMoeda(precoPromo)}</strong></p>
              <p class="text-slate-700">Lucro por un.: <strong class="${lucroLiquidoUnitario > 0 ? 'text-emerald-600' : 'text-red-600'}">${formatMoeda(lucroLiquidoUnitario)}</strong> (${margemLiquidaPromo.toFixed(1)}%)</p>
              <p class="text-slate-700">Lucro em ${vol} un.: <strong class="${lucroLiquidoTotal > 0 ? 'text-emerald-600' : 'text-red-600'}">${formatMoeda(lucroLiquidoTotal)}</strong></p>
            </div>
          </div>

          <!-- Ponto de Equilíbrio (Breakeven) -->
          <div class="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <div class="font-bold flex items-center gap-1.5 text-amber-900">
              <i class="fa-solid fa-bullseye text-amber-600"></i> Ponto de Equilíbrio de Volume (Breakeven):
            </div>
            ${volBreakeven && volBreakeven !== Infinity ? `
              <p class="leading-relaxed">
                Para ter o mesmo lucro total de <strong>${formatMoeda(lucroNormalTotal)}</strong> (que você teria vendendo ${vol} unidades a preço normal), 
                você precisará produzir e vender <strong class="text-slate-900 underline">${volBreakeven} unidades</strong> na promoção 
                ${percentVolExtra > 0 ? `(<strong class="text-amber-800">+${percentVolExtra}% de volume</strong>)` : ''}.
              </p>
            ` : `
              <p class="text-red-700 font-semibold">
                Como o lucro por unidade na promoção é negativo ou nulo, vender mais unidades só aumentará o seu prejuízo financeiro!
              </p>
            `}
          </div>

          <!-- Dicas Rápidas Confeiteira -->
          <div class="flex items-center justify-between pt-1 text-[11px] text-slate-500">
            <span class="flex items-center gap-1"><i class="fa-solid fa-lightbulb text-amber-500"></i> Dica: Brindes artesanais de baixo CMV geram maior percepção de valor que desconto direto!</span>
            <button onclick="copiarSimulacaoWhatsApp()" class="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              <i class="fa-brands fa-whatsapp"></i> Copiar Oferta
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SEÇÃO 2: CALENDÁRIO COMERCIAL DA CONFEITARIA -->
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
            <i class="fa-solid fa-calendar-days text-pink-500"></i> Calendário de Oportunidades & Campanhas Sazonais
          </h3>
          <p class="text-xs text-slate-500">Datas comemorativas do ano confeiteiro e ideias práticas de kits, combos e brindes de alto giro</p>
        </div>
        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
          9 Oportunidades Mapeadas
        </span>
      </div>

      <!-- Grade de Datas Comemorativas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${OPORTUNIDADES_CALENDARIO.map(op => {
          const ficha = fichas.find(f => f.id === op.fichaRecomendadaId);
          return `
            <div class="bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-4 border border-slate-200 transition-all flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs border border-slate-200">
                    ${op.periodo}
                  </span>
                  <div class="w-7 h-7 rounded-lg ${(MAPA_CORES_CALENDARIO[op.cor] || MAPA_CORES_CALENDARIO.slate)} flex items-center justify-center text-xs">
                    <i class="fa-solid ${op.icone}"></i>
                  </div>
                </div>

                <div>
                  <h4 class="font-bold text-slate-900 text-sm">${op.nome}</h4>
                  <p class="text-xs text-slate-600 font-medium mt-0.5">${op.sugestao}</p>
                </div>

                <p class="text-[11px] text-slate-500 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                  ${op.estrategia}
                </p>
              </div>

              <div class="pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                <span class="text-[11px] text-slate-600">
                  Sugerido: <strong>${formatMoeda(op.precoSugestao)}</strong>
                </span>
                <button 
                  onclick="carregarOportunidadeNoSimulador('${op.id}')"
                  class="text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-sliders"></i> Testar no Simulador
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- SEÇÃO 3: CAMPANHAS PROMOCIONAIS SALVAS -->
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
            <i class="fa-solid fa-bullhorn"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Campanhas Promocionais Salvas</h3>
            <p class="text-xs text-slate-500">Histórico de ações planejadas, ativas e textos prontos para WhatsApp</p>
          </div>
        </div>
        <button onclick="salvarPromoDoSimulador()" class="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1">
          <i class="fa-solid fa-plus"></i> Salvar Simulação Atual
        </button>
      </div>

      ${promocoes.length === 0 ? `
        <div class="py-12 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl">
          Nenhuma promoção salva ainda. Configure uma no simulador acima e clique em "Salvar Campanha".
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${promocoes.map(p => {
            const f = fichas.find(item => item.id === p.fichaId);
            const cmvUnit = f ? (calcularCMVFicha(f) / (f.rendimento || 1)) : 0;
            const taxa = (Number(p.taxaCanal) || 0) / 100;
            const pr = Number(p.precoPromocionalFixo) || 0;
            const bCusto = p.brindeAtivo ? (p.brindeTipo === 'ficha' && p.brindeFichaId ? (calcularCMVFicha(fichas.find(x => x.id === p.brindeFichaId) || {}) / 1) : (Number(p.brindeCustoCustom) || 0)) : 0;
            const lucroU = pr - (pr * taxa) - (cmvUnit + bCusto);
            const margemU = pr > 0 ? (lucroU / pr) * 100 : 0;
            const volP = Number(p.volumeVendasProjetado) || 0;
            const lucroTotalCamp = lucroU * volP;

            return `
              <div class="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'ativa' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'planejada' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-200 text-slate-700'
                    }">
                      ${p.status === 'ativa' ? '● Em Execução' : p.status === 'planejada' ? 'Agendada' : 'Concluída'}
                    </span>
                    <h4 class="font-bold text-slate-900 text-sm mt-1">${p.nome}</h4>
                    <p class="text-xs text-slate-500">${f ? f.nome : 'Produto'} • ${p.canal} (${p.taxaCanal}% taxa)</p>
                  </div>
                  <div class="flex items-center gap-1">
                    <button onclick="excluirPromocao('${p.id}')" title="Excluir Campanha" class="text-slate-400 hover:text-red-600 p-1">
                      <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Preço</span>
                    <strong class="text-xs text-slate-800">${formatMoeda(pr)}</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Margem</span>
                    <strong class="text-xs ${margemU >= 35 ? 'text-emerald-600' : 'text-amber-600'}">${margemU.toFixed(1)}%</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-medium block">Lucro Proj.</span>
                    <strong class="text-xs text-emerald-600">${formatMoeda(lucroTotalCamp)}</strong>
                  </div>
                </div>

                ${p.observacoes ? `
                  <p class="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                    <i class="fa-solid fa-circle-info text-slate-400 mr-1"></i> ${p.observacoes}
                  </p>
                ` : ''}

                <div class="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] text-slate-400">Status:</span>
                    <select 
                      onchange="alternarStatusPromocao('${p.id}', this.value)" 
                      class="text-[11px] font-semibold bg-white border border-slate-200 rounded-md px-1.5 py-0.5 text-slate-700"
                    >
                      <option value="ativa" ${p.status === 'ativa' ? 'selected' : ''}>Ativa</option>
                      <option value="planejada" ${p.status === 'planejada' ? 'selected' : ''}>Planejada</option>
                      <option value="concluida" ${p.status === 'concluida' ? 'selected' : ''}>Concluída</option>
                    </select>
                  </div>

                  <button 
                    onclick="copiarTextoDivulgacao('${p.id}')" 
                    class="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 p-1 hover:bg-emerald-50 rounded"
                  >
                    <i class="fa-brands fa-whatsapp"></i> Copiar Divulgação
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

// Manipuladores de Eventos do Simulador
function atualizarSimuladorCampo(campo, valor) {
  simuladorPromo[campo] = valor;
  renderPromocoes();
}

function selecionarCanalSimulador(canal) {
  simuladorPromo.canal = canal;
  simuladorPromo.taxaCanal = taxaEfetivaCanal(canal);
  renderPromocoes();
}

function selecionarMecanicaSimulador(tipo) {
  simuladorPromo.tipoDesconto = tipo;
  renderPromocoes();
}

function resetarSimulador() {
  simuladorPromo = {
    fichaId: fichas[0]?.id || 'fic-2',
    canal: 'WhatsApp',
    taxaCanal: 0,
    tipoDesconto: 'percentual',
    descontoPercentual: 15,
    precoPromocionalFixo: 80.00,
    brindeAtivo: false,
    brindeTipo: 'ficha',
    brindeFichaId: fichas[1]?.id || 'fic-3',
    brindeNomeCustom: '',
    brindeCustoCustom: 0,
    volumeVendasProjetado: 30
  };
  showToast('Simulador restaurado.');
  renderPromocoes();
}

function carregarOportunidadeNoSimulador(opId) {
  const op = OPORTUNIDADES_CALENDARIO.find(o => o.id === opId);
  if (!op) return;

  simuladorPromo.fichaId = op.fichaRecomendadaId;
  simuladorPromo.canal = op.canalRecomendado;
  simuladorPromo.taxaCanal = op.taxaRecomendada;
  simuladorPromo.tipoDesconto = op.tipoMecanica;
  simuladorPromo.descontoPercentual = op.descontoSugestao;
  simuladorPromo.precoPromocionalFixo = op.precoSugestao;
  simuladorPromo.brindeAtivo = op.brindeAtivo;
  simuladorPromo.brindeTipo = 'ficha';
  simuladorPromo.brindeFichaId = op.brindeFichaId || '';
  simuladorPromo.volumeVendasProjetado = op.volumeSugerido;

  showToast(`Oportunidade "${op.nome}" carregada no simulador!`);
  renderPromocoes();

  // Rolar suavemente para o simulador
  const el = document.getElementById('secao-simulador');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function salvarPromoDoSimulador() {
  const ficha = fichas.find(f => f.id === simuladorPromo.fichaId) || fichas[0];
  const nomeProduto = ficha ? ficha.nome : 'Produto';

  let descricaoMecanica = '';
  if (simuladorPromo.tipoDesconto === 'percentual') {
    descricaoMecanica = `${simuladorPromo.descontoPercentual}% OFF no ${simuladorPromo.canal}`;
  } else if (simuladorPromo.tipoDesconto === 'leve_ganhe') {
    descricaoMecanica = `Compre ${nomeProduto} e ganhe brinde`;
  } else if (simuladorPromo.tipoDesconto === 'combo') {
    descricaoMecanica = `Combo Especial por ${formatMoeda(simuladorPromo.precoPromocionalFixo)}`;
  } else {
    descricaoMecanica = `Preço Especial ${formatMoeda(simuladorPromo.precoPromocionalFixo)}`;
  }

  const novaCampanha = {
    id: 'promo-' + Date.now(),
    nome: `${nomeProduto} (${simuladorPromo.canal})`,
    dataCampanha: new Date().toISOString().split('T')[0],
    fichaId: simuladorPromo.fichaId,
    canal: simuladorPromo.canal,
    taxaCanal: simuladorPromo.taxaCanal,
    tipoDesconto: simuladorPromo.tipoDesconto,
    descontoPercentual: simuladorPromo.descontoPercentual,
    precoPromocionalFixo: simuladorPromo.precoPromocionalFixo,
    brindeAtivo: simuladorPromo.brindeAtivo,
    brindeTipo: simuladorPromo.brindeTipo,
    brindeFichaId: simuladorPromo.brindeFichaId,
    brindeNomeCustom: simuladorPromo.brindeNomeCustom,
    brindeCustoCustom: simuladorPromo.brindeCustoCustom,
    volumeVendasProjetado: simuladorPromo.volumeVendasProjetado,
    status: 'ativa',
    observacoes: descricaoMecanica
  };

  promocoes.unshift(novaCampanha);
  saveData(STORAGE_KEYS.PROMOCOES);
  showToast('Campanha salva com sucesso no histórico!');
  renderPromocoes();
}

function excluirPromocao(id) {
  if (!confirm('Deseja realmente remover esta campanha promocional?')) return;
  promocoes = promocoes.filter(p => p.id !== id);
  if (bancoAtivo) excluirDoBanco('promocoes', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.PROMOCOES);
  showToast('Campanha removida.');
  renderPromocoes();
}

function alternarStatusPromocao(id, novoStatus) {
  const p = promocoes.find(item => item.id === id);
  if (!p) return;
  p.status = novoStatus;
  saveData(STORAGE_KEYS.PROMOCOES);
  showToast(`Campanha atualizada para "${novoStatus}"!`);
  renderPromocoes();
}

function copiarTextoDivulgacao(promoId) {
  const p = promocoes.find(item => item.id === promoId);
  if (!p) return;

  const f = fichas.find(item => item.id === p.fichaId);
  const nomeItem = f ? f.nome : 'Doce Especial';
  const preco = formatMoeda(p.precoPromocionalFixo);

  let texto = `🎂 *OFERTA ESPECIAL DE CONFEITARIA* 🎂\n\n`;
  texto += `Preparamos uma condição imperdível para você:\n\n`;
  texto += `✨ *${p.nome}*\n`;
  texto += `📦 *Produto:* ${nomeItem}\n`;
  texto += `💰 *Valor Promocional:* ${preco}\n`;

  if (p.brindeAtivo) {
    let brindeNome = 'Cortesia Exclusiva';
    if (p.brindeTipo === 'ficha' && p.brindeFichaId) {
      const bf = fichas.find(x => x.id === p.brindeFichaId);
      if (bf) brindeNome = bf.nome;
    } else if (p.brindeNomeCustom) {
      brindeNome = p.brindeNomeCustom;
    }
    texto += `🎁 *Presente Especial:* Ganhe ${brindeNome}!\n`;
  }

  if (p.canal === 'WhatsApp') {
    texto += `\n📲 *Peça agora pelo WhatsApp:* Garanta o seu antes que acabe a fornada!\n`;
    texto += `🛵 Entregamos fresquinho na sua casa!`;
  } else {
    texto += `\n📲 *Disponível no ${p.canal} por tempo limitado!*\n`;
  }

  navigator.clipboard.writeText(texto).then(() => {
    showToast('Texto promocional copiado para o WhatsApp!');
  }).catch(() => {
    showToast('Erro ao copiar texto.', false);
  });
}

function copiarSimulacaoWhatsApp() {
  const ficha = fichas.find(f => f.id === simuladorPromo.fichaId) || fichas[0];
  const nomeProduto = ficha ? ficha.nome : 'Doce Artesanal';
  
  let texto = `🎂 *CONDIÇÃO ESPECIAL: ${nomeProduto.toUpperCase()}*\n\n`;
  texto += `Aproveite nossa promoção válida por tempo limitado:\n`;
  texto += `👉 *${nomeProduto}*\n`;

  if (simuladorPromo.brindeAtivo) {
    let bNome = 'Brinde Especial';
    if (simuladorPromo.brindeTipo === 'ficha' && simuladorPromo.brindeFichaId) {
      const bf = fichas.find(x => x.id === simuladorPromo.brindeFichaId);
      if (bf) bNome = bf.nome;
    } else if (simuladorPromo.brindeNomeCustom) {
      bNome = simuladorPromo.brindeNomeCustom;
    }
    texto += `🎁 *Brinde Exclusivo:* ${bNome}\n`;
  }

  texto += `\n📲 Entre em contato para reservar a sua unidade!`;

  navigator.clipboard.writeText(texto).then(() => {
    showToast('Mensagem de oferta copiada!');
  }).catch(() => {
    showToast('Erro ao copiar texto.', false);
  });
}

// ==========================================
// ATALHOS DE TECLADO (uso intenso no PC)
// 1..8 troca de aba • N novo pedido • / busca • ? ajuda • Esc fecha
// ==========================================
const ORDEM_ABAS = ['dashboard', 'estoque', 'fichas', 'pedidos', 'clientes', 'mrp', 'caixa', 'promocoes', 'dre', 'relatorios', 'cardapio'];
function abrirConfiguracoes() {
  abrirModal(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2"><i class="fa-solid fa-gear text-slate-500"></i> Configurações</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-4 space-y-5 text-sm">
      <div>
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">👤 Conta</p>
        <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs">
          <span class="text-slate-600 truncate">${emailLogado || 'Sessão local'}</span>
          ${bancoAtivo ? `<button onclick="fazerLogout()" class="font-bold text-red-600 hover:text-red-800 cursor-pointer shrink-0">Sair</button>` : ''}
        </div>
      </div>
      <div>
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">⌨️ Atalhos de teclado</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          ${[
            ['1 … 9, 0', 'Trocar de aba (as 10 primeiras; Cardápio pelo menu ou Ctrl+K)'],
            ['← → ↑ ↓', 'Navegar entre as células da grade de produção (Cardápio)'],
            ['Enter', 'Confirmar a quantidade e pular para a próxima célula'],
            ['Esc', 'Cancelar a edição da célula'],
        ['Ctrl+K', 'Busca rápida de ações e cadastros'],
            ['N', 'Criar novo pedido'],
            ['/', 'Focar a busca (Estoque / Clientes)'],
            ['?', 'Abrir configurações'],
            ['Esc', 'Fechar janela'],
          ].map(([t, d]) => `<div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"><span class="text-slate-600">${d}</span><kbd class="px-2 py-0.5 rounded bg-slate-900 text-white font-bold shrink-0">${t}</kbd></div>`).join('')}
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Os atalhos não disparam enquanto você digita em campos.</p>
      </div>
      <div class="pt-3 border-t border-slate-200">
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">📖 Documentação rápida</p>
        <ul class="text-xs text-slate-600 space-y-1.5">
          <li><strong>Pedidos:</strong> agenda de produção no topo, Kanban abaixo; use Baixa para debitar insumos e Lançar para registrar no caixa.</li>
          <li><strong>Fichas:</strong> CMV calculado do estoque; ajuste margem alvo e preço praticado para ver a margem real.</li>
          <li><strong>Caixa:</strong> DRE do mês no topo, por competência da entrega.</li>
          <li><strong>Clientes:</strong> sincronizados dos pedidos; use + Pedido para vender de novo.</li>
          <li><strong>URLs:</strong> cada página tem endereço próprio (#/login, #/dashboard, #/estoque, #/fichas, #/pedidos, #/clientes, #/mrp, #/caixa, #/promocoes).</li>
        </ul>
      </div>
      <div class="pt-3 border-t border-slate-200">
        <p class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">💾 Banco de dados</p>
        <div class="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs">
          <span class="text-slate-600">
            Fonte: <strong class="${bancoAtivo ? 'text-emerald-700' : 'text-amber-700'}">${bancoAtivo ? 'Supabase' : 'Local (offline)'}</strong>
            <span class="text-slate-400">• ${insumos.length} insumos • ${pedidos.length} pedidos</span>
          </span>
        </div>
        ${bancoAtivo ? `
          <button onclick="sincronizarLocalComBanco()" class="mt-2 w-full px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer" title="Manda o que está salvo neste navegador para o Supabase">
            <i class="fa-solid fa-cloud-arrow-up"></i> Enviar dados locais para o banco
          </button>
        ` : ''}
        <div class="mt-2 grid grid-cols-2 gap-2">
          <button onclick="exportarBackupLocal()" class="px-3 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer" title="Baixa um arquivo com tudo deste navegador">
            <i class="fa-solid fa-download"></i> Exportar backup
          </button>
          <label class="px-3 py-2 text-xs font-bold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer text-center" title="Restaura de um arquivo de backup">
            <i class="fa-solid fa-upload"></i> Importar backup
            <input type="file" accept=".json,application/json" class="hidden" onchange="importarBackupLocal(this)" />
          </label>
        </div>
      </div>
      <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
        <span>Gestão de Confeitaria • v1.3</span>
        <button onclick="exportarCSV('pedidos')" class="font-bold text-slate-600 hover:text-slate-900 cursor-pointer">Exportar CSV</button>
      </div>
    </div>
  `);
}
function mostrarAtalhos() {
  abrirConfiguracoes();
}

// BACKUP/RESTORE em arquivo: leva seus dados entre navegadores, aparelhos
// e domínios (ex: do site antigo para o novo). Nada é apagado ao exportar.
function exportarBackupLocal() {
  const dados = { _app: 'gestao-confeitaria', _exportadoEm: new Date().toISOString() };
  [...Object.values(STORAGE_KEYS), 'confeitaria_cardapios'].forEach(k => {
    dados[k] = localStorage.getItem(k);
  });
  baixarArquivo(`backup-confeitaria-${diaISO(0)}.json`, JSON.stringify(dados), 'application/json');
  showToast('Backup baixado! Guarde esse arquivo.');
}

function importarBackupLocal(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const dados = JSON.parse(reader.result);
      if (!dados || dados._app !== 'gestao-confeitaria') { showToast('Arquivo inválido.', false); return; }
      let n = 0;
      [...Object.values(STORAGE_KEYS), 'confeitaria_cardapios'].forEach(k => {
        if (typeof dados[k] === 'string' && dados[k] !== null) { localStorage.setItem(k, dados[k]); n++; }
      });
      if (n === 0) { showToast('O arquivo não tem dados válidos.', false); return; }
      showToast(`Backup importado (${n} coleções). Recarregando…`);
      setTimeout(() => window.location.reload(), 800);
    } catch (e) { showToast('Não consegui ler esse arquivo.', false); }
  };
  reader.onerror = () => showToast('Falha ao ler o arquivo.', false);
  reader.readAsText(file);
  input.value = '';
}

// Envia tudo que está no cache local para o Supabase (use depois de ativar o banco)
async function sincronizarLocalComBanco() {
  if (!bancoAtivo) { showToast('Supabase não configurado neste deploy.', false); return; }
  const total = insumos.length + fichas.length + pedidos.length + lancamentos.length + promocoes.length + clientes.length;
  if (total === 0) { showToast('Não há dados locais para enviar.', false); return; }
  if (!confirm(`Enviar ${total} registro(s) deste navegador para o Supabase?\n\nOs dados do banco com o mesmo id serão atualizados.`)) return;
  setStatusSalvo('salvando');
  try {
    for (const key of Object.values(STORAGE_KEYS)) {
      await persistirColecao(key, coletarEstado());
    }
    salvarCardapios();
    setStatusSalvo('ok', 'Enviado ao banco ✓');
    showToast('Dados enviados para o Supabase!');
  } catch (err) {
    console.error('Falha ao sincronizar com o Supabase:', err);
    setStatusSalvo('erro', 'Falha ao enviar');
    showToast('Não consegui enviar: ' + (err && err.message ? err.message : 'erro desconhecido'), false);
  }
}

// Apaga o cache local (LocalStorage) e recarrega do Supabase.
// Útil quando a tela mostra valores antigos já removidos do banco.
function limparCacheLocal() {
  if (!confirm('Apagar os dados salvos neste navegador e recarregar do Supabase?')) return;
  Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  localStorage.removeItem('confeitaria_cardapios');
  window.location.reload();
}
// ==========================================
// PALETA DE COMANDO (Ctrl+K): busca rápida de ações e cadastros
// ==========================================
let _paletteItems = [];

function abrirPalette() {
  abrirModal(`
    <div class="flex items-center gap-2.5 pb-3 border-b border-slate-200">
      <i class="fa-solid fa-magnifying-glass text-slate-400"></i>
      <input id="paletteInput" oninput="filtrarPalette(this.value)" onkeydown="if(event.key==='Enter'){executarPalette(0);}" placeholder="Ação, cliente, produto, insumo… (Enter abre o 1º)" autocomplete="off" class="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400 bg-transparent" />
      <kbd class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">ESC</kbd>
    </div>
    <div id="paletteResults" class="mt-2 max-h-80 overflow-y-auto"></div>
  `);
  filtrarPalette('');
  setTimeout(() => document.getElementById('paletteInput')?.focus(), 60);
}

function itensPalette(q) {
  const t = String(q || '').trim().toLowerCase();
  const ir = (tab, titulo, desc, icone) => ({ icone, titulo, desc, fn: () => switchTab(tab) });
  const acoes = [
    { icone: 'fa-plus', titulo: 'Novo pedido', desc: 'Criar pedido', fn: () => { switchTab('pedidos'); setTimeout(abrirModalPedido, 80); } },
    { icone: 'fa-boxes-stacked', titulo: 'Novo insumo', desc: 'Cadastrar no estoque', fn: () => { switchTab('estoque'); setTimeout(abrirModalInsumo, 80); } },
    { icone: 'fa-cash-register', titulo: 'Novo lançamento', desc: 'Lançar no caixa', fn: () => { switchTab('caixa'); setTimeout(abrirModalLancamento, 80); } },
    ir('dashboard', 'Ir para Visão Geral', 'Metas e resumo', 'fa-chart-pie'),
    ir('estoque', 'Ir para Estoque', `${insumos.length} insumos`, 'fa-boxes-stacked'),
    ir('fichas', 'Ir para Fichas', `${fichas.length} receitas`, 'fa-book-bookmark'),
    ir('pedidos', 'Ir para Pedidos', 'Kanban + agenda', 'fa-clipboard-list'),
    ir('clientes', 'Ir para Clientes', `${clientes.length} cadastrados`, 'fa-users'),
    ir('mrp', 'Ir para Compras (MRP)', 'Previsão', 'fa-cart-shopping'),
    ir('caixa', 'Ir para Livro Caixa', 'Financeiro • lançamentos', 'fa-cash-register'),
    ir('dre', 'Ir para DRE do Mês', 'Financeiro • resultado', 'fa-scale-balanced'),
    ir('relatorios', 'Ir para Relatórios', 'Financeiro • metas e canais', 'fa-chart-line'),
    ir('cardapio', 'Ir para Cardápio', 'Datas temáticas + semana', 'fa-calendar-days'),
    ir('promocoes', 'Ir para Promoções', 'Simulador', 'fa-tags')
  ];
  if (!t) return acoes;
  const casa = (s) => String(s || '').toLowerCase().includes(t);
  const din = [];
  clientes.filter(c => casa(c.nome)).slice(0, 4).forEach(c => din.push({
    icone: 'fa-user', titulo: c.nome, desc: `Cliente • ${c.telefone || 'sem fone'}`,
    fn: () => { window._buscaCliente = c.nome; PAGINACAO.clientes.pagina = 1; switchTab('clientes'); }
  }));
  fichas.filter(f => casa(f.nome)).slice(0, 4).forEach(f => din.push({
    icone: 'fa-book-bookmark', titulo: f.nome, desc: 'Ficha técnica',
    fn: () => switchTab('fichas')
  }));
  insumos.filter(i => casa(i.nome)).slice(0, 4).forEach(i => din.push({
    icone: 'fa-box', titulo: i.nome, desc: `Insumo • ${i.quantidade}${i.unidade}`,
    fn: () => { estoqueBusca = i.nome; PAGINACAO.estoque.pagina = 1; switchTab('estoque'); }
  }));
  return [...din, ...acoes.filter(a => casa(a.titulo) || casa(a.desc))];
}

function filtrarPalette(q) {
  _paletteItems = itensPalette(q);
  const box = document.getElementById('paletteResults');
  if (!box) return;
  box.innerHTML = _paletteItems.length === 0
    ? `<p class="text-xs text-slate-400 text-center py-6">Nada encontrado.</p>`
    : _paletteItems.map((it, i) => `
      <button onclick="executarPalette(${i})" class="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-left transition-colors cursor-pointer">
        <span class="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${it.icone}"></i></span>
        <span class="min-w-0"><span class="block text-sm font-bold text-slate-800 truncate">${esc(it.titulo)}</span>
        <span class="block text-[11px] text-slate-400 truncate">${esc(it.desc)}</span></span>
      </button>`).join('');
}

function executarPalette(i) {
  const it = _paletteItems[i];
  if (!it) return;
  fecharModal();
  setTimeout(() => it.fn(), 30);
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && String(e.key || '').toLowerCase() === 'k') {
    e.preventDefault();
    abrirPalette();
    return;
  }
  const tag = (e.target?.tagName || '').toLowerCase();
  const digitando = ['input', 'textarea', 'select'].includes(tag) || e.target?.isContentEditable;
  if (e.key === 'Escape') {
    if (document.getElementById('modoApresentacao')) { fecharModoApresentacao(); return; }
    const menu = document.getElementById('menuPreencher');
    if (menu && !menu.classList.contains('hidden')) { menu.classList.add('hidden'); return; }
    fecharModal();
    return;
  }
  if (digitando) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if ((e.key >= '1' && e.key <= '9') || e.key === '0') {
    const idx = e.key === '0' ? 9 : Number(e.key) - 1;
    const aba = ORDEM_ABAS[idx];
    if (aba) switchTab(aba);
  } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
    mostrarAtalhos();
  } else if (e.key === 'n' || e.key === 'N') {
    if (currentTab !== 'pedidos') switchTab('pedidos');
    setTimeout(abrirModalPedido, 60);
  } else if (e.key === '/') {
    e.preventDefault();
    const alvo = document.querySelector('#tab-estoque input[type="text"], #tab-clientes input[type="text"], #tab-clientes input:not([type])');
    if (alvo) alvo.focus();
  }
});

// ==========================================
// MÓDULO CLIENTES (histórico por pedido) + IMPRESSÃO
// ==========================================
function chaveCliente(nome, telefone) {
  return ((telefone || '').replace(/\D/g, '') + '|' + (nome || '').trim().toLowerCase());
}
function sincronizarClientesDosPedidos(salvar = true) {
  const vistos = new Map(clientes.map(c => [c.chave || chaveCliente(c.nome, c.telefone), c]));
  pedidos.forEach(p => {
    if (!p.cliente) return;
    const k = chaveCliente(p.cliente, p.telefone);
    if (!vistos.has(k)) {
      const novo = { id: 'cli-' + Date.now() + '-' + Math.floor(Math.random() * 1000), chave: k, nome: p.cliente, telefone: p.telefone || '', endereco: '', aniversario: '', observacoes: '' };
      clientes.push(novo);
      vistos.set(k, novo);
    }
  });
  if (salvar && clientes.length) saveData(STORAGE_KEYS.CLIENTES);
}
function upsertClienteFromPedido(nome, telefone) {
  if (!nome) return;
  const k = chaveCliente(nome, telefone);
  if (!clientes.some(c => (c.chave || chaveCliente(c.nome, c.telefone)) === k)) {
    clientes.push({ id: 'cli-' + Date.now(), chave: k, nome, telefone: telefone || '', endereco: '', aniversario: '', observacoes: '' });
    saveData(STORAGE_KEYS.CLIENTES);
  }
}
function pedidosDoCliente(nome, telefone) {
  const k = chaveCliente(nome, telefone);
  return pedidos.filter(p => chaveCliente(p.cliente, p.telefone) === k);
}
function renderClientes() {
  const container = document.getElementById('tab-clientes');
  if (!container) return;
  const busca = (window._buscaCliente || '').toLowerCase();
  const lista = [...clientes].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''))
    .filter(c => !busca || (c.nome || '').toLowerCase().includes(busca) || (c.telefone || '').includes(busca));
  const pagCli = paginar('clientes', lista);
  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg"><i class="fa-solid fa-users"></i></div>
        <div><h2 class="font-bold text-slate-900 text-lg">Clientes</h2><p class="text-xs text-slate-500">${clientes.length} cadastrados • sincronizados dos pedidos</p></div>
      </div>
      <div class="flex items-center gap-2">
        <input oninput="window._buscaCliente=this.value;PAGINACAO.clientes.pagina=1;renderClientes()" value="${esc(window._buscaCliente || '')}" placeholder="Buscar nome ou telefone..." class="border border-slate-300 rounded-xl px-3 py-2 text-sm w-56" />
        <button onclick="abrirModalCliente()" class="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl cursor-pointer"><i class="fa-solid fa-plus"></i> Novo</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      ${lista.length === 0 ? `<p class="text-sm text-slate-400 col-span-full text-center py-8">Nenhum cliente. Crie um pedido ou cadastre manualmente.</p>` : pagCli.itens.map(c => {
        const hist = pedidosDoCliente(c.nome, c.telefone);
        const total = hist.reduce((a, p) => a + (Number(p.valorTotal) || 0), 0);
        const ativos = hist.filter(p => p.status !== 'pronto').length;
        const ultimo = hist.map(p => p.dataEntrega || '').sort().reverse()[0] || '—';
        return `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
          <div class="flex items-start justify-between gap-2">
            <div><h3 class="font-bold text-slate-900">${c.nome}</h3><p class="text-xs text-slate-500">${c.telefone || 'sem telefone'}${c.aniversario ? ` • 🎂 ${c.aniversario}` : ''}</p></div>
            <div class="flex gap-1">
              <button onclick="abrirModalCliente('${c.id}')" class="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="excluirCliente('${c.id}')" class="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black text-slate-900">${hist.length}</p><p class="text-slate-500">pedidos</p></div>
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black text-slate-900">${formatMoeda(total)}</p><p class="text-slate-500">total</p></div>
            <div class="bg-slate-50 rounded-lg p-2"><p class="font-black ${ativos ? 'text-blue-700' : 'text-slate-400'}">${ativos}</p><p class="text-slate-500">ativos</p></div>
          </div>
          <p class="text-[11px] text-slate-400 mt-2">Última entrega: ${ultimo}</p>
          ${c.observacoes ? `<p class="text-[11px] text-slate-500 mt-1">📝 ${c.observacoes}</p>` : ''}
          ${hist.slice(0, 3).map(p => `<p class="text-[11px] text-slate-600 mt-1">• ${p.dataEntrega || '?'} — ${(p.itens || []).map(it => `${it.qtd}x ${it.nome}`).join(', ')} (${formatMoeda(p.valorTotal)})</p>`).join('')}
          <div class="flex gap-2 mt-3">
            <button onclick="novoPedidoParaCliente('${c.id}')" class="flex-1 py-1.5 text-xs font-bold rounded-lg bg-pink-600 text-white hover:bg-pink-700 cursor-pointer">+ Pedido</button>
            ${c.telefone ? `<a target="_blank" href="https://wa.me/55${c.telefone.replace(/\D/g, '')}" class="flex-1 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-center hover:bg-emerald-100">WhatsApp</a>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
    ${botoesPaginacao('clientes', pagCli.total, pagCli.atual)}
  `;
}
function abrirModalCliente(id = null) {
  const c = id ? clientes.find(x => x.id === id) : null;
  abrirModal(`
    <div class="flex items-center justify-between pb-4 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900">${c ? 'Editar Cliente' : 'Novo Cliente'}</h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600 cursor-pointer"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <form onsubmit="salvarCliente(event, '${id || ''}')" class="mt-4 space-y-3 text-sm">
      <div><label class="block text-xs font-semibold mb-1">Nome</label><input id="cliNome" required value="${c?.nome || ''}" class="w-full border rounded-lg px-3 py-2" /></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs font-semibold mb-1">Telefone/WhatsApp</label><input id="cliTel" value="${c?.telefone || ''}" placeholder="11999998888" class="w-full border rounded-lg px-3 py-2" /></div>
        <div><label class="block text-xs font-semibold mb-1">Aniversário</label><input id="cliAniv" value="${c?.aniversario || ''}" placeholder="DD/MM" class="w-full border rounded-lg px-3 py-2" /></div>
      </div>
      <div><label class="block text-xs font-semibold mb-1">Endereço</label><input id="cliEnd" value="${c?.endereco || ''}" class="w-full border rounded-lg px-3 py-2" /></div>
      <div><label class="block text-xs font-semibold mb-1">Observações (alergias, preferências)</label><textarea id="cliObs" rows="2" class="w-full border rounded-lg px-3 py-2">${c?.observacoes || ''}</textarea></div>
      <div class="flex justify-end gap-2 pt-2"><button type="button" onclick="fecharModal()" class="px-4 py-2 text-slate-600 cursor-pointer">Cancelar</button><button class="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold cursor-pointer">Salvar</button></div>
    </form>
  `);
}
function salvarCliente(e, id) {
  e.preventDefault();
  const nome = document.getElementById('cliNome').value.trim();
  const telefone = document.getElementById('cliTel').value.trim();
  const aniversario = document.getElementById('cliAniv').value.trim();
  const endereco = document.getElementById('cliEnd').value.trim();
  const observacoes = document.getElementById('cliObs').value.trim();
  if (id) {
    const c = clientes.find(x => x.id === id);
    if (c) Object.assign(c, { nome, telefone, aniversario, endereco, observacoes, chave: chaveCliente(nome, telefone) });
  } else {
    clientes.push({ id: 'cli-' + Date.now(), chave: chaveCliente(nome, telefone), nome, telefone, aniversario, endereco, observacoes });
  }
  saveData(STORAGE_KEYS.CLIENTES);
  fecharModal(); showToast('Cliente salvo!'); renderClientes();
}
function excluirCliente(id) {
  if (!confirm('Excluir cliente? Os pedidos dele são mantidos.')) return;
  clientes = clientes.filter(c => c.id !== id);
  if (bancoAtivo) excluirDoBanco('clientes', id).catch(err => console.error(err));
  saveData(STORAGE_KEYS.CLIENTES); renderClientes();
}
function novoPedidoParaCliente(id) {
  const c = clientes.find(x => x.id === id);
  if (!c) return;
  switchTab('pedidos');
  setTimeout(() => {
    abrirModalPedido();
    setTimeout(() => {
      const n = document.getElementById('pedCliente'); if (n) n.value = c.nome;
      const t = document.getElementById('pedTelefone'); if (t) t.value = c.telefone || '';
    }, 50);
  }, 50);
}

// IMPRESSÃO — etiqueta de pedido + ficha técnica
function imprimirHTML(html) {
  const area = document.getElementById('printArea');
  if (!area) { alert('Área de impressão não encontrada.'); return; }
  area.innerHTML = html;
  window.print();
}
// ==========================================
// ETIQUETA NUTRICIONAL (padrão ANVISA RDC 429/2020 + IN 75/2020)
// ==========================================
// Valores Diários de Referência — IN 75/2020
const VD_REF = { kcal: 2000, carb: 300, acucar: 50, prot: 50, gordTot: 65, gordSat: 20, fibra: 25, sodio: 2000 };
// Limites da rotulagem frontal ("lupa") para sólidos, por 100 g — IN 75/2020
const LUPA_REF = { acucar: 15, sodio: 600, gordSat: 6 };

// Gramas por unidade de medida do insumo (ml/L ≈ densidade da água; 'un' não converte)
function gramasPorUnidadeNutri(un) {
  if (un === 'kg' || un === 'L') return 1000;
  if (un === 'g' || un === 'ml') return 1;
  return 0;
}

function calcularNutricaoFicha(ficha, porcaoG) {
  const porc = Math.max(1, Number(porcaoG) || 0);
  const tot = { kcal: 0, carb: 0, acucar: 0, prot: 0, gordTot: 0, gordSat: 0, gordTrans: 0, fibra: 0, sodio: 0, peso: 0 };
  const itens = [];
  let semConversao = 0, semDados = 0;
  (ficha.ingredientes || []).forEach(ing => {
    const ins = insumos.find(i => i.id === ing.insumoId);
    if (!ins) return;
    const f = gramasPorUnidadeNutri(ins.unidade);
    const qtdG = (Number(ing.qtd) || 0) * f;
    if (!f) semConversao++;
    if (!((ins.kcal100 || 0) > 0 || (ins.carb100 || 0) > 0)) semDados++;
    const k = qtdG / 100;
    tot.kcal += k * (ins.kcal100 || 0);
    tot.carb += k * (ins.carb100 || 0);
    tot.acucar += k * (ins.acucar100 || 0);
    tot.prot += k * (ins.prot100 || 0);
    tot.gordTot += k * (ins.gordTot100 || 0);
    tot.gordSat += k * (ins.gordSat100 || 0);
    tot.gordTrans += k * (ins.gordTrans100 || 0);
    tot.fibra += k * (ins.fibra100 || 0);
    tot.sodio += k * (ins.sodio100 || 0);
    tot.peso += qtdG;
    itens.push({
      nome: ins.nome,
      qtdG,
      alergenicos: String(ins.alergenicos || '').split(',').map(s => s.trim()).filter(Boolean)
    });
  });
  const base = tot.peso > 0 ? tot.peso : 1;
  const por = {}, por100 = {}, vd = {};
  ['kcal', 'carb', 'acucar', 'prot', 'gordTot', 'gordSat', 'gordTrans', 'fibra', 'sodio'].forEach(n => {
    por[n] = tot[n] * porc / base;
    por100[n] = tot[n] * 100 / base;
    vd[n] = n === 'gordTrans' ? 0 : (VD_REF[n] > 0 ? (por[n] / VD_REF[n]) * 100 : 0);
  });
  itens.sort((a, b) => b.qtdG - a.qtdG);
  const alergenicos = [...new Set(itens.flatMap(i => i.alergenicos))];
  const lupa = [];
  if (por100.acucar >= LUPA_REF.acucar) lupa.push('AÇÚCAR');
  if (por100.sodio >= LUPA_REF.sodio) lupa.push('SÓDIO');
  if (por100.gordSat >= LUPA_REF.gordSat) lupa.push('GORDURA SATURADA');
  return {
    tot, por, por100, vd, itens, alergenicos, lupa,
    porcao: porc, pesoReceita: tot.peso,
    porcoesEmbalagem: tot.peso > 0 ? Math.max(1, Math.round(tot.peso / porc)) : 0,
    semConversao, semDados
  };
}

const fmtNutri = (v, dec = 1) => (Number(v) || 0).toFixed(dec).replace('.', ',');
const fmtNutri0 = (v) => Math.round(Number(v) || 0).toString();

// Tabela no modelo vertical da ANVISA (HTML reaproveitado na impressão)
function htmlTabelaNutricional(N) {
  const linha = (nome, v100, vPor, vVd, indent = false, bold = false) => `
    <tr>
      <td style="text-align:left;${indent ? 'padding-left:14px;' : ''}${bold ? 'font-weight:800;' : ''}">${nome}</td>
      <td>${v100}</td><td>${vPor}</td><td>${vVd}</td>
    </tr>`;
  return `
  <table style="width:100%;border-collapse:collapse;font-size:12px;border:2px solid #000">
    <tr><th colspan="4" style="text-align:left;font-size:14px;padding:6px 8px;border-bottom:2px solid #000">INFORMAÇÃO NUTRICIONAL</th></tr>
    <tr><td colspan="4" style="text-align:left;font-size:11px;padding:4px 8px;border-bottom:1px solid #000">Porções por embalagem: cerca de ${N.porcoesEmbalagem} &nbsp;•&nbsp; Porção de ${N.porcao} g</td></tr>
    <tr style="font-size:10px;background:#f2f2f2"><th style="text-align:left;padding:4px 8px"></th><th style="padding:4px">100 g</th><th style="padding:4px">${N.porcao} g</th><th style="padding:4px">%VD*</th></tr>
    ${linha('Valor energético (kcal)', fmtNutri0(N.por100.kcal), fmtNutri0(N.por.kcal), fmtNutri0(N.vd.kcal), false, true)}
    ${linha('Carboidratos totais (g)', fmtNutri(N.por100.carb), fmtNutri(N.por.carb), fmtNutri0(N.vd.carb), false, true)}
    ${linha('Açúcares totais (g)', fmtNutri(N.por100.acucar), fmtNutri(N.por.acucar), fmtNutri0(N.vd.acucar), true)}
    ${linha('Proteínas (g)', fmtNutri(N.por100.prot), fmtNutri(N.por.prot), fmtNutri0(N.vd.prot), false, true)}
    ${linha('Gorduras totais (g)', fmtNutri(N.por100.gordTot), fmtNutri(N.por.gordTot), fmtNutri0(N.vd.gordTot), false, true)}
    ${linha('Gorduras saturadas (g)', fmtNutri(N.por100.gordSat), fmtNutri(N.por.gordSat), fmtNutri0(N.vd.gordSat), true)}
    ${linha('Gorduras trans (g)', fmtNutri(N.por100.gordTrans), fmtNutri(N.por.gordTrans), '—', true)}
    ${linha('Fibra alimentar (g)', fmtNutri(N.por100.fibra), fmtNutri(N.por.fibra), fmtNutri0(N.vd.fibra))}
    ${linha('Sódio (mg)', fmtNutri0(N.por100.sodio), fmtNutri0(N.por.sodio), fmtNutri0(N.vd.sodio), false, true)}
  </table>
  <p style="font-size:10px;margin:4px 0 0">*% Valores Diários de referência com base em uma dieta de 2.000 kcal.</p>`;
}

function abrirEtiquetaNutricional(fichaId, porcaoG, validadeDias) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) { showToast('Ficha não encontrada.', false); return; }
  const porc = Math.max(1, Number(porcaoG) || Number(f.porcaoG) || 40);
  const val = Math.max(0, parseInt(validadeDias ?? f.validadeDias ?? 5, 10) || 0);
  const N = calcularNutricaoFicha(f, porc);

  const ingredientesTxt = N.itens.length
    ? N.itens.map(i => (i.alergenicos.length ? `<strong>${esc(i.nome.toUpperCase())}</strong>` : esc(i.nome.toUpperCase()))).join(', ') + '.'
    : '—';

  abrirModal(`
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <i class="fa-solid fa-apple-whole text-emerald-600"></i> Etiqueta nutricional — ${esc(f.nome)}
      </h3>
      <button onclick="fecharModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2.5">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Porção (g)</label>
        <input type="number" min="1" step="1" id="etiPorcao" value="${porc}" onchange="atualizarEtiquetaNutricional('${f.id}')" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Validade (dias)</label>
        <input type="number" min="0" step="1" id="etiValidade" value="${val}" onchange="atualizarEtiquetaNutricional('${f.id}')" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800" />
      </div>
    </div>
    ${N.semDados > 0 ? `<p class="mt-2 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">⚠️ ${N.semDados} ingrediente(s) sem dados nutricionais — complete no Estoque para a etiqueta ficar exata.</p>` : ''}
    ${N.semConversao > 0 ? `<p class="mt-2 text-[11px] text-slate-500">ℹ️ ${N.semConversao} ingrediente(s) em "un" não entram no cálculo (sem conversão para gramas).</p>` : ''}

    <div class="mt-3 space-y-3 text-slate-900">
      ${N.lupa.length > 0 ? `<div class="flex flex-wrap gap-1.5">${N.lupa.map(l => `<span class="inline-flex items-center gap-1 text-[11px] font-black text-white bg-black px-2.5 py-1 rounded-md"><i class="fa-solid fa-magnifying-glass"></i> ALTO EM ${l}</span>`).join('')}</div>` : ''}
      ${htmlTabelaNutricional(N)}
      <div class="text-[11px] leading-relaxed">
        <p><strong>INGREDIENTES:</strong> ${ingredientesTxt}</p>
        ${N.alergenicos.length > 0 ? `<p class="mt-1"><strong>ALÉRGICOS: CONTÉM ${esc(N.alergenicos.join(', ').toUpperCase())}.</strong></p>` : ''}
        ${val > 0 ? `<p class="mt-1">Validade: ${val} dia(s) após a fabricação.</p>` : ''}
        <p class="mt-1 text-slate-500">Valores estimados calculados a partir da ficha técnica. Não substituem laudo laboratorial.</p>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap justify-end gap-2 pt-3 border-t border-slate-200">
      <button onclick="salvarPadraoEtiqueta('${f.id}')" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold cursor-pointer" title="Grava porção e validade na ficha">
        <i class="fa-solid fa-bookmark"></i> Salvar padrão na ficha
      </button>
      <button onclick="imprimirEtiquetaNutricional('${f.id}')" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer">
        <i class="fa-solid fa-print"></i> Imprimir etiqueta
      </button>
    </div>
  `);
}

function atualizarEtiquetaNutricional(fichaId) {
  const porc = Number(document.getElementById('etiPorcao')?.value) || 0;
  const val = parseInt(document.getElementById('etiValidade')?.value, 10) || 0;
  abrirEtiquetaNutricional(fichaId, porc, val);
}

function salvarPadraoEtiqueta(fichaId) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) return;
  f.porcaoG = Math.max(1, Number(document.getElementById('etiPorcao')?.value) || 0);
  f.validadeDias = Math.max(0, parseInt(document.getElementById('etiValidade')?.value, 10) || 0);
  saveData(STORAGE_KEYS.FICHAS);
  showToast('Porção e validade salvas na ficha!');
}

function imprimirEtiquetaNutricional(fichaId) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) return;
  const porc = Math.max(1, Number(document.getElementById('etiPorcao')?.value) || Number(f.porcaoG) || 40);
  const val = Math.max(0, parseInt(document.getElementById('etiValidade')?.value, 10) || Number(f.validadeDias) || 0);
  const N = calcularNutricaoFicha(f, porc);
  const ingredientesTxt = N.itens.length
    ? N.itens.map(i => (i.alergenicos.length ? `<strong>${esc(i.nome.toUpperCase())}</strong>` : esc(i.nome.toUpperCase()))).join(', ') + '.'
    : '—';
  imprimirHTML(`
    <div class="etiqueta">
      ${cabecalhoMarca('grande')}
      <h1>${esc(f.nome)}</h1>
      ${N.lupa.length > 0 ? `<p>${N.lupa.map(l => `<span style="display:inline-block;background:#000;color:#fff;font-weight:800;font-size:11px;padding:2px 8px;border-radius:4px;margin-right:4px">ALTO EM ${l}</span>`).join('')}</p>` : ''}
      ${htmlTabelaNutricional(N)}
      <p style="font-size:11px;margin-top:8px"><strong>INGREDIENTES:</strong> ${ingredientesTxt}</p>
      ${N.alergenicos.length > 0 ? `<p style="font-size:11px"><strong>ALÉRGICOS: CONTÉM ${esc(N.alergenicos.join(', ').toUpperCase())}.</strong></p>` : ''}
      ${val > 0 ? `<p style="font-size:11px">Validade: ${val} dia(s) após a fabricação.</p>` : ''}
      ${rodapeMarca()}
      <p style="font-size:10px;color:#666;margin-top:6px">Valores estimados a partir da ficha técnica. Não substituem laudo laboratorial.</p>
    </div>
  `);
}

function imprimirEtiquetaPedido(pedidoId) {
  const p = pedidos.find(x => x.id === pedidoId);
  if (!p) return;
  const fin = calcularFinanceiroPedido(p);
  imprimirHTML(`
    <div class="etiqueta">
      ${cabecalhoMarca()}
      <h1>🧁 ${p.cliente}</h1>
      <p><strong>Entrega:</strong> ${(p.dataEntrega || '').split('-').reverse().join('/')} às ${p.horaEntrega || '--:--'} • ${p.canal || ''}</p>
      <p><strong>Tel:</strong> ${p.telefone || '—'}</p>
      <table><tr><th>Qtd</th><th>Item</th><th>Valor</th></tr>
      ${(p.itens || []).map(it => `<tr><td>${it.qtd}x</td><td>${it.nome}</td><td>${formatMoeda((it.qtd || 0) * (it.precoUnit || 0))}</td></tr>`).join('')}
      </table>
      <p><strong>Total:</strong> ${formatMoeda(fin.total)} • <strong>Sinal:</strong> ${formatMoeda(fin.sinal)} • <strong>Falta:</strong> ${formatMoeda(fin.restante)}</p>
      ${p.observacoes ? `<p><strong>Obs:</strong> ${p.observacoes}</p>` : ''}
      ${rodapeMarca()}
      <p style="margin-top:8px;font-size:12px">Pedido #${p.id} • ${new Date().toLocaleString('pt-BR')}</p>
    </div>
  `);
}
function imprimirFicha(fichaId) {
  const f = fichas.find(x => x.id === fichaId);
  if (!f) return;
  const P = calcularPrecoFicha(f, 0);
  imprimirHTML(`
    <div class="etiqueta">
      ${cabecalhoMarca()}
      <h1>${f.nome}</h1>
      <p>Rendimento: ${f.rendimento} • CMV: ${formatMoeda(P.cmvTotal)} (${formatMoeda(P.cmvUnit)}/un) • Preço sugerido: ${formatMoeda(P.precoTotal)}</p>
      ${f.tempoPreparoMin ? `<p>Tempo: ${f.tempoPreparoMin}min ${f.dicaForno ? '• ' + f.dicaForno : ''}</p>` : ''}
      <table><tr><th>Insumo</th><th>Qtd</th><th>Custo</th></tr>
      ${(f.ingredientes || []).map(ing => {
        const ins = insumos.find(i => i.id === ing.insumoId);
        const custo = ins ? getCustoUnitario(ins) * ing.qtd : 0;
        return `<tr><td>${ins ? ins.nome : '—'}</td><td>${ing.qtd}${ins ? ins.unidade : ''}</td><td>${formatMoeda(custo)}</td></tr>`;
      }).join('')}
      </table>
      ${f.modoPreparo ? `<p style="margin-top:8px;white-space:pre-line"><strong>Preparo:</strong>\n${f.modoPreparo}</p>` : ''}
      ${rodapeMarca()}
    </div>
  `);
}

// ==========================================
// UTILITÁRIOS DE MODAL
// ==========================================
function abrirModal(html) {
  const container = document.getElementById('modalContainer');
  const content = document.getElementById('modalContent');
  if (!container || !content) return;
  content.innerHTML = html;
  container.classList.remove('hidden');
  const box = document.getElementById('modalBox');
  if (box) {
    box.classList.remove('modal-pop');
    void box.offsetWidth;
    box.classList.add('modal-pop');
  }
}

function fecharModal() {
  const container = document.getElementById('modalContainer');
  if (container) container.classList.add('hidden');
}

// Fechar modal e painel de notificações ao clicar fora
window.addEventListener('click', (e) => {
  const container = document.getElementById('modalContainer');
  if (e.target === container) {
    fecharModal();
  }
  const panel = document.getElementById('notifPanel');
  const bell = document.getElementById('notifBell');
  if (panel && !panel.classList.contains('hidden') && bell && !bell.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.add('hidden');
  }
});

// ==========================================
// CENTRAL DE NOTIFICAÇÕES (sino)
// ==========================================
function coletarNotificacoes() {
  const lista = [];
  obterItensParaRepor().forEach(item => {
    const atual = Number(item.quantidade !== undefined ? item.quantidade : item.estoqueAtual) || 0;
    const min = Number(item.alertaEstoqueMinimo !== undefined ? item.alertaEstoqueMinimo : item.estoqueMinimo) || 0;
    lista.push({
      grupo: 'Estoque baixo',
      icone: 'fa-triangle-exclamation',
      cor: 'text-amber-500 bg-amber-50',
      texto: `<strong>${esc(item.nome)}</strong>: ${atual}${esc(item.unidade || '')} (mín. ${min}${esc(item.unidade || '')})`,
      tab: 'estoque'
    });
  });
  // Ruptura prevista MRP: agenda 7 dias × consumo das fichas
  try {
    const mrp = calcularPrevisaoEstoqueMRP(7);
    mrp.alertas.slice(0, 8).forEach(a => {
      lista.push({
        grupo: 'Ruptura prevista (7 dias)',
        icone: 'fa-boxes-stacked',
        cor: a.critico ? 'text-red-500 bg-red-50' : 'text-amber-500 bg-amber-50',
        texto: a.critico
          ? `<strong>${esc(a.nome)}</strong> ${rotuloRupturaMRP(a)} — falta ${formatarQtdMRP(a.deficit, a.unidade)}${a.pacotesSugeridos > 0 ? ` • comprar ${a.pacotesSugeridos}x pct` : ''}`
          : `<strong>${esc(a.nome)}</strong> fica abaixo do mínimo — sobra ${formatarQtdMRP(a.saldoProjetado, a.unidade)}`,
        tab: 'estoque'
      });
    });
  } catch (e) { /* MRP indisponível sem dados */ }
  pedidos.filter(p => p.status === 'aguardando').forEach(p => {
    lista.push({
      grupo: 'Aguardando sinal',
      icone: 'fa-hourglass-start',
      cor: 'text-orange-500 bg-orange-50',
      texto: `<strong>${esc(p.cliente)}</strong> • ${formatMoeda(p.valorTotal)} • entrega ${(p.dataEntrega || '').split('-').reverse().join('/')}`,
      tab: 'pedidos'
    });
  });
  const hoje = diaISO(0);
  const amanha = diaISO(1);
  pedidos.filter(p => p.status !== 'pronto' && (p.dataEntrega === hoje || p.dataEntrega === amanha)).forEach(p => {
    lista.push({
      grupo: p.dataEntrega === hoje ? 'Entrega hoje' : 'Entrega amanhã',
      icone: 'fa-truck-fast',
      cor: 'text-blue-500 bg-blue-50',
      texto: `<strong>${esc(p.horaEntrega || '--:--')} • ${esc(p.cliente)}</strong> • ${(p.itens || []).map(it => `${it.qtd}x ${esc(it.nome)}`).join(', ')}`,
      tab: 'pedidos'
    });
  });
  pedidos.forEach(p => {
    const sc = calcularStatusCaixaPedido(p);
    if (sc.saldoPendente > 0) {
      lista.push({
        grupo: 'A receber no caixa',
        icone: 'fa-cash-register',
        cor: 'text-emerald-500 bg-emerald-50',
        texto: `<strong>${esc(p.cliente)}</strong> • falta ${formatMoeda(sc.saldoPendente)}`,
        tab: 'caixa',
        href: linkCobranca(p)
      });
    }
  });
  // Aniversariantes do mês (campo DD/MM do cadastro)
  const mesAtual = new Date().getMonth() + 1;
  clientes.forEach(c => {
    const m = String(c.aniversario || '').match(/(\d{1,2})\s*\/\s*(\d{1,2})/);
    if (m && Number(m[2]) === mesAtual) {
      lista.push({
        grupo: 'Aniversários no mês',
        icone: 'fa-cake-candles',
        cor: 'text-pink-500 bg-pink-50',
        texto: `<strong>${esc(c.nome)}</strong> • dia ${m[1]}`,
        tab: 'clientes',
        href: linkAniversario(c)
      });
    }
  });
  return lista;
}

  // Datas temáticas próximas (calendário do Cardápio): avisa com antecedência
  try {
    proximasDatasTematicas(21).slice(0, 6).forEach(({ entry: e, iso, diff }) => {
      const emCima = (e.antecedencia || 0) > 0 && diff <= e.antecedencia;
      lista.push({
        grupo: 'Datas próximas',
        icone: e.icone || 'fa-calendar-days',
        cor: emCima ? 'text-orange-500 bg-orange-50' : 'text-slate-500 bg-slate-100',
        texto: `<strong>${esc(e.nome)}</strong> ${rotuloCountdown(diff)} (${iso.split('-').reverse().slice(0, 2).join('/')})${emCima ? ' • hora de divulgar!' : ''}`,
        tab: 'cardapio'
      });
    });
  } catch (err) { /* calendário indisponível sem dados */ }

// Link WhatsApp de cobrança do saldo pendente (null se sem telefone)
function linkCobranca(p) {
  const tel = String(p.telefone || '').replace(/\D/g, '');
  if (!tel) return null;
  const fin = calcularFinanceiroPedido(p);
  if (fin.restante <= 0) return null;
  const data = (p.dataEntrega || '').split('-').reverse().join('/');
  const msg = `Olá ${p.cliente}! Aqui é da nossa confeitaria 🧁 Faltam ${formatMoeda(fin.restante)} do seu pedido de ${data} (total ${formatMoeda(fin.total)}). Pode me mandar o comprovante por aqui? Obrigada! 🙏`;
  return `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`;
}

// Link WhatsApp de parabéns (null se sem telefone)
function linkAniversario(c) {
  const tel = String(c.telefone || '').replace(/\D/g, '');
  if (!tel) return null;
  const msg = `Parabéns ${c.nome}! 🎂 Aqui é da nossa confeitaria — passando para desejar um dia doce! Temos um mimo de aniversário te esperando 🎁`;
  return `https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`;
}

function renderNotificacoes() {
  const lista = coletarNotificacoes();
  const count = document.getElementById('notifCount');
  if (count) {
    if (lista.length > 0) {
      count.classList.remove('hidden');
      count.classList.add('flex');
      count.textContent = lista.length > 99 ? '99+' : String(lista.length);
    } else {
      count.classList.add('hidden');
      count.classList.remove('flex');
    }
  }
  const total = document.getElementById('notifTotal');
  if (total) total.textContent = lista.length === 0 ? 'tudo em dia' : `${lista.length} pendente(s)`;
  const box = document.getElementById('notifList');
  if (!box) return;
  if (lista.length === 0) {
    box.innerHTML = `<p class="px-4 py-8 text-center text-xs text-slate-400">Nenhuma pendência. Bom trabalho! 🎉</p>`;
    return;
  }
  const grupos = {};
  lista.forEach(n => {
    if (!grupos[n.grupo]) grupos[n.grupo] = [];
    grupos[n.grupo].push(n);
  });
  box.innerHTML = Object.entries(grupos).map(([grupo, itens]) => `
    <div class="px-4 py-2.5">
      <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">${grupo} (${itens.length})</p>
      <div class="space-y-1.5">
        ${itens.slice(0, 8).map(n => `
          ${n.href ? `
          <a href="${n.href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-50/70 text-left transition-colors cursor-pointer">
            <span class="w-7 h-7 rounded-lg ${n.cor} flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${n.icone}"></i></span>
            <span class="text-xs text-slate-600 leading-snug flex-1">${n.texto}</span>
            <i class="fa-brands fa-whatsapp text-emerald-500 text-sm mt-1 shrink-0"></i>
          </a>
          ` : `
          <button onclick="irNotificacao('${n.tab}')" class="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-orange-50/70 text-left transition-colors cursor-pointer">
            <span class="w-7 h-7 rounded-lg ${n.cor} flex items-center justify-center text-xs shrink-0"><i class="fa-solid ${n.icone}"></i></span>
            <span class="text-xs text-slate-600 leading-snug">${n.texto}</span>
          </button>
          `}
        `).join('')}
        ${itens.length > 8 ? `<p class="text-[11px] text-slate-400 pl-9">+${itens.length - 8} nesta categoria</p>` : ''}
      </div>
    </div>
  `).join('');
}

function toggleNotifPanel(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  panel.classList.toggle('hidden');
}

function fecharNotifPanel() {
  const panel = document.getElementById('notifPanel');
  if (panel) panel.classList.add('hidden');
}

function irNotificacao(tab) {
  fecharNotifPanel();
  switchTab(tab);
}

// ==========================================
// EXPORTAÇÃO CSV (abre no Excel)
// ==========================================
function baixarArquivo(nome, conteudo, tipo = 'application/json') {
  const blob = new Blob([conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportarCSV(tipo = 'pedidos') {
  let linhas = [];
  if (tipo === 'pedidos') {
    linhas.push(['id', 'cliente', 'telefone', 'dataEntrega', 'horaEntrega', 'status', 'canal', 'valorTotal', 'valorSinal'].join(';'));
    pedidos.forEach(p => linhas.push([p.id, `"${(p.cliente || '').replace(/"/g, "'")}"`, p.telefone || '', p.dataEntrega || '', p.horaEntrega || '', p.status || '', p.canal || '', p.valorTotal || 0, p.valorSinal || 0].join(';')));
  } else if (tipo === 'estoque') {
    linhas.push(['id', 'nome', 'categoria', 'estoque', 'unidade', 'minimo', 'custoUnit'].join(';'));
    insumos.forEach(i => linhas.push([i.id, `"${(i.nome || '').replace(/"/g, "'")}"`, i.categoria || '', i.quantidade || 0, i.unidade || '', i.estoqueMinimo || 0, getCustoUnitario(i).toFixed(4)].join(';')));
  } else {
    linhas.push(['id', 'data', 'tipo', 'categoria', 'descricao', 'valor', 'forma'].join(';'));
    lancamentos.forEach(l => linhas.push([l.id, l.data || '', l.tipo || '', `"${(l.categoria || '').replace(/"/g, "'")}"`, `"${(l.descricao || '').replace(/"/g, "'")}"`, l.valor || 0, l.forma || ''].join(';')));
  }
  baixarArquivo(`confeitaria-${tipo}.csv`, '\uFEFF' + linhas.join('\n'), 'text/csv;charset=utf-8');
  showToast(`CSV de ${tipo} exportado! Abre no Excel.`);
}

// PWA: registra service worker para uso offline/instalável no PC
if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Expor funções no escopo global (window) para compatibilidade com os atributos inline onclick/onsubmit
Object.assign(window, {
  initApp,
  switchTab,
  renderDashboard,
  renderEstoque,
  renderStockTable,
  compararEstoqueComMinimo,
  itemPrecisaReposicao,
  obterItensParaRepor,
  updateHeaderStockBadge,
  updateBadges,
  calcularFinanceiroPedido,
  lucroPorPedido,
  seloMargemPedido,
  sugerirReajustePreco,
  aplicarReajustePreco,
  alternarAssistente,
  mostrarBarraAssistente,
  processarAssistente,
  gerarRelatorioContador,
  abrirFechamentoDia,
  calcularCMVFicha,
  calcularPrecoFicha,
  calcularDRE,
  setDreMes,
  calcularInsumosDoPedido,
  calcularPrevisaoEstoqueMRP,
  abrirModalConfirmarBaixa,
  darBaixaEstoquePedido,
  estornarEstoquePedido,
  obterLancamentosDoPedido,
  calcularStatusCaixaPedido,
  abrirModalLancarCaixa,
  confirmarLancarPedidoNoCaixa,
  definirValoresRapidosLancarCaixa,
  abrirModalLancarCompraMRPCaixa,
  confirmarLancarCompraMRPCaixa,
  abrirModal,
  fecharModal,
  toggleNotifPanel,
  fecharNotifPanel,
  irNotificacao,
  abrirModalMetas,
  salvarMetas,
  filtrarEstoqueCategoria,
  filtrarEstoqueStatus,
  filtrarEstoqueBusca,
  limparBuscaEstoque,
  limparFiltrosEstoque,
  filtrarInsumosEstoque,
  renderStockRows,
  normalizarTexto,
  reporEstoqueRapido,
  abrirModalAjusteQuantidade,
  salvarAjusteQuantidade,
  abrirModalInsumo,
  atualizarPreviaModalInsumo,
  salvarInsumo,
  abrirModalConfirmarExclusaoInsumo,
  referenciaNutricional,
  preencherNutriReferencia,
  calcularNutricaoFicha,
  abrirEtiquetaNutricional,
  atualizarEtiquetaNutricional,
  salvarPadraoEtiqueta,
  imprimirEtiquetaNutricional,
  executarExclusaoInsumo,
  getStatusEstoque,
  abrirModalFicha,
  salvarFicha,
  excluirFicha,
  adicionarLinhaIngrediente,
  removerLinhaIngrediente,
  atualizarTempIngrediente,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  moverPedidoStatus,
  setAgendaAlcance,
  abrirModalPedido,
  salvarPedido,
  excluirPedido,
  atualizarTaxaPorCanal,
  adicionarItemPedido,
  selecionarFichaItemPedido,
  atualizarItemPedidoCampo,
  removerItemPedido,
  copiarListaComprasWhatsApp,
  abrirModalLancamento,
  salvarLancamento,
  excluirLancamento,
  exportarCSV,
  renderPromocoes,
  atualizarSimuladorCampo,
  selecionarCanalSimulador,
  selecionarMecanicaSimulador,
  resetarSimulador,
  carregarOportunidadeNoSimulador,
  salvarPromoDoSimulador,
  excluirPromocao,
  alternarStatusPromocao,
  copiarTextoDivulgacao,
  copiarSimulacaoWhatsApp,
  setPlanoEntrega,
  renderClientes,
  abrirModalCliente,
  salvarCliente,
  excluirCliente,
  novoPedidoParaCliente,
  imprimirEtiquetaPedido,
  imprimirFicha,
  abrirConfiguracoes,
  mostrarAtalhos,
  fazerLogin,
  trocarModoLogin,
  fazerLogout,
  limparCacheLocal,
  sincronizarLocalComBanco,
  exportarBackupLocal,
  importarBackupLocal,
  abrirPalette,
  filtrarPalette,
  executarPalette,
  irPagina,
  renderRota,
  toggleSidebar,
  toggleGrupo,
  mudarMesCardapio,
  semanaCardapio,
  definirQtdCardapio,
  aplicarFiltroCardapio,
  alternarSoEscalados,
  escalarTodos,
  preencherComOpcoes,
  copiarDaSemanaAnterior,
  toggleMenuPreencher,
  abrirModoApresentacao,
  fecharModoApresentacao,
  renderMarca,
  salvarMarca,
  lerMarcaDoFormulario,
  aoDigitarMarca,
  aoAlternarMarca,
  atualizarPreviaMarca,
  processarLogoMarca,
  removerLogoMarca,
  restaurarCoresTema,
  assinaturaMarca,
  setStatusSalvo,
  duplicarSemanaCardapio,
  tecladoGradeCardapio,
  abrirModalDuplicarSemana,
  resumoCardapioSemana,
  limparSemanaCardapio,
  copiarCardapioWhats,
  copiarComprasCardapio,
  imprimirCardapio,
  simularPromoCardapio,
  openSidebar,
  closeSidebar
});

// Acesso reativo aos estados globais via window
Object.defineProperties(window, {
  PAGINACAO: { get: () => PAGINACAO, configurable: true },
  pedidos: { get: () => pedidos, set: (v) => { pedidos = v; }, configurable: true },
  fichas: { get: () => fichas, set: (v) => { fichas = v; }, configurable: true },
  insumos: { get: () => insumos, set: (v) => { insumos = v; }, configurable: true },
  lancamentos: { get: () => lancamentos, set: (v) => { lancamentos = v; }, configurable: true },
  clientes: { get: () => clientes, set: (v) => { clientes = v; }, configurable: true },
  cardapios: { get: () => cardapios, set: (v) => { cardapios = normalizarCardapios(v); }, configurable: true },
  marca: { get: () => marca, set: (v) => { marca = { ...MARCA_PADRAO, ...v }; }, configurable: true },
  metas: { get: () => metas, set: (v) => { metas = v; }, configurable: true }
});

// Start the app when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderRota);
} else {
  renderRota();
}

