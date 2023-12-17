interface ErrorsListOptions {
  required: string
  email: string
  max: string
  fileSize: string
  image: string
  link: string
  category: string
  noteType: string
  noteView: string
  tags: string
  array: string
  arrayLength: string
}

export const ErrorsList: ErrorsListOptions = {
  required: 'Поле обязательно к заполнению',
  email: 'Формат почты некорректный (Например example@gmail.com)',
  max: 'Слишком длинная фраза. Ограничение символов: {MAX}',
  fileSize: 'Файл не должен превышать {MAX}MB',
  image: 'Загруженный файл не является изображением',
  link: 'Формат ссылки некорректный (Например https://example.com)',
  category: 'Указанная категория не найдена',
  noteType: 'Указанный шаблон не найден',
  noteView: 'Указанный вид видимости не найден',
  tags: 'Все (или некоторые) выбранные вами теги не найдены в системе',
  array: 'Неверный формат переданных данных',
  arrayLength: 'Выбрано слишком мало значений. Выберите элементов не менее: {MIN}',
}
