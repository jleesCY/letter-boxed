import json

f = json.loads(open("./src/assets/words.json", "r").read())

for i, w in enumerate(f):
  f[i] = w.upper()

open("./src/assets/words.json", "w").write(json.dumps(f))