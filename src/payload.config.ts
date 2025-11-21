// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Packages } from './collections/Packages'
import { Journal } from './collections/Journal'
import { Projects } from './collections/Projects'
import { Musings } from './collections/Musings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('=== PAYLOAD CONFIG LOADING ===')
console.log('DATABASE_URI exists:', !!process.env.DATABASE_URI)
console.log('DATABASE_URI preview:', process.env.DATABASE_URI?.substring(0, 30) + '...')
console.log('PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
console.log('NODE_ENV:', process.env.NODE_ENV)



export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Packages, Journal, Projects, Musings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
