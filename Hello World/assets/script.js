(function(){
const steelbrain = {
	scrolling: false,
	lastScrollTop: 0,
	supportsPassiveEvents: false,
}
window.onload = () => {
	Array.prototype.forEach.call(document.getElementsByTagName("a"), link => {
		if (link.host === location.host && (link.hash.length || link.dataset.target) && link.target !== "_blank") {
			link.onclick = jumpToElement
		}
	})
	document.getElementById('navToggle').onclick = (e => {
		document.getElementById('nav').classList.toggle('open')
	})

	if ('IntersectionObserver' in window) {
		Array.prototype.forEach.call(document.getElementsByClassName('section'), el => {
			(new IntersectionObserver(entries => {
						let entry = entries.pop()
						if (entry.intersectionRatio < 0.3) {
							return
						}
						changeNavActive(entry.target.id)
					}, {
						rootMargin: "0px",
						threshold: [0.3],
					}
			)).observe(el)
		})
	}

	try {
		window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
			get: function() {
				steelbrain.supportsPassiveEvents = true
			}
		}))
	} catch (e) {}

	steelbrain.header = document.getElementById('header')

	if (steelbrain.supportsPassiveEvents) {
		window.addEventListener('scroll', handleScroll, { passive: true })
	} else {
	}
	window.addEventListener('scroll', handleScroll)
}

function handleScroll(e) {
	if (steelbrain.scrolling) {
		return
	}
	requestAnimationFrame(() => {
		steelbrain.scrolling = true
		let st = window.pageYOffset || document.documentElement.scrollTop

		if (st > steelbrain.lastScrollTop && (st - steelbrain.lastScrollTop) > 10 && !steelbrain.header.classList.contains('hidden')){
			steelbrain.header.classList.add('hidden')
		} else if((steelbrain.lastScrollTop - st) > 10 && steelbrain.header.classList.contains('hidden')) {
			steelbrain.header.classList.remove('hidden')
		}
		steelbrain.lastScrollTop = st
		steelbrain.scrolling = false
	})
}

function jumpToElement(e) {
	let id = e.srcElement.dataset.target,
			element
	if (e.srcElement.hash.length && e.srcElement.pathname === location.pathname) {
		id = e.srcElement.hash.substr(1)
	}
	element = document.getElementById(id)
	if (element === null) {
		return
	}
	e.preventDefault()
	scrollVertically(element.getBoundingClientRect().top)
	changeNavActive(id)
}

function scrollVertically(delta) {
	if ('scrollBehavior' in document.documentElement.style) {
		window.scrollBy({
			top: delta,
			behavior: "smooth",
		})
	} else {
		window.scrollBy(0, delta)
	}
}

function changeNavActive(id) {
	try {
		let active = steelbrain.header.getElementsByClassName('active')
		if (active.length) {
			active.item(0).classList.remove('active')
		}
		steelbrain.header.querySelector('[data-target='+ id +']').classList.add('active')
	} catch (e) {}
}
})()
