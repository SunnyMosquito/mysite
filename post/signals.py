# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Message
# from django.conf import settings
# from django.core.mail import send_mail


# @receiver(post_save, sender=Message)
# def send_email(sender, created=False, instance=None, **kwargs):
#     if created:
#         send_mail(instance.name, instance.email + ':' + instance.message, settings.EMAIL_FROM,
#                   ['awen1018@hotmail.com'], fail_silently=False)
