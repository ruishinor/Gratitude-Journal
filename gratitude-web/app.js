const prompts = [
    "What is one way you have grown as a person recently?",
    "What is one event in the future you are looking forward to, and why?",
    "Write a short letter to your future self. What would you want that person to remember?",
    "What are three things at home that help you take care of yourself?",
    "What helps you feel healthy and well?",
    "What is something that you feel grateful to have experienced?",
    "What is one specific habit that improves your physical health?",
    "Name five things your past self would be proud of in your life today.",
    "Describe a recent moment when your natural strengths showed clearly, when your talents really got to click into place.",
    "What is a meaningful gift you received recently?",
    "Recall a specific moment you felt perfectly understood by someone. What happened?",
    "Write down three of the happiest moments you can think of.",
    "Who is someone that makes your life better? How do they do that?",
    "What is one thing someone does for you that you feel grateful for?",
    "Think of someone you love. What do you appreciate most about them today?",
    "How do you usually show appreciation to others?",
    "What is a small way you and a friend show you care about each other?",
    "Name three people who can always put a smile on your face.",
    "Describe a favorite memory with someone important to you.",
    "Recall a recent gesture that made you feel loved.",
    "How has a friend supported or inspired you lately?",
    "What is a recent compliment you received that made you feel good?",
    "Choose a recent photo that makes you smile. Describe it. What is happening in it?",
    "When you feel safe and relaxed, what does that actually feel like in your body? Examples: a deep breath, relaxed shoulders, or a sense of warmth.",
    "How has a family member or close friend supported you in an important way?",
    "What is one positive experience that changed your life in a meaningful way?",
    "Describe a recent conversation that left you feeling good.",
    "How does movement or exercise affect your mood?",
    "What are you learning about yourself right now?",
    "Who is someone you cannot imagine life without?",
    "If you could send one sentence into the future, what would it say?",
    "What is something you tried for the first time recently?",
    "What positive feelings did you notice today?",
    "Who is someone you have never met, but who has helped you in some way?",
    "What is something beautiful you saw today?",
    "When did you last feel awe or wonder?",
    "What is something valuable you learned today?",
    "Describe your perfect rainy day using your senses. What do you hear, smell, and see?",
    "How has practicing gratitude been changing your thoughts lately?",
    "Write a short thank-you note to someone you are thinking of.",
    "What is something you recently finished that you feel proud of?",
    "What is a sound, smell, or sight that makes you feel at home?",
    "What is something that can always make you happy, even on hard days?",
    "When was the last time someone thanked you? What was it for?",
    "What are you struggling with right now? Write yourself one encouraging, kind sentence as if to a friend.",
    "What is something you appreciate about the time you live in now?",
    "Acknowledge your inner strength by remembering a time it carried you through something hard.",
    "Recall a recent moment when someone was kind to you.",
    "Look around you. What is one small object you are grateful for?",
    "Describe a recent moment when you felt completely at peace.",
    "Recall a time you felt grateful for something a loved one did.",
    "Name one positive thing from today, even if it was small.",
    "Write a short thank-you note to yourself for something you have handled well.",
    "What is one small thing you look forward to or hope for this week?",
    "Imagine your life one year from now. What is the most important change?",
    "List five tools or items that make daily life easier.",
    "What are three good things you have today that you did not have five years ago?",
    "What is something you use every day that you often take for granted? Examples: a favorite mug or a warm shower.",
    "What is an achievement you are genuinely proud of?",
    "What do you need more of right now? What is one small step toward that?",
    "What is one lesson, either recent or old, that you are thankful to have learned?",
    "What would you hope your future self understands about this period of your life?",
    "What is a skill you have that might surprise people?",
    "Describe yourself using five positive words.",
    "When did you last feel you did not have to pretend or keep up a facade? Why was it different than other times?",
    "What would a perfect day look like for you?",
    "What is your favorite part of everyday life?",
    "What is one of the qualities in your personality that you appreciate?",
    "How do you hope people close to you experience you?",
    "What activity brings you the most joy? Why?",
    "What is one thing you appreciate about your body?",
    "Recall a time you stood up for someone or took a stand for something that mattered to you.",
    "What does true happiness mean to you?",
    "Describe to a stranger who you are in 15 to 20 words.",
    "Which part of your day do you look forward to the most?",
    "List three small things that help you relax or breathe easier.",
    "What place would you love to visit again? Why is that?",
    "Forgive yourself for one thing. What changes when you do?",
    "Describe a favorite childhood memory. What detail stands out most?",
    "What life lesson shaped who you are today?",
    "What song always lifts your mood?",
    "What part of your health are you grateful for today?",
    "What is one important thing you have learned about yourself this year?",
    "If you could set the tone for the coming week, what would be one intention you would set?",
    "Remember a time you did better than you expected.",
    "Who would you call in an emergency? Why?",
    "Describe a small act of kindness you did recently.",
    "What is a boundary you recently set to protect your peace?",
    "What is one of the most important pieces of advice you have received?",
    "What would you tell your 15-year-old self today?"
];

