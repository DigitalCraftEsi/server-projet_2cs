import Jasmine from "jasmine"
import JasmineConsoleReporter from "jasmine-console-reporter"

const jasmine = new Jasmine()
jasmine.loadConfigFile( "./support/jasmine.json" )

jasmine.env.clearReporters()
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
    listStyle: 'indent', // "flat"|"indent"
    timeUnit: 'ms',      // "ms"|"ns"|"s"
    timeThreshold: { ok: 500, warn: 1000, ouch: 3000 }, // Object|Number
    activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
    emoji: true,
    beep: true
});
jasmine.addReporter(reporter)

export default jasmine