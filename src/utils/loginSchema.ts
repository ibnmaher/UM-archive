import * as yup from 'yup'

export const loginSchema = yup.object().shape({
   
    email: yup.string().email('الحساب غير صالح').required('مطلوب'),
    password: yup.string().min(8,'8 رموز حد ادنى').required('مطلوب'),
  });
  