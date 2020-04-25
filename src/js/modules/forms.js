// import checkNumInputs from "./checkNumInputs";

const forms = (a) => {
  const allForms = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");
  const upload = document.querySelectorAll('[name="upload"]');

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Oops! Что-то пошло не так...",
    spinner: "../../assets/img/spinner.gif",
    ok: "../../assets/img/ok.png",
    fail: "../../assets/img/fail.png",
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
  };

  upload.forEach(item => {
    item.addEventListener('input', () => {
      let dots;
      const forFileName = item.files[0].name.split('.')[0];

      dots = forFileName.length > 6 ? '...' : '.';
      const name = forFileName.substring(0, 6) + dots + forFileName[1];

      item.previousElementSibling.textContent = name;
    });
  });

  allForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.parentNode.append(statusMessage);

      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.append(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(form);
      let api;
      api = form.closest('.popup-design') || form.classList.contains('calc_form') ? path.designer : path.question;

      postData(api, formData)
        .then((res) => {
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          textMessage.textContent = message.failure;
          statusImg.setAttribute('src', message.fail);
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 3000);
        });
    });
  });
};

export default forms;
