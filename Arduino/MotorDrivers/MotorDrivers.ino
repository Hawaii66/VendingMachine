// Define pin connections & motor's steps per revolution
const int dirPin1 = 2;
const int stepPin1 = 3;
const int dirPin2 = 4;
const int stepPin2 = 5;
const int homeButtonPin = 6;
const int spinButtonPin = 7;
const int spinMotorPins[] = {
	8, 9, 10, 11};

const bool motorSteps[] = {
	HIGH,
	LOW,
	LOW,
	LOW,
	LOW,
	HIGH,
	LOW,
	LOW,
	LOW,
	LOW,
	HIGH,
	LOW,
	LOW,
	LOW,
	LOW,
	HIGH};

const int stepsPerRevolution = 20;

const int inputX = A0;
const int inputY = A1;
const int startXStop = A2;
const int endXStop = A3;
const int startYStop = A4;
const int endYStop = A5;

const int deadZone = 50;

bool knowPos = false;
int currentX = 0;
int currentY = 0;
int stopX = 0;
int stopY = 0;
bool dirX = false;
bool dirY = false;

bool debug = false;
bool joystick = true;

void setup()
{
	// Declare pins as Outputs
	pinMode(stepPin1, OUTPUT);
	pinMode(dirPin1, OUTPUT);
	pinMode(stepPin2, OUTPUT);
	pinMode(dirPin2, OUTPUT);

	for (int i = 0; i < (sizeof(spinMotorPins) / sizeof(spinMotorPins[0])); i++)
	{
		pinMode(spinMotorPins[i], OUTPUT);
	}

	digitalWrite(dirPin1, HIGH);
	digitalWrite(dirPin2, HIGH);

	Serial.begin(115200);
}

void loop()
{
	if (digitalRead(homeButtonPin) == HIGH)
	{
		Serial.println("Button");
		AutoHome();
	}

	if (digitalRead(spinButtonPin) == HIGH)
	{
		Serial.println("Spin");
		SpinFull();
	}

	if (Serial.available() > 0)
	{
		String incoming = Serial.readString();

		if (incoming.startsWith("Debug"))
		{
			if (debug == false)
			{
				debug = true;
			}
			else
			{
				debug = false;
			}
		}

		if (incoming.startsWith("Auto"))
		{
			AutoHome();
		}

		if (incoming.startsWith("Home"))
		{
			if (knowPos == true)
			{
				MoveYX(0, 0);
				Serial.println("Home");
			}
			else
			{
				Serial.println("Auto home first");
			}
		}

		if (incoming.startsWith("Move"))
		{
			if (knowPos == true)
			{
				int index = 0;
				int x = -1;
				int y = -1;
				String work = "";
				bool isCoord = false;

				incoming += " ";

				while (index < incoming.length())
				{
					if (incoming.charAt(index) == ' ')
					{
						if (isCoord == false)
						{
							isCoord = true;
							index += 1;
							continue;
						}
						else
						{
							if (x == -1)
							{
								x = work.toInt();
								work = "";
								isCoord = false;
								continue;
							}
							else
							{
								y = work.toInt();
								break;
							}
							isCoord = false;
						}
					}

					if (isCoord == true)
					{
						work += incoming.charAt(index);
					}

					index += 1;
				}

				if (knowPos == true)
				{
					if (x < 0)
					{
						x = 0;
					}
					if (y < 0)
					{
						y = 0;
					}
					if (x > stopX)
					{
						x = stopX;
					}
					if (y > stopY)
					{
						y = stopY;
					}
				}

				MoveXY(x, y);
				Serial.print("Done moving to: ");
				Serial.print("\t");
				Serial.print(x);
				Serial.print("\t");
				Serial.println(y);
			}
			else
			{
				Serial.println("Auto home first");
			}
		}

		if (incoming.startsWith("Spin"))
		{
			SpinFull();
			Serial.println("Spin Done");
		}

		if (incoming.startsWith("Joystick"))
		{
			if (joystick == false)
			{
				joystick = true;
			}
			else
			{
				joystick = false;
			}
		}
	}

	if (joystick == true)
	{
		JoyStickMovement();
	}

	if (debug == true)
	{
		Serial.print(currentX);
		Serial.print("\t");
		Serial.println(currentY);
	}
}

void SpinFull()
{
	for (int j = 0; j < 512; j++)
	{
		for (int i = 0; i < 4; i++)
		{
			digitalWrite(spinMotorPins[0], motorSteps[i * 4 + 0]);
			digitalWrite(spinMotorPins[1], motorSteps[i * 4 + 1]);
			digitalWrite(spinMotorPins[2], motorSteps[i * 4 + 2]);
			digitalWrite(spinMotorPins[3], motorSteps[i * 4 + 3]);
			delay(10);
		}
	}

	digitalWrite(spinMotorPins[0], LOW);
	digitalWrite(spinMotorPins[1], LOW);
	digitalWrite(spinMotorPins[2], LOW);
	digitalWrite(spinMotorPins[3], LOW);
}

void MoveYX(int x, int y)
{
	if (x < currentX)
	{
		SetDir(0, LOW);
	}
	else
	{
		SetDir(0, HIGH);
	}

	if (y < currentY)
	{
		SetDir(1, LOW);
	}
	else
	{
		SetDir(1, HIGH);
	}

	while (y != currentY)
	{
		StepMotor(1, 1);
	}

	while (x != currentX)
	{
		StepMotor(0, 1);
	}
}

