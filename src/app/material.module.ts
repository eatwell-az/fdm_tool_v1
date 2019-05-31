import { NgModule } from '@angular/core';
import { MatButtonModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSelectModule,
        MatExpansionModule,
        MatSidenavModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSelectModule,
        MatExpansionModule,
        MatSidenavModule,
        MatTooltipModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {

}
