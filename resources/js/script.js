$(document).on('ready', function () {
    let lang;

    async function languageSwitching() {
        try {
            let ip_data = await $.getJSON('https://api.ipdata.co/?api-key=f3381a7cda51b9424bcd21701004d2b9e5525b0b2c35033f3697bffa');
            console.log(ip_data);
            let country_data = await $.getJSON('https://restcountries.eu/rest/v1/alpha/' + ip_data.country_code);
            lang1 = country_data.languages;
            i18next.use(i18nextXHRBackend)
                .use(i18nextBrowserLanguageDetector)
                .init({
                    lng: lang1[0],
                    fallbackLng: 'en',
                    debug: true,
                    ns: ['common'],
                    defaultNS: 'common',
                    backend: {
                        loadPath: './vendor/locales/{{lng}}/{{ns}}.json',
                        crossDomain: true
                    }
                }, function (err, t) {
                    jqueryI18next.init(i18next, $);
                    $('body').localize();
                });
        } catch (e) {
            console.error(e);
        }
    }

    languageSwitching();

    function updateContent() {
        jqueryI18next.init(i18next, $);
        $('body').localize();
    }

    function changeLng(lng) {
        i18next.changeLanguage(lng);
    }

    i18next.on('languageChanged', () => {
        updateContent();
    });

    $('.nav-header form').on('click', function (e) {

        // If the form (which is turned into the search button) was
        // clicked directly, toggle the visibility of the search box.

        if (e.target == this) {
            $(this).find('input').toggle();
        }

    });
});
$(window).on('load resize orientationchange', function () {
    $('.blogspot').each(function () {
        var $carousel = $(this);
        /* Initializes a slick carousel only on mobile screens */
        // slick on mobile
        if ($(window).width() > 768) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        } else {
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    cssEase: 'linear'
                });
            }
        }
    });
});
