from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import UserViewSet,Userself,RegisterView,ChangePasswordView

router = DefaultRouter()
router.register("users",UserViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("me/",Userself.as_view()),
    path('me/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path("register/",RegisterView.as_view()),
    path("",include(router.urls)),
]
