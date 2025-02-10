// rx-stomp.config.ts
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';

export const rxStompConfig: InjectableRxStompConfig = {
  // This URL must match the endpoint defined in your Spring WebSocketConfig.
  brokerURL: 'ws://localhost:8080/ws',
  reconnectDelay: 5000,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
  // If you need SockJS support, you can add a webSocketFactory here.
  // webSocketFactory: () => new SockJS('http://localhost:8080/ws')
};
