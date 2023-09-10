#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>
#include <AsyncJson.h>
#include "wifi_credentials.h"
#include "SPIFFS.h"

AsyncWebServer server(80);

void notFound(AsyncWebServerRequest *request)
{
  if (request->method() == HTTP_OPTIONS)
  {
    request->send(200);
  }
  else
  {
    request->send(404, "application/json", "{\"message\":\"Not found\"}");
  }
}

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("BOOTED");

  WiFi.mode(WIFI_AP);
  WiFi.softAP(SSID, PASSWORD);

  if (!MDNS.begin("nutshell"))
  {
    Serial.println("Error setting up MDNS responder!");
  }
  else
  {
    Serial.println("mDNS responder started");
  }

  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  else
  {
    Serial.println("SPIFFS mounted successfully");
  }

  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");
  server.serveStatic("/static/", SPIFFS, "/");

  server.on("/api", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "application/json", "{\"message\":\"Hello World\"}");
  });

  server.onNotFound(notFound);

  server.begin();
}

void loop()
{
  // put your main code here, to run repeatedly:
}
