import { test, expect } from '@playwright/test';

import { API_URL_BASE, ENDPOINTS } from '../src/utils/constants';

test('должен записать HAR-файл /ingredients', async ({ page }) => {
  // Начинаем запись HAR
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: `${API_URL_BASE}${ENDPOINTS.INGREDIENTS}`,
    update: false, // Режим записи
  });

  await page.goto('/');

  // Ждём загрузки данных
  await expect(page.getByText('Соберите бургер')).toBeVisible();

  // HAR-файл будет сохранён автоматически
});
