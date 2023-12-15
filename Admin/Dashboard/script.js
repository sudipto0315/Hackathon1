// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";

window.onload = function() {
  const updateTimeElement = document.getElementById('update-time');
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const timeString = now.toLocaleTimeString('en-US', options);
  updateTimeElement.textContent = `Updated today at ${timeString}`;
}

// -- Area Chart Example
// Function to format a date as "MMM D"
function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Generate labels for the last 13 days
const labels = Array.from({length: 13}, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return formatDate(date);
}).reverse();

// no of reports per day
var data = [10, 30, 26, 18, 18, 28, 31, 33, 25, 24, 32, 131, 38]; // no of reports per day
var maxVal = Math.max(...data);
if (maxVal < 100) maxVal = 100;

var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Total Reports",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: data
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          time: {
            unit: "date",
          },
          gridLines: {
            display: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: maxVal,
            maxTicksLimit: 5,
            callback: function(value, index, values) {
              if (value > 100) {
                return '>100';
              } else {
                return value;
              }
            }
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});

// -- Pie Chart Example
Vue.component('pie-chart', {
  extends: VueChartJs.Pie,
 mounted () {
    this.renderChart({
      labels: ['Electrical', 'Road Work', 'Water Problem', 'Garbage'],
      datasets: [
        {
          backgroundColor: [
            '#007bff',
            '#dc3545',
            '#ffc107',
            '#28a745'
          ],
          data: [50, 20, 80, 10] // no of reports per category that are pending
        }
      ]
    }, {
      responsive: true, 
      maintainAspectRatio: false,
      pieceLabel: {
        mode: 'percentage',
        precision: 1
      }
    })
 }
  
})

var vm = new Vue({
  el: '.app'
})

$(document).ready(function () {
  $("#dataTable").DataTable();
});

(function ($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template:
      '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
  });
  // Toggle the side navigation
  $("#sidenavToggler").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(
      ".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level"
    ).removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function (e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $(
    "body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse"
  ).on("mousewheel DOMMouseScroll", function (e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip();
  // Smooth scrolling using jQuery easing
  $(document).on("click", "a.scroll-to-top", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
})(jQuery); // End of use strict
