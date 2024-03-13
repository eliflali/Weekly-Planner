from django.db import models

from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Task(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    def __str__(self):
        return self.title
    def end_date(self):
        return self.deadline

# Create your models here.
