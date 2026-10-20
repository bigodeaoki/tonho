// Catálogo de exemplo. Nomes, preços e descrições precisam ser confirmados pela marca.
// As fotos são provisórias (Unsplash) até o ensaio da marca ficar pronto.

export type Category = 'camisetas' | 'moletons' | 'partes-de-baixo' | 'jaquetas' | 'acessorios';

export interface Shot {
  /** id da foto em public/img/looks/<id>.webp */
  id: string;
  /** ponto da peça na foto (object-position) */
  focus?: string;
  /** zoom pra enquadrar a peça */
  zoom?: number;
}

export interface Product {
  slug: string;
  name: string;
  kind: string;
  category: Category;
  collectionId: string;
  price: number;
  sizes: string[];
  main: Shot;
  alt?: Shot;
  /** recorte usado na vitrine (public/img/cut/<id>.webp); se faltar, usa o da foto principal */
  cut?: string;
  description: string;
  fabric: string;
  soldOut?: boolean;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  camisetas: 'Camisetas',
  moletons: 'Moletons',
  'partes-de-baixo': 'Calças',
  jaquetas: 'Jaquetas',
  acessorios: 'Acessórios',
};

const ROUPA = ['P', 'M', 'G', 'GG'];
const UNICO = ['Único'];

export const PRODUCTS: Product[] = [
  // Outubro Rosa
  {
    slug: 'moletom-rosa-oversized',
    name: 'Moletom Rosa Oversized',
    kind: 'Moletom com capuz',
    category: 'moletons',
    collectionId: 'outubro-rosa-26',
    price: 289,
    sizes: ROUPA,
    main: { id: '041', focus: '50% 22%', zoom: 1.7 },
    alt: { id: '042' },
    description: 'Moletom com capuz, ombro caído e barra com elástico. Rosa choque, felpado por dentro.',
    fabric: 'Moletom 3 cabos, 80% algodão, 20% poliéster',
  },
  {
    slug: 'calca-moletom-rosa',
    name: 'Calça Moletom Rosa',
    kind: 'Calça de moletom',
    category: 'partes-de-baixo',
    collectionId: 'outubro-rosa-26',
    price: 219,
    sizes: ROUPA,
    main: { id: '047', focus: '50% 72%', zoom: 1.6 },
    alt: { id: '049' },
    description: 'Calça pantalona de moletom, cordão aparente e bolsos fundos. Faz conjunto com o moletom.',
    fabric: 'Moletom 3 cabos, 80% algodão, 20% poliéster',
  },
  {
    slug: 'moletom-rosa-capuz',
    name: 'Conjunto Rosa Capuz',
    kind: 'Conjunto de moletom',
    category: 'moletons',
    collectionId: 'outubro-rosa-26',
    price: 449,
    sizes: ROUPA,
    main: { id: '032' },
    alt: { id: '052' },
    description: 'Moletom e calça no mesmo rosa, capuz duplo e punhos largos. Vendido como conjunto.',
    fabric: 'Moletom 3 cabos, 80% algodão, 20% poliéster',
  },
  {
    slug: 'camiseta-preta-laco',
    name: 'Camiseta Preta Laço',
    kind: 'Camiseta oversized',
    category: 'camisetas',
    collectionId: 'outubro-rosa-26',
    price: 129,
    sizes: ROUPA,
    main: { id: '061' },
    alt: { id: '059' },
    description: 'Camiseta preta oversized com o laço rosa bordado no peito.',
    fabric: 'Malha 30.1 penteada, 100% algodão',
  },
  {
    slug: 'gorro-rosa',
    name: 'Gorro Rosa',
    kind: 'Gorro de tricô',
    category: 'acessorios',
    collectionId: 'outubro-rosa-26',
    price: 89,
    sizes: UNICO,
    main: { id: '050', focus: '50% 18%', zoom: 1.5 },
    alt: { id: '050' },
    description: 'Gorro de tricô canelado, barra dobrada, rosa chiclete.',
    fabric: 'Tricô de acrílico macio',
  },

  // Verão 27 (pré-venda)
  {
    slug: 'camiseta-off-white',
    name: 'Camiseta Off-White Oversized',
    kind: 'Camiseta oversized',
    category: 'camisetas',
    collectionId: 'verao-27',
    price: 139,
    sizes: ROUPA,
    main: { id: '062' },
    alt: { id: '058' },
    description: 'Camiseta oversized off-white, gola reforçada e barra dupla.',
    fabric: 'Malha 30.1 penteada, 100% algodão',
  },
  {
    slug: 'cargo-laranja',
    name: 'Calça Cargo Laranja',
    kind: 'Calça cargo',
    category: 'partes-de-baixo',
    collectionId: 'verao-27',
    price: 249,
    sizes: ROUPA,
    main: { id: '068', focus: '50% 66%', zoom: 1.5 },
    alt: { id: '068' },
    description: 'Cargo de sarja leve, bolsos laterais com aba e barra com elástico.',
    fabric: 'Sarja de algodão',
  },
  {
    slug: 'bucket-listrado',
    name: 'Bucket Listrado',
    kind: 'Chapéu bucket',
    category: 'acessorios',
    collectionId: 'verao-27',
    price: 129,
    sizes: UNICO,
    main: { id: '073', focus: '50% 20%', zoom: 1.3 },
    alt: { id: '071' },
    cut: '071',
    description: 'Bucket de jeans lavado, aba média.',
    fabric: 'Jeans 100% algodão',
  },
  {
    slug: 'regata-branca',
    name: 'Regata Branca',
    kind: 'Regata',
    category: 'camisetas',
    collectionId: 'verao-27',
    price: 99,
    sizes: ROUPA,
    main: { id: '067' },
    alt: { id: '038' },
    description: 'Regata canelada branca, cava funda.',
    fabric: 'Ribana, 100% algodão',
  },

  // Inverno 26
  {
    slug: 'jaqueta-varsity',
    name: 'Jaqueta Varsity',
    kind: 'Jaqueta college',
    category: 'jaquetas',
    collectionId: 'inverno-26',
    price: 389,
    sizes: ROUPA,
    main: { id: '009', focus: '50% 30%', zoom: 1.6 },
    alt: { id: '009' },
    description: 'Varsity preta com mangas brancas, punhos listrados e letra bordada no peito.',
    fabric: 'Corpo em lã batida, mangas em sintético',
  },
  {
    slug: 'moletom-listrado',
    name: 'Moletom Listrado',
    kind: 'Moletom com capuz',
    category: 'moletons',
    collectionId: 'inverno-26',
    price: 279,
    sizes: ROUPA,
    main: { id: '029' },
    alt: { id: '029', focus: '50% 40%', zoom: 1.4 },
    description: 'Moletom com listras largas em preto e cinza, capuz forrado.',
    fabric: 'Moletom 3 cabos, 80% algodão, 20% poliéster',
  },
  {
    slug: 'moletom-cinza',
    name: 'Moletom Cinza Pesado',
    kind: 'Moletom com capuz',
    category: 'moletons',
    collectionId: 'inverno-26',
    price: 269,
    sizes: ROUPA,
    main: { id: '031' },
    alt: { id: '027' },
    description: 'Moletom cinza mescla de gramatura alta, capuz grande.',
    fabric: 'Moletom 4 cabos, 100% algodão',
  },
  {
    slug: 'moletom-branco',
    name: 'Moletom Branco Seta',
    kind: 'Moletom com capuz',
    category: 'moletons',
    collectionId: 'inverno-26',
    price: 279,
    sizes: ROUPA,
    main: { id: '025' },
    alt: { id: '005' },
    description: 'Moletom branco com seta amarela na manga.',
    fabric: 'Moletom 3 cabos, 80% algodão, 20% poliéster',
  },
  {
    slug: 'gorro-vermelho',
    name: 'Gorro Vermelho',
    kind: 'Gorro de tricô',
    category: 'acessorios',
    collectionId: 'inverno-26',
    price: 89,
    sizes: UNICO,
    main: { id: '078', focus: '50% 20%', zoom: 1.4 },
    alt: { id: '078' },
    description: 'Gorro curto vermelho, estilo pescador.',
    fabric: 'Tricô de acrílico',
  },
  {
    slug: 'jaqueta-workwear',
    name: 'Jaqueta Workwear',
    kind: 'Jaqueta',
    category: 'jaquetas',
    collectionId: 'inverno-26',
    price: 359,
    sizes: ROUPA,
    main: { id: '017' },
    alt: { id: '017', focus: '50% 40%', zoom: 1.4 },
    description: 'Jaqueta de sarja pesada, gola de camisa e bolsos chapados.',
    fabric: 'Sarja 100% algodão',
  },

  // Arraiá 26
  {
    slug: 'camisa-xadrez',
    name: 'Camisa Xadrez Quadrilha',
    kind: 'Camisa de botão',
    category: 'camisetas',
    collectionId: 'arraia-26',
    price: 199,
    sizes: ['M', 'G'],
    main: { id: '003', focus: '50% 30%', zoom: 1.4 },
    alt: { id: '003' },
    description: 'Camisa de flanela xadrez vermelho e preto, modelagem larga pra usar aberta.',
    fabric: 'Flanela de algodão',
  },
  {
    slug: 'camiseta-preta-vivo',
    name: 'Camiseta Preta Vivo',
    kind: 'Camiseta',
    category: 'camisetas',
    collectionId: 'arraia-26',
    price: 129,
    sizes: ['P', 'GG'],
    main: { id: '056' },
    alt: { id: '040' },
    description: 'Camiseta preta com vivo branco na gola e nas mangas.',
    fabric: 'Malha 30.1 penteada, 100% algodão',
  },

  // Primavera 26
  {
    slug: 'camiseta-cinza-oversized',
    name: 'Camiseta Cinza Lavada',
    kind: 'Camiseta oversized',
    category: 'camisetas',
    collectionId: 'primavera-26',
    price: 139,
    sizes: ROUPA,
    main: { id: '035' },
    alt: { id: '063' },
    description: 'Camiseta oversized cinza com lavagem estonada, comprimento de vestido.',
    fabric: 'Malha 26.1, 100% algodão',
  },
  {
    slug: 'camisa-oncinha',
    name: 'Camisa Oncinha',
    kind: 'Camisa de botão',
    category: 'camisetas',
    collectionId: 'primavera-26',
    price: 189,
    sizes: ROUPA,
    main: { id: '065' },
    alt: { id: '065', focus: '50% 30%', zoom: 1.5 },
    description: 'Camisa de viscose em estampa de onça, manga longa.',
    fabric: 'Viscose',
  },

  // Verão 26 (esgotada, fica no arquivo)
  {
    slug: 'camiseta-ressaca',
    name: 'Camiseta Ressaca',
    kind: 'Camiseta oversized',
    category: 'camisetas',
    collectionId: 'verao-26',
    price: 129,
    sizes: ROUPA,
    main: { id: '001' },
    description: 'A primeira camiseta da marca. Esgotada.',
    fabric: 'Malha 30.1 penteada, 100% algodão',
    soldOut: true,
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsOf = (collectionId: string) => PRODUCTS.filter((p) => p.collectionId === collectionId);

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const shotSrc = (s: Shot) => `/img/looks/${s.id}.webp`;
export const cutSrc = (id: string) => `/img/cut/${id}.webp`;
