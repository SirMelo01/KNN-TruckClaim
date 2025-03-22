$(document).ready(function () {
    const navbar = $('#top-info-bar')
    let prevScrollPos = 0;

    function updateNavbarState() {
        // Get the new Value
        const currentScrollPos = window.pageYOffset;
    
        if ((document.documentElement.scrollTop || document.body.scrollTop) === 0) {
            // User has scrolled up to the top of the page
            navbar.removeClass('scrolled');
        } else {
            navbar.addClass('scrolled');
        }

        // Update the old value
        prevScrollPos = currentScrollPos;
    }

    window.addEventListener('scroll', updateNavbarState);


    // Funktion zur Berechnung der Bannerhöhe und Zuweisung an die CSS-Variable
    function setInfoBannerHeight() {
        var bannerHeight = $('#info-banner').outerHeight() || 0;
        $(':root').css('--info-banner-height', bannerHeight + 'px');
    }

    // Initiale Einstellung der Bannerhöhe
    setInfoBannerHeight();

    // Neu berechnen, falls Fenstergröße oder Inhalt sich ändert
    $(window).on('resize', setInfoBannerHeight);



    function openMenu() {
        const menu = $('#mobile-menu');
        menu.removeClass('hidden');
        $('#menu-toggle2').removeClass("hidden");
    
        // Body scroll verhindern
        $('body').addClass('overflow-hidden');
    
        // Kleine Verzögerung für die Animation
        setTimeout(() => {
            menu.addClass('opacity-100').removeClass('opacity-0');
        }, 10);
    }
    
    function closeMenu() {
        $('#menu-toggle2').addClass("hidden");
        const menu = $('#mobile-menu');
        menu.addClass('opacity-0').removeClass('opacity-100');
    
        // Scrollen wieder erlauben
        $('body').removeClass('overflow-hidden');
    
        // Warte auf die Animation, dann verstecke das Menü
        setTimeout(() => {
            menu.addClass('hidden');
        }, 300);
    }
    
    // Burger-Menü öffnen
    $('#menu-toggle').on('click', function () {
        openMenu();
    });
    
    // Menü schließen
    $('#menu-toggle2').on('click', function () {
        closeMenu();
    });
    
    $('.mobile-link').on('click', function(event) {
        closeMenu();
    });

    // Banner anzeigen, wenn der Bildschirm auf Desktop-Größe erweitert wird
    $(window).on('resize', function() {
        if ($(window).width() >= 768) { // 768px ist die Grenze für 'md'
            $('#info-banner').removeClass('hidden');
            $('#mobile-menu').addClass('hidden');
        }
    });



    $('.faq-question').click(function() {
        // FAQ-Answer öffnen/schließen
        $(this).next('.faq-answer').slideToggle();

        // Toggle-Symbol ändern (+ / -)
        var toggleSymbol = $(this).find('.faq-toggle');
        toggleSymbol.text(toggleSymbol.text() === '+' ? '-' : '+');

        // Alle anderen Antworten schließen
        $('.faq-answer').not($(this).next('.faq-answer')).slideUp();
        $('.faq-toggle').not(toggleSymbol).text('+');
    });


    // Swiper Slider
    const swiper = new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 100,
        loop: true, // Aktiviert das endlose Swipen
        autoplay: {
            delay: 5000,
            disableOnInteraction: false, // Autoplay nach Benutzung der Buttons nicht deaktivieren
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true, // Bullets anklickbar machen
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    });

    const languageButton = $('#language-button');
        const languageMenu = $('#language-menu');

        languageButton.on('click', function () {
            languageMenu.toggleClass('hidden');
        });


    const languageButton2 = $('#language-button2');
        const languageMenu2 = $('#language-menu2');

        languageButton2.on('click', function () {
            languageMenu2.toggleClass('hidden');
        });

});


