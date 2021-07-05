(() => {
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;

    const scenInfo = [
        {   
            //0
            heightNum: 5,
            scrollHeight: 0,
            type: 'sticky',
            objs: {
                container:document.querySelector('#scroll-section-0'),
            },
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
        }

        let totalScrollHeight = 0;
        yOffset = pageYOffset;
        for( let i = 0; i < scenInfo.length; i++){
            totalScrollHeight += scenInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }


   
    function scrollLoop() {
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight) {
            currentScene ++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }else if( yOffset < prevScrollHeight ){
            if(currentScene === 0)return;
            currentScene --;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }

        
    }


    window.addEventListener('scroll', () => {
        yOffset = pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);
    

})();