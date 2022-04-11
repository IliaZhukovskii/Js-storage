'use strict';

//Объявление переменных
let todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
let todoList = document.querySelector('.todo-list');
let todoCompleted = document.querySelector('.todo-completed');

//Подгрузка из localStorage при загрузке страницы
let toDoData = JSON.parse(localStorage.getItem('name'));

//Вывод на страницу данных
let render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  //Проверка отсутствия объекта в localstorage
  if (toDoData.length == 0) {

  } else {
    toDoData.forEach(function (item) {
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    //Отметка дел
    li.querySelector('.todo-complete').addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.name = JSON.stringify(toDoData);
      render();
    });

    //Удаление
    li.querySelector('.todo-remove').addEventListener('click', function () {
      let i = toDoData.indexOf(item);
      toDoData.splice(i,1);
      localStorage.name = JSON.stringify(toDoData);
      render();
    });
  });
  }
};
render();

//Добавление новых дел
todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  let newToDo = {
    text: headerInput.value,
    completed: false
  };

  if (headerInput.value !== '') {
    toDoData.push(newToDo);
    headerInput.value = "";
  }

  localStorage.name = JSON.stringify(toDoData);
  render();
});