from django.db import models


class Admin(models.Model):
    AdminID = models.AutoField(primary_key=True)
    Admin_Name = models.CharField(max_length=50)
    Admin_role = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'admin'
    

class Customers(models.Model):
    customer_id = models.AutoField(primary_key=True)
    Name_of_the_customer = models.CharField(max_length=50)
    Delivery_Address = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE, db_column='AdminID')
    
    class Meta:
        db_table = 'customers'

class CustomerPhoneNumber(models.Model):    
    id = models.AutoField(primary_key=True)
    Customer_id = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='Customer_id' ) 
    Phone_number = models.BigIntegerField()
    
    class Meta:
        
        db_table = 'customer_phone_number'

class DeliveryPartner(models.Model):
    PartnerID = models.AutoField(primary_key=True)
    Name_of_the_partner = models.CharField(max_length=50)
    Vehicle_Details = models.CharField(max_length=50)
    Cumulative_Rating = models.FloatField()
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'delivery_partner'

class Item(models.Model):
    ProductID = models.AutoField(primary_key=True)
    Name_of_the_item = models.CharField(max_length=50)
    Availability = models.IntegerField()
    Description = models.CharField(max_length=50)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'item'
    

class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    Pick_Up_Location = models.CharField(max_length=50)
    Drop_Off_Location = models.CharField(max_length=50)
    Trip_Distance = models.IntegerField()
    Trip_Duration = models.IntegerField()
    Feedback_of_the_order = models.CharField(max_length=50)
    Mode_of_payment = models.CharField(max_length=50)
    Total_Bill = models.FloatField()
    Trip_Status = models.IntegerField()
    Notes = models.CharField(max_length=50)
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='CustomerID')
    PartnerID = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE, db_column='PartnerID')
    
    class Meta:
        db_table = 'order'

class BelongsTo(models.Model):
    id = models.AutoField(primary_key=True)
    OrderID = models.ForeignKey(Order, on_delete=models.CASCADE , db_column='OrderID')
    ProductID = models.ForeignKey(Item, on_delete=models.CASCADE , db_column='ProductID')
    
    class Meta:
        db_table = 'belongsto'

class RatedBy(models.Model):
    id = models.AutoField(primary_key=True)
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE, db_column='CustomerID')
    PartnerID = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE , db_column='PartnerID')
    
    class Meta:
        db_table = 'rated_by'

class Rates(models.Model):
    id = models.AutoField(primary_key=True)
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='CustomerID')
    PartnerID = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE , db_column='PartnerID')

    class Meta:
        db_table = 'rates'
    
class ShoppingCart(models.Model):
    Shopping_Cart_ID = models.AutoField(primary_key=True)
    Item_details = models.CharField(max_length=500)
    Total_price = models.FloatField()
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='CustomerID')
    
    class Meta:
        db_table = 'shopping_cart'

class Vendor(models.Model):
    VendorID = models.AutoField(primary_key=True)
    Name_of_the_vendor = models.CharField(max_length=50)
    Contact_Details = models.CharField(max_length=50)
    Address = models.CharField(max_length=50)
    Total_Transactions = models.CharField(max_length=50)
    Latest_Feedback = models.CharField(max_length=50)
    Current_Rating = models.CharField(max_length=50)
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'vendor'

class Involves(models.Model):
    id = models.AutoField(primary_key=True)
    VendorID = models.ForeignKey(Vendor, on_delete=models.CASCADE , db_column='VendorID')
    OrderID = models.ForeignKey(Order, on_delete=models.CASCADE ,   db_column='OrderID')
    
    class Meta:
        db_table = 'involves'

class Sells(models.Model):
    id = models.AutoField(primary_key=True)
    VendorID = models.ForeignKey(Vendor, on_delete=models.CASCADE , db_column='VendorID')
    ProductID = models.ForeignKey(Item, on_delete=models.CASCADE , db_column='ProductID')

    class Meta:
        db_table = 'sells'