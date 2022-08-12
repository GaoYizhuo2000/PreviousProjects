'https://person.zju.edu.cn/index/search'
import requests
import execjs
print(execjs.get().name)
header1 = {
'Host': 'person.zju.edu.cn',
'Connection': 'keep-alive',
'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Microsoft Edge";v="104"',
'sign': '878e811bc5261c6be55dc0e39be76129',
'sec-ch-ua-mobile': '?0',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
'Accept': 'application/json, text/plain, */*',
'timestamp': '1660062301000',
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
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Dest': 'document',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6'
    }

print(requests.get('https://person.zju.edu.cn/haichun', headers = header2).text)
size = input('输入爬取个数:')
url = f'https://person.zju.edu.cn/server/api/front/psons/search?size={size}&page=0&lang=cn'
params = {  #有的网站get方法只支持在url里带参数，不能以params单独提交。
   'size' :12,
    'page':0,
    'lang':'cn'
}
js = execjs.compile(open('sign.js', 'r', encoding='utf8').read())
ts = js.call('getTs')
sign = js.call('f', '1f11192bd9d14a09b29fc59d556e24e3', ts, '/api/front/psons/search', params)
print(ts, sign, type(sign))
#header1['sign']= sign
#header1['timestamp'] = str(ts)
r = requests.get(url,headers = header1).json()
print(r)
#1660050990000  1f11192bd9d14a09b29fc59d556e24e3  02bb3a5f2a9def4ddb91b26f4b96143d