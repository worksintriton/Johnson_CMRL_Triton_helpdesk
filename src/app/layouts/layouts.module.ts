import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './shared/menu/menu.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LeftsidebarComponent } from './shared/leftsidebar/leftsidebar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { AppMaterialModules } from '../material.module';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, MenuComponent, TopbarComponent,FooterComponent, LeftsidebarComponent, FooterComponent, HorizontalComponent, VerticalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCollapseModule,
    AppMaterialModules,
    // ClickOutsideModule,
    // UIModule
  ],
  exports: [TopbarComponent, MenuComponent, LeftsidebarComponent, FooterComponent],
  providers: []
})
export class LayoutsModule { }
