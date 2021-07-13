(() => {
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false; 

    const scenInfo = [
        {   
            //0
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container:document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videosImages: [],

            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1}],

                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {   
            //1
            heightNum: 5,
            scrollHeight: 0,
            type: 'normal',
            objs: {
                container:document.querySelector('#scroll-section-1'),
                content: document.querySelector('#scroll-section-1 .description')
            },
        },
        {   
            //2
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin')
            },
            values: {
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],

                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],

                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],

                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],

                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {   
            //3
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
            },
            values: {

            }
        }
    ];
    function setCanvasImages() {
        let imgElem;
        for(let i = 0; i < scenInfo[0].values.videoImageCount; i++){
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            scenInfo[0].objs.videosImages.push(imgElem);
        }
        console.log(scenInfo[0].objs.videosImages);

    }
    setCanvasImages();


    function setLayout() {
        //섹션 높이 세팅
        for(let i = 0; i < scenInfo.length; i++){
            if( scenInfo[i].type === 'sticky'){
                scenInfo[i].scrollHeight = scenInfo[i].heightNum * innerHeight;
                scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;
            }else if(scenInfo[i].type === 'normal'){
                scenInfo[i].scrollHeight = scenInfo[i].objs.container.offsetHeight;
                scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;
            }
            
        };

        let totalScrollHeight = 0;
        yOffset = pageYOffset;
        for( let i = 0; i < scenInfo.length; i++){
            totalScrollHeight += scenInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            };
        };
        document.body.setAttribute('id',`show-scene-${currentScene}`);

        //Canvas 
        const heightRatio = innerHeight / 1080;
        scenInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    };

    function calcValues(values, currentYOffset){
        let rv;
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        if( values[2] ){
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            if( currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * ( values[1] - values[0]) + values[0];
            }else if( currentYOffset < partScrollStart) {
                rv = values[0];
            }else if( currentYOffset > partScrollEnd ){
                rv = values[1];
            }


           
            

        }else{
            rv = scrollRatio * ( values[1] - values[0]) + values[0];     
        }
        
    
        return rv;
    };

    function playAnimation() {  
        const values = scenInfo[currentScene].values;
        const objs = scenInfo[currentScene].objs;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videosImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);

                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                break;

            case 2:
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }

            break;

            case 3:
                break;
        }
    };


   
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;
        };
        if(yOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene ++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }else if( yOffset < prevScrollHeight ){
            enterNewScene = true;
            if(currentScene === 0)return;
            currentScene --;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        };  
        if( enterNewScene ) return;
        playAnimation();
    };


    window.addEventListener('scroll', () => {
        yOffset = pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load',() => {
        setLayout();
        scenInfo[0].objs.context.drawImage(scenInfo[0].objs.videosImages[0], 0, 0);
    });
    window.addEventListener('resize',setLayout);
    

})();