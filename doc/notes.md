### Feature schedule

- [x] Power management
- [x] Toggle existing reminder
- [x] Persistence
- [x] Rehydrate
- [x] Edit prayer
- [x] Add new reminder
- [x] Edit reminder
- [x] Move everything to Main screen so as to have access to useSelector
- [x] Change prayerbook to new format
- [x] Headers
- [x] Options dialog
- [x] Favorite prayerbook prayers
- [x] Background fetch data files
- [ ] Swipe to move screens?  Maybe?

### Pre-release

- [ ] Fix colors on dialogs
- [ ] FAB colors
- [ ] Develop light theme
- [ ] Background event handler for notifications
- [ ] Fix icon

### Morals Tracker

- [ ] Page
- [ ] Buttons
- [ ] Badges
- [ ] Add virtue/vice
- [ ] Edit virtue/vice incl. count
- [ ] Daily bar graph
- [ ] Over-time line graph
- [ ] Import/export

### Future additions

- [ ] Sunrise and sunset alerts
- [ ] Moon phase
- [ ] Almanac page

### Bug fixes

- [x] Reminder sound
- [ ] Reminder icon
- [x] Keys missing
- [ ] Daily alarms not triggering
- [x] Edit first prayer on list doesn't work
- [x] Reminders screen not updating when new reminders added


### Recurring Sunrise/Sunset

If we're using Notifee I think we just have to create individual alarms for each day's sunrise and sunset.
I think I'm going to disable the per-day options -- they're all daily reminders.  It wouldn't be too bad
to create seven individual alarms that would then recur ... oh, wait, the sunrise/sunset might be good
candidates for event triggers maybe.

Remember we have to work out how to run these things on the hourly.  Power management, I mean.  Have to
make sure the app isn't killed in the background.

Anyway I have three reminders set right now, each scheduled to go off in an hour or so.

### Next up

Next up is persistence, with a rehydrate post-function that recreates all the alarms
every time the app is opened.

### Reminders

Now it's clearly necessary to maintain a table in persist that contains the reminder
data, since we want the alarms to show up even if they're disabled.  But I'm not sure
it's necessary to use a side effect to create the trigger -- I'm not sure if it would
still be a pure function but since notif IDs are unique, creating a bunch of notifications
with the same ID shouldn't hurt anything.

The test worked.  So.

### Virtue/Vice Tracker

A series of badges, buttons, that you click, that logs each click with a timestamp,
and ideally with a moon phase, weather, location, so on, but what's the point of
collecting all that data if we're not going to plot it out?  Maybe we could, but eh.
Each click increments the icon badge, reset at midnight or maybe set the day in a
drop-down at the top of the screen.  Actually yeah.  Click the date to set it,
left/right to increment/decrement.  Click one of the buttons and a new day entry
is created in the database (JSON object).  Eventually be able to do a line graph
of progress either individually or as good/bad categories.

Create different sets for Orthodox, Catholic, Paladin, maybe Druid and Asatru, or
hell, maybe just add a few presets and let people create their own.

_Tracker = {
	virtues: [ virtue1 ... virtuex ],
	virtues: {
		[virtue1]: { name: string, color: string }, // same for vices
	vices: [ vice1 ... vicex ],
	history: {
		[date]: {
			[virtue]: int,
			[virtue]: int,
			[vice]: int
		}
	}
}

Then for a given day, retrieve the virtues array and render all the buttons, adding
a badge if there's an entry in the date for that day.  Do the same for vices, and
have a "new virtue" and "new vice" button in the headers or somewhere.  Can
probably use something like the DayChip that I wrote up but didn't end up using.
