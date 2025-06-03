<style>
  .result-box {
    padding: 1em;
    margin-top: 1em;
    border-radius: 8px;
    font-weight: bold;
    color: white;
  }

  .low-risk {
    background-color: #2ecc71; /* green */
  }

  .moderate-risk {
    background-color: #f1c40f; /* yellow */
    color: #000;
  }

  .high-risk {
    background-color: #e67e22; /* orange/red */
  }

  .immediate-risk {
    background-color: #e74c3c; /* red */
  }
</style>



# Are you at risk of becoming homeless?

Welcome to the quiz! Select the best answer for each question and at the end, you'll receive a result based on your total points.

<form id="quizForm" class="md-typeset">
  <fieldset class="md_card">
    <legend><strong>1. How stable is your current living situation?</strong></legend>
    <label><input type="radio" name="q1" value="1"> I own or rent long-term housing with no risk of losing it</label><br>
    <label><input type="radio" name="q1" value="3"> I rent or live with family/friends, but could be asked to leave anytime</label><br>
    <label><input type="radio" name="q1" value="4"> I am staying temporarily or couch-surfing</label><br>
    <label><input type="radio" name="q1" value="6"> I do not have a regular place to stay</label><br>
  </fieldset>

  <fieldset class="md_card">
    <legend><strong>2. How many months of emergency savings do you have?</strong></legend>
    <label><input type="radio" name="q2" value="1"> 6 months or more</label><br>
    <label><input type="radio" name="q2" value="2"> 3-6 months</label><br>
    <label><input type="radio" name="q2" value="3"> Less than 3 months</label><br>
    <label><input type="radio" name="q2" value="4"> No savings at all</label><br>
  </fieldset>

  <fieldset class="md_card">
    <legend><strong>3. If you lost your main income source today, how long could you stay housed?</strong></legend>
    <label><input type="radio" name="q3" value="1"> Over 6 months</label><br>
    <label><input type="radio" name="q3" value="2"> 1-6 months</label><br>
    <label><input type="radio" name="q3" value="4"> Less than 1 month</label><br>
    <label><input type="radio" name="q3" value="6"> I already struggle with income/housing</label><br>
  </fieldset>

  <fieldset class="md_card">
    <legend><strong>4. Have you ever experienced housing insecurity or relid on others for shelter?</strong></legend>
    <label><input type="radio" name="q4" value="1"> Never</label><br>
    <label><input type="radio" name="q4" value="2"> Once or twice</label><br>
    <label><input type="radio" name="q4" value="3"> Multiple times</label><br>
    <label><input type="radio" name="q4" value="5"> Currently experiencing this</label><br>
  </fieldset>

  <fieldset class="md_card">
    <legend><strong>5. Do you have access to affordable and safe housing if you had to move?</strong></legend>
    <label><input type="radio" name="q5" value="1"> Yes, easily</label><br>
    <label><input type="radio" name="q5" value="2"> Possibly, with support</label><br>
    <label><input type="radio" name="q5" value="3"> Only in unsafe or unstable environments</label><br>
    <label><input type="radio" name="q5" value="5"> No, I would have nowhere to go</label><br>
  </fieldset>

  <button type="button" class="md-button md-button--primary" onclick="calculateScore()">Submit</button>
</form>

<div id="result"></div>

<script>
function calculateScore() {
    let total = 0;
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    answers.forEach(answer => {
        total += parseInt(answer.value);
    });

    let resultText = "";
    let riskClass = "";

    if (total >= 18) {
        resultText = "Immediate Risk: You are at or near homelessness. Immediate action and support may be needed. Support options are listed below.";
        riskClass = "immediate-risk";
    } else if (total >= 14) {
        resultText = "High Risk: You may be at significant risk of becoming homeless. Exploring resources or building stability now is essential.";
        riskClass = "high-risk";
    } else if (total >= 10) {
        resultText = "Moderate Risk: You have some vulnerabilities that could lead to housing insecurity. Consider support systems.";
        riskClass = "moderate-risk";
    } else {
        resultText = "Low Risk: You are currently stable, but it's important to understand that many people are not.";
        riskClass = "low-risk";
    }

    document.getElementById("result").innerHTML = `<div class="result-box ${riskClass}"><h2>Result:</h2><p>${resultText}</p></div>`;
}
</script>

