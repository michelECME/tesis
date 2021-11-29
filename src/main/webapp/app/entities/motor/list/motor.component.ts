import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Subscription } from 'rxjs';
import { ChartComponent } from "ng-apexcharts";
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';

import { IMotor } from '../motor.model';
import { MotorService } from '../service/motor.service';
import { MotorDeleteDialogComponent } from '../delete/motor-delete-dialog.component';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'jhi-motor',
  templateUrl: './motor.component.html',
})
export class MotorComponent implements OnInit {
  filteredAndOrderedEntities?: IMotor[];
  filter = '';
  orderProp: keyof IMotor = 'codigo';
  ascending = true;


  motors?: IMotor[];
  isLoading = false;

  constructor(protected motorService: MotorService, protected modalService: NgbModal) { }

  public exportAsExcelFile(): void {
    const json: any[] = [];
    // @ts-ignore
    this.motors.map(s => {
      const tempObj = [];
      tempObj.push(s.codigo);
      tempObj.push(s.estado);
      tempObj.push(s.marca);
      json.push(tempObj);
    });
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Marca');

    worksheet.addRow([]);

    const header = ['Codigo', 'Estado', 'Marca'];
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
      this.saveAsExcelFile(data, 'Motor');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  filterAndSort(): void {
    this.filteredAndOrderedEntities = this.motors!.filter(
  // @ts-ignore
        chofer => !this.filter || chofer.marca.toLowerCase().includes(this.filter.toLowerCase())
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

    this.motorService.query().subscribe(
      (res: HttpResponse<IMotor[]>) => {
        this.isLoading = false;
        this.motors = res.body ?? [];
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

  trackId(index: number, item: IMotor): number {
    return item.id!;
  }

  delete(motor: IMotor): void {
    const modalRef = this.modalService.open(MotorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.motor = motor;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
