function display(str0) {
    str = document.getElementById("text");
    str.value = str.value + str0;
}

function equals() {
    str = document.getElementById("text");
    let input = str.value;
    let result;

    if (input.includes('^')) {
        input = evaluateAndReplaceExponents(input);
    } 

    if (input.includes('sin') || input.includes('cos') || input.includes('tan')) {
        input = evaluateAndReplaceTrigFunctions(input);
    }

    try {
        result = eval(input);
        str.value = result;
    } catch (error) {
        str.value = "Error";
    }
}



function back() {
    str = document.getElementById("text");
    str.value = str.value.substring(0, str.value.length - 1);
}

function reset() {
    str = document.getElementById("text");
    str.value = "";
}




function evaluateAndReplaceExponents(inputString) {
    const regex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g;
  
    const matches = inputString.match(regex);
  
    if (matches) {
      for (const match of matches) {

        const [base, exponent] = match.split('^').map(item => parseFloat(item.trim()));
  
        const result = Math.pow(base, exponent);
  
        inputString = inputString.replace(match, result);
      }
    }
  
    return inputString;
  }

  
function evaluateAndReplaceTrigFunctions(inputString) {
  const trigFunctions = ['sin', 'cos', 'tan'];
  
  for (const functionName of trigFunctions) {
    const regex = new RegExp(`${functionName}\\(([^)]+)\\)`, 'g');
    
    const matches = inputString.match(regex);
    
    if (matches) {
      for (const match of matches) {
        const expressionInsideFunc = match.match(/\(([^)]+)\)/)[1];
        
        let result;
        if (functionName === 'sin') {
          result = Math.sin(eval(expressionInsideFunc));
        } else if (functionName === 'cos') {
          result = Math.cos(eval(expressionInsideFunc));
        } else if (functionName === 'tan') {
          result = Math.tan(eval(expressionInsideFunc));
        }
        
        inputString = inputString.replace(match, result);
      }
    }
  }
    return inputString;
}