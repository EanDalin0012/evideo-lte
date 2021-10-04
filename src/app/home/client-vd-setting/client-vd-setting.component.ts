import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-vd-setting',
  templateUrl: './client-vd-setting.component.html',
  styleUrls: ['./client-vd-setting.component.css']
})
export class ClientVdSettingComponent implements OnInit {

  lstMovies: any[] = [];
  moviesIdCheked = 1;

  lstMovieTypes: any[] = [];

  vdParts: any[] = [];
  vdPartId = 0;

  constructor() { }

  ngOnInit(): void {
    this.lstMovies = movies;
    this.lstMovieTypes = movieTypes;
  }

  onChecke(item: any) {

  }

}

export const movieTypes = [
  {
    id: 1,
    name: 'Drama',
    check: 'Y',
    remark: ''
  },
  {
    id: 2,
    name: 'Movie',
    check: 'Y',
    remark: ''
  },
  {
    id: 3,
    name: 'Histories',
    remark: ''
  }
]

export const movies = [
  {
    id: 1,
    name: "Khmer",
    remark: "Khmer",
    check: 'Y'
  },
  {
    id: 2,
    name: "Thai",
    remark: "Thai",
    check: 'Y'
  },
  {
    id: 3,
    name: "Chiness",
    remark: "Chiness",
    check: 'Y'
  },
  {
    id: 4,
    name: "Korean",
    remark: "Korean",
    check: 'Y'
  },
  {
    id: 5,
    name: "HoliFood",
    remark: "HoliFood",
    check: 'N'
  },
];
