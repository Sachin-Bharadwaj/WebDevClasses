const { z } = require("zod");

const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    firstname: z.string().min(3).max(100),
    lastname: z.string().min(3).max(100),
    password: z
    .string()
    .min(3) // You can keep these length checks as needed
    .max(30)
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[@$!%*?&]/.test(password), {
      message: "Password must contain at least one special character",
    }),
});

const requireBodyPartial = requireBody.partial();

function signupInpValidator(req) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBody.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}

function loginInpValidator(req) {
    //const parsedData = requireBody.parse(req.body); // it throws error if not parsed
    const parseDataWithSuccess = requireBodyPartial.safeParse(req.body); // it put error in object and doesn't throw error
    return parseDataWithSuccess;
}

module.exports = {
    signupInpValidator: signupInpValidator,
    loginInpValidator: loginInpValidator
}