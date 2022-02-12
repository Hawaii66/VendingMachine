import serial
import serial.tools.list_ports as port_list


class arduino_serial:
    def __init__(self):
        self.serial = -1

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
        self.serial.baudrate = 9600
        self.serial.open()

        self.serial.readline()

    def list_ports(self):
        ports = list(port_list.comports())
        for p in ports:
            print(p)

    def readLine(self):
        return self.serial.readline()

    def __del__(self):
        if self.serial != -1:
            self.serial.close()

    def auto(self):
        self.send_text("123")
        print(self.serial.readline())

    def send_text(self, text):
        print(f"Sending text to serial: {text}")
        self.serial.write(text.encode())
