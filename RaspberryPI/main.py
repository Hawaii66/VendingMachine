import serial_arduino
import parse_command
import machine
import fetch
from time import sleep
import time
from dotenv import dotenv_values

def main():
    config = dotenv_values(".env")
    sleepTime = int(config["SLEEP_TIME"])
    machineID = config["MACHINE_ID"]

    print("Starting up with a test")

    #fetch.test()

    print(f"Starting with index: {machineID}")

    vend = machine.vending_machine("1644692876708:724184:machine",[
        {
            "index":0,
            "amount":3,
            "x":240,
            "y":1900
        }
    ])
    vend.init_arduino()
    sleep(1)

    while True:
        order = fetch.get_one_order()
        if order == False:
            low_mode(vend, sleepTime)
        else:
            exec_order(vend, order)

def exec_order(vend, order):
    index = order["order"]["slotIndex"]
    print(index)
    vend.vend_index(index)


def low_mode(vend, elap):
    start_time = time.time()
    count = start_time

    while count < start_time + elap:
        ser = parse_command.get_string(vend.get_arduino())
        if "Send Req" in ser:
            break
        
        count = time.time()
        if count >= start_time + elap:
            break
    
if __name__ == "__main__":
    main()
