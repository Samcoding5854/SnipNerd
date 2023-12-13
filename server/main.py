from revChatGPT.Unofficial import Chatbot
import json

f = open("server/config.json")

token = json.load(f)

api = Chatbot(token)
prompt = "Hey introduce yourself"
resp = api.ask(prompt)

print(resp['message'])