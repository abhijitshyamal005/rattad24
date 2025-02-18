const validatePasswordStrength = (password: string) => {
    let score = 0;
  
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++; // Numbers
    if (/[\W_]/.test(password)) score++; // Special chars
  
    return score;
};

export default validatePasswordStrength;