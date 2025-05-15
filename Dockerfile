# Etapa 1: Build do React (Vite)
FROM node:18 AS builder

WORKDIR /app

RUN git clone https://github.com/hamada-minoro/geomundi-flow-control.git .

RUN npm install
RUN npm run build

# Etapa 2: Imagem final leve, só com o servidor de arquivos
FROM node:18-alpine

WORKDIR /app

# Instala o "serve" para rodar o app
RUN npm install -g serve

# Copia só o build final para esta imagem
COPY --from=builder /app/dist .

# Expõe a porta padrão
EXPOSE 8422

# Comando para rodar o servidor
CMD ["serve", "-s", ".", "-l", "8422"]
