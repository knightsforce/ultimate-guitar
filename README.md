ЗАПРОСЫ С https НА http ЗАПРЕЩЕНЫ СЕРТИФИКАЦИЕЙ, ДЛЯ КОРРЕКТНОЙ РАБОТЫ НУЖНО РАЗРЕШИТТЬ ЗАГРУЗКУ НЕБЕЗОПАСНЫХ СКРИПТОВ (В Chrome появляется, после первого провального запроса, изображение щита рядом с изображения звезды для добавления закладок).


До этого задания использовал React как шаблонизатор и рендерил в строку на сервере.

Redux использовал здесь впервые, так что периодически гуглил (в основном синтаксис). Так что это моя первая полноценная работа на React + Redux (не снисходительности ради, а для справки).

Sass увидел в первый раз, но Гугл решил вопросы.

Спонсор заявки на вакансию были "а вдруг", а также самонадеянность и отвага

Описание работы:

0. Я не дизайнер, по этому сделал, так, что главное глаза не слизятся.

1. Использовал запрос к Reales group.

2. Если сделать один запрос, добавить данные о альбоме в локальное хранилище, сделать другой запрос, потом снова первый, то сохраненные альбомы будут все-равн отмечены.

3. Map файлы удалять не стал, могут пригодиться.

4. Node_moduls не добавлял, т.к. нет смысла.

Файлы:

App.js - приложение React.

AlbumsContainer.js - контейнер с альбомами и связанные с ним компоненты,
выделять их в отдельные файлы в данном контексте бесмысленно.

SearchField.js - разделил с AlbumsContainer т.к. не зависимы и используется 2 раза.

actions.js - экшены.

reducers.js - редьюсеры.

flags.js - флаги для экшенов, чтоб ы строки везде не писать и редактировать легко.
