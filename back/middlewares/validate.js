export function validate(schema){
    return async (req, res, next) => {
        const result = await schema.safeParseAsync(req.body)

        if(!result.success) {
            const errors = result.error.issues.map(issue => ({
                campo: issue.path.join(".") || "body",
                message: issue.message
            }))
            return res.status(400).json({ message: "Datos inválidos", errors })
        }

        req.body = result.data
        next()
    }
}