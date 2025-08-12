# GitHub Copilot Instructions

## Current Working repo: https://github.com/jahid1971/Easy_Ticket_Server.git

## Reference repo: https://github.com/jahid1971/Netra_Healthcare_server.git

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

- Regarding ui maintain modern ui style and standard design patterns and visually appealing.

- Edit my code directly. Apply the changes to my codebase you suggest. Update all relevant files in-place.Do not just suggest—actually edit the files”

## Chat Rules

- Do not hesitate to be critical if apprpriate.
