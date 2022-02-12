import serial_arduino


def main():
    print("Working")
    arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
    # arduino.set_serial("/dev/ttyACM0")
    arduino.set_serial("COM5")
    # arduino.list_ports()
    # arduino.auto()
    arduino.send_text("Auto")

    while True:
        val = None
        while not val:
            val = arduino.readLine()
            print(val)
        print(val)


if __name__ == "__main__":
    main()
