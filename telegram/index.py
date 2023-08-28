import requests
import json

user_data = {}

TOKEN = "6594849810:AAGJD55hK7rGDJYQCUHXqQTli7PfgJ96hW4"



questions = [
    "Какой ваш возраст ?",
    "Какой стаж работы ?",
    "Какие у вас есть виды обеспечения по кредиту ?",
    "Сумма ежемесячных платежей по действующим кредитам ?",
    "Какой у вас сейчас доход ?",
    "Количество действующих кредитов ?",
    "Цель займа ?"
]

data_questions = [
    "age",
    "work_experience",
    "collateral",
    "indebtedness",
    "income",
    "number_of_credits",
    "purpose_of_the_loan"
]

data_buttons = {
    2: [["Машина"], ["Квартира"], ["Нет"]],
    6: [["Машина"], ["Квартира"], ["Бизнес"]]
}

def is_valid_number(text):
    return text.isdigit()

def process_question(chat_id, user_id, user_first_name, text):
    if user_id not in user_data:
        user_data[user_id] = {'count_questions': 0, 'answers': {}}

    count_question = user_data[user_id]['count_questions']
    if text.lower() == "/start":
        user_data[user_id]['count_questions'] = 0
        user_data[user_id]['count_questions'] += 1
        send_message(chat_id, f"Привет! {user_first_name} Добро пожаловать в нашего бота. Начнем опрос.", data_buttons.get(count_question))
        send_message(chat_id, questions[count_question], data_buttons.get(count_question))
    elif count_question <= len(questions):
        if count_question in [3, 7]:
            user_data[user_id]['answers'][data_questions[count_question - 1]] = text
            user_data[user_id]['count_questions'] += 1
            send_message(chat_id, questions[count_question], data_buttons.get(count_question))
        else:
            if is_valid_number(text):
                user_data[user_id]['answers'][data_questions[count_question - 1]] = text
                user_data[user_id]['count_questions'] += 1
                send_message(chat_id, questions[count_question], data_buttons.get(count_question))
            else:
                send_message(chat_id, "Пожалуйста, введите корректное число.")
    else:
        send_message(chat_id, "Спасибо за предоставленную информацию!")

def handle_view_data(chat_id, user_id):
    user_data = view_data(user_id)
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

def send_message(chat_id, text, buttons=None):
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    if buttons:
        button_markup = {
            "keyboard": buttons,
            "resize_keyboard": True,
            "one_time_keyboard": True
        }
        data = {"chat_id": chat_id, "text": text, "reply_markup": json.dumps(button_markup)}
    else:
        data = {"chat_id": chat_id, "text": text}
    
    response = requests.post(url, json=data)
    return response.json()

def process_update(event):
    update = json.loads(event['body'])
    update_data = update['message']
    chat_id = update_data['chat']['id']
    user_id = update_data['from']['id']
    user_first_name = update_data['from']['first_name']
    text = update_data.get('text', '')

    if text.lower() == "/view_data":
        handle_view_data(chat_id, user_id)
    elif text.lower() == "/start":
        process_question(chat_id, user_id, user_first_name, text)
    else:
        process_question(chat_id, user_id, user_first_name, text)

def webhook_handler(event, context):
    process_update(event)
    return {
        "statusCode": 200,
        "body": "OK"
    }
