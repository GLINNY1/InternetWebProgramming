(() => {
  const display = document.querySelector('.display');
  const history = document.querySelector('.history');
  const keys = document.querySelector('.keys');

  let expression = '';     
  let resultShown = false; 

  const updateDisplay = () => { display.value = expression; };
  const isOperator = (v) => ['+', '−', '×', '÷', '%'].includes(v);

  const toJsExpr = (expr) => expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-'); // keep % as modulus

  const replaceLastOperator = (opSymbol) => {
    if (!expression) return;
    const last = expression.slice(-1);
    if (isOperator(last)) expression = expression.slice(0, -1) + opSymbol;
    else expression += opSymbol;
  };

  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const val = btn.textContent.trim();

    // CLEAR
    if (val === 'C') {
      expression = '';
      resultShown = false;
      history.textContent = '';
      updateDisplay();
      return;
    }

    // BACKSPACE
    if (val === '⌫') {
      if (resultShown) return;
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }

    // TOGGLE SIGN (+/-)
    if (val === '+/-') {
      if (!expression) return;

      // find last number in the expression
      const match = expression.match(/(-?\d*\.?\d+)(?!.*\d)/);
      if (!match) return;

      const num = match[0];
      const startIdx = match.index ?? expression.lastIndexOf(num);

      // toggle minus
      const toggled = num.startsWith('-') ? num.slice(1) : '-' + num;

      expression = expression.slice(0, startIdx) + toggled;
      updateDisplay();
      resultShown = false;
      return;
    }

    // EQUALS
    if (val === '=') {
      if (!expression) return;
      try {
        const jsExpr = toJsExpr(expression);
        if (!/^[0-9+\-*/%().\s]*$/.test(jsExpr)) throw new Error('bad expr');
        const result = Function(`"use strict"; return (${jsExpr});`)();
        history.textContent = `${expression} = ${result}`;
        expression = String(result);
        resultShown = true;
        updateDisplay();
      } catch {
        display.value = 'Error';
      }
      return;
    }

    // After result: operator continues, digit/dot starts fresh
    if (resultShown) {
      if (isOperator(val)) {
        resultShown = false;
        replaceLastOperator(val);
        updateDisplay();
        return;
      } else if (val === '.') {
        expression = '0.';
        resultShown = false;
        updateDisplay();
        return;
      } else if (/^[0-9]$/.test(val)) {
        expression = val;
        resultShown = false;
        updateDisplay();
        return;
      }
      return;
    }

    // DIGITS
    if (/^[0-9]$/.test(val)) {
      expression += val;
      updateDisplay();
      return;
    }

    // DOT
    if (val === '.') {
      const lastNumMatch = expression.match(/(\d*\.?\d+)(?!.*\d)/);
      const lastNumber = (lastNumMatch || [])[0] || '';
      if (lastNumber.includes('.')) return;
      if (expression === '' || isOperator(expression.slice(-1))) {
        expression += '0.';
      } else {
        expression += '.';
      }
      updateDisplay();
      return;
    }

    // OPERATORS
    if (isOperator(val)) {
      if (!expression) return;
      replaceLastOperator(val);
      updateDisplay();
      return;
    }
  });
})();
