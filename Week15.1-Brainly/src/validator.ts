import { z } from "zod";
import { Request } from 'express';

const requireBody = z.object({
    username: z.string().min(3).max(100),
    plainpassword: z
    .string()
    .min(3) // You can keep these length checks as needed
    .max(30)
    .refine((plainpassword) => /[a-z]/.test(plainpassword), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((plainpassword) => /[A-Z]/.test(plainpassword), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((plainpassword) => /[@$!%*?&]/.test(plainpassword), {
      message: "Password must contain at least one special character",
    }),
});


export function signupInpValidator(req: Request) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBody.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}

