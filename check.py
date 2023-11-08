import json

f1 = json.loads(open("./src/assets/words-guessable.json").read())


print(len(f1) // 100)