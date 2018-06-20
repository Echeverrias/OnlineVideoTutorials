import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, DirectivesModule, PipesModule],
     exports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, DirectivesModule, PipesModule]
  })
  export class SharedModule { }