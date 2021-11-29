import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ICantidadXModelo } from '../cantidad-x-modelo.model';
import { CantidadXModeloService } from '../service/cantidad-x-modelo.service';
import { CantidadXModeloDeleteDialogComponent } from '../delete/cantidad-x-modelo-delete-dialog.component';

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
  selector: 'jhi-cantidad-x-modelo',
  templateUrl: './cantidad-x-modelo.component.html',
})
export class CantidadXModeloComponent implements OnInit {
  cantidadXModelos?: ICantidadXModelo[];
  isLoading = false;


  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  //esto es para filtrar 

  filteredAndOrderedEntities?: ICantidadXModelo[];
  filter = '';
  orderProp: keyof ICantidadXModelo = 'modelo';
  ascending = true;



  constructor(protected cantidadXModeloService: CantidadXModeloService, protected modalService: NgbModal) { }



  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.cantidadXModelos.map(s => {
   const tempObj = [];
   tempObj.push(s.cantidadModelo);
   tempObj.push(s.modelo);
   json.push(tempObj);
   });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cantidad de equipos por modelos');
   
    worksheet.addRow([]);
  
    const header = ['Cantidad', 'Modelo'];
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
    this.saveAsExcelFile(data, 'Cantidad de equipos por modelos');
    });
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }


  filterAndSort(): void {
  this.filteredAndOrderedEntities = this.cantidadXModelos!.filter(
  // @ts-ignore
    variable => !this.filter || variable.modelo.toLowerCase().includes(this.filter.toLowerCase())
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
  for (let i = 0; i < this.cantidadXModelos.length; i++){
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const item = this.cantidadXModelos[i];
    this.datay.push(item.cantidadModelo);
    this.datax.push(item.modelo);
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
    text: "Cantidad de equipos por modelo"
    },
    xaxis: {
    categories: this.datax
    }
  };
  }




  loadAll(): void {
    this.isLoading = true;

    this.cantidadXModeloService.query().subscribe(
      (res: HttpResponse<ICantidadXModelo[]>) => {
        this.isLoading = false;
        this.cantidadXModelos = res.body ?? [];
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

  trackId(index: number, item: ICantidadXModelo): number {
    return item.id!;
  }

  delete(cantidadXModelo: ICantidadXModelo): void {
    const modalRef = this.modalService.open(CantidadXModeloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXModelo = cantidadXModelo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
