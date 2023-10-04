import os 
from django.shortcuts import render
import compute.predict as cp 
from django.http import HttpResponse, JsonResponse, FileResponse
import fan.settings as set
from fan.settings import CSV_DOWNLOAD


# Create your views here.

def confirmConnection(request):
    return JsonResponse({"status":"successful"})

def predict(request):
    username = request.POST.get('username')
    turbid = int(request.POST.get('turbid'))
    
    outputLen = int(request.POST.get('outputLen'))

    file = request.FILES.get('file')

    with open(os.path.join(set.CSV_UPLOAD,username + '.csv'),'wb') as fout:
        for chunk in file.chunks():
            fout.write(chunk)

    # # print(username)
    # print(type(turbid))
    # print(type(outputLen))
    # # print(turbid)
    # print(outputLen)

    # print(file)
    df = cp.readCSV(os.path.join(set.CSV_UPLOAD,username + '.csv'),turbid)
    js = cp.forecast(df,turbid,outputLen)

    return JsonResponse(js)

def downLoadFile(request):
    file_path = os.path.join(CSV_DOWNLOAD,'yyk_out.csv')
    print(file_path)
    # 返回FileResponse对象，将文件内容发送给前端
    with open(file_path, 'rb') as fin:
        response = HttpResponse(fin.read(), content_type="application/octet-stream")
        # 设置响应头，指定下载文件的名称
        response['Content-Disposition'] = f'attachment; filename="predict.csv"'

        # response["Content-Type"] = "application/octet-stream" 
        # response["Access-Control-Expose-Headers"] = "Content-Disposition"

    return response

   
   