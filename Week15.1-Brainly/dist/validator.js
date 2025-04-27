"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInpValidator = signupInpValidator;
const zod_1 = require("zod");
const requireBody = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    plainpassword: zod_1.z
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
function signupInpValidator(req) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBody.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}
