import { test, expect } from '@playwright/test';

test('должен записать HAR-файл /user', async ({ page }) => {
  // Выполняем скрипт перед загрузкой страницы
  await page.addInitScript(() => {
    // Этот код выполнится в браузере!
    localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDc5Mzc3NDFjZmY1MDAxYjZlMWU1ZSIsImlhdCI6MTc3OTk5OTEzNiwiZXhwIjoxNzgwMDAwMzM2fQ.y50xa7dUkOa7h7AlKvn8bgSa00wuRSpaE3X9zeNFt_k');
  });

  // Начинаем запись HAR
  await page.routeFromHAR('./e2e/hars/user.har', {
    url: 'https://new-stellarburgers.education-services.ru/api/auth/user',
    update: false, // Режим записи
  });

  await page.goto('/');

  // Ждём загрузки данных
  await expect(page.getByText('Соберите бургер')).toBeVisible();

  // HAR-файл будет сохранён автоматически
});
