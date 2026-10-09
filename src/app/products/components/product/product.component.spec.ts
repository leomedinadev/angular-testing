import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { generateOneProduct } from '../../../models/product.mock';
import { query } from '../../../../testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const product = generateOneProduct();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    // El @Input es obligatorio: el template lee product.images
    component.product = product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title, price and description of the product', () => {
    const caption: HTMLElement = query(fixture, 'figcaption').nativeElement;
    const description: HTMLElement = query(fixture, 'p').nativeElement;

    expect(caption.textContent).toContain(product.title);
    expect(caption.textContent).toContain(`${product.price}`);
    expect(description.textContent).toContain(product.description);
  });
});
