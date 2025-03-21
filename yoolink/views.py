from django.shortcuts import render, redirect, get_object_or_404
from yoolink.ycms.models import FAQ, Message, TeamMember, TextContent, fileentry, Galerie, OpeningHours, UserSettings, Product
import datetime
from django.http import HttpResponseRedirect
from django.utils.translation import get_language_from_request, activate
from django.conf import settings

def get_opening_hours():
    opening_hours = {}
    days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    for day in days:
        if OpeningHours.objects.filter(day=day).exists():
            opening_hours[f"opening_{day.lower()}"] = OpeningHours.objects.get(day=day)
        else:
            opening_hours[f"opening_{day.lower()}"] = None
            
    user_settings = UserSettings.objects.filter(user__is_staff=False)
    if user_settings.exists():
        user_settings = user_settings.first()
        opening_hours["owner_data"] = user_settings
        
    # Muss überall sein
    if TextContent.objects.filter(name="footer").exists():
        opening_hours["footerText"] = TextContent.objects.get(name='footer')
        
    return opening_hours

def load_index(request):
    faq = FAQ.objects.all()

    context = {
        'FAQ': faq,
    }

    # Text Contents
    if TextContent.objects.filter(name="main_hero").exists():
        context["heroText"] = TextContent.objects.get(name='main_hero')
    # Hero
    if TextContent.objects.filter(name="main_hero_card_1").exists():
        context["heroCard1"] = TextContent.objects.get(name='main_hero_card_1')
    if TextContent.objects.filter(name="main_hero_card_2").exists():
        context["heroCard2"] = TextContent.objects.get(name='main_hero_card_2')
    if TextContent.objects.filter(name="main_hero_card_3").exists():
        context["heroCard3"] = TextContent.objects.get(name='main_hero_card_3')
    # Services
    if TextContent.objects.filter(name="main_service").exists():
        context["serviceText"] = TextContent.objects.get(name='main_service')
    if TextContent.objects.filter(name="main_service_card_1").exists():
        context["serviceCard1"] = TextContent.objects.get(name='main_service_card_1')
    if TextContent.objects.filter(name="main_service_card_2").exists():
        context["serviceCard2"] = TextContent.objects.get(name='main_service_card_2')
    if TextContent.objects.filter(name="main_service_card_3").exists():
        context["serviceCard3"] = TextContent.objects.get(name='main_service_card_3')
    
    # Calculation
    if TextContent.objects.filter(name="main_calculation").exists():
        context["calculationText"] = TextContent.objects.get(name='main_calculation')
    if TextContent.objects.filter(name="main_calculation_card").exists():
        context["calculationCardText"] = TextContent.objects.get(name='main_calculation_card')
    if Galerie.objects.filter(place='main_calculation').exists():
        context["calculationImages"] = Galerie.objects.get(place='main_calculation').images.all()

    if TextContent.objects.filter(name="main_faq").exists():
        context["faqText"] = TextContent.objects.get(name='main_faq')

    if TextContent.objects.filter(name="main_contact").exists():
        context["contactText"] = TextContent.objects.get(name='main_contact')

    # Galery
    if fileentry.objects.filter(place='main_calculation').exists():
        context["calculationImage"] = fileentry.objects.get(place='main_calculation')
    
    # Mitarbeiter
    active_team_members = TeamMember.objects.filter(active=True)
    context['teamMembers'] = active_team_members

    context.update(get_opening_hours())

    form = ContactForm()
    context['form'] = form

    lang = get_language_from_request(request)  # Browser-Sprache holen
    available_languages = dict(settings.LANGUAGES)  # Sprachen aus settings.py holen
    if lang not in available_languages:
        lang = "en"

    activate(lang)  # Sprache für diese Anfrage setzen

    return render(request, 'pages/index.html', context=context)

from .forms import ContactForm
def kontaktform(request):
    success = False
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Hier Nachricht verarbeiten und speichern
            Message.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                title=form.cleaned_data['title'],
                message=form.cleaned_data['message'],
            )
            return render(request, 'pages/kontakt.html', {'success': True})
    else:
        form = ContactForm()

    return render(request, 'pages/kontakt.html', {'form': form, 'success': success})

def shop(request):
   context={"products": Product.objects.filter(is_active=True)}
   context.update(get_opening_hours())
   return render(request, 'pages/shop.html', context)

def detail(request, product_id, slug):
    product = get_object_or_404(Product, id=product_id, slug=slug)
    last_url = request.META.get('HTTP_REFERER')
    if not product.is_active:
        return render(request, "pages/errors/error.html", {
            "error": "Dieses Produkt ist nicht mehr verfügbar",
            "saveLink": last_url if last_url else '/'
        })
    context={"product": product}
    context.update(get_opening_hours())
    return render(request, 'pages/detail.html', context)
