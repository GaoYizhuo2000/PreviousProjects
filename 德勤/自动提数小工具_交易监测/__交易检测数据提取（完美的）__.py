import pandas as pd
import xlwings as xw
import shutil
from datetime import *
import pymysql

# ---------------------- 设置 -----------------------
"""
使用须知：用的时候一定要把所有打开的excel文件都关掉；
         如果报错，可能后台还有残留的进程：可以试一下打开任务管理器，检查“后台进程”，把显示excel标志的文件都给关了
"""

# 监测日期
this_date = '20220810'  # 本工作日日期：这个一定要填写，不能为空
last_work_day = '20220809'  # 上一工作日日期：可以为空；如果为空，代码自动获取
municipal_date = '20220808'  # 本周获取城投债大全的日期：可以为空；如果为空，代码自动获取本周一的日期
                     # 用于城投债文件名后缀；如果本周的城投债大全不是周一获取的，一定要自己填写

# 路径
root_path = r"D:\Deloitte\py\py\自动提数小工具_交易监测/"  # 填写当前py文件所在路径

# SQL 数据库信息
my_host = '10.173.43.102'  # 连接地址，连接本地默认，127.0.0.1
my_user = 'fanxj'  # 用户名
my_password = 'fanxj123'  # 密码
my_db = 'ibond'  # 数据库名称

# ----------------------------------------------------
def get_last_weekday(day):
    now = day
    if now.isoweekday() == 1:
        day_step = 3
    else:
        day_step = 1
    last_workday = now - timedelta(days=day_step)
    last_one = str(last_workday).replace("-", "")[0:8]
    print(f"上一工作日为：{last_one}")
    return last_one


def this_monday(today):
    today = datetime.strptime(str(today), "%Y%m%d")
    this_mon = datetime.strftime(today - timedelta(today.weekday()), "%Y%m%d")
    print(f"本周一日期为：{this_mon}")
    return this_mon


if len(last_work_day) != 8:
    last_one = get_last_weekday(datetime(int(this_date[0:4]), int(this_date[4:6]), int(this_date[6:])))
    last_work_day = str(last_one).replace("-", "")[0:8]

if len(municipal_date) != 8:
    municipal_date = this_monday(this_date)


path_format = r"./固定模板/【模板】交易监测.xlsx"
path_debenture = fr"./输入数据/交易监测-信用债{this_date[4:]}.xlsx"
path_perpetual = fr"./输入数据/交易监测-永续债{this_date[4:]}.xlsx"
path_municipal = fr"./输入数据/城投债大全{municipal_date[4:]}.xls"
path_copy_trans_monitor = r"./中间文件/交易监测.xlsx"
path_copy_format = r"./中间文件/模板.xlsx"
path_copy_debenture = r"./中间文件/信用债副本.xlsx"
path_edited_debentures = r"./交易监测结果.xlsx"
path_abnormal = fr"./交易监测-异常值{this_date[4:]}.xlsx"


def run_cmd_Popen_PIPE(cmd_string):
    """
    执行cmd命令，并得到执行后的返回值,python调试界面不输出返回值
    :param cmd_string: cmd命令，如：'adb devices"'
    :return:
    """
    import subprocess
    print('运行cmd指令：{}'.format(cmd_string))
    return subprocess.Popen(cmd_string, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE, encoding='gbk').communicate()[0]


def get_df_from_db(sql):
    return pd.read_sql(sql, connection)


# ----------------------------------------------------
# 2.1 创建副本
shutil.copy(path_debenture, path_copy_trans_monitor)

# 2.2 删除指定列
app = xw.App(visible=False)
wb_trans_monitor = app.books.open(path_copy_trans_monitor)
wind = wb_trans_monitor.sheets['万得']
wind['L:Q'].delete()
wind['I:I'].delete()
wind[f'{wind.range(1, 1).expand().shape[0] - 1}:{wind.range(1, 1).expand().shape[0]}'].delete()
wb_trans_monitor.save()
wb_trans_monitor.close()
app.quit()

# 2.3 选取需粘贴股票代码
df_trans_monitor = pd.read_excel(path_copy_trans_monitor, sheet_name="万得")
lst_col_1 = df_trans_monitor.columns
screen_col_1 = ''
for this_col in lst_col_1:
    if "上证固收平台收盘价" in this_col and "收益率" in this_col:
        screen_col_1 = this_col
        break
