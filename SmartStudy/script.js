
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const span = document.createElement("span");
        span.textContent = " " + task.name;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;
}

addTaskBtn.addEventListener("click", function () {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a study task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    displayTasks();
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

displayTasks();

// POMODORO STUDY TIMER

let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Display timer
function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// Start button
startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    if (timeLeft === 0) {
        return;
    }

    timerInterval = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft === 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            alert("Congratulations! Study session completed! 🎉");
        }

    }, 1000);

});

// Pause button
pauseBtn.addEventListener("click", function () {

    clearInterval(timerInterval);
    timerInterval = null;

});

// Reset button
resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();

});

// Initial display
updateTimer();

// SUBJECT-WISE PROGRESS TRACKER

let subjects = JSON.parse(
    localStorage.getItem("studySubjects")
) || [];

const subjectInput = document.getElementById("subjectInput");
const percentageInput = document.getElementById("percentageInput");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectList = document.getElementById("subjectList");

// Save subjects
function saveSubjects() {
    localStorage.setItem("studySubjects", JSON.stringify(subjects));
}

// Display subjects
function displaySubjects() {

    subjectList.innerHTML = "";

    subjects.forEach((subject, index) => {

        const card = document.createElement("div");
        card.className = "subject-card";

        const heading = document.createElement("div");
        heading.className = "subject-heading";

        const title = document.createElement("h3");
        title.textContent = subject.name;

        const percentage = document.createElement("span");
        percentage.textContent = subject.progress + "%";

        heading.appendChild(title);
        heading.appendChild(percentage);

        const bar = document.createElement("div");
        bar.className = "progress-bar";

        const fill = document.createElement("div");
        fill.className = "progress-fill";
        fill.style.width = subject.progress + "%";

        bar.appendChild(fill);

        const actions = document.createElement("div");
        actions.className = "subject-actions";

        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+10%";

        increaseBtn.addEventListener("click", function () {
            subjects[index].progress = Math.min(
                100, subjects[index].progress + 10
            );
            saveSubjects();
            displaySubjects();
        });

        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-10%";

        decreaseBtn.addEventListener("click", function () {
            subjects[index].progress = Math.max(
                0, subjects[index].progress - 10
            );
            saveSubjects();
            displaySubjects();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-subject";

        deleteBtn.addEventListener("click", function () {
            subjects.splice(index, 1);
            saveSubjects();
            displaySubjects();
        });

        actions.appendChild(increaseBtn);
        actions.appendChild(decreaseBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(heading);
        card.appendChild(bar);
        card.appendChild(actions);

        subjectList.appendChild(card);
    });
}

// Add subject
addSubjectBtn.addEventListener("click", function () {

    const name = subjectInput.value.trim();
    const progress = Number(percentageInput.value);

    if (name === "") {
        alert("Please enter a subject name!");
        return;
    }

    if (percentageInput.value.trim() === "" ||
        !Number.isInteger(progress) ||
        progress < 0 || progress > 100) {
        alert("Enter a whole number between 0 and 100!");
        return;
    }

    subjects.push({
        name: name,
        progress: progress
    });

    subjectInput.value = "";
    percentageInput.value = "";

    saveSubjects();
    displaySubjects();
});

// Initial display
displaySubjects();

// DAILY STUDY GOALS

let goals = JSON.parse(
    localStorage.getItem("dailyStudyGoals")
) || [];

const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");

const goalProgressFill =
    document.getElementById("goalProgressFill");

const goalPercentage =
    document.getElementById("goalPercentage");

const motivationMessage =
    document.getElementById("motivationMessage");

// Save goals
function saveGoals() {
    localStorage.setItem(
        "dailyStudyGoals",
        JSON.stringify(goals)
    );
}

// Display goals
function displayGoals() {

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = goal.completed;

        checkbox.addEventListener("change", function () {
            goals[index].completed = checkbox.checked;
            saveGoals();
            displayGoals();
        });

        const span = document.createElement("span");
        span.textContent = goal.name;

        if (goal.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            goals.splice(index, 1);
            saveGoals();
            displayGoals();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        goalList.appendChild(li);
    });

    // Calculate progress
    const total = goals.length;

    const completed = goals.filter(
        goal => goal.completed
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    goalProgressFill.style.width = percentage + "%";

    goalPercentage.textContent =
        percentage + "% Completed (" +
        completed + "/" + total + ")";

    // Motivational messages
    if (total === 0) {
        motivationMessage.textContent =
            "Start your day with a goal! 🌟";
    }
    else if (percentage === 100) {
        motivationMessage.textContent =
            "Amazing! You completed all your goals! 🏆";
    }
    else if (percentage >= 50) {
        motivationMessage.textContent =
            "Great work! You are halfway there! 💪";
    }
    else {
        motivationMessage.textContent =
            "Keep going! Every small step matters! 🌱";
    }
}

// Add goal
addGoalBtn.addEventListener("click", function () {

    const name = goalInput.value.trim();

    if (name === "") {
        alert("Please enter a study goal!");
        return;
    }

    goals.push({
        name: name,
        completed: false
    });

    goalInput.value = "";

    saveGoals();
    displayGoals();
});

// Initial display
displayGoals();
// DARK MODE / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

// Check previously saved theme
let savedTheme = localStorage.getItem("studyTheme");

// Apply saved theme when website opens
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Update button text
function updateThemeButton() {
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
}

updateThemeButton();

// Switch between dark and light mode
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("studyTheme", "dark");
    } else {
        localStorage.setItem("studyTheme", "light");
    }

    updateThemeButton();

});
// EXAM COUNTDOWN

