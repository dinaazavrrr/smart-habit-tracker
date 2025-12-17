/**
 * База даних мотиваційних цитат.
 * Використовується системою GamificationService для генерації
 * підтримуючих повідомлень користувачам, які втратили стрік.
 */

export interface IQuote {
    id: number;
    text: string;
    author: string;
    category: 'success' | 'discipline' | 'health' | 'learning';
    language: 'ua' | 'en';
}

export const MOTIVATIONAL_QUOTES: IQuote[] = [
    {
        id: 1,
        text: "Успіх — це сума невеликих зусиль, що повторюються день у день.",
        author: "Роберт Кольєр",
        category: "success",
        language: "ua"
    },
    {
        id: 2,
        text: "Дисципліна — це рішення робити те, чого дуже не хочеться робити, щоб досягти того, чого дуже хочеться досягти.",
        author: "Джон Максвелл",
        category: "discipline",
        language: "ua"
    },
    {
        id: 3,
        text: "Не чекайте, поки все стане ідеально. Починайте там, де ви є, з тим, що у вас є.",
        author: "Едмунд Берк",
        category: "success",
        language: "ua"
    },
    {
        id: 4,
        text: "Ми є тим, що ми робимо постійно. Досконалість, отже, — це не дія, а звичка.",
        author: "Арістотель",
        category: "discipline",
        language: "ua"
    },
    {
        id: 5,
        text: "Мотивація змушує вас почати. Звичка змушує вас продовжувати.",
        author: "Джим Рюн",
        category: "discipline",
        language: "ua"
    },
    {
        id: 6,
        text: "Ваше майбутнє створюється тим, що ви робите сьогодні, а не тим, що ви робитимете завтра.",
        author: "Роберт Кійосакі",
        category: "success",
        language: "ua"
    },
    {
        id: 7,
        text: "Якщо ви не можете робити великі речі, робіть малі речі у великий спосіб.",
        author: "Наполеон Хілл",
        category: "success",
        language: "ua"
    },
    {
        id: 8,
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success",
        language: "en"
    },
    {
        id: 9,
        text: "Discipline is the bridge between goals and accomplishment.",
        author: "Jim Rohn",
        category: "discipline",
        language: "en"
    },
    {
        id: 10,
        text: "Секрет успіху — це сталість цілі.",
        author: "Бенджамін Дізраелі",
        category: "success",
        language: "ua"
    },
    {
        id: 11,
        text: "Єдиний спосіб робити велику роботу — любити те, що ви робите.",
        author: "Стів Джобс",
        category: "learning",
        language: "ua"
    },
    {
        id: 12,
        text: "Немає нічого неможливого для того, хто намагається.",
        author: "Олександр Македонський",
        category: "success",
        language: "ua"
    },
    {
        id: 13,
        text: "Інвестиції в знання платять найкращі дивіденди.",
        author: "Бенджамін Франклін",
        category: "learning",
        language: "ua"
    },
    {
        id: 14,
        text: "Здоров'я — це не все, але все без здоров'я — ніщо.",
        author: "Сократ",
        category: "health",
        language: "ua"
    },
    {
        id: 15,
        text: "Тіло — це багаж, який ти несеш усе життя. Чим він важчий, тим коротша подорож.",
        author: "Арнольд Глазгоу",
        category: "health",
        language: "ua"
    },
    {
        id: 16,
        text: "Рух — це життя.",
        author: "Арістотель",
        category: "health",
        language: "ua"
    },
    {
        id: 17,
        text: "Навчання ніколи не вичерпує розум.",
        author: "Леонардо да Вінчі",
        category: "learning",
        language: "ua"
    },
    {
        id: 18,
        text: "Чим більше я вчуся, тим більше розумію, як мало я знаю.",
        author: "Альберт Ейнштейн",
        category: "learning",
        language: "ua"
    },
    {
        id: 19,
        text: "Освіта — це найпотужніша зброя, яку ви можете використовувати, щоб змінити світ.",
        author: "Нельсон Мандела",
        category: "learning",
        language: "ua"
    },
    {
        id: 20,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
    {
        id: 21,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 22,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 23,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 24,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 25,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 26,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 27,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 28,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 29,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 30,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 31,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 32,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 33,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 34,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 35,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 36,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
    {
        id: 37,
        text: "Секрет успіху — це сталість цілі.",
        author: "Бенджамін Дізраелі",
        category: "success",
        language: "ua"
    },
    {
        id: 38,
        text: "Єдиний спосіб робити велику роботу — любити те, що ви робите.",
        author: "Стів Джобс",
        category: "learning",
        language: "ua"
    },
    {
        id: 39,
        text: "Немає нічого неможливого для того, хто намагається.",
        author: "Олександр Македонський",
        category: "success",
        language: "ua"
    },
    {
        id: 40,
        text: "Інвестиції в знання платять найкращі дивіденди.",
        author: "Бенджамін Франклін",
        category: "learning",
        language: "ua"
    },
    {
        id: 41,
        text: "Здоров'я — це не все, але все без здоров'я — ніщо.",
        author: "Сократ",
        category: "health",
        language: "ua"
    },
    {
        id: 42,
        text: "Тіло — це багаж, який ти несеш усе життя. Чим він важчий, тим коротша подорож.",
        author: "Арнольд Глазгоу",
        category: "health",
        language: "ua"
    },
    {
        id: 43,
        text: "Рух — це життя.",
        author: "Арістотель",
        category: "health",
        language: "ua"
    },
    {
        id: 44,
        text: "Навчання ніколи не вичерпує розум.",
        author: "Леонардо да Вінчі",
        category: "learning",
        language: "ua"
    },
    {
        id: 45,
        text: "Чим більше я вчуся, тим більше розумію, як мало я знаю.",
        author: "Альберт Ейнштейн",
        category: "learning",
        language: "ua"
    },
    {
        id: 46,
        text: "Освіта — це найпотужніша зброя, яку ви можете використовувати, щоб змінити світ.",
        author: "Нельсон Мандела",
        category: "learning",
        language: "ua"
    },
    {
        id: 47,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
    {
        id: 48,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 49,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 50,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 51,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 52,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 53,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 54,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 55,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 56,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 57,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 58,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 59,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 60,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 61,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 62,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    },
     {
        id: 63,
        text: "Ваш час обмежений, не витрачайте його, живучи чужим життям.",
        author: "Стів Джобс",
        category: "success",
        language: "ua"
    }
];
