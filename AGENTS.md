# AI Agents Guide for Deck Graph - A D3 graph for visualizing a Magic the Gathering commander deck

## Project Overview

The deck-graph is a NextJS and D3 powered visualizer for Magic the Gathering commander decks. It includes:

- **Scryfall API**: API used to pull card data.
- **D3 Network Graph**: Used to visually map a deck.
- **Tanstack Query**: For pulling card data.
- **NextJS**: For React framkework.

## Dev environment tips
- Run `npm i` to install the app locally.
- Run `npm run lint` to ensure no linter errors.
- Run `npm run test` to ensure tests pass and there is 100% test coverage.
- Run `npm run type-check` after making changes to TypeScript and TSX files to ensure there are no compile errors.

## Testing instructions
- Find the CI plan in the .github/workflows/ folder.
- Find the testing agent in .github/agents/test-agent.md
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `npm run lint && npm run type-check` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## React Component Patterns (`src/app/components`)

This project follows several key React component patterns designed for maintainability, accessibility, and visual consistency:

### Component Structure
- **TypeScript Interfaces**: All components use TypeScript with well-defined props interfaces for type safety
- **Default Props**: Components provide sensible defaults using ES6 default parameter syntax
- **Testable Architecture**: Components include `data-testid` attributes for reliable testing

### Accessibility Patterns
- **ARIA Support**: Components include proper ARIA attributes (`role`, `aria-label`)
- **Semantic HTML**: Uses appropriate semantic elements and roles for screen readers
- **Keyboard Navigation**: Components are designed with keyboard accessibility in mind

### Styling Patterns
- **Tailwind CSS**: Utility-first CSS approach for consistent styling
- **Size Variants**: Components support size variants (`sm`, `md`, `lg`) through object-based class mapping
- **Custom Animations**: Complex animations combine Tailwind utilities with inline styles and custom CSS

### Animation Patterns
- **Layered Effects**: Complex animations use multiple overlapping elements (rings, dots, particles)
- **Staggered Timing**: Animation delays create engaging visual sequences
- **Performance Considerations**: Animations use CSS transforms and opacity for smooth performance

### Testing Patterns
- **Component Isolation**: Each major component has its own test file
- **Data Test IDs**: All interactive elements include `data-testid` for reliable test selection
- **Props Testing**: Tests cover all prop variations and edge cases

### File Organization
- Components are organized in feature-based directories under `/src/app/components/`
- Each component directory typically contains the component file and its test file
- Related utilities and mock data are co-located with their consuming components

## React Hooks Patterns (`src/hooks`)

This project follows well-defined patterns for custom React hooks that integrate with external data sources and provide clean abstractions for component state management:

### Hook Structure
- **TypeScript First**: All hooks are written in TypeScript with proper type definitions
- **Parameter Validation**: Hooks accept strongly-typed parameters with clear interfaces
- **Return Object Pattern**: Hooks return destructurable objects with consistent naming conventions

### Data Fetching Patterns
- **Tanstack Query Integration**: Custom hooks leverage `@tanstack/react-query` for server state management
- **Service Layer Abstraction**: Hooks delegate actual data fetching to service layer functions
- **Query Key Strategy**: Uses descriptive query keys for proper caching and invalidation
- **Loading States**: Consistent handling of loading, error, and success states

### Hook Conventions
- **Naming**: Hooks follow the `use[Feature]` naming convention (e.g., `useCards`)
- **Single Responsibility**: Each hook has a focused, single purpose
- **Composable Design**: Hooks can be easily composed and reused across components

### Testing Patterns
- **Mock Strategy**: External dependencies (services) are mocked using Jest
- **Wrapper Providers**: Test utilities create proper QueryClient wrappers for testing
- **Async Testing**: Uses `waitFor` and proper async patterns for testing data fetching
- **Edge Cases**: Tests cover loading states, error scenarios, and parameter variations

### File Organization
- Hooks are located in `/src/hooks/` directory
- Each hook has a corresponding `.test.ts` file for comprehensive testing
- Related service dependencies are properly imported and abstracted

### Performance Considerations
- **Caching**: Leverages React Query's intelligent caching mechanisms
- **Query Optimization**: Proper query key structure prevents unnecessary re-fetches
- **Memory Management**: Hooks clean up properly when components unmount

## Services Patterns (`src/services`)

This project implements a clean service layer architecture that abstracts external API communications and provides reliable data access patterns:

### Service Structure
- **TypeScript Integration**: All services are written in TypeScript with proper type definitions from `src/types`
- **Single Responsibility**: Each service focuses on a specific domain (e.g., cards service for Scryfall API)
- **Pure Functions**: Services export pure functions that can be easily tested and composed
- **Promise-Based**: All service functions return Promises for consistent async handling

### API Communication Patterns
- **External API Integration**: Services handle communication with third-party APIs (Scryfall API)
- **Rate Limiting**: Built-in delays between requests to respect API rate limits
- **URL Encoding**: Proper handling of special characters in API parameters
- **Response Validation**: Services validate API responses before returning data

### Error Handling Patterns
- **Graceful Degradation**: Services continue processing even when individual requests fail
- **Comprehensive Logging**: Detailed error logging for debugging and monitoring
- **Error Isolation**: Failed requests don't prevent successful ones from completing
- **Type-Safe Error Handling**: Uses try-catch blocks with proper TypeScript error typing

### Performance Optimization
- **Sequential Processing**: Controlled request sequencing to avoid overwhelming external APIs
- **Configurable Delays**: Adjustable timing constants for different rate limit requirements
- **Efficient Batching**: Services can handle multiple items while respecting API constraints
- **Memory Management**: Efficient accumulation of results without memory leaks

### Testing Patterns
- **Mock Strategy**: External fetch calls are mocked using Jest for isolated testing
- **Timer Management**: Uses Jest fake timers to test delay functionality
- **Edge Case Coverage**: Tests handle success, failure, network errors, and empty inputs
- **Console Mocking**: Proper handling of console output in tests to verify error logging

### File Organization
- Services are located in `/src/services/` directory
- Each service has a corresponding `.test.ts` file with comprehensive test coverage
- Service naming follows `[domain].service.ts` convention
- Type definitions are imported from centralized `src/types` directory

### API Design Principles
- **Consistent Interfaces**: Services provide predictable input/output patterns
- **Type Safety**: Strong TypeScript typing ensures compile-time error detection
- **Modularity**: Services can be easily imported and used across the application
- **Testability**: Pure function design makes services easy to unit test

## Getting Help

When working on this codebase:

1. Check existing patterns in similar files
2. Run tests frequently during development