'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var FamousUI = {
  breakPoints: {
    'sm': 580,
    'md': 780,
    'lg': 1150,
    'xl': 1250
  }
};

(function ($, window, FamousUI) {
  FamousUI.body = $('body , html');
})(jQuery, window, FamousUI);

//@prepros-append navbar.js
//@prepros-append accordion.js
//@prepros-append alert.js
//@prepros-append dropdown.js
//@prepros-append modal.js
//@prepros-append tabs.js
//@prepros-append carousel.js
//@prepros-append calendar.js
//@prepros-append forms.js
//@prepros-append button.js

(function ($, window, FamousUI) {
  FamousUI.navbar = {
    toggler: $('.fui-navbar .fui-toggler'),
    id: null,
    sideBar: function sideBar() {
      var $width = $(window).width() + 15;
      $('.fui-navbar').each(function () {
        var $toggleWidth = $(this).attr('data-toggle');
        $toggleWidth = parseInt($toggleWidth);

        if ($toggleWidth !== undefined) {
          if ($toggleWidth !== 'null' || $toggleWidth === 'none') {
            $toggleWidth = parseInt($toggleWidth);
            if ($width >= $toggleWidth) {
              $(this).find('.fui-menu-box').removeClass('sideNavbar toggled');
            } else {
              $(this).find('.fui-menu-box').addClass('sideNavbar');
            }
          }
        }
      });
    },
    onResize: function onResize() {
      $(window).on('resize', function () {
        FamousUI.navbar.sideBar();
      });
    },
    responsive: function responsive() {
      // NAVBAR RESPONSIVE BREAKING POINTS
      $('.fui-navbar').each(function () {
        if ($(this).hasClass('fui-expand-sm')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.sm);
        } else if ($(this).hasClass('fui-expand-md')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.md);
        } else if ($(this).hasClass('fui-expand-lg')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.lg);
        } else if ($(this).hasClass('fui-expand-xl')) {
          $(this).attr('data-toggle', FamousUI.breakPoints.xl);
        } else if ($(this).hasClass('fui-expanded')) {
          $(this).attr('data-toggle', '0');
        } else {
          $(this).attr('data-toggle', 'none');
        }
        FamousUI.navbar.sideBar();
        $(this).find('.fui-container').append('<div class="shadow-fixed"></div>');
        $(this).find('.fui-container-fluid').append('<div class="shadow-fixed"></div>');
      });
    },
    init: function init() {
      FamousUI.navbar.responsive();
      FamousUI.navbar.onResize();

      // TOGGLER CLICK
      FamousUI.navbar.toggler.on('click', function () {
        FamousUI.navbar.id = $(this).attr('data-nav');
        FamousUI.body.toggleClass('noScroll');
        $(FamousUI.navbar.id).toggleClass('toggled');
      });

      // MENU CLOSE
      $('.menu-close').on('click', function () {
        FamousUI.body.removeClass('noScroll');
        $(FamousUI.navbar.id).removeClass('toggled');
      });

      // SHADOW CLICK
      $('.fui-navbar .shadow-fixed').click(function (e) {
        if (!$(e.target).is(FamousUI.navbar.id)) {
          FamousUI.body.removeClass('noScroll');
          $(FamousUI.navbar.id).removeClass('toggled');
        }
      });
    }
  };

  FamousUI.navbar.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.accordion = {
    init: function init() {
      $('.fui-accordion').each(function () {

        if ($(this).hasClass('active')) {
          var panel = $(this).next('.fui-panel');
          $(this).next('.fui-panel').css('max-height', panel[0].scrollHeight + "px");
        }

        $('.fui-accordion').on('click', function () {

          $('.fui-accordion').next('.fui-panel').css('max-height', 0);
          $('.fui-accordion').removeClass('active');

          panel = $(this).next('.fui-panel');
          $(this).addClass('active');
          if (parseFloat($(this).next('.fui-panel').css('max-height'))) {
            $(this).next('.fui-panel').css('max-height', 0);
            $(this).removeClass('active');
          } else {
            $(this).next('.fui-panel').css('max-height', panel[0].scrollHeight + "px");
          }
        });
      });
    }
  };
  FamousUI.accordion.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.alert = {
    init: function init() {
      $('.fui-alert .fui-alert-close').on('click', function () {
        var $this = $(this);
        $this.parent('.dismissable').fadeOut('fast', function () {
          $this.parent('.dismissable').remove();
        });
      });
    }
  };
  FamousUI.alert.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.dropdown = {
    elem: $('.fui-dropdown'),
    init: function init() {
      $('.fui-dropdown > a').on('click', function (e) {
        e.preventDefault();
      });

      FamousUI.dropdown.elem.on('click', function (event) {
        event.stopPropagation();
        $(this).siblings('.fui-dropdown').removeClass('menu-showing');
        $(this).toggleClass('menu-showing');
      });

      FamousUI.dropdown.elem.on('mouseleave', function (event) {
        event.stopPropagation();
        $(this).removeClass('menu-showing');
      });

      FamousUI.body.on('click', function (e) {
        if (!$(e.target).is('.fui-dropdown')) {
          $('.fui-dropdown').removeClass('menu-showing');
        }
      });
    }
  };
  FamousUI.dropdown.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.modal = {
    animateModal: function animateModal($modal) {
      var animate = $modal.find('.fui-modal-container').attr('data-modal-animate');
      if ((typeof animate === 'undefined' ? 'undefined' : _typeof(animate)) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && animate !== false) {
        animate = animate.split(',');
        return animate;
      } else {
        $modal.find('.fui-modal-container').addClass('animation-added');
        return ['', ''];
      }
    },
    modalOpen: function modalOpen($modal) {
      $modal.removeClass('modal-exit').addClass('modal-show');
      $modal.find('.fui-modal-container').addClass('animated ' + FamousUI.modal.animateModal($modal)[0]);
      FamousUI.body.addClass('noScroll');
      setTimeout(function () {
        $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[0]);
      }, 1000);
    },
    modalClose: function modalClose($modal) {
      $modal.find('.fui-modal-container').addClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
      if (FamousUI.modal.animateModal($modal)[1] === '') {
        $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
        $modal.removeClass('modal-show').addClass('modal-exit');
        FamousUI.body.removeClass('noScroll');
      } else {
        setTimeout(function () {
          $modal.find('.fui-modal-container').removeClass('animated ' + FamousUI.modal.animateModal($modal)[1]);
          $modal.removeClass('modal-show').addClass('modal-exit');
          FamousUI.body.removeClass('noScroll');
        }, 1000);
      }
    },
    init: function init() {
      $('.modal-open').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        console.log($modal);

        FamousUI.modal.modalOpen($modal);
      });

      // MODAL CLOSE ON CLICK
      $('.modal-close').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-modal');
        var $modal = $('#' + target);
        FamousUI.modal.modalClose($modal);
      });

      // CLICK EVENT OUTSIDE MODAL
      $('.fui-modal').on('click', function (e) {
        if ($(e.target).is('.fui-modal')) {
          var $modal = $('.fui-modal.modal-show');
          FamousUI.modal.modalClose($modal);
        }
      });

      $.fn.FUIModal = function () {
        var $target = $(this);

        function open() {
          FamousUI.modal.modalOpen($target);
        }

        function close() {
          FamousUI.modal.modalClose($target);
        }

        return {
          open: open,
          close: close
        };
      };
    }
  };
  FamousUI.modal.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.tabs = {
    init: function init() {
      $('.fui-tab-link').on('click', function () {
        var $target = $(this).attr('data-tab');
        var $mainParent = $(this).closest('.fui-tabs');

        $mainParent.find('.fui-tab-nav .fui-tab-link').removeClass('active');
        $("[data-tab='" + $target + "']").addClass('active');

        $mainParent.find('.fui-tab-content').removeClass('active');
        $('#' + $target).addClass('active');
      });

      // TAB CLOSE
      $('.fui-tab-close').on('click', function () {
        $(this).closest('.fui-tab-content').removeClass('active');
      });
    }
  };
  FamousUI.tabs.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.carousel = {
    init: function init() {

      $(".fui-carousel").each(function () {
        var carousel = $(this);
        var slides = carousel.find(".fui-carousel-track > .fui-carousel-item");
        var total_slides = slides.length;
        var indicators = carousel.find(".fui-carousel-indicators");
        var indicate = carousel.hasClass("fui-carousel-indicate");

        if (indicators.length < 1 && indicate) {
          indicators = $("<div>").addClass("fui-carousel-indicators");
          carousel.prepend(indicators);
        }

        carousel.attr("data-index", 0);

        slides.each(function () {
          var slide = $(this);
          slide.attr("data-index", slide.index());
          indicators.append($("<div>").addClass("fui-carousel-indicator"));
        });

        indicators.children().first().addClass("fui-carousel-indicator-active");

        FamousUI.carousel.autoPlay(carousel);

        carousel.find(".fui-carousel-arrow-left.fui-carousel-arrow").click(function () {
          var index = carousel.data("index");
          FamousUI.carousel.setIndex(carousel, index - 1);
          FamousUI.carousel.autoPlay(carousel);
        });

        carousel.find(".fui-carousel-arrow-right.fui-carousel-arrow").click(function () {
          var index = carousel.data("index");
          FamousUI.carousel.setIndex(carousel, index + 1);
          FamousUI.carousel.autoPlay(carousel);
        });

        carousel.find(".fui-carousel-indicators .fui-carousel-indicator").click(function () {
          var index = $(this).index();
          FamousUI.carousel.setIndex(carousel, index);
          FamousUI.carousel.autoPlay(carousel);
        });
      });
    },
    setIndex: function setIndex(carousel, index) {

      var indicators = carousel.find(".fui-carousel-indicators");
      var content = carousel.find(".fui-carousel-track");
      var slides = carousel.find(".fui-carousel-track > .fui-carousel-item");
      var total_slides = slides.length;

      if (index > total_slides - 1) {
        index = 0;
      } else if (index < 0) {
        index = total_slides - 1;
      }

      carousel.data("index", index);

      content.css({
        "transform": "translateX(" + -index * content.width() + "px)"
      });

      indicators.find(".fui-carousel-indicator").removeClass("fui-carousel-indicator-active");

      var active = indicators.find(".fui-carousel-indicator").eq(index);
      if (active.length) {
        active.addClass("fui-carousel-indicator-active");
      }
    },
    autoPlay: function autoPlay(carousel) {
      var auto_play = carousel.hasClass("fui-carousel-auto");
      var intervalimer = carousel.data("intervalTimer");
      clearInterval(intervalimer);
      if (auto_play) {
        var newInterval = setInterval(function () {
          var index = carousel.data("index");
          FamousUI.carousel.setIndex(carousel, index + 1);
        }, 5000);
        carousel.data("intervalTimer", newInterval);
      }
    }
  };
  FamousUI.carousel.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.calendar = {
    daysOfWeek: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    init: function init() {
      $(".fui-calendar").each(function () {
        var input = $(this);
        var calendar_container = $("<div>").addClass("fui-calendar-container");
        calendar_container.insertBefore(input);
        calendar_container.append(input);
        if (input.hasClass("fui-calendar-dropdown")) {
          calendar_container.addClass("fui-calendar-container-dropdown");
          input.attr("readonly", "readonly");
          input.on("focus", function () {
            calendar_container.addClass("fui-calendar-container-dropdown-open");
            calendar_container.find(".fui-calendar-type").find(":input").first().focus();
          });
        }
        if (input.hasClass("fui-calendar-fancy")) {
          var fancyCal = FamousUI.calendar.createFancyCalendar(input);
          calendar_container.append(fancyCal);

          calendar_container.on("click", ".fui-calendar-nav-prev", function () {
            FamousUI.calendar.prevMonth(input);
          });

          calendar_container.on("click", ".fui-calendar-nav-next", function () {
            FamousUI.calendar.nextMonth(input);
          });

          calendar_container.on("click", ".fui-calendar-day", function () {
            var day = $(this).data("day");
            var d = input.data("date");
            var m = d.getMonth();
            var y = d.getFullYear();
            var newDate = new Date(y, m, day);
            input.data("selected", newDate);

            var newSelected = $(this);
            $(".fui-calendar-day").not(newSelected).removeClass("fui-calendar-day-selected");
            newSelected.addClass("fui-calendar-day-selected");

            if (calendar_container.hasClass("fui-calendar-container-dropdown")) {
              calendar_container.find(".fui-calendar").val(FamousUI.calendar.months[m] + " " + day + ", " + y);
              calendar_container.removeClass("fui-calendar-container-dropdown-open");
            }
          });
        } else {
          calendar_container.append(FamousUI.calendar.createStandardDate(input));
          calendar_container.on("change", ".fui-calendar-type :input", function () {
            var isValid = true;
            calendar_container.find(".fui-calendar-type :input").each(function () {
              if (!$(this).val()) {
                isValid = false;
              }
            });
            if (isValid) {
              var month = calendar_container.find(".fui-calendar-month").val();
              var day = calendar_container.find(".fui-calendar-day").val();
              var year = calendar_container.find(".fui-calendar-year").val();
              calendar_container.find(".fui-calendar").val(month + " " + day + ", " + year);
              calendar_container.removeClass("fui-calendar-container-dropdown-open");
            } else {
              calendar_container.find(".fui-calendar").val("");
            }
          });
        }
      });

      $("html,body").click(function (event) {
        var $target = $(event.target);
        if (!$target.parents().is(".fui-calendar-container") && !$target.is(".fui-calendar-container")) {
          $(".fui-calendar-container.fui-calendar-container-dropdown").removeClass("fui-calendar-container-dropdown-open");
        }
      });
    },
    createFancyCalendar: function createFancyCalendar(calendar) {
      var container = calendar.closest(".fui-calendar-container");
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      calendar.data("date", d);

      var fancyCalendar = FamousUI.calendar.display(calendar);

      return fancyCalendar;
    },
    nextMonth: function nextMonth(calendar) {
      var current_date = calendar.data("date");
      var month = current_date.getMonth();
      var year = current_date.getFullYear();
      var day = current_date.getDate();
      month++;
      calendar.data("date", new Date(year, month, day));
      FamousUI.calendar.update(calendar);
    },
    prevMonth: function prevMonth(calendar) {
      var current_date = calendar.data("date");
      var month = current_date.getMonth();
      var year = current_date.getFullYear();
      var day = current_date.getDate();
      month--;
      calendar.data("date", new Date(year, month--, day));
      var fancyCalendar = FamousUI.calendar.update(calendar);
    },
    display: function display(calendar) {
      var d = calendar.data("date");
      var m = d.getMonth();
      var y = d.getFullYear();
      var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
      var lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();

      var fancy = $("<div>").addClass("fui-calendar-type fui-calendar-type-fancy");
      var header = $("<div>").addClass("fui-calendar-header");
      var prev = $("<div>").addClass("fui-calendar-nav fui-calendar-nav-prev").html('<i class="fa fa-arrow-left"></i>');

      var next = $("<div>").addClass("fui-calendar-nav fui-calendar-nav-next").html('<i class="fa fa-arrow-right"></i>');

      var current = $("<div>").addClass("fui-calendar-current");
      var days = $("<div>").addClass("fui-calendar-days");

      header.append(prev);
      header.append(current);
      header.append(next);
      fancy.append(header);
      fancy.append(days);

      current.html(FamousUI.calendar.months[m] + " " + y);
      var html = FamousUI.calendar.getDays(calendar);
      days.html(html);
      return fancy;
    },
    update: function update(calendar) {
      var d = calendar.data("date");
      var m = d.getMonth();
      var y = d.getFullYear();
      var html = FamousUI.calendar.getDays(calendar);
      calendar.closest(".fui-calendar-container").find(".fui-calendar-days").html(html);
      calendar.closest(".fui-calendar-container").find(".fui-calendar-current").html(FamousUI.calendar.months[m] + " " + y);
    },
    getDays: function getDays(calendar) {
      var selected = calendar.data("selected");
      var d = calendar.data("date");
      var m = d.getMonth();
      var y = d.getFullYear();
      var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();
      var lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();

      var table = $("<table>");
      var tableHead = $("<thead>");
      var weekRow = $("<tr>");
      for (var x = 0; x < 7; x++) {
        var weekDay = $("<th>").text(FamousUI.calendar.daysOfWeek[x]);
        weekRow.append(weekDay);
      }
      tableHead.append(weekRow);
      table.append(tableHead);

      var tableBody = $("<tbody>");
      var day = 1;
      var daysRow = $("<tr>");
      for (var i = 0; i <= 42; i++) {
        var weekDay = $("<td>");
        daysRow.append(weekDay);
        if (i >= firstDayOfCurrentMonth) {
          var dayNum = $("<p>").addClass("fui-calendar-day");

          var todayDate = new Date();
          var todayMonth = todayDate.getMonth();
          var todayYear = todayDate.getFullYear();
          var todayDay = todayDate.getDate();

          if (day == todayDay && m == todayMonth && y == todayYear) {
            dayNum.addClass("fui-calendar-day-today");
            dayNum.text(day).data("day", day);
            weekDay.append(dayNum);
          } else {
            dayNum.text(day).data("day", day);
            weekDay.append(dayNum);
          }

          if (selected) {
            var selMonth = selected.getMonth();
            var selYear = selected.getFullYear();
            var selDay = selected.getDate();
            if (m == selMonth && y == selYear && day == selDay) {
              dayNum.addClass("fui-calendar-day-selected");
            }
          }

          day++;
        }
        if (i % 7 == 0 && !(day > lastDateOfCurrentMonth)) {
          tableBody.append(daysRow);
          var daysRow = $("<tr>");
        } else if (day > lastDateOfCurrentMonth) {
          tableBody.append(daysRow);
          break;
        }
      }

      table.append(tableBody);
      return table;
    },
    createStandardDate: function createStandardDate(calendar) {
      var standard = $("<div>").addClass("fui-calendar-type fui-calendar-standard");
      var row = FamousUI.calendar.createRow();

      var monthCol = FamousUI.calendar.createCol();
      var monthGroup = FamousUI.calendar.createGroup();
      var monthSelect = FamousUI.calendar.createSelect();
      monthSelect.addClass("fui-calendar-month");
      var monthOpts = JSON.parse(JSON.stringify(FamousUI.calendar.months));
      monthOpts.unshift("Month");
      var monthOptions = FamousUI.calendar.createOptions(monthOpts);

      monthSelect.append(monthOptions);
      monthGroup.append(monthSelect);
      monthCol.append(monthGroup);

      row.append(monthCol);

      var monthDays = [];
      monthDays.push("Day");
      for (var i = 1; i <= 31; i++) {
        monthDays.push(i);
      }

      var dayCol = FamousUI.calendar.createCol();
      var dayGroup = FamousUI.calendar.createGroup();
      var daySelect = FamousUI.calendar.createSelect();
      daySelect.addClass("fui-calendar-day");
      var dayOptions = FamousUI.calendar.createOptions(monthDays);

      daySelect.append(dayOptions);
      dayGroup.append(daySelect);
      dayCol.append(dayGroup);

      row.append(dayCol);

      var monthYears = [];
      monthYears.push("Year");
      for (var i = 2019; i >= 1960; i--) {
        monthYears.push(i);
      }

      var yearCol = FamousUI.calendar.createCol();
      var yearGroup = FamousUI.calendar.createGroup();
      var yearSelect = FamousUI.calendar.createSelect();
      yearSelect.addClass("fui-calendar-year");
      var yearOptions = FamousUI.calendar.createOptions(monthYears);

      yearSelect.append(yearOptions);
      yearGroup.append(yearSelect);
      yearCol.append(yearGroup);

      row.append(yearCol);
      standard.append(row);

      return standard;
    },
    createStandardTime: function createStandardTime(calendar) {
      //var label = FamousUI.calendar.createLabel();
      var row = FamousUI.calendar.createRow();

      var hourCol = FamousUI.calendar.createCol();
      var hourGroup = FamousUI.calendar.createGroup();
      var hourSelect = FamousUI.calendar.createSelect();
      var hourOptions = FamousUI.calendar.createOptions({
        "": "Hour"
      });

      hourSelect.append(hourOptions);
      hourGroup.append(hourSelect);
      hourCol.append(hourGroup);

      row.append(hourCol);

      var minuteCol = FamousUI.calendar.createCol();
      var minuteGroup = FamousUI.calendar.createGroup();
      var minuteSelect = FamousUI.calendar.createSelect();
      var minuteOptions = FamousUI.calendar.createOptions({
        "": "Minute"
      });

      minuteSelect.append(minuteOptions);
      minuteGroup.append(minuteSelect);
      minuteCol.append(minuteGroup);

      row.append(minuteCol);

      var periodCol = FamousUI.calendar.createCol();
      var periodGroup = FamousUI.calendar.createGroup();
      var periodSelect = FamousUI.calendar.createSelect();
      var periodOptions = FamousUI.calendar.createOptions({
        "am": "AM",
        "pm": "PM"
      });

      periodSelect.append(periodOptions);
      periodGroup.append(periodSelect);
      periodCol.append(periodGroup);

      row.append(periodCol);

      return row;
    },
    createLabel: function createLabel(title) {
      return $("<label>").addClass("mb-0").text(title);
    },
    createRow: function createRow() {
      return $("<div>").addClass("row");
    },
    createCol: function createCol() {
      return $("<div>").addClass("col-12 col-md-4");
    },
    createGroup: function createGroup() {
      return $("<div>").addClass("group pb-0");
    },
    createSelect: function createSelect() {
      return $("<select>").addClass("input");
    },
    createOptions: function createOptions(opts) {
      var options = [];
      opts.forEach(function (val, index) {
        var item = $("<option>");
        if (val == "Month" || val == "Day" || val == "Year") {
          item.val("");
        } else {
          item.val(val);
        }
        item.text(val);
        options.push(item);
      });
      return options;
    }
  };
  FamousUI.calendar.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.forms = {
    country_list: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
    us_state_list: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    init: function init() {
      $('select').each(function () {
        var select = $(this);
        if (!select.attr("multiple")) {
          var color = select.data("color");
          var newId = Math.random().toString(36).substr(2, 9);
          var label = $("<label>").addClass("fui-select-label-wrapper").attr("for", newId);
          label.insertBefore(select);
          if (color) {
            label.addClass("text-" + color);
          }
          var span = $("<span>");
          span.text(select.find("option:selected").text());
          label.append(span);
          label.append(select);
          $(this).attr("id", newId);

          if (select.hasClass("fui-input-us-states")) {
            var item = $("<option>");
            item.text("Select a State");
            item.val("");
            select.append(item);
            FamousUI.forms.us_state_list.forEach(function (val, index) {
              var item = $("<option>");
              item.text(val);
              item.val(val);
              select.append(item);
            });
          }

          if (select.hasClass("fui-input-country")) {
            var item = $("<option>");
            item.text("Select a Country");
            item.val("");
            select.append(item);

            FamousUI.forms.country_list.forEach(function (val, index) {
              var item = $("<option>");
              item.text(val);
              item.val(val);
              select.append(item);
            });
          }

          var selected = select.find("option:selected").text();
          if (!selected) {
            select.find("option").first().attr("selected");
            selected = select.find("option:selected").text();
          }
          select.prev('span').text(selected);
        }
      });
      $('select').change(function () {
        $(this).prev('span').text($(this).find(':selected').html());
      });

      $.fn.FUIForm = function () {
        var target = $(this);

        var addErrors = function addErrors(errors) {
          var fui_errors = target.find(".fui-errors");
          if (fui_errors.length < 1) {
            var _fui_errors = $("<div>").addClass("fui-errors");
            target.prepend(_fui_errors);
          }

          if (errors) {
            for (error in errors) {
              var error = $("<div />").addClass("fui-alert danger").text(errors[error]);
              fui_errors.append(error);
              var field = fui_errors.find("[name='" + error + "']");
              field.addClass("error-field");
            }
          }
        };

        var clearErrors = function clearErrors() {
          target.find(".fui-errors").empty();
        };

        return {
          addErrors: addErrors,
          clearErrors: clearErrors
        };
      };
    }
  };
  FamousUI.forms.init();
})(jQuery, window, FamousUI);

