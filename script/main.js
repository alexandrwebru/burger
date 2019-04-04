//hamburger menu

const openHamMenu = document.querySelector('#openHamMenu');
const closeHamMenu = document.querySelector('#closeHamMenu');
const hamLink = document.querySelector('.hamburger__menu-link');
const hamMenuLink = document.querySelectorAll('.ham-menu__link');
const hamList = document.querySelector('.ham-menu__list');

const toggleMenu = function () {
  document.body.classList.toggle('blocked');
  openHamMenu.classList.toggle('hamburger__menu--active');
};

hamLink.addEventListener('click', function (e) {
  e.preventDefault();
  toggleMenu();
});

closeHamMenu.addEventListener('click', function (e) {
  e.preventDefault();
  toggleMenu();
});

hamList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.className === 'ham-menu__link') {
    toggleMenu();
  };
});


// jQuery Burger-slider Owl

const owlCarousel = function () {
  const burgerCarousel = $(".burger-slider__list").owlCarousel({
    items: 1,
    nav: true,
    navContainer: $(".slider__controls"),
    navText: ["", ""],
    loop: true
  });

  $(".arrow__right").on("click", function (e) {
    e.preventDefault();
    burgerCarousel.trigger("next.owl.carousel");
  });

  $(".arrow__left").on("click", function (e) {
    e.preventDefault();
    burgerCarousel.trigger("prev.owl.carousel");
  });
};

owlCarousel();



// Ingredients overlay

// let overlayVisible = () => {

//   let ingr = $('.ingredients');

//   $('.ingredients__close').on('click touchstart', e => {
//     e.preventDefault();
//     ingr.removeClass('ingredients--active')
//   });

//   ingr.on({
//     mouseenter() {
//       $(this).addClass('ingredients--active');
//     },
//     mouseleave() {
//       $(this).removeClass('ingredients--active');
//     } 
//   });

// };

// overlayVisible();

let overlayVisible = function() {

  let ingr = document.querySelectorAll('.ingredients');

  ingr.forEach(function (item) {
    let close = item.querySelector('.ingredients__close');

    close.addEventListener('click', e => {
      e.preventDefault();
      item.classList.remove('ingredients--active');
    });

    item.addEventListener('mouseenter', function () {
      item.classList.add('ingredients--active');
    });

    item.addEventListener('mouseleave', function () {
      item.classList.remove('ingredients--active');
    });

  });
  
};

overlayVisible();


//Team Accordeon

const teamAcco = function () {
  const teamList = document.querySelector('.team-accordeon__list');

  teamList.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target;
    const item = target.closest('.team-accordeon__item');
    const items = document.querySelectorAll('.team-accordeon__item');

    if (item) {
      if (!item.classList.contains('team-accordeon__item--active')) {
        for (var i = 0; i < items.length; i++) {
          items[i].classList.remove('team-accordeon__item--active');
        }

        item.classList.add('team-accordeon__item--active');
      } else {
        item.classList.remove('team-accordeon__item--active');
      }
    }
  });
};
teamAcco();


//Menu Accordeon

const menuAcco = function () {
  const calculateWidth = function () {
    const windowWidth = $(window).width();
    const menuAccoTriggers = $(".menu-accordeon__item-link");
    const triggerWidth = menuAccoTriggers.width();
    const totalWidth = windowWidth - triggerWidth * menuAccoTriggers.length;
    //вычитаем из ширины window ширину menu-accordeon__item-link

    return totalWidth > 550 ? 550 : totalWidth;
  };

  const openItem = function (item) {
    const menuAccoList = $(".menu-accordeon");
    const menuAccoItem = $(".menu-accordeon__item", menuAccoList);
    const itemBlock = item.find(".menu-accordeon__item-block");
    const itemText = $(".menu-accordeon__item-text", menuAccoList);
    const activeItem = menuAccoItem.filter(".menu-accordeon__item--active");
    const activeBlock = activeItem.find(".menu-accordeon__item-block");
    const totalWidth = calculateWidth();

    menuAccoItem.removeClass("menu-accordeon__item--active");
    item.addClass("menu-accordeon__item--active");

    itemText.hide();
    activeBlock.animate({
      width: "0px"
    });

    itemBlock.animate({
        width: totalWidth + "px"
      },
      function () {
        itemText.fadeIn();
      });
  };

  const closeItem = function (item) {
    item.removeClass("menu-accordeon__item--active");

    item
      .closest(".menu-accordeon")
      .find(".menu-accordeon__item-text")
      .stop(true, true)
      .fadeOut(function () {
        item.find(".menu-accordeon__item-block").animate({
          width: "0px"
        });
      });
  };

  $(".menu-accordeon__item-link").on("click", function (e) {
    e.preventDefault();

    const $this = $(e.target);
    const item = $this.closest(".menu-accordeon__item");
    item.hasClass("menu-accordeon__item--active") ? closeItem(item) : openItem(item);
  });

  $(document).on("click", function (e) {
    const $this = $(e.target);

    if (!$this.closest(".menu-accordeon").length) {
      closeItem($(".menu-accordeon__item"));
    }
  });
};

