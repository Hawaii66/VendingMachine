import serial
import serial.tools.list_ports as port_list


class arduino_serial:
    def __init__(self, usb_path):
        self.serial = serial.Serial(usb_path)

    def __del__(self):
        self.serial.close()

    def auto(self):
        self.send_text("auto")
        print(self.serial.readline())

    def send_text(self, text):
        print(f"Sending text to serial: {text}")
        self.serial.write("%d" % (str(text)))
        self.serial.flush()
