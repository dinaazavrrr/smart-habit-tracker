import { DisciplineCalculator, IRecord, IPlan } from '../../src/core/discipline-calculator';

describe('DisciplineCalculator Logic', () => {

    // Тест-кейс 1: Ідеальний тиждень
    test('Має повертати 100 балів, якщо все виконано', () => {
        // Підготовка даних (Arrange)
        const records: IRecord[] = [
            { date: '2025-01-01', status: 'done', habitDifficulty: 5 },
            { date: '2025-01-02', status: 'done', habitDifficulty: 5 }
        ];

        // ТУТ БУЛА ПОМИЛКА (IDailyPlan -> IPlan)
        const planned: IPlan[] = [
            { date: '2025-01-01', totalPlannedDifficulty: 5 },
            { date: '2025-01-02', totalPlannedDifficulty: 5 }
        ];

        // Дія (Act)
        const score = DisciplineCalculator.calculate(records, planned);

        // Перевірка (Assert)
        expect(score).toBe(100);
    });

    test('Має повертати 0, якщо нічого не виконано', () => {
        const records: IRecord[] = [
            { date: '2025-01-01', status: 'missed', habitDifficulty: 5 }
        ];
        const planned: IPlan[] = [
            { date: '2025-01-01', totalPlannedDifficulty: 5 }
        ];

        const score = DisciplineCalculator.calculate(records, planned);
        expect(score).toBe(0);
    });

    test('Має повертати 50%, якщо виконано половину за складністю', () => {
        const records: IRecord[] = [
            { date: '2025-01-01', status: 'done', habitDifficulty: 5 },   // Зробив важке
            { date: '2025-01-02', status: 'missed', habitDifficulty: 5 }  // Пропустив важке
        ];
        
        const planned: IPlan[] = [
            { date: '2025-01-01', totalPlannedDifficulty: 5 },
            { date: '2025-01-02', totalPlannedDifficulty: 5 }
        ];
        // Всього планували 10 балів, зробили 5. Результат має бути 50%.

        const score = DisciplineCalculator.calculate(records, planned);
        expect(score).toBe(50);
    });
});