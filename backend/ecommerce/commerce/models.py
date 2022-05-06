from django.db import models
from django.template.defaultfilters import slugify
from account.models import Account
from django.conf import settings

# Create your models here.
class Product(models.Model):
    # author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    desc = models.CharField(max_length=500)
    img = models.ImageField(upload_to='images', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=100, blank=True)

    def __str__(self):
        return f'{self.name} '

    def save(self, *args, **kwargs):
        self.slug = slugify(f'{self.name}')
        super(Product, self).save(*args, **kwargs)