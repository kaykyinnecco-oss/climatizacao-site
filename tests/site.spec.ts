import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("desktop: assets, console, filtering, lightbox, form and local-only submission", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "transformar",
  );
  for (const id of [
    "servicos",
    "sobre",
    "equipamentos",
    "projetos",
    "contato",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every((i) => i.complete && i.naturalWidth > 0),
        ),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Comercial", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByRole("button", { name: "Ampliar Refúgio urbano" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-controls")).toContainText(
    "Espaços que inspiram",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ampliar Refúgio urbano" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Solicitar orçamento", exact: true })
    .click();
  await expect(page.locator(".error")).toHaveCount(6);
  await expect(page.getByLabel("Nome", { exact: true })).toBeFocused();
  await page.getByLabel("Nome", { exact: true }).fill("Pessoa Teste");
  await page.getByLabel("WhatsApp", { exact: true }).fill("11987654321");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Cidade", { exact: true }).fill("São Paulo");
  await page
    .getByLabel("Tipo de serviço")
    .selectOption("Manutenção preventiva");
  await page
    .getByLabel("Mensagem", { exact: true })
    .fill("Gostaria de climatizar uma sala.");
  const outbound: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") outbound.push(r.url());
  });
  await page
    .getByRole("button", { name: "Solicitar orçamento", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Nenhum dado foi enviado",
  );
  expect(outbound).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});
test("responsive layouts, menu, reduced motion and testimonial navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Projetos" })
    .click();
  await expect(
    page.getByRole("button", { name: "Abrir menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Próximos depoimentos" }).click();
  await expect(page.locator(".review-card").first()).toContainText(
    "Rafael Almeida",
  );
  await expect(page.locator(".airflow path").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
test("accessibility audit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const id of ["servicos", "sobre", "equipamentos", "projetos", "contato"])
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});
