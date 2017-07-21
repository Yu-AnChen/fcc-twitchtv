import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitchtvService {
	private url = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/';
	private channelNames = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

	constructor(private http: Http) { }

	getChannelsAndStreams() {
		let streamers = this.channelNames.map(channel => this.getStreamer(channel));
		let channels = this.channelNames.map(channel => this.getChannel(channel));

		return Observable.forkJoin([...channels, ...streamers])
			.map((data) => this._parseData(data));
			// .do(data => console.log(data))
	}

	getStreamer(channelName: string) {
		return this.http
			.get(this.url + 'streams/' + channelName)
			.map(this.extractData);
	}

	getChannel(channelName) {
		return this.http
			.get(this.url + 'channels/' + channelName)
			.map(this.extractData);
	}


	private _parseData(data) {
		let channelDatas = data.slice(0, data.length / 2);
		let streamDatas = data.slice(data.length / 2 - 1);
		return channelDatas.map((element, idx) => [element, streamDatas[idx]]);
	}

	private extractData(res: Response): any {
		let body = res.json();
		return body || [];
	}
}
