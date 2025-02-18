import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideAnimations(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and if item has not length', () => {
    component.items = [];

    component.ngOnInit();

    const expectedMenuItems: MenuItem[] = [
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

    expect(component.items).toEqual(expectedMenuItems);
  });
});
