/**
 * APPLICATION CONTROLLER
 * Descriptive Text Practice - Great Athletes
 * SMA PLUS PGRI CIBINONG - 2026/2027
 */

// Application State
const state = {
  student: {
    name: "",
    classGrade: "X INT 1",
    studentNumber: "",
    dateCompleted: ""
  },
  currentScreen: "dashboard", // dashboard | theory | warmup | exam | result | certificate
  
  // Warmup Quiz State (Anthony Ginting - 5 Questions)
  warmUpAnswers: {},
  warmUpSubmitted: false,
  warmUpScore: 0,

  // Main Exam State (20 Questions - Thom Haye & Usain Bolt)
  examAnswers: {}, // { 1: "C", 6: ["A", "C"], ... }
  examFlagged: {}, // { 1: true, 5: false }
  currentQuestionIndex: 0,
  timeRemaining: 45 * 60, // 45 minutes in seconds
  timerInterval: null,
  examSubmitted: false,
  
  // Review Filter
  reviewFilter: "all", // all | wrong | correct

  // Results
  examScore: 0,
  skillsAnalysis: {},
  certificateId: ""
};

// DOM Content Loaded Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  renderTheoryContent();
  renderGlossary();
  syncProfileUI();
  navigateToScreen(state.currentScreen || "dashboard");
});

// ==========================================
// 1. SCREEN NAVIGATION & ROUTING
// ==========================================
function navigateToScreen(screenName) {
  // If user tries to open exam, warmup, result, or certificate without a name, prompt gently
  if ((screenName === "exam" || screenName === "warmup" || screenName === "result" || screenName === "certificate") && !state.student.name) {
    const entered = prompt("Please enter the student's full name first:");
    if (entered && entered.trim()) {
      state.student.name = entered.trim();
      syncProfileUI();
      saveStateToStorage();
    } else {
      if (screenName !== "theory") {
        alert("Please enter your name first on the Dashboard.");
        screenName = "dashboard";
      }
    }
  }

  // STRICT LOCK: Results and Certificate are locked until 20 questions are completed
  if ((screenName === "result" || screenName === "certificate") && !state.examSubmitted) {
    alert("🔒 ACCESS LOCKED:\nYou must complete and submit the 20 Main Test Questions before accessing the Results, Answer Explanations, or Certificate!");
    screenName = "exam";
  }

  state.currentScreen = screenName;
  
  const allScreens = ["dashboard", "theory", "warmup", "exam", "result", "certificate"];
  allScreens.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    const navBtn = document.getElementById(`nav-${s}`);
    
    if (el) {
      if (s === screenName) {
        el.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        el.classList.add("hidden");
      }
    }

    if (navBtn) {
      if (s === screenName) {
        navBtn.classList.add("active");
      } else {
        navBtn.classList.remove("active");
      }
    }
  });

  // Screen specific initializations
  if (screenName === "warmup") {
    renderWarmUpQuiz();
  } else if (screenName === "exam") {
    if (!state.examSubmitted && !state.timerInterval) {
      startExamTimer();
    }
    renderExamQuestion(state.currentQuestionIndex);
    renderQuestionGrid();
  } else if (screenName === "result") {
    if (state.examSubmitted) {
      renderScoreResults();
    }
  } else if (screenName === "certificate") {
    if (state.examSubmitted) {
      generateCertificateCanvas();
    }
  }

  updateCompletionBadges();
  saveStateToStorage();
}

function updateCompletionBadges() {
  const warmupBadge = document.getElementById("warmup-done-badge");
  const examBadge = document.getElementById("exam-done-badge");
  const resultLockBadge = document.getElementById("result-lock-badge");
  const certLockBadge = document.getElementById("cert-lock-badge");
  const card4LockBadge = document.getElementById("card4-lock-badge");

  if (warmupBadge) {
    if (state.warmUpSubmitted) warmupBadge.classList.remove("hidden");
    else warmupBadge.classList.add("hidden");
  }

  if (examBadge) {
    if (state.examSubmitted) examBadge.classList.remove("hidden");
    else examBadge.classList.add("hidden");
  }

  if (resultLockBadge) {
    if (state.examSubmitted) {
      resultLockBadge.textContent = "✓ Available";
      resultLockBadge.className = "text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full";
    } else {
      resultLockBadge.textContent = "🔒 Locked";
      resultLockBadge.className = "text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-full";
    }
  }

  if (certLockBadge) {
    if (state.examSubmitted) {
      certLockBadge.textContent = "✓ Available";
      certLockBadge.className = "text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full";
    } else {
      certLockBadge.textContent = "🔒 Locked";
      certLockBadge.className = "text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-full";
    }
  }

  if (card4LockBadge) {
    if (state.examSubmitted) {
      card4LockBadge.innerHTML = `<span class="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">✓ Available</span>`;
    } else {
      card4LockBadge.innerHTML = `<span class="text-amber-800 bg-amber-50 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">🔒 Locked until test submitted</span>`;
    }
  }
}

