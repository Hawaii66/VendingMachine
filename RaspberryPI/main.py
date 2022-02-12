import serial_arduino
import parse_command

def main():
    print("Working")
    arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
    arduino.list_ports()
    arduino.set_serial("/dev/ttyACM0")

    while True:
        inp = input("Send Serial: ")
        
        if inp == "Auto":
            maxSize = parse_command.auto_home(arduino)
            arduino.set_max(maxSize)
        elif inp == "Home":
            parse_command.home(arduino, 0)



if __name__ == "__main__":
    main()
