import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from '../../../services/product.service';
import { generateOneProduct } from '../../../models/product.mock';
import { mockObservable, asyncError, query } from '../../../../testing';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;
  // Simula los parámetros de la ruta /products/:id
  let paramMap: BehaviorSubject<ParamMap>;

  beforeEach(async () => {
    paramMap = new BehaviorSubject(convertToParamMap({}));

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap } },
        { provide: ProductsService, useValue: jasmine.createSpyObj('ProductsService', ['getOne']) },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back']) },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    paramMap.next(convertToParamMap({ id: '1' }));
    productsService.getOne.and.returnValue(mockObservable(generateOneProduct()));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show the product of the id in the route', () => {
    const product = { ...generateOneProduct(), id: '2' };
    paramMap.next(convertToParamMap({ id: '2' }));
    productsService.getOne.and.returnValue(mockObservable(product));

    fixture.detectChanges(); // ngOnInit
    fixture.detectChanges(); // render del producto

    expect(productsService.getOne).toHaveBeenCalledWith('2');
    expect(query(fixture, 'h1').nativeElement.textContent).toContain(product.title);
    expect(location.back).not.toHaveBeenCalled();
  });

  it('should go back when the route has no id', () => {
    fixture.detectChanges();

    expect(productsService.getOne).not.toHaveBeenCalled();
    expect(location.back).toHaveBeenCalled();
  });

  it('should go back when the product does not exist', async () => {
    paramMap.next(convertToParamMap({ id: 'no-existe' }));
    productsService.getOne.and.returnValue(asyncError('not found'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.product).toBeNull();
    expect(location.back).toHaveBeenCalled();
  });

  it('should load another product when the id in the route changes', () => {
    productsService.getOne.and.returnValue(mockObservable(generateOneProduct()));
    paramMap.next(convertToParamMap({ id: '1' }));
    fixture.detectChanges();

    paramMap.next(convertToParamMap({ id: '5' }));

    expect(productsService.getOne).toHaveBeenCalledTimes(2);
    expect(productsService.getOne).toHaveBeenCalledWith('5');
  });
});
