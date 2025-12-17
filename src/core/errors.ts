/**
 * errors.ts
 * Модуль для обробки кастомних помилок у системі.
 * Використовується для стандартизації відповідей API у випадку збоїв.
 */

/**
 * Базовий клас помилки додатку.
 * Усі специфічні помилки (Not Found, Validation тощо) повинні наслідувати цей клас.
 * Це дозволяє централізовано обробляти помилки в middleware.
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    /**
     * Конструктор базової помилки.
     * @param message - Повідомлення для розробника/користувача
     * @param statusCode - HTTP код відповіді (наприклад, 404, 500)
     * @param isOperational - Чи є помилка очікуваною (true) чи критичним багом (false)
     */
    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        
        // Зберігаємо стек викликів для налагодження
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Помилка 404 Not Found.
 * Викидається, коли запитуваний ресурс (звичка, користувач) не знайдено в базі.
 */
export class NotFoundError extends AppError {
    constructor(message: string = 'Запитуваний ресурс не знайдено') {
        super(message, 404);
    }
}

/**
 * Помилка 400 Bad Request.
 * Викидається, коли клієнт відправив некоректні дані (наприклад, пусту назву звички).
 */
export class ValidationError extends AppError {
    public readonly invalidFields: string[];

    constructor(message: string = 'Некоректні вхідні дані', invalidFields: string[] = []) {
        super(message, 400);
        this.invalidFields = invalidFields;
    }
}

/**
 * Помилка 401 Unauthorized.
 * Викидається, коли користувач не увійшов у систему (для майбутнього розширення).
 */
export class AuthenticationError extends AppError {
    constructor(message: string = 'Помилка автентифікації. Будь ласка, увійдіть.') {
        super(message, 401);
    }
}

/**
 * Помилка 403 Forbidden.
 * Викидається, коли у користувача немає прав на виконання дії.
 */
export class AccessDeniedError extends AppError {
    constructor(message: string = 'У вас немає прав для виконання цієї дії') {
        super(message, 403);
    }
}

/**
 * Помилка 500 Database Error.
 * Викидається при проблемах підключення до бази даних або помилках SQL.
 */
export class DatabaseError extends AppError {
    public readonly originalError: any;

    constructor(message: string = 'Помилка бази даних', originalError?: any) {
        super(message, 500, false); // Це критична помилка
        this.originalError = originalError;
    }
}

/**
 * Помилка 409 Conflict.
 * Викидається, коли намагаємось створити ресурс, який вже існує (дублікат).
 */
export class ConflictError extends AppError {
    constructor(message: string = 'Такий запис вже існує в системі') {
        super(message, 409);
    }
}

/**
 * Помилка бізнес-логіки.
 * Наприклад, не можна виконати звичку, яка видалена.
 */
export class BusinessRuleViolationError extends AppError {
    constructor(message: string) {
        super(message, 422); // Unprocessable Entity
    }
}