let exams = JSON.parse(localStorage.getItem("studyExams")) || [];

const examSubject = document.getElementById("examSubject");
const examDate = document.getElementById("examDate");
const addExamBtn = document.getElementById("addExamBtn");
const examList = document.getElementById("examList");
const examCount = document.getElementById("examCount");
const examMessage = document.getElementById("examMessage");

// Save exams in browser storage
function saveExams() {
    localStorage.setItem("studyExams", JSON.stringify(exams));
}

// Display exams
function displayExams() {

    examList.innerHTML = "";

    // Sort exams by date
    exams.sort((a, b) => a.date.localeCompare(b.date));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let upcomingCount = 0;

    exams.forEach((exam, index) => {

        const examDay = new Date(exam.date + "T00:00:00");

        const difference = Math.ceil(
            (examDay - today) / (1000 * 60 * 60 * 24)
        );

        const card = document.createElement("div");
        card.className = "exam-card";

        let countdownText;

        if (difference < 0) {
            countdownText = "Exam completed";
        } else if (difference === 0) {
            countdownText = "Exam is TODAY! 🎯";
            upcomingCount++;
        } else {
            countdownText = difference + " days remaining";
            upcomingCount++;
        }

        const details = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent = "📚 " + exam.subject;

        const dateText = document.createElement("p");
        dateText.textContent = "Exam Date: " + exam.date;

        const daysText = document.createElement("p");
        daysText.className = "exam-days";
        daysText.textContent = countdownText;

        details.appendChild(heading);
        details.appendChild(dateText);
        details.appendChild(daysText);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            exams.splice(index, 1);
            saveExams();
            displayExams();
        });

        card.appendChild(details);
        card.appendChild(deleteBtn);

        examList.appendChild(card);

    });

    examCount.textContent = upcomingCount + " Upcoming Exams";

    if (exams.length === 0) {
        examMessage.textContent = "Add your first exam and start preparing! 📖";
    } else if (upcomingCount === 0) {
        examMessage.textContent = "All your listed exams are completed! 🎉";
    } else {
        examMessage.textContent = "Stay focused. Your hard work will pay off! 💪";
    }
}

// Add new exam
addExamBtn.addEventListener("click", function () {

    const subject = examSubject.value.trim();
    const date = examDate.value;

    if (subject === "" || date === "") {
        alert("Please enter the subject and exam date!");
        return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert("Please select today or a future date!");
        return;
    }

    exams.push({
        subject: subject,
        date: date
    });

    saveExams();

    examSubject.value = "";
    examDate.value = "";

    displayExams();

});

displayExams();