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

// Verify Cookie Banner is visible on first visit
const bannerLocator = page.locator("#cookie-banner");
await bannerLocator.waitFor({ state: "visible" });
const hasBannerInitially = await bannerLocator.isVisible();
const hasDeclineBtn = await page.locator("#cookie-decline-btn").isVisible();
const hasAcceptBtn = await page.locator("#cookie-accept-btn").isVisible();
const hasSettingsTrigger = await page.locator("#cookie-settings-trigger").isVisible();
const hasBannerControls = hasDeclineBtn && hasAcceptBtn && hasSettingsTrigger;

// Click decline to hide the banner
await page.locator("#cookie-decline-btn").click();
await bannerLocator.waitFor({ state: "hidden" });
const declineWorked = !(await bannerLocator.isVisible());

await page.locator('[data-overlay-trigger="settingsOverlay"]').click();
await page.locator("#settingsOverlay").waitFor({ state: "visible" });
await page.keyboard.press("Escape");
await page.locator("#settingsOverlay").waitFor({ state: "hidden" });

const notesCountText = (await page.locator("#notes-count").textContent())?.trim() ?? "";

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

// Verify Settings overlay (via Cookie Banner settings trigger)
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });
await page.locator("#cookie-banner").waitFor({ state: "visible" });

await page.locator("#cookie-settings-trigger").click();
await page.locator("#settingsOverlay").waitFor({ state: "visible" });
await page.locator("#cookie-banner").waitFor({ state: "hidden" });
const settingsTriggerWorked = !(await page.locator("#cookie-banner").isVisible());

const hasExportBtn = await page.locator("#export-data-btn").isVisible();
const hasDeleteBtn = await page.locator("#delete-data-btn").isVisible();
const hasConsentCheckbox = await page.locator("#cookie-consent-checkbox").isVisible();
const hasAdminTokenInput = await page.locator("#admin-token-input").isVisible();
const hasFetchStatsBtn = await page.locator("#fetch-admin-stats-btn").isVisible();

// Click consent checkbox to test interactivity
await page.locator("#cookie-consent-checkbox").click();
const consentChecked = await page.locator("#cookie-consent-checkbox").isChecked();

await page.locator("#settingsOverlay [data-close-overlay]").click();
await page.locator("#settingsOverlay").waitFor({ state: "hidden" });

const summary = {
    targetUrl,
    initialPrompt,
    secondPrompt,
    initialPromptCount,
    secondPromptCount,
    reflectionCount,
    galleryItems,
    darkThemeEnabled,
    hasBannerInitially,
    hasBannerControls,
    declineWorked,
    settingsTriggerWorked,
    hasExportBtn,
    hasDeleteBtn,
    hasConsentCheckbox,
    consentChecked,
    hasAdminTokenInput,
    hasFetchStatsBtn,
    notesCountText,
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
    !hasBannerInitially ||
    !hasBannerControls ||
    !declineWorked ||
    !settingsTriggerWorked ||
    !hasExportBtn ||
    !hasDeleteBtn ||
    !hasConsentCheckbox ||
    !consentChecked ||
    !hasAdminTokenInput ||
    !hasFetchStatsBtn ||
    Number(notesCountText) !== galleryItems ||
    consoleErrors.length > 0 ||
    pageErrors.length > 0
) {
    process.exit(1);
}
