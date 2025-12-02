function reverseString() {
    const input = document.getElementById("stringInput").value;
    const resultDiv = document.getElementById("result");

    if (input === "") {
      resultDiv.textContent = "Please enter a string.";
      resultDiv.style.color = "#f87171"; // red
      return;
    }
    // Split the string into words, reverse the array, and join back
    const words = input.trim().split(/\s+/);
    const reversed = words.reverse().join(" ");
    
    resultDiv.textContent = reversed;
    resultDiv.style.color = "#10b981"; // green
  }