from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics
from .models import ScheduledTasks
from .serializers import ScheduledTasksSerializer

class ScheduledTasksList(generics.ListAPIView):
    queryset = ScheduledTasks.objects.all()
    serializer_class = ScheduledTasksSerializer
    
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
class TaskList(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# Create your views here.
