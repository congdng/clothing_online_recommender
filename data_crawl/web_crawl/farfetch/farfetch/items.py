# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class FarfetchItem(scrapy.Item):
    name = scrapy.Field()
    brand = scrapy.Field()
    price_org= scrapy.Field()
    price_sale = scrapy.Field()
    url = scrapy.Field()
    image_link = scrapy.Field()
    description = scrapy.Field()
    numReviews = scrapy.Field()
    rating = scrapy.Field()
    countInStock = scrapy.Field()
    category = scrapy.Field()
