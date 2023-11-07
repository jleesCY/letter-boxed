import json

f = json.loads(open("./src/assets/words-guessable.json", "r").read())
f2 = json.loads(open("./src/assets/words.json", "r").read())

print(len(f))
print(len(f2))

'''
names = open("./names.csv").read().split("\n")

for name in names:
  name = name.split(" - ")[0].upper().strip()
  if name in f:
    f.remove(name)
    print(name)
open("./src/assets/words.json", "w").write(json.dumps(f))
'''


'''
while True:
  inp = input("Word to remove: ").upper()
  if inp in f:
    f.remove(inp)
    open("./src/assets/words.json", "w").write(json.dumps(f))
    print(f"'{inp}' removed. Dictionary now contains {len(f)} words")
    
  else:
    print(f" '{inp}' does not exist in the dictionary")
    '''