// Créditos de fotos e vídeo. Nada disso é da marca:
// - fotos de modelos (Unsplash, licença Unsplash) são provisórias até o ensaio próprio;
// - fotos de lugares e o vídeo (Wikimedia Commons) mostram o que inspirou cada coleção.

export interface Credit {
  file: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
  via: 'Unsplash' | 'Wikimedia Commons';
}

const UNSPLASH_LICENSE = 'https://unsplash.com/license';

const u = (file: string, slug: string, creator: string, title: string): Credit => ({
  file,
  title,
  creator: `@${creator}`,
  license: 'Licença Unsplash',
  licenseUrl: UNSPLASH_LICENSE,
  page: `https://unsplash.com/photos/${slug}`,
  via: 'Unsplash',
});

export const CREDITS: Credit[] = [
  u('041', 'a-blonde-woman-poses-in-an-oversized-pink-tracksuit-4ywQOCAl2XI', 'olaszkolda', 'Conjunto rosa oversized'),
  u('042', 'a-woman-in-a-pink-tracksuit-on-a-pink-background-2XC-i05hZF0', 'seguntoriola', 'Conjunto rosa em fundo rosa'),
  u('047', 'blonde-woman-in-a-pink-oversized-hoodie-and-sweatpants-j8d_vXKKVjU', 'olaszkolda', 'Moletom e calça rosa'),
  u('032', 'young-woman-in-pink-tracksuit-pulling-up-her-hoodie-g49VXct90u8', 'olaszkolda', 'Conjunto rosa com capuz'),
  u('049', 'smiling-woman-in-pink-sweatsuit-adjusts-her-pink-sneaker-OBmX2WMUNdg', 'olaszkolda', 'Conjunto rosa no sofá'),
  u('052', 'blonde-woman-in-pink-hoodie-and-sweatpants-on-blue-sofa-zJVqsareRlg', 'olaszkolda', 'Moletom rosa sentada'),
  u('050', 'man-wearing-a-pink-beanie-and-hoodie-at-sunset-rc5dZsE3Ufk', 'sanpablico', 'Gorro rosa'),
  u('061', 'person-wearing-oversized-black-t-shirt-sKGxVtKAGx0', 'enginakyurt', 'Camiseta preta oversized'),
  u('059', 'a-woman-wearing-a-black-shirt-jeeVeM86xKw', 'alichoubin', 'Camiseta preta'),
  u('062', 'woman-wearing-oversized-white-t-shirt-HCiYNVJWMBo', 'enginakyurt', 'Camiseta branca oversized'),
  u('058', 'woman-in-white-crew-neck-shirt-and-black-jacket-wearing-sunglasses-tT6k5S0fvxs', 'mediamodifier', 'Camiseta branca e jaqueta'),
  u('068', 'woman-in-oversized-white-tee-and-orange-pants-poses-l1Qx95KnqVg', 'antonkwibowo', 'Camiseta branca e cargo laranja'),
  u('073', 'woman-in-red-white-and-black-striped-polo-shirt-wearing-blue-hat-2yTP55qHk_k', 'aedrian', 'Bucket jeans'),
  u('071', 'woman-in-white-red-and-blue-shirt-wearing-green-hat-RlnvkAjO7mM', 'aedrian', 'Bucket verde'),
  u('067', 'young-person-in-white-tank-top-and-dark-pants-l2mABomI_-A', 'sarim_naqvi', 'Regata branca'),
  u('038', 'woman-in-tank-top-and-baggy-jeans-wePLgr6wZHc', 'monbestmedia', 'Regata e jeans largo'),
  u('009', 'young-woman-in-baseball-cap-and-varsity-jacket-with-backpack-iJZug8YHNB8', 'metujiiiiiiin', 'Jaqueta varsity'),
  u('029', 'man-in-striped-hoodie-with-hands-in-pockets-JQFP4C8drlE', '1hundredimages', 'Moletom listrado'),
  u('031', 'man-in-hoodie-sunglasses-and-gloves-with-headphones-3Svd3RRnB3s', 'blackscorpionmusic', 'Moletom cinza'),
  u('027', 'young-woman-in-grey-sweatsuit-stands-in-a-retro-room-CYEjtXJKJt0', 'olaszkolda', 'Conjunto cinza'),
  u('025', 'a-young-woman-in-a-white-hoodie-and-black-pants-Dcv_ddRPZq0', 'justbeingblythe', 'Moletom branco'),
  u('005', 'man-in-hoodie-and-jeans-adjusts-sunglasses-while-sitting-fRuyDoyQAfU', 'chriscreations__', 'Moletom branco no banco'),
  u('078', 'a-man-with-dreadlocks-wearing-a-red-hat-t3R6M_9GVRY', 'visionspinners', 'Gorro vermelho'),
  u('017', 'man-wearing-glasses-and-a-baseball-cap-h8fFkXvG8ng', 'erwimadethis', 'Jaqueta clara'),
  u('003', 'man-in-red-and-white-jacket-sitting-on-concrete-stairs-KPp3WEMt2es', 'meriane092', 'Camisa xadrez'),
  u('056', 'man-in-black-crew-neck-t-shirt-and-blue-denim-jeans-standing-beside-white-wall-6OGml3UomZw', 'behrouzsasani', 'Camiseta preta'),
  u('040', 'man-in-black-t-shirt-and-shorts-with-sunglasses-13eaC9bFjGQ', 'pjayth3kreator', 'Camiseta preta e bermuda'),
  u('035', 'a-young-woman-in-an-oversized-t-shirt-and-sneakers-xsattfek-7A', 'antonkwibowo', 'Camiseta cinza oversized'),
  u('063', 'a-young-woman-in-an-oversized-t-shirt-necklace-and-sneakers-9he5ZokXW5A', 'antonkwibowo', 'Camiseta cinza oversized'),
  u('065', 'a-woman-standing-in-front-of-a-brown-wall-Lou0kwYmxoE', 'melbinjacob', 'Camisa de onça'),
  u('001', 'a-young-man-with-a-hat-on-his-head-J-YQ36vC2F8', 'baileyal3xander', 'Camiseta branca em preto e branco'),
  {
    file: 'hero-congresso-rosa.jpg',
    title: 'Congresso Nacional - Outubro Rosa (51551764893)',
    creator: 'Senado Federal',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
    page: 'https://commons.wikimedia.org/wiki/File:Congresso_Nacional_-_Outubro_Rosa_(51551764893).jpg',
    via: 'Wikimedia Commons',
  },
  {
    file: 'verao-calcadao.jpg',
    title: 'Calçadão de Copacabana',
    creator: 'Mteixeira62',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    page: 'https://commons.wikimedia.org/wiki/File:Cal%C3%A7ad%C3%A3o_de_Copacabana.JPG',
    via: 'Wikimedia Commons',
  },
  {
    file: 'verao-copacabana-1950.jpg',
    title: 'Vista aérea da praia de Copacabana, com uma parte do calçadão destruído pela ressaca (007ALA111)',
    creator: 'Núcleo de digitalização / Instituto Moreira Salles',
    license: 'Domínio público',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Vista_a%C3%A9rea_da_praia_de_Copacabana,_com_uma_parte_do_cal%C3%A7ad%C3%A3o_destru%C3%ADdo_pela_ressaca_(007ALA111).jpg',
    via: 'Wikimedia Commons',
  },
  {
    file: 'inverno-neblina.jpg',
    title: 'Neblina Chegando 02',
    creator: 'Carlos César Fracasso',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    page: 'https://commons.wikimedia.org/wiki/File:Neblina_Chegando_02.JPG',
    via: 'Wikimedia Commons',
  },
  {
    file: 'arraia-bandeirinhas.jpg',
    title: 'Bandeirinhas - Quermesse da Paróquia São Paulo da Cruz - Igreja do Calvário 2023',
    creator: 'Amialves23',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    page: 'https://commons.wikimedia.org/wiki/File:Bandeirinhas_-_Quermesse_da_Par%C3%B3quia_S%C3%A3o_Paulo_da_Cruz_-_Igreja_do_Calv%C3%A1rio_2023.jpg',
    via: 'Wikimedia Commons',
  },
  {
    file: 'primavera-ipe.jpg',
    title: 'Flor do Ipê amarelo - panoramio',
    creator: 'Zelma Brito',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    page: 'https://commons.wikimedia.org/wiki/File:Flor_do_Ip%C3%AA_amarelo_-_panoramio.jpg',
    via: 'Wikimedia Commons',
  },
  {
    file: 'serigrafia.webm',
    title: 'Tirage blouse (sérigraphie), trecho de 12 segundos',
    creator: '4MAPS',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    page: 'https://commons.wikimedia.org/wiki/File:Tirage_blouse_(s%C3%A9rigraphie).webm',
    via: 'Wikimedia Commons',
  },
];
