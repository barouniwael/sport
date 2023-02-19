import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMuch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //Form ID
 signupForm: FormGroup;
 imagePreview :any;
  constructor(private Formbuilder: FormBuilder,private userService:UserService,private router:Router) { }
msg:string;
  ngOnInit() {
    this.signupForm = this.Formbuilder.group({
      firstName:['',[Validators.required, Validators.minLength(3)]],
      lastName:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.email]],
      pwd:['',[Validators.required, Validators.minLength(6),Validators.required, Validators.maxLength(12)]],
      confirmPwd:[''],
      img:[''],
    }, {
      validators:MustMatch("pwd","confirmPwd")
    }
    );
  }

  signup(){

this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe((res)=>{
 if (res.message == "0") {
  this.msg = "email exist"
  
 } else {
  this.router.navigate([""])
  
 }
});
  // let users=JSON.parse(localStorage.getItem("users") || "[]");
  // let userId=JSON.parse(localStorage.getItem("userId")||"1");
  // let user =this.signupForm.value;
  // user.id=userId;
  // users.push(user);
  // users.push(this.signupForm.value);
  // localStorage.setItem("users", JSON.stringify(users));
  // localStorage.setItem("userId",userId+1);
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
