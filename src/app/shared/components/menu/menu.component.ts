import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-menu',
  imports: [PanelMenuModule, SidebarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  public items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Projects',
        items: [
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: '/projects'
          },
          {
            label: 'Form',
            icon: 'pi pi-file-edit',
            routerLink: '/form'
          }
        ]
      }
    ];
  }
}
