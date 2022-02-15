import serial_arduino
import parse_command

class vending_machine:
    def __init__(self, id, slots):
        self.id = id
        self.arduino = serial_arduino.arduino_serial()  # "/dev/ttyUSB0")
        self.slots = slots

    def init_arduino(self):
        self.arduino.list_ports()
        self.arduino.set_serial("/dev/ttyACM0")
        #self.arduino.toggle_joystick()

    def vend_index(self, index):
        if index >= len(self.slots):
            return False
    
        slot = self.slots[index]

        if slot["amount"] <= 0:
            return False

        maxSize = parse_command.auto_home(self.arduino)
        self.arduino.set_max(maxSize)
        parse_command.home(self.arduino, 0)
        parse_command.move(self.arduino, slot["x"], slot["y"])
        parse_command.spin(self.arduino)

        print(slot)

    