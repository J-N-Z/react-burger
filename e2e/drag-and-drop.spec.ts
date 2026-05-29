import { test, expect } from '@playwright/test';

import { API_URL_BASE, ENDPOINTS } from '../src/utils/constants';

test('должен перетаскивать ингредиент в конструктор', async ({ page }) => {
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: `${API_URL_BASE}${ENDPOINTS.INGREDIENTS}`,
  });

  await page.goto('/');

  const container = page.getByTestId('ingredients-fillings');
  const items = container.locator('a');
  const firstItem = items.nth(0);
  const dropTarget = page.getByTestId('drop-target');

  await firstItem.dragTo(dropTarget);

  const fillingIngredientsContainer = page.getByTestId('filling-ingredients-container');
  const constructorElement = fillingIngredientsContainer.getByTestId('draggable-constructor-element');

  await expect(constructorElement).toBeVisible();
});

test('должен перетаскивать булку в конструктор', async ({ page }) => {
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: `${API_URL_BASE}${ENDPOINTS.INGREDIENTS}`,
  });

  await page.goto('/');

  const container = page.getByTestId('ingredients-buns');
  const items = container.locator('a');
  const firstItem = items.nth(0);
  const dropTarget = page.getByTestId('drop-target');

  await firstItem.dragTo(dropTarget);

  const bunTopConstructorElement = page.getByTestId('bun-top-constructor-element');
  const bunBottomConstructorElement = page.getByTestId('bun-bottom-constructor-element');

  await expect(bunTopConstructorElement).toBeVisible();
  await expect(bunBottomConstructorElement).toBeVisible();
});
