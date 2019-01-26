import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatBadgeModule,
  MatButtonModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatSidenavModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSlideToggleModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CdkTableModule,
    MatBadgeModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSidenavModule,
    MatPaginatorModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ]
})

export class MaterialModule {}



