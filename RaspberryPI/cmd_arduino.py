import serial_arduino
import parse_command
import serial_arduino

import sys

def main():
    args = sys.argv[1:]

    arduino = serial_arduino.arduino_serial()
    arduino.list_ports()
    arduino.set_serial("/dev/ttyACM0")

    for i in range(len(args)):
        args[i] = args[i].lower()

    if args[0] == "ena":
        if len(args) != 2:
            print("Correct: python3 cmd_arduino.py ena true")
        elif args[1] == "false":
            parse_command.ena(arduino, False)
        elif args[1] == "true":
            parse_command.ena(arduino, True)
        else:
            print("Wrong 2 cmd: false / true")
    elif args[0] == "auto":
        maxSize = parse_command.auto_home(arduino)
        arduino.set_max(maxSize)
    elif args[0] == "move":
        if len(args) != 3:
            print("Correct: python3 cmd_arduino.py move 10 10")
        else:
            xCoord = int(args[1])
            yCoord = int(args[2])
            maxSize = parse_command.auto_home(arduino)
            arduino.set_max(maxSize)
            parse_command.move(arduino, xCoord, yCoord)
    elif args[0] == "home":
        parse_command.home(arduino, 0)
    elif args[0] == "spin":
        parse_command.spin(arduino)
    else:
        print("Wrong cmd")


if __name__ == "__main__":
    main()
