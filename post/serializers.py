from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Post, Category, Message, Comment
from mysite import settings


class CategorySerializer(serializers.ModelSerializer):

    links = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'links')

    def get_links(self, obj):
        request = self.context['request']
        links = {'self': reverse('post:category-detail', kwargs={'name': obj.name}, request=request),
                 'posts': reverse('post:post-list', request=request) + '?category={}'.format(obj.name)}
        return links


class MessageSerializer(serializers.ModelSerializer):

    links = serializers.SerializerMethodField()
    pub_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'nickname', 'content', 'pub_date', 'links')

    def get_links(self, obj):
        request = self.context['request']
        links = {
            'self': reverse('post:message-detail',
                            kwargs={'pk': obj.pk}, request=request),
        }
        return links


class CommentSerializer(serializers.ModelSerializer):

    links = serializers.SerializerMethodField()
    pub_date = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'nickname', 'content', 'pub_date', 'links', 'post')

    def get_links(self, obj):
        request = self.context['request']
        links = {
            'self': reverse('post:comment-detail',
                            kwargs={'pk': obj.pk}, request=request),
        }
        return links


class PostSerializer(serializers.ModelSerializer):

    links = serializers.SerializerMethodField()

    pub_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    post_comment = CommentSerializer(
        many=True, read_only=True)  # 要跟model里的关系名一样
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'content',
                  'category', 'category_display', 'pub_date', 'post_comment', 'links')

    def get_links(self, obj):
        request = self.context['request']
        links = {
            'self': reverse('post:post-detail',
                            kwargs={'pk': obj.pk}, request=request),
            'category': reverse('post:category-detail',
                                kwargs={'name': obj.category.name}, request=request),
        }
        return links

    def get_category_display(self, obj):
        return obj.category.name
