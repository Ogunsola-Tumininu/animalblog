import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./components/home/home.component";
import { UserRouting } from "./user.routing";
import { UserComponent } from "./user.component";
import { AuthGuard } from "../guards/auth.guard";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "../services/auth.service";
import { ValidateService } from "../services/validate.service";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { UserService } from "../services/user.service";
import { LoginGuard } from "../guards/login.guard";
import { ChannelsComponent } from './components/channels/channels.component';
import { ShowBlogComponent } from './components/show-blog/show-blog.component';


@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SearchResultComponent,
    ChannelsComponent,
    ShowBlogComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, UserRouting],
  providers: [ValidateService, AuthService, UserService, AuthGuard, LoginGuard],
  bootstrap: []
})
export class UserModule { }
