import * as yup from 'yup'

export const contactSchema = yup.object().shape({
   
    email: yup.string().required('مطلوب'),
    subject: yup.string().required('مطلوب'),
  });
  