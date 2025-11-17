# Cover Bank

Cover Bank is Nigeria's largest digital archive of album artwork, home to over 5,300 covers from 1950 to today. This Next.js application provides a searchable interface to explore Nigerian album cover art, celebrating both Nigeria's rich musical heritage and the brilliant designers who gave it visual power.

## Features

- **Advanced Search** - Search across albums, music artists, and cover artists
- **Infinite Scroll** - Smooth infinite loading with skeleton loaders
- **Dark Mode** - Beautiful dark theme with warm brown palette
- **Responsive Design** - Optimized for all screen sizes
- **Performance** - Built with Next.js 16, React 19, and optimized images
- **Animations** - Smooth transitions powered by Motion
- **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Async State Management**: TanStack Query (React Query)
- **Animations**: Motion (Framer Motion)
- **Code Quality**: Biome

## Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd albumcoverbank.com/nextport
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the `nextport` directory:

```env
# NocoDB API Configuration
NOCODB_API_TOKEN=your_api_token_here
NOCODB_BASE_URL=
NOCODB_VIEW_ID=
NEXT_PUBLIC_APP_URL=https://albumcoverbank.com
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (main)/            # Main layout group
│   │   │   ├── about/         # About page
│   │   │   ├── submit/        # Submit page
│   │   │   ├── layout.tsx     # Main layout with sidebar
│   │   │   └── page.tsx       # Home page
│   │   ├── api/               # API routes
│   │   │   ├── covers/        # Covers API endpoints
│   │   │   └── search/        # Search API endpoint
│   │   ├── layout.tsx         # Root layout
│   │   └── providers.tsx      # React Query & Theme providers
│   ├── components/
│   │   ├── layout/            # Layout components (Aside, Header)
│   │   ├── ui/                # Reusable UI components
│   │   └── icons/             # Icon components
│   ├── constants/             # Site configuration & constants
│   ├── lib/                   # Utility functions & API clients
│   ├── types/                 # TypeScript type definitions
│   └── styles/                # Global styles
├── public/                    # Static assets
└── next.config.ts             # Next.js configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NOCODB_API_TOKEN` | API token for NocoDB | Yes |
| `NOCODB_BASE_URL` | Base URL for NocoDB API | Yes |
| `NOCODB_VIEW_ID` | View ID for filtering records | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | No |

## API Routes

### `/api/covers`

- **Method**: GET
- **Query Parameters**:
  - `offset` (number): Pagination offset
  - `limit` (number): Number of results (default: 50)
  - `searchTerm` (string): Search query

### `/api/covers/[id]`

- **Method**: GET
- **Path Parameter**: `id` - Cover record ID

### `/api/search`

- **Method**: GET
- **Query Parameters**:
  - `q` or `searchTerm` (string): Search query (required)
  - `offset` (number): Pagination offset
  - `limit` (number): Number of results

## Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository** and create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** following the project's code style:
   - Use TypeScript for all new files
   - Follow the existing component structure
   - Use Biome for formatting (run `pnpm format` before committing)
   - Write meaningful commit messages

3. **Test your changes**:
   - Ensure the app runs without errors
   - Test in both light and dark modes
   - Verify responsive design on different screen sizes
   - Check accessibility (keyboard navigation, screen readers)

4. **Submit a pull request**:
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all checks pass

### Code Style

- **Formatting**: We use Biome for code formatting. Run `pnpm format` before committing.
- **Linting**: Run `pnpm lint` to check for issues.
- **TypeScript**: All code should be properly typed.
- **Components**: Use functional components with TypeScript.
- **Styling**: Use Tailwind CSS utility classes. Custom styles go in `src/styles/globals.css`.

### Project Guidelines

- **Accessibility**: All interactive elements should be keyboard accessible and have proper ARIA labels
- **Performance**: Optimize images, use lazy loading, and implement proper loading states
- **Responsive**: Ensure all features work on mobile, tablet, and desktop
- **Theme Support**: Test changes in both light and dark modes

## Deployment

The application is designed to be deployed on Vercel or similar platforms:

1. Push your code to the repository
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

## License

This project is funded and maintained by [Independent Arts](https://independent-arts.org), a creative incubator dedicated to nurturing Nigerian artistry.

## Support

For questions or issues, please open an issue on GitHub or contact the maintainers.