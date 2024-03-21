import json

from AppApi.CommonFunctions import maxima_minima
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import (Admin, BelongsTo, CustomerPhoneNumber, Customers,
                     DeliveryPartner, Involves, Item, Order, RatedBy, Rates,
                     Sells, ShoppingCart, Vendor)
from .serializers import (AdminSerializer, BelongsToSerializer,
                          CustomerPhoneNumberSerializer, CustomersSerializer,
                          DeliveryPartnerSerializer, InvolvesSerializer,
                          ItemSerializer, OrderSerializer, RatedBySerializer,
                          RatesSerializer, SellsSerializer,
                          ShoppingCartSerializer, VendorSerializer)


@api_view(['GET', 'POST'])
def GetMaxima_Minima(request):
  data = request.data
  print(data)
  return Response(maxima_minima(str(data['function1'])))


class customerViewSet(viewsets.ModelViewSet):
  queryset = Customers.objects.all()
  serializer_class = CustomersSerializer
  

class AdminViewSet(viewsets.ModelViewSet):
  queryset = Admin.objects.all()
  serializer_class = AdminSerializer
  
class CustomerPhoneNumberViewSet(viewsets.ModelViewSet):
  queryset = CustomerPhoneNumber.objects.all()
  serializer_class = CustomerPhoneNumberSerializer
  
class DeliveryPartnerViewSet(viewsets.ModelViewSet):
  queryset = DeliveryPartner.objects.all()
  serializer_class = DeliveryPartnerSerializer
  
class ItemViewSet(viewsets.ModelViewSet):
  queryset = Item.objects.all()
  serializer_class = ItemSerializer
  
class OrderViewSet(viewsets.ModelViewSet):
  queryset = Order.objects.all()
  serializer_class = OrderSerializer
  
class BelongsToViewSet(viewsets.ModelViewSet):
  queryset = BelongsTo.objects.all()
  serializer_class = BelongsToSerializer
  
class RatedByViewSet(viewsets.ModelViewSet):
  queryset = RatedBy.objects.all()
  serializer_class = RatedBySerializer
  
class RatesViewSet(viewsets.ModelViewSet):
  queryset = Rates.objects.all()
  serializer_class = RatesSerializer
  
class ShoppingCartViewSet(viewsets.ModelViewSet):
  queryset = ShoppingCart.objects.all()
  serializer_class = ShoppingCartSerializer

class VendorViewSet(viewsets.ModelViewSet):
  queryset = Vendor.objects.all()
  serializer_class = VendorSerializer

class InvolvesViewSet(viewsets.ModelViewSet):
  queryset = Involves.objects.all()
  serializer_class = InvolvesSerializer
  
class SellsViewSet(viewsets.ModelViewSet):
  queryset = Sells.objects.all()
  serializer_class = SellsSerializer