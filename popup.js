document.getElementById("summarize").addEventListener("click", () => {
  const result = document.getElementById("result");
  const summaryType = document.getElementById("summary-type").value;

  // Show loader
  result.innerHTML = '<div class="loader"></div>';

  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      result.textContent =
        "Please set your Gemini API key. Click the gear icon to open options.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // First inject content.js
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"],
        },
        () => {
          // Then send message
          chrome.tabs.sendMessage(
            tab.id,
            { type: "GET_ARTICLE_TEXT" },
            async (response) => {
              if (chrome.runtime.lastError) {
                result.textContent =
                  "Error: " + chrome.runtime.lastError.message;
                return;
              }
              if (!response || !response.text) {
                result.textContent = "No article text found.";
                return;
              }

              try {
                const summary = await getGeminiSummary(
                  response.text,
                  summaryType,
                  geminiApiKey
                );
                result.textContent = summary;
              } catch (error) {
                result.textContent = "Error fetching summary: " + error.message;
              }
            }
          );
        }
      );
    });
  });
});

// Gemini API fetch
async function getGeminiSummary(rawText, type, apikey) {
  const max = 20000;
  const text = rawText.length > max ? rawText.slice(0, max) + "..." : rawText;

  const promptMap = {
    brief: `Summarize in 2-3 sentences:\n\n${text}`,
    detailed: `Give a detailed summary:\n\n${text}`,
    bullets: `Summarize in 5-7 bullet points (start each line with "- "):\n\n${text}`,
  };

  const prompt = promptMap[type] || promptMap.brief;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated."
  );
}

// Copy button
document.getElementById("copy-btn").addEventListener("click", () => {
  const txt = document.getElementById("result").innerText;
  if (!txt) return;

  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById("copy-btn");
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = old), 2000);
  });
});
