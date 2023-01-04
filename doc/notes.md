### Feature schedule

- [x] Power management
- [x] Toggle existing reminder
- [x] Persistence
- [x] Rehydrate
- [x] Edit prayer
- [x] Add new reminder
- [x] Edit reminder
- [ ] Move everything to Main screen so as to have access to useSelector
- [ ] Headers
- [ ] Options dialog
- [ ] Favorite prayerbook prayers
- [ ] Virtue tracker
- [ ] Background fetch data files

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
