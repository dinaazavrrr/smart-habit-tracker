import { RecordStatus } from '../domain/types';

// Цей файл симулює архівну історію дій користувача за минулий рік.
// Використовується для навантажувального тестування та перевірки алгоритмів аналітики.

export interface HistoryRecord {
    id: string;
    habitId: string;
    date: string;
    action: string;
    metadata: {
        device: string;
        location: string;
        response_time_ms: number;
    };
}

export const USER_ACTION_HISTORY: HistoryRecord[] = [
    {
        id: 'log_001',
        habitId: 'h1',
        date: '2024-01-01T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 120
        }
    },
    {
        id: 'log_002',
        habitId: 'h1',
        date: '2024-01-02T08:15:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 95
        }
    },
    {
        id: 'log_003',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_004',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    },
    {
        id: 'log_005',
        habitId: 'h1',
        date: '2024-01-04T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 110
        }
    },
    {
        id: 'log_006',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_007',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    },
    {
        id: 'log_008',
        habitId: 'h1',
        date: '2024-01-04T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 110
        }
    },
    {
        id: 'log_009',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_010',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    },
    {
        id: 'log_011',
        habitId: 'h1',
        date: '2024-01-01T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 120
        }
    },
    {
        id: 'log_012',
        habitId: 'h1',
        date: '2024-01-02T08:15:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 95
        }
    },
    {
        id: 'log_013',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_014',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    },
    {
        id: 'log_015',
        habitId: 'h1',
        date: '2024-01-04T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 110
        }
    },
    {
        id: 'log_016',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_017',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    },
    {
        id: 'log_018',
        habitId: 'h1',
        date: '2024-01-04T08:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'iPhone 12',
            location: 'UA/Kyiv',
            response_time_ms: 110
        }
    },
    {
        id: 'log_019',
        habitId: 'h2',
        date: '2024-01-03T09:00:00Z',
        action: 'HABIT_SKIPPED',
        metadata: {
            device: 'Web Client',
            location: 'UA/Lviv',
            response_time_ms: 200
        }
    },
    {
        id: 'log_020',
        habitId: 'h9',
        date: '2024-01-03T20:00:00Z',
        action: 'HABIT_COMPLETED',
        metadata: {
            device: 'Desktop',
            location: 'UA/Kyiv',
            response_time_ms: 150
        }
    }
];