import { Component, OnInit } from '@angular/core';
import { AdminInputService } from 'src/app/services/admin-input.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  blog: any = {};
  url: string = ''

  constructor(
    private admin: AdminInputService,
    private activatedRoute: ActivatedRoute,
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
      this.getBlog(routeParams.id);
    });
  }


  getBlog(id) {
    this.admin.getABlog(id).subscribe((data: any) => {
      if (data.success) {
        this.blog = data.blog;

        this.url = this.blog.image.url;
        console.log(this.blog )
      }
    });
  }

}
