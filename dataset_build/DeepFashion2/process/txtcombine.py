import glob

file = 'result.txt'

read_files = glob.glob("yolo_train/*.txt")

with open(file, "wb") as outfile:
    for f in read_files:
        with open(f, "rb") as infile:
            outfile.write(infile.read())