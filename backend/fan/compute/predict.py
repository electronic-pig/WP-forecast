import pandas as pd
import numpy as np
import os
from paddlets import TSDataset
from paddlets.ensemble import StackingEnsembleForecaster
from paddlets.transform import StandardScaler, TimeFeatureGenerator
from fan.settings import CSV_DOWNLOAD


# Adjust the working directory to the directory of the current script
os.chdir(os.path.dirname(__file__))


def cleanData(df,i):
    ssh = [200000,125000,100000,80000,125000,100000,100000,40000,200000,50000]
    df.loc[(abs(df['ROUND(A.WS,1)']>40)) & (df['WINDSPEED'].notnull()), 'ROUND(A.WS,1)'] = df.loc[
        (df['ROUND(A.WS,1)']>40) & (df['WINDSPEED'].notnull()), 'WINDSPEED']
    df.loc[(abs(df['ROUND(A.WS,1)']<0.5)) & (df['WINDSPEED'].notnull()), 'ROUND(A.WS,1)'] = df.loc[
        (abs(df['ROUND(A.WS,1)']<0.5)) & (df['WINDSPEED'].notnull()), 'WINDSPEED']
    df.loc[(abs(df['ROUND(A.POWER,0)'])>ssh[i]) & (df['PREPOWER'].notnull()), 'ROUND(A.POWER,0)'] = df.loc[
        (abs(df['ROUND(A.POWER,0)'])>ssh[i]) & (df['PREPOWER'].notnull()), 'PREPOWER']
    df.loc[(abs(df['YD15'])>ssh[i]) & (df['PREPOWER'].notnull()), 'YD15'] = df.loc[
        (abs(df['YD15'])>ssh[i]) & (df['PREPOWER'].notnull()), 'PREPOWER']

    # 读取数据
    df.loc[(df['ROUND(A.WS,1)'].isnull()) & (df['WINDSPEED'].notnull()), 'ROUND(A.WS,1)'] = df.loc[
        (df['ROUND(A.WS,1)'].isnull()) & (df['WINDSPEED'].notnull()), 'WINDSPEED']
    df.loc[(df['ROUND(A.POWER,0)'].isnull()) & (df['YD15'].notnull()), 'ROUND(A.POWER,0)'] = df.loc[
        (df['ROUND(A.POWER,0)'].isnull()) & (df['YD15'].notnull()), 'YD15']
    df.loc[(df['ROUND(A.POWER,0)'].isnull()) & (df['PREPOWER'].notnull()), 'ROUND(A.POWER,0)'] = df.loc[
        (df['ROUND(A.POWER,0)'].isnull()) & (df['PREPOWER'].notnull()), 'PREPOWER']
    df.loc[(df['ROUND(A.POWER,0)'].notnull()) & (df['YD15'].isnull()), 'YD15'] = df.loc[
        (df['ROUND(A.POWER,0)'].notnull()) & (df['YD15'].isnull()), 'ROUND(A.POWER,0)']

    for col in df.columns.tolist():
        if  col == 'YD15' or col == 'ROUND(A.POWER,0)' or col == 'WINDSPEED':
            df.drop(df[(df[col] > (df[col].mean() + 4 * df[col].std())) | (
                        df[col] < (df[col].mean() - 4 * df[col].std()))].index, inplace=True)

    df.loc[(df['ROUND(A.WS,1)'].isnull()) & (df['WINDSPEED'].notnull()), 'ROUND(A.WS,1)'] = df.loc[
        (df['ROUND(A.WS,1)'].isnull()) & (df['WINDSPEED'].notnull()), 'WINDSPEED']
    df.loc[(df['ROUND(A.POWER,0)'].isnull()) & (df['YD15'].notnull()), 'ROUND(A.POWER,0)'] = df.loc[
        (df['ROUND(A.POWER,0)'].isnull()) & (df['YD15'].notnull()), 'YD15']
    df.loc[(df['ROUND(A.POWER,0)'].isnull()) & (df['PREPOWER'].notnull()), 'ROUND(A.POWER,0)'] = df.loc[
        (df['ROUND(A.POWER,0)'].isnull()) & (df['PREPOWER'].notnull()), 'PREPOWER']
    df.loc[(df['ROUND(A.POWER,0)'].notnull()) & (df['YD15'].isnull()), 'YD15'] = df.loc[
        (df['ROUND(A.POWER,0)'].notnull()) & (df['YD15'].isnull()), 'ROUND(A.POWER,0)']

    df.loc[(df['ROUND(A.WS,1)'].isnull()), 'ROUND(A.WS,1)'] = 0
    df.loc[(df['ROUND(A.POWER,0)'].isnull()), 'ROUND(A.POWER,0)'] = 0
    df.loc[(df['YD15'].isnull()), 'YD15'] = 0

    # 如果实际功率为0，但预测功率不为0，则将预测功率置为0
    df.loc[(df['ROUND(A.POWER,0)'] == 0) & (df['YD15'] != 0), 'YD15'] = 0
    # # 如果实际功率不为0，但预测功率为0，则将预测功率置为实际功率
    df.loc[(df['ROUND(A.POWER,0)'] == 0) & (df['PREPOWER'] != 0), 'ROUND(A.POWER,0)'] = df.loc[
        (df['ROUND(A.POWER,0)'] == 0) & (df['PREPOWER'] != 0), 'PREPOWER']
    df.loc[(df['ROUND(A.POWER,0)'] != 0) & (df['YD15'] == 0), 'YD15'] = df.loc[
        (df['ROUND(A.POWER,0)'] != 0) & (df['YD15'] == 0), 'ROUND(A.POWER,0)']

    df['ROUND(A.POWER,0)'] = df['PREPOWER']
    df['YD15'] = df['PREPOWER']
    return df

