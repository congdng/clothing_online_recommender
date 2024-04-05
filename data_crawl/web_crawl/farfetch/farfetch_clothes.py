from seleniumwire import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import json
import math
from bs4 import BeautifulSoup
import random
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

data = []

def get_selenium():                           
    opts = Options()
    opts.add_argument('--ignore-certificate-errors')
    opts.add_argument('--incognito')
    # opts.add_argument('headless')        
    opts.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")            
    s=Service('chromedriver.exe')
    browser = webdriver.Chrome(service=s, options=opts)
    return (browser)

def exportjson(data):
    with open('skirtwomentrouser.json', 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')

def openpage(link, browser):
    browser.get(link)
    return browser.page_source

def check_page (url, browser):
    valid_page = True
    for request in browser.requests:
        if (request.url == url) and (request.response.status_code == 200):
            valid_page = True
        elif (request.url == url) and (request.response.status_code != 200):
            valid_page = False
        else:
            pass
    return valid_page    

def load_page(url, browser):
    valid_page = False
    while (valid_page == False):
        openpage(url, browser)
        time.sleep(30)
        valid_page = check_page (url, browser)
    SCROLL_PAUSE_TIME = 10
    last_height = browser.execute_script("return document.body.scrollHeight")
    screen_height = browser.execute_script("return screen.height")
    num_scroll = math.ceil(last_height / screen_height)
    for x in range(1, num_scroll):       
        browser.execute_script(f"window.scrollTo(0, screen.height*{x});")
        browser.find_element(By.XPATH, "//body").send_keys(Keys.ARROW_UP)
        time.sleep(SCROLL_PAUSE_TIME)
    html_text = browser.page_source
    time.sleep(5)
    return html_text

def getfarfetchdata(product, cate):
    name = product.find('p', {'data-component': 'ProductCardDescription'}).text.strip()
    url = 'https://www.farfetch.com' + product.a.get('href')
    try:
        price_org = product.find('p', {'data-component': 'PriceOriginal'}).text
        price_sale = product.find('p', {'data-component': 'PriceFinal'}).text
    except:
        price_org = product.find('p', {'data-component': 'Price'}).text
        price_sale = price_org
    image = product.find('div', {'data-component': 'ProductCardImageContainer'}).img['src']
    image = image.replace("_480.", "_1000.")
    countInStock = random.randint(0, 60)
    rating = round(random.uniform(1.00, 5.00), 2)
    numReviews = random.randint(0, 60)
    brands = product.find('p', {'data-component': 'ProductCardBrandName'}).text.strip()    
    record = {
            'name': name,
            'url': url,
            'price_org': price_org,
            'price_sale': price_sale,
            'imageLink': image,
            'category': cate,
            'brands': brands,
            'countInStock': countInStock,
            'rating': rating,
            'numReviews': numReviews,
        }
    data.append(record)
    print(record)
    
def load_next(soup, category):
    products = soup.find_all('li', {'data-testid': 'productCard'})
    print(len(products))
    for product in products:
        try:
            getfarfetchdata(product, category)
        except:
            pass
    
def main():
    browser = get_selenium()
    urls = ['https://www.farfetch.com/vn/shopping/men/polo-shirts-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/men/shirts-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/men/shorts-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/men/sweaters-knitwear-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/men/trousers-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/men/t-shirts-vests-2/items.aspx',
            'https://www.farfetch.com/vn/shopping/women/coats-1/items.aspx',
            'https://www.farfetch.com/vn/shopping/women/dresses-1/items.aspx',
            'https://www.farfetch.com/vn/shopping/women/jackets-1/items.aspx',
            'https://www.farfetch.com/vn/shopping/women/skirts-1/items.aspx',
            'https://www.farfetch.com/vn/shopping/women/trousers-1/items.aspx'
            ]
    for url in urls:
        html_text = load_page(f'{url}', browser)
        soup = BeautifulSoup(html_text, 'html.parser')
        pagination = soup.find('div', {'data-testid': 'page-number'}).text if (soup.find('div', {'data-testid': 'page-number'})) else '0 of 0'
        numPage = pagination[5:]
        print(numPage)
        category_search = soup.find_all('li', {'data-component': 'BreadcrumbWrapper'})
        category = category_search[-1].span.text
        print(category)
        products = soup.find_all('li', {'data-testid': 'productCard'})
        print(len(products))
        for product in products:
            try:
                getfarfetchdata(product, category)
            except:
                pass
        # for i in range (2, int(numPage) + 1):
        for i in range (2, 23):
            next_link = f'{url}?page={i}&view=96&sort=3'
            print(next_link)
            html_text = load_page(next_link, browser)
            soup = BeautifulSoup(html_text, 'html.parser')
            load_next(soup, category)
            time.sleep(10)
    browser.close()
    exportjson(data)
    print(len(data))
    print('DONE')
    
if __name__ == '__main__':
    main()
    

