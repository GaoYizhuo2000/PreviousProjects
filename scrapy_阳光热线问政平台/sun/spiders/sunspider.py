import scrapy
import re
from sun.items import SunItem
import time
from scrapy_redis.spiders import RedisSpider

class SunspiderSpider(RedisSpider):
    name = 'sunspider'
    #allowed_domains = ['www.xxx.com']   ####之前没有注意注释这一行，导致把提交的请求全都过滤掉了。或者把允许的域名改了
    #start_urls = ['https://wz.sun0769.com/political/index/politicsNewest?id=1&page=1']
    #redis_key = 'urlList'
    custom_settings = {'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77'}

    i = 0
    def start_requests(self):
        yield scrapy.Request('https://wz.sun0769.com/political/index/politicsNewest?id=1&page=1')
    def parse(self, response, **kwargs):
        titleList = response.xpath('//ul[@class="title-state-ul"]/li')
        for title in titleList:
            code = title.xpath('./span[1]/text()').extract_first()
            status = title.xpath('./span[2]/text()').extract_first()
            titleText = title.xpath('./span[3]/a/text()').extract_first()
            url = response.urljoin(title.xpath('./span[3]/a/@href').extract_first())
            yield scrapy.Request(url, callback=self.parseDetail, meta={'code':code, 'status': status, 'titleText': titleText})
        try:

            nextPageUrl = re.findall('<a href="(.*?)" class="arrow-page prov_rota"></a>', response.text)[0]
            nextPageUrl = response.urljoin(nextPageUrl)
            time.sleep(5)
            yield scrapy.Request(nextPageUrl, self.parse)
            print(f'正在爬取{nextPageUrl}')
        except:
            print('爬取结束')

    def parseDetail(self, response):
        print(f'正在调用parseDetail处理{response.meta["code"]}')
        item = SunItem()
        item['code'] = response.meta['code'].strip()
        item['status'] = response.meta['status'].strip()
        item['titleText'] = response.meta['titleText'].strip()
        item['content'] = response.xpath('//div[@class="details-box"]/pre/text()').extract_first().strip()
        print(item['titleText'])
        yield item








