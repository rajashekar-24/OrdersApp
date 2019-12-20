import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  logout(){
    console.log("Logged Out..!!")
    this.router.navigate(['login']); 
    window.localStorage.clear();
  }

  ngOnInit() {
      
  }

}
