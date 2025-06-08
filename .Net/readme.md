
# 🌊 FloodTech API

> API RESTful para gerenciamento de abrigos, ocorrências e alertas em áreas de risco de enchentes urbanas. Parte do projeto interdisciplinar **Global Solution - FIAP 2025**.

---

## 📌 Visão Geral

A **FloodTech** é uma solução inovadora para a gestão inteligente de enchentes urbanas. Esta API foi construída em **.NET 8** com arquitetura **Clean Architecture + DDD**, persistindo dados em **Oracle Database**.

Ela permite:

- Cadastrar e consultar **abrigos** com base em localização e capacidade.
- Registrar e buscar **ocorrências** de enchentes.
- Criar e consultar **alertas** para áreas afetadas.
- Integração futura com sensores IoT e sistemas de notificação.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- Oracle Database (local ou remoto)
- Visual Studio 2022 ou VS Code

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Vinicius-A-Siqueira/Global-Solution_FloodTech
cd floodtech-api
```

2. **Configure a string de conexão no `appsettings.json`:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "User Id=RM557879;Password=030506;Data Source=oracle.fiap.com.br:1521/ORCL"
  }
}
```

3. **Execute a aplicação**
```bash
dotnet restore
dotnet build
dotnet run --project FloodTech.API
```

4. **Acesse o Swagger**
```
http://localhost:5000/swagger
```

---

## 🔎 Endpoints Disponíveis (via Swagger)

- `GET /api/abrigos` → Lista todos os abrigos
- `GET /api/abrigos/{id}` → Detalhes do abrigo por ID
- `POST /api/abrigos` → Cadastrar novo abrigo
- `GET /api/abrigos/bairro/{bairro}` → Buscar abrigos por bairro
- `GET /api/abrigos/capacidade/{min}` → Abrigos com capacidade mínima
- (outros endpoints em desenvolvimento: alertas, ocorrências, usuários)

---

## 🧪 Exemplos de Teste no Swagger

### ✅ Criar novo abrigo
```
POST /api/abrigos
```
```json
{
  "nome": "Abrigo Municipal Zona Leste",
  "capacidade": 120,
  "disponivel": true,
  "localizacaoId": 1
}
```

### 🔍 Buscar abrigos por bairro
```
GET /api/abrigos/bairro/Santana
```

---

## 🧪 Testes Realizados

- Testes manuais via Swagger para todos endpoints principais.
- Testes com dados reais do Oracle.
- Testes de erro (ID inexistente, campos obrigatórios, etc).

---

## 📹 Vídeos

- 🎬 **Demonstração Técnica:**  
  [https://youtu.be/8afP2jNZ5a0?si=QX9f6OUyEQvtcppF](https://youtu.be/8afP2jNZ5a0?si=QX9f6OUyEQvtcppF)

- 🎤 **Pitch da Solução:**  
  [https://youtu.be/-g2nAuaVbzM?si=tE73YpLhvrAsqNo0](https://youtu.be/-g2nAuaVbzM?si=tE73YpLhvrAsqNo0)


