import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UserService } from 'src/app/services/user.service';
import { Blog } from 'src/app/blog';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  blogs: Blog[] = [];

  blogsLen: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Combine them both into a single observable
    const urlParams = Observable.combineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    // Subscribe to the single observable, giving us both
    urlParams.subscribe(routeParams => {
      // routeParams containing both the query and route params
      this.searchBlog(routeParams.text);
    });
  }

  searchBlog(searchWord) {

    const word = {
      searchText: searchWord
    }

    this.userService.searchBlogs(word).subscribe((data: any) => {
      if (data.success) {
        console.log(data.blogs);
        this.blogs = data.blogs;
        this.blogsLen = this.blogs.length;
      }
      else {
        console.log('Something went wrong');
      }

    });
  }

}
