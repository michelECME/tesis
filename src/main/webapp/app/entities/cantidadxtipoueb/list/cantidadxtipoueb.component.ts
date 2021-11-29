import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';


import { ICANTIDADXTIPOUEB } from '../cantidadxtipoueb.model';
import { CANTIDADXTIPOUEBService } from '../service/cantidadxtipoueb.service';
import { CANTIDADXTIPOUEBDeleteDialogComponent } from '../delete/cantidadxtipoueb-delete-dialog.component';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


import {

  ApexAxisChartSeries,
  ApexOptions,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { ICantidadXMarca } from "app/entities/cantidad-x-marca/cantidad-x-marca.model";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'jhi-cantidadxtipoueb',
  templateUrl: './cantidadxtipoueb.component.html',
})
export class CANTIDADXTIPOUEBComponent implements OnInit {
  cANTIDADXTIPOUEBS?: ICANTIDADXTIPOUEB[];
  isLoading = false;
  // esto es el grafico
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  //esto es para filtrar 

  filteredAndOrderedEntities?: ICANTIDADXTIPOUEB[];
  filter = '';
  orderProp: keyof ICANTIDADXTIPOUEB = 'tipoCarro';
  ascending = true;


  constructor(protected cANTIDADXTIPOUEBService: CANTIDADXTIPOUEBService, protected modalService: NgbModal) { }


  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.cANTIDADXTIPOUEBS.map(s => {
      const tempObj = [];
      tempObj.push(s.cantidadTipoUEB);
      tempObj.push(s.ueb);
      tempObj.push(s.tipoCarro);
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Entrega por tipo de recurso en las UEB');

    worksheet.addRow([]);

    const header = ['CANTIDAD', 'UEB', 'TIPO'];
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
      this.saveAsExcelFile(data, 'Entrega por tipo de recurso en las UEB');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.cANTIDADXTIPOUEBS!.filter(
      // @ts-ignore
      variable => !this.filter || variable.tipoCarro.toLowerCase().includes(this.filter.toLowerCase())
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
		for (let i = 0; i < this.cANTIDADXTIPOUEBS.length; i++){
		  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		  // @ts-ignore
		  const item = this.cANTIDADXTIPOUEBS[i];
		  this.datay.push(item.cantidadTipoUEB);
		  this.datax.push(item.tipoCarro);
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

    this.cANTIDADXTIPOUEBService.query().subscribe(
      (res: HttpResponse<ICANTIDADXTIPOUEB[]>) => {
        this.isLoading = false;
        this.cANTIDADXTIPOUEBS = res.body ?? [];
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

  trackId(index: number, item: ICANTIDADXTIPOUEB): number {
    return item.id!;
  }

  delete(cANTIDADXTIPOUEB: ICANTIDADXTIPOUEB): void {
    const modalRef = this.modalService.open(CANTIDADXTIPOUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cANTIDADXTIPOUEB = cANTIDADXTIPOUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
