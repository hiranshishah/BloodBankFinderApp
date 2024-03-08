import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { bloodbank } from 'src/shared/models/bloodbank';
import * as L from 'leaflet'

@Component({
  selector: 'app-maplocation',
  templateUrl: './maplocation.component.html',
  styleUrls: ['./maplocation.component.scss']
})
export class MaplocationComponent {
  @Input() latitude = 0;
  @Input() longitude = 0;
  @Input() zoom = 13;
  mapId = 'leaflet-map';
  showMap = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: bloodbank) { }

  ngOnInit() {
    if (this.showMap) {
      this.initMap();
    }
  }

  toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.initMap();
    }
  }

  initMap() {
    const map = L.map(this.mapId).setView([this.data.latitude, this.data.longitude], this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([this.data.latitude, this.data.longitude]).addTo(map);
  }
  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  formatBloodType(bloodType: string): string {
    return bloodType.replace('a_p', 'A+').replace('a_m', 'A-').replace('b_p', 'B+').replace('b_m', 'B-').replace('aB_p', 'AB+').replace('aB_m', 'AB-').replace('o_p', 'O+').replace('o_m', 'O-');
  }



}
