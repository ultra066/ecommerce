from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login'),
    path('index.html', views.index, name='index'),
    path('cart.html', views.cart, name='cart'),
    path('purchases.html', views.purchases, name='purchases'),
    path('account.html', views.account, name='account'),
    path('login.html', views.login, name='login'),
]
