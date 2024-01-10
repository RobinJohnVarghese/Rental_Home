from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from .serializers import AdminSerializer
from rest_framework import generics, permissions, status
from accounts.models import *
from accounts.serializers import UserRegistrationSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.



class AdminLoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        email = request.data.get('email')

        password = request.data.get('password')
        print('******email******', email)


        user = authenticate(request, email=email, password=password)
        print('***********', user)

        if user is not None and user.is_staff:
            refresh = RefreshToken.for_user(user)
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.name,
                    'email': user.email,
                    # Add other user details as needed
                }
            }
            print("Tokens",tokens)
            return Response(tokens, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    
class UserListView(APIView):
    def get(self, request, format=None):
        users = UserAccount.objects.all()
        # permission_classes = (permissions.AllowAny, )
        serializer = AdminSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class UserBlockView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request,user_id, format=None):
        user = UserAccount.objects.get(id=user_id)
        user.is_active = False
        user.save()
        serializer = AdminSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class UserUnblockView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id, format=None):
        user = UserAccount.objects.get(id=user_id)
        user.is_active = True
        user.save()
        serializer = AdminSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)




class UserSearchView(APIView):
    def get(self, request, *args, **kwargs):
        print('request:', request)
        try:
            search_term = request.query_params.get('search', '')
            users = UserAccount.objects.filter(
                Q(name__icontains=search_term) |
                Q(email__icontains=search_term)

            )
            print('USERS:', users)
            serializer = UserRegistrationSerializer(users, many=True)
            print("serializer serializer ", serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)