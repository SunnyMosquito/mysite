from django.contrib import admin
from django import forms
from .models import Post, Category, Message, UploadImage, Comment
from django.db import models
from django.utils.safestring import mark_safe
from .markdown import MarkdownWidget

admin.site.site_header = '蚊子的后台管理'
admin.site.site_title = '蚊子的后台管理'


class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('click_count',)
    formfield_overrides = {
        models.TextField: {'widget': MarkdownWidget()}
    }


class MessageAdmin(admin.ModelAdmin):
    fields = ['nickname', 'content']  # 详细页显示的
    list_display = ('id', 'nickname', 'pub_date')  # 列表页要显示的
    list_display_links = ('id', 'nickname', 'pub_date')  # 列表页显示为链接


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'nickname', 'pub_date')
    list_display_links = ('id', 'nickname', 'pub_date')
    readonly_fields = ('total_likes', 'email', 'pub_date')


class UploadImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'image_url', 'image_tag')
    list_display_links = ('id', 'title')
    readonly_fields = ('image_tag',)


# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Category)
admin.site.register(Comment, CommentAdmin)
admin.site.register(UploadImage, UploadImageAdmin)
