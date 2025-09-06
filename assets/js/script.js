// Animaciones Letras
const text = new SplitType(`.hero-title`, { types: 'words, chars', });

text.chars.forEach(char => {
    let charsTl = gsap.timeline();
    gsap.from(char, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-150, 250),
        duration: 2,
        scale: gsap.utils.random(0.5, 2),
        rotate: gsap.utils.random(-180, 180),
        ease: "back.out",
    })
    charsTl.from(char, {
        color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
        duration: 1.8,
    })

    char.addEventListener("mouseenter", charsHover);

    function charsHover() {
        gsap.timeline()
            .to(char, {
                y: gsap.utils.random(-70, 70),
                x: gsap.utils.random(-70, 70),
                rotate: gsap.utils.random(-70, 70),
                scale: gsap.utils.random(0.4, 1),
                duration: 0.8,
                color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
                onStart: () => {
                    char.removeEventListener("mouseenter", charsHover);
                }
            })
            .to(char, {
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1,
                color: "white",
                delay: 0.1,
                duration: 0.8,
                onComplete: () => {
                    setTimeout(() => {
                        char.addEventListener("mouseenter", charsHover);
                    }, 1000);
                }
            })
    }
})

// Animaciones de scroll
gsap.registerPlugin(ScrollTrigger);

gsap.from(`.titulo`, {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    scrollTrigger: ".titulo",
})

gsap.from(`.about-titulo`, {
    opacity: 0,
    y: 20,
    delay: .8,
    scrollTrigger: ".about-titulo",
})

gsap.from(`.about-subtitulo span`, {
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: ".about-subtitulo span",
})

gsap.from(`.about-item`, {
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: ".about-item",
    delay: 0.3,
})

gsap.from(`.logo`, {
    x: -100,
    opacity: 0,
    duration: .5,
})

gsap.from(`.container`, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    y: 50,
    scrollTrigger: ".container",
})

gsap.from(`.imgloco`, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    delay: 1,
    scrollTrigger: ".imgloco",
})

gsap.from(`.prueba`, {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: ".prueba",
})



