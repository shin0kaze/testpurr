export default function slider(parent, length) {
	const slider = document.createElement('div'),
		sliderImage = document.createElement('img'),
		sliderNewImage = document.createElement('img'),
		prevBtn = sliderButton(false),
		nextBtn = sliderButton(true),
		sliderPanel = document.createElement('div'),
		sliderSlides = sliderSlidesCollection(length)

	slider.className = 'slider'
	slider.appendChild(sliderImage)
	sliderImage.className = 'slider__image'
	sliderImage.style.backgroundImage = 'url(/img/1.png)'
	slider.appendChild(sliderNewImage)
	sliderNewImage.className = 'slider__new-image slider__new-image_hidden'
	slider.appendChild(sliderPanel)
	sliderPanel.className = 'slider__panel'
	sliderPanel.appendChild(prevBtn)
	sliderPanel.appendChild(sliderSlides)
	sliderPanel.appendChild(nextBtn)
	parent.appendChild(slider)
	sliderInit(
		length,
		sliderImage,
		sliderNewImage,
		nextBtn,
		prevBtn,
		sliderSlides
	)
}

function sliderInit(length, image, newImage, nextBtn, prevBtn, slidesColl) {
	let locked = false,
		current = 0
	const slides = slidesColl.childNodes,
		selectSlide = function (index) {
			slides[current].classList.toggle(
				'slider__slides-item_selected',
				false
			)
			slides[index].classList.toggle('slider__slides-item_selected', true)
			current = index
			image.style.backgroundImage = `url(/img/${current + 1}.png)`
		},
		animate = function (index, fromLeft = false) {
			if (locked === false) {
				locked = true

				const duration = 500,
					framesPerSec = 60,
					frameDuraion = Math.round(1000 / 60),
					imageWidth = fromLeft ? -600 : 600,
					offsetPerTick =
						imageWidth / ((framesPerSec * duration) / 1000.0)

				let leftOffset = imageWidth

				newImage.style.left = `${leftOffset}px`
				newImage.classList.remove('slider__new-image_hidden')
				newImage.style.backgroundImage = `url(/img/${index + 1}.png)`

				const animation = setInterval(() => {
					leftOffset -= offsetPerTick
					if (!((leftOffset < 0) ^ !fromLeft)) {
						leftOffset = 0
						clearInterval(animation)
						selectSlide(index)
						newImage.classList.add('slider__new-image_hidden')
						locked = false
					}
					newImage.style.left = `${leftOffset}px`
				}, frameDuraion)
			}
		}

	nextBtn.addEventListener('click', function () {
		animate(current + 1 >= length ? 0 : current + 1)
	})
	prevBtn.addEventListener('click', function () {
		animate(current - 1 < 0 ? length - 1 : current - 1, true)
	})
	for (let i = 0; i < slides.length; i++) {
		slides[i].addEventListener('click', () => {
			if (locked === false) selectSlide(i)
		})
	}
	slides[0].classList.add('slider__slides-item_selected')
}

function sliderButton(isDirNext) {
	const sliderBtn = document.createElement('div')
	sliderBtn.className = 'slider__button'
	sliderBtn.innerText = isDirNext ? '>' : '<'
	return sliderBtn
}

function sliderSlidesCollection(length) {
	const slides = document.createElement('ul')
	slides.className = 'slider__slides'
	for (let i = 0; i < length; i++) {
		const slide = document.createElement('li'),
			slideCircle = document.createElement('div')
		slide.className = 'slider__slides-item'
		slideCircle.className = 'slider__slides-item-circle'
		slides.appendChild(slide)
		slide.appendChild(slideCircle)
	}
	return slides
}
