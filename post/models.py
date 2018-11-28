from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class Category(models.Model):
    """docstring for Category"""

    name = models.CharField(max_length=20, verbose_name='分类名', unique=True)
    description = models.CharField(max_length=500, verbose_name='描述')
    index = models.SmallIntegerField(default=1, verbose_name='分类索引')

    class Meta:
        verbose_name = '分类'
        verbose_name_plural = verbose_name
        ordering = ['-index', '-id']

    def __str__(self):
        return self.name


class Post(models.Model):
    """docstring for Post"""

    STATUS_PVT = 0  # 没有发布
    STATUS_PUB = 1  # 发布了

    STATUS_CHOICES = (
        (STATUS_PVT, _('Private')),
        (STATUS_PUB, _('Public'))
    )

    title = models.CharField(max_length=100, verbose_name='标题')
    description = models.CharField(max_length=300, verbose_name='描述')
    content = models.TextField(verbose_name='标题内容')
    pub_date = models.DateTimeField(verbose_name='发布日期')
    post_status = models.SmallIntegerField(choices=STATUS_CHOICES,
                                           default=STATUS_PVT, verbose_name='文章状态')
    click_count = models.IntegerField(default=0, verbose_name='点击数量')
    category = models.ForeignKey(Category, related_name='category_post',
                                 on_delete=models.CASCADE, verbose_name='分类')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='owner_post',
                              null=True, blank=True, on_delete=models.CASCADE, verbose_name='拥有者')

    def clean(self, *args, **kwargs):
        if self.pub_date:
			# 发布时间要小于当前时间，否则等于当前时间
            if self.pub_date > timezone.now():
                self.pub_date = timezone.now()

        super(Post, self).clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Post, self).save(*args, **kwargs)

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = verbose_name
        ordering = ['-id']

    def __str__(self):
        return self.title


class Contact(models.Model):

    name = models.CharField(max_length=30, verbose_name='名字')
    email = models.EmailField(verbose_name='邮箱')
    message = models.CharField(max_length=500, verbose_name='内容')
    pub_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = '联系我'
        verbose_name_plural = verbose_name
        ordering = ['id']

    def __str__(self):
        return self.name


class MyImage(models.Model):
    """docstring for MyImage"""

    name = models.CharField(max_length=50, verbose_name='图片名')
    image = models.ImageField(
        upload_to='upload/image/', max_length=200, verbose_name='图片url')

    def image_tag(self):
        if self.image:
            return mark_safe('<img src="{}" width="auto;" style="max-height:150px;" />'.format(self.image.url))
        else:
            return '(no image)'

    def image_url(self):
        return mark_safe('<a href="{}">{}</a>'.format(self.image.url, self.image.url))

    image_tag.short_description = _('当前图片')
    image_url.short_description = _('url')

    class Meta:
        verbose_name = '图像库'
        verbose_name_plural = verbose_name
        ordering = ['id']

    def __str__(self):
        return self.name
