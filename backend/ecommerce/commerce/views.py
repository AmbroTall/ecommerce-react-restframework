from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ProductSerializer
from .models import Product
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication


@api_view(['GET',])
# @permission_classes((IsAuthenticated,))
def api_view_detail(request, pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # user = request.user
    # if blog.author != user:
    #     return Response({'response': "You do not have permission"})

    if request.method == 'GET':
        serializer = BlogSerializer(product)
        return Response(serializer.data)


@api_view(['PUT',])
# @permission_classes((IsAuthenticated,))
def api_view_update(request,pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # user = request.user
    # if blog.auther != user:
    #     return Response({'response': "You do not have permission"})

    if request.method == 'PUT':
        serializer = BlogSerializer(product, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = "Product Updated Successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE',])
# @permission_classes(([],))
def api_view_delete(request, pk=None):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # user = request.user
    # if blog.auther != user:
    #     return Response({'response': "You do not have permission"})

    if request.method == 'DELETE':
        operation = product.delete()
        data = {}

        if operation:
            data['success'] = 'Successfully deleted blog'
        else:
            data['failure'] = 'Delete failed'

        return Response(data=data)

@api_view(['POST',])
def api_view_create(request):
    # account = request.user
    # product = Product(author=account)
    product = Product(author=account)
  

    if request.method == 'POST':
        serializer = BlogSerializer(product, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProductApiListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name', 'desc', 'author__username')