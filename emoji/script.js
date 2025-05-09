// List of emojis for the game
const emojis = [
    { emoji: "🌳", name: "tree" },
    { emoji: "😊", name: "smiling face" },
    { emoji: "😂", name: "laughing face" },
    { emoji: "🐶", name: "dog" },
    { emoji: "🍎", name: "apple" },
    { emoji: "🚗", name: "car" },
    { emoji: "🌞", name: "sun" },
    { emoji: "⚽", name: "soccer ball" },
    { emoji: "🎈", name: "balloon" },
    { emoji: "🍕", name: "pizza" }
  ];
  
  const promptDiv = document.getElementById('prompt');
  const emojiContainer = document.getElementById('emoji-container');
  const EMOJIS_PER_ROUND = 3;
  
  let roundEmojis = [];
  let targetEmojiObj = null;
  
  // Fisher-Yates shuffle
  function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  function nextRound() {
    // Pick random emojis for this round
    roundEmojis = shuffle(emojis).slice(0, EMOJIS_PER_ROUND);
    // Pick one as the target
    targetEmojiObj = roundEmojis[Math.floor(Math.random() * roundEmojis.length)];
    // Update prompt
    promptDiv.textContent = `Find the ${targetEmojiObj.name} emoji!`;
    // Render emojis
    renderEmojis();
  }
  
  function renderEmojis() {
    emojiContainer.innerHTML = '';
    roundEmojis.forEach(obj => {
      const span = document.createElement('span');
      span.textContent = obj.emoji;
      span.className = 'emoji-cell';
      span.tabIndex = 0; // accessibility
      span.setAttribute('aria-label', obj.name);
  
      span.addEventListener('click', function() {
        handleEmojiClick(span, obj);
      });
  
      span.addEventListener('keydown', function(e) {
        if (e.key === "Enter" || e.key === " ") {
          handleEmojiClick(span, obj);
        }
      });
  
      emojiContainer.appendChild(span);
    });
  }
  
  function handleEmojiClick(span, obj) {
    if (obj === targetEmojiObj) {
      span.classList.add('correct');
      setTimeout(nextRound, 800);
    } else {
      span.classList.add('incorrect');
      setTimeout(() => span.classList.remove('incorrect'), 500);
    }
  }
  
  // Start the first round when the page loads
  nextRound();