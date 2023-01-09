export const yupErrorHandler = async (arr:any[],cb:React.SetStateAction<any>) => {
    console.log('arr',arr)
  arr.map(async (err)=>{
    if(err.path){
    await cb((state:any)=>{
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