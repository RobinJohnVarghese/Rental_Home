from django.db import models
from django.utils.timezone import now
from accounts.models import UserAccount

class Listing(models.Model):
    class SaleType(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'
    
    class HomeType(models.TextChoices):
        HOUSE = 'House'
        CONDO = 'Condo'
        TOWNHOUSE = 'Townhouse'

    realtor = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING,blank=True,null=True)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=15)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqft = models.IntegerField()
    open_house = models.BooleanField(default=False)
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d/')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True,null=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True,null=True)
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True,null=True)
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True,null=True)
    photo_5 = models.ImageField(upload_to='photos/%Y/%m/%d/', blank=True,null=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return self.title
    
    
    
class Notifications(models.Model):
    fromuser = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, related_name='sent_notifications')
    touser = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, related_name='received_notifications')
    intrested_post = models.ForeignKey(Listing, on_delete=models.CASCADE, null=True)
    send_time = models.DateTimeField(default=now, blank=True)
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.fromuser} sent an Interest for the {self.intrested_post} to {self.touser}"



class ChatMessage(models.Model):
    # user = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="user")
    sender = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="sender")
    reciever = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, related_name="reciever")

    message = models.CharField(max_length=1000)

    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        # verbose_name_plural = "Message"

    def __str__(self):
        return f"{self.sender} - {self.reciever}"

    @property
    def sender_profile(self):
        # sender_profile = UserAccount.objects.get(user=self.sender)
        return self.sender
    @property
    def reciever_profile(self):
        # reciever_profile = UserAccount.objects.get(user=self.reciever)
        return self.reciever