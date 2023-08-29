import json
from random import choice

import requests

from constant import questions, data_questions, data_buttons, list_emoji, url_send_message, url_get_data_products


user_data:dict = {}

def process_question(chat_id:str, user_id:str, user_first_name:str, text:str)->None:
    if user_id not in user_data:
        user_data[user_id]:dict = {'count_questions': 0, 'answers': {}}

    count_question:int = user_data[user_id]['count_questions']
    if text.lower() == "/start":
        user_data[user_id]['count_questions'] = 0
        user_data[user_id]['count_questions'] += 1
        send_message(chat_id, f"Привет! {user_first_name} Добро пожаловать в нашего бота. Начнем опрос.", data_buttons.get(count_question))
        send_message(chat_id, questions[count_question], data_buttons.get(count_question))
    elif count_question <= len(questions):
        if text.isdigit():
            user_data[user_id]['answers'][data_questions[count_question - 1]] = text
            user_data[user_id]['count_questions'] += 1
            send_message(chat_id, questions[count_question], data_buttons.get(count_question))
        else:
            send_message(chat_id, "Пожалуйста, введите корректное число.")
    else:
        send_message(chat_id, "Спасибо за предоставленную информацию! \nПопробуем попробуем подобрать лучшие условия для вас")
        show_loans(chat_id,user_id)

def handle_view_data(chat_id:str, user_id:str):
    user_data:dict = view_data(user_id)
    send_message(chat_id,
        f"""
        Ваши данные: 
        {user_data}
        """)

def view_data(user_id):
    if user_id in user_data:
        return user_data[user_id]['answers']
    else:
        return "Данные пользователя не найдены."

def send_message(chat_id:str, text:str, buttons:str=None)->json:
    if buttons:
        button_markup = {
            "keyboard": buttons,
            "resize_keyboard": True,
            "one_time_keyboard": True
        }
        data = {"chat_id": chat_id, "text": text, "reply_markup": json.dumps(button_markup)}
    else:
        data = {"chat_id": chat_id, "text": text}
    
    response = requests.post(url_send_message, json=data)
    return response.json()

def process_update(event:str)->None:
    update:json = json.loads(event['body'])
    update_data:json = update['message']
    chat_id:str = update_data['chat']['id']
    user_id:str = update_data['from']['id']
    user_first_name:str = update_data['from']['first_name']
    text:str = update_data.get('text', '')

    if text.lower() == "/view_data":
        handle_view_data(chat_id, user_id)
    elif text.lower() == "/start":
        process_question(chat_id, user_id, user_first_name, text)
    else:
        process_question(chat_id, user_id, user_first_name, text)
        
def show_loans(chat_id:str,user_id:str)->None:
    data_loans:str = requests.get(url_get_data_products,params=user_data[user_id]["answers"])
    loans_list:json = data_loans.json()
    for loans in loans_list:
        text = f"""{choice(list_emoji)}\nБанк : {loans["bank_name"]}\nНазвание : {loans["credit_name"]}\nМинимальный процент : {loans["min_percent"]}\nМаксимальная сумма займа : {loans["max_sum"]}\nКоличество месяцев : {loans["max_months"]}"""
        send_message(chat_id,text,[])

def webhook_handler(event:str, context:str)->json:
    process_update(event)
    return {
        "statusCode": 200,
        "body": "OK"
    }
