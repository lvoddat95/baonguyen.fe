import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { VideoComponent } from "./video/video.component";
import { RecommendComponent } from './recommend/recommend.component';
import { BannerComponent } from './banner/banner.component';


const routes: Routes = [
  {
    path: "videos",
    component: VideoComponent
  },
  {
    path: "recommend",
    component: RecommendComponent
  },
  {
    path: "banners",
    component: BannerComponent
  },
  

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {}
