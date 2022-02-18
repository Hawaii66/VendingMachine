import serial_arduino
import parse_command
import gpio_interface

class vending_machine:
    def __init__(self, id, slots):
        self.id = id
        self.arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
        self.slots = slots
        self.gpio = gpio_interface.gpio()

    def init_arduino(self):
        self.arduino.list_ports()
        self.arduino.set_serial("/dev/ttyACM0")

    def get_arduino(self):
        return self.arduino

    def vend_index(self, index):
        if index >= len(self.slots):
            return False
    
        slot = self.slots[index]

        if slot["amount"] <= 0:
            return False

        success = False
        tries = 0
        while tries < 3 and success == False:
            parse_command.ena(self.arduino, True)
            
            maxSize = parse_command.auto_home(self.arduino)
            self.arduino.set_max(maxSize)
            parse_command.home(self.arduino, 0)
            parse_command.move(self.arduino, slot["x"], slot["y"])
            parse_command.ena(self.arduino, False) #Turn off axis motors to allow Z axis to hook better
            success = parse_command.spin_dist(self)
            tries += 1

        if success == True:
            print("Candy reached customer")
        elif tries >= 3:
            print("Tries exeded max, candy stuch in machine after 3 tries")
        else:
            print("Something went terribly wrong, shouldn't happen")

    