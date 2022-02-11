import serial_arduino


def main():
    arduino = serial_arduino.arduino_serial("COM5")  # "/dev/ttyUSB0")
    arduino.auto()


if __name__ == "__main__":
    main()
