import * as yup from 'yup'

export const resetPasswordSchema = yup.object().shape({
   

    password: yup.string().min(8,'8 رموز حد ادنى').required('مطلوب'),
    confirmPassword: yup.string() .oneOf([yup.ref('password'), null], "الرمز غير مطابق").required('مطلوب'),
  });
  