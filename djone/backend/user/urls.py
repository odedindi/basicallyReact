from django.urls import path

from user.views import GetAllUsersList

urlpatterns = [
    path('', GetAllUsersList.as_view()),
]
