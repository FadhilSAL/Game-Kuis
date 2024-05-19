document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
  });
  
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAppElement = document.getElementById('quiz-app');
  const resultsElement = document.createElement('div');
  resultsElement.setAttribute('id', 'results');
  resultsElement.classList.add('results', 'hide');
  quizAppElement.appendChild(resultsElement);
  
  let shuffledQuestions, currentQuestionIndex;
  let score = 0;
  
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  
  function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
  }
  
  function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
  
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
  
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 1000); // Adjust delay as needed
   
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
  
    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Selesai!</h2>
        <p> Score Anda: ${score} dari ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Main Lagi</button>
    `;
    quizAppElement.appendChild(resultsElement);
  }
  
  function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
  }
  
  const questions = [
    {
        question: "Siapa Pendiri Perusahaan Amazon",
        answers: [
            { text: "Steve Jobs", correct: false },
            { text: "Jeffrey Bezos", correct: true },
            { text: "Elon Musk", correct: false },
            { text: "Sergey Brin", correct: false }
        ]
    },
    {
        question: "Apa Bintang Terbesar Di Alam Semesta",
        answers: [
            { text: "Matahari", correct: false },
            { text: "Uy Scuti", correct: false },
            { text: "VY Canis Major", correct: false },
            { text: "Stephenson", correct: true }
        ]
    },
    {
        question: "Apa Senjata Anti-Tank Buatan Amerika",
        answers: [
            { text: "Sks", correct: false },
            { text: "Ak47", correct: false },
            { text: "FGM-148 Javelin", correct: true },
            { text: "FIM-92 Stinger", correct: false }
        ]
    },
    {
        question: "Siapa Pemilik PT Djarum",
        answers: [
            { text: "Sri Prakash Lohia", correct: false },
            { text: "Hartono Bersaudara", correct: true },
            { text: "Keluarga Wijaya", correct: false },
            { text: "Anthoni Salim", correct: false }
        ]
    },
    {
        question: "Siapa Bapak Kedokteran Dunia",
        answers: [
            { text: "Nikola Tesla", correct: false },
            { text: "Ibnu Sina", correct: true },
            { text: "Thomas", correct: false },
            { text: "Albert Einstein", correct: false }
        ]
    },
    {
        question: "Nabi Yang Tidak Termasuk 25 Nabi Dan Rasul",
        answers: [
            { text: "Syits/Seth", correct: true },
            { text: "Musa", correct: false },
            { text: "Muhammad", correct: false },
            { text: "Zakaria", correct: false }
        ]
    },
    {
        question: "Harimau Adalah Binatang",
        answers: [
            { text: "Omnivora", correct: false },
            { text: "Herbivora", correct: false },
            { text: "Karnivora", correct: true },
            { text: "Kanibal", correct: false }
        ]
    },
    {
        question: "Apa Bahan Kimia Yang Digunakan Untuk Pembuatan Nuklir",
        answers: [
            { text: "Emas", correct: false },
            { text: "Kangkung", correct: false },
            { text: "Plutonium", correct: true },
            { text: "Batu", correct: false }
        ]
    },
    {
        question: "Siapa Pemimpin Partai Fasis Italia",
        answers: [
            { text: "A.Hitler", correct: false },
            { text: "Benito Musollini", correct: true },
            { text: "Vladimir Lenin", correct: false },
            { text: "Megawati", correct: false }
        ]
    },
    {
        question:"Apa Nama  Unsur Kimia Emas",
        answers: [
            { text: "Hg", correct: false },
            { text: "Pt", correct: false },
            { text: "Au", correct: true },
            { text: "Em", correct: false }
        ]
    }
  ];