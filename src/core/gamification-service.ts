import { Habit } from '../domain/habit.entity';
import { Badge, Recommendation, RecommendationType } from '../domain/gamification';
import { IRecord } from './discipline-calculator';

export class GamificationService {
    
    // Логіка Бейджів
    
    /**
     * Перевіряє, чи заслужив користувач новий бейдж.
     * Правило: streak >= 10 -> Badge(Consistency 10)
     */
    public static checkBadges(habit: Habit, existingBadges: Badge[]): Badge | null {
        
        // Перевірка на бейдж "10 днів поспіль"
        if (habit.currentStreak >= 10) {
            const badgeName = 'Consistency Master';
            
            // Перевіряємо, чи вже є такий бейдж (щоб не давати двічі)
            const hasBadge = existingBadges.some(b => b.name === badgeName);
            
            if (!hasBadge) {
                return new Badge(
                    Date.now().toString(),
                    badgeName,
                    'Виконував звичку 10 разів поспіль!',
                    '🔥',
                    new Date()
                );
            }
        }
        return null;
    }

    // Логіка Рекомендацій

    /**
     * Аналізує історію і дає поради.
     * Правило: 3 пропуски поспіль -> Corrective Recommendation
     */
    public static analyzeForRecommendations(habit: Habit, recentRecords: IRecord[]): Recommendation | null {
        // Беремо останні 3 записи
        const lastThree = recentRecords.slice(-3);

        if (lastThree.length < 3) return null;

        // Перевіряємо, чи всі 3 - це "missed"
        const isThreeMisses = lastThree.every(r => r.status === 'missed');

        if (isThreeMisses) {
            return new Recommendation(
                Date.now().toString(),
                habit.id,
                RecommendationType.CORRECTIVE,
                `Ти пропустив "${habit.name}" 3 рази поспіль. Можливо, варто зменшити складність?`,
                true
            );
        }

        return null;
    }
}