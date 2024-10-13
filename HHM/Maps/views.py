from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.models import User
from django.contrib import messages
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        rates = Rate.objects.all()
        return render(request, "index.html", {
            "rates": rates,
        })
    else:
        return HttpResponseRedirect(reverse('login'))

def register(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    else:
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            country = request.POST.get('country')
            city = request.POST.get('city')
            state = request.POST.get('state')

            if not email or not password or not country or not city:
                messages.error(request, "Please fill in all required fields.")
                return render(request, "register.html")

            # Check if user already exists
            if User.objects.filter(email=email).exists():
                messages.error(request, "Email already registered.")
                return render(request, "register.html")

            # Create new user
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
            )
            # Optionally store additional information like country, city, etc.
            # You can create a user profile model for that purpose.
            
            auth_login(request, user)  # Log the user in after registration
            return HttpResponseRedirect(reverse('index'))

        else:
            return render(request, "register.html")

def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    else:
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')

            user = authenticate(request, username=email, password=password)
            if user is not None:
                auth_login(request, user)
                return HttpResponseRedirect(reverse('index'))
            else:
                messages.error(request, "Invalid email or password.")
                return render(request, "login.html")

        else:
            return render(request, "login.html")
        
def rate(request):
    if request.method == "POST":
        try:
            data_from_js = json.loads(request.body.decode('utf-8'))
            Long = data_from_js.get('Long')
            Lat = data_from_js.get('Lang')
            rating_value = data_from_js.get('rate')
            userr = request.user
            reason_text = data_from_js.get('reason')
            done = "Yes"

            if userr.is_authenticated and Long and Lat and rating_value is not None:
                new_rate = Rate.objects.create(
                    user=userr, 
                    rate=rating_value, 
                    reason=reason_text, 
                    Longitude=Long, 
                    Latitude=Lat
                )
                done = "Yes"  
            else:
                done = "Nope"  

        except json.JSONDecodeError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({
        "example": done,
    })
