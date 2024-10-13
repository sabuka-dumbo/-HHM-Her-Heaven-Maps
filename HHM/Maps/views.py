from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.models import User
from django.contrib import messages
from .models import *

# Create your views here.
def index(request):
    return render(request, "index.html")

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

@csrf_exempt
def rate(request):
    if request.method == "POST":
        try:
            data_from_js = json.loads(request.body.decode('utf-8'))
            GID = data_from_js.get('GID')
            user = request.user
            user_info = Userinfo.objects.all().get(user=user)
            gradebook = Gradebook.objects.all().get(id=GID)
            student_info = Student.objects.all().get(user=user, gradebook=gradebook)

        except json.JSONDecodeError as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({
        "attended": student_info.attendance, 
        "missed": student_info.missed, 
        "one": student_info.one,
        "two": student_info.two,
        "three": student_info.three,
        "four": student_info.four,
        "five": student_info.five,
        "six": student_info.six,
        "seven": student_info.seven,
        "eight": student_info.eight,
        "nine": student_info.nine,
        "ten": student_info.ten,
        })