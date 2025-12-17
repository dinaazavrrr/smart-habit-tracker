import { GamificationService } from '../../src/core/gamification-service';
import { Habit } from '../../src/domain/habit.entity';
import { Badge, RecommendationType } from '../../src/domain/gamification';
import { HabitFrequency } from '../../src/domain/types';
import { IRecord } from '../../src/core/discipline-calculator';

describe('GamificationService', () => {
    
    // --- ТЕСТИ БЕЙДЖІВ ---
    test('Має видати бейдж "Consistency Master", якщо стрік = 10', () => {
        // 1. Підготовка (Arrange)
        const habit = new Habit('1', 'u1', 'Test', 'Work', HabitFrequency.DAILY, 1, [0,1,2,3,4,5,6]);
        habit.currentStreak = 10; // Симулюємо, що користувач досяг 10 днів
        
        const existingBadges: Badge[] = []; // У користувача ще немає бейджів

        // 2. Дія (Act)
        const badge = GamificationService.checkBadges(habit, existingBadges);

        // 3. Перевірка (Assert)
        expect(badge).not.toBeNull(); // Бейдж має бути створений
        expect(badge?.name).toBe('Consistency Master');
    });

    test('НЕ має видавати бейдж повторно, якщо він вже є', () => {
        const habit = new Habit('1', 'u1', 'Test', 'Work', HabitFrequency.DAILY, 1, [0,1,2,3,4,5,6]);
        habit.currentStreak = 15;
        
        // У нас ВЖЕ є такий бейдж
        const existingBadges: Badge[] = [
            new Badge('b1', 'Consistency Master', 'desc', 'icon', new Date())
        ];

        const badge = GamificationService.checkBadges(habit, existingBadges);

        expect(badge).toBeNull(); // Новий бейдж не повинен створюватись
    });

    // --- ТЕСТИ РЕКОМЕНДАЦІЙ (ШІ Поради) ---
    test('Має створити пораду "Corrective", якщо є 3 пропуски поспіль', () => {
        const habit = new Habit('1', 'u1', 'Hard Task', 'Work', HabitFrequency.DAILY, 5, [0,1,2,3,4,5,6]);
        
        // Історія: 3 рази пропущено
        const recentRecords: IRecord[] = [
            { date: '2025-01-01', status: 'missed', habitDifficulty: 5 },
            { date: '2025-01-02', status: 'missed', habitDifficulty: 5 },
            { date: '2025-01-03', status: 'missed', habitDifficulty: 5 }
        ];

        const recommendation = GamificationService.analyzeForRecommendations(habit, recentRecords);

        expect(recommendation).not.toBeNull();
        expect(recommendation?.type).toBe(RecommendationType.CORRECTIVE);
        expect(recommendation?.message).toContain('3 рази поспіль');
    });

    test('НЕ має давати пораду, якщо пропусків менше 3', () => {
        const habit = new Habit('1', 'u1', 'Easy Task', 'Work', HabitFrequency.DAILY, 1, [0,1,2,3,4,5,6]);
        
        const recentRecords: IRecord[] = [
            { date: '2025-01-01', status: 'done', habitDifficulty: 1 },
            { date: '2025-01-02', status: 'missed', habitDifficulty: 1 } // Тільки 1 пропуск
        ];

        const recommendation = GamificationService.analyzeForRecommendations(habit, recentRecords);

        expect(recommendation).toBeNull();
    });
});