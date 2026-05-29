import { test, expect } from '@playwright/test';

import { API_URL_BASE, ENDPOINTS } from '../src/utils/constants';

test('должен открывать модалку ингредиента и закрывать по крестику', async ({ page }) => {
  await page.routeFromHAR('./e2e/hars/ingredients.har', {
    url: `${API_URL_BASE}${ENDPOINTS.INGREDIENTS}`,
  });

  await page.goto('/');
  await page.getByText('Краторная булка N-200i').click();
  await expect(page.getByTestId('modal-title')).toHaveText('Детали ингредиента');
  await page.getByTestId('modal-close').click();
  await expect(page.getByTestId('modal')).not.toBeVisible();
});
