import * as yup from 'yup'

export const addUserSchema = yup.object().shape({
   
    name: yup.string().required('مطلوب'),
    email: yup.string().email("البريد غير صالح").required('مطلوب'),
    department: yup.string().required('مطلوب'),
    phone: yup.string().matches(/^(075|077|078)([0-9]+)*$/, 'الرقم غير صالح')
    .min(11, 'الرقم غير صالح')
    .max(11, 'الرقم غير صالح').required('مطلوب')

  });
  