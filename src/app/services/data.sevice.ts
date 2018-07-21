import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
// import { Rx } from 'rxjs/Rx';

@Injectable()
export class DataService {
  // private url;
  constructor(private url:string,private http: Http) {

  }
  getAll() {
    return this.http.get(this.url)
    .map(response=>response.json())
    .catch(this.errorHandle);
  }
  create(resource) {
    // let post: any = { title: input.value };
    // input.value = "";
    return this.http
      .post(this.url, JSON.stringify(resource))
      .map(response=>response.json())
      .catch(this.errorHandle);
  }


  update(resource) {
    return this.http
      .put(this.url + "/" + resource.id, JSON.stringify(resource))
      .map(response=>response.json())
      .catch(this.errorHandle);
  }
  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response.json())
    .catch(this.errorHandle);
  }

  private errorHandle(error) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    return Observable.throw(new AppError(error));

  }
}
