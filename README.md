# Angular Testing

Ejemplos de **pruebas unitarias en Angular** con Jasmine y Karma, sobre una misma aplicación de práctica. Cubre servicios, componentes, directivas, pipes, formularios y rutas.

Este repositorio reúne lo que antes estaba repartido en cuatro: `ng-testing-services`, `ng-testing-components`, `ng-testing-forms` y `ng-testing-routing`.

## Qué se prueba y dónde

| Tema | Técnicas | Dónde mirar |
|---|---|---|
| **Clases y funciones** | Matchers de Jasmine, casos límite | [`calculator.spec.ts`](src/app/calculator.spec.ts), [`person.spec.ts`](src/app/models/person.spec.ts) |
| **Servicios** | Dependencias reales, falsas y con `SpyObj` | [`master.service.spec.ts`](src/app/services/master.service.spec.ts), [`value.service.spec.ts`](src/app/services/value.service.spec.ts) |
| **Servicios HTTP** | `HttpClientTestingModule`, verificación de peticiones, errores e interceptores | [`product.service.spec.ts`](src/app/services/product.service.spec.ts), [`auth.service.spec.ts`](src/app/services/auth.service.spec.ts) |
| **APIs del navegador** | Espías sobre `navigator.geolocation` | [`maps.service.spec.ts`](src/app/services/maps.service.spec.ts) |
| **Componentes** | `@Input`, `@Output`, render, clics y componente anfitrión | [`person.component.spec.ts`](src/app/components/person/person.component.spec.ts), [`people.component.spec.ts`](src/app/components/people/people.component.spec.ts) |
| **Componentes con servicios** | Observables y promesas simulados, `fakeAsync` y `tick` | [`products.component.spec.ts`](src/app/products/components/products/products.component.spec.ts) |
| **Directivas y pipes** | Componente anfitrión, consulta por directiva | [`highlight.directive.spec.ts`](src/app/shared/directives/highlight.directive.spec.ts), [`reverse.pipe.spec.ts`](src/app/shared/pipes/reverse.pipe.spec.ts) |
| **Formularios** | Validadores síncronos y asíncronos, llenado desde la UI, flujo de envío | [`register-form.component.spec.ts`](src/app/auth/components/register-form/register-form.component.spec.ts), [`validators.spec.ts`](src/app/utils/validators.spec.ts) |
| **Rutas** | `ActivatedRoute` simulado, `Location`, `RouterLink` y guards | [`product-detail.component.spec.ts`](src/app/products/components/product-detail/product-detail.component.spec.ts), [`auth.guard.spec.ts`](src/app/guards/auth.guard.spec.ts), [`app.component.spec.ts`](src/app/app.component.spec.ts) |

En [`src/testing`](src/testing) hay funciones de ayuda reutilizables: buscar elementos, simular clics, llenar campos y crear observables o promesas simulados.

## Stack

- Angular 13 y TypeScript
- Jasmine y Karma (Chrome Headless), con reporte de cobertura
- `@faker-js/faker` para generar datos de prueba
- ESLint
- Pico CSS

## Cómo ejecutar

Requiere Node.js 14 o 16 (versiones más nuevas no son compatibles con Angular 13).

```bash
npm install
```

Tests, una sola vez:

```bash
npx ng test --watch=false
```

Tests con reporte de cobertura (queda en `coverage/angular-testing`):

```bash
npx ng test --watch=false --code-coverage
```

Aplicación en `http://localhost:4200`:

```bash
npm start
```

La aplicación usa la API pública [Platzi Fake Store](https://fakeapi.platzi.com/); los tests no hacen peticiones reales.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm test` | Tests en modo observador |
| `npm run lint` | ESLint |
| `npm run build` | Compila para producción |
