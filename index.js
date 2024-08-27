var char = document.querySelector('.char')
var input = document.querySelector('input')
function showChar(a,z, hide) {
  for (var i=a; i<z; i++) {
    var d = document.createElement('DIV')
    d.innerText = String.fromCharCode(i)
    d.className = (glyphs[i] ? 'rock' : '') + (hide ? ' hidden' : '')
    d.title = (glyphs[i] ? glyphs[i].name + ' - ' : '') + '0x' + i.toString(16) + ' - ' + i;
    char.appendChild(d);
    d.addEventListener('click', function(e) {
      var start = input.selectionStart;
      input.value = input.value.substring(0,start) + e.target.innerText + input.value.substring(start);
      update(input.value);
      var scrollTop = document.documentElement.scrollTop
      input.focus();
      input.selectionStart = input.selectionEnd = start +1;
      document.documentElement.scrollTop = scrollTop
    })
  }
}

var glyphs = [];
fetch('./hathorock.json').then(function(resp) { resp.json().then(function(json) {
  for (var i in json.glyphs) {
    var g = json.glyphs[i]
    glyphs[g.code] = g
  }
  showChar(32,256)
  //showChar(161,256)
  showChar(256, 10000, true)
})});

function update(e) {
  var value = e.target ? e.target.value : e;
  var res = document.querySelector('p.result');
  res.innerHTML = value ? '' : '&nbsp;';
  value.split('').forEach(function(k) {
    var d = document.createElement('SPAN')
    d.innerText = k;
    res.appendChild(d);
  })
  if (!e.type || e.type === 'change') {
    var url = new URL(document.location)
    url.search = 'q=' + value;
    history.replaceState(null, null, url)
  }
}
document.querySelector('input').addEventListener('input', update)
document.querySelector('input').addEventListener('change', update)

// Get initial query
document.location.search.replace(/^\?/,'').split('&').forEach(function(s) {
  var t = decodeURI(s).split('=')
  if (t[0]==='q') {
    input.value = t[1];
    update(t[1])
  }
})
if (!input.value) {
  input.value = '☎ HATHŌROCK';
  update(input.value)
}