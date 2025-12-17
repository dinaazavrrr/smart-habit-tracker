import { Habit } from '../domain/habit.entity';
import { Badge, Recommendation } from '../domain/gamification';

/**
 * Інтерфейс репозиторію звичок.
 * Визначає контракт для роботи з персистентним сховищем даних.
 * Реалізує патерн Repository для абстрагування від конкретної бази даних.
 */
export interface IHabitRepository {
    /** Знайти звичку за її ID */
    findById(id: string): Promise<Habit | undefined>;
    
    /** Отримати список усіх звичок у системі */
    findAll(): Promise<Habit[]>;
    
    /** Зберегти нову звичку в базу */
    save(habit: Habit): Promise<void>;
    
    /** Оновити існуючу звичку */
    update(habit: Habit): Promise<void>;
    
    /** Видалити звичку за ID */
    delete(id: string): Promise<void>;

    // Методи для гейміфікації
    getBadges(): Promise<Badge[]>;
    addBadge(badge: Badge): Promise<void>;
    getRecommendations(): Promise<Recommendation[]>;
    addRecommendation(rec: Recommendation): Promise<void>;
    
    /** Заповнити базу початковими даними (Seed) */
    seed(habits: Habit[]): Promise<void>;
}

/**
 * Реалізація репозиторію в пам'яті (In-Memory).
 * Використовує Map для зберігання об'єктів.
 * Дані зникають після перезапуску сервера (для навчальних цілей).
 */
export class InMemoryHabitRepository implements IHabitRepository {
    // Основне сховище: Ключ = ID, Значення = Об'єкт Habit
    private habits: Map<string, Habit> = new Map();
    
    // Сховище для бейджів (нагород)
    private badges: Badge[] = [];
    
    // Сховище для рекомендацій ШІ
    private recommendations: Recommendation[] = [];

    /**
     * Пошук сутності за унікальним ідентифікатором.
     * @param id - UUID звички
     * @returns Promise, що містить звичку або undefined, якщо не знайдено
     */
    async findById(id: string): Promise<Habit | undefined> {
        return this.habits.get(id);
    }

    /**
     * Отримання повного списку всіх звичок.
     * Конвертує значення Map у масив.
     * @returns Масив об'єктів Habit
     */
    async findAll(): Promise<Habit[]> {
        return Array.from(this.habits.values());
    }

    /**
     * Створення нового запису або повний перезапис існуючого.
     * @param habit - Об'єкт звички для збереження
     */
    async save(habit: Habit): Promise<void> {
        this.habits.set(habit.id, habit);
    }
    
    /**
     * Оновлення даних існуючої звички.
     * Перевіряє наявність ключа перед записом.
     * @param habit - Оновлений об'єкт звички
     */
    async update(habit: Habit): Promise<void> {
        if (this.habits.has(habit.id)) {
            this.habits.set(habit.id, habit);
        }
    }

    /**
     * Видалення запису з бази даних.
     * @param id - Ідентифікатор звички, яку треба видалити
     */
    async delete(id: string): Promise<void> {
        this.habits.delete(id);
    }

    /**
     * Отримує список нагород користувача.
     */
    async getBadges(): Promise<Badge[]> {
        return this.badges;
    }

    /**
     * Додає нову нагороду в історію користувача.
     */
    async addBadge(badge: Badge): Promise<void> {
        this.badges.push(badge);
    }

    /**
     * Отримує активні рекомендації від системи аналізу.
     */
    async getRecommendations(): Promise<Recommendation[]> {
        return this.recommendations;
    }

    /**
     * Зберігає нову рекомендацію (пораду).
     */
    async addRecommendation(rec: Recommendation): Promise<void> {
        this.recommendations.push(rec);
    }

    /**
     * Метод для масового завантаження даних (Seed Data).
     * Використовується при старті сервера для демо-режиму.
     * @param habits - Масив звичок
     */
    async seed(habits: Habit[]): Promise<void> {
        habits.forEach(h => this.habits.set(h.id, h));
    }
}