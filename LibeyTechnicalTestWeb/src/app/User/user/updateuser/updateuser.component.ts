import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibeyUserService} from "../../../core/service/libeyuser/libeyuser.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {LibeyUser} from "../../../entities/libeyuser";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  form!: FormGroup;
  user: LibeyUser | undefined;
  province: string | undefined;
  region: string | undefined;
  constructor(private libeyUserService: LibeyUserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,) { }
  ngOnInit(): void {
    let documentNumber = this.activatedRoute.snapshot.paramMap.get("documentNumber");
    if (!documentNumber) {
      this.router.navigate(["/user/card"]);
    }else {
      this.form = this.formBuilder.group({
        documentNumber: [{value: "", disabled: true}, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        documentTypeId: [{value: "", disabled: true}, [Validators.required, Validators.min(1), Validators.max(999999)]],
        name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        fathersLastName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        mothersLastName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        address: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        ubigeoCode: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
        phone: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        email: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        password: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      });
      this.loadUser(documentNumber)
    }
  }
  loadUser(documentNumber: string){
    this.libeyUserService.Find(documentNumber).subscribe((params: any) => {
      if (params.message) {
        Swal.fire({
          title: "Error",
          text: params.message,
          icon: "error"
        });
        this.router.navigate(["/user/card"]);
      } else {
        this.user = params;
        this.form.controls["documentNumber"].setValue(this.user!.documentNumber);
        this.form.controls["documentTypeId"].setValue(this.user!.documentTypeId);
        this.form.controls["name"].setValue(this.user!.name);
        this.form.controls["fathersLastName"].setValue(this.user!.fathersLastName);
        this.form.controls["mothersLastName"].setValue(this.user!.mothersLastName);
        this.form.controls["address"].setValue(this.user!.address);
        this.form.controls["ubigeoCode"].setValue(this.user!.ubigeoCode);
        this.form.controls["phone"].setValue(this.user!.phone);
        this.form.controls["email"].setValue(this.user!.email);
        this.form.controls["password"].setValue(this.user!.password);
      }
    }, (error) => {
      if (!error.error.error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error",
          icon: "error"
        });
        this.router.navigate(["/user/card"]);
      }
    });
  }
  wipeData(){
    this.form.reset()
  }

  Submit(){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Seguro que desea actualizar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!",
      cancelButtonText: "No, cancelar",
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {
        this.form.controls['documentNumber'].enable();
        this.form.controls['documentTypeId'].enable();
        let sendParams = this.form.value;
        this.libeyUserService.update(sendParams).subscribe((params) => {
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