// ==========================================
// 2. PROFILE MANAGEMENT
// ==========================================
function syncProfileUI() {
  const badgeCard = document.getElementById("student-badge-card");
  const badgeName = document.getElementById("badge-name");
  const badgeClass = document.getElementById("badge-class");

  const dashName = document.getElementById("dash-student-name");
  const dashClass = document.getElementById("dash-student-class");

  if (state.student.name) {
    if (badgeCard) badgeCard.classList.remove("hidden");
    if (badgeName) badgeName.textContent = state.student.name;
    if (badgeClass) badgeClass.textContent = state.student.classGrade;
    if (dashName) dashName.value = state.student.name;
    if (dashClass) dashClass.value = state.student.classGrade;
  } else {
    if (badgeCard) badgeCard.classList.add("hidden");
  }
}

function saveProfileFromDashboard() {
  const nameInput = document.getElementById("dash-student-name");
  const classInput = document.getElementById("dash-student-class");

  if (!nameInput.value.trim()) {
    alert("Please enter the student's full name.");
    nameInput.focus();
    return;
  }

  state.student.name = nameInput.value.trim();
  state.student.classGrade = classInput.value;
  syncProfileUI();
  saveStateToStorage();
  alert("Profile saved successfully! You may now select any learning or practice module.");
}

function editStudentProfileModal() {
  const modal = document.getElementById("profile-modal");
  const nameInput = document.getElementById("modal-student-name");
  const classInput = document.getElementById("modal-student-class");
  const numInput = document.getElementById("modal-student-num");

  if (nameInput) nameInput.value = state.student.name || "";
  if (classInput) classInput.value = state.student.classGrade || "X INT 1";
  if (numInput) numInput.value = state.student.studentNumber || "";

  if (modal) modal.classList.remove("hidden");
}

function closeStudentProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (modal) modal.classList.add("hidden");
}

function saveStudentProfileModal() {
  const nameInput = document.getElementById("modal-student-name");
  const classInput = document.getElementById("modal-student-class");
  const numInput = document.getElementById("modal-student-num");

  if (!nameInput.value.trim()) {
    alert("Please enter the student's full name.");
    nameInput.focus();
    return;
  }

  state.student.name = nameInput.value.trim();
  state.student.classGrade = classInput.value;
  state.student.studentNumber = numInput.value.trim();

  syncProfileUI();
  saveStateToStorage();
  closeStudentProfileModal();
  
  if (state.currentScreen === "certificate") {
    generateCertificateCanvas();
  } else if (state.currentScreen === "result") {
    renderScoreResults();
  }
}

// LocalStorage Persistence
function saveStateToStorage() {
  try {
    localStorage.setItem("desc_text_practice_state_v2", JSON.stringify(state));
  } catch (e) {
    console.warn("LocalStorage save error", e);
  }
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem("desc_text_practice_state_v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.student) state.student = { ...state.student, ...parsed.student };
      if (parsed.warmUpAnswers) state.warmUpAnswers = parsed.warmUpAnswers;
      if (parsed.warmUpSubmitted) state.warmUpSubmitted = parsed.warmUpSubmitted;
      if (parsed.warmUpScore !== undefined) state.warmUpScore = parsed.warmUpScore;
      if (parsed.examAnswers) state.examAnswers = parsed.examAnswers;
      if (parsed.examFlagged) state.examFlagged = parsed.examFlagged;
      if (parsed.examSubmitted) state.examSubmitted = parsed.examSubmitted;
      if (parsed.examScore !== undefined) state.examScore = parsed.examScore;
      if (parsed.skillsAnalysis) state.skillsAnalysis = parsed.skillsAnalysis;
      if (parsed.certificateId) state.certificateId = parsed.certificateId;
      
      // Safety guard: do not allow result or certificate screen on startup if exam is not submitted
      if (!state.examSubmitted && (state.currentScreen === "result" || state.currentScreen === "certificate")) {
        state.currentScreen = "dashboard";
      }
    }
  } catch (e) {
    console.warn("LocalStorage load error", e);
  }
}

