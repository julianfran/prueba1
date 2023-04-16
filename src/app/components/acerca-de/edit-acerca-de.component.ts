import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
  persona: Persona = null;

  constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService,
     private router:Router, public imageService:ImageService){}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(data =>{
      this.persona = data;
    }, err =>{
      alert("No se pudo modificar el elemento");
      this.router.navigate(['']);
    })
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.persona.img = this.imageService.url;
    this.personaService.update(id, this.persona).subscribe(data =>{
      this.router.navigate(['']);
    }, err =>{
      alert("No se pudo editar el elemento");
      this.router.navigate(['']);
    })
  }

  uploadImage($event:any){
    // const id = this.activatedRouter.snapshot.params['id'];
    this.imageService.uploadImage($event)
    // this.imageService.uploadImage($event, name)
  }
}
