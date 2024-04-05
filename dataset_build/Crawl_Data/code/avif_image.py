import requests
import json    

# from urllib.request import Request
def exportjson(data, file):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')

blank_url = "https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/601082646d6bf4446451b0a4_6002086f72b72717ae01d954_google-doc-error-message.png"
error =  []
# with open('../../crawl/process_crawl_web_file.json', 'r') as f:
with open('summary.json', 'r') as f:
    temp = json.loads(f.read())
    print(len(temp))
    headers = {"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"}
    for i in range(0, len(temp)):
        print(i)
        print(temp[i]['imageLink'])
        category = str(temp[i]['category'])
        url = str(temp[i]['imageLink'])
        full_path = '../full_database/' + category + '/' + str(i).zfill(6) + '.jpg'
        try:
            print("Processing")
            img_data = requests.get(url, headers=headers).content
            print("Downloading")
            with open(full_path, 'wb') as handler:
                handler.write(img_data)
            print("Done")
        except Exception as error_mess:
            error.append(i)
            print("An error occurred:", error_mess)
            # opener.retrieve(blank_url, full_path)
    print(error)

# darveys_error =  [] 
# final_dataset = []       
# with open('../../crawl/random_dataset_file.json', 'r') as f:
#     temp = json.loads(f.read())
#     print(len(temp))
#     opener = urllib.request.URLopener()
#     opener.addheader('User-Agent', 'Mozilla/5.0')
#     for i in range(len(temp)):
#         print(temp[i]['imageLink'])
#         print(i)
#         category = str(temp[i]['category'])
#         url = str(temp[i]['imageLink'])
#         full_path = '../yolodata/' + category + '/' + str(i).zfill(6) + '.jpg'
#         try:
#             opener.retrieve(url, full_path)
#             final_dataset.append(temp[i])
#         except:
#             darveys_error.append(i)
#             pass
#     print(darveys_error)
# print(len(final_dataset))
# exportjson(final_dataset, 'valid_image.json')

    