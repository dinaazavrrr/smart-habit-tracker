import { Habit } from '../domain/habit.entity';
import { RecordStatus } from '../domain/types';

export class StreakService {

    /**
     * Оновлює стрік звички на основі нової події.
     * * @param habit - об'єкт звички
     * @param isDone - чи виконав користувач звичку сьогодні
     * @param date - дата виконання (за замовчуванням сьогодні)
     */
    public static updateStreak(habit: Habit, status: RecordStatus, date: Date = new Date()): void {
        
        // 1. Перевірка: чи ця звичка взагалі мала бути виконана сьогодні?
        // Логіка з: Незаплановані дні не впливають.
        if (!habit.isScheduledForDate(date)) {
            // Якщо користувач виконав у вихідний - це бонус, можна додати +1
            // Але якщо пропустив у вихідний - стрік НЕ скидається.
            if (status === RecordStatus.MISSED) {
                return; // Нічого не змінюємо
            }
        }

        // 2. Логіка нарахування 
        if (status === RecordStatus.DONE) {
            habit.currentStreak += 1;
            habit.lastStreak = 0;
        } 
        
        // 3. Якщо пропущено
        else if (status === RecordStatus.MISSED) {
            if (habit.currentStreak > 0) {
                // Зберігаємо, що ми втратили, перед тим як обнулити
                habit.lastStreak = habit.currentStreak; 
            }
            habit.currentStreak = 0;
        }
    }

    /**
     * Перевірка на "заморозку" стріка 
     * Наприклад, якщо користувач купив "заморозку" за бали.
     */
    public static canFreezeStreak(userPoints: number): boolean {
        return userPoints >= 100; // Приклад розширення логіки
    }
}