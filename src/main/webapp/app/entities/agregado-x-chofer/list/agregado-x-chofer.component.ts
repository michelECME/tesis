
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { IAgregadoXChofer } from '../agregado-x-chofer.model';
import { AgregadoXChoferService } from '../service/agregado-x-chofer.service';
import { AgregadoXChoferDeleteDialogComponent } from '../delete/agregado-x-chofer-delete-dialog.component';
import { ViewChild } from "@angular/core";
import {ChartComponent} from "ng-apexcharts";

import {Workbook} from "exceljs";
import * as FileSaver from 'file-saver';

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
  selector: 'jhi-agregado-x-chofer',
  templateUrl: './agregado-x-chofer.component.html',
})

export class AgregadoXChoferComponent implements OnInit {
//esto es para filtrar 
filteredAndOrderedEntities?: IAgregadoXChofer[];
filter = '';
orderProp: keyof IAgregadoXChofer = 'chapa';
ascending = true;

  // esto es el grafico
  agregadoXChofers?: IAgregadoXChofer[];
  isLoading = false;
   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions: any={};
  public datax: any[]=[];
  public datay: any[]=[];
  
  constructor(protected agregadoXChoferService: AgregadoXChoferService,
     protected modalService: NgbModal) {
  
      
    }



    public exportAsExcelFile(): void {
      const json: any[] = [];
      // @ts-ignore
      this.agregadoXChofers.map(s => {
     const tempObj = [];
     tempObj.push(s.cantidadChorfer);
     tempObj.push(s.chapa);
     tempObj.push(s.nombre);
     json.push(tempObj);
   });
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Agregado por chofer');
   
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
  

  loadAll(): void {
    this.isLoading = true;

    this.agregadoXChoferService.query().subscribe(
      (res: HttpResponse<IAgregadoXChofer[]>) => {
        this.isLoading = false;
        this.agregadoXChofers = res.body ?? [];
        this.loadChart();
        this.filterAndSort();
      
    //    this.exportAsExcelFile();
      },
      () => {
        this.isLoading = false;
      }
    );
  }


  //metodo de ordenar
  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.agregadoXChofers!.filter(
  // @ts-ignore
        chofer => !this.filter || chofer.chapa.toLowerCase().includes(this.filter.toLowerCase())
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

//exportar a excel


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

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAgregadoXChofer): number {
    return item.id!;
  }

  delete(agregadoXChofer: IAgregadoXChofer): void {
    const modalRef = this.modalService.open(AgregadoXChoferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agregadoXChofer = agregadoXChofer;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
