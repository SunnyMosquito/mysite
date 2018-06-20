import django_filters
from .models import Post, Category, Contact

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

class ContactFilter(django_filters.FilterSet):

    class Meta:
        model = Contact
        fields = ('name',)

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)