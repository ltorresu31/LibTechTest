import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {LibeyUserService} from "../../../core/service/libeyuser/libeyuser.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  items: any[] = [];
  showTable: boolean = true;
  dtOptions: any;
  constructor(private libeyUserService: LibeyUserService,
              private router: Router,) { }

  ngOnInit(): void {
    this.dtOptions = {
      "aLengthMenu": [[10, 20, 30, 50, -1], [10, 20, 30, 50, 'Todos']],
      order: [[0, 'desc']],
      language: {
        "aria": {
          "sortAscending": ": Activar para ordenar la columna de manera ascendente",
          "sortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "lengthMenu": `<span class="seperator"></span>Mostrar _MENU_ registros`,
        "info": `<span class="seperator"></span>Mostrando registros del _START_ al _END_ de un total de _TOTAL_`,
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "paginate": {
          "first": `<i class="fa fa-angle-double-left"></i>`,
          "last": `<i class="fa fa-angle-double-right"></i>`,
          "previous": `<i class="fa fa-angle-left"></i>`,
          "next": `<i class="fa fa-angle-right"></i>`
        },
        "zeroRecords": "No se encontraron resultados",
      },
      dom: 'lrtip',
      responsive: true
    };
    this.listUsers()
  }

  listUsers(){
    this.showTable = false;
    this.libeyUserService.all().subscribe((params: any) => {
      this.items = params;
      this.showTable = true;
    }, () => {
      this.items = [];
      this.showTable = true;
    });
  }

  delete(documentNumber: string){
    console.log("Documento: " + documentNumber)
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Seguro que desea desactivar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, desactivar!",
      cancelButtonText: "No, cancelar",
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {
        this.libeyUserService.delete(documentNumber).subscribe((params) => {
          Swal.fire({
            title: "Desactivación exitosa",
            icon: "info"
          });
          this.listUsers();
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
