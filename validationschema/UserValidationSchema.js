const {z} = require("zod")

const createUserValidationSchema =   z.object({
    body:z.object({
        name:z.string().min(2,"Name must be 2 char.."),
        email:z.string().email(),
        password:z.string().min(6,"min 6 char "),
        age:z.number().int().positive(),
        hobbies:z.array(z.string()),
        roleId:z.string().optional(),
        bloodGroup:z.enum(["A+","A-","B+","B-"])

    })
})
module.exports = createUserValidationSchema