import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users$?: User[];
  public searchForm: FormGroup | any;
  public isLoading = false;
  public isFinish = false;
  public total_count = 0;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  get search_Form() { return this.searchForm.controls; }

  fetchGithubUser(): void {

    this.isLoading = true;

    if (this.searchForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.userService.fetchUserByName(this.search_Form.username.value)
      .pipe(first())
      .subscribe((response: any) => {
        this.users$ = response.items;
        this.total_count = response.total_count;
        this.isLoading = false;
        this.isFinish = true;
      })
  }

}
