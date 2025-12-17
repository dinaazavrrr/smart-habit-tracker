import { test, expect, Page } from '@playwright/test';

// --- МАГІЧНА ФУНКЦІЯ ---
// Вона робить "підсвічування" елемента перед тим, як з ним взаємодіяти
async function visualize(page: Page, selector: string) {
    const locator = page.locator(selector).first();
    
    // 1. Плавно прокручуємо до елемента, щоб його було видно
    await locator.scrollIntoViewIfNeeded(); 
    
    // 2. Малюємо червону рамку та жовтий фон (JS ін'єкція)
    await locator.evaluate((el) => {
        el.style.border = '4px solid red';
        el.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // Жовтий напівпрозорий
        el.style.transition = 'all 0.3s'; // Плавність
        el.style.transform = 'scale(1.05)'; // Трохи збільшуємо
    });
    
    // 3. Чекаємо, щоб глядач встиг це помітити
    await page.waitForTimeout(1000); 
    
    // 4. Прибираємо підсвітку (щоб було красиво)
    await locator.evaluate((el) => {
        el.style.border = '';
        el.style.backgroundColor = '';
        el.style.transform = '';
    });
}

test.describe('Smart Habit Tracker Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Сценарій 1: Створення нової звички', async ({ page }) => {
    // 1. Вводимо назву
    await visualize(page, 'input[name="name"]'); // Підсвітити
    await page.fill('input[name="name"]', 'Демо Звичка E2E');

    // 2. Вибираємо категорію
    await visualize(page, 'select[name="category"]');
    await page.selectOption('select[name="category"]', 'Робота');
    
    // 3. Тиснемо кнопку
    await visualize(page, 'button:has-text("Створити")');
    await page.click('button:has-text("Створити")');

    // 4. Перевіряємо результат (підсвітимо нову картку)
    const newCard = 'h2:has-text("Демо Звичка E2E")';
    await visualize(page, newCard);
    await expect(page.locator(newCard)).toBeVisible();
  });

  test('Сценарій 2: Виконання звички (Streak +1)', async ({ page }) => {
    // Створимо звичку для тесту
    await page.fill('input[name="name"]', 'Спорт Тест');
    await page.click('button:has-text("Створити")');

    // Знаходимо картку
    const cardSelector = '.habit-card:has-text("Спорт Тест")';
    await visualize(page, cardSelector); // Показуємо картку

    // Знаходимо кнопку "Виконано" всередині цієї картки
    const doneButton = `${cardSelector} button:has-text("✅ Виконано")`;
    
    // Клікаємо з підсвіткою
    await visualize(page, doneButton);
    await page.click(doneButton);

    // Перевіряємо, що стрік змінився
    await expect(page.locator(cardSelector)).toContainText('Streak: 1');
  });
  
  test('Сценарій 3: Нічний алгоритм та ШІ-поради', async ({ page }) => {
    // 1. Скролимо вниз до червоної кнопки
    const adminBtn = 'button:has-text("🌙 Симулювати кінець дня")';
    await visualize(page, adminBtn);
    await page.click(adminBtn);

    // 2. Ми на чорній сторінці звіту
    await expect(page).toHaveURL(/.*admin\/nightly/);
    await page.waitForTimeout(2000); // Даємо час прочитати звіт

    // 3. Повертаємось назад
    const backLink = 'a:has-text("⬅ Назад на головну")';
    await visualize(page, backLink);
    await page.click(backLink);

    // 4. Дивимось на блок "ШІ Поради"
    await visualize(page, '.tips-box'); // Підсвічуємо синій блок
    const tips = page.locator('.tips-box');
    await expect(tips).toBeVisible();
  });
});