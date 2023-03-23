import dayjs, { Dayjs } from "dayjs"

export interface AUTH {
    token : string
    type: string
    name: string
    email: string}
export interface QUERY {

    [key : string] : any
  

}

 