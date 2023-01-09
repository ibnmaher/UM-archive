import * as yup from 'yup'
export const validationFunction = async (schema:any,values:any) => {
    await schema.validate(values, { abortEarly: false })
    return true
}