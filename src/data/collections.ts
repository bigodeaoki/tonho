// Calendário de drops. Datas, textos e números são conteúdo de exemplo:
// confirmar com a marca antes de publicar.

export interface Hotspot {
  /** produto que o ponto aponta */
  slug: string;
  /** posição sobre o recorte do modelo, em % */
  x: number;
  y: number;
}

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  focus?: string;
}

export interface Collection {
  id: string;
  name: string;
  drop: string;
  /** mês e ano em texto curto, ex. "Out 2026" */
  when: string;
  launch: string;
  end: string;
  soldOut?: boolean;
  lastPieces?: boolean;
  /** cor neon que o site veste quando a coleção está no ar */
  accent: string;
  /** recorte do modelo (public/img/cut/<id>.webp) */
  cut: string;
  hotspots: Hotspot[];
  /** foto do lugar que inspirou a coleção (acervo aberto) */
  place: Photo;
  tagline: string;
  blurb: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'verao-26',
    name: 'Verão 26',
    drop: 'Drop 01',
    when: 'Dez 2025',
    launch: '2025-12-05T19:00:00-03:00',
    end: '2026-03-01T23:59:59-03:00',
    soldOut: true,
    accent: '#d8d2c4',
    cut: '001',
    hotspots: [{ slug: 'camiseta-ressaca', x: 52, y: 52 }],
    place: {
      src: '/img/verao-copacabana-1950.jpg',
      alt: 'Foto aérea antiga de Copacabana com o mar avançando sobre o calçadão',
      caption: 'Copacabana depois da ressaca, acervo IMS',
      width: 1600,
      height: 1085,
    },
    tagline: 'O primeiro drop. Esgotou.',
    blurb: 'A primeira coleção, em preto e branco, com o mar invadindo o calçadão. Esgotou em fevereiro e não volta.',
  },
  {
    id: 'arraia-26',
    name: 'Arraiá 26',
    drop: 'Drop 02',
    when: 'Jun 2026',
    launch: '2026-06-05T19:00:00-03:00',
    end: '2026-07-05T23:59:59-03:00',
    lastPieces: true,
    accent: '#ff6a1a',
    cut: '040',
    hotspots: [{ slug: 'camiseta-preta-vivo', x: 50, y: 22 }],
    place: {
      src: '/img/arraia-bandeirinhas.jpg',
      alt: 'Bandeirinhas coloridas de festa junina penduradas sob o céu da noite',
      caption: 'Bandeirinhas de quermesse, São Paulo',
      width: 1920,
      height: 1080,
    },
    tagline: 'Xadrez, fogueira e preto.',
    blurb: 'Camisa xadrez de quadrilha e camiseta preta com vivo branco, pra usar muito depois de junho.',
  },
  {
    id: 'inverno-26',
    name: 'Inverno 26',
    drop: 'Drop 03',
    when: 'Jul 2026',
    launch: '2026-06-26T19:00:00-03:00',
    end: '2026-09-21T23:59:59-03:00',
    accent: '#7fd6ff',
    cut: '009',
    hotspots: [
      { slug: 'jaqueta-varsity', x: 48, y: 24 },
      { slug: 'moletom-branco', x: 72, y: 48 },
    ],
    place: {
      src: '/img/inverno-neblina.jpg',
      alt: 'Neblina azulada cobrindo morros atrás de um alambrado',
      caption: 'Neblina chegando na serra',
      width: 1920,
      height: 1440,
    },
    tagline: 'Pra garoa e pra serra.',
    blurb: 'Varsity, moletom pesado e gorro. Peças grossas pra garoa da cidade e a neblina da serra.',
  },
  {
    id: 'primavera-26',
    name: 'Primavera 26',
    drop: 'Drop 04',
    when: 'Set 2026',
    launch: '2026-09-22T19:00:00-03:00',
    end: '2026-09-30T23:59:59-03:00',
    accent: '#ffe14d',
    cut: '035',
    hotspots: [{ slug: 'camiseta-cinza-oversized', x: 50, y: 30 }],
    place: {
      src: '/img/primavera-ipe.jpg',
      alt: 'Flor amarela de ipê caída sobre folhas secas',
      caption: 'Flor de ipê-amarelo no chão',
      width: 1400,
      height: 1050,
    },
    tagline: 'Nove dias de drop.',
    blurb: 'Oversized lavado, cores de terra e onça. Coleção curta, nove dias no ar.',
  },
  {
    id: 'outubro-rosa-26',
    name: 'Outubro Rosa',
    drop: 'Drop 05',
    when: 'Out 2026',
    launch: '2026-10-01T10:00:00-03:00',
    end: '2026-10-31T23:59:59-03:00',
    accent: '#ff3d8b',
    cut: '041',
    hotspots: [
      { slug: 'moletom-rosa-oversized', x: 50, y: 24 },
      { slug: 'calca-moletom-rosa', x: 38, y: 62 },
    ],
    place: {
      src: '/img/hero-congresso-rosa.jpg',
      alt: 'Cúpula e torres do Congresso Nacional iluminadas de rosa na noite de Brasília',
      caption: 'Congresso Nacional iluminado de rosa, outubro',
      width: 1920,
      height: 1280,
    },
    tagline: 'Rosa choque. No ar agora.',
    blurb: 'Conjunto de moletom rosa, camiseta preta com laço e gorro. Parte de cada peça vai para a prevenção do câncer de mama.',
  },
  {
    id: 'verao-27',
    name: 'Verão 27',
    drop: 'Drop 06',
    when: 'Nov 2026',
    launch: '2026-11-06T19:00:00-03:00',
    end: '2027-03-01T23:59:59-03:00',
    accent: '#c6ff2e',
    cut: '068',
    hotspots: [
      { slug: 'camiseta-off-white', x: 52, y: 20 },
      { slug: 'cargo-laranja', x: 46, y: 56 },
    ],
    place: {
      src: '/img/verao-calcadao.jpg',
      alt: 'Calçadão de Copacabana com as ondas de pedra portuguesa preta e branca',
      caption: 'Calçadão de Copacabana, Rio de Janeiro',
      width: 1920,
      height: 1082,
    },
    tagline: 'Cargo laranja e calçadão.',
    blurb: 'Off-white oversized, cargo laranja e bucket listrado. Drop numa sexta, às 19h, só no site.',
  },
];

export const byId = (id: string) => COLLECTIONS.find((c) => c.id === id);
