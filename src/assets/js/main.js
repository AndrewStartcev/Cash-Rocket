document.querySelectorAll('form').forEach(form => {
  if (form.classList.contains('is_ahunterSuggest')) {
    const options = {
      fields: [
        { id: 'js-last_name', tag: 'last_name' },
        { id: 'js-first_name', tag: 'first_name' },
        { id: 'js-patronym', tag: 'patronym' }
      ],
      ahunter_url: 'https://ahunter.ru/',
      limit: 5,
      suggest_on_focus: false
    };

    // Запуск дискретных подсказок
    AhunterSuggest.Person.Discrete(options);
  }

  // Обработчик отправки формы
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Выполняем валидацию формы перед отправкой
    const isValid = checkFormValidity(form);

    if (isValid) {
      form.submit(); // Отправляем форму, если все поля валидны
    } else {
      toggleFormState(form); // Обновляем состояние формы (добавляем класс .error и отключаем кнопку)
    }
  });

  // Обработчик события "blur" для каждого поля
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur', function () {
      validateField(field);
      toggleFormState(form);
    });

    // Обработчик события "change" для чекбоксов
    if (field.type === 'checkbox') {
      field.addEventListener('change', function () {
        validateField(field);
        toggleFormState(form);
      });
    } else {
      // Обработчик события "input" для всех остальных полей
      field.addEventListener('input', function () {
        if (field.type === 'email' || field.type === 'tel') {
          field.classList.remove('error', 'success');
        } else {
          validateField(field);
        }
        toggleFormState(form);
      });
    }
  });

  function validateField(field) {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        field.classList.add('error');
        field.classList.remove('success');
        return false;
      } else {
        field.classList.remove('error');
        field.classList.add('success');
        return true;
      }
    } else if (field.value.trim() === '') {
      field.classList.add('error');
      field.classList.remove('success');
      return false;
    } else {
      field.classList.remove('error');

      if (field.type === 'email') {
        if (validateEmail(field.value)) {
          field.classList.add('success');
        } else {
          field.classList.add('error');
          return false;
        }
      } else if (field.type === 'tel') {
        if (validatePhone(field.value)) {
          field.classList.add('success');
        } else {
          field.classList.add('error');
          return false;
        }
      } else {
        field.classList.add('success');
      }
      return true;
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    // Удаляем все нечисловые символы
    const digits = phone.replace(/\D/g, '');
    // Проверяем, что номер состоит из 11 цифр и начинается с 7
    return digits.length === 11 && digits.startsWith('7');
  }

  function checkFormValidity(form) {
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  }

  function toggleFormState(form) {
    const isValid = checkFormValidity(form);
    const submitButton = form.querySelector('[type="submit"]');

    if (isValid) {
      form.classList.remove('error');
      submitButton.removeAttribute('disabled');
    } else {
      form.classList.add('error');
      submitButton.setAttribute('disabled', 'disabled');
    }
  }
});
