export const APP_TEXT = Object.freeze({
  HEADER: {
    EYEBROW: 'Каталог автозапчастей',
    TITLE: 'Найдите деталь и её аналоги',
    DESCRIPTION:
      'Введите артикул, выберите производителя и сравните предложения по цене и наличию.',
  },
  SEARCH: {
    TITLE: 'Укажите артикул',
    DESCRIPTION: 'Поиск начнётся автоматически после ввода.',
    LABEL: 'Номер детали',
    PLACEHOLDER: 'Например, 7160500039S',
    CLEAR: 'Очистить',
    CLEAR_ARIA: 'Очистить поле',
    LOADING_ARIA: 'Ищем производителей',
    ERROR_TITLE: 'Не удалось выполнить поиск.',
    MIN_LENGTH_HINT: (length) => `Введите минимум ${length} символа.`,
    EMPTY_RESULT: (number) =>
      `По артикулу «${number}» ничего не найдено. Проверьте номер детали.`,
  },
  BRANDS: {
    TITLE: 'Выберите производителя',
  },
  OFFERS: {
    TITLE: 'Аналоги и предложения',
    INITIAL_HINT: 'Сначала выберите производителя на первом этапе.',
    LOADING_ARIA: 'Загружаем предложения',
    ERROR_TITLE: 'Предложения не загружены.',
    RETRY: 'Повторить',
    ARTICLE: (number) => `Артикул ${number}`,
    EMPTY_RESULT: (brand) =>
      `Для ${brand} доступных предложений и аналогов нет.`,
  },
  TABLE: {
    NAME_AND_BRAND: 'Название / производитель',
    ARTICLE: 'Артикул',
    WAREHOUSE: 'Склад',
    STOCK: 'Остаток',
    PRICE: 'Цена',
    UNNAMED: 'Без названия',
    NON_REFUNDABLE: 'Невозвратная позиция',
    QUANTITY: (stock) => `${stock} шт.`,
  },
  API_ERRORS: {
    MANUFACTURERS: 'Не удалось найти производителей',
    OFFERS: 'Не удалось загрузить предложения',
    INVALID_RESPONSE: 'Сервис вернул некорректный ответ',
    UNAVAILABLE: 'Сервис временно недоступен',
    NETWORK: 'Не удалось подключиться к сервису. Проверьте соединение',
    TIMEOUT: 'Сервис не ответил вовремя. Попробуйте ещё раз',
  },
  DEFAULTS: {
    WAREHOUSE: 'Склад',
  },
})
