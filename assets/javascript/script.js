/*
 * Post navigation.
 */

document.onkeydown = checkKey;

function checkKey(e) {

  e = e || window.event;

  if (e.keyCode == '39' && $('.previous-post a').length) {
    window.location.href = $('.previous-post a').attr('href');
  }

  if (e.keyCode == '37' && $('.next-post a').length) {
    window.location.href = $('.next-post a').attr('href');
  }

}