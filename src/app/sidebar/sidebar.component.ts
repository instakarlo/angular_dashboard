import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home', icon: 'pe-7s-graph', class: '' },
  { path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/patientList', title: 'Patient List', icon: 'pe-7s-note2', class: '' },
  { path: '/patientInfo', title: 'Patient Info', icon: 'pe-7s-news-paper', class: '' },
  { path: '/icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
  { path: '/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
