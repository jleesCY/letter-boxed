import json

f = json.loads(open("./src/assets/words-guessable.json").read())

to_remove = []

for w in range(len(f)):
  word = f[w]
  if len(word) < 3:
    to_remove.append(word)
    continue
  for i in range(len(word) - 1):
    if word[i] == word[i+1]:
      to_remove.append(word)
      break

count = len(to_remove)
curr = 0
for word in to_remove:
  f.remove(word)
  curr = curr + 1
  print(f"{curr}/{count}")

for w in range(len(f)):
  f[w] = f[w].upper()

open("./src/assets/words-guessable.json","w").write(json.dumps(f))

print(len(f))