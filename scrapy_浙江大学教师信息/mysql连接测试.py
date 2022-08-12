import pymysql
connection = pymysql.connect( user = 'root', password = 'Neverfyus.2018', host = 'localhost', database='scrapy')
cursor = connection.cursor()

SQL = f'''insert into teacher_info (name, title, college_name, photo_url, email, address, tel) 
                      value ("gyz", "123", "123", 'url', '@@@@','%%%', 123)'''

cursor.execute(SQL)
connection.commit()
connection.close()

###
