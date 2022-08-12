# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

###别忘了开管道！！！！！
class SunPipeline:
    fp = ''


    def process_item(self, item, spider):
        self.fp = open('data.txt', 'a', encoding='utf8')
        print(f'正在写入{item["code"]}')
        self.fp.write(item['code']+'    '+item['titleText']+'   '+item['status']+'\n')
        self.fp.write(item['content']+'\n*2')
        self.fp.close()
        return item

