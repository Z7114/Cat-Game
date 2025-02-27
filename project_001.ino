#include <MPR121.h>
#include <Wire.h>

#define numElectrodes 12

int light = A0;
int ldrValue;
int sensorValue;

void setup() {
  Serial.begin( 9600 );
  Wire.begin();

  // Setup MPR121
  MPR121.begin( 0x5A );
  MPR121.setInterruptPin( 4 ); // ?
  MPR121.setTouchThreshold( 40 );
  MPR121.setReleaseThreshold( 20 );

  // set up LDR
  pinMode(light, INPUT);

}

void loop() {
  // Check for new data
  MPR121.updateTouchData();
  MPR121.updateFilteredData();

  // **
  // LDR output
  ldrValue = analogRead(light);
  Serial.print(analogRead(light));
  Serial.print(" , ");

  // sensor output
  sensorValue = digitalRead(MPR121.getFilteredData(2));
  Serial.print(sensorValue);
  Serial.println("");
  delay(50);
  // **

}



