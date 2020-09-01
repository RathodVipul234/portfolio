from django.urls import path
from .views import allblogs,blogdetail
urlpatterns = [
    path('',allblogs,name='blogs'),
    path('<int:blog_id>/',blogdetail,name='blogdetail'),
]
