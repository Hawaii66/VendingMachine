def auto_home(arduino):
    arduino.send_text("Auto")
    
    home_text = ""
    while True:
        ser = get_string(arduino)
        
        if "Homing done" in ser:
            home_text = ser
            break

    split = home_text.split("\t")
    xMax = int(split[len(split) - 2])
    yMax = int(split[len(split) - 1])
    return (xMax, yMax)


def home(arduino, depth):
    if depth == 5:
        return False
    arduino.send_text("Home")
    
    while True:
        ser = get_string(arduino)

        if ser == "Home":
            return True
        elif ser == "Auto home first":
            auto_home(arduino)
            return home(arduino, depth - 1)
    

def get_string(arduino):
    while True:
        ser = arduino.read_line()
        ser = ser.decode("utf-8")
        ser = strip_end(ser)
        
        return ser


def strip_end(text):
    text = text.replace("\r","")
    text = text.replace("\n","")
    return text