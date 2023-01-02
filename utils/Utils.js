export const niceTime = d => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(':').slice(0, 2).join(':');
