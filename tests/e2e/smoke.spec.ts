import { test, expect } from '@playwright/test';

test('login and see product grid', async ({ page }) => {
  await page.route('**/login/acessar', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 1,
        token_de_acesso: 'mocked-token',
        dados_usuario: {
          id: 1,
          nome_usuario: 'Usuário Teste',
          email: 'teste@teste.com',
        },
      }),
    });
  });

  await page.route('**/produtos/listar', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 1,
        data: [
          {
            codigo: 1,
            nome: 'Produto Teste 1',
            preco: 10.5,
            imagem: 'https://via.placeholder.com/150',
            descricao: 'Descrição do produto teste 1',
          },
        ],
      }),
    });
  });

  await page.goto('http://localhost:3000/login');

  await expect(page.getByPlaceholder('Usuário')).toBeVisible();
  await expect(page.getByPlaceholder('Senha')).toBeVisible();

  await page.getByPlaceholder('Usuário').fill('usuario_teste');
  await page.getByPlaceholder('Senha').fill('senha_teste');
  await page.getByRole('button', { name: /entrar/i }).click();

  await page.waitForURL('**/produtos', { timeout: 15000 });

  await expect(page).toHaveURL(/produtos/);

  const loading = page.getByText(/buscando produtos/i);

  await expect(loading).toBeVisible();
  await expect(loading).toBeHidden();

  const cards = page.getByTestId('product-card');

  await expect(cards).toHaveCount(1, { timeout: 15000 });
  await expect(cards.first()).toBeVisible();

  await expect(cards.first()).toContainText('Produto Teste 1');
});