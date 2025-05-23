from django.urls import path
from .views import analyze_headlines, home

urlpatterns = [
    path('', home),  
    path('analyze/', analyze_headlines),  

]
