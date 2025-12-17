// Тип рекомендації
export enum RecommendationType {
    MOTIVATIONAL = 'motivational',
    CORRECTIVE = 'corrective'
}

// Клас Бейджа
export class Badge {
    constructor(
        public id: string,
        public name: string,       // Назва: "Consistency 10"
        public description: string,
        public icon: string,       // Емодзі для краси 
        public dateReceived: Date
    ) {}
}

// Клас Рекомендації
export class Recommendation {
    constructor(
        public id: string,
        public habitId: string,
        public type: RecommendationType,
        public message: string,
        public isActive: boolean = true,
        public createdAt: Date = new Date()
    ) {}
}