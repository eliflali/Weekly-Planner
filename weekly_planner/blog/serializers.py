from rest_framework import serializers
from .models import Task
from .models import ScheduledTasks

class ScheduledTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledTasks
        fields = '__all__'
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id' , 'title', 'description', 'day',  'deadline', 'emergency_status']
