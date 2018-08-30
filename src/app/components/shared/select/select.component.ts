import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

export class PopBox {
  constructor(public identification: string, public name: string, public flag?: string) { }
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit {
  private frm: FormGroup;
  private viewFlag: boolean = false;

  @Input()
  public filteredPop: Observable<any[]>;

  @Input()
  public title: string;

  @Output()
  private keydownEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formGroup: FormBuilder) {
    this.frm = formGroup.group({
      'selected': [],
    });
  }

  public ngOnInit() {
    
  }

  private openBox() {

  }

  private SendEvent() {
    this.keydownEvent.emit(this.frm.get('selected').value);
  }

  private onKeydown(event) {
    if (event.key.length > 2) {
      this.filteredPop.forEach(d => {
        if (d === event.key) {

        }
      })
    }
  }
}
