import scrapy
from scrapy_splash import SplashRequest
from farfetch.items import FarfetchItem
import random

class FarfetchClothesSpider(scrapy.Spider):
    name = "farfetch_clothes"
    allowed_domains = ["www.farfetch.com"]
    def __init__(self):
        self.counter = 1
    script = '''
        function main(splash)
            local num_scrolls = 10
            local scroll_delay = 10
            local scroll_to = splash:jsfunc("window.scrollTo")
            local get_body_height = splash:jsfunc("function() {return document.body.scrollHeight;}")
            assert(splash:go(splash.args.url))
            splash:wait(5)
            for _ = 1, num_scrolls do
                scroll_to(0, get_body_height())
                splash:wait(scroll_delay)
            end
            splash:wait(30)
            return splash:html()
        end
    '''
    script_1 = '''
        function main(splash)
            assert(splash:go(splash.args.url))
            assert(splash:wait(5))
            return splash:html()
        end
    '''
    def start_requests(self):
        urls = ['https://www.farfetch.com/vn/shopping/men/coats-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/denim-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/jackets-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/polo-shirts-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/shirts-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/shorts-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/sweaters-knitwear-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/trousers-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/men/t-shirts-vests-2/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/women/coats-1/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/women/dresses-1/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/women/jackets-1/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/women/skirts-1/items.aspx',
                # 'https://www.farfetch.com/vn/shopping/women/trousers-1/items.aspx'
                ]
        for url in urls:
            self.counter = 1
            yield SplashRequest(url=url, callback=self.parse, endpoint="execute", args={
                'lua_source': self.script,
                'timeout': 3000,
            })

    def parse(self, response):
        # category = response.xpath("//li[@data-component='BreadcrumbWrapper'][3]/span/text()").get()
        # current_page = response.url
        # category = 'outwear'
        # products = response.xpath("//div[@data-component='ProductCard']/a")
        # for product in products:
        #     link = product.xpath("./@href").get()
        #     absolute_url = f"https://www.farfetch.com{link}"
        #     image = product.xpath(".//img/@src").get()
        #     image = image.replace("_480.", "_1000.")
        #     # yield SplashRequest(url=absolute_url, callback=self.parse_detail, endpoint="execute", args={
        #     #     'lua_source': self.script_1,
        #     #     'timeout': 3000,
        #     # }, meta={'category': category})
        #     # yield scrapy.Request(url=absolute_page, callback=self.parse, meta={'url': absolute_url})
        #     yield{
        #         'link': absolute_url,
        #         'image_link': image,
        #         'category': category
        #     }
        # for self.counter in range(11):
        #     self.counter += 1
        #     newpage = f'{current_page}?page={self.counter}'
        #     yield SplashRequest(url=newpage, callback=self.parse, endpoint="execute", args={
        #         'lua_source': self.script,
        #         'timeout': 3000,
        #     })
        with open("test.txt", "w") as f:
            f.write(response.text)
        
    # def parse_detail(self, response):
    #     container = response.xpath("//main[@id='content']")
    #     item = FarfetchItem()
    #     item["name"] = container.xpath(".//p[@data-testid='product-short-description']/text()").get()
    #     item["brand"] = container.xpath(".//h1/a[@data-ffref='pp_infobrd']/text()").get()
    #     org_price = container.xpath(".//div[@data-component='PriceCallout']//p[@data-component='PriceOriginal']/text()").get()
    #     if (org_price):
    #         item["price_org"] = container.xpath(".//div[@data-component='PriceCallout']//p[@data-component='PriceOriginal']/text()").get()
    #         item["price_sale"] = container.xpath(".//div[@data-component='PriceCallout']//p[@data-component='PriceFinalLarge']/text()").get()
    #     else:
    #         item["price_org"] = container.xpath(".//div[@data-component='PriceCallout']//p[@data-component='PriceLarge']/text()").get()
    #         item["price_sale"] = container.xpath(".//div[@data-component='PriceCallout']//p[@data-component='PriceLarge']/text()").get()
    #     item["url"] = response.url
    #     item["image_link"] = response.xpath("//main[@id='content']//button[@data-component='Container']//img/@src").get()
    #     item["description"] = container.xpath("//main[@id='content']//div[@data-component='Body']/p/text()").get()
    #     item["numReviews"] = random.randint(0, 50)
    #     item["rating"] = round(random.uniform(1.00, 5.00), 2)
    #     item["countInStock"] = random.randint(0, 60)
    #     item["category"] = response.request.meta['category']
    #     yield item
    
