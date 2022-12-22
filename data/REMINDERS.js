export const REMINDERS = [
	{
		id: 'defaultSunrise',
		name: 'Sunrise',
		text: '',
		hour: 6,
		minute: 0,
		days: {
			'sunday': true,
			'monday': true,
			'tuesday': true,
			'wednesday': true,
			'thursday': true,
			'friday': true,
			'saturday': true
		},
		active: false,
		created: Date.now(),
		modified: Date.now(),
	},
	{
		id: 'defaultThirdHour',
		name: 'Third Hour',
		text: '',
		hour: 9,
		minute: 0,
		days: {
			'sunday': true,
			'monday': true,
			'tuesday': true,
			'wednesday': true,
			'thursday': true,
			'friday': true,
			'saturday': true
		},
		active: false,
		created: Date.now(),
		modified: Date.now(),
	},
	{
		id: 'defaultSixthHour',
		name: 'Sixth Hour',
		text: '',
		hour: 12,
		minute: 0,
		days: {
			'sunday': true,
			'monday': true,
			'tuesday': true,
			'wednesday': true,
			'thursday': true,
			'friday': true,
			'saturday': true
		},
		active: false,
		created: Date.now(),
		modified: Date.now(),
	},
	{
		id: 'defaultNinthHour',
		name: 'Ninth Hour',
		text: '',
		hour: 15,
		minute: 0,
		days: {
			'sunday': true,
			'monday': true,
			'tuesday': true,
			'wednesday': true,
			'thursday': true,
			'friday': true,
			'saturday': true
		},
		active: false,
		created: Date.now(),
		modified: Date.now(),
	},
	{
		id: 'defaultSunset',
		name: 'Sunset',
		text: '',
		hour: 18,
		minute: 0,
		days: {
			'sunday': true,
			'monday': true,
			'tuesday': true,
			'wednesday': true,
			'thursday': true,
			'friday': true,
			'saturday': true
		},
		active: false,
		created: Date.now(),
		modified: Date.now(),
	}
]


/* NOTES

Reminders:
{
	id: <uuidv4>
	name: String
	text: String
	hour: integer
	minute: integer
	days: { _ReminderDays }
	active: bool
}

*/

