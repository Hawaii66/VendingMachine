import serial_arduino


def main():
    print("Working")
    arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
    arduino.set_serial("/dev/ttyACM0")
    arduino.list_ports()
    arduino.auto()


if __name__ == "__main__":
    main()
