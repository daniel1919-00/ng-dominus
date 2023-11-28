import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmxTableComponent } from './dmx-table.component';

describe('DmxTableComponent', () => {
  let component: DmxTableComponent;
  let fixture: ComponentFixture<DmxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmxTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
