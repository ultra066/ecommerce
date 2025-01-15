from django.shortcuts import render

# Create your views here.

def login(request):
    return render(request, 'store/login.html')

def index(request):
    return render(request, 'store/index.html')

def cart(request):
    return render(request, 'store/cart.html')

def purchases(request):
    return render(request, 'store/purchases.html')

def account(request):
    return render(request, 'store/account.html')