from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet
from .views import TaskList
from .views import ScheduledTasksList
from .views import NoteViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('scheduled-tasks/', ScheduledTasksList.as_view(), name='scheduled-tasks'),
    path('tasks/', TaskList.as_view(), name='tasks'),
]
