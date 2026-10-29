import { z } from "zod";

// used for first and last name
const nameField = (label: string) =>
    z.string()
        .trim()
        .min(1, `${label} is required.`)
        .min(2, `${label} must be at least 2 characters.`)
        .max(30, `${label} must be 30 characters or fewer.`);

export const signupSchema = z
    .object({
        firstName: nameField("First name"),
        lastName: nameField("Last name"),
        email: z
            .string()
            .trim()
            .min(2, "Email is required.").email("Please enter a valid email address."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string().min(1, "Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });


export type SignupFormData = z.infer<typeof signupSchema>;