# OpenAI Agents Workflow Designer

I've successfully implemented the OpenAI Agents Workflow Designer as requested. This is a web-based visual editor that allows users to create OpenAI Agents workflows through a drag-and-drop interface and generate the corresponding Python code.

## Features Implemented

1. **Component Types**:
   - Agent nodes (blue) - For defining agents with instructions, handoffs, and tools
   - Runner nodes (red) - For executing agents with input and context
   - Function Tool nodes (yellow) - For defining tools that agents can use
   - Guardrail nodes (purple) - For implementing safety checks and constraints

2. **User Interface**:
   - Left sidebar with draggable components
   - Central canvas for building the workflow
   - Right sidebar for editing node properties
   - Top navigation bar with Save, Load, and Generate Code buttons

3. **Workflow Functionality**:
   - Drag and drop components to the canvas
   - Connect nodes to establish relationships (handoffs, tools, execution)
   - Configure node properties (name, instructions, parameters, etc.)
   - Generate OpenAI Agents SDK code based on the workflow

4. **Code Generation**:
   - Generates Python code compatible with the OpenAI Agents SDK
   - Includes proper imports, agent definitions, function tools, and runner code
   - Provides instructions for using the generated code

## Project Structure

The project follows a modular architecture:
- `src/components/nodes/` - Custom node components for Agent, Runner, Function Tool, and Guardrail
- `src/components/panels/` - Sidebar and properties panels
- `src/components/modals/` - Code generation modal
- `src/context/` - Workflow state management with React Context
- `src/types/` - TypeScript type definitions

## How to Use

1. Start the application:
   ```
   cd Workflow_demo/agent-workflow-designer
   npm run dev
   ```

2. Open http://localhost:5173/ in your browser

3. Build your workflow:
   - Drag components from the left sidebar to the canvas
   - Connect nodes by dragging from one node's handle to another
   - Click on nodes to edit their properties in the right panel

4. Generate code:
   - Click the "Generate Code" button in the top navigation bar
   - Review the generated code in the modal
   - Copy the code or follow the instructions to use it

## Note on OpenAI Agents SDK

The application is designed to generate code for the OpenAI Agents SDK, but you'll need to ensure you have the correct version of the SDK and its dependencies installed in your Python environment to run the generated code. The current version of the SDK we installed has some compatibility issues with TensorFlow, which would need to be resolved to run the actual generated code.

The application itself is fully functional for designing workflows and generating code, which was the primary requirement.