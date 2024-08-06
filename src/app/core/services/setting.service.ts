import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
};

@Injectable({ providedIn: 'root' })
export class SettingService {
    constructor(private http: HttpClient) { }


    // Danh sách video
    getVideoData(): Observable<any> {
        return this.http.post(
            GlobalComponent.video,
            {},
            httpOptions
        );
    }
    // Thêm mới video
    insertVideo(
        title: string = "",
        link: number = 0,
        ngay_nh: null,
    ): Observable<any> {
        const data = [{
            title: title,
            link: link,
            ngay_nh: ngay_nh,
        }];
        return this.http.post(
            GlobalComponent.videoInsert,
            { data: JSON.stringify(data) },
            httpOptions
        );
    }
    // Xoá video
    deleteVideo(
        id: number,
    ): Observable<any> {
        return this.http.post(
            GlobalComponent.videoDelete,
            { data: JSON.stringify({ id: id }) },
            httpOptions
        );
    }


    // Danh sách Recommend
    getRecommendData(): Observable<any> {
        return this.http.post(
            GlobalComponent.startUp,
            {},
            httpOptions
        );
    }
    // Thêm mới Recommend
    insertRecommend(
        title: string = "",
        link: string = "",
        image_link: string = "",
    ): Observable<any> {
        const data = [{
            title: title,
            link: link,
            image_link: image_link,
        }];
        return this.http.post(
            GlobalComponent.recommendInsert,
            { data: JSON.stringify(data) },
            httpOptions
        );
    }
    // Xoá Recommend
    deleteRecommend(
        id: number,
    ): Observable<any> {
        return this.http.post(
            GlobalComponent.recommendDelete,
            { data: JSON.stringify({ id: id }) },
            httpOptions
        );
    }


    // Danh sách Banner
    getBannerData(): Observable<any> {
        return this.http.post(
            GlobalComponent.startUp,
            {},
            httpOptions
        );
    }
    // Thêm mới Banner
    insertBanner(
        link_image: string = "",
        nd: string = "",
    ): Observable<any> {
        const data = [{
            link_image: link_image,
            nd: nd,
        }];
        return this.http.post(
            GlobalComponent.bannerInsert,
            { data: JSON.stringify(data) },
            httpOptions
        );
    }
    // Xoá Banner
    deleteBanner(
        id: number,
    ): Observable<any> {
        return this.http.post(
            GlobalComponent.bannerDelete,
            { data: JSON.stringify({ id: id }) },
            httpOptions
        );
    }

}
