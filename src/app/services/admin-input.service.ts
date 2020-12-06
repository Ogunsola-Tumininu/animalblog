import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Blog } from "../blog";

@Injectable({
  providedIn: "root"
})
export class AdminInputService {
  input: any;
  url = "http://localhost:8080";
  // url = "https://mininetflix-backend.herokuapp.com";

  constructor(private http: HttpClient,
    private Http: Http) { }

  addBlog(input) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/admin/blog/add", JSON.stringify(input), options)
  }

  getBlogs() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/admin/blog/all", options)
  }

  getABlog(id) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/admin/blog/" + id, options)
  }

  updateBlog(blog: Blog) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .put(
        this.url + "/api/admin/update/blog/" + blog._id,
        JSON.stringify(blog),
        options
      )
  }

  deleteBlog(id: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .delete(this.url + "/api/admin/delete/blog/" + id, options)
  }

  public blogImage(image: File, id):Observable<Response>{
    const formData = new FormData();
    formData.append('img', image);
    return this.Http.post(this.url +'/api/admin/blog/upload/' + id, formData)
  }
}
