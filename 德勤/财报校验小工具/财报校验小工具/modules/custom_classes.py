import re
from modules import general


class FinancialFactor:
    """ 财务指标计算所需信息 """
    count = 0

    def __init__(
            self,
            code: str,
            name: str,
            disc_version: str,
            guid_version: str,
            category: float,
            formula: str,
            nature: int,
            important_field: str
    ):

        # 属性
        self.code = code
        """ 指标代码 """
        self.name = name
        """ 指标名称 """
        self.disc_version = disc_version
        """ 披露口径：根据披露变动年限进行标注 """
        self.guid_version = guid_version
        """
        会计准则：
            按照持有待售准则与政府补助准则、新收入准则、新金融工具准则和新租赁准则的顺序标注适用情况，
            “-”表示无须进行分版本处理，“0”表示未应用该准则，“1”表示已应用该准则
        """
        self.category = category
        """
        类别：
            0 - 普通指标：使用当期数据计算，结果为数值 \n
            1 - 跨期指标：使用多期数据计算，结果为数值 \n
            1.1 - 变动率指标：使用多期数据计算，结果为变动率（百分比） \n
            2 - 逻辑指标：根据多期数据判断，结果为是(1)或否(0) \n
            3 - 复合指标：使用其他指标计算
        """
        self.formula = formula
        """ 指标计算公式 """
        self.nature = nature
        """ 
        性质：
            0 - 逻辑 \n
            1 - 金额：需保留两位小数 \n
            2 - 比率 \n
        """
        self.importantField = important_field
        """ 
        关键科目：
            计算公式中涉及的字段分为“关键科目”与“非关键科目” 
                不在“关键科目”中的字段均为“非关键科目” \n
                “关键科目”为空时，全部相关字段均为“非关键科目” \n
            当任一“关键科目”为异常时，该指标结果为异常 \n
            当任一“非关键科目”为异常时，该“非关键科目”数值视为0 \n
        
        """
        self.numYear = 0
        """ 计算指标所需前第n期数据中最大的n """
        self.delta = False
        """
        是否为变动率指标 \n
        对于变动率指标，分母取绝对值
        """
        self.denominator = ''
        """ 变动率指标计算公式的分母，即对应指标的上期值 """
        self.criteria = ''
        """ 逻辑指标的判断条件 """
        self.screen_switch = False
        """ 当前指标计算公式是否存在应用条件 """

        # 跨期指标：使用跨期数据计算
        # 含跨期指标和变动率指标
        if round(self.category, 0) == 1:
            list_num_year = re.findall(r"(?:\^)(\d)", self.formula)  # ?:非获取匹配，正向肯定预查 \d数字
            self.numYear = int(max(list_num_year))
            if self.category == 1.1:
                self.delta = True
                self.denominator = self.formula.split('/')[1]
            self.category = 1
        # 逻辑指标：使用跨期数据判断
        elif self.category == 2:
            self.numYear = int(self.formula.split(',')[1])
            self.criteria = self.formula.split(',')[2]
            self.formula = self.formula.split(',')[0]

        # 生成筛选规则
        if not (self.disc_version == "-" and self.guid_version == "-"):
            self.screen_switch = True

        FinancialFactor.count += 1


    def showFactorInfo(self):
        print("指标", self.name, self.disc_version, self.guid_version, "公式：", self.formula)

    def listFormulaField(self):
        """ 生成一个由计算所需所有指标构成的list """
        return general.select_components(self.formula)

    def listImportantField(self):
        """ 生成一个由当前公式的所有关键科目构成的list """
        return general.select_components(self.importantField)

    def genDataframeFormula(self, df_name: str):
        """ 生成代码计算所需公式 """
        return general.parse_equation(df_name, self.formula)

    def genDataframeDenominator(self, df_name: str):
        """ 生成变动率指标在代码计算时所需的分母的公式 """
        return general.parse_equation(df_name, self.denominator)

    @staticmethod
    def generate_screen_rule(my_disc_version: str, my_guid_version: str, df_name: str):
        """
        生成公式应用条件对应筛选规则 \n
        报表披露变动和准则变动有任意一个不为"-"就丢进来生成筛选规则 \n
        生成部分为XXX：tmp.loc[XXX, ...] = ...
        """
        rule_1 = 0
        rule_2 = 0
        screen_rule_1 = ""
        screen_rule_2 = ""
        if my_disc_version != "-":
            rule_1 = 1
            lst_disc_version = my_disc_version.split('|')
            if len(lst_disc_version) == 1:
                screen_rule_1 += f"{df_name}['BASIC_year']{lst_disc_version[0]}"
            else:
                num_1 = 0
                while num_1 < len(lst_disc_version):
                    screen_rule_1 += f" | ({df_name}['BASIC_year']{lst_disc_version[num_1]})"
                    num_1 += 1
                screen_rule_1 = screen_rule_1[3:]
        if my_guid_version != "-":
            rule_2 = 1
            lst_guid_version = my_guid_version.split(",")
            num_2 = 0
            position = 0
            while position < 4:
                if lst_guid_version[position] != "-":
                    if num_2 == 0:
                        screen_rule_2 += f"{df_name}['BASIC_version'].str.get({position})" \
                                         f"=='{lst_guid_version[position]}'"
                    elif num_2 == 1:
                        screen_rule_2 = f"({screen_rule_2}) & ({df_name}['BASIC_version'].str.get({position})" \
                                        f"=='{lst_guid_version[position]}')"
                    else:
                        screen_rule_2 = f"{screen_rule_2} & ({df_name}['BASIC_version'].str.get({position})" \
                                        f"=='{lst_guid_version[position]}')"
                    num_2 += 1
                position += 1
        if rule_1 + rule_2 == 1:
            final_screen_rule = screen_rule_1 + screen_rule_2
        elif rule_1 + rule_2 == 2:
            final_screen_rule = f"({screen_rule_1}) & ({screen_rule_2})"
        else:
            raise Exception("筛选规则出问题了(T T)")
        return final_screen_rule

    def get_screen_rule(self, df_name: str):
        if not self.screen_switch:
            raise Exception("！ERROR：当前指标没有应用条件")
        return self.generate_screen_rule(self.disc_version, self.guid_version, df_name)


