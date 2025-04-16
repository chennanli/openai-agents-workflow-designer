#!/bin/bash

# Initialize a new Git repository
echo "Initializing Git repository..."
git init

# Add all files to the staging area
echo "Adding files to staging area..."
git add .

# Make the initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: OpenAI Agents Workflow Designer"

# Instructions for pushing to GitHub
echo ""
echo "Repository initialized successfully!"
echo ""
echo "To push to GitHub, run the following commands:"
echo ""
echo "  1. Create a new repository on GitHub at: https://github.com/new"
echo "  2. Connect your local repository to GitHub:"
echo ""
echo "     git remote add origin https://github.com/chennanli/openai-agents-workflow-designer.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "Replace 'chennanli/openai-agents-workflow-designer' with your actual repository name if different."
