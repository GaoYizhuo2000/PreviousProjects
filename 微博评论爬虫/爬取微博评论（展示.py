import requests
import xlwt
from selenium.webdriver import Edge
import re
import json

datapackage = []
url = 'https://m.weibo.cn/comments/hotFlowChild'
headers = {
'Accept': 'application/json, text/plain, */*',
'MWeibo-Pwa': '1',
'Referer': 'https://m.weibo.cn/detail/4761707325165604?cid=4761716477134273',
'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Microsoft Edge";v="100"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-platform': "Windows",
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
'X-Requested-With': 'XMLHttpRequest',
'X-XSRF-TOKEN': ''
}
params = {
'cid': 4761716477134273,
'max_id': 0,
'max_id_type': 0
}
cookies={}
def getcookies():
    brs = Edge()
    brs.get('https://m.weibo.cn/')
    #这里点击下面的登陆然后用账号密码登录
    input('继续，输入任意值：')
    c = brs.get_cookies()
    n = []
    v = []
    for i  in c:
        n.append(i['name'])
        v.append(i['value'])
    cookies = dict(zip(n,v))
    del cookies['WEIBOCN_FROM']
    cookies['M_WEIBOCN_PARAMS'] = re.findall('(luicode.*)',cookies['M_WEIBOCN_PARAMS'])[0]
    #brs.quit()
    print(cookies)
#可以了
cookies_test4 = {'mweibo_short_token': '29c6f93354', 'MLOGIN': '1', 'SSOLoginState': '1655216041', '_T_WM': '40047064594', 'SUBP': '0033WrSXqPxfM725Ws9jqgMF55529P9D9W5cc_1_xOQL5qTu.iOcqXDm5NHD95QcSo-0SKMNeh-7Ws4Dqcj0i--Xi-i8iKL2i--NiKnXi-zci--RiKyhiKn0i--NiKn4i-z4i--Ri-2fi-iseo5pe05c', 'M_WEIBOCN_PARAMS': 'luicode%3D20000174%26uicode%3D20000174', 'XSRF-TOKEN': 'a8837b', 'SUB': '_2A25PrOf5DeRhGeBI7lEU9ynMzjyIHXVtbomxrDV6PUJbktB-LUrSkW1NRpYNlnzSRTwTlO8Im_GKlCtgA7J55EX3'}

def spider():
    params['cid'] = int(input('输入待爬取评论或帖子的cid：'))
    page = int(input('输入爬取页数，0停止'))
    if page == 0:
        print('结束')
    else:
        try:
            for i in range(page):
                print('正在请求第', i+1, '页评论')
                r = requests.get(url,params, headers = headers , cookies = cookies).json()
                datapackage.append(r)
                print(params['max_id'])
                params['max_id'] = r['max_id']
                print('max_id')
                if i+1 == 10:
                    params['max_id_type'] = 1
            save()
            print('继续爬取。。。')
            spider()
        except KeyError as e:
            print('cookies过期，重新登陆')
            getcookies()
            spider()
            
getcookies()        
spider()

#不是token的问题，甚至不需要token，和headers是cookie有效期的问题！
# 但是抓包的时候根本没看到提交cookie，一直以为问题不在cookie上。
#排出来了，是_T_WM cookie的问题，有效期很短,也不一定是这个参数的问题，反正cookie全部更新一下就好了
def save():
    exel = xlwt.Workbook('utf8')
    sheet1 = exel.add_sheet('1', cell_overwrite_ok=1)
    col = ['网名','id','评论时间', '评论内容']
    for j in range(len(col)):
        sheet1.write(0, j, col[j])
    for page in range(len(datapackage)):
        for i in range(len(datapackage[page]['data'])):
            #if page+1>10:
                #sheet1.write(1 + (page%10) * 10 + i + 1, (page//10)*6+0, datapackage[page]['data'][i]['user']['screen_name'])
                #sheet1.write(1 + (page%10) * 10 + i + 1, (page//10)*6+1, datapackage[page]['data'][i]['user']['id'])
                #sheet1.write(1 + (page%10) * 10 + i + 1, (page//10)*6+2, datapackage[page]['data'][i]['created_at'])
                #sheet1.write(1 + (page%10) * 10 + i + 1, (page//10)*6+3, datapackage[page]['data'][i]['text'])
            #else:
                sheet1.write(1 + page * 10 + i + 1, 0, datapackage[page]['data'][i]['user']['screen_name'])
                sheet1.write(1 + page * 10 + i + 1, 1, datapackage[page]['data'][i]['user']['id'])
                sheet1.write(1 + page * 10 + i + 1, 2, datapackage[page]['data'][i]['created_at'])
                sheet1.write(1 + page * 10 + i + 1, 3, datapackage[page]['data'][i]['text'])

    exel.save(r'微博评论.xls')

