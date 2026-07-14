// =================================
// GET AI QUIZ SETTINGS
// =================================

const savedSettings = JSON.parse(
    sessionStorage.getItem(
        "aiQuizSettings"
    )
);

if (!savedSettings) {
    window.location.href = "ai-quiz.html";
}