from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignupView.as_view(),name='signup'),
    path('login', LoginView.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name='logout'),
   
    path('user_profile', UserProfileView.as_view(), name='user_profile'),
    path('pay/', start_paymentView.as_view(), name="payment"),
    path('payment/success/', handle_payment_successView.as_view(), name="payment_success")
    
    
    # path('user_profile/<int:pk>/', UserProfileView.as_view(), name='user_profile_detail'),
    # path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]