void MoveXY(int x, int y)
{
	if (x < currentX)
	{
		SetDir(0, LOW);
	}
	else
	{
		SetDir(0, HIGH);
	}

	if (y < currentY)
	{
		SetDir(1, LOW);
	}
	else
	{
		SetDir(1, HIGH);
	}

	while (x != currentX)
	{
		StepMotor(0, 1);
	}

	while (y != currentY)
	{
		StepMotor(1, 1);
	}
}

void JoyStickMovement()
{
	int xVal = analogRead(inputX);
	int yVal = analogRead(inputY);

	if (xVal < deadZone)
	{
		SetDir(0, HIGH);
		StepMotor(0, stepsPerRevolution);
	}
	if (xVal > 1023 - deadZone)
	{
		SetDir(0, LOW);
		StepMotor(0, stepsPerRevolution);
	}
	if (yVal < deadZone)
	{
		SetDir(1, LOW);
		StepMotor(1, stepsPerRevolution);
	}
	if (yVal > 1023 - deadZone)
	{
		SetDir(1, HIGH);
		StepMotor(1, stepsPerRevolution);
	}
}

void AutoHome()
{
	bool xPos = true;
	bool xNeg = true;
	bool yPos = false;
	bool yNeg = true;

	knowPos = false;
	currentX = 0;
	currentY = 0;
	stopX = 0;
	stopY = 0;

	Serial.print("Auto home\t");

	int defS = 0;

	// Y -
	if (yNeg == true)
	{
		defS = analogRead(startYStop);
		int startYS = defS;
		SetDir(1, LOW);
		while (startYS > defS - 100)
		{
			StepMotor(1, 1);
			startYS = analogRead(startYStop);
		}
	}

	currentY = 0;

	Serial.print("Y-");
	Serial.print("\t");

	// Y +
	if (yPos)
	{
		defS = analogRead(endYStop);
		int endYS = defS;
		SetDir(1, HIGH);
		while (endYS > defS - 100)
		{
			StepMotor(1, 1);
			endYS = analogRead(endYStop);
		}
		stopY = currentY;
	}
	else
	{
		stopY = 5000;
	}

	// X -
	if (xPos == true)
	{
		defS = analogRead(startXStop);
		int startXS = defS;
		SetDir(0, LOW);
		while (startXS > defS - 100)
		{
			StepMotor(0, 1);
			startXS = analogRead(startXStop);
		}
	}

	currentX = 0;

	Serial.print("X-");
	Serial.print("\t");

	// X +
	if (xNeg == true)
	{
		defS = analogRead(endXStop);
		int endXS = defS;
		SetDir(0, HIGH);
		while (endXS > defS - 100)
		{
			StepMotor(0, 1);
			endXS = analogRead(endXStop);
		}
		stopX = currentX;
	}
	else
	{
		stopX = 5000;
	}

	Serial.print("X+");
	Serial.print("\t");

	Serial.print("Y+");
	Serial.print("\t");
	Serial.print("Homing done: \t");
	Serial.print(stopX);
	Serial.print("\t");
	Serial.print(stopY);
	Serial.println("");

	knowPos = true;
}

void SetDir(int index, bool dir)
{
	int pin = GetMotorDir(index);

	if (dir == true)
	{
		digitalWrite(pin, HIGH);
	}
	else
	{
		digitalWrite(pin, LOW);
	}

	if (index == 0)
	{
		dirX = dir;
	}
	if (index == 1)
	{
		dirY = dir;
	}
}

void StepBoth(int steps)
{
	int xPin = GetMotorStep(0);
	int yPin = GetMotorStep(1);

	for (int i = 0; i < steps; i++)
	{
		if (CheckPosAllowed(0) == false)
		{
			return;
		}
		if (CheckPosAllowed(1) == false)
		{
			return;
		}

		digitalWrite(xPin, HIGH);
		digitalWrite(yPin, HIGH);
		delayMicroseconds(2500);
		digitalWrite(xPin, LOW);
		digitalWrite(yPin, LOW);
		delayMicroseconds(2500);
	}
}

bool CheckPosAllowed(int index)
{
	if (index == 0)
	{
		if (dirX == true)
		{
			currentX += 1;
		}
		else
		{
			currentX -= 1;
		}

		if (currentX < 0 && knowPos)
		{
			currentX = 0;
			return false;
		}
		if (currentX > stopX && knowPos)
		{
			currentX = stopX;
			return false;
		}
	}
	if (index == 1)
	{
		if (dirY == true)
		{
			currentY += 1;
		}
		else
		{
			currentY -= 1;
		}

		if (currentY < 0 && knowPos)
		{
			currentY = 0;
			return false;
		}
		if (currentY > stopY && knowPos)
		{
			currentY = stopY;
			return false;
		}
	}

	return true;
}

void StepMotor(int index, int steps)
{
	int pin = GetMotorStep(index);

	for (int i = 0; i < steps; i++)
	{
		if (CheckPosAllowed(index) == false)
		{
			return;
		}

		digitalWrite(pin, HIGH);
		delayMicroseconds(2500);
		digitalWrite(pin, LOW);
		delayMicroseconds(2500);
	}
}

int GetMotorStep(int index)
{
	if (index == 0)
	{
		return stepPin1;
	}
	if (index == 1)
	{
		return stepPin2;
	}
}
int GetMotorDir(int index)
{
	if (index == 0)
	{
		return dirPin1;
	}
	if (index == 1)
	{
		return dirPin2;
	}
}
