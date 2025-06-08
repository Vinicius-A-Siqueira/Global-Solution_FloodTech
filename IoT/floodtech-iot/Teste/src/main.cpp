#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "A55 de Vinicius";
const char* password = "12345678";

const char* mqttServer = "mqtt3.thingspeak.com";
const int mqttPort = 1883;
const char* mqttUser = "vinicius@comunidadec3.com.br";
const char* mqttPassword = "Ft551939";
const char* mqttTopic = "channels/2984045/publish/1C810GXR5BPPA6OV";

WiFiClient espClient;
PubSubClient client(espClient);

const int trigPin = 5;       
const int echoPin = 18;       
const int umidadePin = 34;    
const int chuvaPin = 35;      
const int buzzerPin = 21;     

const float limiteAgua = 25.0;    
const int limiteUmidade = 70;     
const bool alertaChuva = true;      

// Protótipos das funções que serão definidas depois
float medirDistanciaCM();
void reconnect();

void setup() {
  Serial.begin(115200);

  // Configura os pinos
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(chuvaPin, INPUT);

  // Conecta ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado ao WiFi!");

  // Configura o MQTT
  client.setServer(mqttServer, mqttPort);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  // === LEITURA DOS SENSORES ===
  float nivelAgua = medirDistanciaCM();
  int umidadeBruta = analogRead(umidadePin);
  int umidadePorcento = map(umidadeBruta, 4095, 0, 0, 100); // inverso: solo seco = valor alto
  bool chuvaDetectada = digitalRead(chuvaPin) == LOW;

  // === EXIBE NO MONITOR SERIAL ===
  Serial.println("--- DADOS COLETADOS ---");
  Serial.printf("Nível da água: %.2f cm\n", nivelAgua);
  Serial.printf("Umidade do solo: %d%%\n", umidadePorcento);
  Serial.printf("Chuva detectada: %s\n", chuvaDetectada ? "SIM" : "NÃO");

  // === ALERTA LOCAL PELO BUZZER ===
  if (nivelAgua < limiteAgua && umidadePorcento > limiteUmidade && chuvaDetectada == alertaChuva) {
    digitalWrite(buzzerPin, HIGH);
  } else {
    digitalWrite(buzzerPin, LOW);
  }

  // === ENVIO DE DADOS PARA O THINGSPEAK ===
  String payload = "field1=" + String(nivelAgua, 2)
                 + "&field2=" + String(umidadePorcento)
                 + "&field3=" + String(chuvaDetectada ? 1 : 0);

  client.publish(mqttTopic, payload.c_str());
  Serial.println("Dados enviados via MQTT!");
  Serial.println("-------------------------\n");

  delay(10000); // espera 10 segundos para a próxima leitura
}

// === FUNÇÃO PARA MEDIR DISTÂNCIA (nível da água) ===
float medirDistanciaCM() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duracao = pulseIn(echoPin, HIGH);
  float distancia = duracao * 0.034 / 2;
  return distancia;
}

// === FUNÇÃO PARA RECONEXÃO MQTT ===
void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect("FloodTechESP32", mqttUser, mqttPassword)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("Erro: ");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}
