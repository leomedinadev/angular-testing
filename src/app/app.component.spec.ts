import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { AppComponent } from './app.component';
import { query, queryAllByDirective } from '../testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-testing-services'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-testing-services');
  });

  it('should render the navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const links = queryAllByDirective(fixture, RouterLinkWithHref)
      .map(debugElement => debugElement.injector.get(RouterLinkWithHref).href);
    expect(links).toEqual([
      '/', '/auth/register', '/products', '/people', '/others', '/pico-preview', '/auth/login'
    ]);
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(query(fixture, 'router-outlet')).toBeTruthy();
  });
});
