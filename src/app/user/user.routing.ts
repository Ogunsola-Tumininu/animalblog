import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LoginGuard } from '../guards/login.guard';
import { ChannelsComponent } from './components/channels/channels.component';
import { ShowBlogComponent } from './components/show-blog/show-blog.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: ChannelsComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'blog/:id', component: ShowBlogComponent, canActivate: [AuthGuard] },
      { path: 'search/:text', component: SearchResultComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'channels', component: HomeComponent, canActivate: [AuthGuard] },

    ]
  }
];

export const UserRouting = RouterModule.forRoot(routes);
