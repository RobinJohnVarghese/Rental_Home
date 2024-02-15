from django.contrib import admin
from .models import Listing,Notifications,ChatMessage

class ListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
    list_display_links = ('id', 'title')
    list_filter = ('realtor', )
    list_editable = ('is_published', )
    search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
    list_per_page = 25

admin.site.register(Listing, ListingAdmin)


class NotificationsAdmin(admin.ModelAdmin):
    list_editable = ['is_seen']
    list_display = ['id','fromuser','touser', 'intrested_post', 'is_seen', 'send_time']
    list_display_links = ('id', 'fromuser')
admin.site.register(Notifications,NotificationsAdmin)

class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read', 'message']
    list_display = ['id','sender', 'reciever', 'is_read', 'message','date']
    list_display_links = ('id','sender', 'reciever', )
admin.site.register( ChatMessage,ChatMessageAdmin)