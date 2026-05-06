import json

with open("first_request.json", "r") as f:
    line = f.readline()
    data = json.loads(line)
    print(data["content"])
