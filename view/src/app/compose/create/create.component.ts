import { Component } from '@angular/core';
import { BinService } from '../../services/bin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create',
  templateUrl: './create.template.html',
  styleUrls: ['./create.component.css'],
  providers: [BinService]
})
export class CreateComponent {

  data = undefined;

  constructor(
    private binService: BinService,
    private router: Router
  ) {}

  setData(event) {
    this.data = event.target.value;
  }

  onSubmit(form) {
    if (this.data) {
      this.binService.create(this.data).subscribe(
        value => {
          this.router.navigate([value._id]);
        },
        console.error
      );
    }
  }

}
