# Tonho e Gabi — site de coleções e loja

React 19 + TypeScript + Vite, animações com GSAP (ScrollTrigger) e rolagem suave com Lenis.
A home é o calendário de coleções (Outubro Rosa, Verão, Inverno, Arraiá, Primavera…) em visual
brutalista/streetwear; a loja fica em `/loja`, com página de produto, compra rápida e sacola.

## Rodar

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/
```

### Docker (sem nginx)

A imagem compila com Node e serve `dist/` com o [`serve`](https://github.com/vercel/serve), também em Node.

```bash
docker compose up --build            # produção em http://localhost:3000
docker compose --profile dev up dev  # desenvolvimento com recarga em http://localhost:5173
```

Ou sem compose:

```bash
docker build -t tonho-e-gabi-site .
docker run -p 3000:3000 tonho-e-gabi-site
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Coleções, datas de drop, cor neon, modelo recortado e pontos de preço | `src/data/collections.ts` |
| Produtos, preços, tamanhos, foto principal e foto do hover | `src/data/products.ts` |
| Fotos de produto (`public/img/looks/<id>.webp`) e modelos recortados (`public/img/cut/<id>.webp`) | `public/img/` |
| Créditos das fotos e do vídeo | `src/data/credits.ts` (página `/creditos`) |
| Cores e tamanhos de letra gerais | `src/styles/base.css` (`:root`) |

**O site veste a coleção do mês.** `src/lib/calendar.ts` escolhe a coleção “no ar” pela data de hoje e o
`ThemeContext` aplica a cor neon dela no site inteiro (e troca o modelo do topo). Nas coleções e no
calendário da home, “Vestir o site” troca na hora. Para ver o site em outra data: `http://localhost:5173/?hoje=2026-12-10`.

## Antes de publicar

- **Conteúdo de exemplo:** nomes de peças, preços, tecidos, datas de drop, a doação do Outubro Rosa, frete
  grátis a partir de R$ 299 e parcelamento em 3x precisam ser confirmados pela marca.
- **Fotos de produto e modelos:** são fotos provisórias do Unsplash (licença Unsplash, uso comercial livre),
  com o fundo recortado para o efeito de “modelo solto”. Trocar pelo ensaio da marca: basta substituir os
  arquivos em `public/img/looks` e `public/img/cut` mantendo os nomes, ou mudar os ids nos dados. Algumas
  fotos mostram estampas de outras marcas e não podem ir ao ar assim.
- **Checkout:** “Fechar pedido” abre um e-mail já preenchido para `pedidos@tonhoegabi.com.br`. Ligar um meio de
  pagamento (Mercado Pago, Stripe, Shopify…) antes de vender de verdade.
- **Contatos:** e-mails e links de Instagram, TikTok e WhatsApp no rodapé são provisórios.
- **Fotos de lugares e vídeo:** vêm do Wikimedia Commons (CC BY, CC BY-SA, CC0 e domínio público) e mostram o
  que inspirou cada coleção. Todos os créditos estão em `/creditos`.