// ==========================================
// 3. THEORY & GLOSSARY RENDERER
// ==========================================
function renderTheoryContent() {
  const theoryContainer = document.getElementById("theory-container");
  if (!theoryContainer) return;

  const t = APP_DATA.theory;

  theoryContainer.innerHTML = `
    <!-- Generic Structure Section -->
    <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
      <div class="flex items-center gap-3 mb-6">
        <span class="p-3 bg-blue-100 text-blue-700 rounded-2xl text-2xl font-bold">📖</span>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">1. Generic Structure of Descriptive Text</h3>
          <p class="text-slate-500 text-xs sm:text-sm">Standard structural stages of descriptive texts about Great Athletes</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${t.descriptiveText.genericStructure.map(gs => `
          <div class="p-5 rounded-2xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 transition-all">
            <h4 class="text-base font-bold text-blue-900 mb-2">${gs.part}</h4>
            <p class="text-slate-700 text-xs sm:text-sm mb-3">${gs.description}</p>
            <div class="p-3 bg-white rounded-xl border border-blue-200/60 text-xs text-slate-600 italic">
              <strong>Example Excerpt:</strong> "${gs.example}"
            </div>
          </div>
        `).join("")}
      </div>

      <div class="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <h5 class="font-bold text-slate-800 text-xs sm:text-sm mb-2 flex items-center gap-2">
          <span>✨</span> Key Language Features:
        </h5>
        <ul class="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1">
          ${t.descriptiveText.languageFeatures.map(lf => `<li>${lf}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Adjective vs Adverb Deep Dive -->
    <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
      <div class="flex items-center gap-3 mb-6">
        <span class="p-3 bg-emerald-100 text-emerald-700 rounded-2xl text-2xl font-bold">⚖️</span>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">2. Language Focus: Adjectives vs Adverbs</h3>
          <p class="text-slate-500 text-xs sm:text-sm">Distinguishing Adjectives and Adverbs in Athlete Descriptions</p>
        </div>
      </div>

      <p class="text-slate-600 text-xs sm:text-sm mb-6">${t.adjectivesVsAdverbs.explanation}</p>

      <!-- Comparison Table -->
      <div class="overflow-x-auto rounded-2xl border border-slate-200 mb-8">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="bg-slate-100 text-slate-700 font-bold">
            <tr>
              <th class="p-4 border-b border-slate-200">Grammar Element</th>
              <th class="p-4 border-b border-slate-200 bg-blue-50/70 text-blue-900">ADJECTIVE</th>
              <th class="p-4 border-b border-slate-200 bg-emerald-50/70 text-emerald-900">ADVERB</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            ${t.adjectivesVsAdverbs.comparisonTable.map(row => `
              <tr class="hover:bg-slate-50">
                <td class="p-4 font-semibold text-slate-800">${row.element}</td>
                <td class="p-4 text-slate-700 bg-blue-50/30">${row.adjective}</td>
                <td class="p-4 text-slate-700 bg-emerald-50/30">${row.adverb}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Real Context Examples from Athlete Passages -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${t.adjectivesVsAdverbs.examplesFromAthletes.map((cat, idx) => `
          <div class="p-5 rounded-2xl border ${idx === 0 ? 'border-blue-200 bg-blue-50/30' : 'border-emerald-200 bg-emerald-50/30'}">
            <h4 class="font-bold text-sm sm:text-base mb-4 ${idx === 0 ? 'text-blue-900' : 'text-emerald-900'} flex items-center justify-between">
              <span>${cat.type}</span>
              <span class="text-xs px-2.5 py-1 rounded-full bg-white font-semibold shadow-2xs">${cat.items.length} Examples</span>
            </h4>
            <div class="space-y-3">
              ${cat.items.map(item => `
                <div class="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-sm ${idx === 0 ? 'text-blue-600' : 'text-emerald-600'}">${item.word}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">${item.category}</span>
                  </div>
                  <p class="text-xs text-slate-600">${item.sentence}</p>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderGlossary() {
  const container = document.getElementById("glossary-container");
  if (!container) return;
  const gb = APP_DATA.theory.vocabularyBank;

  container.innerHTML = gb.map(item => `
    <div class="p-4 bg-slate-50/60 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-white transition-all shadow-2xs">
      <div class="flex items-center justify-between mb-1.5">
        <span class="font-bold text-slate-800 text-sm">${item.term}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${item.pos.includes('Adjective') ? 'bg-blue-100 text-blue-700' : item.pos.includes('Adverb') ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}">${item.pos}</span>
      </div>
      <p class="text-xs font-semibold text-slate-700 mb-2">${item.meaning}</p>
      <p class="text-[11px] text-slate-500 italic bg-white p-2 rounded-xl border border-slate-100">"${item.context}"</p>
    </div>
  `).join("");
}

// ==========================================
// 4. WARM-UP QUIZ (ANTHONY GINTING - 5 QUESTIONS)
// ==========================================
function renderWarmUpQuiz() {
  const wu = APP_DATA.warmUp;
  document.getElementById("warmup-text-container").innerHTML = `
    <div class="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-sm mb-6">
      <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <h4 class="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
          <span>🏸</span> Descriptive Reading: Anthony Sinisuka Ginting
        </h4>
        <button onclick="speakText('warmup-reading-passage')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all">
          <span>🔊</span> Listen Passage
        </button>
      </div>
      <p id="warmup-reading-passage" class="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line text-justify">${wu.text}</p>
    </div>
  `;

  const qContainer = document.getElementById("warmup-questions-container");
  qContainer.innerHTML = wu.questions.map((q, idx) => {
    const selected = state.warmUpAnswers[q.id];
    const isSubmitted = state.warmUpSubmitted;
    
    return `
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm ${isSubmitted ? (selected === q.correctAnswer ? 'border-l-6 border-l-emerald-500' : 'border-l-6 border-l-rose-500') : ''}">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Warm-Up Question ${idx + 1} of 5</span>
          ${isSubmitted ? (selected === q.correctAnswer ? '<span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">✓ Correct (+20)</span>' : '<span class="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">✗ Incorrect</span>') : ''}
        </div>
        
        <h4 class="font-bold text-slate-900 text-sm sm:text-base mb-4">${q.question}</h4>
        
        <div class="space-y-2.5">
          ${q.options.map(opt => {
            const optLetter = opt.charAt(0);
            const isOptSelected = selected === optLetter;
            let optClass = "border-slate-200 bg-white hover:bg-slate-50";
            
            if (isSubmitted) {
              if (optLetter === q.correctAnswer) {
                optClass = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
              } else if (isOptSelected && optLetter !== q.correctAnswer) {
                optClass = "border-rose-300 bg-rose-50 text-rose-900";
              }
            } else if (isOptSelected) {
              optClass = "border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-600";
            }

            return `
              <div onclick="${isSubmitted ? '' : `selectWarmUpOption('${q.id}', '${optLetter}')`}" 
                   class="option-box p-3.5 rounded-2xl border ${optClass} transition-all cursor-pointer flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${isOptSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 bg-slate-50 text-slate-600'}">
                  ${optLetter}
                </span>
                <span class="text-xs sm:text-sm text-slate-700">${opt.substring(3)}</span>
              </div>
            `;
          }).join("")}
        </div>

        ${isSubmitted ? `
          <div class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong class="text-slate-900">💡 Explanation:</strong> ${q.explanation}
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  // Button state
  const submitBtn = document.getElementById("warmup-submit-btn");
  const nextBtn = document.getElementById("warmup-next-btn");
  if (state.warmUpSubmitted) {
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
}

function selectWarmUpOption(qId, letter) {
  state.warmUpAnswers[qId] = letter;
  renderWarmUpQuiz();
  saveStateToStorage();
}

function submitWarmUpQuiz() {
  const answeredCount = Object.keys(state.warmUpAnswers).length;
  if (answeredCount < 5) {
    if (!confirm(`You have answered ${answeredCount} out of 5 questions. Would you like to check your answers now?`)) {
      return;
    }
  }

  state.warmUpSubmitted = true;
  let correct = 0;
  APP_DATA.warmUp.questions.forEach(q => {
    if (state.warmUpAnswers[q.id] === q.correctAnswer) {
      correct++;
    }
  });
  state.warmUpScore = (correct / 5) * 100;
  
  renderWarmUpQuiz();
  updateCompletionBadges();
  saveStateToStorage();

  const feedbackBanner = document.getElementById("warmup-feedback-banner");
  if (feedbackBanner) {
    feedbackBanner.classList.remove("hidden");
    feedbackBanner.innerHTML = `
      <div class="p-5 bg-emerald-100/80 border border-emerald-300 rounded-3xl text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 shadow-sm">
        <div>
          <span class="font-extrabold text-base">🎉 Warm-Up Completed! Score: ${state.warmUpScore}/100</span>
          <p class="text-xs text-emerald-800 mt-0.5">You got ${correct} out of 5 questions correct. Review the detailed explanations below!</p>
        </div>
        <button onclick="navigateToScreen('exam')" class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition-all whitespace-nowrap">
          Proceed to 20 Main Questions ➔
        </button>
      </div>
    `;
  }
}

function resetWarmUpQuiz() {
  if (confirm("Reset this 5-question warm-up and try again from the start?")) {
    state.warmUpAnswers = {};
    state.warmUpSubmitted = false;
    state.warmUpScore = 0;
    const banner = document.getElementById("warmup-feedback-banner");
    if (banner) banner.classList.add("hidden");
    renderWarmUpQuiz();
    updateCompletionBadges();
    saveStateToStorage();
  }
}

// ==========================================
// 5. MAIN PRACTICE EXAM (20 QUESTIONS)
// ==========================================
function renderExamQuestion(index) {
  state.currentQuestionIndex = index;
  const questions = APP_DATA.mainExam.questions;
  const q = questions[index];
  if (!q) return;

  // Question Header info
  document.getElementById("exam-q-number").textContent = `Question No. ${q.number} of 20`;
  document.getElementById("exam-q-skill").textContent = `Skill: ${q.skill}`;
  
  const typeBadge = document.getElementById("exam-q-type-badge");
  if (q.type === "mcma") {
    typeBadge.textContent = "Multiple Choice Multiple Answer (Choose 2 Correct)";
    typeBadge.className = "text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200";
  } else {
    typeBadge.textContent = "Single Choice (1 Correct Answer)";
    typeBadge.className = "text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200";
  }

  // Reading Passage side-by-side
  const textData = APP_DATA.mainExam.texts[q.textRef];
  document.getElementById("reading-passage-title").textContent = textData.title;
  document.getElementById("reading-passage-content").innerHTML = textData.content.replace(/\n\n/g, '<br><br>');

  // Question Text
  document.getElementById("exam-question-text").textContent = q.question;

  // Render Options
  const currentAnswer = state.examAnswers[q.number];
  const optionsContainer = document.getElementById("exam-options-container");
  
  optionsContainer.innerHTML = q.options.map(opt => {
    const letter = opt.charAt(0);
    let isSelected = false;

    if (q.type === "mcma") {
      isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(letter);
    } else {
      isSelected = currentAnswer === letter;
    }

    return `
      <div onclick="selectExamOption(${q.number}, '${letter}', '${q.type}')"
           class="option-box p-4 rounded-2xl border ${isSelected ? 'selected' : 'border-slate-200 bg-white'} flex items-center gap-3.5">
        <div class="option-letter w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 bg-slate-50 text-slate-600'}">
          ${letter}
        </div>
        <div class="text-xs sm:text-sm text-slate-800 leading-snug">${opt.substring(3)}</div>
      </div>
    `;
  }).join("");

  // Flag button
  const flagBtn = document.getElementById("flag-question-btn");
  if (state.examFlagged[q.number]) {
    flagBtn.classList.add("bg-amber-100", "text-amber-800", "border-amber-300");
    flagBtn.innerHTML = `🚩 Flagged (Marked)`;
  } else {
    flagBtn.classList.remove("bg-amber-100", "text-amber-800", "border-amber-300");
    flagBtn.innerHTML = `🏳️ Flag for Review`;
  }

  // Prev / Next Buttons
  document.getElementById("prev-q-btn").disabled = index === 0;
  
  const nextBtn = document.getElementById("next-q-btn");
  if (index === questions.length - 1) {
    nextBtn.textContent = "Finish & Submit ✨";
    nextBtn.classList.remove("bg-blue-600", "hover:bg-blue-700");
    nextBtn.classList.add("bg-emerald-600", "hover:bg-emerald-700");
  } else {
    nextBtn.textContent = "Next Question ➔";
    nextBtn.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
    nextBtn.classList.add("bg-blue-600", "hover:bg-blue-700");
  }

  renderQuestionGrid();
}

function selectExamOption(qNumber, letter, type) {
  if (type === "mcma") {
    let current = state.examAnswers[qNumber] || [];
    if (!Array.isArray(current)) current = [current];

    if (current.includes(letter)) {
      current = current.filter(item => item !== letter);
    } else {
      if (current.length < 2) {
        current.push(letter);
      } else {
        current.shift();
        current.push(letter);
      }
    }
    state.examAnswers[qNumber] = current;
  } else {
    state.examAnswers[qNumber] = letter;
  }

  renderExamQuestion(state.currentQuestionIndex);
  saveStateToStorage();
}

function toggleFlagCurrentQuestion() {
  const qNum = APP_DATA.mainExam.questions[state.currentQuestionIndex].number;
  state.examFlagged[qNum] = !state.examFlagged[qNum];
  renderExamQuestion(state.currentQuestionIndex);
}

function nextQuestion() {
  if (state.currentQuestionIndex < APP_DATA.mainExam.questions.length - 1) {
    renderExamQuestion(state.currentQuestionIndex + 1);
  } else {
    confirmSubmitExam();
  }
}

function prevQuestion() {
  if (state.currentQuestionIndex > 0) {
    renderExamQuestion(state.currentQuestionIndex - 1);
  }
}

function renderQuestionGrid() {
  const gridContainer = document.getElementById("question-nav-grid");
  if (!gridContainer) return;

  const questions = APP_DATA.mainExam.questions;
  gridContainer.innerHTML = questions.map((q, idx) => {
    const isAnswered = state.examAnswers[q.number] && (
      (q.type === 'single' && state.examAnswers[q.number]) ||
      (q.type === 'mcma' && state.examAnswers[q.number].length > 0)
    );
    const isFlagged = state.examFlagged[q.number];
    const isCurrent = state.currentQuestionIndex === idx;

    let statusClass = "empty";
    if (isFlagged) {
      statusClass = "flagged";
    } else if (isAnswered) {
      statusClass = "done";
    }

    return `
      <button onclick="renderExamQuestion(${idx})" 
              class="grid-q-btn ${statusClass} ${isCurrent ? 'current' : ''}">
        ${q.number}
      </button>
    `;
  }).join("");

  // Counter Summary
  let answeredCount = 0;
  questions.forEach(q => {
    const ans = state.examAnswers[q.number];
    if (ans && ((q.type === 'single' && ans) || (q.type === 'mcma' && ans.length > 0))) {
      answeredCount++;
    }
  });
  document.getElementById("exam-progress-text").textContent = `${answeredCount} / 20 Answered`;
  document.getElementById("exam-progress-bar").style.width = `${(answeredCount / 20) * 100}%`;
}

// Timer Logic
function startExamTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      alert("Time is up! Your answers will be automatically submitted.");
      submitMainExam();
    }
    updateTimerDisplay();
  }, 1000);
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("exam-timer-display");
  if (!timerEl) return;
  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;
  timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function confirmSubmitExam() {
  let answeredCount = 0;
  APP_DATA.mainExam.questions.forEach(q => {
    const ans = state.examAnswers[q.number];
    if (ans && ((q.type === 'single' && ans) || (q.type === 'mcma' && ans.length > 0))) {
      answeredCount++;
    }
  });

  const unAnswered = 20 - answeredCount;
  let confirmMessage = `Are you sure you want to finish and submit your test?`;
  if (unAnswered > 0) {
    confirmMessage = `You still have ${unAnswered} unanswered question(s). Are you sure you want to submit now?`;
  }

  if (confirm(confirmMessage)) {
    if (state.timerInterval) clearInterval(state.timerInterval);
    submitMainExam();
  }
}

function submitMainExam() {
  state.examSubmitted = true;
  state.student.dateCompleted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  state.certificateId = `CERT-SPP-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  // Calculate Scores (5 points per question = 100 total)
  let totalScore = 0;
  const skills = {};

  APP_DATA.mainExam.questions.forEach(q => {
    if (!skills[q.skill]) {
      skills[q.skill] = { total: 0, correct: 0 };
    }
    skills[q.skill].total++;

    const studentAns = state.examAnswers[q.number];
    let isCorrect = false;

    if (q.type === "single") {
      if (studentAns === q.correctAnswer) {
        totalScore += 5;
        isCorrect = true;
      }
    } else if (q.type === "mcma") {
      const correctArray = q.correctAnswer;
      if (Array.isArray(studentAns) && studentAns.length === 2) {
        const matches = studentAns.filter(opt => correctArray.includes(opt)).length;
        if (matches === 2) {
          totalScore += 5;
          isCorrect = true;
        } else if (matches === 1) {
          totalScore += 2.5; // Partial points
        }
      }
    }

    if (isCorrect) {
      skills[q.skill].correct++;
    }
  });

  state.examScore = Math.round(totalScore);
  state.skillsAnalysis = skills;
  
  updateCompletionBadges();
  saveStateToStorage();
  navigateToScreen("result");
}

function retakeMainExam() {
  if (confirm("Would you like to restart the 20-question test from the beginning?")) {
    state.examAnswers = {};
    state.examFlagged = {};
    state.currentQuestionIndex = 0;
    state.timeRemaining = 45 * 60;
    state.examSubmitted = false;
    navigateToScreen("exam");
  }
}

// ==========================================
// 6. SCORE & REVIEW RENDERER
// ==========================================
function renderScoreResults() {
  const score = state.examScore;
  document.getElementById("res-student-name").textContent = state.student.name || "Student Name";
  document.getElementById("res-student-class").textContent = `${state.student.classGrade} ${state.student.studentNumber ? `(Student No: ${state.student.studentNumber})` : ''}`;
  document.getElementById("res-final-score").textContent = score;

  let grade = "A";
  let predicate = "Distinction (Mastery / Excellent)";
  let badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
  
  if (score >= 85) {
    grade = "A";
    predicate = "Distinction (Mastery / Excellent)";
    badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
  } else if (score >= 75) {
    grade = "B";
    predicate = "Proficient (Good)";
    badgeClass = "bg-blue-100 text-blue-800 border-blue-300";
  } else if (score >= 65) {
    grade = "C";
    predicate = "Satisfactory";
    badgeClass = "bg-amber-100 text-amber-800 border-amber-300";
  } else {
    grade = "D";
    predicate = "Needs Improvement";
    badgeClass = "bg-rose-100 text-rose-800 border-rose-300";
  }

  const gradeBadge = document.getElementById("res-grade-badge");
  gradeBadge.textContent = `Grade ${grade} — ${predicate}`;
  gradeBadge.className = `inline-block px-5 py-2 rounded-full text-sm font-bold border ${badgeClass}`;

  // Skills Breakdown Chart / Bars
  const skillsContainer = document.getElementById("skills-breakdown-container");
  if (skillsContainer) {
    skillsContainer.innerHTML = Object.keys(state.skillsAnalysis).map(skillName => {
      const data = state.skillsAnalysis[skillName];
      const percent = Math.round((data.correct / data.total) * 100);
      return `
        <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div class="flex justify-between text-xs font-bold mb-1.5">
            <span class="text-slate-800">${skillName}</span>
            <span class="text-blue-600 font-extrabold">${data.correct} / ${data.total} (${percent}%)</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }
}

// ==========================================
// 7. CERTIFICATE GENERATOR (CANVAS & PRINT)
// ==========================================
function generateCertificateCanvas() {
  const canvas = document.getElementById("certificate-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Landscape Dimensions (1920 x 1080)
  canvas.width = 1920;
  canvas.height = 1080;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.5, "#f8fafc");
  grad.addColorStop(1, "#eff6ff");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Outer Navy Border
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 26;
  ctx.strokeRect(30, 30, 1920 - 60, 1080 - 60);

  // Inner Gold Border
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 4;
  ctx.strokeRect(55, 55, 1920 - 110, 1080 - 110);

  // Corner decorations
  drawCornerDecorations(ctx);

  // School Header
  ctx.textAlign = "center";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 34px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("SMA PLUS PGRI CIBINONG", 960, 130);

  ctx.fillStyle = "#475569";
  ctx.font = "600 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("ACCREDITED 'A' — BOGOR REGENCY • ACADEMIC YEAR 2026/2027", 960, 165);

  // Divider
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(400, 190);
  ctx.lineTo(1520, 190);
  ctx.stroke();

  // Certificate Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "italic bold 64px 'Playfair Display', serif";
  ctx.fillText("Certificate of Achievement", 960, 275);

  ctx.fillStyle = "#64748b";
  ctx.font = "500 24px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("THIS CERTIFICATE IS PROUDLY PRESENTED TO:", 960, 330);

  // Student Name
  ctx.fillStyle = "#1d4ed8";
  ctx.font = "bold 58px 'Playfair Display', serif";
  ctx.fillText(state.student.name || "Student Name", 960, 420);

  // Underline for student name
  ctx.strokeStyle = "#93c5fd";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(560, 445);
  ctx.lineTo(1360, 445);
  ctx.stroke();

  // Student Class & Date
  ctx.fillStyle = "#334155";
  ctx.font = "24px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(`Class: ${state.student.classGrade} | Examination Date: ${state.student.dateCompleted || '7 September 2026'}`, 960, 490);

  ctx.font = "22px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("has successfully completed the comprehensive competency evaluation on:", 960, 545);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 28px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("CHAPTER 1: GREAT ATHLETES — DESCRIPTIVE TEXT & LANGUAGE FEATURES", 960, 595);

  // Score Box
  drawScoreBox(ctx, state.examScore);

  // Signatures
  // Left: Teacher
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("English Department Teacher", 400, 890);
  ctx.font = "18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("SMA Plus PGRI Cibinong", 400, 920);

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(250, 860);
  ctx.lineTo(550, 860);
  ctx.stroke();

  // Right: Academic Division
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Academic Curriculum Division", 1520, 890);
  ctx.font = "18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Digital Learning Center", 1520, 920);

  ctx.beginPath();
  ctx.moveTo(1370, 860);
  ctx.lineTo(1670, 860);
  ctx.stroke();

  // Center: Gold Seal Emblem
  drawGoldSeal(ctx, 960, 870, 75);

  // Footer Certificate Serial ID
  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px 'Space Grotesk', monospace";
  ctx.fillText(`VERIFIED ID: ${state.certificateId || 'CERT-SPP-2026-XINT'} • ISSUED BY ENGLISH LEARNING PORTAL`, 960, 1020);
}

function drawCornerDecorations(ctx) {
  const corners = [
    { x: 65, y: 65, dx: 1, dy: 1 },
    { x: 1855, y: 65, dx: -1, dy: 1 },
    { x: 65, y: 1015, dx: 1, dy: -1 },
    { x: 1855, y: 1015, dx: -1, dy: -1 }
  ];

  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 3;

  corners.forEach(c => {
    ctx.beginPath();
    ctx.moveTo(c.x, c.y + c.dy * 40);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(c.x + c.dx * 40, c.y);
    ctx.stroke();
  });
}

function drawScoreBox(ctx, score) {
  const x = 960 - 240;
  const y = 640;
  const w = 480;
  const h = 110;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 44px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(`FINAL SCORE: ${score} / 100`, 960, 700);

  let predicateText = score >= 85 ? "GRADE A (DISTINCTION)" : score >= 75 ? "GRADE B (PROFICIENT)" : score >= 65 ? "GRADE C (SATISFACTORY)" : "COMPLETED";
  ctx.fillStyle = "#059669";
  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(predicateText, 960, 730);
}

function drawGoldSeal(ctx, x, y, radius) {
  const sealGrad = ctx.createRadialGradient(x, y, 10, x, y, radius);
  sealGrad.addColorStop(0, "#fde68a");
  sealGrad.addColorStop(0.7, "#d97706");
  sealGrad.addColorStop(1, "#78350f");

  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("OFFICIAL", x, y - 10);
  ctx.fillText("EXCELLENCE", x, y + 14);
}

function downloadCertificateImage() {
  const canvas = document.getElementById("certificate-canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = `Certificate_${state.student.name.replace(/\s+/g, '_')}_${state.student.classGrade}.png`;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}

function printCertificate() {
  window.print();
}

function shareViaWhatsApp() {
  const text = `*COMPETENCY EVALUATION REPORT: DESCRIPTIVE TEXT (GREAT ATHLETES)*%0A` +
               `*SMA PLUS PGRI CIBINONG - ACADEMIC YEAR 2026/2027*%0A%0A` +
               `👤 *Student Name:* ${state.student.name}%0A` +
               `🏫 *Class:* ${state.student.classGrade} ${state.student.studentNumber ? `(Student No: ${state.student.studentNumber})` : ''}%0A` +
               `📊 *Final Score:* ${state.examScore} / 100%0A` +
               `📅 *Date Completed:* ${state.student.dateCompleted}%0A` +
               `🆔 *Certificate ID:* ${state.certificateId}%0A%0A` +
               `_Official digital Certificate of Achievement has been issued._`;
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// Text-to-Speech
function speakText(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText || el.textContent;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("This browser does not support Text-to-Speech.");
  }
}
