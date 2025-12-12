# Shared Schemas

This directory contains Zod schemas that are shared between frontend and backend to ensure type safety and validation consistency.

## Contact Form Schema

The `contact-form.ts` schema defines the structure and validation rules for the contact form.

### Frontend Usage

```typescript
import { contactFormSchema, type ContactFormData } from './schemas/contact-form'

// Validate form data
const result = contactFormSchema.safeParse(formData)
if (result.success) {
  const validatedData: ContactFormData = result.data
  // Send to backend
}
```

### Backend Usage

#### Option 1: Copy the schema file to your backend project

1. Copy `src/schemas/contact-form.ts` to your backend project
2. Install Zod: `npm install zod` (or `pnpm add zod`, `yarn add zod`)
3. Import and use:

```typescript
import { contactFormSchema, type ContactFormData } from './schemas/contact-form'

// In your API endpoint
app.post('/api/contact', async (req, res) => {
  // Validate incoming data
  const result = contactFormSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    })
  }

  // TypeScript knows result.data is ContactFormData
  const formData: ContactFormData = result.data

  // Process the validated data
  // ...
})
```

#### Option 2: Use a shared package (for monorepos)

If your frontend and backend are in a monorepo, you can create a shared package:

```typescript
// packages/shared/src/schemas/contact-form.ts
// (same content as src/schemas/contact-form.ts)

// Backend imports from shared package
import { contactFormSchema } from '@your-org/shared/schemas/contact-form'
```

#### Option 3: Export as JSON Schema (if backend doesn't use TypeScript/Zod)

If your backend uses a different validation library, you can convert the Zod schema to JSON Schema:

```typescript
import { zodToJsonSchema } from 'zod-to-json-schema'
import { contactFormSchema } from './schemas/contact-form'

const jsonSchema = zodToJsonSchema(contactFormSchema, 'ContactForm')
// Use jsonSchema with your backend validation library
```

## Benefits

1. **Single Source of Truth**: Schema is defined once, used everywhere
2. **Type Safety**: TypeScript types are automatically derived from the schema
3. **Runtime Validation**: Same validation rules on frontend and backend
4. **No Drift**: Types and validation can't get out of sync

## Adding New Schemas

When creating new schemas:

1. Define the Zod schema first
2. Export the schema and the inferred type: `export type MyType = z.infer<typeof mySchema>`
3. Use the schema for validation, not manual type checking
4. Import the type (not redefine it) in other files
