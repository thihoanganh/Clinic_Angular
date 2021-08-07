import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ScientificInfo } from "../models/ScientificModelInfo";
@Injectable()
export class LibraryServiceApi{
    private Base_url: string = 'https://localhost:44323/api/scientific/';
  constructor(
    private httpCilent: HttpClient
  ){}
  ScientificList(){
    return this.httpCilent.get(this.Base_url + 'findall').toPromise().then(res => res as ScientificInfo[]);
  }
}