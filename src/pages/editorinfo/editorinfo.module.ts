import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditorinfoPage } from './editorinfo';

@NgModule({
  declarations: [
    EditorinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditorinfoPage),
  ],
})
export class EditorinfoPageModule {}
