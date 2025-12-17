/**
 * dtos.ts (Data Transfer Objects)
 * Цей файл містить інтерфейси для даних, які надходять від клієнта (з браузера).
 * Використання DTO дозволяє чітко контролювати структуру вхідних даних.
 */

import { HabitFrequency } from '../domain/types';

/**
 * DTO для створення нової звички.
 * Описує поля форми на сторінці index.ejs.
 */
export interface CreateHabitDto {
    /** Назва звички (обов'язкове поле) */
    name: string;
    
    /** Категорія: Здоров'я, Навчання, Робота тощо */
    category: string;
    
    /** Складність: від '1' до '5' (приходить як рядок з форми) */
    difficulty: '1' | '2' | '3' | '4' | '5';
    
    /** (Опціонально) Частота виконання, за замовчуванням DAILY */
    frequency?: HabitFrequency;
}

/**
 * DTO для редагування існуючої звички.
 * Дозволяє змінювати тільки назву та складність.
 */
export interface UpdateHabitDto {
    /** Нова назва звички */
    name: string;
    
    /** Нова складність */
    difficulty: '1' | '2' | '3' | '4' | '5';
}

/**
 * DTO для відмітки виконання (Check-in).
 * Описує дію користувача: виконав або пропустив.
 */
export interface CheckInDto {
    /** Статус виконання */
    status: 'done' | 'missed';
    
    /** Дата виконання (якщо не передана - використовується поточна) */
    date?: string;
    
    /** Коментар користувача (для майбутнього функціоналу щоденника) */
    note?: string;
}

/**
 * DTO для налаштувань користувача.
 * Використовується для зміни параметрів профілю (на майбутнє).
 */
export interface UserSettingsDto {
    username: string;
    email: string;
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
}

/**
 * DTO для фільтрації списку звичок.
 * Використовується при пошуку або сортуванні.
 */
export interface HabitFilterDto {
    /** Фільтр за категорією */
    category?: string;
    
    /** Показувати тільки активні стріки */
    onlyActiveStreaks?: boolean;
    
    /** Сортування: за іменем, за датою, за стріком */
    sortBy?: 'name' | 'date' | 'streak';
}

/**
 * DTO для відповіді API про помилку.
 * Стандартизована структура JSON відповіді у разі помилки.
 */
export interface ErrorResponseDto {
    success: boolean;
    error: {
        code: number;
        message: string;
        details?: string[];
    };
    timestamp: string;
}