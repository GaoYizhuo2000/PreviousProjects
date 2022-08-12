import requests
import xlwt
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
'cid': 4762828144121064,
'max_id': 0,
'max_id_type': 0
}#里面参数可以改
cookies = {'M_WEIBOCN_PARAMS': 'oid%3D4761707325165604%26luicode%3D20000061%26lfid%3D4761707325165604%26uicode%3D20000061%26fid%3D4761707325165604', 'XSRF-TOKEN': '65d05c', '_T_WM': '43680831333', 'SUB': '_2A25PbjU2DeRhGeBI7lEU9ynMzjyIHXVskVt-rDV6PUJbkdCOLU77kW1NRpYNlqE0btDUuqwdSfV_h6db1U1TrGdR', 'MLOGIN': '1', 'loginScene': '102003'}
# 第一个是登陆短信登陆然后刷到目标评论获得，可以
cookies_test = {'MLOGIN': '1', 'SSOLoginState': '1651134359', '_T_WM': '42434054557', 'SUBP': '0033WrSXqPxfM725Ws9jqgMF55529P9D9W5cc_1_xOQL5qTu.iOcqXDm5NHD95QcSo-0SKMNeh-7Ws4Dqcj0i--Xi-i8iKL2i--NiKnXi-zci--RiKyhiKn0i--NiKn4i-z4i--Ri-2fi-iseo5pe05c', 'M_WEIBOCN_PARAMS': 'luicode%3D20000174%26uicode%3D20000174', 'XSRF-TOKEN': '5a9dea', 'SUB': '_2A25Pbj_HDeRhGeBI7lEU9ynMzjyIHXVskUGPrDV6PUJbktAKLVWtkW1NRpYNlp03FvemFYDQJzzYf-WJYM0rsqzC'}
#关键参数似乎是TWM和SUB, 尝试发现上面两个cookies都可以，cookies_test是直接点登陆然后用密码登陆后获得
cookies_test2 = {'MLOGIN': '1', 'SSOLoginState': '1651134766', '_T_WM': '81291570344',
                 'SUBP': '0033WrSXqPxfM725Ws9jqgMF55529P9D9W5cc_1_xOQL5qTu.iOcqXDm5NHD95QcSo-0SKMNeh-7Ws4Dqcj0i--Xi-i8iKL2i--NiKnXi-zci--RiKyhiKn0i--NiKn4i-z4i--Ri-2fi-iseo5pe05c',
                 'M_WEIBOCN_PARAMS': 'luicode%3D20000174%26uicode%3D20000174', 'XSRF-TOKEN': 'a67ec6', 'SUB': '_2A25PbiF-DeRhGeBI7lEU9ynMzjyIHXVskU82rDV6PUJbktAKLUvwkW1NRpYNlitVWvdNtmAXhR0Vpw4GdDkxCOp0'}
#这个不可以
cookies_test3 = {'MLOGIN': '1', 'SSOLoginState': '1651135370', '_T_WM': '14664597602', 'SUBP': '0033WrSXqPxfM725Ws9jqgMF55529P9D9W5cc_1_xOQL5qTu.iOcqXDm5NHD95QcSo-0SKMNeh-7Ws4Dqcj0i--Xi-i8iKL2i--NiKnXi-zci--RiKyhiKn0i--NiKn4i-z4i--Ri-2fi-iseo5pe05c', 'M_WEIBOCN_PARAMS': 'luicode%3D20000174%26uicode%3D20000174', 'XSRF-TOKEN': 'f526f9', 'SUB': '_2A25PbiPYDeRhGeBI7lEU9ynMzjyIHXVskU2QrDV6PUJbktCOLUXRkW1NRpYNlqGk7S0WgFBvRvRrhgovuPlUbgJ-'}
#test3一开始不行，但是只要把M_WEIBOCN_PARAMS参数luicode前的删掉就可以了，然后又同样处理了test2，也可以了。 
cookies_test4 = {'MLOGIN': '1', 'SSOLoginState': '1655216887', '_T_WM': '84992009173', 'SUBP': '0033WrSXqPxfM725Ws9jqgMF55529P9D9W5cc_1_xOQL5qTu.iOcqXDm5NHD95QcSo-0SKMNeh-7Ws4Dqcj0i--Xi-i8iKL2i--NiKnXi-zci--RiKyhiKn0i--NiKn4i-z4i--Ri-2fi-iseo5pe05c', 'M_WEIBOCN_PARAMS': 'luicode%3D10000011%26lfid%3D102803%26uicode%3D20000174', 'XSRF-TOKEN': '4104b6', 'SUB': '_2A25PrOqnDeRhGeBI7lEU9ynMzjyIHXVtbvbvrDV6PUJbktAKLUzEkW1NRpYNlmWL-2OC6BJNT_5UMxFQrJoxHau-'}

page = int(input('爬取页数:'))
try:
    for i in range(page):
        print('正在请求第', i+1, '页评论')
        r = requests.get(url,params, headers = headers , cookies = cookies_test4).json()
        datapackage.append(r)
        params['max_id'] = r['max_id']
        if i+1 == 10:
            params['max_id_type'] = 1
except KeyError as e:
    print(params['max_id'], json.dumps(datapackage[i]), params['max_id_type'])
#搞了两天，结果根本不是token的问题，甚至不需要token，和headers是cookie有效期的问题！
# 但是抓包的时候根本没看到提交cookie，一直以为问题不在cookie上。
#排出来了，是_T_WM cookie的问题，有效期很短,也不一定是这个参数的问题，反正cookie全部更新一下就好了
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

exel.save(r'微博评论3.xls')

