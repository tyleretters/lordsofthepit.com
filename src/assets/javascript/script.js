/*
 * Post navigation.
 */

document.onkeydown = checkKey

function checkKey(e) {
  e = e || window.event

  if (e.keyCode == '39' && $('.previous-post a').length) {
    window.location.href = $('.previous-post a').attr('href')
  }

  if (e.keyCode == '37' && $('.next-post a').length) {
    window.location.href = $('.next-post a').attr('href')
  }
}

/*
 * Image Alt
 */

$(function () {
  $('.container img').each(function () {
    // these asterisks are leftover from the markdown migration.
    // if you're ever bored, go in and replace all these on the posts
    alt = $(this).attr('alt').replace(/\*/g, '')
    $(this).after('<em class="text-center d-block">' + alt + '</em>')
  })
})
