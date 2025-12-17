/**
 * Модуль інтернаціоналізації (Internationalization).
 * Містить словники для підтримки багатомовності (UA, EN).
 */

export const TRANSLATIONS = {
    ua: {
        app: {
            title: "Мій Трекер Звичок",
            subtitle: "Твій шлях до самовдосконалення",
            footer: "Copyright 2025"
        },
        buttons: {
            create: "Створити звичку",
            delete: "Видалити",
            edit: "Редагувати",
            save: "Зберегти зміни",
            cancel: "Скасувати",
            nightly: "Симулювати ніч"
        },
        labels: {
            name: "Назва звички",
            category: "Категорія",
            difficulty: "Складність",
            streak: "Поточний стрік"
        },
        categories: {
            health: "Здоров'я",
            learning: "Навчання",
            work: "Робота",
            hobby: "Хобі",
            social: "Соціальне",
            finance: "Фінанси"
        },
        messages: {
            success: "Успішно збережено!",
            error: "Сталася помилка",
            confirmDelete: "Ви впевнені?",
            welcome: "Ласкаво просимо!"
        },
        errors: {
            notFound: "Ресурс не знайдено",
            serverError: "Помилка сервера",
            validation: "Некоректні дані"
        }
    },
    en: {
        app: {
            title: "My Habit Tracker",
            subtitle: "Your path to self-improvement",
            footer: "Copyright 2025"
        },
        buttons: {
            create: "Create Habit",
            delete: "Delete",
            edit: "Edit",
            save: "Save Changes",
            cancel: "Cancel",
            nightly: "Simulate Night"
        },
        labels: {
            name: "Habit Name",
            category: "Category",
            difficulty: "Difficulty",
            streak: "Current Streak"
        },
        categories: {
            health: "Health",
            learning: "Learning",
            work: "Work",
            hobby: "Hobby",
            social: "Social",
            finance: "Finance"
        },
        messages: {
            success: "Saved successfully!",
            error: "An error occurred",
            confirmDelete: "Are you sure?",
            welcome: "Welcome!"
        },
        errors: {
            notFound: "Resource not found",
            serverError: "Server Error",
            validation: "Invalid data"
        }
    }
};

/**
 * Допоміжна функція для отримання перекладу.
 */
export function t(key: string, lang: 'ua' | 'en' = 'ua'): string {
    const keys = key.split('.');
    let current: any = TRANSLATIONS[lang];
    
    for (const k of keys) {
        if (current[k] === undefined) return key;
        current = current[k];
    }
    
    return current;
}