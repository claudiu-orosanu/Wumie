import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownValue} from "../../entities/dropdownValue";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, AfterViewInit{

  @Input()
  values: any[];

  @Input()
  width: number;
  @Input()
  placeholder: string;
  @Input()
  isDisabled: boolean;

  @Input()
  selectedElement: any;
  @Output()
  select: EventEmitter<any> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    if (!this.selectedElement) {
      this.selectedElement = new DropdownValue(null, 'Select');
      if (this.placeholder) {
        this.selectedElement.name = this.placeholder;
      }
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  selectItem(value) {
    this.selectedElement = value;
    this.select.emit(value);
  }

}
