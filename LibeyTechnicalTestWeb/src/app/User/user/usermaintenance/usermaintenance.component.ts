import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibeyUserService} from "../../../core/service/libeyuser/libeyuser.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-usermaintenance',
  templateUrl: './usermaintenance.component.html',
  styleUrls: ['./usermaintenance.component.css']
})
export class UsermaintenanceComponent implements OnInit {
  form!: FormGroup;
  constructor(private libeyUserService: LibeyUserService,
              private router: Router,
              private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentNumber: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      documentTypeId: ["", [Validators.required, Validators.min(1), Validators.max(999999)]],
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      fathersLastName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      mothersLastName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      address: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      ubigeoCode: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
      phone: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }
  wipeData(){
    this.form.reset()
  }

  Submit(){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Seguro que desea registrar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, registrar!",
      cancelButtonText: "No, cancelar",
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {
        let sendParams = this.form.value;
        this.libeyUserService.create(sendParams).subscribe((params) => {
          Swal.fire({
            title: "Registro exitoso",
            icon: "info"
          });
          this.router.navigate(["/user/card"]);
        }, (error) => {
          if (!error.error.error) {
            Swal.fire({
              title: "Error",
              text: "Ocurrio un error en el proceso",
              icon: "error"
            });
          }
        });
      }
    });
  }
}
