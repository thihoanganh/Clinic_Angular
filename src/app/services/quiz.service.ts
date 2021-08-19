import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizCreateModel } from "../models/quiz-create.model";

@Injectable()
export class QuizService{
    private BaseUrl = 'http://localhost:5000/api/lecture'
    constructor(
        private http:HttpClient
    ){}

    getAllQuiz(page:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/quizzes?page=${page}`,{observe:'body'})
    }

    createQuiz(quiz:QuizCreateModel):Observable<any>{
        return this.http.post(this.BaseUrl+'/quiz',quiz,{observe:'body'})
    }

    updateQuiz(quiz:QuizCreateModel):Observable<any>{
        console.log(JSON.stringify(quiz))
        return this.http.put(this.BaseUrl+'/quiz',quiz,{observe:'body'})
    }
    deleteQuiz(id:any):Observable<any>{
        return this.http.delete(this.BaseUrl+`/quiz/${id}`,{observe:'body'})
    }

    getQuizByLectureId(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${id}/quizzes`,{observe:'body'})
    }

    getQuizById(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/quiz/${id}`,{observe:'body'})
    }
}