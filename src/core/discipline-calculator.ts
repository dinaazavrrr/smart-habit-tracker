/**
 * Інтерфейс запису про виконання.
 * Використовується калькулятором для аналізу історії.
 */
export interface IRecord {
    date: string;
    status: 'done' | 'missed';
    habitDifficulty: number;
}

/**
 * Інтерфейс плану на день.
 * Вказує, яка загальна складність була запланована.
 */
export interface IPlan {
    date: string;
    totalPlannedDifficulty: number;
}

/**
 * Клас DisciplineCalculator (Калькулятор Дисципліни).
 * Відповідає за реалізацію User Story #5:
 * "Як користувач, я хочу бачити свій discipline_score".
 * * Алгоритм враховує не тільки факт виконання, а й складність завдання.
 * Виконання складної звички (Diff=5) дає більше балів, ніж простої (Diff=1).
 */
export class DisciplineCalculator {

    /**
     * Статичний метод розрахунку балу дисципліни.
     * * Формула:
     * Score = (Сума складності виконаних / Сума складності запланованих) * 100
     * * @param records - Історія виконань за період
     * @param plans - Плани на цей же період
     * @returns Число від 0 до 100 (відсоток ефективності)
     */
    public static calculate(records: IRecord[], plans: IPlan[]): number {
        let totalScore = 0;
        let totalPossible = 0;

        // 1. Рахуємо, скільки балів складності користувач набрав
        for (const record of records) {
            if (record.status === 'done') {
                totalScore += record.habitDifficulty;
            }
        }

        // 2. Рахуємо, скільки балів він МІГ набрати (ідеал)
        for (const plan of plans) {
            totalPossible += plan.totalPlannedDifficulty;
        }

        // Захист від ділення на нуль
        if (totalPossible === 0) return 0;

        // Розрахунок відсотка
        return (totalScore / totalPossible) * 100;
    }
}