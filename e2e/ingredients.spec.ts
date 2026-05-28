import { test, expect } from '@playwright/test';

test('должен записать HAR-файл /ingredients', async ({ page }) => {
  // Начинаем запись HAR
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: 'https://new-stellarburgers.education-services.ru/api/ingredients',
    update: false, // Режим записи
  });

  await page.goto('/');

  // Ждём загрузки данных
  await expect(page.getByText('Соберите бургер')).toBeVisible();

  // HAR-файл будет сохранён автоматически
});
