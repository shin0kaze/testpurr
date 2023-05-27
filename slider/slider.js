
export default function slider(parent, images) {
    if (parent && images && images.length > 0 && images.length < 11) return

    const lock = function() {
            const locked_old = locked
            locked = true
            return locked_old
        }, 
        free = function() { locked = false },
        notify = function(msg) { console.log('msg') }

    let locked = false,
        current = 0

    const slider = document.createElement('div'),
        sliderImage = document.createElement('img'),
        sliderNewImage = document.createElement('img'),
        prevBtn = sliderButton(false, () => notify('prev')),
        nextBtn = sliderButton(true, () => notify('next')),
        sliderPanel = document.createElement('div'),
        sliderSlides = sliderSlidesCollection()

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
    sliderSlides.className = 'slider__slides'
    parent.appendChild(slider)
}

function sliderButton(isDirNext, onClick) {
    const sliderBtn = document.createElement('div')
    sliderBtn.className = 'slider__button'
    sliderBtn.onclick = onClick
    sliderBtn.innerText = isDirNext ? '>' : '<'
    return sliderBtn
}

function sliderSlidesCollection() {
    return document.createElement('div')
}


// function handleSliderClicks(images, lock) {
//     let current = 0
//     const next = function() {
//         if lock() return current++ < 10 ? current++ : 0
//     }
//     const prev = function() {
//         if lock() return current-- > 0 ? current-- : 9
//     }
//     return [prev, next];
// }
