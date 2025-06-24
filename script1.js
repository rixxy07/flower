class FlowerInvitation {
  constructor() {
    this.elements = {
      flower: document.getElementById('flower'),
      messageContainer: document.getElementById('messageContainer'),
      yesOption: document.getElementById('yesOption'),
      maybeOption: document.getElementById('maybeOption'),
      cuteEmoji: document.getElementById('cuteEmoji'),
      fallingPetals: document.getElementById('fallingPetals')
    };

    this.state = {
      maybeClicks: 0,
      maybeTexts: [
        "Are you sure?",
        "It will be fun 🌷",
        "Please say yes!",
        "Pretty please? 🥺"
      ],
      petalEmojis: ["🌸", "🌷", "💮", "🏵️"]
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startPetalsAnimation();
  }

  setupEventListeners() {
    this.elements.flower.addEventListener('click', this.showMessage.bind(this));
    this.elements.yesOption.addEventListener('click', this.handleYesClick.bind(this));
    this.elements.maybeOption.addEventListener('click', this.handleMaybeClick.bind(this));
  }

  showMessage() {
    this.elements.messageContainer.hidden = false;
    this.elements.messageContainer.classList.add('show');
    this.elements.flower.setAttribute('aria-expanded', 'true');
  }

  handleMaybeClick() {
    this.state.maybeClicks++;
    const { maybeClicks } = this.state;

    // Update button sizes
    this.updateButtonSizes(maybeClicks);

    // Change maybe button text if available
    if (maybeClicks <= this.state.maybeTexts.length) {
      this.elements.maybeOption.textContent = this.state.maybeTexts[maybeClicks - 1];
    }

    // Show cute emoji feedback
    this.showTemporaryEmoji();

    // Remove maybe option after all texts are shown
    if (maybeClicks === this.state.maybeTexts.length) {
      setTimeout(() => {
        this.elements.maybeOption.remove();
      }, 500);
    }
  }

  updateButtonSizes(clickCount) {
    // Grow YES option
    const yesSize = 1.25 + clickCount * 0.25;
    const yesPadding = 15 + clickCount * 5;
    
    this.elements.yesOption.style.fontSize = `${yesSize}rem`;
    this.elements.yesOption.style.padding = `${yesPadding}px ${yesPadding * 2}px`;

    // Shrink MAYBE option
    const maybeSize = Math.max(1.25 - clickCount * 0.15, 0.8);
    const maybePadding = Math.max(15 - clickCount * 2, 8);
    
    this.elements.maybeOption.style.fontSize = `${maybeSize}rem`;
    this.elements.maybeOption.style.padding = `${maybePadding}px ${maybePadding * 2}px`;
  }

  showTemporaryEmoji() {
    this.elements.cuteEmoji.classList.add('show-emoji');
    
    setTimeout(() => {
      this.elements.cuteEmoji.classList.remove('show-emoji');
    }, 1000);
  }

  handleYesClick() {
    const confirmation = document.createElement('div');
    confirmation.className = 'full-screen-yes';
    confirmation.innerHTML = `
      <div class="confirmation-content">
        <p>Yay! 💕</p>
        <p>See you soon! 🌷</p>
        <button id="closeConfirmation" aria-label="Close confirmation">✕</button>
      </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Add event listener to the close button
    confirmation.querySelector('#closeConfirmation')?.addEventListener('click', () => {
      confirmation.remove();
    });
    
    // Increase falling petals for celebration
    this.increasePetalsDensity(200);
  }

  startPetalsAnimation() {
    this.petalInterval = setInterval(this.createPetal.bind(this), 300);
  }

  increasePetalsDensity(interval) {
    clearInterval(this.petalInterval);
    this.petalInterval = setInterval(this.createPetal.bind(this), interval);
  }

  createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = this.getRandomPetalEmoji();
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${3 + Math.random() * 3}s`;
    petal.style.opacity = Math.random();
    petal.style.animationDelay = `${Math.random() * 2}s`;
    
    this.elements.fallingPetals.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 6000);
  }

  getRandomPetalEmoji() {
    const randomIndex = Math.floor(Math.random() * this.state.petalEmojis.length);
    return this.state.petalEmojis[randomIndex];
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FlowerInvitation();
});