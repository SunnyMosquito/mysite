from django.contrib import admin
from django import forms
from .models import Post, Category, Contact, MyImage
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

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id','name','email','pub_date')
    list_display_links = ('id','name','email','pub_date')

class MyImageAdmin(admin.ModelAdmin):
    list_display = ('id','name','image_url','image_tag')
    list_display_links = ('id','name')
    readonly_fields = ('image_tag',)

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Contact,ContactAdmin)
admin.site.register(Category)
admin.site.register(MyImage,MyImageAdmin)
