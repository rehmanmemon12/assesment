import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public buttonExist: boolean = true;
  public backButtonExist: boolean = false;
  public secButtonExist: boolean = true;
  public componentName: string = '';
  public search: string = '';
  action = new Subject<string>();
  action$ = this.action.asObservable();

  constructor() {}

  searchAction = new Subject<string>();
  searchAction$ = this.searchAction.asObservable();

  searchFromHeader(e: any) {
    this.searchAction.next(e);
  }

  resetHeaderData() {
    this.search = '';
    this.componentName = '';
    this.buttonExist = true;
    this.backButtonExist = false;
    this.secButtonExist = false;
  }

  private readonly navContent = [
    {
      "id": 1,
      "submenuExists": false,
      "title": "Patient view",
      "apiTitle": "patient-view",
      "icon": "assignment",
      "routerLink": "/patient-view"
    },
    {
      "id": 2,
      "submenuExists": false,
      "title": "Patient messages",
      "apiTitle": "patient-messages",
      "icon": "message",
      "active": true,
      "badge": 1,
      "routerLink": "/patient-messages"
    },
    {
      "id": 3,
      "submenuExists": false,
      "title": "Doctor messages",
      "apiTitle": "doctor-messages",
      "icon": "chat",
      "routerLink": "/doctor-messages"
    },
    {
      "id": 4,
      "submenuExists": false,
      "title": "Work hours",
      "apiTitle": "work-hours",
      "icon": "schedule",
      "routerLink": "/work-hours"
    },
    {
      "id": 5,
      "submenuExists": false,
      "title": "Calendar",
      "apiTitle": "calendar",
      "icon": "calendar_today",
      "routerLink": "/calendar"
    },
    {
      "id": 6,
      "submenuExists": false,
      "title": "Settings",
      "apiTitle": "settings",
      "icon": "settings",
      "routerLink": "/settings"
    },
    {
      "id": 7,
      "submenuExists": false,
      "title": "Health portal",
      "apiTitle": "health-portal",
      "icon": "dashboard",
      "routerLink": "/health-portal"
    }
  ];

  getMenuItems() {
    return of(this.navContent);
  }
}