class AbnormalTreatment(FinancialFactor):
    """ 特殊情况处理所需信息 """
    count = 0

    def __init__(
            self,
            action_name: str,
            factor_code: str,
            factor_name: str,
            condition: str,
            disc_version: str,
            guid_version: str,
            category: float,
            formula: str,
            nature: int,
            important_field: str,
    ):

        super().__init__(factor_code, factor_name, disc_version, guid_version,
                         category, formula, nature, important_field)
        self.index = action_name
        """ 特殊处理规则表中对应序号 """
        self.condition = condition
        """ 特殊条件 """
        self.screen_switch = True  # 因为是特殊处理，所以公式应用时一定存在筛选规则

        AbnormalTreatment.count += 1

    def gen_condition_str(self, df_name: str):
        """ 将规则表格中的特殊条件转化为代码格式 """

        logi_symbols = ['|', '&']
        parentheses = ['(', ')']
        my_condition = self.condition

        for this_symbol in logi_symbols + parentheses:
            my_condition = my_condition.replace(this_symbol, ',' + this_symbol + ',')
        elements_list = [x.strip(' ') for x in my_condition.split(',') if x != '']

        condition_str = ""

        for this_element in elements_list:
            if this_element in logi_symbols:
                condition_str += f" {this_element} "
            elif this_element in parentheses:
                condition_str += this_element
            else:
                if '为空' in this_element:
                    this_element = this_element.split('为空')[0]
                    condition_str += general.covert_field(df_name, this_element) + ".isnull()"
                else:
                    condition_str += general.parse_equation(df_name, this_element)

        return condition_str

    def gen_complete_condition(self, df_name: str):
        """ 整合公式特殊条条件与应用规则 """
        if self.disc_version == "-" and self.guid_version == "-":
            return self.gen_condition_str(df_name)
        else:
            basic_screen_rule = FinancialFactor.generate_screen_rule(self.disc_version, self.guid_version, df_name)
            exception_only = self.gen_condition_str(df_name)
            return f"({basic_screen_rule}) & ({exception_only})"

    def get_screen_rule(self, df_name: str):
        """ Override of the superclass method """
        if not self.screen_switch:
            raise Exception("！ERROR：当前指标没有应用条件")
        return self.gen_complete_condition(df_name)


# 财报可用性检测
class AvailabilityRule():
    count = 0

    def __init__(
            self,
            condition: str,
            pass_fail: str,
            severity: str,
            notification: str,
            key_fields: str
    ):
        self.condition = condition
        self.pass_fail = ''
        self.severity = severity
        self.notification = notification
        self.key_fields = key_fields.split(',')

        if pass_fail == True:
            self.pass_fail = 'pass'
        elif pass_fail == False:
            self.pass_fail = 'fail'

    def gen_condition_str(self, df_name: str):
        """ 将规则表格中的特殊条件转化为代码格式 """

        logi_symbols = ['|', '&']
        parentheses = ['(', ')']
        my_condition = self.condition

        for this_symbol in logi_symbols + parentheses:
            my_condition = my_condition.replace(this_symbol, ',' + this_symbol + ',')
        elements_list = [x.strip(' ') for x in my_condition.split(',') if x != '']

        condition_str = ""

        for this_element in elements_list:
            if this_element in logi_symbols:
                condition_str += f" {this_element} "
            elif this_element in parentheses:
                condition_str += this_element
            else:
                if '为空' in this_element:
                    this_element = this_element.split('为空')[0]
                    condition_str += general.covert_field(df_name, this_element) + ".isnull()"
                else:
                    condition_str += general.parse_equation(df_name, this_element)

        if self.pass_fail == 'fail':
            condition_str = f"~({condition_str})"

        return condition_str

