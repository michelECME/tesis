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

import { ICantidadXUEB } from '../cantidad-xueb.model';
import { CantidadXUEBService } from '../service/cantidad-xueb.service';
import { CantidadXUEBDeleteDialogComponent } from '../delete/cantidad-xueb-delete-dialog.component';

@Component({
  selector: 'jhi-cantidad-xueb',
  templateUrl: './cantidad-xueb.component.html',
})
export class CantidadXUEBComponent implements OnInit {
  cantidadXUEBS?: ICantidadXUEB[];
  isLoading = false;


  // esto es el grafico
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  //esto es para filtrar 

  filteredAndOrderedEntities?: ICantidadXUEB[];
  filter = '';
  orderProp: keyof ICantidadXUEB = 'ueb';
  ascending = true;

  constructor(protected cantidadXUEBService: CantidadXUEBService, protected modalService: NgbModal) { }

  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.cantidadXUEBS.map(s => {
      const tempObj = [];

      tempObj.push(s.cantidadModelo);
      tempObj.push(s.ueb);
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cantidad de equipos por UEB');

    worksheet.addRow([]);

    const header = ['Cantidad', 'UEB'];
    worksheet.addRow(header);
    worksheet.getRow(worksheet.rowCount).eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3FCF61' }
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
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
      this.saveAsExcelFile(data, 'Entregas por UEB');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.cantidadXUEBS!.filter(
      // @ts-ignore
      variable => !this.filter || variable.ueb.toLowerCase().includes(this.filter.toLowerCase())
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

  loadChart(): void {
    this.datax = [];
    this.datay = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    for (let i = 0; i < this.cantidadXUEBS.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = this.cantidadXUEBS[i];
      this.datay.push(item.cantidadModelo);
      this.datax.push(item.ueb);
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
        text: "Cantidad de equipos por UEB"
      },
      xaxis: {
        categories: this.datax
      }
    };
  }





  loadAll(): void {
    this.isLoading = true;

    this.cantidadXUEBService.query().subscribe(
      (res: HttpResponse<ICantidadXUEB[]>) => {
        this.isLoading = false;
        this.cantidadXUEBS = res.body ?? [];
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

  trackId(index: number, item: ICantidadXUEB): number {
    return item.id!;
  }

  delete(cantidadXUEB: ICantidadXUEB): void {
    const modalRef = this.modalService.open(CantidadXUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXUEB = cantidadXUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
