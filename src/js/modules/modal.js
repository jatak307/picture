const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      modalWindows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll();

    trigger.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        modalWindows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener("click", () => {
      modalWindows.forEach((window) => {
        window.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeOverlay) {
        modalWindows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
      }
    });
  }

  function showModalByTime(selector, time) {
    let display;

    document.querySelectorAll('[data-modal]').forEach(item => {
      if (getComputedStyle(item).display !== 'none'){
        display = 'block';
      }
    })

    if (!display) {
      setTimeout(() => {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
      }, time);
    }
  }

  function calcScroll () {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  showModalByTime('.popup-consultation', 60000);
};

export default modals;
