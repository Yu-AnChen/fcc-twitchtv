import { Component, OnInit } from '@angular/core';
import { TwitchtvService } from './twitchtv.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';

@Component({
	selector: 'app-twitchtv',
	templateUrl: './twitchtv.component.html',
	styleUrls: ['./twitchtv.component.scss'],
	providers: [TwitchtvService]
})
export class TwitchtvComponent implements OnInit {
	channelsAndStreams;
	show = {
		stream: true,
		offline: false
	};
	constructor(private twitchtvService: TwitchtvService) { }

	ngOnInit() {
		// let fcc = this.twitchtvService.getStreamers('freecodecamp');
		let channelNames = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp'];
		let streamers = channelNames.map(channel => this.twitchtvService.getStreamer(channel));
		let channels = channelNames.map(channel => this.twitchtvService.getChannel(channel));

		// this.channelsAndStreams = Observable
			Observable.forkJoin([...channels, ...streamers])
			.do(data => console.log(data))
			.subscribe(result => {
				this.channelsAndStreams = this._parseData(result);
			});
		// this.twitchtvService.getStreamers('freecodecamp')
			// .subscribe(result => console.log(result));
	}

	toggle(bool) {
		return this.show[bool] = !this.show[bool];
	}

	decideShow(stream) {
		if (stream && this.show.stream) {
			return true;
		}
		if (!stream && this.show.offline) {
			return true;
		}
		return false;
	}
	_parseData(data) {
		let channelDatas = data.slice(0, data.length / 2);
		let streamDatas = data.slice(data.length / 2 - 1);
		return channelDatas.map((element, idx) => [element, streamDatas[idx]]);
	}

}
