/*
 * Main Configuration
 * CUGC Website
 */

$(document).ready(function() {
  $("table").addClass("table table-striped");
  $("table").parent().addClass("table-responsive");
});

/* Gallery */

var curr_folder = "";
var current_imgs = {}; /* Current image (int) for given folder */
var img_lists = {}; /* Array of images for given folder */

$(".gallery-start").on("touchstart click", function(e) {
  if (e.type == "touchstart") {
    $(this).off("click");
  }

  curr_folder = $(this).attr("id").replace("start-", "");

  if (!(curr_folder in current_imgs)) {
    current_imgs[curr_folder] = 0;
    img_lists[curr_folder] = [];

    alert(current_imgs.length)

    /* Read directory contents */
    $.ajax({
      url: "/gallery/" + curr_folder + "/",
      success: function(data) {
        alert("Hi")
        $(data).find("a:contains(.jpg)").each(function () {
          var filename = "/gallery/" + curr_folder + "/" + this.innerHTML;
          img_lists[curr_folder].push(filename);
        });

        var ind = current_imgs[curr_folder], thislen = img_lists[curr_folder].length;
        var ind_prev = (ind + thislen - 1) % thislen, ind_next = (ind + 1) % thislen;
        $("#gallery-" + curr_folder + " .gal-show").attr("src", img_lists[curr_folder][ind]);
        $("#gallery-" + curr_folder + " .gal-prev").attr("src", img_lists[curr_folder][ind_prev]);
        $("#gallery-" + curr_folder + " .gal-next").attr("src", img_lists[curr_folder][ind_next]);
      }
    });
  }

  var ind = current_imgs[curr_folder], thislen = img_lists[curr_folder].length;
  var ind_prev = (ind + thislen - 1) % thislen, ind_next = (ind + 1) % thislen;
  $("#gallery-" + curr_folder + " .gal-show").attr("src", img_lists[curr_folder][ind]);
  $("#gallery-" + curr_folder + " .gal-prev").attr("src", img_lists[curr_folder][ind_prev]);
  $("#gallery-" + curr_folder + " .gal-next").attr("src", img_lists[curr_folder][ind_next]);
});

$(".gallery-prev").on("touchstart click", function(e) {
  if (e.type == "touchstart") {
    $(this).off("click");
  }

  var ind_next = current_imgs[curr_folder], thislen = img_lists[curr_folder].length;
  var ind = (ind_next + thislen - 1) % thislen, ind_prev = (ind_next + 2 * thislen - 2) % thislen;
  current_imgs[curr_folder] = ind;
  $("#gallery-" + curr_folder + " .gal-show").attr("src", img_lists[curr_folder][ind]);
  $("#gallery-" + curr_folder + " .gal-prev").attr("src", img_lists[curr_folder][ind_prev]);
  $("#gallery-" + curr_folder + " .gal-next").attr("src", img_lists[curr_folder][ind_next]);
});

$(".gallery-next").on("touchstart click", function(e) {
  if (e.type == "touchstart") {
    $(this).off("click");
  }

  var ind_prev = current_imgs[curr_folder], thislen = img_lists[curr_folder].length;
  var ind = (ind_prev + 1) % thislen, ind_next = (ind_prev + 2) % thislen;
  current_imgs[curr_folder] = ind;
  $("#gallery-" + curr_folder + " .gal-show").attr("src", img_lists[curr_folder][ind]);
  $("#gallery-" + curr_folder + " .gal-prev").attr("src", img_lists[curr_folder][ind_prev]);
  $("#gallery-" + curr_folder + " .gal-next").attr("src", img_lists[curr_folder][ind_next]);
});

