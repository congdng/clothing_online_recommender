file = 'result.txt'
reader = open(file, 'r')
occurence = [0, 0, 0, 0, 0, 0]
try:
    for line in reader:
        category = int(line[0])
        occurence[category] += 1
finally:
    reader.close()
    
print(occurence)