const galleryEntries = [
    {
        prompt: "What is a lesson you are thankful you learned?",
        answer: "That no is a complete sentence. Protecting my own space, energy, and peace is part of how I stay kind to myself and to other people."
    },
    {
        prompt: "What would you tell your 15-year-old self today?",
        answer: "It will get so much better. You will find people who love the parts of you that once felt strange."
    },
    {
        prompt: "Who is someone that makes your life better?",
        answer: "The person who checks in on me with the kind of phone call where nothing has to be solved. We just talk, and somehow I feel steadier after."
    },
    {
        prompt: "What is something beautiful you saw today?",
        answer: "The rain. The sound of it, the smell of it, the way it softens everything around me. It made the whole day feel gentler."
    },
    {
        prompt: "What is a lesson you are thankful you learned?",
        answer: "Even the hard lessons mattered. I would not have chosen them, but they shaped the parts of me that know how to keep going."
    },
    {
        prompt: "Who is someone that makes your life better?",
        answer: "My neighbor. She waves, remembers small details, and checks in on my cat when I am away. It makes the world feel warmer."
    },
    {
        prompt: "What would you tell your 15-year-old self today?",
        answer: "Things will change. The time in between matters too, because it is where you become the person you are still growing into."
    }
];

const storage = {
    get(key, fallback) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : value;
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            // Ignore storage failures in private browsing or blocked storage contexts.
        }
    }
};

let currentPromptText = "";
let lastPromptIndex = -1;
let activeOverlay = null;
let previousFocus = null;
let promptsViewed = Number.parseInt(storage.get("promptsViewed", "0"), 10) || 0;
let promptChangeTimer = 0;

const dom = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
    dom.siteShell = document.querySelector(".site-shell");
    dom.promptDisplay = document.getElementById("prompt-display");
    dom.reflectButton = document.getElementById("reflect-button");
    dom.newPromptButton = document.getElementById("new-prompt-button");
    dom.lockedPrompt = document.getElementById("locked-prompt");
    dom.hiddenPromptInput = document.getElementById("hidden-prompt-input");
    dom.promptCount = document.getElementById("prompt-count");
    dom.shareStatus = document.getElementById("share-status");
    dom.year = document.getElementById("year");
    dom.reflectionText = document.getElementById("reflection-text");
    dom.reflectionCount = document.getElementById("reflection-count");
    dom.galleryList = document.getElementById("gallery-list");
    dom.themeToggle = document.querySelector("[data-theme-toggle]");
    dom.themeIcon = document.getElementById("theme-icon");

    bindEvents();
    renderGallery();
    initTheme();
    updatePromptCount();
    updateReflectionCount();
    dom.year.textContent = String(new Date().getFullYear());
    getRandomPrompt();
}

function bindEvents() {
    dom.newPromptButton.addEventListener("click", getRandomPrompt);
    dom.themeToggle.addEventListener("click", toggleTheme);
    dom.reflectionText.addEventListener("input", updateReflectionCount);

    document.querySelectorAll("[data-overlay-trigger]").forEach((button) => {
        button.addEventListener("click", () => openOverlay(button.dataset.overlayTrigger));
    });

    document.querySelectorAll("[data-close-overlay]").forEach((button) => {
        button.addEventListener("click", closeAllOverlays);
    });

    document.querySelectorAll(".overlay").forEach((overlay) => {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                closeAllOverlays();
            }
        });
    });

    document.querySelectorAll("[data-share]").forEach((button) => {
        button.addEventListener("click", () => socialShare(button.dataset.share));
    });

    document.addEventListener("keydown", handleGlobalKeydown);
}

function handleGlobalKeydown(event) {
    if (event.key === "Escape" && activeOverlay) {
        closeAllOverlays();
        return;
    }

    if (event.key === "Tab" && activeOverlay) {
        trapFocus(event);
    }
}

function trapFocus(event) {
    if (!activeOverlay) {
        return;
    }

    const focusable = getFocusableElements(activeOverlay);
    if (focusable.length === 0) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter((element) => {
        if (element.hasAttribute("hidden")) {
            return false;
        }

        if (element.classList.contains("honeypot")) {
            return false;
        }

        if (element.getAttribute("aria-hidden") === "true") {
            return false;
        }

        return element.tabIndex !== -1;
    });
}

