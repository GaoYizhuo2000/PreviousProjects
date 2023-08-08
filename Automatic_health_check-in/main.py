import requests
import execjs
import re
import json
import datetime
import time

loginUrl = "https://pass.sdu.edu.cn/cas/login"

with open("rsa.js", "r") as file:
    desJsCode = file.read()

desJsFunction = execjs.compile(desJsCode)

u = '201800620140'
p = 'Neverfyus.2018'

session = requests.session()
loginPage = session.get(loginUrl)  #先用get获取到lt和execution

lt = re.findall('id="lt" name="lt" value="(.*?)" />',loginPage.content.decode('utf-8'))[0]  #返回的结果是一个列表，取第一个对象
execution = re.findall('name="execution" value="(.*?)" />',loginPage.content.decode('utf-8'))[0]
_eventId = "submit"

data = {"rsa":desJsFunction.call("strEnc", u + p + lt, "1", "2", "3"),
        "ul": '12',
        "pl": '14',
        "lt": lt,
        "execution": execution,
        "_eventId": _eventId
    }

r1 = session.post(loginUrl, data = data)
#这里其实登陆成功了但不会自动跳转，不知道原因，手动再请求href location:
r2 = session.get('https://service.sdu.edu.cn/tp_up/view?m=up')  

with open('登陆后主页.html','wb')as f:
    f.write(r2.content)
r3 = session.get('https://scenter.sdu.edu.cn/tp_fp/view?m=fp')
##请求表单
r4 = session.get('https://scenter.sdu.edu.cn/tp_fp/formParser?status=select&formid=d11d0d9b-d73a-4dad-b3c5-7d44b4ed&service_id=41d9ad4a-f681-4872-a400-20a3b606d399&process=674950f5-924b-463d-9eb6-21d5d1b6d9ef&seqId=&seqPid=&privilegeId=7374321285e4d36bbf3d274087454163')
#解析pk_id,fk_id,record_fk:
pk_id = re.findall('"SFYSHQZ":"否No","pk_id":"(.*?)"',r4.content.decode('utf-8'))[0]
fk_id = re.findall('"SFJCGYQ":"否No","fk_id":"(.*?)"',r4.content.decode('utf-8'))[0]
#record_fk = fk_id


#替换表单
with open('json.txt','r',encoding = 'utf-8')as f:
    j = f.read()
sbsj = re.findall('"SBSJ_STR":"(.*?)"',j)[0]
j = re.sub(sbsj,str(time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())),j)
clsj = re.findall('"CLSJ_STR":"(.*?)"',j)[0]
j = re.sub(clsj,str((datetime.datetime.now()+datetime.timedelta(days=-1)).strftime("%Y-%m-%d %H:%M:%S")),j)
sys_date = re.findall('"name":"SYS_DATE","source":"interface","type":"date","value":"(.*?)"',j)[0]
systime = str(int(time.time()*1000))
j = re.sub(sys_date,systime,j)

sbsjstamp = re.findall('fk_id.*?"SBSJ":"(.*?)"',j)[0]
j = re.sub('sbsjstamp',systime,j)

sbsj_lite = re.findall('"_t".*?"SBSJ":"(.*?)"',j)[0]
j = re.sub(sbsj_lite,str(datetime.date.today()),j)

clsj_lite = re.findall('"_t":3.*?"CLSJ":"(.*?)"',j)[0]
j = re.sub(clsj_lite,(datetime.datetime.now()+datetime.timedelta(days=-1)).strftime("%Y-%m-%d %H:%M:%S"),j)

clsj_stamp = re.findall('fk_id.*?"CLSJ":"(.*?)"',j)[0]
j = re.sub(clsj_stamp,str(int(time.mktime(time.strptime((datetime.datetime.now()+datetime.timedelta(days=-1)).strftime("%Y-%m-%d %H:%M:%S"), '%Y-%m-%d %H:%M:%S'))*1000)),j)

PK_ID = re.findall('SFYSHQZ":"否No","pk_id":"(.*?)"',j)[0]
j = re.sub(PK_ID,pk_id,j)

FK_ID = re.findall('SFJCGYQ":"否No","fk_id":"(.*?)"',j)[0]
j = re.sub(FK_ID,fk_id,j)

RECORD_FK = re.findall('"record_fk":"(.*?)"',j)[0]
j = re.sub(RECORD_FK,fk_id,j)

##提交表单
post_url = 'https://scenter.sdu.edu.cn/tp_fp/formParser?status=update&formid=d11d0d9b-d73a-4dad-b3c5-7d44b4ed&workflowAction=startProcess&seqId=&unitId=&workitemid=&process=674950f5-924b-463d-9eb6-21d5d1b6d9ef'
form_data = j.encode('utf-8')
r5 = session.post(post_url,data = form_data)
print(r5.status_code,'finished!!!')
with open('打卡成功.html','wb')as f:
    f.write(r5.content)


