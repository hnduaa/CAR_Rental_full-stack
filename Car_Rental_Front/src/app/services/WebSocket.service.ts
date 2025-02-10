import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = new Socket({
        url: environment.SOCKET_URL,
        options: { transports: ['websocket'] }
      });
    }
  }

  // Emit an event to the server
  sendMessage(event: string, data: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket.emit(event, data);
    }
  }

  // Listen for an event from the server
  onMessage(event: string) {
    return this.socket.fromEvent(event);
  }
}
