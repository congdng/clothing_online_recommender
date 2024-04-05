from seleniumwire import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import json
import math
from bs4 import BeautifulSoup
from lxml import etree
import random
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

data = []
file = 'darveys.json'

def get_selenium():                           
    opts = Options()
    opts.add_argument('--ignore-certificate-errors')
    opts.add_argument('--incognito')
    opts.add_argument('headless')        
    opts.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")            
    s=Service('chromedriver.exe')
    browser = webdriver.Chrome(service=s, options=opts)
    return (browser)

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
        time.sleep(20)
        valid_page = check_page (url, browser)
    html_text = browser.page_source
    time.sleep(5)
    return html_text

def load_again(url, browser, total_products):
    valid_page = False
    while (valid_page == False):
        openpage(url, browser)
        time.sleep(20)
        valid_page = check_page (url, browser)
    num_scroll = math.ceil(total_products / 30) + 10
    screen_height = browser.execute_script("return screen.height")
    for x in range(1, num_scroll):    
        last_height = browser.execute_script("return document.body.scrollHeight")
        last_height = last_height - screen_height   
        print(last_height)
        browser.execute_script(f"window.scrollTo(0, {last_height});")
        time.sleep(15)
    time.sleep(180)
    html_text = browser.page_source
    time.sleep(5)
    return html_text


def removechar(text, front=2, end=2):
    return text[front:-end]

def getdarveysdata(product, cate):
    name = removechar(str(product.xpath(".//p[contains(@class, 'desc')]/text()")))
    url = 'https://www.darveys.com' + removechar(str(product.xpath("./descendant::a[1]/@href")))
    try:
        price_org = product.xpath('.//del/text()')
        price_sale = product.xpath(".//span[contains(@class, 'price')]/text()")
    except:
        price_org = product.xpath(".//span[contains(@class, 'price')]/text()")
        price_sale = price_org
    price_org = removechar(str(price_org), 4, 2)
    price_sale = removechar(str(price_sale), 4, 2)
    image = product.xpath("./div[contains(@class, 'product-image')]/a/div/span/img/@src")
    image = removechar(str(image))
    countInStock = random.randint(0, 60)
    rating = round(random.uniform(1.00, 5.00), 2)
    numReviews = random.randint(0, 60)
    brands = product.xpath(".//h3/text()")  
    brands = removechar(str(brands))
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

def exportjson(data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')
        
def main():
    browser = get_selenium()
    urls = [
        'https://www.darveys.com/catalog/men/clothing/shorts',
        'https://www.darveys.com/catalog/men/clothing/jackets',
        'https://www.darveys.com/catalog/men/clothing/jeans',
        'https://www.darveys.com/catalog/men/clothing/pants',
        'https://www.darveys.com/catalog/men/clothing/polos',
        'https://www.darveys.com/catalog/men/clothing/shirts',
        'https://www.darveys.com/catalog/men/clothing/sweaters-knitwear',
        'https://www.darveys.com/catalog/men/clothing/sweatshirts-hoodies',
        'https://www.darveys.com/catalog/men/clothing/t-shirts',
        'https://www.darveys.com/catalog/women/clothing/trench-coats',
        'https://www.darveys.com/catalog/women/clothing/dresses',
        'https://www.darveys.com/catalog/women/clothing/jeans',
        'https://www.darveys.com/catalog/women/clothing/pants',
        'https://www.darveys.com/catalog/women/clothing/shorts',
        'https://www.darveys.com/catalog/women/clothing/skirts',
        'https://www.darveys.com/catalog/women/clothing/tops'
            ]
    for url in urls:
        html_text = load_page(f'{url}', browser)
        soup = BeautifulSoup(html_text, 'html.parser')
        dom = etree.HTML(str(soup))
        # with open('test.html', 'w', encoding="utf-8") as f:
        #     f.write(str(soup))
        total_products = removechar(str(dom.xpath("//div[@class='main-heading-center']/span/text()")), 3, 3)
        try:
            total_products = [int(s) for s in total_products.split() if s.isdigit()][0]
        except: 
            total_products = 0
        print('Amount of products:')
        print(total_products)
        html_text = load_again(f'{url}', browser, total_products)
        soup = BeautifulSoup(html_text, 'html.parser')
        dom = etree.HTML(str(soup))
        category = dom.xpath("//div[@class='breadcrumb']//li/text()")[-1]
        print(category)
        products = dom.xpath("//div[@class='product-box']")
        print(len(products))
        for product in products:
            try:
                print(product)
                getdarveysdata(product, category)
            except:
                pass
    browser.close()
    exportjson(data)
    print(len(data))
    print('DONE')
    
if __name__ == '__main__':
    main()
    