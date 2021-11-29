import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';

import { IEquipo } from '../equipo.model';
import { EquipoService } from '../service/equipo.service';
import { EquipoDeleteDialogComponent } from '../delete/equipo-delete-dialog.component';

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
  selector: 'jhi-equipo',
  templateUrl: './equipo.component.html',
})
export class EquipoComponent implements OnInit {
  equipos?: IEquipo[];
  isLoading = false;

  filteredAndOrderedEntities?: IEquipo[];
  filter = '';
  orderProp: keyof IEquipo = 'chapa';
  ascending = true;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any = {};
  public datax: any[] = [];
  public datay: any[] = [];

  constructor(protected equipoService: EquipoService, protected modalService: NgbModal) { }


  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.equipos.map(s => {
      const tempObj = [];
      tempObj.push(s.ueb);
      tempObj.push(s.chapa);
      tempObj.push(s.marca);
      tempObj.push(s.modelo);
      tempObj.push(s.chapilla);
      tempObj.push(s.estado);

      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Equipos');

    worksheet.addRow([]);

    const header = ['UEB', 'CHAPA', 'MARCA', 'MODELO', 'CHAPILLA', 'ESTADO'];
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
      this.saveAsExcelFile(data, 'Equipos');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.equipos!.filter(
  // @ts-ignore
        variable => !this.filter || variable.chapa.toLowerCase().includes(this.filter.toLowerCase())
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


  loadAll(): void {
    this.isLoading = true;

    this.equipoService.query().subscribe(
      (res: HttpResponse<IEquipo[]>) => {
        this.isLoading = false;
        this.equipos = res.body ?? [];
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

  trackId(index: number, item: IEquipo): number {
    return item.id!;
  }

  delete(equipo: IEquipo): void {
    const modalRef = this.modalService.open(EquipoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.equipo = equipo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
