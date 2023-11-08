import json

f = json.loads(open("./src/assets/words-guessable.json", "r").read())

inp = ""
while inp not in ("A", "R"):
  inp = input("Add or remove words from guessable dictionary? (A/R): ").upper()

if inp == "A":
  while True:
    word = input("Word to add: ").upper()
    if word in f:
      print(f"{word} already exists in dictionary.")
      continue
    inp = "."
    while inp not in ("Y", "N", ""):
      inp = input(f"Add '{word}' to dictionary? (Y/n)").upper()
    if inp == "Y" or inp == "":
      f.append(word)
      open("./src/assets/words-guessable.json", "w").write(json.dumps(f))
      print(f"'{word}' added. Dictionary now contains {len(f)} words")