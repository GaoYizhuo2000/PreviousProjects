import openpyxl

wb = openpyxl.load_workbook('新建 Microsoft Excel 工作表.xlsx')
s = wb['Sheet1']
s.cell(1,2).value = int(65165)
wb.save('新建 Microsoft Excel 工作表.xlsx')
