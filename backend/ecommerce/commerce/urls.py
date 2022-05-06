from django.urls import path
from .views import api_view_delete,api_view_create,api_view_update,api_view_detail,ProductApiListView


urlpatterns = [
    path('product/<int:pk>', api_view_detail, name='detailview'),
    path('product/update/<int:pk>', api_view_update, name='updateview'),
    path('product/delete/<int:pk>', api_view_delete, name='deleteview'),
    path('create/', api_view_create, name='createview'),
    path('all/products/', ProductApiListView.as_view(), name='listView'),
]