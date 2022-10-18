from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, ProductCategorySerializer, ProductColorSerializer, ProductSizeSerializer
from .models import Product, Cart, Order, ProductCategories, ProductColor, ProductSize
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser


# -----------------------Product View-----------------------
# Get Single Product
@api_view(['GET',])
def product_api_view_detail(request, pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

# Update
@api_view(['PUT',])
@permission_classes((IsAdminUser,))
@authentication_classes((TokenAuthentication))
def product_api_view_update(request,pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = "Product Updated Successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete View
@api_view(['DELETE',])
@permission_classes((IsAdminUser,))
# @authentication_classes((TokenAuthentication)
def product_api_view_delete(request, pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = product.delete()
        data = {}

        if operation:
            data['success'] = 'Successfully deleted product'
        else:
            data['failure'] = 'Delete failed'

        return Response(data=data)


@api_view(['POST',])
@permission_classes([])
# @authentication_classes((TokenAuthentication))
def product_api_view_create(request):
    product = Product()

    if request.method == 'POST':
        serializer = ProductSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductApiListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')


# -----------------------Cart View-----------------------
# Delete View
@api_view(['DELETE',])
@permission_classes((IsAdminUser,))
@authentication_classes((TokenAuthentication))
def cart_api_view_delete(request, pk=None):
    try:
        cart = Cart.objects.get(id=pk)
    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = cart.delete()
        data = {}

        if operation:
            data['success'] = 'Successfully deleted cart'
        else:
            data['failure'] = 'Delete failed'

        return Response(data=data)


@api_view(['POST',])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication))
def cart_api_view_create(request):
    cart = Cart()

    if request.method == 'POST':
        serializer = CartSerializer(cart, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartApiListView(ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')



# -----------------------Order View-----------------------
# Delete View
@api_view(['DELETE',])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication))
def order_api_view_delete(request, pk=None):
    try:
        order = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = order.delete()
        data = {}

        if operation:
            data['success'] = 'Successfully deleted order'
        else:
            data['failure'] = 'Delete failed'

        return Response(data=data)


# Delete all View
@api_view(['DELETE',])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication))
def order_api_view_delete_all(request):
    try:
        order = Order.objects.all()
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operation = order.delete()
        data = {}

        if operation:
            data['success'] = 'Successfully deleted order'
        else:
            data['failure'] = 'Delete failed'

        return Response(data=data)


@api_view(['POST',])
@permission_classes((IsAuthenticated,))
@authentication_classes((TokenAuthentication))
def order_api_view_create(request):
    order = Order()

    if request.method == 'POST':
        serializer = OrderSerializer(order, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ___________________Fetch All___________________
class CategoriesApiListView(ListAPIView):
    queryset = ProductCategories.objects.all()
    serializer_class = ProductCategorySerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')


class SizesApiListView(ListAPIView):
    queryset = ProductSize.objects.all()
    serializer_class = ProductSizeSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')

class ColorApiListView(ListAPIView):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')