# 收盘价-收益率不为空的部分
debenture_wanted = df_trans_monitor.loc[~df_trans_monitor[screen_col_1].isnull()].copy()
# 收盘价-收益率为空的部分
debenture_empty = df_trans_monitor.loc[df_trans_monitor[screen_col_1].isnull()].copy()
stock_codes = list(debenture_wanted['证券代码'])
length = len(stock_codes)

# 2.4 粘贴代码
app = xw.App(visible=False)
wb_format = app.books.open(path_format)
format_yield_correction = wb_format.sheets["上证固收平台收益率修正"]
format_yield_correction.range('A3').options(transpose=True).value = stock_codes

# 2.5 & 2.6
format_yield_correction['J2'].value = this_date[0:4] + '-' + this_date[4:6] + '-' + this_date[6:]
# 完整版
format_yield_correction['B3'].value = f'=WSS($A$3:$A${3 + length},$C$2:$C$2,"tradeDate={this_date}","bondPriceType=1","ShowParams=Y","cols=1;rows={length}")'
format_yield_correction['D3'].value = f'=WSS($A$3:$A${3 + length},$D$2:$G$2,"tradeDate={this_date}","bondPriceType=3","ShowCodes=N","ShowParams=Y","cols=4;rows={length}")'
# 三行测试版
# format_yield_correction['B3'].value = f'=WSS($A$3:$A${5},$C$2:$C$2,"tradeDate={this_date}","bondPriceType=1","ShowParams=Y","cols=1;rows={3}")'
# format_yield_correction['D3'].value = f'=WSS($A$3:$A${5},$D$2:$G$2,"tradeDate={this_date}","bondPriceType=3","ShowCodes=N","ShowParams=Y","cols=4;rows={3}")'
# 不提数版
# format_yield_correction['B3'].value = f'WSS($A$3:$A${3 + length},$C$2:$C$2,"tradeDate={this_date}","bondPriceType=1","ShowParams=Y","cols=1;rows={length}")'
# format_yield_correction['D3'].value = f'WSS($A$3:$A${3 + length},$D$2:$G$2,"tradeDate={this_date}","bondPriceType=3","ShowCodes=N","ShowParams=Y","cols=4;rows={length}")'

# 2.7
format_yield_correction['H3'].value = f'=IFERROR(YIELD($J$2,E3,G3/100,C3/F3*100,100,1,1)*100,"")'
format_yield_correction.range(f'H3:H{3 + length}').api.FillDown()

wb_format.save(path_copy_format)
wb_format.close()
app.quit()

# 弹出窗口进行提数，需手动保存
run_cmd_Popen_PIPE(root_path + path_copy_format[2:])
while True:
    save_check = input("请确认数据加载完毕，保存并关闭弹出文件（完成后输入“1”并回车）: ")
    if save_check == "1":
        break

# 2.8
# 得到修正收益率一列数据
df_yield_correction = pd.read_excel(path_copy_format, sheet_name="上证固收平台收益率修正")
df_yield_correction.drop(0, inplace=True)
lst_col_2 = df_yield_correction.columns
screen_col_2 = ''
for this_col in lst_col_2:
    if "修正收益率" in this_col:
        screen_col_2 = this_col
        break

# 覆盖原数据
df_yield_correction = df_yield_correction.rename(columns={"代码": "证券代码", screen_col_2: screen_col_1})
debenture_wanted = pd.merge(debenture_wanted.drop(screen_col_1, axis=1),
                            df_yield_correction[['证券代码', screen_col_1]], on="证券代码", how="left")
debenture_wanted_copy = debenture_wanted.copy()
debenture_wanted['修正数据'] = 1


# 2.9 & 2.10
debenture_wanted_copy['修正数据'] = 0
debenture_empty['修正数据'] = 0
# 日期处理
screen_col_3 = ''
for this_col in lst_col_1:
    if "最近交易日期" in this_col:
        screen_col_3 = this_col
