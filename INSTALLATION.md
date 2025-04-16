# Installation Guide

This document provides detailed instructions for setting up and running the OpenAI Agents Workflow Designer.

## Frontend Setup (React Application)

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/chennanli/openai-agents-workflow-designer.git
   cd openai-agents-workflow-designer
   ```

2. **Install dependencies**
   ```bash
   cd agent-workflow-designer
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production** (optional)
   ```bash
   npm run build
   ```
   This will create a `dist` folder with the compiled application.

5. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

## Troubleshooting Frontend Issues

- If you encounter dependency conflicts, try:
  ```bash
  npm clean-install
  ```

- For TypeScript errors related to missing type definitions:
  ```bash
  npm install @types/react@latest @types/react-dom@latest
  ```

- If you have issues with node version compatibility:
  ```bash
  # Install nvm (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Install and use the recommended Node.js version
  nvm install 18
  nvm use 18
  ```

## Python Environment Setup (for Generated Code)

### Prerequisites
- Python 3.9 or later
- pip (latest version recommended)

### Setting Up a Virtual Environment

1. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure OpenAI API key**
   - Create a `.env` file in your project directory
   - Add your API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - Or set it as an environment variable:
     ```bash
     export OPENAI_API_KEY=your_api_key_here
     ```

## Testing the Installation

1. **Frontend**
   - Navigate to http://localhost:5173/ in your browser
   - You should see the Workflow Designer interface
   - Try dragging components to the canvas and connecting them

2. **Generated Code**
   - Create a simple workflow in the UI
   - Generate the code with the "Generate Code" button
   - Save it to a file, e.g., `workflow.py`
   - Run it with Python:
     ```bash
     python workflow.py
     ```

## Common Issues

1. **Node version compatibility**
   - This project requires Node.js v18 or later
   - If you're using an older version, you may encounter errors

2. **API key configuration**
   - If you get authentication errors running the generated code, check that your API key is correctly set

3. **Port conflicts**
   - If port 5173 is already in use, Vite will automatically try the next available port
   - You can also manually specify a port in `vite.config.ts`

4. **Browser compatibility**
   - The application is best viewed in modern browsers (Chrome, Firefox, Safari, Edge)
   - Some features may not work properly in older browsers
