import { test, expect } from '@playwright/test';

test('должен создать заказ', async ({ page }) => {
  // Выполняем скрипт перед загрузкой страницы
  await page.addInitScript(() => {
    // Этот код выполнится в браузере!
    localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDc5Mzc3NDFjZmY1MDAxYjZlMWU1ZSIsImlhdCI6MTc3OTk5OTEzNiwiZXhwIjoxNzgwMDAwMzM2fQ.y50xa7dUkOa7h7AlKvn8bgSa00wuRSpaE3X9zeNFt_k');
  });

  await page.routeFromHAR('./e2e/hars/user.har', {
    url: 'https://new-stellarburgers.education-services.ru/api/auth/user',
  });

  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: 'https://new-stellarburgers.education-services.ru/api/ingredients',
  });

  await page.goto('/');

  const fillingsContainer = page.getByTestId('ingredients-fillings');
  const fillingsItems = fillingsContainer.locator('a');
  const firstFillingsItem = fillingsItems.nth(0);

  const bunsContainer = page.getByTestId('ingredients-buns');
  const bunsItems = bunsContainer.locator('a');
  const firstBunsItem = bunsItems.nth(0);

  const dropTarget = page.getByTestId('drop-target');
  const createOrderButton = page.getByTestId('create-order-button');

  await firstFillingsItem.dragTo(dropTarget);
  await firstBunsItem.dragTo(dropTarget);

  await createOrderButton.click();

  await expect(page.getByText('идентификатор заказа')).toBeVisible();
});
