import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public isLoading: boolean = true;
  public menuList: any[] = [];
  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMenuList()
  }

  getMenuList() {
    this.menuService.getAllmenu().subscribe(res => {
      this.menuList = res.menuList;
    })
  }
  goQuizType(type:string){
    this.router.navigate(['/question'], {queryParams: {type}})
  }
}
