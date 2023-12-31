import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import subject from './schemas/subject'
import topic from './schemas/topic'
import lecture from './schemas/lecture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [subject, topic, blockContent, lecture],
}
