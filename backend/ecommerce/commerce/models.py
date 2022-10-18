from django.db import models
from account.models import Account
from django.conf import settings



class ProductCategories(models.Model):
    id = models.AutoField(primary_key=True)
    prod_cat = models.CharField(max_length=50)

    def __str__(self):
        return self.prod_cat


class ProductColor(models.Model):
    id = models.AutoField(primary_key=True)
    color_name = models.CharField(max_length=50)

    def __str__(self):
        return self.color_name


class ProductSize(models.Model):
    id = models.AutoField(primary_key=True)
    size = models.CharField(max_length=50)

    def __str__(self):
        return self.size


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, unique=True)
    img = models.ImageField(upload_to='images')
    cat = models.ForeignKey(ProductCategories, on_delete=models.CASCADE)
    size = models.ManyToManyField(ProductSize)
    color = models.ManyToManyField(ProductColor)
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title} '


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    total_price = models.IntegerField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.title

    def save(self,  *args,**kwargs):
        self.total_price = self.product.price * self.quantity
        super(Order, self).save(*args, **kwargs)


class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    items = models.ManyToManyField(Order)
    net_price = models.IntegerField(blank=True)
    ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

    def save(self,  *args,**kwargs):
        self.net_price = 0
        for item in Order.objects.all():
            self.net_price += item.total_price
        super(Cart, self).save(*args, **kwargs)




