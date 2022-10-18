from rest_framework import serializers
from .models import Product, Order, Cart, ProductSize, ProductCategories, ProductColor

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ('size',)

class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ('color_name',)

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = ('prod_cat',)

class ProductSerializer(serializers.ModelSerializer):
    cat = serializers.SlugRelatedField(
        queryset=ProductCategories.objects.all(),
        slug_field='prod_cat'
    )
    size = ProductSizeSerializer(read_only=True, many=True)
    color = ProductColorSerializer(read_only=True, many=True)
    class Meta:
        model = Product
        fields = ('id','title','img','cat','size','color','price','created_at')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id','product','quantity','color','size','total_price','created_at')


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'net_price', 'ordered', 'created_at')