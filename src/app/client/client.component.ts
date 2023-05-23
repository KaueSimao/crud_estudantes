import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  submitted: boolean = false;


  constructor(private ClientService: ClientService,
    private formBuilder: FormBuilder) {
      this.formGroupClient = formBuilder.group({
        id : [''],
        name : ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        rg : ['', [Validators.required]],
        telefone : ['', [Validators.required]]

      });
  }

  ngOnInit(): void {
    this.loadClient();
  }
  loadClient() {
    this.ClientService.getClients().subscribe(
      {
        next: data => this.clients = data
      }
    )
  }
  save() {
    this.submitted = true;
    if(this.formGroupClient.valid)
    if(this.isEditing)
    {
      this.ClientService.update(this.formGroupClient.value).subscribe(

      {
        next: () => {
          this.loadClient();
          this.formGroupClient.reset();
          this.isEditing = false;
          this.submitted = false;

        }
    }
      )
    }
    else{
      this.ClientService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.clients.push(data);
            this.formGroupClient.reset();
          }
        }
      )
    }
  }
  clean (){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }
  edit(client : Client){
    this.formGroupClient.setValue(client);
    this.isEditing = true;

  }

  delete(client: Client){
    this.ClientService.delete(client).subscribe({
      next: () => this.loadClient()
    })
  }
  get name() : any{
    return this.formGroupClient.get("name");
  }
  get email() : any{
    return this.formGroupClient.get("email");
  }
  get rg() : any{
    return this.formGroupClient.get("rg");
  }
  get telefone() : any{
    return this.formGroupClient.get("telefone");
  }
}

