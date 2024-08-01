import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { VideoComponent } from "./video/video.component";


const routes: Routes = [
  {
    path: "videos",
    component: VideoComponent
  },
  

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {}
