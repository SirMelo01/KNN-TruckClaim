from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from django.utils import timezone
from yoolink.ycms.models import Blog, Product
#from django.urls import reverse


class StaticViewSitemap(Sitemap):
    changefreq = "daily"
    def items(self):
        return [
            'home',
            'impressum', 'datenschutz', 'cookies', 
            ]
    
    def lastmod(self, item):
            return timezone.now()
    
    def location(self, item):
        return reverse(item)