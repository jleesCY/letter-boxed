import json

f1 = json.loads(open("./src/assets/words-guessable.json").read())
f2 = json.loads(open("./src/assets/words.json").read())

for word in f2:
  if word not in f1:
    print(word)
    f1.append(word)
print("sorting...")
f1.sort()

open("./src/assets/words-guessable.json","w").write(json.dumps(f1))