debenture_wanted[screen_col_3] = this_date
debenture_empty[screen_col_3] = debenture_empty[screen_col_3].dt.strftime('%Y%m%d')
debenture_wanted_copy[screen_col_3] = debenture_wanted_copy[screen_col_3].dt.strftime('%Y%m%d')
# F列数据替换
screen_col_4 = f"收盘价\n[交易日期] {this_date[0:4]}-{this_date[4:6]}-{this_date[6:]}\n[债券价格类型] 收益率\n[单位] 元"
debenture_wanted[screen_col_4] = debenture_wanted[screen_col_1].copy()
# 拼接数据 #####拼完之后主体错了
df_debenture = pd.concat([debenture_wanted_copy, debenture_empty, debenture_wanted], ignore_index=True)

# 2.11 仅留本工作日
debenture_date = df_debenture.loc[df_debenture[screen_col_3] == this_date].copy()

# 2.12 排序 & 去重
debenture_date.sort_values(by=screen_col_4, ascending=False, axis=0, inplace=True)
debenture_date.drop_duplicates(subset=['证券代码'], keep='first', inplace=True)

# 改回日期列格式
debenture_date[screen_col_3] = f"{this_date[0:4]}-{this_date[4:6]}-{this_date[6:]}"

# 保存为xlsx文件
debenture_date.to_excel(path_copy_debenture, index=False)

app = xw.App(visible=False)

# 2.13
wb_copy_debenture = app.books.open(path_copy_debenture)
ws_debenture = wb_copy_debenture.sheets['Sheet1']
wb_copy_format = app.books.open(path_copy_format) ###!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
ws_format = wb_copy_format.sheets['输出模板']
ws_format.range('K1:Y2').copy(ws_debenture.range('L1:Z2'))

# 2.14
ws_debenture['M2'].value = this_date[0:4] + '/' + this_date[4:6] + '/' + this_date[6:]
ws_debenture['M3'].value = this_date[0:4] + '/' + this_date[4:6] + '/' + this_date[6:]
ws_debenture.range(f'M2:M{ws_debenture.range(1, 1).expand().shape[0]}').api.FillDown()

wb_copy_debenture.save()
wb_copy_debenture.close()
wb_copy_format.save()
wb_copy_format.close()
app.quit()

# 2.15 & 2.16
df_debenture = pd.read_excel(path_copy_debenture, sheet_name="Sheet1")
df_municipal = pd.read_excel(path_municipal, sheet_name="城投债大全")
list_municipal_codes = list(df_municipal['代码'])
df_perpetual = pd.read_excel(path_perpetual, sheet_name="万得")
list_perpetual_codes = list(df_perpetual['证券代码'])
df_debenture["是否城投"] = "否"
df_debenture["是否永续债"] = "否"
df_debenture.loc[df_debenture["证券代码"].isin(list_municipal_codes), "是否城投"] = "是"
df_debenture.loc[df_debenture["证券代码"].isin(list_perpetual_codes), "是否永续债"] = "是"

# 2.17
df_debenture.loc[df_debenture["修正数据"] == 1, "来源"] = "FIP"
df_debenture.drop("修正数据", axis=1, inplace=True)

df_debenture["date"] = df_debenture["date"].dt.strftime('%Y-%m-%d')
df_debenture.to_excel(path_copy_debenture, index=False)

# 2.19 & 2.20
app = xw.App(visible=False)
# 交易监测-永续债
wb_data_perpetual = app.books.open(path_perpetual)
ws_data_perpetual = wb_data_perpetual.sheets["万得"]
# 模板-永续债修正收益率
wb_format = app.books.open(path_copy_format)
ws_perpetual_correction = wb_format.sheets["永续债修正收益率"]
# 复制数据
ws_data_perpetual.range("A2").expand("table").api.Copy(ws_perpetual_correction.range("A2").api)
ws_perpetual_correction["I2"].value = f"=IFERROR(YIELD(DATE({last_work_day[0:4]},{last_work_day[4:6]},{last_work_day[6:]}),G2,H2/100,E2,100,1,3)*100,"")"
ws_perpetual_correction["J2"].value = f"=IFERROR(YIELD(DATE({this_date[0:4]},{this_date[4:6]},{this_date[6:]}),G2,H2/100,F2,100,1,3)*100,"")"
ws_perpetual_correction.range(f'I2:I{ws_perpetual_correction.range(1, 1).expand().shape[0]}').api.FillDown()
ws_perpetual_correction.range(f'J2:J{ws_perpetual_correction.range(1, 1).expand().shape[0]}').api.FillDown()

