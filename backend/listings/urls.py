from django.urls import path
from .views import ListingsView, ListingView, SearchView,CreateListing


urlpatterns = [
    path('', ListingsView.as_view()),
    path('search', SearchView.as_view()),
    path('<slug>', ListingView.as_view()),
    # path('create_listing', Create_Listing, name='create_listing')
    path('create_listing/', CreateListing.as_view(), name="createListing"),
]
