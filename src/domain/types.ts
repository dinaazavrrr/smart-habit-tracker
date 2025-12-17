// Типи частоти виконання 
export enum HabitFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    WORKDAYS = 'workdays', // Пн-Пт
}

// Статус виконання 
export enum RecordStatus {
    DONE = 'done',
    MISSED = 'missed',
    PLANNED = 'planned'
}

// Рівень складності (для валідації)
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;