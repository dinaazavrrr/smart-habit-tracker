/**
 * Глобальна конфігурація додатку.
 * Збирає всі налаштування, константи та магічні числа в одному місці.
 * Це полегшує підтримку та зміну параметрів без редагування бізнес-логіки.
 */

export const AppConfig = {
    /**
     * Налаштування веб-сервера.
     */
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
        host: 'localhost',
        cors: {
            enabled: true,
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        },
        timeouts: {
            request: 30000, // 30 секунд
            keepAlive: 5000 // 5 секунд
        }
    },

    /**
     * Налаштування бізнес-логіки та гейміфікації.
     */
    gameplay: {
        streaks: {
            minForBadge: 10,  // Мінімум днів для отримання бейджа
            lossThreshold: 3, // Скільки днів можна пропустити до критичного попередження
            recoveryCost: 5   // (На майбутнє) Скільки балів коштує відновлення стріка
        },
        difficulty: {
            min: 1,
            max: 5,
            default: 1,
            multipliers: {
                easy: 1.0,
                medium: 1.5,
                hard: 2.0,
                extreme: 3.0
            }
        },
        badges: {
            consistencyMaster: {
                id: 'b_consistency',
                name: 'Consistency Master',
                requiredStreak: 10,
                icon: '🏆'
            },
            earlyBird: {
                id: 'b_early',
                name: 'Early Bird',
                requiredHour: 6, // До 6 ранку
                icon: '🌅'
            },
            nightOwl: {
                id: 'b_night',
                name: 'Night Owl',
                requiredHour: 23, // Після 23:00
                icon: '🦉'
            }
        }
    },

    /**
     * Налаштування інтерфейсу (UI/UX).
     */
    ui: {
        pagination: {
            itemsPerPage: 10,
            maxPageButtons: 5
        },
        theme: {
            default: 'light',
            supported: ['light', 'dark', 'contrast'],
            colors: {
                primary: '#4a90e2',
                secondary: '#50e3c2',
                danger: '#ff5f56',
                success: '#27ae60'
            }
        },
        messages: {
            welcome: 'Welcome back to your Habit Tracker!',
            streakLost: 'Oh no! You lost your streak. Don\'t give up!',
            newBadge: 'Congratulations! You earned a new badge.'
        }
    },

    /**
     * Налаштування безпеки та валідації.
     */
    security: {
        password: {
            minLength: 8,
            requireSpecialChar: true,
            requireNumber: true
        },
        session: {
            secret: 'super-secret-key-change-in-production',
            expiresIn: '24h'
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 хвилин
            maxRequests: 100 // ліміт запитів з одного IP
        }
    },

    /**
     * Налаштування бази даних (імітація).
     */
    database: {
        type: 'memory', // 'memory' | 'postgres' | 'mongo'
        connectionString: process.env.DB_URL || 'postgres://user:pass@localhost:5432/habits',
        poolSize: 10,
        timeout: 5000,
        logging: true,
        migrations: {
            autoRun: true,
            dir: './migrations'
        }
    },

    /**
     * Налаштування логування.
     */
    logging: {
        level: 'debug', // 'error' | 'warn' | 'info' | 'debug'
        format: 'json', // 'text' | 'json'
        files: {
            error: 'logs/error.log',
            combined: 'logs/combined.log'
        }
    },
    
    /**
     * Метадані додатку.
     */
    meta: {
        version: '1.0.0',
        author: 'Diana',
        repoUrl: 'https://github.com/project/repo',
        supportEmail: 'support@tracker.com'
    }
};

/**
 * Функція для отримання налаштувань (Singleton-like access).
 */
export function getConfig() {
    return AppConfig;
}