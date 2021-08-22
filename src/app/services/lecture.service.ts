import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lecture } from "../models/lecture.model";

@Injectable()
export class LectureService{
    private BaseUrl = 'http://localhost:5000/api/lecture'
    constructor(
        private http:HttpClient
    ){}

    getAllLectures(page:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/all?page=${page}`,{observe:'body'})
    }
    getAllCates():Observable<any>{
        return this.http.get(this.BaseUrl+'/categories',{observe:'body'})
    }

    renameCate(cateId:any,newName:any):Observable<any>{
        return this.http.put(this.BaseUrl+`/category/${cateId}?name=${newName}`,{observe:'body'})
    }

    deleteCate(cateId:any):Observable<any>{
        return this.http.delete(this.BaseUrl+`/category/${cateId}`,{observe:'body'})
    }

    createCate(name:any):Observable<any>{
        return this.http.post(this.BaseUrl+'/category',{name:name},{observe:'body'})
    }

    createLecture(body:any,staffid:any):Observable<any>{
        return this.http.post(this.BaseUrl+`?staffid=${staffid}`,body,{observe:'body'})
    }

    deleteLecture(lecId:any):Observable<any>{
        return this.http.delete(this.BaseUrl+`/${lecId}`,{observe:'body'})
    }
    
    createAttach(lecId:any,attach:any):Observable<any>{
        const fd = new FormData()
        fd.append('attach',attach)
        fd.append('lectureId',lecId)
        return this.http.post(this.BaseUrl+`/attach`,fd,{observe:'body'})
    }

    deleteAttach(id:any):Observable<any>{
        return this.http.delete(this.BaseUrl+`/attach/${id}`,{observe:'body'})
    }

    getLectureAttachs(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${id}/attachs`,{observe:'body'})
    }

    lectureSearch(term:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/search?term=${term}`,{observe:'body'})
    }

    getLetureById(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${id}`,{observe:'body'})
    }
    getAttachments(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${id}/attachs`,{observe:'body'})
    }
    
    getRandomQuiz(userId:any,lecId:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/random/quiz?lecid=${lecId}&userid=${userId}`,{observe:'body'})
    }
    getQuizById(quizId:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/quiz/${quizId}`,{observe:'body'})
    }

    getQuizByLectureId(lecId:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${lecId}/quizzes`,{observe:'body'})
    }

    submitQuiz(userId:any,quizId:any,answers:any):Observable<any>{
        const body = {
            userid : parseInt(userId),
            quizid : parseInt(quizId),
            answers : answers
        }
        console.log(JSON.stringify(body))
        return this.http.post(this.BaseUrl+`/quiz/submit`,body,{observe:'body'})
    }

    getAllLectureByCateId(id:any):Observable<any>{
        return this.http.get(this.BaseUrl+`?cateid=${id}`,{observe:'body'})
    }
    createComment(userId:any,lecId:any,content:any):Observable<any>{
        const body = {
            userid : userId,
            lectureid:lecId,
            content : content
        }
        return this.http.post(this.BaseUrl+`/comment`,body,{observe:'body'})
    }

    getLectureComments(lecId:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/${lecId}/comment`,{observe:'body'})
    }

    deleteComment(cmtId:any):Observable<any>{
        return this.http.delete(this.BaseUrl+`/comment/${cmtId}`,{observe:'body'})
    }

    getUserQuiz(userId:any):Observable<any>{
        return this.http.get(this.BaseUrl+`/user/${userId}/quiz`,{observe:'body'})
    }

    updateLecture(lecture:any):Observable<any>{
        const body = {
            id : parseInt(lecture.id),
            name:lecture.name,
            content:lecture.content,
            sumary:lecture.sumary,
            cateid:parseInt(lecture.cateid),
            modifyby:lecture.modifyby
        }
        return this.http.put(this.BaseUrl,body,{observe:'body'})
    }
}