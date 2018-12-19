from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from mysite import settings

from . import views

route = DefaultRouter()
route.register(r'posts', views.PostViewSet)
route.register(r'categorys', views.CategoryViewSet)
route.register(r'messages', views.MessageViewSet)
route.register(r'comments', views.CommentViewSet)

app_name = 'post'  # 加入了这个后reverse需要加入命名空间
urlpatterns = [
    path('api/archive/', views.ArchiveView.as_view(), name="archive"),
    path('api/', include(route.urls)),
    path('', TemplateView.as_view(template_name='post/index.html',
                                  extra_context={'settings': settings}))
]
