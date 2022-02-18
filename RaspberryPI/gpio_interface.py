import time
import RPi.GPIO as GPIO

class gpio:
    def __init__(self):
        self.dist_trigger = 17
        self.dist_echo = 4

        GPIO.setmode(GPIO.BCM)

        GPIO.setup(self.dist_trigger, GPIO.OUT)
        GPIO.setup(self.dist_echo, GPIO.IN)

    def __del__(self):
        GPIO.cleanup()

    def get_dist(self):
        GPIO.output(self.dist_trigger, True)
        time.sleep(0.00001)
        GPIO.output(self.dist_trigger, False)

        start_time = time.time()
        stop_time = time.time()
        count = 0
        while GPIO.input(self.dist_echo) == 0:
            start_time = time.time()

            count += 1
            if count > 10000:
                return 0

        count = 0
        while GPIO.input(self.dist_echo) == 1:
            stop_time = time.time()

            count += 1
            if count > 10000:
                return 0
        
        time_elap = stop_time - start_time
        # multiply with the sonic speed (34300 cm/s)
        # and divide by 2, because there and back
        distance = (time_elap * 34300) / 2

        return distance