from django.urls import path
from .views import ListingsView, ListingView, SearchView,ListingSearchView,CreateListing,Send_interest,UserListingView,UserInterestsView,MarkNotificationAsSeen,ListingUpdateView,ListingDeleteView,MyInbox,GetMessages,SendMessages,ProfileDetail


urlpatterns = [
    path('', ListingsView.as_view()),
    path('my_listing/<int:realtor_id>/', UserListingView.as_view()),
    path('UserInterestsView', UserInterestsView.as_view()),
    path('search', SearchView.as_view()),
    path('ListingSearchView', ListingSearchView.as_view()),
    
    
    path('<slug>', ListingView.as_view()),
    path('create_listing/', CreateListing.as_view(), name="createListing"),
    path('update/<slug>', ListingUpdateView.as_view()),
    path('delete/<slug>', ListingDeleteView.as_view()),
   
    
    path('send_interest/', Send_interest.as_view(), name="sendInterest"),
    path('mark-notification-as-seen/<int:pk>/', MarkNotificationAsSeen.as_view(), name='mark_notification_as_seen'),
    
    path("my-messages/<user_id>/", MyInbox.as_view()),
    path("get-messages/<sender_id>/<reciever_id>/", GetMessages.as_view()),
    path("send-messages/", SendMessages.as_view()),
    
    path("profile/<int:pk>/", ProfileDetail.as_view()),
    # path("search/<username>/", SearchUser.as_view()),
]
