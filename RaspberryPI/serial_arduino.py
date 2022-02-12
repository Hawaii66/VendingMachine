import serial
import serial.tools.list_ports as port_list


class arduino_serial:
    def __init__(self):
        self.serial = -1

    def set_serial(self, usb_path):
        self.serial = serial.Serial(usb_path)

    def list_ports(self):
        ports = list(port_list.comports())
        for p in ports:
            print(p)

    def __del__(self):
        if self.serial != -1:
            self.serial.close()

    def auto(self):
        self.send_text("Spin")
        print(self.serial.readline())

    def send_text(self, text):
        print(f"Sending text to serial: {text}")
        self.serial.write(text.encode())
        self.serial.flush()
