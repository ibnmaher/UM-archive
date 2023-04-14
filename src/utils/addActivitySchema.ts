import * as yup from 'yup'

export const addActivitySchema = yup.object().shape({
   
    title: yup.string().required('مطلوب'),
    type: yup.string().required('مطلوب'),
    department: yup.array().of(yup.string().required()).min(1, 'مطلوب').required('مطلوب'),
    orderDate: yup.date().required('مطلوب'),
    participants: yup.array().min(1,'مطلوب').required('مطلوب'),
    image: yup.mixed().test("fileSize", "file err_1", (value) => {
      if (value){
     return value.size <= 40
      }
      return true
    })
    .test("fileType", "file err_2", (value) => { 
      if(value){
    return (
      value.type === "image/jpeg" ||
      value.type === "image/jpg"  ||
      value.type === "image/png"
      )
    }
    return true
    })
    .required('Required'),

  });
  