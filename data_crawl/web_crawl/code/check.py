import json
import random
import urllib.request
import time

final_dataset = []
error = []
    
def check_blank(product):
    nones=False
    for k,v in product.items(): 
        if product[k] is None or product[k] == "":
            nones=True
    return nones

def check_duplicate(products):
    result = list(
        {
            dictionary['imageLink']: dictionary
            for dictionary in products
        }.values()
    )
    return result

def read_file(json_file):
    with open(json_file, 'r') as f:
        temp = json.loads(f.read())
    return temp

def check_total_blank(data):
    for value in data:
        if(check_blank(value)):
            data.remove(value)
            
def check_image_valid(img, final_dataset, error, length, count):
    print(img)
    url_img = str(img['imageLink'])
    # url = str(img['url'])
    try:
        # urllib.request.urlopen(url)
        urllib.request.urlopen(url_img)
        final_dataset.append(img)
    except Exception as error_mess:
        error.append(img)
        print("An error occurred:", error_mess)
    print(str(count/length * 100) + '%')
    
def exportjson(data, file):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')
        
def main():
    print('________Darveys________')
    darveys_final_dataset = []
    darveys_error = []
    darveys_data = read_file('file_storage/initial_dataset/darveys_summary.json')  
    print('----------------------')
    print('Initial Length')
    print(len(darveys_data))
    check_total_blank(darveys_data) 
    print('Blank Results')
    print(len(darveys_data))
    darveys_results = check_duplicate(darveys_data)  
    print('Duplicate Results')
    print(len(darveys_results))
    exportjson(darveys_results, 'file_storage/final_dataset/darveys_data.json')
    for i, product in enumerate(darveys_results):
        check_image_valid(product, darveys_final_dataset, darveys_error, len(darveys_results), i)
    print('Valid Results')
    print(len(darveys_error))
    print(len(darveys_final_dataset))
    exportjson(darveys_error, 'darveys_error.json')
    exportjson(darveys_final_dataset, 'darveys_summary_2nd.json')
    
    print('________Stylenanda________')
    stylenanda_final_dataset = []
    stylenanda_error = []
    stylenanda_data = read_file('file_storage/initial_dataset/styleanda.json')  
    print('----------------------')
    print('Initial Length')
    print(len(stylenanda_data))
    check_total_blank(stylenanda_data) 
    print('Blank Results')
    print(len(stylenanda_data))
    stylenanda_results = check_duplicate(stylenanda_data)  
    print('Duplicate Results')
    print(len(stylenanda_results))
    for i, product in enumerate(stylenanda_results):
        check_image_valid(product, stylenanda_final_dataset, stylenanda_error, len(stylenanda_results), i)
    print('Valid Results')
    print(len(stylenanda_error))
    print(len(stylenanda_final_dataset))
    exportjson(stylenanda_error, 'stylenanda_error.json')
    exportjson(stylenanda_final_dataset, 'stylenanda_summary_2nd.json')
    
    print('________Farfetch________')
    farfetch_final_dataset = []
    farfetch_error = []
    farfetch_data = read_file('file_storage/initial_dataset/farfetch_summary.json')  
    print('----------------------')
    print('Initial Length')
    print(len(farfetch_data))
    check_total_blank(farfetch_data) 
    print('Blank Results')
    print(len(farfetch_data))
    farfetch_results = check_duplicate(farfetch_data)  
    print('Duplicate Results')
    print(len(farfetch_results))
    # for i, product in enumerate(farfetch_results):
    #     check_image_valid(product, farfetch_final_dataset, farfetch_error, len(farfetch_results), i)
    # print('Valid Results')
    # print(len(farfetch_error))
    # print(len(farfetch_final_dataset))
    # exportjson(farfetch_error, 'farfetch_error.json')
    # exportjson(farfetch_final_dataset, 'farfetch_summary_2nd.json')
    exportjson(farfetch_results, 'file_storage/final_dataset/farfetch_data.json')
    
    print('________Yoox________')
    yoox_final_dataset = []
    yoox_error = []
    yoox_data = read_file('file_storage/initial_dataset/yoox_summary.json')  
    print('----------------------')
    print('Initial Length')
    print(len(yoox_data))
    check_total_blank(yoox_data) 
    print('Blank Results')
    print(len(yoox_data))
    yoox_results = check_duplicate(yoox_data)  
    print('Duplicate Results')
    print(len(yoox_results))
    for i, product in enumerate(yoox_results):
        check_image_valid(product, yoox_final_dataset, yoox_error, len(yoox_results), i)
    print('Valid Results')
    print(len(yoox_error))
    print(len(yoox_final_dataset))
    exportjson(yoox_error, 'yoox_error.json')
    exportjson(yoox_final_dataset, 'yoox_summary_2nd.json')
    exportjson(yoox_results, 'file_storage/final_dataset/yoox_data.json')
    
    print('________Boozt________')
    boozt_final_dataset = []
    boozt_error = []
    boozt_data = read_file('file_storage/initial_dataset/boozt_summary.json')  
    print('----------------------')
    print('Initial Length')
    print(len(boozt_data))
    check_total_blank(boozt_data) 
    print('Blank Results')
    print(len(boozt_data))
    boozt_results = check_duplicate(boozt_data)  
    print('Duplicate Results')
    print(len(boozt_results))
    exportjson(boozt_results, 'file_storage/final_dataset/boozt_data.json')
    
if __name__ == '__main__':
    main()
    