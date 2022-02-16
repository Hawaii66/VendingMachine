import requests
from dotenv import dotenv_values

r = requests.get("https://www.google.com")
print("Google Status: " + str(r.status_code))

config = dotenv_values(".env")
url = config["SERVER_URL"]
r = requests.get(url)
print(r.status_code)
