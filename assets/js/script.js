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
