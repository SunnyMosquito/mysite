from django.apps import AppConfig


class PostConfig(AppConfig):
    name = 'post'
    verbose_name = '博客'

    def ready(self):
        from post import signals
