interface ErrorsListOptions {
  required: string
  email: string
  emailExist: string
  max: string
  min: string
  fileSize: string
  image: string
  link: string
  category: string
  noteType: string
  noteView: string
  tags: string
  array: string
  arrayLength: string
  document: string
  dataMatch: string
  tagExist: string
  categoryExist: string
  customField: string
}

export const ErrorsList: ErrorsListOptions = {
  required: 'Поле обязательно к заполнению',
  email: 'Формат почты некорректный (Например example@gmail.com)',
  emailExist: 'Данная электронная почта уже существует в системе',
  max: 'Слишком длинная фраза. Ограничение символов: {MAX}',
  min: 'Слишком короткая фраза. Должно быть более {MIN} символов',
  fileSize: 'Файл не должен превышать {MAX}MB',
  image: 'Загруженный файл не является изображением',
  link: 'Формат ссылки некорректный (Например https://example.com)',
  category: 'Указанная категория не найдена',
  noteType: 'Указанный шаблон не найден',
  noteView: 'Указанный вид видимости не найден',
  tags: 'Все (или некоторые) выбранные вами теги не найдены в системе',
  array: 'Неверный формат переданных данных',
  arrayLength: 'Выбрано слишком мало значений. Выберите элементов не менее: {MIN}',
  document: 'Загружанный файл не является документом',
  dataMatch: 'Введеные значения не совпадают',
  tagExist: 'Тег уже существует в системе',
  categoryExist: 'Категория уже существует в системе',
  customField: 'Выбранный тип поля не найден в системе',
}
