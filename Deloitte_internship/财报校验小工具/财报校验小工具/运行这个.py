# 导入库
import pandas as pd
import numpy as np
from modules import general
from modules import custom_classes
# 自动读取程序路径
root_path = r"./"


# 读取数据
fileName = input('输入文件名（加后缀）：')
df = pd.read_excel(root_path + fileName) #导入数据文件名称
print("已完成：数据读取")
df.rename(columns={'s_info_compname': "BASIC_entity_name", 'report_period': "BASIC_year"} , inplace=True)###重命名
## 检测财报可用性
# 规则读取
df_rules_1 = pd.read_excel(root_path + "input/IDOU_01_数据准备_03_财报可用性检测规则_v4.0.xlsx", sheet_name='2. 重要科目检测规则')
df_rules_2 = pd.read_excel(root_path + "input/IDOU_01_数据准备_03_财报可用性检测规则_v4.0.xlsx", sheet_name='3. 勾稽关系检测规则')

df_rules = df_rules_1.append(df_rules_2)

list_availabilityrule = []
for this_condition, this_check, this_severity, this_notification, this_text in list(zip(df_rules['验证条件'], df_rules['验证结果'], df_rules['严重级别'], df_rules['处理'], df_rules['提示文本'])):
    list_availabilityrule.append(custom_classes.AvailabilityRule(this_condition, this_check, this_severity, this_notification, this_text))

df['BASIC_available'] = True
df['BASIC_available_notification_A'] = ''
df['BASIC_available_notification_B'] = ''

for this_rule in list_availabilityrule[0:]:
    #print(this_rule.gen_condition_str('df'))
    if this_rule.severity == 'A':
        df.loc[eval(this_rule.gen_condition_str('df')), 'BASIC_available'] = False
        df.loc[eval(this_rule.gen_condition_str('df')), 'BASIC_available_notification_A'] += this_rule.notification + "；\n"

    elif this_rule.severity == 'B':
        df.loc[eval(this_rule.gen_condition_str('df')), 'BASIC_available_notification_B'] += this_rule.notification + "；\n"


print("已完成：财报可用性检测")

df1=df[df.BASIC_available == True]
df1.to_excel(root_path + "通过数据检验的主体.xlsx", index=False) #保存数据文件名称
df2=df[df.BASIC_available == False]
df2.groupby('BASIC_year').count()
df3=df2[["BASIC_entity_name","code", "BASIC_year"]]
df3.groupby("BASIC_entity_name")
df3.to_excel(root_path + "未通过数据检验的主体统计.xlsx", index=False) #保存数据文件名称
