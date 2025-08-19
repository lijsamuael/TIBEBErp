# Components

This directory contains components from the Tibeb Design System.

## Structure

- `atoms/` - Basic building blocks (buttons, inputs, etc.)
- `molecules/` - Simple combinations of atoms (forms, cards, etc.)
- `organisms/` - Complex combinations (headers, sections, etc.)

## Usage

Use the Tibeb UI CLI to add components:

```bash
# List available components
tibeb list

# Add a component
tibebui add button

# Add a specific component type
tibebui add card --type molecules
```

Components are automatically installed with their dependencies.