menuAcco();

//Review Overlay (Модальное окно)

const fancyboxModal = function () {
  $(".reviews__item-link").fancybox({
    touch: true,
    smallBtn: false
  });

  $(".review-overlay__close").on("click", function (e) {
    e.preventDefault();
    $.fancybox.close();
  });
};

fancyboxModal();

// One Page Scroll

const OPS = function () {
  const maincontent = $("#maincontent");
  const sections = $(".section");
  var inscroll = false;

  const sectionSwitch = function (sectionEq) {
    if (!inscroll) {
      inscroll = true;

      const position = sectionEq * -100 + "%";

      sections
        .eq(sectionEq)
        .addClass("section--active")
        .siblings()
        .removeClass("section--active");

      maincontent.css({
        transform: `translateY(${position})`,
        "-webkit-transform": `translateY(${position})`
      });


      setTimeout(function () {
        inscroll = false;

        $(".point-menu__item")
          .eq(sectionEq)
          .addClass("point-menu__item--active")
          .siblings()
          .removeClass("point-menu__item--active");
      }, 1000);
    }
  };

  const defineSections = function (sections) {
    const activeSection = sections.filter(".section--active");
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev()
    };
  };

  const scrollToSection = function (direction) {
    const section = defineSections(sections);

    if (direction === "up" && section.nextSection.length) {
      sectionSwitch(section.nextSection.index());
    }

    if (direction === "down" && section.prevSection.length) {
      sectionSwitch(section.prevSection.index());
    }
  };

  $(".wrapper").on({
    wheel: function (e) {
      const deltaY = e.originalEvent.deltaY;
      const direction = deltaY > 0 ? "up" : "down";

      scrollToSection(direction);
    },
    touchmove: e => e.preventDefault()
  });
  $(document).on("keydown", function (e) {
    const section = defineSections(sections);

    switch (e.keyCode) {
      case 40:
        if (section.nextSection.length) {
          sectionSwitch(section.nextSection.index());
        }
        break;

      case 38:
        if (section.prevSection.length) {
          sectionSwitch(section.prevSection.index());
          break;
        }
    }
  });

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  // alert(isMobile);

  if (isMobile) {
    $(document).swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        // const scrollDirection = direction === 'up' ? 'down' : 'up';
        scrollToSection(direction);
      }
    });
  }

  $("[data-scroll-to]").on("click", function (e) {
    e.preventDefault();
    sectionSwitch(parseInt($(e.target).data("scroll-to")));
  });
};

OPS();

// form function 

var ajaxForm = function (form) {
  var data = form.serialize(),
    url = form.attr('action');

    return $.ajax({
      type: 'POST',
      url: url,
      dataType: 'JSON',
      data: data
    });
};

var submitForm = function (e) {
  e.preventDefault();
  var form = $(e.target);
  var request = ajaxForm(form);
  request.done(function (msg) {
    const formOverlay = msg.status ? '#success' : '#error';
    $status = $(formOverlay)

    $.fancybox.open($status, {
      type: 'inline',
      maxWidth: 250,
      fitToView: false,
      padding: 0,
      afterClose() {
        form.trigger('reset');
      }
    });
  });

  request.fail(function (jqXHR, textStatus) {
    $.fancybox.open($('#error'), {
      // $('#error').html("На сервере произошла ошибка: " + textStatus), {
      type: 'inline',
      maxWidth: 250,
      fitToView: false,
      padding: 0
    });
  });

}

$('.form-overlay-btn').on('click', function (e) {
  e.preventDefault();
  $.fancybox.close();
});

$('#order-form').on('submit', submitForm)

$('.form__input--inputmask').inputmask('+7 (999) 999 99 99');

//Yandex map

ymaps.ready(init);
var myMap,
  myPlacemark,
  myPlacemark2,
  myPlacemark3;

function init() {
  var myMap = new ymaps.Map('map', {
    center: [59.93, 30.31],
    zoom: 12
  });

  myPin = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icons/map-marker.svg',
    iconImageSize: [40, 48],
    iconImageOffset: [-20, -48]
  });

  myPlacemark = new ymaps.Placemark([59.964726, 30.351549], {
    content: 'Mr.Burger',
    balloonContent: 'Лесной проспект, 15',
    hintContent: "Mr.Burger"
  });

  myPlacemark2 = new ymaps.Placemark([59.890587, 30.310499], {
    content: 'Mr.Burger',
    balloonContent: 'Старообрядческая улица, 8',
    hintContent: "Mr.Burger"
  });

  myPlacemark3 = new ymaps.Placemark([59.908228, 30.454389], {
    content: 'Mr.Burger',
    balloonContent: 'улица Подвойского, 6/5',
    hintContent: "Mr.Burger"
  });

  myPin.add(myPlacemark).add(myPlacemark2).add(myPlacemark3);
  myMap.geoObjects.add(myPin);

  myMap.behaviors.disable("scrollZoom");

};