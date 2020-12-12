import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSalaryComponent } from './search-salary.component';

describe('SearchSalaryComponent', () => {
  let component: SearchSalaryComponent;
  let fixture: ComponentFixture<SearchSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
