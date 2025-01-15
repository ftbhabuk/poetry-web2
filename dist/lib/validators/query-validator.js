import { z } from 'zod';
export var QueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(['recent', 'oldest', 'alphabetical', 'reverse-alphabetical', 'novels', 'poems', 'random']).optional(),
    limit: z.number().optional(),
    excludeId: z.string().optional(),
});
