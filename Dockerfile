# Tonho e Gabi: site em React + TypeScript (Vite).
# Duas etapas: compila com Node e serve os arquivos estáticos com o `serve` (Node), sem nginx.

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

RUN npm install --global serve@14.2.4 && npm cache clean --force

COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node serve.json ./serve.json

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" > /dev/null || exit 1

# -s: devolve o index.html para rotas do React Router (/loja, /loja/moletom-laco...)
# -c: cabeçalhos de cache em serve.json (caminho relativo à pasta servida)
CMD ["sh", "-c", "serve -s dist -c ../serve.json -l tcp://0.0.0.0:${PORT} --no-port-switching"]
