from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from rest_framework.reverse import reverse
from .models import Post, Category, Contact
from mysite import settings

class CategorySerializer(serializers.ModelSerializer):

	links = serializers.SerializerMethodField()

	class Meta:
		model = Category
		fields = ('id', 'name', 'description','links')


	def get_links(self,obj):
		request = self.context['request']
		links = {
			'self': reverse('post:category-detail',
				kwargs={'name': obj.name},request=request),
			'posts': reverse('post:post-list',request=request) + '?category={}'.format(obj.name)
		}
		return links

class ContactSerializer(serializers.ModelSerializer):

	links = serializers.SerializerMethodField()

	class Meta:
		model = Contact
		fields = ('id', 'name', 'email','message','links')


	def get_links(self,obj):
		request = self.context['request']
		links = {
			'self': reverse('post:contact-detail',
				kwargs={'pk': obj.pk},request=request),
		}
		return links


class PostSerializer(serializers.ModelSerializer):

	links = serializers.SerializerMethodField()

	pub_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

	category_display = serializers.SerializerMethodField()

	class Meta:
		model = Post
		fields = ('id', 'title', 'description', 'content','category', 'category_display' ,'pub_date', 'links')


	def get_links(self,obj):
		request = self.context['request']
		links = {
			'self': reverse('post:post-detail',
				kwargs={'pk': obj.pk}, request=request),
			'category': reverse('post:category-detail',
				kwargs={'name': obj.category.name}, request=request),
		}
		return links

	def get_category_display(self,obj):
		return obj.category.name