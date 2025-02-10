import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Import STOMP-related providers and configuration.
import {
  InjectableRxStompConfig,
  rxStompServiceFactory,
  RxStompService
} from '@stomp/ng2-stompjs';
import { rxStompConfig } from './app/rx-stomp.config';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,
    provideAnimationsAsync(),
    // Provide the STOMP configuration.
    { provide: InjectableRxStompConfig, useValue: rxStompConfig },
    // Provide the RxStompService using its factory.
    { provide: RxStompService, useFactory: rxStompServiceFactory, deps: [InjectableRxStompConfig] }
  ]
});
