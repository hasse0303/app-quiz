import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  name: FormControl = new FormControl()
  constructor() { }

  ngOnInit(): void {
  }

  setName(){
    localStorage.setItem('name', this.name.value)
  }
}
