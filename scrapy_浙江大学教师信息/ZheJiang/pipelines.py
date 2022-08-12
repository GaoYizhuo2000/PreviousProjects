import pymysql

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class ZhejiangPipeline:
    def process_item(self, item, spider):
        print(item)
        return item

class MysqlPipeline:
    cursor = ''
    connection = ''
    def open_spider(self, spider):
        self.connection = pymysql.connect(user='root', password='Neverfyus.2018', host='localhost', database='scrapy')
        self.cursor = self.connection.cursor()
        print('连接数据库完成')
    def process_item(self, item, spider):
        print('正在将以上内容写入数据库。。。')
        SQL = f'''insert into teacher_info (name, title, college_name, photo_url, email, address, tel) 
                      value ("{item['name']}", "{item['title']}", "{item['college_name']}", "{item['photoUrl']}", "{item['email']}", "{item['address']}", "{item['tel']}");'''
###sql里的字符串要单独再套一层引号

        self.cursor.execute(SQL)
        print('写入一条数据')


    def close_spider(self, spider):
        self.connection.commit()
        self.connection.close()###运行前调整数据库编码防止出错
        print('数据库修改提交完成')