function choosePromptIndex() {
    if (prompts.length <= 1) {
        return 0;
    }

    let nextIndex = lastPromptIndex;

    while (nextIndex === lastPromptIndex) {
        nextIndex = Math.floor(Math.random() * prompts.length);
    }

    return nextIndex;
}

function getRandomPrompt() {
    const nextIndex = choosePromptIndex();
    lastPromptIndex = nextIndex;
    currentPromptText = prompts[nextIndex];

    window.clearTimeout(promptChangeTimer);
    dom.promptDisplay.classList.add("is-fading");
    dom.newPromptButton.disabled = true;

    promptChangeTimer = window.setTimeout(() => {
        dom.promptDisplay.textContent = currentPromptText;
        dom.promptDisplay.classList.remove("is-fading");
        dom.reflectButton.disabled = false;
        dom.newPromptButton.disabled = false;
        syncPromptState();
        incrementPromptCount();
    }, 180);
}

function syncPromptState() {
    dom.lockedPrompt.textContent = currentPromptText;
    dom.hiddenPromptInput.value = currentPromptText;
}

function openOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay) {
        return;
    }

    if (id === "reflectOverlay" && !currentPromptText) {
        return;
    }

    if (activeOverlay && activeOverlay !== overlay) {
        closeAllOverlays({ restoreFocus: false });
    }

    if (id === "reflectOverlay") {
        syncPromptState();
    }

    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    activeOverlay = overlay;
    overlay.hidden = false;
    document.body.classList.add("overlay-open");
    dom.siteShell.classList.add("blurred");

    const focusable = getFocusableElements(overlay);
    if (focusable.length > 0) {
        focusable[0].focus();
    }
}

function closeAllOverlays(options = {}) {
    const { restoreFocus = true } = options;

    document.querySelectorAll(".overlay").forEach((overlay) => {
        overlay.hidden = true;
    });

    activeOverlay = null;
    document.body.classList.remove("overlay-open");
    dom.siteShell.classList.remove("blurred");

    if (restoreFocus && previousFocus) {
        previousFocus.focus();
    }
}

function renderGallery() {
    dom.galleryList.textContent = "";

    galleryEntries.forEach((entry) => {
        const entryDiv = document.createElement("article");
        entryDiv.className = "gallery-entry";

        const promptLine = document.createElement("span");
        promptLine.className = "gallery-reflecting-on";
        promptLine.textContent = `Reflecting on ${entry.prompt}`;

        const answer = document.createElement("p");
        answer.className = "gallery-answer";
        answer.textContent = `"${entry.answer}"`;

        entryDiv.append(promptLine, answer);
        dom.galleryList.appendChild(entryDiv);
    });
}

function socialShare(platform) {
    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(
        `I found this digital space for gratitude. Today's prompt: "${currentPromptText}"`
    );

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
        threads: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
        reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
    };

    if (platform === "copy") {
        copyLink(pageUrl);
        return;
    }

    const targetUrl = shareUrls[platform];
    if (!targetUrl) {
        return;
    }

    const newWindow = window.open(targetUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
        updateShareStatus("Sharing was blocked by the browser. You can use Copy Link instead.");
    } else {
        updateShareStatus("");
    }
}

async function copyLink(pageUrl) {
    try {
        await navigator.clipboard.writeText(pageUrl);
        updateShareStatus("Link copied to clipboard.");
    } catch {
        updateShareStatus("Copy failed. Please copy the address from your browser.");
    }
}

function updateShareStatus(message) {
    dom.shareStatus.textContent = message;
}

function incrementPromptCount() {
    promptsViewed += 1;
    storage.set("promptsViewed", String(promptsViewed));
    updatePromptCount();

    if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({
            path: "/event/prompt-delivered",
            title: "Prompt Delivered",
            event: true
        });
    }
}

function updatePromptCount() {
    dom.promptCount.textContent = promptsViewed.toLocaleString();
}

function updateReflectionCount() {
    const currentLength = dom.reflectionText.value.length;
    dom.reflectionCount.textContent = `${currentLength} / 2000`;
}

function initTheme() {
    const savedTheme = storage.get("theme", "");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");

    applyTheme(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    storage.set("theme", nextTheme);
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        dom.themeIcon.textContent = "Light";
        dom.themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
        document.documentElement.removeAttribute("data-theme");
        dom.themeIcon.textContent = "Dark";
        dom.themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
}
