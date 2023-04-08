import * as yup from 'yup'

export const addActivitySchema = yup.object().shape({
   
    title: yup.string().required('مطلوب'),
    type: yup.string().required('مطلوب'),
    department: yup.array().of(yup.string().required()).min(1, 'مطلوب').required('مطلوب'),
    orderDate: yup.date().required('مطلوب'),
    participants: yup.array().min(1,'مطلوب').required('مطلوب')

  });
  