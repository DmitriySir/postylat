document.querySelectorAll(".services-list__item").forEach((i) => {
  i.addEventListener("click", function () {
    i.querySelector(".ul").classList.toggle("ul__close");
    i.querySelector(".ita").classList.toggle("ita__close");
  });
});

document.querySelectorAll(".main__button").forEach((i)=>{
  i.addEventListener("click", function(){
    document.querySelector(".form").classList.add("form__active");
    document.querySelector("body").classList.add("body__active");
  })
})

document.querySelector(".form__closer").addEventListener('click', function(){
  document.querySelector(".form__active").classList.remove("form__active");
  document.querySelector("body").classList.remove("body__active");
})


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("__sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove("__sending");
      } else {
        alert(
          "Произошла ошибка! Сервер временно не доступен! Повторите отправку формы позднее!"
        );
      }
    } else {
      alert("Заполните поля обозначенные звёздочкой");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll(".__req");
    console;

    for (let index = 0; index < formReq.length; index++) {
      let input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains("__email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        } else if (input.value === "") {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains("__name")) {
        if (nameTest(input)) {
          formAddError(input);
          error++;
        } else if (input.value === "") {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains("__phone")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        } else if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("__error");
    input.classList.add("__error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("__error");
    input.classList.remove("__error");
  }

  function emailTest(input) {
    return !/^.{2,20}@\w{2,10}\.\w{2,10}/.test(input.value);
  }

  function nameTest(input) {
    return !/^[А-Яа-яa-zA-Z]{2,20}/.test(input.value);
  }

  function phoneTest(input) {
    return !/^\d{11}/.test(input.value);
  }
});
