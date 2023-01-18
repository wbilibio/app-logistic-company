import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { delay, filter, map, startWith } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { SidenavService } from "./sidenav.service";

const instanceOf = (event: any, valid: any[]) => valid.find(current => event instanceof current);

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations: [
    trigger('toggle', [
      state('visible', style({ height: '5px' })),
      state('hidden', style({ height: '0' })),
      transition('visible => hidden', animate('500ms ease-out'))
    ])
  ]
})
export class AppLayoutComponent implements OnInit {
  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;

  public $progressBarVisibility = this.router.events.pipe(
    startWith(false),
    filter(e => e === false || instanceOf(e, [NavigationStart, NavigationEnd, NavigationCancel])),
    map(e => e instanceof NavigationStart),
    map(isVisible => (isVisible ? 'visible' : 'hidden')),
    delay(100)
  );

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    sanitizer: DomSanitizer,
    private sidenavService: SidenavService
  ) {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.active = true;
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit() {

  }

  closeSidebar() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }
}
