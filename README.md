# Finixcode Project



## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd finixcode
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Running the Application

### Development Mode
To run the application in development mode with hot-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build
To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

### Additional Scripts

- `npm run lint` - Run ESLint to check code quality
- `npm run vercel-build` - Special build script for Vercel deployment

## Project Structure

The main application code is in the `app` directory. Key files and directories include:
- `app/page.tsx` - Main page component
- `app/components/` - Reusable React components
- `app/styles/` - CSS and styling files

## Features

- Modern UI components using Radix UI
- Responsive design with Tailwind CSS
- Date handling with date-fns
- Carousel functionality with react-slick
- Toast notifications with react-hot-toast

## Technologies & Tools Used

### Core Technologies
- **Next.js 15.3.1** - React framework for production
- **React 18.2.0** - JavaScript library for building user interfaces
- **TypeScript** - For type-safe code
- **TailwindCSS** - For utility-first styling

### UI Components & Design
- **Radix UI** - Unstyled, accessible components
  - @radix-ui/react-dialog
  - @radix-ui/react-popover
  - @radix-ui/react-slot


### Functionality & Features
- **date-fns** - Modern JavaScript date utility library
- **react-slick & slick-carousel** - For carousel/slider functionality
- **react-hot-toast** - For beautiful notifications
- **react-day-picker** - For date picking functionality



