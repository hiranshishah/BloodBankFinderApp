import { Component, ViewEncapsulation } from '@angular/core';
import { user } from 'src/shared/models/user';
import { AppserviceService } from 'src/shared/services/appservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {
  users!: user[];



  constructor(private userService: AppserviceService) { }

  ngOnInit() {
    
  }
  
}
