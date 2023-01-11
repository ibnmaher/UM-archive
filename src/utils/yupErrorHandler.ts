export const yupErrorHandler = async (errorArray:any[],updateErrors:React.SetStateAction<any>) => {
   
    errorArray.map(async (err)=>{
    if(err.path){
    await updateErrors((state:any)=>{
        return {
...state, [err.path] : {
    error: true,
    message: err.message
}
        }
    })
    
}
})

}