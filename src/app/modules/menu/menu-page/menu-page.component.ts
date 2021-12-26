import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/model/menu';
import { MenuService } from 'src/app/service/menu.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

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
    private router: Router,
    public dialog: MatDialog
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
    if(menu.noAction) {
      this.openDialogInfo();
      return;
    }
    const type = menu.type;
    this.router.navigate(['/question'], {queryParams: {type}})

  }

  openDialogInfo(){
    this.dialog.open(DialogInfoComponent,{
      width: '300px',
      height: '170px'
    })
  }
}
