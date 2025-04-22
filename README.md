# 📦 Device Manager Backend

API RESTful para gerenciamento de dispositivos e categorias, desenvolvida com **NestJS**, utilizando **Clean Architecture**, **TypeORM** e banco de dados **MySQL**.

---

## 🧱 Arquitetura

Este projeto segue os princípios da **Clean Architecture**, garantindo baixo acoplamento, alta coesão e separação de responsabilidades.

```
src/
├─ application/       → Módulos da aplicação (injeção de dependência, etc.)
├─ core/
│  ├─ domain/         → Entidades e contratos (interfaces dos repositórios)
│  └─ usecases/       → Casos de uso (regra de negócio)
├─ infrastructure/
│  ├─ database/       → Implementações concretas de repositórios, ORM, seeders, migrations
├─ presentation/
│  └─ http/           → Camada de entrega (controllers, dtos)
├─ main.ts            → Entry point da aplicação
```

> Cada camada depende apenas de camadas mais internas, mantendo o princípio da inversão de dependência.

---

## ⚙️ Tecnologias utilizadas

- **NestJS**
- **TypeScript**
- **TypeORM**
- **MySQL**
- **Jest** (testes unitários e e2e)
- **Docker** / **Docker Compose**

---

## 🚀 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/NortonLiaz88/device-manager-backend.git

# Instale as dependências
yarn

# Copie o arquivo .env
cp .env.example .env

# Suba os containers
docker-compose up -d

# Rode as migrations
yarn typeorm migration:run

# (Opcional) Rode o seeder
yarn seed
```

---

## 🧪 Testes e cobertura

Para rodar os testes unitários e e2e:

```bash
# Testes unitários
yarn test

# Testes com cobertura
yarn test:cov
```

### 📊 Coverage

Badge local de cobertura (gerado com Jest):

![coverage](./coverage/badge.svg)

> O badge será gerado automaticamente em `./coverage/badge.svg` após rodar `yarn test:cov`. Para isso, adicione o seguinte script:

```json
"scripts": {
  ...
  "test:cov": "jest --coverage && cp coverage/lcov-report/badge.svg coverage/badge.svg"
}
---

## 🗂 Estrutura de pastas

Veja a estrutura completa [aqui](#) ou visualize abaixo um resumo:

```
src/
├─ application/modules/{category,device}
├─ core/{domain,usecases}
├─ infrastructure/database/{orm,seed,mappers,repositories}
├─ presentation/http/{controllers,dtos}
```

---

## 📝 Scripts úteis

```bash
# Start em dev
yarn start:dev

# Compilar
yarn build

# Testes
yarn test

# Testes com coverage
yarn test:cov

# Rodar seed
yarn seed

# Rodar migrations
yarn typeorm migration:run
```

---

## 📬 Contribuindo

Pull requests são bem-vindos. Para grandes mudanças, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.

---

## 🪪 Licença

[MIT](LICENSE)
