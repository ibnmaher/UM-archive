import * as yup from 'yup'

export const signupSchema = yup.object().shape({
   
    email: yup.string().email('الحساب غير صالح').required('مطلوب'),
    password: yup.string().min(8).required('مطلوب'),
    confirmPassword: yup.string() .oneOf([yup.ref('password'), null], "الرمز غير مطابق").required('مطلوب'),
  });
  