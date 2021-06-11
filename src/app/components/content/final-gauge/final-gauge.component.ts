import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DeviceService } from 'src/app/_services/device.service';
import { jqxKnobComponent } from 'jqwidgets-ng/jqxknob';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';

import { jqxGaugeComponent } from 'jqwidgets-ng/jqxgauge';
import { jqxLinearGaugeComponent } from 'jqwidgets-ng/jqxlineargauge';
import { WebSocketAPI } from 'src/app/_socket/WebSocketAPI ';

@Component({
  selector: 'app-final-gauge',
  templateUrl: './final-gauge.component.html',
  styleUrls: ['./final-gauge.component.css'],
})
export class FinalGaugeComponent implements OnInit, OnDestroy {
  obj: any;

  data: any = {
    DHT11: {
      Temperature: '0',
    }
  };

  temp: number = 10;

  device: any = {
    power: false,
    dn: '----',
    hn: '----',
    ip: '----',
  };

  public canvasWidth = 300;
  public needleValue: number = 0;
  public centralLabel = '';
  public name = 'Temperature ';
  public bottomLabel = '---';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [30],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  };

  webSocketAPI!: WebSocketAPI;

  gaugeType = 'semi';
  c = 4;
  lgaugeLabel = 'Heat';
  lgaugeAppendText = 'C°';
  thresholdConfig = {
    '0': { color: 'green' },
    '40': { color: 'orange' },
    '75.5': { color: 'red' },
    '100': { color: 'black' },
  };

  constructor(private deviceSrvice: DeviceService) {}

  ngOnDestroy(): void {
    this.disconnect();
  }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI();
    this.connect();

    // todo => 
    if (this.obj.dn != undefined) {
      this.device.dn = this.obj.dn;
    }
    if (this.obj.ip != undefined) {
      this.device.ip = this.obj.ip;
    }

    if (this.obj.POWER1 != undefined) {
      let p: String = new String(this.obj.POWER1);
      console.log('actual value ' + p);
      if (p.includes('ON')) {
        console.log('ON test ' + p.includes('ON'));
        this.data.power = true;
      } else if (p.includes('OFF')) {
        console.log('OFF test ' + p.includes('OFF'));
        this.data.power = false;

        this.data.DHT11.Temperature = 0;
      }
    }

    if (this.obj.DHT11.Temperature != undefined) {
      console.log('sdsdsd' + this.obj.DHT11.Temperature);
      let temp = this.obj.DHT11.Temperature;
      this.needleValue = +this.obj.DHT11.Temperature;
      this.data.DHT11.Temperature = this.obj.DHT11.Temperature;
    }
  }

  connect() {
    return this.webSocketAPI._connect((val: any) => {
      this.obj = val;
      this.device =val
      this.data = val

      console.log(val);
    });
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }



  /** volume ----- */
  @ViewChild('myKnob', { static: false })
  myKnob!: jqxKnobComponent;
  @ViewChild('myNumberInput', { static: false })
  myNumberInput!: jqxNumberInputComponent;
  style: any = {
    stroke: '#dfe3e9',
    strokeWidth: 3,
    fill: {
      color: '#fefefe',
      gradientType: 'linear',
      gradientStops: [
        [0, 1],
        [50, 0.9],
        [100, 1],
      ],
    },
  };
  marks: any = {
    colorRemaining: { color: 'grey', border: 'grey' },
    colorProgress: { color: '#00a4e1', border: '#00a4e1' },
    type: 'line',
    offset: '71%',
    thickness: 3,
    size: '6%',
    majorSize: '9%',
    majorInterval: 10,
    minorInterval: 2,
  };
  labels1: any = {
    offset: '88%',
    step: 10,
    visible: true,
  };
  progressBar: any = {
    style: { fill: '#00a4e1', stroke: 'grey' },
    size: '9%',
    offset: '60%',
    background: { fill: 'grey', stroke: 'grey' },
  };
  pointer: any = {
    type: 'arrow',
    style: { fill: '#00a4e1', stroke: 'grey' },
    size: '59%',
    offset: '49%',
    thickness: 20,
  };
  onChange(event: any): void {
    if (
      event.args.changeSource == 'propertyChange' ||
      event.args.changeSource == 'val'
    ) {
      return;
    }
    this.myNumberInput.val(event.args.value);
    console.log(event.args.value);
  }
  onMouseDown(event: any): void {
    event.stopPropagation();
  }
  onKeyup(): void {
    let val = this.myNumberInput.val();
    this.myKnob.val(val);
  }
  onValueChanged(): void {
    let val = this.myNumberInput.val();
    this.myKnob.val(val);
  }
  onChagePowerState(v: boolean) {
    console.log(v);
    this.data.power = v;
    if (!v) {
      this.data.DHT11.Temperature = 0;
    }
    console.log(this.data.power);
    this.deviceSrvice
      .changeState('TOGGLE')
      .pipe()
      .subscribe((data) => console.log(data));
  }
}
