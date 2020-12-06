import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Blog } from 'src/app/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Blog[] = [];

  user: any = {};

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.allBlogs();
    },
      err => {
        console.log(err);
        return false;
      });
  }

  allBlogs() {
    this.userService.getBlogs().subscribe((data: any) => {
      if (data.success) {
        this.blogs = data.blogs;

      }
      else {
        console.log('Something went wrong');
      }

    });
  }

  favorite(id) {
    let fav = this.user.favorites;
    return (fav.indexOf(id) > -1);
  }

  addFavorite(movieId) {

    const favourite = {
      favorite: movieId
    }
    this.userService.addFavourite(this.user._id, favourite).subscribe((data: any) => {
      if (data.success) {
        this.allBlogs();
        this.ngOnInit();
      }
      else {
        console.log('Something went wrong');
      }

    });
  }

  removeFavorite(movieId) {

    const favourite = {
      favorite: movieId
    }
    this.userService.removeFavourite(this.user._id, favourite).subscribe((data: any) => {
      if (data.success) {
        this.ngOnInit();

      }
      else {
        console.log('Something went wrong');
      }

    });
  }

}
