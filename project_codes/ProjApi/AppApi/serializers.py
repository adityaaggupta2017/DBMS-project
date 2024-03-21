from rest_framework import serializers

from .models import *


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = '__all__'


class CustomerPhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerPhoneNumber
        fields = '__all__'


class DeliveryPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPartner
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class BelongsToSerializer(serializers.ModelSerializer):
    class Meta:
        model = BelongsTo
        fields = '__all__'


class RatedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = RatedBy
        fields = '__all__'


class RatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rates
        fields = '__all__'


class ShoppingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = '__all__'


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class InvolvesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Involves
        fields = '__all__'


class SellsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sells
        fields = '__all__'
