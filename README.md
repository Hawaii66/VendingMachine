Arduino upload code through CLI:

When in folder home/pi/Desktop/VendingMachine/VendingMachine/Arduino

arduino-cli compile -b arduino:avr:uno /home/pi/Desktop/VendingMachine/VendingMachine/Arduino/MotorDrivers

arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno MotorDrivers