wb_data_perpetual.save()
wb_data_perpetual.close()
wb_format.save()
wb_format.close()
app.quit()

# 2.21 拆分永续债和非永续债
df_copy_debenture = pd.read_excel(path_copy_debenture, sheet_name="Sheet1")
df_is_perpetual = df_copy_debenture.loc[df_copy_debenture["是否永续债"] == "是"]
df_not_perpetual = df_copy_debenture.loc[~(df_copy_debenture["是否永续债"] == "否")]
df_corrected_perpetual = pd.read_excel(path_copy_format, sheet_name="永续债修正收益率")

# 2.22 替换EF两列数据
col_corrected_1 = f"修正收盘价\n[交易日期] 2022-03-25\n[债券价格类型] 收益率\n[单位] 元"
col_corrected_2 = f"修正收盘价\n[交易日期] 2022-03-28\n[债券价格类型] 收益率\n[单位] 元"
col_origin_1 = f"收盘价\n[交易日期] {last_work_day[0:4]}-{last_work_day[4:6]}-{last_work_day[6:]}\n[债券价格类型] 收益率\n[单位] 元"
col_origin_2 = f"收盘价\n[交易日期] {this_date[0:4]}-{this_date[4:6]}-{this_date[6:]}\n[债券价格类型] 收益率\n[单位] 元"

df_corrected_is_perpetual = pd.merge(df_is_perpetual.drop(labels=[col_origin_1, col_origin_2], axis=1),
                                     df_corrected_perpetual[["证券代码", col_corrected_1, col_corrected_2]],
                                     on="证券代码", how="left")
df_corrected_is_perpetual = df_corrected_is_perpetual.rename(columns={col_corrected_1: col_origin_1,
                                                                      col_corrected_2: col_origin_2})

# 拼接两部分表
df_all_perpetual = pd.concat([df_not_perpetual, df_corrected_is_perpetual], ignore_index=True)
# 丢掉无用列
lst_perp_cols = df_all_perpetual.columns
for this_col in lst_perp_cols:
    if "Unnamed" in this_col:
        df_all_perpetual.drop(this_col, axis=1, inplace=True)

# 2.23
connection = pymysql.connect(host=my_host, user=my_user, password=my_password, db=my_db)
df_data_1 = get_df_from_db(
    f"select bond_code, yield_cnbd from pfl_bndcn_cb_ev where trd_dt='{last_work_day[0:4]}-{last_work_day[4:6]}-{last_work_day[6:]}'")
df_data_1 = df_data_1.rename(columns={"bond_code": "证券代码", "yield_cnbd": "估计收益率1"})
df_data_2 = get_df_from_db(
    f"select bond_code, yield_cnbd from pfl_bndcn_cb_ev where trd_dt='{this_date[0:4]}-{this_date[4:6]}-{this_date[6:]}'")
df_data_2 = df_data_2.rename(columns={"bond_code": "证券代码", "yield_cnbd": "估计收益率2"})
df_data = pd.merge(df_data_1, df_data_2, how="outer", on="证券代码")
print(f"从SQL数据库中获取的数据量为{df_data.shape[0]}")

# 2.24
col_appr_or_1 = f"估价收益率(%)(中债)\n[日期] {last_work_day[0:4]}-{last_work_day[4:6]}-{last_work_day[6:]}\n[估值类型] 推荐"
col_appr_or_2 = f"估价收益率(%)(中债)\n[日期] {this_date[0:4]}-{this_date[4:6]}-{this_date[6:]}\n[估值类型] 推荐"

df_all_perpetual = pd.merge(df_all_perpetual.drop(labels=[col_appr_or_1, col_appr_or_2], axis=1),
                            df_data, on="证券代码", how="left")
df_all_perpetual = df_all_perpetual.rename(columns={"估计收益率1": col_appr_or_1,
                                                    "估计收益率2": col_appr_or_2})
df_all_perpetual = df_all_perpetual.sort_values(by="证券代码",ascending=False)  ###重新排序，降序！！！！！！！1

##新的问题，有的收盘价不一样###########################################
# 2.18
###按股票代码排序
df = pd.read_excel(path_copy_debenture, "Sheet1")
df.sort_values(by="证券代码",ascending=False, inplace=True)
df.to_excel(path_copy_debenture, sheet_name='Sheet1', index=False, header=True)

