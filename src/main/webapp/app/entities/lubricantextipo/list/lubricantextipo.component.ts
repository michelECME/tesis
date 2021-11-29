import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
//lubricante por nombre
import { ILUBRICANTEXTIPO } from '../lubricantextipo.model';
import { LUBRICANTEXTIPOService } from '../service/lubricantextipo.service';
import { LUBRICANTEXTIPODeleteDialogComponent } from '../delete/lubricantextipo-delete-dialog.component';

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
  selector: 'jhi-lubricantextipo',
  templateUrl: './lubricantextipo.component.html',
})
export class LUBRICANTEXTIPOComponent implements OnInit {
  lUBRICANTEXTIPOS?: ILUBRICANTEXTIPO[];
  isLoading = false;

  filteredAndOrderedEntities?: ILUBRICANTEXTIPO[];
  filter = '';
  orderProp: keyof ILUBRICANTEXTIPO = 'lubricante';
  ascending = true;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];

  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.lUBRICANTEXTIPOS.map(s => {
      const tempObj = [];
      tempObj.push(s.cantidadLubricante);
      tempObj.push(s.lubricante);

      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Lubricante por tipo');

    worksheet.addRow([]);

    const header = ['Cantidad asignada', 'Lubricante'];
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
      this.saveAsExcelFile(data, 'Entrega de lubricantes por tipo');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }



  constructor(protected lUBRICANTEXTIPOService: LUBRICANTEXTIPOService, protected modalService: NgbModal) { }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.lUBRICANTEXTIPOS!.filter(
  // @ts-ignore
        variable => !this.filter || variable.lubricante.toLowerCase().includes(this.filter.toLowerCase())
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
    for (let i = 0; i < this.lUBRICANTEXTIPOS.length; i++){
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = this.lUBRICANTEXTIPOS[i];
      this.datay.push(item.cantidadLubricante);
      this.datax.push(item.lubricante);
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
        text: "Lubricante asignado por tipo"
      },
      xaxis: {
        categories: this.datax
      }
    };
  }




  loadAll(): void {
    this.isLoading = true;

    this.lUBRICANTEXTIPOService.query().subscribe(
      (res: HttpResponse<ILUBRICANTEXTIPO[]>) => {
        this.isLoading = false;
        this.lUBRICANTEXTIPOS = res.body ?? [];
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

  trackId(index: number, item: ILUBRICANTEXTIPO): number {
    return item.id!;
  }

  delete(lUBRICANTEXTIPO: ILUBRICANTEXTIPO): void {
    const modalRef = this.modalService.open(LUBRICANTEXTIPODeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lUBRICANTEXTIPO = lUBRICANTEXTIPO;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
