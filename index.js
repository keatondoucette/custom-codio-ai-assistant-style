(async function(codioIDE, window) {
  const coachAPI = codioIDE.coachBot;

  // === Register the Main Menu Button ===
  coachAPI.register("syntaxFix", "🧹 Improve the quality of my code", syntaxFix);

 // === Code Quality Improvements ===
  async function syntaxFix() {
    // collects all available context
    const context = await coachAPI.getContext();
    console.log(`context -> `, context)

    // collects all available student code
    const code = context.files?.[0].content || "No source code content available.";
    console.log(`code content -> `, code)

    // System prompt for the styling checker
    const systemPrompt = `You are an assistant helping students style their code properly.
    You will be provided with the Java code they're working in.
    Based on this information, carefully review the code and look for improper style.
    After looking for inproper style, then
    - Explain why the style is incorrect, and provide possible fixes and solutions as code snippets in markdown format
    - If relevant, mention any common misconceptions that may be contributing to the student's inproper style

    Do not provide the full solution.
    Do not ask if they have any other questions.`;

    // User prompt for the styling checker
    const userPrompt = `Here is the student's code:
    <code>
    ${JSON.stringify(code)}
    </code>

    Perform the following checks:
    - Two tabs for an indent instead of one
    - An else on the same line as the closing if bracket }
    - An open bracket { on a new line
    - No spaces in between arithmetic operators
    - Single lines of code being over 30 characters
    - Comments are not useful
    - Lack of comments on complicated parts of code
    - Method is too long
    - Variable name is not camelCase or UPPER_SNAKE_CASE
    - Syntax errors such as a missing comma, closing bracket ) or }

    Phrase your revisions directly addressing the student as 'you'.
    Phrase your revisions as questions or suggestions.`;

    await coachAPI.ask({
          systemPrompt,
          messages: [{ role: "user", content: userPrompt }]
        });
  }

})(window.codioIDE, window);