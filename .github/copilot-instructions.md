# GitHub Copilot Instructions

## Current Working repo: https://github.com/jahid1971/Easy_Ticket_Server.git

## Reference repo: https://github.com/jahid1971/Netra_Healthcare_server.git

## Follow reference repo conventions

- When a reference repository is specified, mirror its module-level conventions and responsibilities exactly: middleware placement, controller/service responsibilities, export style, folder layout, naming, and reuse of utilities; do not introduce different architectural patterns without prior approval.

- Mirror the current existings project's or reference repo’s or folder's structure and responsibilities exactly: middleware placement, controller/service roles, named exports, types, and reuse of existing utilities; do not introduce new architectural patterns without approval.

## Code Style and Readability

- Ensure all code suggestions are clean, readable, and follow these formatting guidelines:

- Strictly follow the structure, patterns, and utility usage from my current project Easy_Ticket_Server or from Netra_HealthCare_Server.

- Check and reuse existing code before generating new code.

- Strictly reuse all existing utilities and patterns.Always use my utility functions and service helpers

- For all modules, controllers, and services, use named exports with an object (e.g., export const userService = { ... })—do not use default exports.

- Match the exact export/import style, naming conventions, and folder organization as seen in my current project or in Netra_HealthCare_Server. If you are unsure, always copy the pattern from that project.

- Give top priority to the contexts.

- Write proper clean and readable code. Add empty lines after logical blocks, operators, variable declarations, and where necessary for better code readability.Be consistent with 4 spaces indentation.

- Use optional chaining (?) where probably null or undefined or where it appropriate.
- Avoid deeply nested or overly compact code blocks.
- Maintain the style and structure of the existing codebase.
- Prioritize reusability in all code. Design components, functions, and modules to be easily reusable across different parts of the project.

- Always Use my existing utility functions (e.g., sendSuccessResponse, catchAsync,getAllItems). Do not use default/vanilla patterns—always use my existing utilities and conventions.

- If you cannot follow these conventions for any reason, stop and ask for clarification before proceeding.

- Verify the code works. Check, find any remained, previous or newly created error and fix them and explain any significant changes.
- Only use comments when necessary to clarify complex logic otherwise avoid excessive comments.
- When you make changes in ui you must maintain responsive design and ensure it works well on different screen sizes.

- variable naming should be consistent with the existing codebase, should be common , meaningful
  , conventional.
- Regarding ui maintain modern ui style and standard design patterns and visually appealing.

- Edit my code directly. Apply the changes to my codebase you suggest. Update all relevant files in-place.Do not just suggest—actually edit the files”

- Make types for every modules. try to avoid using any type. Use proper types and make types if needed in types folder in modern way.

## Chat Rules

- Do not hesitate to be critical if apprpriate.

## Planning and requirements

- if prompts contains the word "plans" , of course read the BACKEND_REQUIREMENTS.md file and schema.prisma file , and focus on understanding the requirements and planning the implementation rather than writing code immediately.
