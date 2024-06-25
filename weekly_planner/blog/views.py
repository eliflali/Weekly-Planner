from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework import generics
from .models import ScheduledTasks
from .serializers import ScheduledTasksSerializer
from .models import Note
from .serializers import NoteSerializer


class ScheduledTasksList(generics.ListAPIView):
    queryset = ScheduledTasks.objects.all()
    serializer_class = ScheduledTasksSerializer
    
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
class TaskList(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

# Create your views here.
