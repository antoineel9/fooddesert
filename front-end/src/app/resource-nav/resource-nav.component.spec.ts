import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNavComponent } from './resource-nav.component';

describe('ResourceNavComponent', () => {
  let component: ResourceNavComponent;
  let fixture: ComponentFixture<ResourceNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
