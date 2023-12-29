import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import topic from './schemas/topic'
import subject from './schemas/subject'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [topic, subject, blockContent],
}
