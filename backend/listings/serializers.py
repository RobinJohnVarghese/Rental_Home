from rest_framework import serializers
from .models import Listing
from accounts.models import UserAccount
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('id','title', 'address', 'city', 'state', 'price', 'sale_type', 'home_type', 'bedrooms', 'bathrooms', 'sqft', 'photo_main', 'slug')

class listingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'
        
# class RealtorNameSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = ['id']
        
class CreatelistingSerializer(serializers.ModelSerializer):
    # realtor = RealtorNameSerializer()
    realtor_id = serializers.IntegerField(write_only=True, required=False)
    class Meta:
        model = Listing
        fields = ['realtor_id','realtor','slug','title','address','city','state','zipcode',
                'description','sale_type','price','bedrooms','bathrooms','home_type',
                'sqft','open_house','photo_main','photo_1','photo_2','photo_3',
                'photo_4','photo_5']
        read_only_fields = ['realtor']
        
    def create(self, validated_data):
        
        realtor_id = validated_data.pop('realtor_id', None)
        if realtor_id:
            try:
                realtor = UserAccount.objects.get(id=realtor_id)
                validated_data['realtor'] = realtor
            except UserAccount.DoesNotExist:
                raise serializers.ValidationError({'realtor_id': 'realtor not found.'})
        # # Check for null values before setting photo fields
        # for photo_field in ['photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5']:
        #     if photo_field in validated_data and validated_data[photo_field] is None:
        #         del validated_data[photo_field]
                
        return super().create(validated_data)


# # If you want to handle image uploads, you can create a separate serializer for the images
# class ListingImageSerializer(serializers.Serializer):
#     image = serializers.ImageField()

# # You may also use a nested serializer for handling multiple images
# class ListingImagesSerializer(serializers.Serializer):
#     images = serializers.ListField(child=serializers.ImageField())