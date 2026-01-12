 const output = document.getElementById("passwordOutput");
    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");
    const uppercase = document.getElementById("uppercase");
    const numbers = document.getElementById("numbers");
    const symbols = document.getElementById("symbols");
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const strengthText = document.getElementById("strengthText");

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}<>?/";

    lengthSlider.addEventListener("input", () => {
      lengthValue.textContent = lengthSlider.value;
    });

    function generatePassword() {
      let chars = lowerChars;

      if (uppercase.checked) chars += upperChars;
      if (numbers.checked) chars += numberChars;
      if (symbols.checked) chars += symbolChars;

      const length = parseInt(lengthSlider.value);
      let password = "";

      // Secure random
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);

      for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
      }

      output.value = password;
      updateStrength(password);
    }

    function updateStrength(password) {
      let score = 0;

      if (password.length >= 12) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score <= 1) strengthText.textContent = "Weak";
      else if (score === 2) strengthText.textContent = "Medium";
      else strengthText.textContent = "Strong";
    }

    generateBtn.addEventListener("click", generatePassword);

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(output.value);
      alert("Password copied!");
    });