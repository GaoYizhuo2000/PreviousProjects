import pandas as pd
import numpy as np
import re


list_operator = ['+', '-', '*', '/', '(', ')', ',', '<', '>', '=']


def check_consecutive(my_df, col_name, col_year):
    """
    检测数据连续性：生成标签列'BASIC_consecutive'作为标记

    :param my_df: 需检测的dataframe
    :param col_name: 主体列名 i
    :param col_year: 时间列名 j
    :return: 生成了数据连续性表标签的dataframe

    BASIC_consecutive:
        =0: 只有本期数据
        =1: 只有本期及上期数据
        =2: 有至少连续三期数据
    """

    # 读取并整理dataframe
    tmp = my_df.copy()
    tmp[col_year] = tmp[col_year].astype(int)
    tmp = tmp.sort_values(by=[col_name, col_year])
    tmp['year_gap'] = tmp.groupby(col_name)[col_year].diff(1)
    # 判定BASIC_consecutive值
    tmp.loc[tmp['year_gap'] != 1, 'BASIC_consecutive'] = 0
    tmp.loc[(tmp['year_gap'] == 1) & (tmp['BASIC_consecutive'].shift(1) == 0), 'BASIC_consecutive'] = 1
    tmp['BASIC_consecutive'] = tmp['BASIC_consecutive'].fillna(2)
    # 整理格式并删除临时列
    tmp['BASIC_consecutive'] = tmp['BASIC_consecutive'].astype(int)
    tmp.drop(columns=['year_gap'], inplace=True)
    return tmp


def select_components(my_equation):
    """
    提取公式中计算所需的元素：将公式字符串中的元素字符串提取并生成一个list
    e.g. '(A+B-C)/D' ——> ['A', 'B', 'C', 'D']

    :param my_equation: 符合一般数学书写格式的公式
    :return: 去除了运算符号后的公式元素的list
    """

    tmp = my_equation
    # 拆分公式，仅保留非运算符号部分
    for this_operator in list_operator:
        tmp = str(tmp).replace(this_operator, ";")
    # 在标记位置拆分
    lst1 = [x.strip() for x in tmp.split(';') if x]
    lst2 = []
    # 处理'^'符号 (用于标记非本期科目)
    for item in lst1:
        if '^' in item:
            item = item.split('^')[0]
        if not re.match(r'\d+', item):
            lst2.append(item)
    return list(set(lst2))


## 检测dataframe是否包含公式中所需全部科目
# 输入: list，去重、独特的科目代码； pd.dataframe， 数据表
# 输出: 0：不满足；1：满足
def check_components(my_equation, my_df):
    my_cols = my_df.columns
    my_check = 1
    lst1 = select_components(my_equation)
    # 检测公式中所需科目是否存在数据列中，如否则报错
    for item in lst1:
        # 如果表头中有该代码
        if item in my_cols:
            my_check *= 1
        else:
            my_check *= 0
            print("Error:", item, "is missing")
    return my_check, lst1


def covert_field(df_name, field_name):
    """
    将表示一个字段的文本转换为表示特定dataframe中字段的文本

    :param df_name: 表示目标dataframe的文本
    :param field_name: 表示目标字段的文本
    :return: 表示目标dataframe中的目标字段的文本
    """
    if '^' in field_name:
        return df_name + "['" + field_name.split('^')[0] + "'].shift(" + field_name.split('^')[1] + ")"
    else:
        return df_name + "['" + field_name + "']"


# 处理规则公式
def parse_equation(df_name, my_equation):
    for this_operator in list_operator:
        my_equation = my_equation.replace(this_operator, ',' + this_operator + ',')
    my_equation = [x for x in my_equation.split(',') if x != '']

    new_equation = ""

    for this_part in my_equation:
        if this_part in list_operator:
            new_equation += this_part
        elif re.match(r'\d+', this_part):
            new_equation += this_part
        else:
            new_equation += covert_field(df_name, this_part)

    return new_equation