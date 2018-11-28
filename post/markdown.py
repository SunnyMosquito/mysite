from django import forms
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.utils.safestring import mark_safe
from django.template.loader import render_to_string
from django.utils.html import conditional_escape
from django.utils.encoding import force_text
from django.forms.utils import flatatt

try:
    DEBUG = getattr(settings, 'DEBUG', False)
except ImproperlyConfigured:
    DEBUG = False


class MarkdownWidget(forms.Textarea):

    template_name = 'post/widget.html'

    # 没有renderer会出错，render() got an unexpected keyword argument 'renderer'
    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = ''

        final_attrs = self.build_attrs(self.attrs, attrs, name=name)
        return mark_safe(render_to_string(self.template_name, {
            'final_attrs': flatatt(final_attrs),
            'value': conditional_escape(force_text(value)),
            'id': final_attrs['id'],
        }))

    def build_attrs(self, base_attrs, extra_attrs=None, **kwargs):
        attrs = dict(base_attrs, **kwargs)
        if extra_attrs:
            attrs.update(extra_attrs)
        return attrs

    class Media:
        css = {
            'all': (
                'post/css/editormd.min.css',
                'post/css/admin-markdown.css',
            )
        }
        js = [
            'post/vendor/jquery-3.3.1.js',
            'post/js/editormd.min.js',
        ]
