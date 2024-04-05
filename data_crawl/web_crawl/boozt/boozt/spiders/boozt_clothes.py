import scrapy
from scrapy_splash import SplashRequest
import random
import json

class BooztClothesSpider(scrapy.Spider):
    name = "boozt_clothes"
    allowed_domains = ["www.boozt.com"]
    
    script = '''
        function main(splash)
            assert(splash:go(splash.args.url))
            assert(splash:wait(20))
            return splash:html()
        end
    '''
    
    def start_requests(self):
        urls = [
            "https://www.boozt.com/eu/en/women/dresses?grid=small&limit=3&page=1",
            "https://www.boozt.com/eu/en/women/dresses?grid=small&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/dresses?grid=small&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/clothing/jackets-coats?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/clothing/jackets-coats?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/clothing/jeans?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/clothing/jeans?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/bottoms/trousers?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/bottoms/trousers?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/skirts?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/skirts?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/tops/t-shirts-tops?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/tops/t-shirts-tops?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/women/bottoms/shorts?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/women/bottoms/shorts?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/menswear/outerwear?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/menswear/outerwear?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/menswear/tops/shirts?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/menswear/tops/shirts?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/menswear/tops/polo-shirts?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/menswear/tops/polo-shirts?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/menswear/bottoms/trousers?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/menswear/bottoms/jeans?grid=extraSmall&limit=1000&page=1",
            "https://www.boozt.com/eu/en/menswear/bottoms/jeans?grid=extraSmall&limit=1000&page=2",
            "https://www.boozt.com/eu/en/menswear/bottoms/shorts?grid=extraSmall&limit=1000&page=1"
            ]
        for url in urls:
            self.counter = 1
            yield SplashRequest(url=url, callback=self.parse, endpoint="execute", args={
                'lua_source': self.script,
                'timeout': 3000,
            })

    def parse(self, response):
        data = response.xpath('//script[1]/text()').get()
        # category = response.xpath("//div[contains(@class, 'listing-top-head__title')]/h1/text()").get()
        category = 'shorts'
        data_obj = json.loads(data)
        items = data_obj["itemListElement"]
        for item in items:
            name = item['name']
            url = item['url']
            image = item['image']
            x1 = image.find(".com/") + 5
            x2 = len(image) - image.find("/232x303")
            product_ike = image[x1:-4].replace('/232x303/', '/')
            image_link = f"https://image-resizing.booztcdn.com/{product_ike}.webp?has_grey=1&has_webp=1&size=w1300"
            brands = image[x1:-x2].replace('-', ' ').capitalize()
            yield{
                "name": name,
                "url": url,
                "image_link": image_link,
                "brand": brands,
                "category": category
            }