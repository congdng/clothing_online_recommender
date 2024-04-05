from seleniumwire import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import json
import math
from bs4 import BeautifulSoup
import random
from lxml import etree
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
        time.sleep(60)
        valid_page = check_page (url, browser)
    SCROLL_PAUSE_TIME = 5
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

def removechar(text, front=2, end=2):
    return text[front:-end]

def getyooxdata(product, cate):
    image = removechar(str(product.xpath(".//div[contains(@class, 'itemImg')]/a/img/@src")))
    x = len(image) - image.find('.jpg?') - 5
    image_link = f"{image[:-x]}impolicy=crop&width=1571&height=2000"
    url = 'https://www.yoox.com/' + removechar(str(product.xpath(".//div[contains(@class, 'itemImg')]/a/@href")))
    name = removechar(str(product.xpath(".//div[contains(@class, 'itemData')]/a/div[contains(@class, 'title')]/text()")))
    if (name==''): 
        name = removechar(str(product.xpath(".//div[contains(@class, 'itemData')]/a/div[contains(@class, 'microcategory')]/text()")))
    name = name.replace('\\n', '')
    name = name.replace('  ', '')
    price_org = product.xpath(".//span[contains(@class, 'oldprice')]/text()")
    price_sale = product.xpath(".//div[contains(@class, 'retail-newprice')]/text()")
    price_sale = removechar(str(price_sale), 4, 2)
    price_org = removechar(str(price_org), 4, 2)
    price_sale = price_sale.replace('\\n', '')
    price_sale = price_sale.replace('  ', '')
    price_sale = price_sale[2:]
    price_org = price_org.replace('\\n', '')
    price_org = price_org.replace('  ', '')
    if (price_sale == ''):
        price_org = product.xpath(".//span[contains(@class, 'fullprice')]/text()")
        price_org = removechar(str(price_org), 4, 2)
        price_sale = price_org
    countInStock = random.randint(0, 60)
    rating = round(random.uniform(1.00, 5.00), 2)
    numReviews = random.randint(0, 60)
    brands = product.xpath(".//div[contains(@class, 'itemData')]/a/div[contains(@class, 'brand')]/text()")  
    brands = removechar(str(brands))
    brands = brands.replace('\\n', '')
    brands = brands.replace('  ', '')
    record = {
            'name': name,
            'url': url,
            'price_org': price_org,
            'price_sale': price_sale,
            'imageLink': image_link,
            'category': cate,
            'brands': brands,
            'countInStock': countInStock,
            'rating': rating,
            'numReviews': numReviews,
        }
    data.append(record)
    print(record)

def exportjson(data):
    with open('second.json', 'w') as f:
        json.dump(data, f, indent=4)
        print('Data extracted')
        
def main():
    browser = get_selenium()
    urls = []
    for i in range(1, 21):
        # urls.append(f"https://www.yoox.com/us/men/clothing/shoponline#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27cpspll%27%5d%7d&season=X")
        # urls.append(f"https://www.yoox.com/us/men/clothing/shoponline#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27shrts%27%5d%7d&season=X")
        # urls.append(f"https://www.yoox.com/us/men/clothing/shoponline#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27crg1%27%2c%27pntln1%27%2c%27tsch2%27%5d%7d&season=X")
        # urls.append(f"https://www.yoox.com/us/men/clothing/shoponline#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27cmc%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/women/shoponline/t-shirts%20and%20tops_mc#/dept=clothingwomen&gender=D&page={i}&attributes=%7b%27ctgr%27%3a%5b%27cmsl%27%2c%27cntt2%27%2c%27crptp1%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/women/shoponline/skirts_mc#/dept=clothingwomen&gender=D&page={i}&attributes=%7b%27ctgr%27%3a%5b%27gnn%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/women/shoponline/shirts_mc#/dept=clothingwomen&gender=D&page={i}&attributes=%7b%27ctgr%27%3a%5b%27cmc%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/women/clothing/shoponline#/dept=clothingwomen&gender=D&page={i}&attributes=%7b%27ctgr%27%3a%5b%27vstt%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/men/shoponline/sweaters%20and%20sweatshirts_mc#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27flpcncpp2%27%5d%7d&season=X")
        urls.append(f"https://www.yoox.com/us/men/shoponline/t-shirts%20and%20tops_mc#/dept=clothingmen&gender=U&page={i}&attributes=%7b%27ctgr%27%3a%5b%27tpwr%27%5d%7d&season=X")
    for url in urls:
        html_text = load_page(f'{url}', browser)
        soup = BeautifulSoup(html_text, 'html.parser')
        dom = etree.HTML(str(soup))
        # with open("output1.html", "w", encoding='utf-8') as file:
        #     file.write(str(soup)
        try:
            category = dom.xpath("//ul[@id='breadcrumbs']/li/span/text()")[-1]
        except:
            category = ''
        products = dom.xpath("//div[@id='itemsGrid']//div[@class='col-8-24']")
        print(len(products))
        for product in products:
        # for i in range(11):
            try:
                print(product)
                getyooxdata(product, category)
            except:
                pass
    browser.close()
    exportjson(data)
    print(len(data))
    print('DONE')
    
if __name__ == '__main__':
    main()