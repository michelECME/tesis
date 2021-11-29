import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ICANTIDADXTIPO } from '../cantidadxtipo.model';
import { CANTIDADXTIPOService } from '../service/cantidadxtipo.service';
import { CANTIDADXTIPODeleteDialogComponent } from '../delete/cantidadxtipo-delete-dialog.component';

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
  selector: 'jhi-cantidadxtipo',
  templateUrl: './cantidadxtipo.component.html',
})
export class CANTIDADXTIPOComponent implements OnInit {
  cANTIDADXTIPOS?: ICANTIDADXTIPO[];
  isLoading = false;
  // esto es el grafico
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  //esto es para filtrar 

  filteredAndOrderedEntities?: ICANTIDADXTIPO[];
  filter = '';
  orderProp: keyof ICANTIDADXTIPO = 'tipo';
  ascending = true;



  constructor(protected cANTIDADXTIPOService: CANTIDADXTIPOService, protected modalService: NgbModal) { }

  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.cANTIDADXTIPOS.map(s => {
      const tempObj = [];
      tempObj.push(s.cantidadTipo);
      tempObj.push(s.tipo);
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Asignaciones por tipo de recurso');

    worksheet.addRow([]);

    const header = ['Cantidad', 'Recurso'];
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
      this.saveAsExcelFile(data, 'Asignaciones por tipo de recurso');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.cANTIDADXTIPOS!.filter(
      // @ts-ignore
      variable => !this.filter || variable.tipo.toLowerCase().includes(this.filter.toLowerCase())
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
    for (let i = 0; i < this.cANTIDADXTIPOS.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = this.cANTIDADXTIPOS[i];
      this.datay.push(item.cantidadTipo);
      this.datax.push(item.tipo);
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
        text: "Cantidad de equipos por tipo"
      },
      xaxis: {
        categories: this.datax
      }
    };
  }

  loadAll(): void {
    this.isLoading = true;

    this.cANTIDADXTIPOService.query().subscribe(
      (res: HttpResponse<ICANTIDADXTIPO[]>) => {
        this.isLoading = false;
        this.cANTIDADXTIPOS = res.body ?? [];
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

  trackId(index: number, item: ICANTIDADXTIPO): number {
    return item.id!;
  }

  delete(cANTIDADXTIPO: ICANTIDADXTIPO): void {
    const modalRef = this.modalService.open(CANTIDADXTIPODeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cANTIDADXTIPO = cANTIDADXTIPO;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
