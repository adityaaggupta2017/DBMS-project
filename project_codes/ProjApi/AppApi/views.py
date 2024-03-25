import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import *
from .serializers import *


class customerViewSet(viewsets.ModelViewSet):
  queryset = Customers.objects.all()
  serializer_class = CustomersSerializer
  

class AdminViewSet(viewsets.ModelViewSet):
  queryset = Admin.objects.all()
  serializer_class = AdminSerializer
  
  
class DeliveryPartnerViewSet(viewsets.ModelViewSet):
  queryset = DeliveryPartner.objects.all()
  serializer_class = DeliveryPartnerSerializer
  
class CategoryViewSet(viewsets.ModelViewSet):
  queryset = category.objects.all()
  serializer_class = CategorySerializer
class ItemViewSet(viewsets.ModelViewSet):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer

  
class ShoppingCartViewSet(viewsets.ModelViewSet):
  queryset = ShoppingCart.objects.all()
  serializer_class = ShoppingCartSerializer

class VendorViewSet(viewsets.ModelViewSet):
  queryset = Vendor.objects.all()
  serializer_class = VendorSerializer


@api_view(['GET', 'POST'])
def GenCmd(request):
  data = json.dumps(request.data)
  #print("h3",data)
  

  # print("H1",sproc_params)
  serializer  = GenProcSerializers(GenProc.objects.raw('call Proc_DynamicExec(%s)', [data] ), many=True)
  print(serializer.data[0])
  return Response(json.loads(serializer.data[0].get('InputOutputText')))