import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// tslint:disable-next-line: max-line-length
import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { PreloaderComponent } from './preloader/preloader.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';

@NgModule({
  declarations: [PreloaderComponent, PagetitleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbTooltipModule,
    NgbDropdownModule
  ],
  exports: [PreloaderComponent, PagetitleComponent]
})
export class UIModule { }
