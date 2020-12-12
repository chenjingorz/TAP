import { Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent{
  isExpanded = true;
  isShowing = false;

  mouseenter(): void {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave(): void{
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
