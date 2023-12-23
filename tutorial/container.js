
const createContainer = (panelNo, startX, startY) =>{
    const container = document.createElement('div');
    container.classList.add("container");
    container.classList.add(panelNo)

    const parallaxImage = document.createElement('img');
    parallaxImage.src = `images/img${panelNo}.png`
    parallaxImage.classList.add('parallax');
    
    const noParallaxImage = document.createElement('img');
    noParallaxImage.src = `images/img${panelNo}_back.png`
    noParallaxImage.classList.add('no-parallax');

    container.appendChild(noParallaxImage);
    container.appendChild(parallaxImage);
    

    // OLD ANIMATIONS

    //entry animation
    
    const parallaxImageIn  = [
      { transform: `translateX(${startX}px) translateY(${startY}px)`, opacity: 0 },
      { transform: "translateY(0px) translateX(0px)", opacity: 1 },
    ];

    const parallaxImageOut  = [
        { transform: "translateY(0px) translateX(0px)", opacity: 1 },
        { transform: `translateX(${startX}px) translateY(${startY}px)`, opacity: 0.3},
      ];

    const parallaxImageTiming = {
      duration: 600,
      iterations: 1,
      easing: "ease-in-out"
    };


    const noParallaxImageIn = [
        { opacity: 0.7 },
        { opacity: 1 },
      ];

    const noParallaxImageOut = [
        { opacity: 1 },
        { opacity: 0.7 },
      ];
    
      const noParallaxImageTiming = {
        duration: 400,
        iterations: 1,
        easing: "ease-in-out",
      };

    const triggerStartAnimation = () => {
        noParallaxImage.animate(noParallaxImageIn, noParallaxImageTiming);
        parallaxImage.animate(parallaxImageIn, parallaxImageTiming);
    }

    const triggerEndAnimation = () => {
        parallaxImage.animate(parallaxImageOut, parallaxImageTiming);
        //noParallaxImage.animate(noParallaxImageOut, noParallaxImageTiming);
    }
    
    container.triggerStartAnimation = triggerStartAnimation;
    container.triggerEndAnimation = triggerEndAnimation;

    triggerStartAnimation();

    return container;
}

export {createContainer}