import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { BinService } from '../../services/bin.service';
import { highlight } from 'highlight.js';

@Component({
  selector: 'app-root',
  templateUrl: './view.template.html',
  styleUrls: ['./view.component.css'],
  providers: [BinService]
})
export class ViewComponent {
  createdAt = 'Loading...';
  id = undefined;
  value = 'Loading...';

  constructor(
    private location: Location,
    private binService: BinService
  ) {}

  private static formatDate(date: Date): string {
    return `Code created at ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  ngOnInit() {
    let idArgs = this.location.path().substring(1).split('.');
    let id = idArgs[0];
    let lang = idArgs[1];
    if (id.length != 6) {
      this.id = undefined;
    } else {
      this.binService.fetch(id).subscribe(
        value => {
          console.log(value.data);
          this.createdAt = ViewComponent.formatDate(new Date(Date.parse(value.createdAt)));
          this.id = value.id;
          if (lang) {
            this.value = highlight(lang, value.data).value;
          } else {
            this.value = highlight('c', value.data).value;
          }
          this.value = this.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
        },
        error => {
          this.createdAt = "404 :(";
          this.value = "Code not found";
        }
      );
    }
  }

}
