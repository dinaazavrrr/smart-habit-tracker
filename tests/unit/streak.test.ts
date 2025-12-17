// tests/unit/streak.test.ts
import { StreakService } from '../../src/core/streak-service';
import { Habit } from '../../src/domain/habit.entity';
import { HabitFrequency, RecordStatus } from '../../src/domain/types';

describe('StreakService Logic', () => {
    let habit: Habit;

    beforeEach(() => {
        // Створюємо звичку перед кожним тестом
        // Нагадування тільки у Понеділок (1) та Середу (3)
        habit = new Habit('1', 'u1', 'Test', 'Learning', HabitFrequency.WEEKLY, 3, [1, 3]);
        habit.currentStreak = 5; // Початковий стрік
    });

    test('Має збільшувати стрік, якщо виконано (Done)', () => {
        // Симулюємо Понеділок (день плану)
        const monday = new Date('2025-01-06'); // Це понеділок
        
        StreakService.updateStreak(habit, RecordStatus.DONE, monday);
        
        expect(habit.currentStreak).toBe(6); // 5 + 1
    });

    test('Має скидати стрік на 0, якщо пропущено (Missed) у запланований день', () => {
        const monday = new Date('2025-01-06'); // Це понеділок
        
        StreakService.updateStreak(habit, RecordStatus.MISSED, monday);
        
        expect(habit.currentStreak).toBe(0);
    });

    test('НЕ має скидати стрік, якщо пропущено у НЕзапланований день', () => {
        // Вівторок (день 2) - не входить у [1, 3]
        const tuesday = new Date('2025-01-07'); 
        
        StreakService.updateStreak(habit, RecordStatus.MISSED, tuesday);
        
        // Стрік має залишитись 5, бо ми не планували це робити у вівторок
        expect(habit.currentStreak).toBe(5); 
    });
});