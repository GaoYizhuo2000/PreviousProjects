# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ZhejiangItem(scrapy.Item):
    name = scrapy.Field()
    title = scrapy.Field()
    college_name = scrapy.Field()
    photoUrl = scrapy.Field()
    email = scrapy.Field()
    address = scrapy.Field()
    tel = scrapy.Field()
    pass
