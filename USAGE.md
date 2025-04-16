# Usage Guide

This document explains how to use the OpenAI Agents Workflow Designer to create agent workflows and generate code.

## Getting Started

After following the installation instructions and launching the application, you'll see the main interface with:

- A left sidebar containing component types
- A central canvas for building your workflow
- A right properties panel that shows details of selected components
- A top navigation bar with controls

## Building Your Workflow

### 1. Adding Components

Drag components from the left sidebar to the canvas:

- **Agent Node (Blue)**: Represents an OpenAI agent with specific instructions
- **Runner Node (Red)**: Represents the execution of an agent with input
- **Function Tool Node (Yellow)**: Represents a tool that agents can use
- **Guardrail Node (Purple)**: Represents safety constraints for agents

### 2. Configuring Components

Click on any node to view and edit its properties in the right panel:

#### Agent Properties
- **Name**: Used as the variable name in the generated code
- **Instructions**: The system prompt for the agent
- **Handoff Description**: Description used for handoffs to this agent
- **Output Type**: None or Custom Pydantic model

#### Runner Properties
- **Name**: Used as the function name in the generated code
- **Input**: The user input to provide to the agent
- **Execution Mode**: Synchronous or Asynchronous
- **Context**: Additional context to provide to the agent

#### Function Tool Properties
- **Name**: Used as the function name in the generated code
- **Description**: Description of what the tool does
- **Return Type**: The data type returned by the tool
- **Function Code**: The Python code for the function tool

#### Guardrail Properties
- **Name**: Used as the function name in the generated code
- **Rules**: List of rules for the guardrail (one per line)
- **Actions**: List of actions for the guardrail (one per line)

### 3. Connecting Components

Connect nodes by dragging from one node's handle to another:

- **Agent → Agent**: Connect an agent's right handle to another agent's top handle to create handoffs
- **Function Tool → Agent**: Connect a tool's right handle to an agent's left handle to attach tools to agents
- **Guardrail → Agent**: Connect a guardrail's right handle to an agent's left handle to attach guardrails
- **Agent → Runner**: Connect an agent's bottom handle to a runner's top handle to specify which agent to run

### 4. Workflow Patterns

#### Simple Agent
- Drag an Agent and a Runner to the canvas
- Configure the Agent with instructions
- Connect the Agent to the Runner
- Configure the Runner with input text

#### Agent with Tools
- Drag an Agent, Function Tools, and a Runner to the canvas
- Connect the Function Tools to the Agent
- Connect the Agent to the Runner
- Configure all components

#### Agent Handoffs
- Drag multiple Agents and a Runner to the canvas
- Connect Agent 1 to other Agents (handoffs)
- Connect Agent 1 to the Runner
- Configure all components

#### Agent with Guardrails
- Drag an Agent, Guardrail, and Runner to the canvas
- Connect the Guardrail to the Agent
- Connect the Agent to the Runner
- Configure all components

## Generating Code

1. Click the "Generate Code" button in the top navigation bar
2. Review the generated Python code in the modal
3. Use the "Copy to Clipboard" button to copy the code
4. Use the "Download" button to save the code as a Python file

## Running the Generated Code

1. Make sure you have the required dependencies installed:
   ```bash
   pip install -r requirements.txt
   ```

2. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your_api_key_here
   ```

3. Run the Python file:
   ```bash
   python your_workflow.py
   ```

## Advanced Usage

### Custom Pydantic Models

When selecting "Custom" as the Output Type for an agent, the generated code will include a placeholder Pydantic model that you'll need to customize:

```python
class AgentNameOutput(BaseModel):
    # Define your model fields here
    field1: str
    field2: int
```

You should replace the placeholder fields with your actual model fields.

### Custom Function Tools

For function tools, you can write any Python code in the Function Code field. Just make sure it follows the expected format:

```python
def my_function_tool(params):
    # Your code here
    return result
```

### Asynchronous Execution

For async execution:

1. Set the Runner's Execution Mode to "Asynchronous"
2. The generated code will include async/await syntax and an asyncio.run() call

## Troubleshooting

### Connection Issues
- If you can't connect nodes, make sure you're dragging from the correct handles
- Function Tools connect from their right handle to an Agent's left handle
- Agents connect from their bottom handle to a Runner's top handle

### Code Generation Issues
- Make sure all nodes have valid names (no spaces or special characters)
- Make sure all required fields are filled in
- Check the generated code for any TODO comments that need your attention

### Running Generated Code Issues
- Make sure your API key is correctly set
- Make sure all required dependencies are installed
- Check for any syntax errors in custom function tools
