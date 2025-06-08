# 🌊 FloodTech - Configuração do ThingSpeak (Gateway MQTT)

Este guia descreve como configurar o ThingSpeak para receber dados via MQTT da solução IoT FloodTech com ESP32.

---

## 🔧 1. Criar um Canal no ThingSpeak

1. Acesse: https://thingspeak.com
2. Clique em "Channels" > "New Channel"
3. Preencha:
   - **Name:** FloodTech ESP32
   - **Field 1:** Nivel da Água (cm)
   - **Field 2:** Umidade do Solo (%)
   - **Field 3:** Chuva (1=Sim / 0=Não)
4. Salve e anote o `Channel ID`.

---

## 🔐 2. Obter as credenciais MQTT

1. Vá em "Channel Settings" > Aba "API Keys"
2. Copie o `Write API Key`
3. Acesse: [MQTT Configuration](https://thingspeak.com/account)
4. Copie:
   - **MQTT Username**
   - **MQTT Password**
   - **Client ID** (opcional)

---

## 📡 3. Configurar o ESP32 (no código)

Substitua no `floodtech_esp32.ino`:

```cpp
const char* mqttUser = "SEU_MQTT_USERNAME";
const char* mqttPassword = "SEU_MQTT_PASSWORD";
const char* mqttTopic = "channels/SEU_CHANNEL_ID/publish/SEU_API_WRITE_KEY";
