import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatToolbarModule
 } from '@angular/material';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { PostService } from './services/post.service';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { MessagesComponent } from './components/messages.component';
import { PostComponent } from './components/post.component';
import { PostPageComponent } from './components/postsPage.component';
import { ProfileComponent } from './components/profile.component';
import { RegisterComponent } from './components/register.component';
import { UsersComponent } from './components/users.component';

import { TimeAgoPipe } from './pipes/time-ago.pipe';

const routes = [
  { path: 'logout', redirectTo: 'home'},
  { path: 'users', component: UsersComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'post', component: PostPageComponent },
  { path: 'posts', component: MessagesComponent },
  { path: 'posts/:id', component: MessagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MessagesComponent,
    PostComponent,
    PostPageComponent,
    ProfileComponent,
    RegisterComponent,
    UsersComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService,
    AuthService,
    PostService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
