from rest_framework import serializers
from .models import UserAccount




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
        
    # def create(self, validated_data):
    #     # Extract the 'user' from the context to associate it with the profile
    #     user = self.context['request'].user

    #     # Remove 'user' from the validated_data, as it's not a model field
    #     validated_data.pop('user', None)

    #     # Create a new profile for the user
    #     profile = UserAccount.objects.create(email=user.email, name=user.name, **validated_data)
    #     return profile