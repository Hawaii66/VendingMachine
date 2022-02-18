from time import sleep
import time
from dotenv import dotenv_values

def auto_home(arduino):
    arduino.send_text("Auto")
    
    home_text = ""
    while True:
        ser = get_string(arduino)
        print(ser)
        if "Homing done" in ser:
            home_text = ser
            break

    split = home_text.split("\t")
    xMax = int(split[len(split) - 2])
    yMax = int(split[len(split) - 1])
    return (xMax, yMax)

def ena(arduino, mode):
    arduino.send_text("Ena")

    while True:
        ser = get_string(arduino)
        
        if ("1" in ser) and mode == True:
            break
        elif ("0" in ser) and mode == False:
            break
        elif "Motors state:" in ser:
            arduino.send_text("Ena")

def move(arduino, x, y):
    print(f"Move: {x} {y}")
    arduino.send_text(f"Move {x} {y}")

    while True:
        ser = get_string(arduino)
        print(ser)
        if "Done moving to" in ser:
            return


def debug(arduino, time):
    arduino.send_text("Debug")
    sleep(0.1)
    count = 0
    while count < time:
        ser = get_string(arduino)
        sleep(0.5)
        split = ser.split("\t")
        if len(split) == 2:
            xCoord = int(split[0])
            yCoord = int(split[1])
            print(f"{xCoord} : {yCoord}")
        else:
            print("Error receving bytes")

        count += 1
    arduino.send_text("Debug")

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


def spin(arduino):
    arduino.send_text("Spin")

    while True:
        ser = get_string(arduino)

        if ser == "Spin Done":
            return True


def spin_dist(vend):
    config = dotenv_values(".env")
    default_dist = int(config["DIST_DEF"])
    diff = int(config["DIST_DIFF"])

    arduino = vend.get_arduino()
    arduino.send_text("Spin")

    distances = []

    while True:
        if arduino.get_serial().inWaiting() > 0:
            ser = get_string(arduino)

            if ser == "Spin Done":
                break

        dist = vend.gpio.get_dist()
        distances.append(dist)
    
    start_time = time.time()

    while time.time() - start_time < 7:
        dist = vend.gpio.get_dist()
        distances.append(dist)
        sleep(0.001)

    for i in range(len(distances)):
        dist = distances[i]

        if dist < default_dist - diff and dist != 0:
            print("Found candy")
            return True

    print("No candy found")
    return False

def get_string(arduino):
    while True:
        try:
            ser = arduino.read_line()
            ser = ser.decode("utf-8")
            ser = strip_end(ser)
        except UnicodeDecodeError:
            return ""  
        return ser

def strip_end(text):
    text = text.replace("\r","")
    text = text.replace("\n","")
    return text