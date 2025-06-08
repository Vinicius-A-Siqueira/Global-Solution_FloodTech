# 🌊 FloodTech - Configuração do ThingSpeak (Gateway MQTT)

Este guia descreve como configurar o ThingSpeak para receber dados via MQTT da solução IoT FloodTech com ESP32.

---
## ☁️ ThingSpeak

Dados enviados via **MQTT** para o canal:

- Channel ID: `2984045`
- Campos:
  - `field1`: Nível da água (cm)
  - `field2`: Umidade do solo (%)
  - `field3`: Chuva detectada (0 = não, 1 = sim)

## 🔐 Credenciais

```cpp
const char* ssid = "Wifi";
const char* password = "Senha";

const char* mqttServer = "mqtt3.thingspeak.com";
const int mqttPort = 1883;
const char* mqttUser = "emial";
const char* mqttPassword = "Senha";
const char* mqttTopic = "channels/2984045/publish/1C810GXR5BPPA6OV";

Substitua no `floodtech_esp32.ino`:

```cpp
const char* mqttUser = "SEU_MQTT_USERNAME";
const char* mqttPassword = "SEU_MQTT_PASSWORD";
const char* mqttTopic = "channels/SEU_CHANNEL_ID/publish/SEU_API_WRITE_KEY";
