 
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { DeviceListComponent } from '../components/content/device-list/device-list.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'https://138.197.130.191/api/websocket-example';
    topic: string = "/topic/user";
    stompClient: any;
    //appComponent: DeviceListComponent;
    constructor(){
        
    }
    _connect(callback: any) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                
                callback(_this.onMessageReceived(sdkEvent))
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect((val: any) => {
                
              });
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/user", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log( JSON.parse(message.body));
        return JSON.parse(message.body);
        //this.appComponent.handleMessage(JSON.stringify(message.body.content));
    }




}