
# FloodTech API - Documentação

## Links dos repositórios com os códigos fontes

- [Repositório Backend Java FloodTech](https://github.com/Vinicius-A-Siqueira/Global-Solution_FloodTech/)

---

## Endpoints principais da API

Base URL: `http://localhost:8080/api`

### Usuários
- `GET /usuarios` - Listar todos os usuários
- `GET /usuarios/{id}` - Buscar usuário por ID
- `POST /usuarios` - Criar novo usuário
- `PUT /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Excluir usuário

### Perfis
- `GET /perfis` - Listar todos os perfis
- `GET /perfis/{id}` - Buscar perfil por ID
- `POST /perfis` - Criar novo perfil
- `PUT /perfis/{id}` - Atualizar perfil
- `DELETE /perfis/{id}` - Excluir perfil

### Alertas
- `GET /alertas` - Listar todos os alertas
- `GET /alertas/{id}` - Buscar alerta por ID
- `POST /alertas` - Criar novo alerta
- `PUT /alertas/{id}` - Atualizar alerta
- `DELETE /alertas/{id}` - Excluir alerta

### Ocorrências
- `GET /ocorrencias` - Listar todas as ocorrências
- `GET /ocorrencias/{id}` - Buscar ocorrência por ID
- `POST /ocorrencias` - Criar nova ocorrência
- `PUT /ocorrencias/{id}` - Atualizar ocorrência
- `DELETE /ocorrencias/{id}` - Excluir ocorrência

### Localizações
- `GET /localizacoes` - Listar todas as localizações
- `GET /localizacoes/{id}` - Buscar localização por ID
- `POST /localizacoes` - Criar nova localização
- `PUT /localizacoes/{id}` - Atualizar localização
- `DELETE /localizacoes/{id}` - Excluir localização

---

## Instruções para acesso e testes

### Requisitos
- Java 17+
- Maven 3+
- Oracle Database configurado com esquema e tabelas conforme modelagem
- Postman ou qualquer cliente REST para testar endpoints

### Como executar a API

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/floodtech-api.git
   cd floodtech-api
   ```

2. Configure o arquivo `application.properties` ou `application.yml` com os dados da sua conexão Oracle.

3. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```

4. A API estará disponível em `http://localhost:8080/api`

---

### Testes com curl

- Listar usuários:
  ```bash
  curl -X GET http://localhost:8080/api/usuarios
  ```

- Criar novo usuário:
  ```bash
  curl -X POST http://localhost:8080/api/usuarios -H "Content-Type: application/json" -d '{"username":"usuario1", "senha":"1234"}'
  ```

- Atualizar perfil:
  ```bash
  curl -X PUT http://localhost:8080/api/perfis/4 -H "Content-Type: application/json" -d '{"id":4,"usuarioId":4,"nomeCompleto":"Marina Costa","endereco":"Av. D, 321, São Paulo - SP","telefonePessoal":"11999999966","telefoneEmergencia":"11888888855"}'
  ```

---

### Autenticação

- A API utiliza autenticação via JWT Bearer token.
- Para obter token, faça login no endpoint `/auth/login` (se implementado).
- Use o token no header:
  ```
  Authorization: Bearer <token>
  ```

---

### Swagger UI

- Documentação interativa dos endpoints disponível em:
  ```
  http://localhost:8080/swagger-ui/index.html
  ```
