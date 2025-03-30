# Piverse Project

## Overview
Piverse is an interactive web application that visualizes the mathematical constant π (pi) in creative and educational ways. It combines 3D graphics, generative art, and interactive tools to explore the beauty and significance of π.

## Features
- **3D Visualization**: A spiral representation of π's digits using Three.js.
- **2D Visualization**: Circular patterns based on π's digits.
- **Interactive Education**: A conversational AI guide to learn about π.
- **Pattern Finder**: Explore π's digits through customizable spiral patterns.
- **Generative Art**: Create π-inspired art with automatic and manual- Create your own modes.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd piverse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

## Project Structure
- `src/`: Contains the source code of the application.
  - `components/`: Reusable React components.
    - `PiVisualization.tsx`: 3D and 2D visualizations of π.
    - `Education.tsx`: AI-powered educational chat about π.
    - `PatternFinder.tsx`: Interactive spiral pattern exploration.
    - `GenerativeArt.tsx`: Tools for creating π-inspired generative art.
  - `main.tsx`: Entry point of the application.
  - `App.tsx`: Main application component.
  - `index.css`: Global styles.

## Technologies Used
- **React**: Frontend framework for building user interfaces.
- **Three.js**: 3D graphics library for π visualizations.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide Icons**: Icon library for interactive controls.

