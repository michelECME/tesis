import { IAsignacion } from '../asignacion.model';
import { AsignacionService } from '../service/asignacion.service';
import { AsignacionDeleteDialogComponent } from '../delete/asignacion-delete-dialog.component';

import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


import {

  ApexAxisChartSeries,
  ApexOptions,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'jhi-asignacion',
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent implements OnInit {
  asignacions?: IAsignacion[];
  isLoading = false;

  // esto es el grafico
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  //esto es para filtrar

  filteredAndOrderedEntities?: IAsignacion[];
  filter = '';
  orderProp: keyof IAsignacion = 'cantidad';
  ascending = true;

  constructor(protected asignacionService: AsignacionService, protected modalService: NgbModal) { }



  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.asignacions.map(s => {
   const tempObj = [];
   tempObj.push(s.cantidad);
   tempObj.push(s.recurso?.nombre);
   tempObj.push(s.chofer?.nombre);
   json.push(tempObj);
   });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Aseignaciones');

    worksheet.addRow([]);

    const header = ['Cantidad', 'Recurso', 'Nombre de chofer'];
    worksheet.addRow(header);
    worksheet.getRow(worksheet.rowCount).eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FF3FCF61'}
    };
    cell.border = {
      top: {style: 'thin', color: {argb: 'FF000000'}},
      left: {style: 'thin', color: {argb: 'FF000000'}},
      bottom: {style: 'thin', color: {argb: 'FF000000'}},
      right: {style: 'thin', color: {argb: 'FF000000'}}
    }
    });

    json.forEach((data, index) => {
    worksheet.addRow(data);
    });

    let i = 1;
    while (i <= 8) {
    worksheet.getColumn(i).width = 35;
    i++;
    }

    workbook.xlsx.writeBuffer().then((data) => {
    this.saveAsExcelFile(data, 'Agregado por chofer');
    });
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }


  filterAndSort(): void {
  this.filteredAndOrderedEntities = this.asignacions!.filter(
  // @ts-ignore
    variable => !this.filter || variable.fecha.toLowerCase().includes(this.filter.toLowerCase())
  ).sort((a, b) => {
  // @ts-ignore
    if (a[this.orderProp] < b[this.orderProp]) {
    return this.ascending ? -1 : 1;
  // @ts-ignore
    } else if (a[this.orderProp] > b[this.orderProp]) {
    return this.ascending ? 1 : -1;
    }
    return 0;
  });
  }

  loadChart(): void{
  this.datax=[];
  this.datay=[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  for (let i = 0; i < this.agregadoXChofers.length; i++){
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const item = this.agregadoXChofers[i];
    this.datay.push(item.cantidadChorfer);
    this.datax.push(item.chapa);
  }
  this.chartOptions = {
    series: [
    {
      name: "Cantidad",
      data: this.datay
    }
    ],
    chart: {
    height: 350,
    type: "bar"
    },
    title: {
    text: "Agregados por chofer"
    },
    xaxis: {
    categories: this.datax
    }
  };
  }


  loadAll(): void {
    this.isLoading = true;

    this.asignacionService.query().subscribe(
      (res: HttpResponse<IAsignacion[]>) => {
        this.isLoading = false;
        this.asignacions = res.body ?? [];
        this.loadChart();
        this.filterAndSort();

      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAsignacion): number {
    return item.id!;
  }

  delete(asignacion: IAsignacion): void {
    const modalRef = this.modalService.open(AsignacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asignacion = asignacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
