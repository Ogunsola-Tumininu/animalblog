import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:8080";
  //  url = "https://mininetflix-backend.herokuapp.com";

  constructor(private http: HttpClient, ) { }

  getBlogs() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/users/blog/all", options)
  }

  getABlog(id) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .get(this.url + "/api/users/blog/" + id, options)
  }

  addFavourite(id, favorite: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/" + id + "/blog/favorite/add", JSON.stringify(favorite), options)
  }

  removeFavourite(id, favorite: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/" + id + "/blog/favorite/remove", JSON.stringify(favorite), options)
  }

  favoriteBlogs(favorite) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/blog/favorite/all", JSON.stringify(favorite), options)
  }

  searchBlogs(word) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let options = { headers: headers }
    return this.http
      .post(this.url + "/api/users/search", JSON.stringify(word), options)
  }
}
