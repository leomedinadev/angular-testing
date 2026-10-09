import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { generateOneUser } from '../models/user.mock';
import { User } from '../models/user.model';

describe('AuthGuard', () => {
  let router: jasmine.SpyObj<Router>;
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  // Crea el guard con una sesión dada (usuario o null)
  const createGuard = (user: User | null) => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { user$: of(user) } },
        { provide: TokenService, useValue: jasmine.createSpyObj('TokenService', ['getToken']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ]
    });
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    return TestBed.inject(AuthGuard);
  };

  const canActivate = (guard: AuthGuard) =>
    firstValueFrom(guard.canActivate(route, state) as Observable<boolean>);

  it('should allow the navigation when there is a user in session', async () => {
    const guard = createGuard(generateOneUser());

    expect(await canActivate(guard)).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block the navigation and redirect to /home without a user', async () => {
    const guard = createGuard(null);

    expect(await canActivate(guard)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
