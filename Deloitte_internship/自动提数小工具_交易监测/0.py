import xlwings as xw
import pandas as pd
path_copy_debenture = r"./中间文件/模板.xlsx"
df = pd.read_excel(path_copy_debenture, '永续债修正收益率')
df.sort_values(by="证券代码",ascending=False, inplace=True)
df.to_excel(path_copy_debenture, sheet_name='永续债修正收益率', index=False, header=True)


