from django.urls import path
from .views import CategoriesApiListView,SizesApiListView, ColorApiListView, product_api_view_delete,cart_api_view_delete, cart_api_view_create, CartApiListView, order_api_view_delete, order_api_view_create,order_api_view_delete_all, product_api_view_create,product_api_view_update,product_api_view_detail, ProductApiListView


urlpatterns = [
    # ------------------------Product Urls------------------
    path('product/<int:pk>', product_api_view_detail, name='product_detailview'),
    path('product/update/<int:pk>', product_api_view_update, name='product_updateview'),
    path('product/delete/<int:pk>', product_api_view_delete, name='product_deleteview'),
    path('product/create/', product_api_view_create, name='product_createview'),
    path('all/products/', ProductApiListView.as_view(), name='product_listView'),

    # ------------------------Cart Urls------------------
    path('cart/<int:pk>', cart_api_view_delete, name='cart_deleteview'),
    path('cart/create/', cart_api_view_create, name='cart_createview'),
    path('all/carts/', CartApiListView.as_view(), name='cart_listView'),

    # ------------------------Order Urls------------------
    path('cart/delete/<int:pk>', order_api_view_delete, name='order_deleteview'),
    path('cart/delete/all', order_api_view_delete_all, name='all_order_deleteview'),
    path('order/create/', order_api_view_create, name='order_createview'),

    # ------------------------Categories, Sizes, Colors, Urls------------------
    path('colors/', ColorApiListView.as_view(), name='colors'),
    path('sizes/', SizesApiListView.as_view(), name='sizes'),
    path('categories/', CategoriesApiListView.as_view(), name='categories'),
]