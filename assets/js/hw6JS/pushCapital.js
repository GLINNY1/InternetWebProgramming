function pushCapital() {
    const input = document.getElementById("stringInput").value;
    const resultDiv = document.getElementById("result");

    if (input === "") {
      resultDiv.textContent = "Please enter a string.";
      resultDiv.style.color = "#f87171"; // red
      return;
    }

    // Separate capital letters and lowercase letters
    let capitals = "";
    let lowercases = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (char >= "A" && char <= "Z") {
        capitals += char;
      } else {
        lowercases += char;
      }
    }

    // Combine: capitals first, then lowercases
    const result = capitals + lowercases;
    
    resultDiv.textContent = result;
    resultDiv.style.color = "#10b981"; // green
  }