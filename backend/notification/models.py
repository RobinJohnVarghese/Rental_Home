# from django.db import models
# from accounts.models import UserAccount
# from listings.models import Listing
# from django.utils.timezone import now



# class Notifications(models.Model):
#     fromuser = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, related_name='sent_notifications')
#     touser = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=True, related_name='received_notifications')
#     intrested_post = models.ForeignKey(Listing, on_delete=models.CASCADE, null=True)
#     send_time = models.DateTimeField(default=now, blank=True)
#     is_seen = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{self.fromuser} sent an Interest for the {self.intrested_post} to {self.touser}"