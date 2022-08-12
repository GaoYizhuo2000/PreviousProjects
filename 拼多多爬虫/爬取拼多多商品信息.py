import requests
import xlwt
from multiprocessing.dummy import Pool
import re
from selenium.webdriver import Edge

surl = 'https://panduoduo.yangkeduo.com/proxy/api/search'
#cookies = 'api_uid=Ck0YBmJueN9eiQBXA4ISAg==; _nano_fp=XpEyXpTonq98XqTYno_Q6_lJfnIbX_4zr_5Jz2fL; webp=1; jrpl=48ODcTlADPiAlr5Efi1KOL6RGwr5XG6q; njrpl=48ODcTlADPiAlr5Efi1KOL6RGwr5XG6q; dilx=gWu39VNKv8w77CilZlq91; PDDAccessToken=GQSLASOOMPQSL6VYOVOFDRNK3KMKGFTKQKWNCK2ZL2HA7OGYX2NA1111aa9; pdd_user_id=6092399940890; pdd_user_uin=XSKUBXYSJJIUMPW2W4D2LG3ZAM_GEXDA'
sheaders = {
'accesstoken': 'CEOLXPSULKNOTQQQG7Q72NPFVXM36F6IJRWNBJKB3M7QIREFQ42A1111aa9',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32',
"accept": 'application/json, text/plain, */*'

    }
headers = {
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' ,
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32'
}

def getname(goodurl):
    try:
        r = s.get(goodurl, headers=headers).content.decode('utf8')
        print(s.cookies)
        mn = re.findall('"mallName":"(.*?)"', r, re.S)[0]
        mallName.append(mn)
    except:#更新服务器状态，随便刷新一次就可以，优化目标：定位到请求哪个数据包可以更新服务器状态。
        input('需要更新服务器状态，刷新完输入任意值：')
        #重新请求刚才失败的
        r = s.get(goodurl, headers=headers).content.decode('utf8')
        print(s.cookies)
        mn = re.findall('"mallName":"(.*?)"', r, re.S)[0]
        mallName.append(mn)

brs = Edge()
brs.get('https://panduoduo.yangkeduo.com/')
a = input("登陆好了输入任意值：")
cookies = brs.get_cookies()
n = []
v = []
for i  in cookies:
    n.append(i['name'])
    v.append(i['value'])
cookies_list = dict(zip(n,v))
del cookies_list['pdd_vds']
sheaders['accesstoken'] = cookies_list['PDDAccessToken']
cookie_jar = requests.utils.cookiejar_from_dict(cookies_list)

s = requests.Session()
s.cookies = cookie_jar

kw = input('kw:')
page = int(input("请求页数"))
while page !=0 and kw !=0:
    gurl = []
    gn = []
    mallName = []
    for i in range(1,page+1):
        params = {
            'q': kw,
            'page': i,
            'pdduid': '6092399940890'
        }
        r = s.get(surl , params = params ,headers = sheaders).json()
        print(s.cookies)
        for j in range(0,20):
            gurl.append('https://panduoduo.yangkeduo.com/goods.html?goods_id=' +str(r['items'][j]['goods_id']))  #哪里有问题就看上一步的结果，发现返回的json和浏览器不一样
            gn.append(r['items'][j]['goods_name'])
    #p = Pool(len(gurl))
    #p.map(getname, gurl)
    for i  in gurl:
        print(i)
        getname(i)

    ##存储代码。。。。
    exel = xlwt.Workbook('utf8')
    s1 = exel.add_sheet('1', cell_overwrite_ok=1)
    s1.write(0, 1, '商品名称')
    s1.write(0 , 2 , '链接')
    s1.write(0 , 3 , '店铺名称')
    for i in range(len(gurl)):
        s1.write(i  + 1 , 1 , gn[i])
        s1.write(i + 1 , 2 , gurl[i])
        s1.write(i + 1 , 3 , mallName[i])
    exel.save(kw+'.xls')
    print(kw+'已保存，停止请求输入0')
    #输入下一次请求的参数，停止请求输入0
    kw = input('kw:')
    page = int(input("请求页数"))


#这次项目遇到的问题：
#用selenium得到cookies后，要转换成jar才能传入session
#session能保持cookies，但似乎不能自动更新？会更新，但是之前手动传入的不会更新，后来接收到的新的会更新
#请求搜索时headers里的token要更新
#参数很多时不用全部破解，先测试几个关键的看是否能拿到数据。
#返回的数据可能和浏览器返回的形式不一样，当解析不到数据时，看看上一步返回的数据是啥样
#每请求完一页（20个）商品详情页会触发滑动验证，优化目标：js逆向破解滑块验证，代替手动
#最后改成了不用进程池，优化目标：做成并发



