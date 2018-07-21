import { DataService } from './data.sevice';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PostService extends DataService {
  // url = "https://jsonplaceholder.typicode.com/posts";
  constructor( http: Http ) {
    super("https://jsonplaceholder.typicode.com/posts",http)

  }

}
