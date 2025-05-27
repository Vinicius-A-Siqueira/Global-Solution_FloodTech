# 🧭 Arquitetura do Projeto FLOODTECH

Este documento apresenta a visão completa da arquitetura do sistema **FLOODTECH**, uma plataforma inteligente para gestão de enchentes urbanas. A arquitetura está dividida em quatro camadas principais: Visão de Arquitetura, Arquitetura de Negócio, Arquitetura de Sistemas e Arquitetura de Tecnologia.

---

## 🔷 1. Visão de Arquitetura

### 🎯 Stakeholders

- **Governo / Defesa Civil** – Interesse em monitoramento e resposta rápida.
- **População Afetada** – Usuários finais do aplicativo.
- **Equipe Técnica** – Desenvolvedores e mantenedores das APIs, banco de dados, IoT e mobile.
- **ONGs e Instituições de Apoio** – Auxílio em zonas de risco.
- **Parceiros de Infraestrutura (Cloud, Telecom)** – Garantem conectividade e disponibilidade da plataforma.

### 🥅 Objetivos

- Criar um sistema integrado para monitorar e responder rapidamente a desastres naturais.
- Fornecer alertas em tempo real à população.
- Mapear zonas de risco com dados IoT e imagens de satélite.
- Centralizar dados de sensores, previsões meteorológicas e status da infraestrutura urbana.

### 📋 Requisitos

- Sistema de alta disponibilidade e escalabilidade.
- APIs RESTful interoperáveis (Java e .NET).
- Integração com sensores IoT (ESP32 + Node-RED).
- Aplicativo mobile multiplataforma (React Native).
- Armazenamento e análise de dados em Oracle + MongoDB.
- Comunicação segura e com autenticação (ex: JWT).
- Backend estruturado em domínios (DDD - Domain Driven Design).

---

## 🔷 2. Arquitetura de Negócio

### 👥 Atores

- Cidadão
- Operador da Defesa Civil
- Administrador da Plataforma
- Equipe Técnica
- Parceiros Externos

### 🧩 Funções e Papéis

- **Cidadão**: consulta alertas, envia localização, acessa pontos de apoio.
- **Operador**: cadastra ocorrências, monitora sensores, atua em crises.
- **Administrador**: gerencia permissões e define zonas de risco.
- **Técnicos**: mantêm os sistemas e garantem a conectividade.
- **Parceiros**: fornecem dados externos e apoio logístico.

### 🔄 Processos de Negócio

- Registro e verificação de incidentes (manual ou via IoT).
- Emissão de alertas geolocalizados.
- Atualização do status de áreas afetadas.
- Consulta de rotas seguras e pontos de abrigo.
- Geração de relatórios para planejamento e prevenção.

---

## 🔷 3. Arquitetura de Sistemas

### 🧱 Camadas e Componentes

#### Apresentação (Front-end)

- **App Mobile**: React Native com Expo
- **Portal Web**: Acesso administrativo para gestão e visualização

#### Aplicação (Back-end)

- **API Java (Spring Boot)**: Gerenciamento de usuários, alertas, sensores.
- **API .NET 8**: Geolocalização, rotas, dados de infraestrutura.

#### Serviços (Integração e IoT)

- **Node-RED**: Coleta de dados dos sensores (ESP32).
- **Mensageria**: MQTT ou HTTP para comunicação com sensores.
- **Serviço de Mapas**: Ex: Leaflet ou Mapbox para visualização geoespacial.

#### Dados

- **Oracle DB**: Dados estruturados (usuários, ocorrências, registros, logs, sensores, imagens).
---

## 🔷 4. Arquitetura de Tecnologia

### 🌐 Conectividade e Equipamentos

- **Redes**:
  - Wi-Fi e 4G para dispositivos móveis.
  - Rede LAN para sensores/câmeras em áreas de risco.
  - VPN entre APIs e bancos de dados.
  - HTTPS com autenticação via JWT.

### 📱 Devices de Acesso

- Smartphones (usuários finais e operadores).
- Notebooks (acesso administrativo).
- Placas ESP32 com sensores DHT11/DHT22, GPS e câmeras.

### 💻 Servidores e Softwares

- Backend em contêineres Docker (Java + .NET).
- Node-RED em Raspberry Pi ou nuvem (Heroku, AWS EC2).
- Oracle DB servidores Linux (VMs ou cloud).
- Sistemas operacionais: Ubuntu Server, Windows 11 (administração).

### 🛠️ Softwares Necessários por Perfil

| Perfil         | Softwares Necessários                             |
|----------------|---------------------------------------------------|
| Desenvolvedores| VS Code, Docker, Node.js, Postman                 |
| Servidores     | Java 21, .NET SDK 8, Docker Engine, Node-RED      |
| Administradores| Navegador web, VPN Client, App Mobile instalado   |

---

> Este documento faz parte da entrega de arquitetura do projeto interdisciplinar **Global Solution FIAP 2025**.
