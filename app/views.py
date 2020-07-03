from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.http import HttpResponse
import detect
import base64
import time
import os

# Create your views here.

def index(request):
    return render(request,'index.html')

#@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        print("debug")
        print(request.POST['pp'])
        print(type(request.POST['imgdata']))
        #print(request.POST['imgdata'])
        print("debug")
        imgData = base64.b64decode(request.POST['imgdata'].replace('data:image/png;base64,', ''))

        filename='files/233311.jpg'
        #filename='files/'+str(int(round(time.time() * 1000))) + '.jpg'
        file = open(filename, 'wb')
        file.write(imgData)
        file.close()
        result = detect.detectperson(filename)
        print(result)
        return HttpResponse(result[0])
    else:
         return render(request,'index.html')