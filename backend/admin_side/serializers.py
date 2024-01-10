from rest_framework import serializers
from accounts.models import UserAccount




class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ( 'id','email', 'name', 'is_active', 'is_staff')
       