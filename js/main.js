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

            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.23, end: 0.3 }],
                messageA_translateY_out: [0, -20, { start: 0.23, end: 0.3}],

                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],

                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],


                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],

                

            
            }
        },
        {   
            //1
            heightNum: 5,
            scrollHeight: 0,
            type: 'nomal',
            objs: {
                container:document.querySelector('#scroll-section-1'),
            },
        },
        {   
            //2
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container:document.querySelector('#scroll-section-2'),
            },
        },
        {   
            //3
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container:document.querySelector('#scroll-section-3'),
            },
        }
    ];

    function setLayout() {
        //섹션 높이 세팅
        for(let i = 0; i < scenInfo.length; i++){
            scenInfo[i].scrollHeight = scenInfo[i].heightNum * innerHeight;
            scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;
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
                let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset );
                let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset );
                let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);

                if ( scrollRatio <= 0.22 ){
                    objs.messageA.style.opacity = messageA_opacity_in;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
                    
                }else{
                    objs.messageA.style.opacity = messageA_opacity_out;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
                }
               
                
                break;
            case 1:
                break;
            case 2:
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
    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);
    

})();