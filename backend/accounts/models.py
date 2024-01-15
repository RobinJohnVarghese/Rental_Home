from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from realtors.models import Realtor




class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, name, password):
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email
    
    
class UserProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)  
    email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=15, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s Profile"
    def save(self, *args, **kwargs):
        # Update corresponding UserAccount fields
        self.user.email = self.email
        self.user.name = self.name  
        self.user.save()
        super().save(*args, **kwargs)
        
        
    # def save(self, *args, **kwargs):
    #     # Call the parent class's save method
    #     super().save(*args, **kwargs)

    #     # Check if a corresponding Realtor instance already exists
    #     if not hasattr(self, 'realtor'):
    #         # Create a new Realtor instance linked to this UserProfile
    #         Realtor.objects.create(
    #             name=self.name,
    #             email=self.email,
    #             phone=self.phone,
    #             description=self.description
    #             # You may need to adjust the fields based on your requirements
    #         )
    
    
    
    
    
# class UserToken(models.Model):
#     email = models.EmailField(null=True)
#     access_token = models.CharField(max_length=255,null=True)  # Adjust the max length as required
    
#     def __str__(self):
#         return self.email

# class AccessToken(models.Model):
#     user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
#     token = models.CharField(max_length=255)

#     def __str__(self):
#         return f"Token for {self.user.email}"