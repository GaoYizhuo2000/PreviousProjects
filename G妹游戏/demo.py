import execjs
js = execjs.compile(open('ok.js' , 'r' , encoding='utf8').read())
r = js.call('get' , '123456')
print(r)