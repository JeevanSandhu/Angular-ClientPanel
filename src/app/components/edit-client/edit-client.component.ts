import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit = true;


  constructor(public clientService:ClientService,
              public flash:FlashMessagesService,
              public router:Router,
              public route:ActivatedRoute,
              public settingsService:SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    if(!valid) {
      this.flash.show('Form Invalid! Please fill in all details correctly', { cssClass: "alert-danger", timeout:4000 });
      this.router.navigate(['editClient/'+this.id])
    } else {
      this.clientService.updateClient(this.id, value);
      this.flash.show('Client Updated', { cssClass: "alert-danger", timeout:4000 });
      this.router.navigate(['client/'+this.id])
    }
  }
}
