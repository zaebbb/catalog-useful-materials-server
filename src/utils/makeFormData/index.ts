/** @module makeFormData */

/**
 * @interface MakeFormDataProps
 * @description Принимает T аргумент который наследуется от объекта
 * @description Передается объект с типом T, а также дефолтная инициализация formData
 * */
interface MakeFormDataProps<T extends object> {
  /** Обхект с параметрами */
  data: T
  /** Изначальное формирование FormData, необязательный */
  formData?: FormData
}

/**
 * @description Функция преобразующя объект в экземпляр FormData для POST запросов
 * @description В случае если в переданном объекте содержится другой объект в качестве значение выполняется рекурсия
 * @param {MakeFormDataProps<T>} options - Передаваемые опции в функцию
 * @return {FormData} возвращается экземпляр FormData
 * */
export const makeFormData = <T extends object>(options: MakeFormDataProps<T>): FormData => {
  const {
    data,
    formData = new FormData(),
  } = options

  Object.entries(data).forEach(([key, value]) => {
    if (
      typeof value === 'object' &&
      !(value instanceof File) &&
      !Array.isArray(value)
    ) {
      return makeFormData<T>({
        formData,
        data: value,
      })
    }

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

  return formData
}
