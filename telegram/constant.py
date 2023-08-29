from os import environ

TOKEN_BOT:str = environ.get('TOKEN_BOT')

GATEWAY_ID:str = environ.get('GATEWAY_ID')

questions:list = [
    "Какой ваш возраст ?",
    "Какой стаж работы ?",
    "Сумма ежемесячных платежей по действующим кредитам ?",
    "Какой у вас сейчас доход ?",
    "Количество действующих кредитов ?"
]

data_questions:list = [
    "age",
    "experience",
    "monthlyCreditPayments",
    "monthlyIncome",
    "openLoans"
]

data_buttons:dict = {
    
}

list_emoji:list = ["\U0001F54A","\U0001F435", "\U0001F607"]

url_send_message:str = f"https://api.telegram.org/bot{TOKEN_BOT}/sendMessage"

url_get_data_products:str = f"https://{GATEWAY_ID}.apigw.yandexcloud.net/data"
