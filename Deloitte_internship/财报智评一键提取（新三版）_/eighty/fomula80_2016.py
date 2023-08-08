from WindPy import w
import pandas as pd

def wss_get2016(code):
    data=[]
    #按行业
    segment_sales_industry=w.wss(code, "segment_sales", "rptDate=20161231;order=1")
    segment_industry1 = w.wss(code,
                             "segment_industry_item,segment_industry_sales1,segment_industry_cost1,segment_industry_profit1",
          "rptDate=20161231;order=1;unit=1;currencyType=Cur=CNY")
    segment_industry2 = w.wss(code,
                              "segment_industry_item,segment_industry_sales1,segment_industry_cost1,segment_industry_profit1",
          "rptDate=20161231;order=2;unit=1;currencyType=Cur=CNY")
    segment_industry3 = w.wss(code,
                              "segment_industry_item,segment_industry_sales1,segment_industry_cost1,segment_industry_profit1",
          "rptDate=20161231;order=3;unit=1;currencyType=Cur=CNY")
    segment_industry4 = w.wss(code,
                              "segment_industry_item,segment_industry_sales1,segment_industry_cost1,segment_industry_profit1",
            "rptDate=20161231;order=4;unit=1;currencyType=Cur=CNY")
    segment_industry5 = w.wss(code,
                              "segment_industry_item,segment_industry_sales1,segment_industry_cost1,segment_industry_profit1",
            "rptDate=20161231;order=5;unit=1;currencyType=Cur=CNY")
    #按产品
    segment_sales_product=w.wss(code, "segment_sales","rptDate=20161231;order=2")
    segment_product1=w.wss(code,
                          "segment_product_item,segment_product_sales1,segment_product_cost1,segment_product_profit1",
                          "rptDate=20161231;order=1;unit=1;currencyType=Cur=CNY")
    segment_product2=w.wss(code,
                           "segment_product_item,segment_product_sales1,segment_product_cost1,segment_product_profit1",
                        "rptDate=20161231;order=2;unit=1;currencyType=Cur=CNY")
    segment_product3 = w.wss(code,
                             "segment_product_item,segment_product_sales1,segment_product_cost1,segment_product_profit1",
                             "rptDate=20161231;order=3;unit=1;currencyType=Cur=CNY")
    segment_product4 = w.wss(code,
                             "segment_product_item,segment_product_sales1,segment_product_cost1,segment_product_profit1",
                             "rptDate=20161231;order=4;unit=1;currencyType=Cur=CNY")
    segment_product5 = w.wss(code,
                             "segment_product_item,segment_product_sales1,segment_product_cost1,segment_product_profit1",
                             "rptDate=20161231;order=5;unit=1;currencyType=Cur=CNY")
    #按地区
    segment_sales_region=w.wss(code, "segment_sales","rptDate=20161231;order=3")
    segment_region1 = w.wss(code,
                          "segment_region_item,segment_region_sales1,segment_region_cost1,segment_region_profit1",
                          "rptDate=20161231;order=1;unit=1;currencyType=Cur=CNY")
    segment_region2 = w.wss(code,
                            "segment_region_item,segment_region_sales1,segment_region_cost1,segment_region_profit1",
                            "rptDate=20161231;order=2;unit=1;currencyType=Cur=CNY")
    segment_region3 = w.wss(code,
                            "segment_region_item,segment_region_sales1,segment_region_cost1,segment_region_profit1",
                            "rptDate=20161231;order=3;unit=1;currencyType=Cur=CNY")
    segment_region4 = w.wss(code,
                            "segment_region_item,segment_region_sales1,segment_region_cost1,segment_region_profit1",
                            "rptDate=20161231;order=4;unit=1;currencyType=Cur=CNY")
    segment_region5 = w.wss(code,
                            "segment_region_item,segment_region_sales1,segment_region_cost1,segment_region_profit1",
                            "rptDate=20161231;order=5;unit=1;currencyType=Cur=CNY")
    stmnote_seg=w.wss(code, "stmnote_seg_1501","unit=1;rptDate=20161231")
    #1年以内
    stmnote_ar1=w.wss(code, "stmnote_ar_1,stmnote_ar_2,stmnote_ar_3","unit=1;rptDate=20161231;accYear=1")
    stmnote_ar2 = w.wss(code, "stmnote_ar_1,stmnote_ar_2,stmnote_ar_3", "unit=1;rptDate=20161231;accYear=2")
    stmnote_ar3 = w.wss(code, "stmnote_ar_1,stmnote_ar_2,stmnote_ar_3", "unit=1;rptDate=20161231;accYear=3")
    stmnote_ar4 = w.wss(code, "stmnote_ar_1,stmnote_ar_2,stmnote_ar_3", "unit=1;rptDate=20161231;accYear=4")

    stmnote_ar_cat1=w.wss(code, "stmnote_ar_cat", "unit=1;rptDate=20161231;Category=0")
    stmnote_ar_cat2=w.wss(code, "stmnote_ar_cat", "unit=1;rptDate=20161231;Category=1")
    stmnote_ar_cat3=w.wss(code, "stmnote_ar_cat", "unit=1;rptDate=20161231;Category=2")
    stmnote_ar_cat4=w.wss(code, "stmnote_ar_cat", "unit=1;rptDate=20161231;Category=3")

    data.append(segment_sales_industry.Data)
    data.append(segment_industry1.Data)
    data.append(segment_industry2.Data)
    data.append(segment_industry3.Data)
    data.append(segment_industry4.Data)
    data.append(segment_industry5.Data)
    data.append(segment_sales_product.Data)
    data.append(segment_product1.Data)
    data.append(segment_product2.Data)
    data.append(segment_product3.Data)
    data.append(segment_product4.Data)
    data.append(segment_product5.Data)
    data.append(segment_sales_region.Data)
    data.append(segment_region1.Data)
    data.append(segment_region2.Data)
    data.append(segment_region3.Data)
    data.append(segment_region4.Data)
    data.append(segment_region5.Data)
    data.append(stmnote_seg.Data)
    data.append(stmnote_ar1.Data)
    data.append(stmnote_ar2.Data)
    data.append(stmnote_ar3.Data)
    data.append(stmnote_ar4.Data)
    data.append(stmnote_ar_cat1.Data)
    data.append(stmnote_ar_cat2.Data)
    data.append(stmnote_ar_cat3.Data)
    data.append(stmnote_ar_cat4.Data)
    return data









