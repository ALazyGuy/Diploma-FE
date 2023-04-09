import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('navigationPanel') navigationPanel!: ElementRef<HTMLElement>;

  nav: any;
  code: any;

  navObserver: MutationObserver | null = null;
  
  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.loadRules();
    this.loadNav();
  }

  ngOnDestroy(): void {
    this.destroyMutationObs();
  }

  loadRules(id: string = 'p1'): void {
    this.code = this.apiService.loadRulesById(id);
  }

  loadNav(id: string = 'p1'): void {
    if (this.navObserver === null) {
      this.createMutationObs();
    }

    this.nav = this.apiService.loadRulesNav(id);
  }

  private createMutationObs() {
    this.navObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
    this.navObserver.observe(this.navigationPanel.nativeElement, { attributes: true, childList: true, subtree: true });
  }

  private destroyMutationObs() {
    this.navObserver?.disconnect();
    this.navObserver = null;
  }

  private mutationObserverCallback() {
    const navLinks = this.navigationPanel.nativeElement.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', this.interceptLinkNavigation.bind(this))
    });

  }

  private interceptLinkNavigation(event: Event) {
    const link: string = (event.target as HTMLAnchorElement).href;

    event.preventDefault();
    const apiUrl = link.substring(29, link.length - 1);
    this.loadRules(apiUrl);
    this.loadNav(apiUrl);
  }

}
