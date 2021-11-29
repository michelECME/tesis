import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';

import { IRecurso } from '../recurso.model';
import { RecursoService } from '../service/recurso.service';
import { RecursoDeleteDialogComponent } from '../delete/recurso-delete-dialog.component';

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
  selector: 'jhi-recurso',
  templateUrl: './recurso.component.html',
})
export class RecursoComponent implements OnInit {
  filteredAndOrderedEntities?: IRecurso[];
  filter = '';
  orderProp: keyof IRecurso = 'nombre';
  ascending = true;
  
   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions: any={};
  public datax: any[]=[];
  public datay: any[]=[];
  


  recursos?: IRecurso[];
  isLoading = false;

  constructor(protected recursoService: RecursoService, protected modalService: NgbModal) {}

  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.recursos.map(s => {
   const tempObj = [];
   tempObj.push(s.nombre);
   tempObj.push(s.tipo);
   tempObj.push(s.um);
   json.push(tempObj);
 });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Recurso');
 
    worksheet.addRow([]);

    const header = ['Nombre', 'Tipo', 'Unidad de medida'];
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
      this.saveAsExcelFile(data, 'Recurso');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.recursos!.filter(
  // @ts-ignore
        chofer => !this.filter || this.recursos.nombre.toLowerCase().includes(this.filter.toLowerCase())
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



  loadAll(): void {
    this.isLoading = true;

    this.recursoService.query().subscribe(
      (res: HttpResponse<IRecurso[]>) => {
        this.isLoading = false;
        this.recursos = res.body ?? [];
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

  trackId(index: number, item: IRecurso): number {
    return item.id!;
  }

  delete(recurso: IRecurso): void {
    const modalRef = this.modalService.open(RecursoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recurso = recurso;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
