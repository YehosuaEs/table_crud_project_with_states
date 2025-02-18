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
  public items: MenuItem[] = this.getMenuItems();

  ngOnInit(): void {
    if (!this.items.length) {
      this.items = this.getMenuItems();
    }
  }
  private getMenuItems(): MenuItem[] {
    return [
      {
        label: 'Projects',
        expanded: true,
        items: [
          {
            label: 'List',
            icon: 'pi pi-list',
            routerLink: '/projects'
          },
          {
            label: 'Form',
            icon: 'pi pi-file-edit',
            routerLink: '/form/create_project'
          }
        ]
      }
    ];
  }
}
