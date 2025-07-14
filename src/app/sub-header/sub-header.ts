import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderService } from '../Service/header.service';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sub-header',
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sub-header.html',
  styleUrl: './sub-header.scss'
})
export class SubHeader implements OnInit {

  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.getMenuItems().subscribe((data: any) => {
      this.menuItems.set(data);
    });
  }

  menuItems = signal<any[]>([]);

  onMenuClick(routerLink: string) {
    console.log('Menu clicked:', routerLink);
  }
}
