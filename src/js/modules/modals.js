import calcScroll from './calcScroll';

const modals = (state) => {

    function stateUndefined(nameState, selector){
        if(nameState == undefined){
            document.querySelectorAll(selector).forEach(item => {
                item.classList.add('form_status_border');
            });
        } else {
            document.querySelectorAll(selector).forEach(item => {
                item.classList.remove('form_status_border');
            });
        }
    }

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]');
        const tabs = document.querySelectorAll('.balcon_icons_img');
        const bigImage = document.querySelectorAll('.big_img > img');
        const scroll = calcScroll();

       

         trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(((state.form && state.height && state.width && triggerSelector == '.popup_calc_button') 
                    || triggerSelector == '.popup_calc_btn')
                    || triggerSelector == '.popup_engineer_btn'
                    || triggerSelector == '.phone_link'

                    || (state.type && state.profile)){
                    if(e.target){
                        e.preventDefault();
                    }
                    windows.forEach(item => {
                        item.style.display ='none';
                    });
    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;
                } else {
                    stateUndefined(state.width, '#width');
                    stateUndefined(state.height, '#height');
                    stateUndefined(state.form, '.balcon_icons');
                    stateUndefined(state.type, '#view_type');
                    stateUndefined(state.profile, '.label');

                    let statusMessage = document.createElement('div');
                    statusMessage.classList.add('form_status');
                    item.parentNode.appendChild(statusMessage);
                    statusMessage.textContent = 'Пожайлуста, введите все данные';
                }
            });
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display ='none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
                console.log(state.length);
            };
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display ='none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
            clearState(state);
            document.querySelector('#width').value = '';
            document.querySelector('#height').value = '';
            tabs.forEach((item) => {
                item.classList.remove('do_image_more');
            });
            bigImage.forEach((item) => {
                item.style.display = 'none';
            });
            tabs[0].classList.toggle('do_image_more');
            bigImage[0].style.display = 'inline-block';
        }); 
    }

    function showModalByTime(selectorForm, time){
        setTimeout(function() {
            document.querySelector(selectorForm).style.display = 'block';
            document.body.style.overflow = 'hidden';

            let scrollWidth = calcScroll();

            document.body.style.marginRight = `${scrollWidth}px`;
        }, time);
    }

    
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    showModalByTime('.popup', 60000);
}

export default modals;