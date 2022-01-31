$( document ).ready(function() {
    $("#preloader").delay(1500).fadeOut("slow")
    $(document.body).delay(1500).addClass("loaded");
    addAtropos(".atropos");
    
    jQuery.event.special.touchstart = { setup: function( _, ns, handle ) { this.addEventListener('touchstart', handle, { passive: !ns.includes('noPreventDefault') }); }};
    jQuery.event.special.touchmove = { setup: function( _, ns, handle ) { this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') }); }};

    // Hero -------------------------------------------------------------------------------------------
    dayglow(); // Depending on time of day, change from darker image to lighter
    function dayglow() {
        var currentTime = new Date().getHours();
        if ((6 <= currentTime && currentTime < 18 )) { //if between 6am and 6pm
            $("#hero").attr("src", "resources/heroes/day1.jpg");
            $("body").removeClass("nighttime");
        } else {
            let nightImages = [
                "resources/heroes/night1.jpg"
            ]
            let hero = nightImages[Math.floor(Math.random()*nightImages.length)];
            $("#hero").attr("src", hero);
            $("body").addClass("nighttime");
        }
    }  

    setHeroText();
    $(window).on('resize', function(){ setHeroText(); });
    function setHeroText() {
        if ($(window).width() < 640) { $("header img").attr("src", "./resources/heroes/travellog-mobile.png"); }
        else { $("header img").attr("src", "./resources/heroes/travellog.png"); }
    }

    var blurOnScroll = function(evt) {
        if ($(this).scrollTop() > 0) {
            let calcBlur = "blur("+ (($(this).scrollTop()**1.4)/5000) +"rem)";
            let calcOpacity = (300-$(this).scrollTop())/400 + "";
            $("#hero").css({
                "filter":calcBlur,
                "opacity":calcOpacity
            });
            
        } else { $("#hero").css({
            "filter":"none",
            "opacity":"0.8"
        }); }
    };
    window.addEventListener("scroll", blurOnScroll);


    // Audio -------------------------------------------------------------------------------------------
    $("audio")[0].volume = 0.03; //0.15 for Novo
    $("#audiogroup").click(() => { 
        $("#audiogroup").toggleClass("soundoff");
        if ($("audio")[0].paused == false) {
            $("audio")[0].pause();
        } else {
            $("audio")[0].play();
        }
    })


    /* Atropos ------------------------------------------------------------------------------------------ */
    function addAtropos(element) {
        document.querySelectorAll(element).forEach((e) => {
            Atropos({ el: e, highlight: false, rotateTouch: "scroll-y" });
        });
    }
    
    
    /* Upcoming -------------------------------------------------------------------------------------------
    •  -
    */
});
