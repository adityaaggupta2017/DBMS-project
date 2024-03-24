from django.db import models


class Admin(models.Model):
    AdminID = models.AutoField(primary_key=True)
    Admin_Name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    Admin_role = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'admin'
    

class Customers(models.Model):
    customer_id = models.AutoField(primary_key=True)
    Name_of_the_customer = models.CharField(max_length=50)
    Delivery_Address = models.CharField(max_length=50)
    Email_Address = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    Phone_number = models.BigIntegerField()
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE, db_column='AdminID')
    
    class Meta:
        db_table = 'customers'

class DeliveryPartner(models.Model):
    PartnerID = models.AutoField(primary_key=True)
    Name_of_the_partner = models.CharField(max_length=50)
    Vehicle_Details = models.CharField(max_length=50)
    Phone_number  = models.BigIntegerField()
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'delivery_partner'

class category(models.Model):
    CategoryID = models.AutoField(primary_key=True)
    Category_Name = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'category'
        
class Item(models.Model):
    ProductID = models.AutoField(primary_key=True)
    Name_of_the_item = models.CharField(max_length=50)
    Availability = models.IntegerField()
    Description = models.CharField(max_length=50)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    CategoryID = models.ForeignKey(category , on_delete=models.CASCADE , db_column='CategoryID')
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'item'
    
class Vendor(models.Model):
    VendorID = models.AutoField(primary_key=True)
    Name_of_the_vendor = models.CharField(max_length=50)
    Contact_Details = models.CharField(max_length=50)
    Address = models.CharField(max_length=50)
    AdminID = models.ForeignKey(Admin, on_delete=models.CASCADE , db_column='AdminID')
    
    class Meta:
        db_table = 'vendor'
        
class Order(models.Model):
    OrderID = models.AutoField(primary_key=True)
    OrderDate = models.DateField()
    Mode_of_payment = models.CharField(max_length=50)
    Total_Bill = models.FloatField()
    Trip_Status = models.IntegerField()
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='CustomerID')
    PartnerID = models.ForeignKey(DeliveryPartner, on_delete=models.CASCADE, db_column='PartnerID')
    VendorID = models.ForeignKey(Vendor, on_delete=models.CASCADE, db_column='VendorID')
    
    class Meta:
        db_table = 'order'

class BelongsTo(models.Model):
    id = models.AutoField(primary_key=True)
    OrderID = models.ForeignKey(Order, on_delete=models.CASCADE , db_column='OrderID')
    ProductID = models.ForeignKey(Item, on_delete=models.CASCADE , db_column='ProductID')
    
    class Meta:
        db_table = 'belongsto'
        

    
class ShoppingCart(models.Model):
    Shopping_Cart_ID = models.AutoField(primary_key=True)
    Item_details = models.CharField(max_length=500)
    Total_price = models.FloatField()
    CustomerID = models.ForeignKey(Customers, on_delete=models.CASCADE , db_column='CustomerID')
    
    class Meta:
        db_table = 'shopping_cart'


# this is the genproc
class GenProc(models.Model):
    # Genid = models.IntegerField(primary_key = True)
    InputOutputText = models.TextField(primary_key = True) 