app = xw.App(visible=False)
wb_copy_debenture_1 = app.books.open(path_copy_debenture)
ws_copy_debenture = wb_copy_debenture_1.sheets["Sheet1"]
###重新按股票代码降序排序

####ws_copy_debenture.range('A1').api.Sort(Key1=ws_copy_debenture.range('A1').api, Order1=2)###排序出错了
####在这里把从数据库提出来的数写进去
ws_copy_debenture.range('C2').options(transpose = True).value = df_all_perpetual.loc[ : , col_appr_or_1].tolist()
ws_copy_debenture.range('D2').options(transpose = True).value = df_all_perpetual.loc[ : , col_appr_or_2].tolist()

ws_copy_debenture["K2"].value = "=100*(F2-C2)*IF(ISBLANK(C2),0,1)"
ws_copy_debenture["M2"].value = "=IF(S2=\"中介\",B2&$T$2&ROUND(K2,2)&U$2,IF(S2=\"FIP\",B2&$T$2&ROUND(K2,2)&U$2&V$2&ROUND(J2,2)&W$2&X$2,IF(Q2=\"是\",B2&$T$2&ROUND(K2,2)&U$2&Y$2&V$2&ROUND(H2,2)&W$2,B2&$T$2&ROUND(K2,2)&U$2&V$2&ROUND(H2,2)&W$2)))"
ws_copy_debenture["N2"].value = "=MAX((K2/100-MAX((D2-C2),0)-0.88*MAX(MIN(E2,F2)-C2,0)),0)*(1-EXP(-K2/233))+IF(K2>0,0.0001,0)"
ws_copy_debenture["O2"].value = "最新成交"
ws_copy_debenture["P2"].value = "交易监测"
ws_copy_debenture.range(f'K2:K{ws_copy_debenture.range(1, 1).expand().shape[0]}').api.FillDown()
ws_copy_debenture.range(f'M2:M{ws_copy_debenture.range(1, 1).expand().shape[0]}').api.FillDown()
ws_copy_debenture.range(f'N2:N{ws_copy_debenture.range(1, 1).expand().shape[0]}').api.FillDown()
ws_copy_debenture.range(f'O2:O{ws_copy_debenture.range(1, 1).expand().shape[0]}').api.FillDown()
ws_copy_debenture.range(f'P2:P{ws_copy_debenture.range(1, 1).expand().shape[0]}').api.FillDown()
wb_copy_debenture_1.save()
wb_copy_debenture_1.close()
app.quit()

# 3.1
df_all_perpetual_copy = pd.read_excel(path_copy_debenture, sheet_name="Sheet1").iloc[ : , :19] ###这里改成用pd打开刚才的excel指定区域，来源后面的都不要
df_all_perpetual_copy2 = df_all_perpetual_copy
df_all_perpetual_copy2.to_excel(path_edited_debentures, index=False)
df_all_perpetual_copy["abnormal"] = 0
df_all_perpetual_copy.loc[(df_all_perpetual_copy["是否永续债"] == "是")
                          & (df_all_perpetual_copy["spread"] > 100), "abnormal"] = 1
df_all_perpetual_copy.loc[df_all_perpetual_copy["spread"] > 300, "abnormal"] = 1
df_all_perpetual_copy.loc[df_all_perpetual_copy["score"] > 1, "abnormal"] = 1

# 3.2
df_all_abnormal = df_all_perpetual_copy.loc[df_all_perpetual_copy["abnormal"] == 1].copy()
df_all_abnormal = df_all_abnormal.drop("abnormal", axis=1)
df_abn_debenture = df_all_abnormal.loc[df_all_abnormal["是否永续债"] == "是"].copy()
df_abn_score_1 = df_all_abnormal.loc[df_all_abnormal["score"] > 10].copy()
df_abn_score_2 = df_all_abnormal.loc[(df_all_abnormal["score"] > 1) & (df_all_abnormal["score"] < 10)].copy()



with pd.ExcelWriter(path_abnormal, engine="openpyxl") as writer:
    df_all_abnormal.to_excel(writer, sheet_name="全量异常", index=False)
    df_abn_debenture.to_excel(writer, sheet_name="永续债", index=False)
    df_abn_score_1.to_excel(writer, sheet_name="大于10", index=False)
    df_abn_score_2.to_excel(writer, sheet_name="1-10", index=False)
