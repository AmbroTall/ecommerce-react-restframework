from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    # username = serializers.SerializerMethodField('get_username_from_author')
    class Meta:
        model = Product
        fields = ('id','name','desc','img','created_at','slug')

    # def get_username_from_author(self,blog):
    #     username = blog.author.username
    #     return username