import csv
import json
import pandas as pd

data_dict = []
styleanda_data_dict = []
# def add_product(file):
#     with open(file, encoding = 'utf-8') as csv_file_handler:
#         csv_reader = csv.DictReader(csv_file_handler)
#         for rows in csv_reader:
#             styleanda_data_dict.append(rows)
            
# add_product('styleanda/product_skirt.csv')
# add_product('styleanda/product_dress.csv')
# add_product('styleanda/product_outwear.csv')
# add_product('styleanda/product_search.csv')
# add_product('styleanda/product_shirt.csv')

# with open('file_storage/styleanda.json', 'w', encoding = 'utf-8') as json_file_handler:
#     json_file_handler.write(json.dumps(styleanda_data_dict, indent = 4))
    
# files = ['styleanda/product_skirt.csv', 'styleanda/product_dress.csv', 'styleanda/product_outwear.csv', 'styleanda/product_search.csv', 'styleanda/product_shirt.csv']
# df = pd.DataFrame()
# for file in files:
#     data = pd.read_csv(file)
#     df = pd.concat([df, data], axis=0)
# df.to_csv('file_storage/styleanda.csv', index=False)

#Farfetch
# files=['farfetch/mencoats.json','farfetch/menjacket.json','farfetch/menshirt.json','farfetch/menshorts.json','farfetch/menstrouser.json','farfetch/menstshirtwomencoat.json','farfetch/mensweater.json','farfetch/poloshirt.json','farfetch/skirtwomentrouser.json','farfetch/womendresswomenjacket.json']
# files = ['yoox/first.json', 'yoox/second.json']
# files = ['darveys/menhoodie.json', 
#          'darveys/menjacket.json', 
#          'darveys/menjeans.json',
#          'darveys/menknitwear.json',
#          'darveys/menpants.json',
#          'darveys/menpolo.json',
#          'darveys/menshirts.json',
#          'darveys/menshorts.json',
#          'darveys/menttshirt.json',
#          'darveys/womencoat.json',
#          'darveys/womendress.json',
#          'darveys/womenjean.json',
#          'darveys/womenleft.json']
# files = [
#     'boozt/menjeans.json',
#     'boozt/menoutwear.json',
#     'boozt/menpoloshirt.json',
#     'boozt/menshirt.json',
#     'boozt/menshorts.json',
#     'boozt/mentrousers.json',
#     'boozt/womendress.json',
#     'boozt/womenjacket.json',
#     'boozt/womenjean.json',
#     'boozt/womenshirts.json',
#     'boozt/womenshorts.json',
#     'boozt/womenskirts.json',
#     'boozt/womentrousers.json'
# ]

files = [
    'file_storage/final_dataset/boozt_summary.json',
    'file_storage/final_dataset/darveys_summary.json',
    'file_storage/final_dataset/farfetch_summary.json',
    'file_storage/final_dataset/stylenanda_summary.json',
    'file_storage/final_dataset/yoox_summary.json'
]
def load_file(file):
    f = open(file)
    data = json.load(f)
    return data

def merge_JsonFiles(filename):
    result = list()
    for f1 in filename:
        with open(f1, 'r') as infile:
            result.extend(json.load(infile))

    with open('summary.json', 'w') as output_file:
        json.dump(result, output_file)

merge_JsonFiles(files)