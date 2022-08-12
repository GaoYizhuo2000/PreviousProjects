import scrapy
import execjs
import json
from ZheJiang.items import ZhejiangItem
import re
class UnispiderSpider(scrapy.Spider):
    name = 'unispider'
    #allowed_domains = ['www.person.zju.edu.com']
    #start_urls = ['http://www.xxx.com/']
    header1 = {
        'Host': 'person.zju.edu.cn',
        'Connection': 'keep-alive',
        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
        'sign': '3ebca8c1aea7625e15394d0a1243d6b0',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
        'Accept': 'application/json, text/plain, */*',
        'timestamp': '1660053384000',
        'appKey': '50634610756a4c0e82d5a13bb692e257',
        'sec-ch-ua-platform': "Windows",
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://person.zju.edu.cn/index/search',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
    }
    header2 = {
        'Host': 'person.zju.edu.cn',
        'Referer': 'https://person.zju.edu.cn/index/search',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
    }

    def start_requests(self):
        size = input('输入爬取个数:')
        url = f'https://person.zju.edu.cn/server/api/front/psons/search?size={size}&page=0&lang=cn'
        params = {  # 有的网站get方法只支持在url里带参数，不能以params单独提交。
            'size': size,
            'page': 0,
            'lang': 'cn'
        }
        js = execjs.compile(open(r'C:\Users\土耳其冰激凌\Desktop\python爬虫\exercises\scrapy\Uni\ZheJiang\spiders\sign.js', 'r', encoding='utf8').read())
        ts = js.call('getTs')
        print(ts)
        sign = js.call('f', '1f11192bd9d14a09b29fc59d556e24e3', ts, '/api/front/psons/search', params)
        print(sign)
        self.header1['timestamp'] = ts
        self.header1['sign'] = sign
        yield scrapy.Request(url, headers= self.header1)
    def parse(self, response):
        data = json.loads(response.text)
        tcherList = data['data']['content']
        for tcher in tcherList:
            name = tcher['cn_name']
            title = tcher['work_title']
            college_name = tcher['college_name']
            mapping_name = tcher['mapping_name']
            photo = tcher['photo']
            detailUrl = 'https://person.zju.edu.cn/'+mapping_name    ###这一步之前url拼错了，一直没发现，操
            print(detailUrl)
            photoUrl = response.urljoin(photo)####可能也错了
            yield scrapy.Request(detailUrl,callback=self.parse_Detail , meta={'name' : name, 'title': title, 'college_name': college_name, 'photoUrl': photoUrl}
                                 ,headers = self.header2)    ###回调失败的时候看看请求是不是被过滤掉了，或者是不是请求失败了
            print('提交完了')
    def parse_Detail(self, response):
        email = re.findall('<label>邮箱</label>.*?(\w.*?)\n', response.text, re.S)[0]#xpath提不出来的用正则提
        address = re.findall('<label>地址</label>\s*?(\w.*?)\n', response.text, re.S)[0]#xpath提取出来全是空字符\n\t\t\t
        tel = response.xpath('//li[@class="telephone"]/text()').extract_first()
        item = ZhejiangItem()
        item['name'] = response.meta['name']
        item['title'] = response.meta['title']
        item['college_name'] = response.meta['college_name']
        item['photoUrl'] = response.meta['photoUrl']
        item['email'] = email
        item['address'] = address
        item['tel'] = tel
        yield item
        print('已提交item')

        #work_post = response.xpath('//div[@class="workPost"]/text()').extract_first()




