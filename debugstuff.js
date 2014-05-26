
function describeElement(t) {
    if (t==null) return "null element";
    return t.nodeName + " " + t.id + " (" + t.className + ")"

}
function describeEventTarget(event) {
    if (event==null) return "null event";
    return describeElement(event.target);
}

var boringEvents = ['move', 'enter', 'leave'];

function runForFilteredEvents(target, event, f) {
    var eventType = event.type;
    if (!(eventType.indexOf('mouse')>=0 || boringEvents.indexOf(eventType)>=0)) {
        f(target, event, eventType);
    }
}


// pick one


runForFilteredEvents(e, function(event, eventType){
    console.log(eventType + "->" + describeEventTarget(event));
});
runForFilteredEvents(this, event, function(target, event, eventType){
    console.log(eventType + "/" + name + "->" + describeElement(target));
});




function describeElement(t) {
    if (t==null) return "null element";
    return t.nodeName + " " + t.id + " (" + t.className + ")"

}
function describeEventTarget(event) {
    if (event==null) return "null event";
    return describeElement(event.target);
}

var boringEvents = ['move', 'enter', 'leave'];

function runForFilteredEvents(target, event, f) {
    var eventType = event.type;
    if (!(eventType.indexOf('mouse')>=0 || boringEvents.indexOf(eventType)>=0)) {
        f(target, event, eventType);
    }
}


runForFilteredEvents(this, event, function(target, event, eventType){
    console.log(eventType + "/" + name + "->" , target);
});