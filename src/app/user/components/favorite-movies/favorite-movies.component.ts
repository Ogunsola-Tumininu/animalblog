import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  blogs: any[] = [];

  user: any = {};

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().subscribe(profile => {
      this.user = profile['user'];
      this.favoriteBlogs(this.user.favorites);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  favoriteBlogs(array) {
    let favorites = {
      favorites: array
    }

    this.userService.favoriteBlogs(favorites).subscribe(data => {
      this.blogs = data['blogs'];
    },
      err => {
        console.log(err);
        return false;
      });

  }

}
