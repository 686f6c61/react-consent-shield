# Contributing to react-consent-shield

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:

1. A clear, descriptive title
2. Steps to reproduce the issue
3. Expected behavior vs actual behavior
4. Your environment (browser, React version, etc.)
5. Any relevant code snippets or error messages

### Suggesting Features

Feature requests are welcome. Please open an issue describing:

1. The problem you're trying to solve
2. Your proposed solution
3. Any alternatives you've considered

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Run type checking: `npm run typecheck`
6. Commit with a clear message
7. Push to your fork
8. Open a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/react-consent-shield.git
cd react-consent-shield

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run typecheck

# Build
npm run build
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Write descriptive variable names

## Testing

- Add tests for new features
- Ensure existing tests pass
- Aim for good coverage of edge cases

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add support for custom cookie patterns
fix: correct geo-detection fallback behavior
docs: update configuration examples
test: add tests for ConsentScript component
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md if applicable
5. Request review from maintainers

## Types of Contributions

### Code Contributions

- Bug fixes
- New features
- Performance improvements
- Refactoring

### Non-Code Contributions

- Documentation improvements
- Translation additions
- New service presets
- Bug reports
- Feature suggestions

## Adding Service Presets

If you want to add a new service preset:

1. Research the cookies used by the service
2. Create a preset object in `src/presets/`
3. Add to the appropriate tier file
4. Include cookie patterns with wildcards where appropriate
5. Add tests for the new preset
6. Update documentation

Example preset structure:

```typescript
export const myService: ServicePreset = {
  id: 'my-service',
  name: 'My Service',
  category: 'analytics',
  domains: ['myservice.com'],
  cookies: ['_ms_id', '_ms_session', '_ms_*'],
  description: {
    en: 'Description in English',
    es: 'Descripcion en espanol',
  },
};
```

## Adding Translations

To add a new language:

1. Create a translation file in `src/i18n/`
2. Copy the structure from an existing translation
3. Translate all strings
4. Add the language to the available locales list
5. Test the translation in the demo

## Questions?

If you have questions, feel free to:

- Open an issue on GitHub
- Check existing issues for similar questions

Thank you for contributing!
