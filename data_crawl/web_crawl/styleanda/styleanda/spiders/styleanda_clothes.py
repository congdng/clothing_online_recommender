import scrapy
from urllib.parse import urlencode
from styleanda.items import StyleandaItem
import random

class StyleandaClothesSpider(scrapy.Spider):
    name = "styleanda_clothes"
    
    def __init__(self):
        self.counter = 1
    
    def start_requests(self):
        urls_set = [
            'https://stylenandaen.com/category/outerwear/51/',
            'https://stylenandaen.com/category/tops/50/',
            'https://stylenandaen.com/category/dresses/54/',
            'https://stylenandaen.com/category/skirts/52/',   
        ]
        urls_search = [
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=shorts&page=1&order_by=default',
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=trousers&page=1&order_by=default',
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=dress&page=1&order_by=default',
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=shirt&page=1&order_by=default',
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=skirt&page=1&order_by=default',
            # 'https://stylenandaen.com/product/search.html?banner_action=&keyword=jacket&page=1&order_by=default',
        ]
        for url in urls_search:
            self.counter = 1
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        products = response.xpath("//li[@class='xans-record-']/div")
        current_page = response.xpath("//ul[contains(@class, 'xans-product-headcategory')]/li[2]/a/@href").get()
        for product in products:
            link = product.xpath(".//div[@class='name']/a/@href").get()
            absolute_url = f"https://stylenandaen.com{link}"
            image_link = product.xpath(".//a[contains(@class, 'thumb_slide_over')]/img/@src").get()
            # category = (product.xpath("//div[@id]/div[contains(@class, 'xans-product-headcategory')]/text()").get()).strip()
            category = response.url
            x = category.find("keyword=")
            y = category.find("&page")
            category = category[x+8:y]
            yield scrapy.Request(url=absolute_url, callback=self.parse_detail, meta={'url': absolute_url, 'imageLink': image_link, 'category': category})
            # yield {
            #     'link': absolute_url,
            #     'imglink': image_link,
            #     'category': category
            # }
        
        # pagination = response.xpath("//div[@id='paging']/ul/li")
        # print(len(pagination))
        # for self.counter in range(len(pagination)):
        #     self.counter += 1
        #     # print(f"https://stylenandaen.com/product/search.html?banner_action=&keyword={category}&page={self.counter}&order_by=default")
        #     absolute_page = f"https://stylenandaen.com/product/search.html?banner_action=&keyword={category}&page={self.counter}&order_by=default"
        #     yield scrapy.Request(url=absolute_page, callback=self.parse)
            
        next_page = response.xpath("//p[@class = 'next']/a/@href").get()
        absolute_page = f"https://stylenandaen.com{current_page}{next_page}"
        if (next_page != '#none'):
            yield scrapy.Request(url=absolute_page, callback=self.parse)
            
    def parse_detail(self, response):
        item = StyleandaItem()
        item["name"] = response.xpath("//div[@class='prdName']/text()").get()
        item["brand"] = "Stylenandaen"
        item["price_org"] = response.xpath("//span[@class='price ']/text()").get()
        item["price_sale"] = response.xpath("//span[contains(@class, 'sale_price ')]/text()").get()
        item["url"] = response.request.meta['url']
        item["image_link"] = response.request.meta['imageLink']
        item["description"] = """
        Manufacturer: Nanda Inc. Partners / Country of Manufacture: South Korea / Seller: Nanda Inc. / Date of Manufacture: Jun. 2023
        Defective items will be refunded based on the regulations of Korea Fair Trade Commission.
        Warranty Manager : Nanda Inc. Customer Service Center (1) 877.708.3574
        The color displayed may vary depending on your screen.
        The accurate color of the item is better displayed on the detailed photos at the bottom of the page.
        Unauthorized use of images on this website is strictly prohibited and can result in civil and criminal penalties.
        """
        item["numReviews"] = random.randint(0, 50)
        item["rating"] = round(random.uniform(1.00, 5.00), 2)
        item["countInStock"] = random.randint(0, 60)
        item["category"] = response.request.meta['category']
        yield item