def forecast(df,turbine_id,outputLen):
    # 模型加载
    loaded_reg = StackingEnsembleForecaster.load("model/reg"+str(turbine_id),"paddlets-stacking-forecaster-partial.pkl")

    test_dataset = TSDataset.load_from_dataframe(
        df,
        time_col='DATATIME',
        target_cols=['YD15'],
        observed_cov_cols=['ROUND(A.WS,1)', 'ROUND(A.POWER,0)', 'HUMIDITY', 'TEMPERATURE', 'WINDDIRECTION'],
        known_cov_cols=['WINDSPEED', 'PREPOWER', 'PRESSURE'],
        freq='15min',
        fill_missing_dates=True,
        fillna_method='pre'
    )

    # 时间特征工程
    TFGenerator = TimeFeatureGenerator(
        feature_cols=['year','month', 'day', 'weekday', 'hour', 'quarter', 'dayofyear', 'weekofyear']
    )
    test_dataset = TFGenerator.transform(test_dataset)
    # test_dataset, _ = test_dataset.split(len(test_dataset.target) - (19 + 24) * 4)

    scaler = StandardScaler()
    scaler.fit(test_dataset)
    test_dataset_scaled = scaler.transform(test_dataset)


    # 模型预测
    result_scaled = loaded_reg.recursive_predict(test_dataset_scaled,predict_length = outputLen)
    result = scaler.inverse_transform(result_scaled)
    result = result.to_dataframe()
    result = result.reset_index()
    
    # # 传入风场风机ID
    # result['TurbID'] = turbine_id

    
    # 重新调整字段名称和顺序
    result.rename(columns={"index": "DATATIME"}, inplace=True)
    result = result[['DATATIME', 'YD15']]
    # 写入文件
    with open(os.path.join(CSV_DOWNLOAD,'yyk_out.csv'),'wb') as fout:
        result.to_csv(fout, index=False)
        fout.close()


    keys = ['DATATIME','YD15']
    j = 0
    for i in range(len(result['YD15'])):
        if j == 0:
            res = {'0':dict(zip(keys,[result['DATATIME'][i],result['YD15'][i]]))}
        else:
            res.update({str(j):dict(zip(keys,[result['DATATIME'][i],result['YD15'][i]]))})
        j = j + 1
    return res

def readCSV(infile,turbine_id):
    df = pd.read_csv(infile,
                        parse_dates=['DATATIME'],
                        infer_datetime_format=True,
                        dayfirst=True,
                        dtype={
                            'WINDDIRECTION': np.float64,
                            'HUMIDITY': np.float64,
                            'PRESSURE': np.float64,
                            # 'TurbID': np.int
                        })
    # 因为数据批次不同，数据集中有一些时间戳重复的脏数据，送入paddlets前要进行处理，本赛题要求保留第一个数据
    df = df.drop_duplicates(subset=['DATATIME'], keep='first')
    df = cleanData(df,turbine_id-11)
    return df



