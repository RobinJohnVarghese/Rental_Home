from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from realtors.models import Realtor




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
    phone = models.CharField(max_length=15, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)
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
    

class Membership(models.Model):
    class MembershipType(models.TextChoices):
        NORMAL_USER = 'Normal User'
        PREMIUM_USER = 'Premium User'
        ULTRA_PREMIUM_USER = 'Ultra Premium User'
        
    member = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING,blank=True,null=True) 
    membership_type = models.CharField(max_length = 50,choices =MembershipType.choices,default=MembershipType.NORMAL_USER) 
    
    def __str__(self):
        return f"{self.member} has the {self.membership_type}  Account"
    
class Order(models.Model):
    order_person = models.CharField(max_length=100)
    order_amount = models.CharField(max_length=25)
    order_payment_id = models.CharField(max_length=100)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_person
    
    
# class ChatMessage(models.Model):
#     user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="user")
#     sender = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="sender")
#     reciever = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="reciever")

#     message = models.CharField(max_length=1000)

#     is_read = models.BooleanField(default=False)
#     date = models.DateTimeField(auto_now_add=True)
    
#     # class Meta:
#     #     ordering = ['date']
#     #     verbose_name_plural = "Message"

#     def __str__(self):
#         return f"{self.sender} - {self.reciever}"

#     @property
#     def sender_profile(self):
#         sender_profile = UserAccount.objects.get(user=self.sender)
#         return sender_profile
#     @property
#     def reciever_profile(self):
#         reciever_profile = UserAccount.objects.get(user=self.reciever)
#         return reciever_profile