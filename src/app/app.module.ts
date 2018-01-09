import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

// AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Services
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { AuthGaurd } from './gaurds/auth.gaurd';
import { RegisterGaurd } from './gaurds/register.gaurd';
import { SettingsService } from './services/settings.service';

// Routes
const appRoutes: Routes = [
  {path:'', component:DashboardComponent, canActivate:[AuthGaurd]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent, canActivate:[RegisterGaurd]},
  {path:'addClient', component:AddClientComponent, canActivate:[AuthGaurd]},
  {path:'client/:id', component:ClientDetailsComponent, canActivate:[AuthGaurd]},
  {path:'editClient/:id', component:EditClientComponent, canActivate:[AuthGaurd]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGaurd]},
  {path:'**', component:PageNotFoundComponent}
]

export const firebaseConfig = {
  apiKey: "AIzaSyDHa6un_P9PtffWT_hbXlLOvcTEiAixkwc",
  authDomain: "clientpanel-a9460.firebaseapp.com",
  databaseURL: "https://clientpanel-a9460.firebaseio.com",
  projectId: "clientpanel-a9460",
  storageBucket: "",
  messagingSenderId: "220303452880"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ClientService,
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    AuthGaurd,
    RegisterGaurd,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
