# Contributing to OpenAI Agents Workflow Designer

Thank you for considering contributing to this project! Here's how you can help.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/openai-agents-workflow-designer.git
   cd openai-agents-workflow-designer
   ```
3. Install dependencies:
   ```bash
   cd agent-workflow-designer
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
agent-workflow-designer/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── nodes/       # Node component definitions
│   │   ├── panels/      # UI panels (sidebar, properties)
│   │   └── modals/      # Modal components
│   ├── context/         # React context for state management
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Development Guidelines

### Code Style

- We use ESLint for code linting
- Run `npm run lint` to check for linting issues
- Fix linting issues before submitting a pull request

### TypeScript

- Use TypeScript for all new code
- Define interfaces and types in the `src/types` directory
- Use explicit typing rather than type inference where possible

### Component Structure

- Each node type should be in its own file in `src/components/nodes/`
- Follow the existing pattern for defining node components
- Use ReactFlow's `NodeProps` type for node components

### State Management

- Use the WorkflowContext for managing the workflow state
- Avoid using local state for data that should be shared between components
- Update the state immutably (create new objects rather than mutating existing ones)

## Pull Request Process

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature or fix"
   ```

3. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request from your fork to the main repository

5. Address any review comments and update your PR as needed

## Feature Suggestions

If you have ideas for new features, consider these areas for improvement:

1. **Save/Load Functionality**:
   - Implement saving workflows to JSON
   - Add loading workflows from saved JSON files

2. **Advanced Code Generation**:
   - Add more customization options for code generation
   - Support different agent frameworks or languages

3. **UI Improvements**:
   - Add themes or dark mode
   - Implement better node connectors
   - Add mini-map for large workflows

4. **Validation**:
   - Add validation for node properties
   - Validate connections between nodes for compatibility

5. **Documentation**:
   - Improve in-app help and tooltips
   - Create tutorials or example workflows

## Bug Reports

If you find a bug, please create an issue with:

1. A clear description of the bug
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Your environment (browser, OS, etc.)

## Questions?

If you have questions about contributing, feel free to open an issue with your question.

Thank you for contributing!
