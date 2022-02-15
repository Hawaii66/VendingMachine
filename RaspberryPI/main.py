import serial_arduino
import parse_command
import machine
import fetch
from time import sleep
from dotenv import dotenv_values

def main():
    config = dotenv_values(".env")
    sleepTime = int(config["SLEEP_TIME"])
    machineID = config["MACHINE_ID"]

    fetch.test()
    
    print(f"Starting with index: {machineID}")

    vend = machine.vending_machine("1644692876708:724184:machine",[
        {
            "index":0,
            "amount":3,
            "x":230,
            "y":1760
        }
    ])
    vend.init_arduino()
    sleep(1)

    while True:
        order = fetch.get_one_order()
        if order == False:
            sleep(sleepTime)
        else:
            exec_order(vend, order)

def exec_order(vend, order):
    index = order["order"]["slotIndex"]
    print(index)
    vend.vend_index(index)


if __name__ == "__main__":
    main()
