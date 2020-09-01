from django.shortcuts import render,get_object_or_404
from .models import blog

# Create your views here.
def allblogs(request):
    blogs = blog.objects
    return render(request,'blog/allblogs.html',{'blogs':blogs})

def blogdetail(request,blog_id):
    blog_details = get_object_or_404(blog,pk=blog_id)
    return render(request,'blog/blog_detail.html',{'blog_details':blog_details})
