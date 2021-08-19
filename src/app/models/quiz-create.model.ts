import { Question } from "./question.model"

export class QuizCreateModel{
    id!:any
    duration!:any
    levelid!:any
    lectureid!:any
    lecture_name!:any
    level_name!:any
    questions = new Array<Question>()
    totalQuestion!:any
}