import {AfterViewChecked, ChangeDetectorRef, Component, Input, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import {SidenavService} from "@apps/shared/app-layout/sidenav.service";

@Component({
  selector: 'content-toolbar',
  templateUrl: './content-toolbar.component.html',
  styleUrls: ['./content-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentToolbarComponent implements AfterViewChecked {
  @Input() heading: string;

  @Input() subheading: string;

  @Input() backRouterLink: string[];

  @Input() defaultBackRoute: string[];

  @Input() hideBackButton: boolean;

  @Input() navigateBackHistory: boolean;

  @Input() queryParams: Params = {};

  @Input() queryParamsHandling: 'merge' | 'preserve' | '' | null = null;

  @Input() disableReturnUrl: boolean;

  menuVisible: boolean;
  returnUrl: string;
  private observer: any;
  constructor(
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  /** @deprecated use heading instead */
  @Input() set title(heading: string) {
    this.heading = heading;
  }

  /** @deprecated use heading instead */
  @Input() set subtitle(subheading: string) {
    this.subheading = subheading;
  }

  /** @deprecated use heading instead */
  get title() {
    return this.heading;
  }

  get subtitle() {
    return this.subheading;
  }

  get hasBackRouterLink() {
    return !!this.backRouterLink;
  }

  get hideBack() {
    return this.hideBackButton;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  _back() {
    if (window.history.length > 1) {
      window.history.back();
    } else if (this.defaultBackRoute) {
      this.router.navigate(this.defaultBackRoute);
    } else {
      this.router.navigate(['..'], { relativeTo: this.route });
    }
  }

  navigateReturnUrl() {
    window.location.href = this.returnUrl;
  }
}
