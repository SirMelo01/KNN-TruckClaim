/* NORMAL Site Home.JS without Slider but with map and contact section instead */
const realmap = document.querySelector("#map");
const covermap = document.querySelector("#covermap");

var map;



//Map

// Commented because this website has no map
/*function mapLoad() {
  if (cookiemapselect === null || cookiemapselect === "false") {
    covermap.classList.remove("hidden");
    realmap.classList.add("hidden");
  } else {
    covermap.classList.add("hidden");
    realmap.classList.remove("hidden");

    // Karte wird geladen
    map.setView([53.699497, 10.742065], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    
    L.marker([53.699497, 10.742065]).addTo(map)
    .bindPopup('W&K Schweißtechnik GmbH.<br> Bahnhofsallee 38, 23909 Ratzeburg.')
    .openPopup();
    map.scrollWheelZoom.disable();
  }
}*/



var csrfTokenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
var csrfToken = csrfTokenInput ? csrfTokenInput.value : undefined;

// JQuery functions
$(document).ready(function () {
  // FAQ Toggle
  $(".faq-toggle").click(function () {
    var content = $(this).siblings(".faq-content");
    var arrow = $(this).find(".faq-arrow");

    if (content.hasClass("hidden")) {
      content.removeClass("hidden");
      arrow.addClass("rotate-180");
    } else {
      content.addClass("hidden");
      arrow.removeClass("rotate-180");
    }
  });
  /**
   * Email Form submit Function (index page)
   * How to use: Compare wukschweiss project
   */
  $('#emailForm').submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Check if the Terms checkbox is checked
    if (!$('#termsOfService').is(':checked')) {
      sendNotif(window.translations.error_accept_terms, "error");
      return;
  }  
    $('#bSendMail').prop('disabled', true);
    console.log("Sende email...")
    // Send form data to the server using AJAX
    setTimeout(() => {
      $.ajax({
        type: 'POST',
        url: '/cms/email/request/',
        data: $("#emailForm").serialize(),
        success: function (response) {
          // Handle successful response here
          if (response.success) {
            sendNotif(window.translations.success_message_sent, "success")
          }
          $('#emailForm')[0].reset();
        },
        error: function (error) {
          // Handle error response here
          console.error('Form submission failed');
          sendNotif(window.translations.error_message_failed, "error")
        },
        complete: function () {
          // Wird ausgeführt, egal ob Erfolg oder Fehler
          $('#bSendMail').prop('disabled', false); // Button wieder aktivieren
        }
      });
    }, 500)

  });
});

// Commented because this website has no map
/*setTimeout(() => {
  if (cookiemapselect !== null && cookiemapselect !== "false") {
    map = L.map("map");
    map.on("focus", function () {
      map.scrollWheelZoom.enable();
    });
    map.on("blur", function () {
      map.scrollWheelZoom.disable();
    });
  }
  mapLoad();
}, 500);*/

