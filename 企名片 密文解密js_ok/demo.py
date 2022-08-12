import execjs
import json
js = open('js.js').read()
js = execjs.compile(js)
t = open('密文.txt',encoding = 'utf8').read()###读取爬到的密文
data = js.call('o',t)          #调用完js返回的是字符串，里面汉字使用的unicode码，load一下就成中文了
json = json.loads(data)  #load完是列表，或者字典
print(json['list'][1])

with open('明文.txt','w',encoding = 'utf-8')as f:
    f.write(str(json['list']))
