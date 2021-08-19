import { Answer } from "./answer.model"

export class Question{
    id!:any
    name!:any
    answers = new Array<Answer>()
}