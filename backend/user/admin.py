from django.contrib import admin
from .models import (Profile, Contact, Skills, Testimonial,
                     ContactMe, ProjectCategory, Project, ServiceCategory,
                     Service, BlogCategory, Blog, CvLink)

admin.site.register(Profile)
admin.site.register(Contact)
admin.site.register(Testimonial)
admin.site.register(ContactMe)
admin.site.register(Skills)
admin.site.register(ProjectCategory)
admin.site.register(Project)
admin.site.register(ServiceCategory)
admin.site.register(Service)
admin.site.register(BlogCategory)
admin.site.register(Blog)
admin.site.register(CvLink)
