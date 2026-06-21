import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { markdownSchema } from 'sanity-plugin-markdown'
import { schemaTypes } from './schemas'
import { resolve } from './src/sanity/presentation/resolve'
import { StudioNavbar } from './src/sanity/components/StudioNavbar'

export default defineConfig({
  name: 'default',
  title: 'Commonplace',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
  plugins: [
    markdownSchema(),
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN ?? 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
})
