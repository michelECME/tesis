import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';

import { ICantidadXMarca } from '../cantidad-x-marca.model';
import { CantidadXMarcaService } from '../service/cantidad-x-marca.service';
import { CantidadXMarcaDeleteDialogComponent } from '../delete/cantidad-x-marca-delete-dialog.component';


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
  selector: 'jhi-cantidad-x-marca',
  templateUrl: './cantidad-x-marca.component.html',
})
export class CantidadXMarcaComponent implements OnInit {
  cantidadXMarcas?: ICantidadXMarca[];
  isLoading = false;


  //filtro
  filteredAndOrderedEntities?: ICantidadXMarca[];
  filter = '';
  orderProp: keyof ICantidadXMarca = 'modelo';
  ascending = true;

  //grafico
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  constructor(

    protected cantidadXMarcaService: CantidadXMarcaService,
    protected modalService: NgbModal) {
  }


  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.cantidadXMarcas.map(s => {
      const tempObj = [];
      tempObj.push(s.cantidadMarca);
      tempObj.push(s.modelo);
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cantidad por marca');

    worksheet.addRow([]);

    const header = ['Cantidad', 'Marca'];
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
      this.saveAsExcelFile(data, 'Cantidad por marca');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.cantidadXMarcas!.filter(
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

  loadChart(): void {
    this.datax = [];
    this.datay = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    for (let i = 0; i < this.cantidadXMarcas.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = this.cantidadXMarcas[i];
      this.datay.push(item.cantidadMarca);
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
        text: "Cantidad por marca"
      },
      xaxis: {
        categories: this.datax
      }
    };
  }



  loadAll(): void {
    this.isLoading = true;

    this.cantidadXMarcaService.query().subscribe(
      (res: HttpResponse<ICantidadXMarca[]>) => {
        this.isLoading = false;
        this.cantidadXMarcas = res.body ?? [];
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

  trackId(index: number, item: ICantidadXMarca): number {
    return item.id!;
  }

  delete(cantidadXMarca: ICantidadXMarca): void {
    const modalRef = this.modalService.open(CantidadXMarcaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cantidadXMarca = cantidadXMarca;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
