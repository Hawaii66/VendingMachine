import serial
import serial.tools.list_ports as port_list
from time import sleep


class arduino_serial:
    def __init__(self):
        self.serial = -1
        self.xMax = 0
        self.yMax = 0
        self.joystick = True

    def __del__(self):
        if self.serial != -1:
            self.serial.close()

    def set_max(self,pos):
        self.xMax = pos[0]
        self.yMax = pos[1]

    def flushInput(self):
        self.serial.flushInput()

    def set_serial(self, usb_path):
        self.serial = serial.Serial()
        self.serial.port = usb_path
        self.serial.parity = serial.PARITY_NONE
        self.serial.bytesize = serial.EIGHTBITS
        self.serial.stopbits = serial.STOPBITS_ONE
        self.serial.timeout = 2
        self.serial.xonxoff = False
        self.serial.rtscts = False
        self.serial.dsrdtr = False
        self.serial.baudrate = 115200
        self.serial.open()

        self.serial.readline()
        sleep(1)

    def list_ports(self):
        ports = list(port_list.comports())
        for p in ports:
            print(p)

    def read_line(self):
        return self.serial.readline()

    def toggle_joystick(self):
        self.send_text("joystick")
        self.joystick = not self.joystick

    def auto(self):
        self.send_text("123")
        print(self.serial.readline())

    def send_text(self, text):
        print(f"Sending text to serial: {text}")
        self.serial.write(text.encode())
