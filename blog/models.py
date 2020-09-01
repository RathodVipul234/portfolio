from django.db import models

# Create your models here.

class blog(models.Model):
    title = models.CharField(max_length = 100)
    pub_date = models.DateTimeField()
    image = models.ImageField(upload_to = "images/")
    body = models.TextField()

    def date_show(self):
        return self.pub_date.strftime('%b %e, %y')

    def __str__(self):
        return self.title