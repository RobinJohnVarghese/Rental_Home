from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserRegistrationSerializer
from django.conf import settings
from django.middleware import csrf
from django.http import JsonResponse
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions, status
from django.utils import timezone
# from .models import UserToken
# from .models import AccessToken
User = get_user_model()


class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        # print(data.name, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        # required_fields = ['name', 'email', 'password', 'password2']
        # for field in required_fields:
        #     if field not in data:
        #         return Response({'error': f'{field} is missing'})

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)  # Generate token
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            # user = User.objects.create_user(email=email, password=password, name=name)
            user.save()
            return Response(tokens, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
# class LoginView(APIView):
#     def post(self, request, format=None):
#         data = self.request.data
    
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data
        response = Response()
        # print(response,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        email = data.get('email', None)
        password = data.get('password', None)
        # print(email,password,"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        user = authenticate(email=email, password=password)
        # print(email,password,"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")

        if user is not None:
            # print(user,"DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            if user.is_active:
                print(user,"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                data = get_tokens_for_user(user)
                # access_token, created = AccessToken.objects.get_or_create(user=user)
                # access_token.token = data["access"]
                # access_token.save()
                print("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",data)
                response = JsonResponse({
                    "data": data,
                    "user": {
                        "id": user.id,
                        "username": user.email,
                        "name": user.name,
                    }
                })
                
                response.set_cookie(
                    key = settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value = data["access"],
                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                csrf.get_token(request)
                response.data = {"Success" : "Login successfully","data":data}
                return response
            else:
                # print('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
                return Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # print('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
            return Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)
                # token = UserToken.objects.create(email=email, access_token=data["access"])
                # print("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",email,data["access"])
                # token.save()

class LogoutView(APIView):
    def get(self, request):
        response = JsonResponse({"message": "Logged out successfully"})

        # Clear the authentication cookie
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            path='/',
            domain=settings.SIMPLE_JWT.get('AUTH_COOKIE_DOMAIN', None)  # Set to None if not present
        )

        # Expire the cookie immediately
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value='',
            expires=timezone.now() - timedelta(days=1),
            path='/',
            domain=settings.SIMPLE_JWT.get('AUTH_COOKIE_DOMAIN', None)  # Set to None if not present
        )
        # user = request.user
        # access_token = AccessToken.objects.filter(user=user).first()
        # if access_token:
        #     access_token.delete()

        return response


        # if password == password2:
        #     from django.core.exceptions import ValidationError
        #     from django.core.validators import validate_email

        #     try:
        #         validate_email(email)
        #     except ValidationError:
        #         return Response({'error': 'Invalid email format'})
            
        #     if User.objects.filter(email=email).exists():
        #         return Response({'error': 'Email already exists'})
        #     else:
        #         if len(password) < 6:
        #             return Response({'error': 'Password must be at least 6 characters'})
        #         else:
        #             user = User.objects.create_user(email=email, password=password, name=name)

        #             user.save()
        #             return Response({'success': 'User created successfully'})
        # else:
        #     return Response({'error': 'Passwords do not match'})

# def check_email(request, email):
#     # Check if the email exists in the User model
#     email_exists = User.objects.filter(email=email).exists()

#     # Return a JSON response indicating whether the email exists or not
#     return JsonResponse({'exists': email_exists})
# from .serializers import UserRegistrationSerializer
# from django.conf import settings
# from django.middleware import csrf
# from django.http import JsonResponse
# from datetime import timedelta
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework import generics, permissions, status
# from django.utils import timezone
# from rest_framework.permissions import AllowAny, IsAuthenticated


# class SignupView(APIView):
#     def post(self, request, format=None):
#         print(request.data ,"++++++++++++++++++++++++++++++++++")
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)  # Generate token
#             tokens = {
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             }

#             return Response(tokens, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# # class UserLoginView(APIView):
# #     def post(self, request, format=None):
# #         print('*******UserLoginView*******')
# #         email = request.data.get('email')
# #         print('*******email********', email)
# #         password = request.data.get('password')
# #         print("********password******", password)

# #         user = authenticate(request, email=email, password=password)

# #         print('******user********', user)

# #         if user is not None:
# #             refresh = RefreshToken.for_user(user)
# #             access_token = refresh.access_token
# #             print("*************access_token**************")
# #             print(access_token)

# #             # user_email = User.objects.get(email=user['email'])
# #             # tokens = RefreshToken.for_user(user_email).access_token

           
# #             response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)

# #             response['Set-Cookie'] = f'access_token={str(access_token)}; HttpOnly'  
            
# #             print(response.headers)
# #             return response

# #             # return Response({'message': 'Login successful','access_token':str(access_token), 'refresh_token':str(refresh)},status=status.HTTP_200_OK)
# #         else:
# #             print(f"Authentication failed for email: {email}")
# #             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        



# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }


# class LoginView(APIView):
#     def post(self, request, format=None):
#         data = request.data
#         response = Response()
#         email = data.get('email', None)
#         password = data.get('password', None)
#         user = authenticate(email=email, password=password)

#         if user is not None:
#             if user.is_active:
#                 data = get_tokens_for_user(user)
#                 response = JsonResponse({
#                     "data": data,
#                     "user": {
#                         "id": user.id,
#                         "username": user.email,
#                         "name": user.first_name,
#                     }
#                 })
#                 response.set_cookie(
#                     key = settings.SIMPLE_JWT['AUTH_COOKIE'],
#                     value = data["access"],
#                     expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
#                     secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
#                     httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
#                     samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
#                 )
#                 csrf.get_token(request)
#                 response.data = {"Success" : "Login successfully","data":data}
#                 return response
#             else:
#                 return Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)
    

# class LogoutView(APIView):
#     def get(self, request):
#         response = JsonResponse({"message": "Logged out successfully"})

#         # Clear the authentication cookie
#         response.delete_cookie(
#             key=settings.SIMPLE_JWT['AUTH_COOKIE'],
#             path='/',
#             domain=settings.SIMPLE_JWT.get('AUTH_COOKIE_DOMAIN', None)  # Set to None if not present
#         )

#         # Expire the cookie immediately
#         response.set_cookie(
#             key=settings.SIMPLE_JWT['AUTH_COOKIE'],
#             value='',
#             expires=timezone.now() - timedelta(days=1),
#             path='/',
#             domain=settings.SIMPLE_JWT.get('AUTH_COOKIE_DOMAIN', None)  # Set to None if not present
#         )

#         return response

# class CustomTokenObtainPairView(TokenObtainPairView):
#     permission_classes = [AllowAny]