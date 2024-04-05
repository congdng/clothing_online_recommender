import glob

read_files = glob.glob("validation/yolo/*.txt")
with open("result.txt", "wb") as outfile:
    for f in read_files:
        with open(f, "rb") as infile:
            # outfile.write(f)
            outfile.write(infile.read())
            
reader = open('result.txt', 'r')
occurence = [0, 0, 0, 0, 0, 0]
try:
    for line in reader:
        category = int(line[0])
        occurence[category] += 1
finally:
    reader.close()
    
print(occurence)