"use strict"

/* 
*   Алгоритм
*
*   1. Начало.
*   2. Получаем блок для слайдера (создание переменной, которая не будет меняться).
*   3. Получаем элементы кнопок переключения (создание переменных, которые не будет меняться).
*   4. Получаем массив слайдов (создание списка, который не будет меняться, из полученных всех элементов с определенным классом).
*   5. Устанавливаем обработчики событий для кнопок (навешиваем слушатель событий на click).
*   6. В зависимости от нажатой кнопки переключаем слайд на следующий или предыдущий.
*   7. Переопредляем стили для незадействованных слайдов.
*       7.1. Проверка условия (сравниваем индекс элемента слайдера с элементов отображаемым на данный момент)
*           7.1.1. Да: устанавливаем параметр dislplay: "flex".
*           7.1.2. Нет: устанавливаем параметр display: "none".
*   8. Инициализируем слайдер.
*   9. Конец
* 
*   Блок-схема: /images/block-schema.png
*/

// Получаем элементы слайдера для учителей
const sliderTeacher = document.querySelector(".sliderTeacher");
const prevButtonTeacher = document.querySelector(".prev_button_teacher");
const nextButtonTeacher = document.querySelector(".next_button_teacher");
const slidesTeacher = Array.from(sliderTeacher.querySelectorAll("div.teacher__description"));
const slideTeacherCount = slidesTeacher.length;
let slideTeacherIndex = 0;

// Получаем элементы слайдера для курсов
const sliderCourse = document.querySelector(".sliderСourse");
const prevButtonCourse = document.querySelector(".prev_button_course");
const nextButtonCourse = document.querySelector(".next_button_course");
const slidesCourse = Array.from(sliderCourse.querySelectorAll("div.course__description"));
const slideCourseCount = slidesCourse.length;
let slideCourseIndex = 0;

// Устанавливаем обработчики событий для кнопок учителей
prevButtonTeacher.addEventListener("click", showPreviousTeacherSlide);
nextButtonTeacher.addEventListener("click", showNextTeacherSlide);

// Устанавливаем обработчики событий для кнопок курсов
prevButtonCourse.addEventListener("click", showPreviousCourseSlide);
nextButtonCourse.addEventListener("click", showNextCourseSlide);

// Функция для показа предыдущего слайда учителей
function showPreviousTeacherSlide() {
    slideTeacherIndex = (slideTeacherIndex - 1 + slideTeacherCount) % slideTeacherCount;
    updateTeacherSlider();
}

// Функция для показа предыдущего слайда курсов
function showPreviousCourseSlide() {
    slideCourseIndex = (slideCourseIndex - 1 + slideCourseCount) % slideCourseCount;
    updateCourseSlider();
}

// Функция для показа следующего слайда учителей
function showNextTeacherSlide() {
    slideTeacherIndex = (slideTeacherIndex + 1) % slideTeacherCount;
    updateTeacherSlider();
}

// Функция для показа следующего слайда курсов
function showNextCourseSlide() {
    slideCourseIndex = (slideCourseIndex + 1) % slideCourseCount;
    updateCourseSlider();
}

// Функция для обновления отображения слайдера в блоке преподавателей
function updateTeacherSlider() {
  slidesTeacher.forEach((slide, index) => {
    if (index === slideTeacherIndex) {
      slide.style.display = "flex";
    } else {
      slide.style.display = "none";
    }
  });
}

// Функция для обновления отображения слайдера курсов
function updateCourseSlider() {
  slidesCourse.forEach((slide, index) => {
    if (index === slideCourseIndex) {
      slide.style.display = "flex";
    } else {
      slide.style.display = "none";
    }
  });
}

// Инициализация слайдеров
updateTeacherSlider();
updateCourseSlider();


document.addEventListener("DOMContentLoaded", () => {
    console.log("Скрипт отработал корректно");

    const menuList = document.querySelector(".menu");

    // Данные для подставновки
    const menuData = './data.json';

    fetch(menuData)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Данные
        console.log(typeof (data)); // Тип полученных данных

        data.forEach(card => {
          const menuElement = createCard(card.classParent, card.classChild, card.href, card.title);
          menuList.appendChild(menuElement);
        });
      })
    
    // Создание карточки
    const createCard = (classParent, classChild, href, title) => {
      const card = document.createElement("li");
      card.className = classParent;

      const childContainer = document.createElement("a");
      childContainer.className = classChild;
      childContainer.href = href;
      childContainer.textContent = title;

      card.appendChild(childContainer);

      return card;
    }

    // Preloader страницы
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
      setTimeout(() => {
        // Скрываем прелоадер
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Показываем контент
        content.style.display = 'block';

        // Удаляем элемент из DOM
        preloader.remove();
      }, 3000); // Задержка 3 секунды
    }
});