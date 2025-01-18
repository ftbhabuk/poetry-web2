import { z } from "zod";
export var AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long.',
    }),
});
