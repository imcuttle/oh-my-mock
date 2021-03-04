import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ConfigComponent } from './config/config.component';
import { UrlsOverviewComponent } from './urls-overview/urls-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HotToastModule } from '@ngneat/hot-toast';

import { MockTestComponent } from './mock-test/mock-test.component';
import { CodeEditComponent } from './code-edit/code-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { CreateStatusCodeComponent } from './create-status-code/create-status-code.component';
import { AddDataComponent } from './add-data/add-data.component';

@NgModule({
  declarations: [
    ConfigComponent,
    UrlsOverviewComponent,
    MockTestComponent,
    CodeEditComponent,
    CreateStatusCodeComponent,
    AddDataComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PipesModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    HotToastModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule,
  ],
  exports: [UrlsOverviewComponent, ConfigComponent, CodeEditComponent]
})
export class ComponentsModule { }
