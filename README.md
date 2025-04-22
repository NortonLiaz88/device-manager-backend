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

```
device-manager
├─ 📁src
│  ├─ 📁application
│  │  └─ 📁modules
│  │     ├─ 📁category
│  │     │  └─ 📄category.module.ts
│  │     └─ 📁device
│  │        └─ 📄device.module.ts
│  ├─ 📁core
│  │  ├─ 📁domain
│  │  │  ├─ 📁entities
│  │  │  │  ├─ 📄category.entity.ts
│  │  │  │  ├─ 📄device-with-category.ts
│  │  │  │  └─ 📄device.entity.ts
│  │  │  └─ 📁repositories
│  │  │     ├─ 📄category.repository.ts
│  │  │     └─ 📄device.repository.ts
│  │  └─ 📁usecases
│  │     ├─ 📁category
│  │     │  ├─ 📄create-category.use-case.ts
│  │     │  ├─ 📄delete-category.use-case.ts
│  │     │  ├─ 📄find-all-categories.use-case.ts
│  │     │  ├─ 📄find-category-by-id.use-case.ts
│  │     │  ├─ 📄paginated-categories.use-case.ts
│  │     │  └─ 📄update-category.use-case.ts
│  │     └─ 📁device
│  │        ├─ 📄create-device.usecase.ts
│  │        ├─ 📄delete-device.usecase.ts
│  │        ├─ 📄get-all-devices.usecase.ts
│  │        ├─ 📄get-device-by-id.usecase copy.ts
│  │        ├─ 📄get-device-by-id.usecase.ts
│  │        ├─ 📄get-paginated-devices.usecase.ts
│  │        └─ 📄update-device.usecase.ts
│  ├─ 📁infrastructure
│  │  └─ 📁database
│  │     ├─ 📁mappers
│  │     │  └─ 📄category.mapper.ts
│  │     ├─ 📁orm
│  │     │  ├─ 📁config
│  │     │  │  ├─ 📄data.source.ts
│  │     │  │  └─ 📄typeorm.config.ts
│  │     │  ├─ 📁entities
│  │     │  │  ├─ 📄category.orm-entity.ts
│  │     │  │  └─ 📄device.orm-entity.ts
│  │     │  ├─ 📁migrations
│  │     │  │  └─ 📄1745264945775-init-db.ts
│  │     │  ├─ 📁scripts
│  │     │  │  └─ 📄populate.ts
│  │     │  └─ 📁seed
│  │     │     ├─ 📄category.seed.ts
│  │     │     └─ 📄device.seed.ts
│  │     └─ 📁repositories
│  │        ├─ 📄device.typeorm.repository.ts
│  │        └─ 📄typeorm-category.repository.ts
│  ├─ 📁presentation
│  │  └─ 📁http
│  │     ├─ 📁controllers
│  │     │  ├─ 📄category.controller.ts
│  │     │  └─ 📄device.controller.ts
│  │     └─ 📁dtos
│  │        ├─ 📁category
│  │        │  ├─ 📄category-query.dto.ts
│  │        │  ├─ 📄create-category.dto.ts
│  │        │  └─ 📄update-category.dto.ts
│  │        └─ 📁device
│  │           ├─ 📄create-device.dto.ts
│  │           ├─ 📄device-response.dto.ts
│  │           ├─ 📄paginate-device-query.dto.ts
│  │           └─ 📄update-device.dto.ts
│  ├─ 📄app.module.ts
│  ├─ 📄app.service.ts
│  └─ 📄main.ts
├─ 📁test
│  ├─ 📁core
│  │  └─ 📁domain
│  │     ├─ 📁entities
│  │     │  ├─ 📄category.entity.spec.ts
│  │     │  └─ 📄device.entity.spec.ts
│  │     └─ 📁usecases
│  │        ├─ 📁category
│  │        │  ├─ 📄create-category.use-case.spec.ts
│  │        │  ├─ 📄delete-category.use-case.spec.ts
│  │        │  ├─ 📄find-all-categories.use-case.spec.ts
│  │        │  ├─ 📄find-category-by-id.use-case.spec.ts
│  │        │  ├─ 📄paginated-categories.use-case.spec.ts
│  │        │  └─ 📄update-category.use-case.spec.ts
│  │        └─ 📁device
│  │           ├─ 📄create-device.usecase.spec.ts
│  │           ├─ 📄get-all-devices.usecase.spec.ts
│  │           ├─ 📄get-device-by-id.usecase.spec.ts
│  │           ├─ 📄get-paginated-devices.usecase.spec.ts
│  │           └─ 📄update-device.usecase.spec.ts
│  ├─ 📁e2e
│  │  └─ 📁category
│  │     ├─ 📄create-category.e2e-spec.ts
│  │     ├─ 📄delete-device.usecase.spec.ts
│  │     ├─ 📄paginated-category.e2e-spec.ts
│  │     └─ 📄update-delete-category.e2e-spec.ts
│  ├─ 📁http
│  │  └─ 📁controllers
│  │     ├─ 📄category.controller.spec.ts
│  │     └─ 📄device.controller.spec.ts
│  ├─ 📁infrastructure
│  │  ├─ 📁database
│  │  │  ├─ 📁mappers
│  │  │  │  └─ 📄category.mapper.spec.ts
│  │  │  └─ 📁repositories
│  │  │     ├─ 📄category.repository.spec.ts
│  │  │     └─ 📄device.repository.spec.ts
│  │  └─ 📁orm
│  │     └─ 📄sqlite-test-datasource.ts
│  ├─ 📁mocks
│  │  ├─ 📄category.repository.mock.ts
│  │  └─ 📄device.repository.mock.ts
│  ├─ 📁utils
│  │  ├─ 📄setup-2e2-app.ts
│  │  └─ 📄to-plain.ts
│  └─ 📄jest-e2e.json
├─ 📄.env.example
├─ 📄.eslintrc.js
├─ 📄.gitignore
├─ 📄.prettierrc
├─ 📄Dockerfile
├─ 📄EntregaFinal.md
├─ 📄EntregaFinal.pdf
├─ 📄README.md
├─ 📄docker-compose.yml
├─ 📄jest.config.ts
├─ 📄nest-cli.json
├─ 📄package.json
├─ 📄tsconfig.build.json
├─ 📄tsconfig.json
└─ 📄yarn.lock
```