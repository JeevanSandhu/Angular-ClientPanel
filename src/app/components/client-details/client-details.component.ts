import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(public clientService:ClientService,
              public flash:FlashMessagesService,
              public router:Router,
              public route:ActivatedRoute) { }

  ngOnInit() {
    // get id
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      console.log(client);
      if(client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  updateBalance(id:string) {
    this.clientService.updateClient(this.id, this.client);
    this.flash.show("Balance Update", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick() {
    if(confirm("Are you sure?")) {
      this.clientService.deleteClient(this.id);
      this.flash.show("Client Deleted", { cssClass: "alert-success", timeout: 4000 });
    this.router.navigate(['/']);
    }
  }
}
