import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { InMemoryHabitRepository } from './infrastructure/habit-repository';
import { HabitController } from './web/habit.controller';
import { Habit } from './domain/habit.entity';
import { HabitFrequency } from './domain/types';
import { INITIAL_HABITS } from './infrastructure/seed-data';
import './core/errors';
import './web/dtos';
import './domain/audit-log';

const app = express();
const port = 3000;

// 1. Налаштування шаблонізатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.urlencoded({ extended: true })); // Щоб читати дані з форм
app.use(express.static('public'));

// 2. Ініціалізація залежностей (Dependency Injection)
const habitRepo = new InMemoryHabitRepository();
const habitController = new HabitController(habitRepo);

// 3. Заповнення демо-даними (щоб не було пусто при запуску)
console.log(`Loading ${INITIAL_HABITS.length} habits into memory...`);
habitRepo.seed(INITIAL_HABITS);

// 4. Маршрути (Routes)
// Коли користувач заходить на головну
app.get('/', (req, res) => habitController.getAll(req, res));
app.get('/terms', (req, res) => res.render('terms'));
// Коли створює звичку
app.post('/habits', (req, res) => habitController.create(req, res));
// Коли клікає "Виконано"

app.post('/habits/:id/check', (req, res) => habitController.checkIn(req, res));
app.post('/admin/nightly', (req, res) => habitController.triggerNightlyJob(req, res));
app.get('/habits/:id/edit', (req, res) => habitController.getEditPage(req, res));
app.post('/habits/:id/edit', (req, res) => habitController.updateHabit(req, res));
app.post('/habits/:id/delete', (req, res) => habitController.deleteHabit(req, res));


// 5. Запуск
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});