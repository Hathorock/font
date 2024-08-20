var char = document.querySelector('.char')
var input = document.querySelector('input')
function showChar(a,z) {
  for (var i=a; i<z; i++) {
    var d = document.createElement('DIV')
    d.innerText = String.fromCharCode(i)
    d.className = glyphs[i] ? 'rock' : ''
    d.title = '0x' + i.toString(16);
    char.appendChild(d);
    d.addEventListener('click', function(e) {
      input.value = input.value + e.target.innerText;
      update(input.value)
    })
  }
}

var glyphs = [];
fetch('./hathorock.json').then(function(resp) { resp.json().then(function(json) {
  for (var i in json.glyphs) {
    var g = json.glyphs[i]
    glyphs[g.code] = g
  }
  showChar(32,127)
  showChar(161,2000)
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
  if (!e.type || e.type !== 'keyup') {
    var url = new URL(document.location)
    url.search = 'q=' + value;
    history.replaceState(null, null, url)
  }
}
document.querySelector('input').addEventListener('keyup', update)
document.querySelector('input').addEventListener('change', update)

// Get initial query
document.location.search.replace(/^\?/,'').split('&').forEach(function(s) {
  var t = decodeURI(s).split('=')
  if (t[0]==='q') {
    input.value = t[1];
    update(t[1])
  }
})