import os
from rest_framework import serializers
from .models import UserAccount,Order




class  UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserAccount.objects.create_user(**validated_data)
        return user 
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id','email', 'name', 'phone', 'age', 'photo', 'description']
    def validate_post_img(self, value):
        max_size = 1.5 * 1024 * 1024  # 1.5 MB in bytes

        if value.size > max_size:
            raise serializers.ValidationError('The image size should not exceed 1.5 MB.')

        valid_extensions = ['.jpg', '.jpeg', '.png', '.svg']
        ext = os.path.splitext(value.name)[1].lower()

        if ext not in valid_extensions:
            raise serializers.ValidationError('Invalid image file type. Supported formats: jpg, jpeg, png, svg.')

        return value
    
    
# class UserProfileUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = ['id','email', 'name', 'phone', 'age', 'photo', 'description']  # Include all fields including photo

#     def update(self, instance, validated_data):
#         # Exclude 'photo' from validated_data if it is present but None
#         if 'photo' in validated_data and validated_data['photo'] is None:
#             del validated_data['photo']

#         return super().update(instance, validated_data)


class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Order
        fields = '__all__'
        depth = 2
