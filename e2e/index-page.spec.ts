import { test, expect } from "@playwright/test";

test("都道府県のチェックボックスをクリックすると、クエリパラメータにそれがセット・削除される", async ({
  page,
}) => {
  // indexページに移動
  await page.goto("/");
  // チェックボックスをクリックする
  await page.click('input[type="checkbox"][name="1"]');
  // 001=onがURLに含まれていることを確認する
  await expect(page).toHaveURL(/.*\?001=on/);

  // チェックボックスをクリックする
  await page.click('input[type="checkbox"][name="1"]');
  // 001=onがURLに含まれていないことを確認する
  await expect(page).not.toHaveURL(/.*\?001=on/);
});

test("クエリーパラメータがセットされていたら、都道府県のチェックボックスはチェックされている", async ({
  page,
}) => {
  // indexページにクエリパラメータ付きで移動
  await page.goto("/?001=on");
  // チェックボックスがチェックされていることを確認する
  await expect(page.locator('input[type="checkbox"][name="1"]')).toBeChecked();
});
