import { Habit } from '../domain/habit.entity';
import { HabitFrequency } from '../domain/types';

export const INITIAL_HABITS: Habit[] = [
    // --- Категорія: Здоров'я ---
    new Habit('h1', 'user1', 'Пити 2л води', 'Здоров\'я', HabitFrequency.DAILY, 2, [0,1,2,3,4,5,6]),
    new Habit('h2', 'user1', 'Ранкова зарядка', 'Здоров\'я', HabitFrequency.DAILY, 3, [0,1,2,3,4,5,6]),
    new Habit('h4', 'user1', 'Прогулянка 30 хв', 'Здоров\'я', HabitFrequency.DAILY, 2, [0,1,2,3,4,5,6]),
    new Habit('h5', 'user1', 'Прийом вітамінів', 'Здоров\'я', HabitFrequency.DAILY, 1, [0,1,2,3,4,5,6]),
    
    // --- Категорія: Навчання (Залишаємо для демо "розбитого серця") ---
    new Habit('h9', 'user1', 'Вивчення TypeScript', 'Навчання', HabitFrequency.DAILY, 5, [0,1,2,3,4,5,6]),
    
    // --- Категорія: Робота ---
    new Habit('h29', 'user1', 'Планування дня', 'Робота', HabitFrequency.WORKDAYS, 3, [1,2,3,4,5]),
    
    // --- Категорія: Саморозвиток ---
    new Habit('h21', 'user1', 'Читання книги (20 ст)', 'Саморозвиток', HabitFrequency.DAILY, 2, [0,1,2,3,4,5,6]),
];

// --- НАЛАШТУВАННЯ СТАТИСТИКИ ---

// 1. Звичка з гарним стріком (Вода)
INITIAL_HABITS[0].currentStreak = 15; 
INITIAL_HABITS[0].lastStreak = 0;

// 2. Звичка, де ми ВТРАТИЛИ стрік (TypeScript)
INITIAL_HABITS[4].currentStreak = 0; 
INITIAL_HABITS[4].lastStreak = 25; // Буде розбите серце

// 3. Ще одна активна звичка (Зарядка)
INITIAL_HABITS[1].currentStreak = 3;
INITIAL_HABITS[1].lastStreak = 0;