from django.shortcuts import render
from .models import jobs
# Create your views here.
def homePage(request):
    job = jobs.objects
    return render(request,'home.html',{'jobs':job})