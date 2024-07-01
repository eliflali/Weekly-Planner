from django.db import models

from django.db import models
import uuid  # Don't forget to import the uuid module
import datetime
from django.utils.timezone import now  # Make sure to import now

class Post(models.Model):
    title = models.CharField(max_length=100)
    
    body = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    day = models.CharField(max_length = 15, default = "unscheduled")
    date_published = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    emergency_status = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)  # New field for completed status
    
    def __str__(self):
        return self.title

    def end_date(self):
        return self.deadline

    def remaining_time(self):
        # Adjusted to use timezone aware datetime
        return self.deadline - now()
    
class ScheduledTasks(models.Model):
    day = models.CharField(max_length = 15)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    emergency_status = models.CharField(max_length=500)
    
    def __str__(self):
        return self.title

    def end_date(self):
        return self.deadline

    

    def remaining_time(self):
        # Adjusted to use timezone aware datetime
        return self.deadline - now()


class Note(models.Model):
    content = models.TextField()
    color = models.CharField(max_length=10)  # Store colors in HEX
    x_position = models.IntegerField(default=0)
    y_position = models.IntegerField(default=0)
    # You can add more fields like user, timestamp, etc.

    def __str__(self):
        return self.content[:50]  # Show first 50 characters
    
# Create your models here.
