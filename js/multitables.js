// select table - rh 2017.08.10

$(document).ready(function(){
    //creates jump menu to select table
    initSelectA11y();
});


// init funtion - shows controls and sets actions on select control
function initSelectA11y() {
    $(".grid-sort-controls").removeClass("hidden").attr("aria-hidden","false");
    $(".select-a11y").each(function(){
        this.changed = false;
        this.onfocus = selectFocussed;
        this.onchange = selectChanged;
        this.onkeydown = selectKeyed;
        this.onclick = selectClicked;
    });
    return true;
}

function selectFocussed() {
    this.initValue = this.value;
    return true;
}

// set as select function by setup
function selectChanged(curr) {

    //if called from a change event
    if(curr.target && curr.target.length)
        curr = $(curr.target).closest(".grid-shell");

    var selectedIndex = $(curr).find(".grid-sort-controls select :selected").attr("data-sort"),
    selectedIndex = parseInt(selectedIndex),
    selectedTable = $(curr).find(".grid")[selectedIndex],
    selectedTableHdrs = $(curr).find(".select-list-header-sub")[selectedIndex];

    //remove visible class from all items with a grid class, and sets their aria-hidden attr to true (for screenreaders)
    $(curr).find(".grid, .select-list-header-sub").removeClass("visible").attr("aria-hidden","true");

    $(selectedTable).addClass("visible").attr("aria-hidden","false");
    $(selectedTableHdrs).addClass("visible").attr("aria-hidden","false");

    $(curr).find(".grid.locked").removeClass("hidden").addClass("visible").attr("aria-hidden","false");
    $(curr).find(".grid.locked").siblings(".select-list-header-sub").removeClass("hidden").addClass("visible").attr("aria-hidden","false");
}

// ensure consistent keyboard interaction across browsers and devices
function selectKeyed(e) {
    var theEvent;
    var keyCodeTab = "9";
    var keyCodeEnter = "13";
    var keyCodeEsc = "27";
    if (e) {
        theEvent = e;
    } else {
        theEvent = event;
    }
    if ((theEvent.keyCode == keyCodeEnter || theEvent.keyCode == keyCodeTab) && this.value != this.initValue) {
        this.changed = true;
        selectChanged();
    } else if (theEvent.keyCode == keyCodeEsc) {
        this.value = this.initValue;
    } else {
        this.changed = false;
    }
    return true;
}

function selectClicked() {
    this.changed = true;
}
