import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';

import { ILUBRICANTEXUEB } from '../lubricantexueb.model';
import { LUBRICANTEXUEBService } from '../service/lubricantexueb.service';
import { LUBRICANTEXUEBDeleteDialogComponent } from '../delete/lubricantexueb-delete-dialog.component';


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
  selector: 'jhi-lubricantexueb',
  templateUrl: './lubricantexueb.component.html',
})
export class LUBRICANTEXUEBComponent implements OnInit {
  lUBRICANTEXUEBS?: ILUBRICANTEXUEB[];
  isLoading = false;

  filteredAndOrderedEntities?: ILUBRICANTEXUEB[];
  filter = '';
  orderProp: keyof ILUBRICANTEXUEB = 'ueb';
  ascending = true;


  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];


  constructor(
    protected lUBRICANTEXUEBService: LUBRICANTEXUEBService,
    protected modalService: NgbModal) { }



  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.lUBRICANTEXUEBS.map(s => {
      const tempObj = [];
      tempObj.push(s.cantidadLubricanteUEB);
      tempObj.push(s.ueb);
      
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Cantidad de lubricante por UEB');

    worksheet.addRow([]);

    const header = ['Cantiad', 'UEB'];
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
      this.saveAsExcelFile(data, 'Lubricantes por UEB');
    });
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }


  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.lUBRICANTEXUEBS!.filter(
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

//exportar a excel


  loadChart(): void{
    this.datax=[];
    this.datay=[];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    for (let i = 0; i < this.lUBRICANTEXUEBS.length; i++){
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const item = this.lUBRICANTEXUEBS[i];
      this.datay.push(item.cantidadLubricanteUEB);
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
        text: "Volumen de lubricante asignados a las UEB's"
      },
      xaxis: {
        categories: this.datax
      }
    };
  }



  loadAll(): void {
    this.isLoading = true;

    this.lUBRICANTEXUEBService.query().subscribe(
      (res: HttpResponse<ILUBRICANTEXUEB[]>) => {
        this.isLoading = false;
        this.lUBRICANTEXUEBS = res.body ?? [];
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

  trackId(index: number, item: ILUBRICANTEXUEB): number {
    return item.id!;
  }

  delete(lUBRICANTEXUEB: ILUBRICANTEXUEB): void {
    const modalRef = this.modalService.open(LUBRICANTEXUEBDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lUBRICANTEXUEB = lUBRICANTEXUEB;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
