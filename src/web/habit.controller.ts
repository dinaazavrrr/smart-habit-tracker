import { Request, Response } from 'express';
import { IHabitRepository } from '../infrastructure/habit-repository';
import { Habit } from '../domain/habit.entity';
import { HabitFrequency } from '../domain/types';
import { StreakService } from '../core/streak-service';
import { GamificationService } from '../core/gamification-service';
import { SchedulerService } from '../services/scheduler.service';
import { DisciplineCalculator } from '../core/discipline-calculator';

/**
 * HabitController.
 * Відповідає за обробку HTTP-запитів, взаємодію з користувачем через браузер
 * та оркестрацію сервісів (Repo, StreakService, Gamification).
 */
export class HabitController {
    /**
     * Конструктор контролера.
     * Приймає репозиторій через Dependency Injection.
     */
    constructor(private habitRepo: IHabitRepository) {}

    /**
     * GET /
     * Головна сторінка додатку.
     * Відображає список звичок, бейджі, рекомендації та графік дисципліни.
     * * Також тут відбувається "на льоту" розрахунок Discipline Score
     * на основі поточних даних для відображення прогрес-бару.
     */
    async getAll(req: Request, res: Response) {
        const habits = await this.habitRepo.findAll();
        const badges = await this.habitRepo.getBadges();
        const recommendations = await this.habitRepo.getRecommendations();
        
        // --- Логіка розрахунку Discipline Score ---
        // 1. Формуємо історію виконань за сьогодні
        const records = habits.map(h => ({
            date: new Date().toISOString(),
            status: h.currentStreak > 0 ? 'done' : 'missed',
            habitDifficulty: h.difficulty
        }));

        // 2. Формуємо ідеальний план (сума складності всіх звичок)
        const planned = [{
            date: new Date().toISOString(),
            totalPlannedDifficulty: habits.reduce((sum, h) => sum + h.difficulty, 0)
        }];

        // 3. Викликаємо калькулятор (0-100%)
        const score = DisciplineCalculator.calculate(records as any, planned);
        
        // Рендеринг шаблону index.ejs
        res.render('index', { habits, badges, recommendations, score }); 
    }

    /**
     * POST /habits
     * Створення нової звички.
     * Отримує дані з форми, валідує їх та зберігає в базу.
     * За замовчуванням встановлює частоту DAILY та всі дні тижня.
     */
    async create(req: Request, res: Response) {
        const { name, category, difficulty } = req.body;
        
        const newHabit = new Habit(
            Date.now().toString(), // Генерація ID
            'user1',
            name,
            category,
            HabitFrequency.DAILY,
            Number(difficulty),
            [0, 1, 2, 3, 4, 5, 6] // Усі дні тижня
        );

        await this.habitRepo.save(newHabit);
        res.redirect('/');
    }

    /**
     * POST /habits/:id/check
     * Обробка виконання (Check-in) або пропуску звички.
     * * Основна логіка:
     * 1. Знайти звичку.
     * 2. Оновити стрік через StreakService.
     * 3. Перевірити нагороди через GamificationService.
     * 4. Зберегти зміни.
     */
    async checkIn(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body; // 'done' або 'missed'

        const habit = await this.habitRepo.findById(id);

        if (habit) {
            // Оновлюємо математику стріків (враховує вихідні та пропуски)
            StreakService.updateStreak(habit, status, new Date());
            
            // Якщо виконано - перевіряємо, чи заробив користувач новий бейдж
            if (status === 'done') {
                const currentBadges = await this.habitRepo.getBadges();
                const newBadge = GamificationService.checkBadges(habit, currentBadges);
                
                if (newBadge) {
                    await this.habitRepo.addBadge(newBadge);
                }
            }

            // Зберігаємо оновлену сутність
            await this.habitRepo.save(habit);
        }

        res.redirect('/');
    }

    /**
     * POST /admin/nightly
     * Примусовий запуск нічного планувальника (Demo-режим).
     * Викликає SchedulerService для аналізу дня та генерації порад.
     */
    async triggerNightlyJob(req: Request, res: Response) {
        const scheduler = new SchedulerService(this.habitRepo);
        const logs = await scheduler.processNightlyRoutine();
        
        res.render('nightly-report', { logs });
    }

    /**
     * GET /habits/:id/edit
     * Відображає сторінку редагування звички.
     */
    async getEditPage(req: Request, res: Response) {
        const { id } = req.params;
        const habit = await this.habitRepo.findById(id);

        if (!habit) {
            return res.redirect('/');
        }

        res.render('edit', { habit });
    }

    /**
     * POST /habits/:id/edit
     * Зберігає зміни після редагування (назва, складність).
     */
    async updateHabit(req: Request, res: Response) {
        const { id } = req.params;
        const { name, difficulty } = req.body;

        const habit = await this.habitRepo.findById(id);

        if (habit) {
            habit.name = name;
            habit.difficulty = Number(difficulty);
            await this.habitRepo.update(habit);
        }

        res.redirect('/');
    }

    /**
     * POST /habits/:id/delete
     * Видаляє звичку з системи.
     */
    async deleteHabit(req: Request, res: Response) {
        const { id } = req.params;
        await this.habitRepo.delete(id);
        res.redirect('/');
    }
}