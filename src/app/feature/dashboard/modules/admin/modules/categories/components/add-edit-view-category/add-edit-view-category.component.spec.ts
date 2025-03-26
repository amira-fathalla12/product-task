import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewCategoryComponent } from './add-edit-view-category.component';

describe('AddEditViewCategoryComponent', () => {
  let component: AddEditViewCategoryComponent;
  let fixture: ComponentFixture<AddEditViewCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditViewCategoryComponent]
    });
    fixture = TestBed.createComponent(AddEditViewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
