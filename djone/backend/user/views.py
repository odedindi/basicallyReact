from django.contrib.auth import get_user_model


# Create your views here.
from rest_framework.generics import ListAPIView

from user.serializers import UserSerializer

User = get_user_model()


class GetAllUsersList(ListAPIView):
    '''
    get: Display a list of all users.

    .
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer

