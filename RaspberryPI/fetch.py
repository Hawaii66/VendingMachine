import requests
from dotenv import dotenv_values

def get_url(end):
    config = dotenv_values(".env")
    url = config["SERVER_URL"]
    return f"{url}{end}"

def get_all_orders():
    config = dotenv_values(".env")
    rasp_secret = config["RASP_SECRET"]
    machineID = config["MACHINE_ID"]
    url = get_url(f"/rasp/orders/{machineID}")
    headers = {'authorization': f"Bearer {rasp_secret}"}
    r = requests.get(url=url,headers=headers)
    response = r.json()

def get_one_order():
    config = dotenv_values(".env")
    rasp_secret = config["RASP_SECRET"]
    machineID = config["MACHINE_ID"]
    url = get_url(f"/rasp/order/{machineID}")
    headers = {'authorization': f"Bearer {rasp_secret}"}
    r = requests.get(url=url,headers=headers)
    if r.status_code == 200:
        return r.json()
    else:
        return False
def test():
    url = get_url("/")
    r = requests.get(url=url)
    print(r.status_code)
    print(r.text)
