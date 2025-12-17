const http = require('http');

const TOTAL_REQUESTS = 1000; // Кількість запитів
const CONCURRENCY = 50;      // Скільки запитів одночасно

let completed = 0;
let failed = 0;
const startTime = Date.now();

console.log(`🚀 Починаємо стрес-тест: ${TOTAL_REQUESTS} запитів...`);

function makeRequest() {
    if (completed + failed >= TOTAL_REQUESTS) return;

    const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/', // Б'ємо по головній сторінці
        method: 'GET',
        agent: false // Вимикаємо пулінг, щоб створити навантаження
    }, (res) => {
        // Читаємо відповідь, щоб завершити запит
        res.on('data', () => {}); 
        res.on('end', () => {
            completed++;
            checkFinished();
            makeRequest(); // Запускаємо наступний
        });
    });

    req.on('error', (e) => {
        failed++;
        checkFinished();
        makeRequest();
    });

    req.end();
}

function checkFinished() {
    if (completed + failed >= TOTAL_REQUESTS) {
        const duration = (Date.now() - startTime) / 1000;
        console.log('\n=======================================');
        console.log('✅ Стрес-тест завершено!');
        console.log(`⏱  Час виконання: ${duration.toFixed(2)} сек`);
        console.log(`📈 Пропускна здатність: ${(TOTAL_REQUESTS / duration).toFixed(0)} req/sec`);
        console.log(`🟢 Успішних: ${completed}`);
        console.log(`🔴 Помилок: ${failed}`);
        console.log('=======================================');
    }
}

// Запускаємо першу хвилю
for (let i = 0; i < CONCURRENCY; i++) {
    makeRequest();
}