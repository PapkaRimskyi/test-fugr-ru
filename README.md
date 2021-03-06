# Тестовое задание для <b>https://future-group.ru/</b>

Для выполнения этого задания я использовал HTML/CSS(препроцессор SCSS)/React. Сборка происходит с помощью Webpack.

## Команды
<b>npm install</b> - для установки всех зависимостей проекта.

Команды всегда начинаются с <b>"npm run <команда>"</b>.

Список команд:
  1. editorconfig
  2. stylelint
  3. eslint
  4. check - запускает все проверки (выше в списке).
  5. build - собирает проект в папку <b>docs</b>.
  6. dev - запускает локальный сервер с проектом.

### Комментарии по заданию

После выбора загружаемого типа данных, происходит блокировка кнопок до момента окончательной загрузки данных с сервера/получения ошибки.
Во время загрузки данных появляется индикатор.


Типы выводимых ошибок:
  1. Тайм аут. Если по прошествии 1 минуты запрос не будет выполнен - появится оповещение о превышении лимита ожидания. Срабатывает AbortController по таймеру и прерывает запрос.
  2. Если есть статус ошибки, то дается информация по этой ошибке. Если же ее нет - пишется, что получена неизвестная ошибка.

Фичи:
  1. После клика по типу сортировки, происходит сортировка по возрастанию. Если же повторный клик был произведен по этому же типу, то происходит сортировка по убыванию. Для удобства, пользователю доступна табуляция по типам сортировки.
  2. Пагинация появляется по условию. Если объект с данными превышает 50 элементов, то появляется пагинация, если нет - ее нет. 
  3. После клика по строке с информации пользователя, происходит рендер блока с дополнительной информацией под таблицей. Для удобства, происходи автоматическая перемотка к этому блоку. Так же присутствует кнопка, чтобы произвести перемотку наверх страницы. Так же есть возможность табуляции по строкам.
  4. Над таблицей есть кнопка "Добавить". По клику появляется форма для заполнения. Каждому полю соответствует свой тип input type, так же и с паттернами input'ов. После клика по кнопке "Добавить в таблицу", форма исчезает и происходит добавление в таблицу. Если по этому ряду кликнули для получения подробной информации, то в блоке с подробной информацией
  будет показано, что "отсутствует дополнительная информация", так как отсутствует блок данных address.
  5. При загрузке другого типа данных, дополнительный блок с информацией исчезает.
