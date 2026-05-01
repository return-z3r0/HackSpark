import { toolDefinition } from '@tanstack/ai'
import z from 'zod'

export const updateCounterToolDef = toolDefinition({
  name: 'set_count',
  description: 'Set the counter value stored in the browser',
  inputSchema: z.object({
    count: z.number().describe('The new counter value to set'),
  }),
  outputSchema: z.object({ success: z.boolean() }),
})
