import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {

  posts: any[];
  constructor(private service:PostService) {

  }
  ngOnInit() {
    this.service.getAll().subscribe(
      posts => {
        this.posts = posts;
        console.log(posts);
      }

    );
   }


  AddNewPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.posts.splice(0, 0, post);


    input.value = "";
    this.service.create(post).subscribe(
      newpost => {
        // console.log(input.value);
        post.id = newpost.id;

        console.log(newpost);
      }, (error: AppError) => {

        this.posts.splice(0, 1);
        if (error instanceof BadInput) {
          alert("post has been deleted before");
        } else throw error;
      });
  }

  updatePost(post) {
    post.title = "updated post " + post.id;
    this.service.update(post)
      .subscribe(
        posts => {
        console.log(posts);
      });
  }

  deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
   this.service.delete(post.id).subscribe(
     posts=>{

   }, (error: AppError) => {
     this.posts.splice(index,0,post);

     if (error instanceof NotFoundError) {
       alert('post has been deleted before');
     }else{
       throw error;
     }

   })
  }


}
