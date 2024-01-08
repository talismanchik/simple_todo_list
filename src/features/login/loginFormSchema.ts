import {z} from "zod";

export type LoginFormType = z.infer<typeof loginFormSchema>
export const loginFormSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(7),
    rememberMe: z.boolean().default(false)
})