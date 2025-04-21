# Etapa 1: Build
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json yarn.lock ./

# Instala dependências do projeto
RUN yarn install --frozen-lockfile

# Instala ferramentas globais usadas durante a build
RUN yarn global add typescript ts-node tsconfig-paths

# Copia os arquivos do projeto
COPY . .

# Compila o projeto TypeScript para JavaScript
RUN yarn build

# Etapa 2: Produção
FROM node:22.14.0-alpine

WORKDIR /app

# Copia apenas o necessário da build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Executa a aplicação NestJS compilada
CMD ["node", "dist/src/main"]
