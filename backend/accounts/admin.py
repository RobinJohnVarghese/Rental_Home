# YourApp/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

# Register your UserAccount model with UserAdmin
@admin.register(UserAccount)
class CustomUserAdmin(UserAdmin):
    # Define the fields to display in the admin panel
    list_display = ('email', 'name', 'is_active', 'is_staff')

    # Define the fields to filter by in the admin panel
    list_filter = ('is_active', 'is_staff')

    # Define the fieldsets for the add and change forms in the admin panel
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )

    # Define the fieldsets for the add form in the admin panel
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_active', 'is_staff'),
        }),
    )

    # Set the ordering of objects in the admin panel
    ordering = ('email',)


# class UserTokenAdmin(admin.ModelAdmin):
#     list_display = ('id','email', 'access_token')
#     list_display_links = ('id','email', 'access_token')
#     search_fields = ('email', 'access_token')
#     list_per_page = 25

# admin.site.register(UserToken, UserTokenAdmin)
#  AccessToken
# class AccessTokenAdmin(admin.ModelAdmin):
#     list_display = ('user', 'token')
#     list_display_links = ('user', 'token')
#     search_fields = ('user',)
#     list_per_page = 25

# admin.site.register(AccessToken, AccessTokenAdmin)