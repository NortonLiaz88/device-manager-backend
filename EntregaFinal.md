## 🧾 Device Manager – Entrega Final

### 📦 Visão Geral

O **Device Manager** é uma aplicação web para gerenciamento de dispositivos e categorias, com frontend em Angular e backend em NestJS, seguindo Clean Architecture. Todo o sistema está hospedado na AWS com infraestrutura escalável.

---

### 🚀 Tecnologias Utilizadas

- **Frontend**: Angular 17, Angular Material
- **Backend**: NestJS + TypeORM
- **Banco de Dados**: MySQL (RDS AWS)
- **Deploy**: Docker + EC2 (frontend/backend)
- **Infraestrutura**: AWS EC2 + RDS + Security Groups configurados
- **Seeder**: 100 categorias + 300 dispositivos (faker.js)
- **Testes**: Jest + Supertest

---

### 🛠 Funcionalidades

#### 📁 Categorias
- Listagem paginada
- Criação de categoria com validação (`nome obrigatório, máx. 128 caracteres`)
- Exclusão de categoria

#### ⚙️ Dispositivos
- Listagem paginada com busca
- Criação de dispositivo com validações:
  - Cor (letras apenas, máx. 16 caracteres)
  - Número de peça (inteiro positivo)
  - Categoria obrigatória
- Exclusão de dispositivo

#### 🎨 Interface
- Barra lateral para navegação
- Busca com debounce
- Layout moderno e responsivo

---

### 🧪 Testes

- Cobertura com Jest (> 70%)
- Testes unitários para repositórios e casos de uso
- Testes e2e com SQLite para isolamento

---

### 🌐 Deploy

#### Backend:
- Deploy em EC2 com Docker
- Porta: `3000`
- Documentação: [http://18.188.215.0:3000/docs](http://18.188.215.0:3000/docs)

#### Frontend:
- Deploy em EC2 com Nginx (porta `4200`)
- Acesso público: [http://18.188.215.0:4200](http://18.188.215.0:4200)

#### Banco de Dados:
- MySQL 8 rodando em RDS
- Acesso restrito por IP
- Dados populados automaticamente via seeder

#### Repositórios:
- Frontend: [https://github.com/NortonLiaz88/device-manager-frontend](https://github.com/NortonLiaz88/device-manager-frontend)
- Backend: [https://github.com/NortonLiaz88/device-manager-backend](https://github.com/NortonLiaz88/device-manager-backend)

---

### ✅ Checklist Final

- [x] Funcionalidades implementadas
- [x] Layout conforme especificação
- [x] Banco com seed
- [x] Testes realizados
- [x] Deploy em ambiente de produção
- [x] Comunicação entre frontend/backend via endpoint real
