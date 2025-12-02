function numOfDigits(num) {
    num = Math.abs(num);
    return num.toString().length;
  }

  function showDigits() {
    const input = document.getElementById("numberInput").value;
    const resultDiv = document.getElementById("result");

    if (input === "" || isNaN(input)) {
      resultDiv.textContent = "Please enter a valid number.";
      resultDiv.style.color = "#f87171"; 
      return;
    }

    const digits = numOfDigits(Number(input));
    resultDiv.style.color = "#38bdf8"; 
    resultDiv.textContent = `Number of digits: ${digits}`;
  }