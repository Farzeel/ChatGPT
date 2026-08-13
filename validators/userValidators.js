import * as z from "zod"

export const signUpSchema = z.object({
    name:z.string()
    .trim()
    .min(3,"Minimum length of Name must be 3")
    .max(30,"Maximum length of Name is 30"),
    
    age:z.number()
    .min(10,"Minium age should be 10")
    .max(100,"Maximum age should be 100")
    .optional(),

    password:z.string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/,"Your password should have atleast one capital letter")
    .regex(/[a-z]/,"Your password should have atleast one small letter")
    .regex(/[1-9]/,"Your password should have atleast one Number")
    .regex(/[~?@.,<>,{}:'!^#()&-+]/,"Your password should have atleast one special character")
,

    email:z.preprocess((value)=>{
        typeof value == "string"?value.trim().toLowerCase():""
        z.email("must be a valid email")
    })
})

export const loginSchema = z.object({
    email: z.preprocess(
        (value)=> typeof value == "string" ? value.trim().toLowerCase():"",
        z.email("Email must be valid")
    ),
    password: 
            z.string()
            .min(8)
            .max(30)
            .regex(/[A-Z]/,"Your password should have atleast one capital letter")
            .regex(/[a-z]/,"Your password should have atleast one small letter")
            .regex(/[0-9]/,"Your password should have atleast 1 number")
            .regex(/[~?@.,<>,{}:'!^#()&-+]/,"Your password should have atleast one special character")
})