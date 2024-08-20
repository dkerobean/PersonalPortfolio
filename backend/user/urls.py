from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet, basename='profile')
router.register(r'contact', views.ContactViewSet, basename='contact')
router.register(r'skills', views.SkillsViewSet, basename='skills')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonial')
router.register(r'contact-me', views.ContactMeViewSet, basename='contact-me')
router.register(r'project-category', views.ProjectCategoryViewSet, basename='project-category')
router.register(r'project', views.ProjectViewSet, basename='project')
router.register(r'service-category', views.ServiceCategoryViewSet, basename='service-category')
router.register(r'service', views.ServiceViewSet, basename='service')
router.register(r'blog-category', views.BlogCategoryViewSet, basename='blog-category')
router.register(r'blog', views.BlogViewSet, basename='blog')
router.register(r'cv', views.CvViewSet, basename='cv')

urlpatterns = [
    path('api/', include(router.urls)),
]
