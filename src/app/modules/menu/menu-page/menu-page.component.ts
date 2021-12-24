import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/menu';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public isLoading: boolean = true;
  public menuList: Menu[] = [];
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
  goQuizType(menu:Menu){
    if(menu.noAction) {return;}
    const type = menu.type;
    this.router.navigate(['/question'], {queryParams: {type}})

  }
}
