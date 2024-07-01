from rest_framework import serializers
from rest_framework import viewsets
from .models import Task
from .models import ScheduledTasks
from .models import Note
class ScheduledTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledTasks
        fields = '__all__'
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id' , 'title', 'description', 'day',  'deadline', 'emergency_status', 'completed']
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

