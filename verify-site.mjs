import { chromium } from "playwright";

const targetUrl = process.argv[2] ?? "http://127.0.0.1:4173/";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

const consoleErrors = [];
const pageErrors = [];
const requestFailures = [];

page.on("console", (message) => {
    if (message.type() === "error") {
        consoleErrors.push(message.text());
    }
});

page.on("pageerror", (error) => {
    pageErrors.push(error.message);
});

page.on("requestfailed", (request) => {
    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText ?? "unknown failure"}`);
});

await page.goto(targetUrl, { waitUntil: "networkidle" });

const promptLocator = page.locator("#prompt-display");
await promptLocator.waitFor({ state: "visible" });

const initialPrompt = (await promptLocator.textContent())?.trim() ?? "";
const initialPromptCount = (await page.locator("#prompt-count").textContent())?.trim() ?? "";

await page.screenshot({ path: "verification-home.png", fullPage: true });

await page.locator('[data-overlay-trigger="aboutOverlay"]').click();
await page.locator("#aboutOverlay").waitFor({ state: "visible" });
await page.keyboard.press("Escape");
await page.locator("#aboutOverlay").waitFor({ state: "hidden" });

await page.locator('[data-overlay-trigger="galleryOverlay"]').click();
await page.locator("#galleryOverlay").waitFor({ state: "visible" });
const galleryItems = await page.locator(".gallery-entry").count();
await page.locator("#galleryOverlay [data-close-overlay]").click();
await page.locator("#galleryOverlay").waitFor({ state: "hidden" });

await page.locator("#new-prompt-button").click();
await page.waitForTimeout(250);
const secondPrompt = (await promptLocator.textContent())?.trim() ?? "";
const secondPromptCount = (await page.locator("#prompt-count").textContent())?.trim() ?? "";

await page.locator('[data-overlay-trigger="reflectOverlay"]').click();
await page.locator("#reflectOverlay").waitFor({ state: "visible" });
await page.locator("#reflection-text").fill("A calm moment, a clean page, and a little more perspective than I had five minutes ago.");
const reflectionCount = (await page.locator("#reflection-count").textContent())?.trim() ?? "";
await page.locator("#reflectOverlay [data-close-overlay]").click();
await page.locator("#reflectOverlay").waitFor({ state: "hidden" });

await page.locator("[data-theme-toggle]").click();
const darkThemeEnabled = (await page.locator("html").getAttribute("data-theme")) === "dark";

const summary = {
    targetUrl,
    initialPrompt,
    secondPrompt,
    initialPromptCount,
    secondPromptCount,
    reflectionCount,
    galleryItems,
    darkThemeEnabled,
    consoleErrors,
    pageErrors,
    requestFailures
};

console.log(JSON.stringify(summary, null, 2));

await browser.close();

if (
    !initialPrompt ||
    !secondPrompt ||
    initialPrompt === secondPrompt ||
    galleryItems < 1 ||
    !darkThemeEnabled ||
    consoleErrors.length > 0 ||
    pageErrors.length > 0
) {
    process.exit(1);
}
