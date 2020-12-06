import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { AdminInputService } from "src/app/services/admin-input.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Blog } from "src/app/blog";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {

  title: string = "";
  description: string = "";
  

  id: string = "";
  store: any = {};

  blogs: any[] = [];
  showWait: boolean = false;

  fileToUpload: File = null; // hold our file
  imageUrl: string = "";
  originalWidth: string = "";

  constructor(
    private admin: AdminInputService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allBlogs();
  }



  openInput() {
    // your can use ElementRef for this later
    document.getElementById("fileInput").click();
  }

  fileChange(files: FileList) {
    if (files.length > 0) {
      this.fileToUpload = files[0];
      var readers = new FileReader();
      readers.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      readers.readAsDataURL(this.fileToUpload);
    }
  }

  allBlogs() {
    this.admin.getBlogs().subscribe((data: any) => {
      if (data.success) {
        this.blogs = data.blogs;
        // console.log(this.movies)
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }

    });
  }

  addBlog() {
    let blog = {
      title: this.title,
      description: this.description
    };

    this.showWait = true

    this.admin.addBlog(blog).subscribe((data:any) => {
      if (data.success) {
        if(this.fileToUpload!==null){
          console.log("enter Picture");
          this.admin.blogImage(this.fileToUpload, data.blog._id).subscribe(imagedata => {
            if (imagedata) {
              console.log("Picture saved");
              this.allBlogs();
              this.clear();
              this.imageUrl = ""
              this.showWait = false
  
              document.getElementById('add').click();
              this.toastr.success("Successfully.", "The blog has been added.", {
                timeOut: 3000
              });
            }
            else {
              this.toastr.warning("Blog was added but image was not uploaded.", "Oops.", {
                timeOut: 3000
              });
            }
  
          })
  
        }
        else{
          this.allBlogs();
          this.clear();
          this.imageUrl = ""
          this.showWait = false
          document.getElementById('add').click();
          this.toastr.success("Successfully.", "The blog has been added.", {
            timeOut: 3000
          });
        }
        
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  getId(id) {
    this.id = id;
    console.log(this.id)
  }


  deleteBlog() {
    this.showWait = true;
    this.admin.deleteBlog(this.id).subscribe((data: any) => {
      if (data.success) {
        this.allBlogs();
        this.showWait = false;
        document.getElementById('del').click();
        this.id = "";
        this.toastr.success("Successfully.", "The movie has been deleted.", {
          timeOut: 3000
        });
      }
      else {
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  storeBlog(blog) {
    this.id = blog._id;
    this.title = blog.title;
    this.description = blog.description;
  }

  updateBlog() {
    let blog = {
      _id: this.id,
      title: this.title,
      description: this.description
    };
    this.showWait = true;
    this.admin.updateBlog(blog).subscribe((data: any) => {
      if (data.success) {
        this.allBlogs();
        this.clear();
        this.showWait = false;

        document.getElementById('upd').click();
        this.toastr.success("Successfully.", "The blog has been updated.", {
          timeOut: 3000
        });
      }
      else {
        this.showWait = false;
        this.toastr.error("Something went wrong.", "Oops.", {
          timeOut: 3000
        });
      }
    });
  }

  viewBlog(id) {
    this.router.navigate(['/admin/blog/' + id])
  }

  clear() {
    this.id = "";
    this.title = "";
    this.description = "";
  }
}
