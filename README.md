# Vehicle Finder

## Overview

Vehicle Finder is a web application built with Next.js that allows users to browse vehicle models by selecting a make and year. The app features filtering, sorting, a favorites system, and model details, making it an interactive and user-friendly experience.

## Features

- **Vehicle Selection**: Choose a make and year to view available models.
- **Filtering & Sorting**: Search for models and sort them by name or ID.
- **Favorites**: Save favorite vehicle models for easy access.
- **Model Details**: View additional information in a modal popup.

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/vehicle-finder.git
cd vehicle-finder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API base URL (if not added):
```bash
echo "NEXT_PUBLIC_API_BASE=https://your-api-url.com" > .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and go to `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js page routes
│   ├── styles/        # Global styles
│   ├── utils/         # Helper functions
│   ├── api/           # Server-side API functions
├── public/            # Static assets
├── .env.local         # Environment variables
├── .prettierrc        # Prettier configuration
├── .eslintrc.js       # ESLint configuration
├── next.config.js     # Next.js configuration
├── package.json       # Dependencies and scripts
```

## Deployment

To deploy the application, use Vercel:
```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.