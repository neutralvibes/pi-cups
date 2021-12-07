
const app = (function () {
  const _L = console.log
  const list = document.querySelector('.list')
  const srch = document.querySelector('input')
  const totals = document.querySelector('.tots')
  list.onclick = selected
  let d = []

  srch.oninput = (e) => {
    let v = e.target.value
    list.innerHTML = ''

    if (v.trim() == '') {
      display(d)
      return
    }
    let arr = d.filter((r => r.name.startsWith(v.toLowerCase())))
    if (arr.length) {
      display(arr)
    }
    else {
      list.innerHTML = '<span>None found</span>'
    }
  }

  let init = (data) => {
    d = data.filter((r => {
      return r.name.split('.').pop() == 'ppd'
    }))
    display(d)
    srch.focus()
  }

  function display (arr) {
    arr.forEach(o => {
      let el = document.createElement('i')
      el.data = o.name
      el.append(o.name.split('.')[0])
      list.append(el)
    })
    list.scrollTop = 0
    // totals.innerHTML = `Showing:&nbsp;(${arr.length} of ${d.length})`
  }

  function selected (e) {
    let el = e.target
    if (!('data' in el)) return
    if (!confirm('Download ' + el.data.split('/').pop() + '?')) return
    let a = document.createElement('a')
    a.href = '/drivers/' + el.data
    a.download = el.data.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  let s = document.createElement('script')
  s.src = '/drivers/?callback=app.init'
  document.body.appendChild(s)

  return { init }
})()
