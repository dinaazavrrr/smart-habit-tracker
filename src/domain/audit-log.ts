/**
 * audit-log.ts
 * Модуль для аудиту безпеки та логування критичних дій користувача.
 * Зберігає історію змін для відповідності стандартам безпеки (compliance).
 */

/**
 * Типи подій для аудиту.
 */
export enum AuditEventType {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGOUT = 'USER_LOGOUT',
    HABIT_CREATED = 'HABIT_CREATED',
    HABIT_DELETED = 'HABIT_DELETED',
    HABIT_UPDATED = 'HABIT_UPDATED',
    STREAK_BROKEN = 'STREAK_BROKEN',
    BADGE_EARNED = 'BADGE_EARNED',
    SYSTEM_ERROR = 'SYSTEM_ERROR',
    DATA_EXPORT = 'DATA_EXPORT'
}

/**
 * Рівень важливості події.
 */
export enum AuditSeverity {
    INFO = 'INFO',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL'
}

/**
 * Інтерфейс запису аудиту.
 */
export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    eventType: AuditEventType;
    severity: AuditSeverity;
    userId: string;
    ipAddress: string;
    details: string;
    metadata?: Record<string, any>;
}

/**
 * Клас AuditService.
 * Відповідає за запис подій у захищений журнал.
 */
export class AuditService {
    private logs: AuditLogEntry[] = [];

    /**
     * Записує подію в журнал.
     * @param eventType - Тип події
     * @param userId - ID користувача
     * @param details - Опис події
     * @param severity - Рівень важливості (за замовчуванням INFO)
     */
    public log(
        eventType: AuditEventType, 
        userId: string, 
        details: string, 
        severity: AuditSeverity = AuditSeverity.INFO
    ): void {
        const entry: AuditLogEntry = {
            id: this.generateId(),
            timestamp: new Date(),
            eventType: eventType,
            severity: severity,
            userId: userId,
            ipAddress: '127.0.0.1', 
            details: details
        };

        this.logs.push(entry);
    }

    /**
     * Отримати всі записи аудиту.
     */
    public getLogs(): AuditLogEntry[] {
        return this.logs;
    }

    /**
     * Отримати записи за конкретний період.
     */
    public getLogsByDateRange(startDate: Date, endDate: Date): AuditLogEntry[] {
        return this.logs.filter(log => 
            log.timestamp >= startDate && log.timestamp <= endDate
        );
    }

    /**
     * Отримати записи конкретного користувача.
     */
    public getLogsByUser(userId: string): AuditLogEntry[] {
        return this.logs.filter(log => log.userId === userId);
    }

    /**
     * Отримати тільки критичні події.
     */
    public getCriticalLogs(): AuditLogEntry[] {
        return this.logs.filter(log => log.severity === AuditSeverity.CRITICAL);
    }

    /**
     * Експорт логів у форматі CSV
     */
    public exportToCsv(): string {
        const header = 'ID,Timestamp,Type,Severity,User,Details\n';
        const rows = this.logs.map(log => 
            `${log.id},${log.timestamp.toISOString()},${log.eventType},${log.severity},${log.userId},"${log.details}"`
        ).join('\n');
        
        return header + rows;
    }

    /**
     * Очищення старих логів (Retention Policy).
     * Видаляє логи старше вказаної кількості днів.
     */
    public cleanupOldLogs(daysToKeep: number): void {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

        this.logs = this.logs.filter(log => log.timestamp >= cutoffDate);
    }

    /**
     * Генерація унікального ID
     */
    private generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}

/**
 * Статичний список фіктивних логів для наповнення системи.
 * Використовується для демонстрації роботи аудиту.
 */
export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
    {
        id: 'log_1',
        timestamp: new Date('2024-01-01T10:00:00Z'),
        eventType: AuditEventType.USER_LOGIN,
        severity: AuditSeverity.INFO,
        userId: 'user1',
        ipAddress: '192.168.1.1',
        details: 'Successful login via password'
    },
    {
        id: 'log_2',
        timestamp: new Date('2024-01-01T10:05:00Z'),
        eventType: AuditEventType.HABIT_CREATED,
        severity: AuditSeverity.INFO,
        userId: 'user1',
        ipAddress: '192.168.1.1',
        details: 'Created habit "Drink Water"'
    },
    {
        id: 'log_3',
        timestamp: new Date('2024-01-02T08:00:00Z'),
        eventType: AuditEventType.STREAK_BROKEN,
        severity: AuditSeverity.WARNING,
        userId: 'user1',
        ipAddress: '192.168.1.1',
        details: 'Streak broken for "Exercise"'
    },
    {
        id: 'log_4',
        timestamp: new Date('2024-01-03T12:00:00Z'),
        eventType: AuditEventType.SYSTEM_ERROR,
        severity: AuditSeverity.CRITICAL,
        userId: 'system',
        ipAddress: 'localhost',
        details: 'Database connection timeout detected'
    },
];