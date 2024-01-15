from rest_framework import serializers
from .models import Listing
from realtors.models import Realtor
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'address', 'city', 'state', 'price', 'sale_type', 'home_type', 'bedrooms', 'bathrooms', 'sqft', 'photo_main', 'slug')

class listingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'
        
class RealtorNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realtor
        fields = ['id']
        
class CreatelistingSerializer(serializers.ModelSerializer):
    realtor = RealtorNameSerializer()
    class Meta:
        model = Listing
        fields = '__all__'


# # If you want to handle image uploads, you can create a separate serializer for the images
# class ListingImageSerializer(serializers.Serializer):
#     image = serializers.ImageField()

# # You may also use a nested serializer for handling multiple images
# class ListingImagesSerializer(serializers.Serializer):
#     images = serializers.ListField(child=serializers.ImageField())