(function ($, window, FamousUI) {
  FamousUI.button = {
    loading: function loading(target, direction) {

      if (direction == "stop") {
        FamousUI.button.stopLoading(target);
      } else {
        FamousUI.button.startLoading(target);
      }
    },
    startLoading: function startLoading(target) {
      if (target.hasClass("fui-btn") && target.find(".fui-spinner-border").length < 1) {
        target.addClass("loading");
        var content = target.html();
        target.data("original", content);
        var spinner = $("<span>");
        spinner.addClass("fui-spinner-border fui-spinner-border-sm");
        spinner.attr({ "role": "status", "aria-hidden": "true" });
        var loadingContent = $("<span>");
        loadingContent.text("Loading...");
        target.html("").append(spinner).append(loadingContent);
      }
    },
    stopLoading: function stopLoading(target) {
      if (target.hasClass("fui-btn") && target.find(".fui-spinner-border").length > 0) {
        target.removeClass("loading");
        var originalContent = target.data("original");
        if (!originalContent) {
          originalContent = "Submit";
        }
        target.html("").append(originalContent);
      }
    },
    init: function init() {
      $.fn.FUIButton = function () {
        var target = $(this);

        var loading = function loading() {
          var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "start";

          FamousUI.button.loading(target, direction);
        };

        return {
          loading: loading
        };
      };
    }
  };
  FamousUI.button.init();
})(jQuery, window, FamousUI);