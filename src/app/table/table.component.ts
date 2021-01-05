import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableDataSrc: any;
  dataSource = [TRANSACTION_DATA];
  displayedColumns: string[] = ['date', 'amount', 'category'];  

  tableData: {}[] =[
    {
      date: '2019-08-28', 
      amount: '108',
      category: 'Advertising & Marketing'
    }
  ]
  // date= new FormControl('');
  // amount= new FormControl('');
  // category= new FormControl('');

  dataForm: FormGroup;
  name;
  email;
  exportService: any;
  constructor(private fb: FormBuilder) {
    this.exportService = new ExportService();
   }

  ngOnInit() {
    // Add your Validators here -- Requirement 4
    this.tableDataSrc = new MatTableDataSource(this.tableData);

  	this.dataForm = this.fb.group({
      name: ['',Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
     })
  }

  updateValue() {
  	if (this.dataForm.valid) {
  		this.name = this.dataForm.value.name;
      this.email = this.dataForm.value.email;
  	}

  }

  export() {
    console.log("'exportAsExcelFile' fnuction works well, just pass the data that you need to export into 'exportAsExcelFile' function")
    
    this.exportService.exportAsExcelFile(this.dataSource);
  }

}


const TRANSACTION_DATA = {
  "data":[
    {      
      "amount":"108",
      "category":"Advertising & Marketing",      
      "date":"2019-08-28",                
    },
    {"amount":"79","category":"Cell & Telephone","date":"2019-08-26"},
    {"amount":"-91.46","category":"Advertising & Marketing","date":"2019-08-24"},
    {"amount":"-108","category":"Advertising & Marketing","date":"2019-08-24"},
    {"amount":"-93","category":"Advertising & Marketing","date":"2019-08-20"},     
  ]  
}

