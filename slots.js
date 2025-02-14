const reels = [
    document.getElementById("symbol-container1"),
    document.getElementById("symbol-container2"),
    document.getElementById("symbol-container3"),
  ];
  
  const handle = document.getElementById("lever");
  const resultMessage = document.getElementById("resultMessage");
  
  const symbols = ["🍒", "🍋", "🍇", "🍉", "⭐"];
  const spinDuration = 1000; // Spin duration in milliseconds
  let isSpinning = false;



// Checks if the handle is being clicked
  handle.addEventListener("click",() => {
    if (isSpinning) return;
    isSpinning = true;
  
    resultMessage.classList.remove("show-message", "win-effect");
  

  
    // Randomize spin for each reel
    reels.forEach((reel) => {
      const randomStop = Math.floor(Math.random() * symbols.length) * -100;
      reel.style.translate = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      reel.style.transform = `translateY(${randomStop}px)`;
    });
  
    // Check result after all reels stop
    setTimeout(() => {
      checkResult();
      isSpinning = false;
    }, spinDuration);
  });



  function checkResult() {
    const symbol1 = getSymbolAtStop(reels[0]);
    const symbol2 = getSymbolAtStop(reels[1]);
    const symbol3 = getSymbolAtStop(reels[2]);
  
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      resultMessage.textContent = "You Win!";
      winSound.play();
      resultMessage.classList.add("show-message", "win-effect");
      launchConfetti(); // Launch confetti when winning
    } else {
      resultMessage.textContent = "";
      resultMessage.classList.add("show-message");
    }
  }
  
  function getSymbolAtStop(reel) {
    const translateY = parseInt(
      reel.style.transform.replace("translateY(", "").replace("px)", "")
    );
    const symbolIndex = Math.abs(translateY / 100) % symbols.length;
    return symbols[symbolIndex];
  }