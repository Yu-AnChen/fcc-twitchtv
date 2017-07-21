import { Component, OnInit } from '@angular/core';
import { TwitchtvService } from './twitchtv.service';

import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Component({
	selector: 'app-twitchtv',
	templateUrl: './twitchtv.component.html',
	styleUrls: ['./twitchtv.component.scss'],
	providers: [TwitchtvService],
	animations: [
		trigger('fadeInOut', [
			state('in', style({ opacity: 1 })),
			transition('void => *', [
				style({ opacity: 0 }),
				animate(500)
			]),
			transition('* => void', [
				animate(200, style({ opacity: 0 }))
			])
		]),
		trigger('flyInOut', [
			state('true', style({ opacity: '1', display: 'flex' })),
			state('false', style({ opacity: '0', display: 'none'  })),
			transition('true => false', animate(500)),
			transition('false => true', animate(500)),
			transition('void => true', [
				style({ opacity: '0', display: 'flex'}),
				animate(500)
			]),
		]),
	]
})
export class TwitchtvComponent implements OnInit {
	channelsAndStreams;
	show = {
		stream: true,
		offline: false
	};
	constructor(private twitchtvService: TwitchtvService) { }

	ngOnInit() {
		this.twitchtvService.getChannelsAndStreams()
			.delay(1500)
			.subscribe(result => {
				this.channelsAndStreams = result;
			});
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
}
