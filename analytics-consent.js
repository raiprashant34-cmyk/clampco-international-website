(function () {
  "use strict";

  var measurementId = "G-HFD8FKE1KD";
  var consentKey = "clampco_analytics_consent";
  var leadKey = "clampco_rfq_submitted_at";
  var thankYouPath = "/thank-you.html";
  var thirtyMinutes = 30 * 60 * 1000;
  var analyticsLoaded = false;

  function readConsent() {
    try {
      return window.localStorage.getItem(consentKey);
    } catch (error) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (error) {
      // The choice still applies to this page if browser storage is unavailable.
    }
  }

  function safePageUrl(value) {
    try {
      var url = new URL(value, window.location.origin);
      return url.origin + url.pathname;
    } catch (error) {
      return window.location.origin + window.location.pathname;
    }
  }

  function isThankYouPage() {
    return window.location.pathname.replace(/\\/+$/, "") === thankYouPath;
  }

  function hasRecentRfqSubmission() {
    try {
      var submittedAt = Number(window.sessionStorage.getItem(leadKey));
      return submittedAt > 0 && Date.now() - submittedAt < thirtyMinutes;
    } catch (error) {
      return false;
    }
  }

  function clearRfqSubmission() {
    try {
      window.sessionStorage.removeItem(leadKey);
    } catch (error) {
      // Ignore storage restrictions.
    }
  }

  function sendLeadIfEligible() {
    if (!analyticsLoaded || !isThankYouPage() || !hasRecentRfqSubmission()) {
      return;
    }
    window.gtag("event", "generate_lead", { method: "rfq_form" });
    clearRfqSubmission();
  }

  function loadAnalytics() {
    if (analyticsLoaded) {
      sendLeadIfEligible();
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      page_location: safePageUrl(window.location.href),
      page_referrer: document.referrer ? safePageUrl(document.referrer) : "",
      page_title: document.title,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(tag);

    sendLeadIfEligible();
  }

  function clearAnalyticsCookies() {
    document.cookie.split(";").forEach(function (cookie) {
      var name = cookie.split("=")[0].trim();
      if (name === "_ga" || name === "_gid" || name === "_gat" || name.indexOf("_ga_") === 0) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
        document.cookie = name + "=; Max-Age=0; path=/; domain=clampcointernational.com; SameSite=Lax";
      }
    });
  }

  function buildConsentUi() {
    var banner = document.createElement("section");
    banner.className = "clampco-consent";
    banner.setAttribute("aria-label", "Analytics preferences");
    banner.setAttribute("role", "region");
    banner.hidden = true;
    banner.innerHTML =
      '<h2>Help us improve this website</h2>' +
      '<p>We use Google Analytics to understand site visits and successful quote requests. Analytics runs only if you allow it. Your RFQ details and uploaded files are never sent to Analytics.</p>' +
      '<div class="clampco-consent-actions">' +
        '<button type="button" data-choice="allow">Allow analytics</button>' +
        '<button type="button" class="secondary" data-choice="reject">Reject analytics</button>' +
      '</div>' +
      '<small>You can change your choice at any time using “Analytics settings”.</small>';

    var settings = document.createElement("button");
    settings.type = "button";
    settings.className = "clampco-consent-settings";
    settings.textContent = "Analytics settings";
    settings.setAttribute("aria-expanded", "false");
    settings.hidden = true;

    function showBanner() {
      banner.hidden = false;
      settings.hidden = true;
      settings.setAttribute("aria-expanded", "true");
    }

    function hideBanner() {
      banner.hidden = true;
      settings.hidden = false;
      settings.setAttribute("aria-expanded", "false");
    }

    function choose(allow) {
      saveConsent(allow ? "granted" : "denied");
      hideBanner();
      if (allow) {
        loadAnalytics();
      } else {
        clearAnalyticsCookies();
        if (analyticsLoaded) {
          window.location.reload();
        }
      }
    }

    banner.addEventListener("click", function (event) {
      var choice = event.target && event.target.getAttribute("data-choice");
      if (choice === "allow") {
        choose(true);
      } else if (choice === "reject") {
        choose(false);
      }
    });

    settings.addEventListener("click", showBanner);
    document.body.appendChild(banner);
    document.body.appendChild(settings);

    var consent = readConsent();
    if (consent === "granted") {
      hideBanner();
      loadAnalytics();
    } else if (consent === "denied") {
      hideBanner();
    } else {
      showBanner();
    }
  }

  function trackRfQSubmission() {
    var form = document.getElementById("rfqForm");
    if (!form) {
      return;
    }
    form.addEventListener("submit", function () {
      try {
        window.sessionStorage.setItem(leadKey, String(Date.now()));
      } catch (error) {
        // Without session storage, no lead event is sent from the thank-you page.
      }
    });
  }

  function init() {
    trackRfQSubmission();
    buildConsentUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());