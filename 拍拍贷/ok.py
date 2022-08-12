import execjs
import requests
import json
js = open('py.js', 'r', encoding='utf8').read()
js = execjs.compile(js)
un = js.call('un',str(input('un:')))
pwd = js.call('pwd', str(input('pwd:')))
headers = {
#'Host': 'passport.ppdai.com',
#'Origin': 'https://account.ppdai.com',
#'Referer': 'https://account.ppdai.com/',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50'
,'Content-Type': 'application/json;charset=UTF-8'# necessary param
}

url = 'https://passport.ppdai.com/api/passport/pwdLoginService/securityWeb'
params = {'appid': 1000002866}
data = {
    "extraInfo":{
        #"CookieValue":""
        #,"FlashValue":"",
        #"FpCode":"",
        #"FromUrl":"",
        #'ImgValidateCode': "",
        #'ImgValidateToken': "",
        #"UniqueId":"",
        #"UserAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50",
        #"sourceId":None,
        "serial_no":"7a2beb91-ec82-4ee5-8d92-cb32269ee61f",  #请求序列号，必要参数
        #"currentUrl":"https://account.ppdai.com/pc/login",
        #"ppdSearchEngineUrl":"https://cn.bing.com/",
        #'_ppdaiWaterMark': ""
    },
    #"sourceId":None,
    #"loginSource":"PcWebLogin",
    "password":"EHX9UJ3DD0Hsn3mrEL192nFFxkr0/OCxCEWsv1xTjF3dlR7vtsuIzakx22hYK8v/eiMeT8TNsSf1srqQc+2LaI+9YCwnD8FjYh+RoUBjCJPLhpWfegGBx9MZCWrpzBKff9He9vDsha5jUPmU9Lt9JlIwpTIpBiKIL/890NW2op4=",
    "userName":"UcfTHpiJitu2BG1bYbNOAz6CVcu1VZjip8kN6c2QaQJB+nbV+c4hFondoL6vhUAunxWE03tpKzKyNkJt2mwLHNH7IJ+h8RSHLMjomP1pVsuFEFbppLkGKx+BDPICJyKYtm3e3+UlNTQ8a2BjMJnHq61w2ZZM7WYyNzNcZoZYdWU="
}
data['password'] = pwd
data['userName'] = un
##这里负载是json，要转换成json在提交，放在data里
r2 = requests.post(url, headers = headers, data = json.dumps(data), params = params)
print(r2.json())
