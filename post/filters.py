import django_filters
from .models import Post, Category, Message

class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = ('category','id')

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        # 过滤分类使用name
        self.filters['category'].extra.update(
            {'to_field_name': 'name'})

class CategoryFilter(django_filters.FilterSet):

    class Meta:
        model = Category
        fields = ('name',)

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)

class MessageFilter(django_filters.FilterSet):

    class Meta:
        model = Message
        fields = ('nickname',)

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)