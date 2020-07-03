# -*- coding: utf-8 -*-
import requests
import base64

def detectperson(filepath):
    #获取access_token
    #client_id 为官网获取的AK， client_secret 为官网获取的SK
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OvceO08lXjlnVFmZ6YXpKDYr&client_secret=hr9ftT73WrDqp54hBRSzbwj2NYGgHbs6'
    #header={'Content-Type': 'application/json; charset=UTF-8'}
    #response1=requests.post(url=host,headers=header)#<class 'requests.models.Response'>
    response1 = requests.get(host)
    json1 = response1.json()#<class 'dict'>
    access_token=json1['access_token']
    #转换图片格式
    #filepath='test04.jpg'
    f = open(r'%s' % filepath, 'rb')
    pic = base64.b64encode(f.read())
    f.close()
    base641=str(pic,'utf-8')
    #print(base64)
    #访问人脸检测api
    request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
    params = {"image":base641,"image_type":"BASE64","face_field":"faceshape,facetype,beauty,age,gender,expression,glasses"}
    header={'Content-Type': 'application/json'}
    request_url = request_url + "?access_token=" + access_token
    response1=requests.post(url=request_url,data=params,headers=header)#<class 'requests.models.Response'>
    json1 = response1.json()#<class 'dict'>
    result=[json1["result"]["face_list"][0]['beauty'],json1["result"]["face_list"][0]['age'],json1["result"]["face_list"][0]['gender']['type'],json1["result"]["face_list"][0]['expression']['type'],json1["result"]["face_list"][0]['glasses']['type']]
    print(result)
    return result

if "__main__" == __name__:
    detectperson('1593680888128.jpg')
