# 📦 Device Manager Backend

API RESTful para gerenciamento de **dispositivos** e **categorias**, construída com **NestJS** e baseada em **Clean Architecture**. Utiliza **TypeORM** para persistência de dados em um banco **MySQL**.

---

## 🧱 Arquitetura do Projeto

Este projeto segue os princípios da **Clean Architecture**, promovendo:

- Baixo acoplamento entre camadas
- Separação clara de responsabilidades
- Testabilidade e manutenção facilitadas

```
src/
├─ application/         → Módulos da aplicação (injeção de dependência)
├─ core/
│  ├─ domain/           → Entidades e contratos (interfaces dos repositórios)
│  └─ usecases/         → Regras de negócio
├─ infrastructure/
│  └─ database/         → Repositórios, ORM, seeders, migrations
├─ presentation/
│  └─ http/             → Controllers, DTOs e entrada/saída HTTP
└─ main.ts              → Ponto de entrada da aplicação
```

> Cada camada externa depende apenas de camadas mais internas, seguindo o princípio da inversão de dependência.

---

## ⚙️ Tecnologias Utilizadas

- **NestJS**
- **TypeScript**
- **TypeORM**
- **MySQL**
- **Jest** (testes unitários e e2e)
- **Docker / Docker Compose**

---

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/NortonLiaz88/device-manager-backend.git

# Instale as dependências
yarn

# Copie o arquivo de ambiente
cp .env.example .env

# Suba os containers
docker-compose up -d

# Rode as migrations
yarn typeorm migration:run

# (Opcional) Rode os seeders
yarn seed
```

---

## 🧪 Testes

```bash
# Executar testes unitários
yarn test

# Executar testes com cobertura
yarn test:cov
```

---

## 📜 Scripts Disponíveis

```bash
# Ambiente de desenvolvimento
yarn start:dev

# Build
yarn build

# Testes
yarn test
# Testes com cobertura
yarn test:cov

# Seeders
yarn seed

# Migrations
yarn typeorm migration:run
```

---

## 📬 Contribuições

Pull requests são bem-vindos! Para grandes mudanças, por favor, abra uma issue primeiro para discutirmos.

---

## 🪪 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

