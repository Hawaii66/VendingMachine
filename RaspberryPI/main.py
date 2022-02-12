import serial_arduino
import parse_command
import machine
from time import sleep

def main():
    print("Working")
    #arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
    #arduino.list_ports()
    #arduino.set_serial("/dev/ttyACM0")
    #arduino.toggle_joystick()
    #parse_command.auto_home(arduino)
    vend = machine.vending_machine([
        {
            "index":0,
            "amount":3,
            "x":230,
            "y":1760
        }
    ])
    vend.init_arduino()
    sleep(1)
    vend.vend_index(0)

    #arduino = vend.arduino

    #while True:
    #    inp = input("Send Serial: ")
    #    
    #    if inp == "Auto":
    #        maxSize = parse_command.auto_home(arduino)
    #        arduino.set_max(maxSize)
    #    elif inp == "Home":
    #        parse_command.home(arduino, 0)
    #    elif inp == "Spin":
    #        parse_command.spin(arduino)
    #    #elif inp == "Debug":
    #    #    parse_command.debug(arduino, 100)
    #    elif inp == "Joystick":
    #        arduino.toggle_joystick()
    #    elif "Move" in inp:
    #        split = inp.split(" ")
    #        parse_command.move(arduino, int(split[1]), int(split[2]))



if __name__ == "__main__":
    main()
