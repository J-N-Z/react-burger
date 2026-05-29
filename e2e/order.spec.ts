import { test, expect } from '@playwright/test';

import { API_URL_BASE, ENDPOINTS } from '../src/utils/constants';

test('должен записать HAR-файл /orders', async ({ page }) => {
  // Выполняем скрипт перед загрузкой страницы
  await page.addInitScript(() => {
    // Этот код выполнится в браузере!
    localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDc5Mzc3NDFjZmY1MDAxYjZlMWU1ZSIsImlhdCI6MTc4MDA1MjE1MSwiZXhwIjoxNzgwMDUzMzUxfQ.7MmqFYeNb_p8hOuFjRxx88pEP4yd6r4lit3lVeL-Ais');
  });

  await page.routeFromHAR('./e2e/hars/user.har', {
    url: `${API_URL_BASE}${ENDPOINTS.USER_DATA}`,
  });

  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: `${API_URL_BASE}${ENDPOINTS.INGREDIENTS}`,
  });

  // Начинаем запись HAR
  await page.routeFromHAR('./e2e/hars/orders.har', {
    url: `${API_URL_BASE}${ENDPOINTS.ORDERS}`,
    update: false, // Режим записи
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
