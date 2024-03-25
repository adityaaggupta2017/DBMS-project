from AppApi.views import *
from django import urls
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'customers' , customerViewSet)
router.register(r'Admin' , AdminViewSet)
router.register(r'DeliveryPartner' , DeliveryPartnerViewSet)
router.register(r'Category' , CategoryViewSet)
router.register(r'Item' , ItemViewSet)
router.register(r'Order' , OrderViewSet)
router.register(r'ShoppingCart' , ShoppingCartViewSet)
router.register(r'Vendor' , VendorViewSet)




urlpatterns = [
    path('' , include(router.urls)) ,
    path('GenCmd' , GenCmd) ,
    
]
