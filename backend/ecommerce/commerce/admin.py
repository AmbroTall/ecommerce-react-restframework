from django.contrib import admin

from .models import Product,ProductSize,ProductColor,ProductCategories, Cart, Order


admin.site.register(Product)
admin.site.register(ProductSize)
admin.site.register(ProductColor)
admin.site.register(ProductCategories)
admin.site.register(Cart)
admin.site.register(Order)


