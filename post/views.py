from rest_framework import viewsets, authentication, permissions, filters
from .models import Post, Category, Message, Comment
from .serializers import PostSerializer, CategorySerializer, MessageSerializer, CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from .filters import PostFilter, CategoryFilter, MessageFilter, CommentFilter
from .permissions import AllowAnyPost

class StandardResultsSetPagination(PageNumberPagination):
    # 每页显示多少个
    page_size = 5
    # 默认每页显示8个，可以通过传入pager1/?page=2&size=4,改变默认每页显示的个数
    page_size_query_param = 'size'
    # 每页最多不超过10
    max_page_size = 10
    # 获取页码数的参数
    page_query_param = 'page'

class DefaultsMixin(object):
    authentication_class = (
        authentication.BasicAuthentication,
        authentication.TokenAuthentication,
    )
    permission_classes = (
       permissions.IsAuthenticatedOrReadOnly,
    )
    pagination_class = StandardResultsSetPagination
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
			
class PostViewSet(DefaultsMixin, viewsets.ModelViewSet):
    # 公开的文章
    queryset = Post.objects.filter(post_status=1).order_by('-pub_date')
    serializer_class = PostSerializer
    filter_class = PostFilter
    search_fields = ('title',)
    ordering_fields = ('id', 'pub_date',)

    def dispatch(self, request, *args, **kwargs):
        """
        `.dispatch()` is pretty much the same as Django's regular dispatch,
        but with extra hooks for startup, finalize, and exception handling.
        """
        # 点击数量加一
        if kwargs and request.method == 'GET':
            post = Post.objects.get(pk=kwargs['pk'])
            post.click_count += 1
            post.save()

        return super(PostViewSet, self).dispatch(request, *args, **kwargs)


class CategoryViewSet(DefaultsMixin, viewsets.ModelViewSet):
    lookup_field = 'name' # 使用name不使用id查询
    lookup_url_kwarg = 'name'  # 使用name不使用id查询
    queryset = Category.objects.order_by('-index') # 分类按index有大到小排序
    serializer_class = CategorySerializer
    pagination_class = None
    filter_class = CategoryFilter


class MessageViewSet(DefaultsMixin, viewsets.ModelViewSet):
    permission_classes = (
       AllowAnyPost, # 允许所有人post数据
    )
    queryset = Message.objects.order_by('pub_date')
    serializer_class = MessageSerializer
    filter_class = MessageFilter
    search_fields = ('nickname','content')
    ordering_fields = ('pub_date',)

class CommentViewSet(DefaultsMixin, viewsets.ModelViewSet):
    permission_classes = (
       AllowAnyPost, # 允许所有人post数据
    )
    queryset = Comment.objects.order_by('pub_date')
    serializer_class = CommentSerializer
    filter_class = CommentFilter
    search_fields = ('nickname','content')
    ordering_fields = ('pub_date',)
