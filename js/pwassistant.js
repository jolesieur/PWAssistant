$(".datePicker").datepicker({
    modal: true,
    footer: true,
    uiLibrary: "bootstrap4",
    icons: {
        rightIcon: "<i class=\"fas fa-chevron-down\"></i>"
    },
    locale: "fr-fr",
    format: "yyyy-mm-dd",
    ignoreReadonly: true,
    allowInputToggle: true,
    maxDate: new Date()
});

$(".navbar-nav .nav-item").on("click", function () {
    $(".navbar-nav .nav-item").find(".active").removeClass("active");
});

$(".drop").click(function () {
    console.log("hello");
    if ($(this).closest("div").find(".drop_content").hasClass("d-none")) {
        $(this).closest("div").find(".drop_content").removeClass("d-none");
    } else {
        $(this).closest("div").find(".drop_content").addClass("d-none");
    }
});

$(".c1").on("click", function () {
    if ($(this).prop("checked")) {
        $("#myModal").modal('show');
    }
    if ($(this).prop("checked", false)) {
        $(this).closest("div").find(".c2").removeAttr('disabled');
        $(this).closest("div").find(".swap2").addClass("d-none");
    }
});

$(".c3").on("click", function () {
    if ($(this).prop("checked")) {
        $("#myModal").modal('show');
    }
    if ($(this).prop("checked", false)) {
        $(this).closest("div").find(".c4").removeAttr('disabled');
        $(this).closest("div").find(".swap4").addClass("d-none");
    }
});

function swapCharbon() {
    //var selected = [];
    $('input:checkbox[class=c1]:checked').each(function () {
        $(this).closest("div").find(".c2").attr('disabled', 'disabled');
        $(this).closest("div").find(".c2").prop("checked", false);
        $(this).closest("div").find("#c2").removeClass("active");
        $(this).closest("div").find(".swap2").removeClass("d-none");
        //selected.push($(this).closest("label").attr("id"));
        //dbCol = $(this).parents(".root").find("h1").attr("id");
        //dbDoc = $(this).parents(".root").find("h3").attr("id");
        //activeFormID = $(this).parents(".root").find(".tab-content .active").children("form").attr("id");
    });
    $('input:checkbox[class=c3]:checked').each(function () {
        $(this).closest("div").find(".c4").attr('disabled', 'disabled');
        $(this).closest("div").find(".c4").prop("checked", false);
        $(this).closest("div").find("#c4").removeClass("active");
        $(this).closest("div").find(".swap4").removeClass("d-none");
        //selected.push($(this).closest("label").attr("id"));
        //dbCol = $(this).parents(".root").find("h1").attr("id");
        //dbDoc = $(this).parents(".root").find("h3").attr("id");
        //activeFormID = $(this).parents(".root").find(".tab-content .active").children("form").attr("id");
    });
    //    console.log(dbCol);
    //    console.log(dbDoc);
    //    console.log(activeFormID);
    //
    //    sel = [dbCol, dbDoc, activeFormID];
    //
    //    selected.forEach(function (item) {
    //        if (item == "c1") {
    //            console.log("c1 selectionné");
    //            var c2 = json_obj[dbCol][dbDoc][activeFormID]["charbons"]["c2"][0];
    //            console.log(c2);
    //            json_obj[dbCol][dbDoc][activeFormID]["charbons"]["c1"].unshift(c2); // Current C2 timestamp in C1 value.
    //        };
    //        if (item == "c3") {
    //            console.log("c3 selectionné");
    //            var c4 = json_obj[dbCol][dbDoc][activeFormID]["charbons"]["c4"][0];
    //            console.log(c4);
    //            json_obj[dbCol][dbDoc][activeFormID]["charbons"]["c3"].unshift(c4); // Current C4 timestamp in C3 value.
    //        };
    //        console.log(json_obj);
    //    });
};

$(".navbar-nav li a").on("click", function () {
    if (!$(this).hasClass("dropdown-toggle")) {
        $(".navbar-collapse").collapse("hide");
    }
});

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});


$("input[type=checkbox]").change(function () {
    var senderRootID = $(this).parents(".root").attr("id");
    var senderFormID = $(this).closest("form").attr("id");

    var checked = $("#" + senderFormID + " input:checked").length > 0;
    if (checked) {
        $("#" + senderRootID + " .btn-success").removeAttr("disabled");
    } else {
        $("#" + senderRootID + " .btn-success").attr("disabled", "disabled");
    }
});

// Set active sub-tab name to dropmenu text.
$(".sub-tab a").on("click", function () {
    $(this).closest("li").find("span").text($(this).text());
});

//  Watch for sub-tab change and clear selection.
$(".sub-tab").on("shown.bs.tab", function (e) {
    var senderRootID = $(this).parents(".root").attr("id");

    $("#" + senderRootID + " :checkbox:enabled").prop("checked", false);
    $("#" + senderRootID + " label").removeClass("active");
    $("#" + senderRootID + " .btn-success").attr("disabled", "disabled");
    $("#" + senderRootID + " .swap2").addClass("d-none");
    $("#" + senderRootID + " .c2").removeAttr('disabled');
    $("#" + senderRootID + " .swap4").addClass("d-none");
    $("#" + senderRootID + " .c4").removeAttr('disabled');
})


function updateFields(location) {
    $("#content-" + location + " .days").each(function () {
        //_location = location.split("-").pop();
        dbDoc = $(this).parents(".root").find("h3").attr("id");
        equipment = $(this).closest("form").attr("id");
        itemGroup = $(this).closest("div").attr("id");
        item = $(this).closest("label").attr("id");

        if (typeof (json_obj[location][dbDoc][equipment]) === 'undefined' || typeof (json_obj[location][dbDoc][equipment][itemGroup]) === 'undefined' || typeof (json_obj[location][dbDoc][equipment][itemGroup][item]) === 'undefined') {
            console.log("not found in database");
            timeDiff = "n/a";
        } else if (json_obj[location][dbDoc][equipment][itemGroup][item].length > 0) {
            timeDiff = daysdifference($.now(), json_obj[location][dbDoc][equipment][itemGroup][item][0]);
        } else {
            timeDiff = 0;
        }
        $(this).text(timeDiff);
    });
}

function daysdifference(firstDate, secondDate) {
    var startDay = new Date(firstDate);
    var endDay = new Date(secondDate);

    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / (1000 * 3600 * 24);

    return Math.floor(Math.abs(days));
}


$(function () {
    $(document).on("click", ".alert-close", function () {
        $(this).parent().hide();
    })
});

$(document).ready(function () {
    $(".datePicker").val(new Date().toDateInputValue());
});

//$(".btn-success").on("click", function () {
//    //                console.log("raw :", $("#datepicker").val())
//    //                var ts = (+new Date($("#datepicker").val()));
//    //                var _ts = ts + ((new Date($("#datepicker").val())).getTimezoneOffset() * 60000);
//    //                console.log("this :", _ts);
//    var senderRootID = $(this).parents(".root").attr("id");
//    var senderFormID = $(this).closest("form").attr("id");
//
//    // Get datePicker value in milliseconds.
//    var ts = (+new Date($("#" + senderRootID + " .datePicker").val()));
//    var timestamp = ts + ((new Date($("#" + senderRootID + " .datePicker").val())).getTimezoneOffset() * 60000);
//    console.log("Timestamp :", timestamp); // DEBUG ONLY
//
//    var checked = [];
//    $("#" + senderFormID + " input:checked").each(function () {
//        var _checked = [($(this).closest("div").attr("id")), ($(this).closest("label").attr("id"))];
//        checked.push(_checked);
//    });
//    //console.log("Checked items :", checked); // DEBUG ONLY
//
//    var location = $(this).attr("id").split(".");
//
//    checked.forEach(function (item) {
//        json_obj[location[0]][location[1]][item[0]][item[1]].unshift(timestamp);
//        if (json_obj[location[0]][location[1]][item[0]][item[1]].length > 10) { // Remove oldest entry. Limit to 10 entry max.
//            json_obj[location[0]][location[1]][item[0]][item[1]].pop();
//        }
//    });
//
//    console.log("json_obj: ", json_obj); // DEBUG ONLY
//
//    var newData = JSON.stringify(json_obj[location[0]][location[1]]);
//    console.log("newData ", newData);
//
//    var docRef = db.collection(location[0]).doc(location[1]).set({
//            data: newData
//        })
//        .then(function () { // Write successful
//            $("#error-alert").hide();
//            $("#success-alert").show();
//
//            if (document.getElementById("success-alert").classList.contains("d-none")) {
//                document.getElementById("success-alert").classList.remove("d-none");
//            }
//
//            $("#" + senderFormID + " :checkbox:enabled").prop("checked", false);
//            $("#" + senderFormID + " label").removeClass("active");
//            $("#" + senderFormID + " .btn-success").attr("disabled", "disabled");
//
//            window.setTimeout(function () {
//                $("#success-alert").hide();
//                //document.getElementById('success-alert').classList.add('d-none');
//            }, 5000);
//        })
//        .catch(function (error) {
//            $("#error-alert").show();
//            if (document.getElementById("error-alert").classList.contains("d-none")) {
//                document.getElementById("error-alert").classList.remove("d-none");
//            }
//        });
//});

$(".btn-valider").on("click", function () {
    var senderRootID = $(this).parents(".root").attr("id");
    var dbCol = $(this).parents(".root").find("h1").attr("id");
    var dbDoc = "remplacement"; //$(this).parents(".root").find("h3").attr("id");
    var activeFormID = $(this).parents(".root").find(".tab-content .active").children("form").attr("id");

    // Get datePicker value in milliseconds.
    var ts = (+new Date($("#" + senderRootID + " .datePicker").val()));
    var timestamp = ts + ((new Date($("#" + senderRootID + " .datePicker").val())).getTimezoneOffset() * 60000);
    //console.log("Timestamp :", timestamp); // DEBUG ONLY

    var checked = [];
    $("#" + activeFormID + " input:checked").each(function () {
        var _checked = [($(this).closest("div").attr("id")), ($(this).closest("label").attr("id"))];
        checked.push(_checked);
    });
    //console.log("Checked items :", checked); // DEBUG ONLY

    checked.forEach(function (item) {
        console.log("a ", typeof (json_obj[dbCol][dbDoc][activeFormID]));
        if (typeof (json_obj[dbCol][dbDoc][activeFormID]) === 'undefined') {
            console.log("item not defined");
            json_obj[dbCol][dbDoc][activeFormID] = {};
            json_obj[dbCol][dbDoc][activeFormID][item[0]] = {};
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]] = [];
        }

        console.log("b ", typeof (json_obj[dbCol][dbDoc][activeFormID][item[0]]));
        if (typeof (json_obj[dbCol][dbDoc][activeFormID][item[0]]) === 'undefined') {
            console.log("item not defined");
            json_obj[dbCol][dbDoc][activeFormID][item[0]] = {};
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]] = [];
        }

        console.log("c ", typeof (json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]]));
        if (typeof (json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]]) === 'undefined') {
            console.log("item not defined");
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]] = [];
        }


        //console.log($("#" + activeFormID + " #" + item[0] + " .swap2").hasClass("d-none"));

        if (item[1] === "c1" && !($("#" + activeFormID + " #" + item[0] + " .swap2").hasClass("d-none"))) {
            console.log("ceci cest c1 et swap c2");
            var c2 = json_obj[dbCol][dbDoc][activeFormID][item[0]]["c2"][0];
            json_obj[dbCol][dbDoc][activeFormID][item[0]]["c1"].unshift(c2);
            json_obj[dbCol][dbDoc][activeFormID][item[0]]["c2"].unshift(timestamp);
            if (json_obj[dbCol][dbDoc][activeFormID][item[0]]["c2"].length > 10) { // Remove oldest entry. Limit to 10 entry max.
                json_obj[dbCol][dbDoc][activeFormID][item[0]]["c2"].pop();
            }
        } else if (item[1] === "c3" && !($("#" + activeFormID + " #" + [item[0]] + " .swap4").hasClass("d-none"))) {
            console.log("ceci cest c3 et swap c4");
            var c4 = json_obj[dbCol][dbDoc][activeFormID][item[0]]["c4"][0];
            json_obj[dbCol][dbDoc][activeFormID][item[0]]["c3"].unshift(c4);
            json_obj[dbCol][dbDoc][activeFormID][item[0]]["c4"].unshift(timestamp);
            if (json_obj[dbCol][dbDoc][activeFormID][item[0]]["c4"].length > 10) { // Remove oldest entry. Limit to 10 entry max.
                json_obj[dbCol][dbDoc][activeFormID][item[0]]["c4"].pop();
            }
        } else if (json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]].length < 1) {
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]].push(timestamp);
        } else {
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]].unshift(timestamp);
        }
        if (json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]].length > 10) { // Remove oldest entry. Limit to 10 entry max.
            json_obj[dbCol][dbDoc][activeFormID][item[0]][item[1]].pop();
        }
    });

    console.log("json_obj: ", json_obj); // DEBUG ONLY

    var newData = JSON.stringify(json_obj[dbCol][dbDoc]);

    //console.log("json_string: ", newData); // DEBUG ONLY

    var docRef = db.collection(String([dbCol])).doc(String([dbDoc])).set({
            data: newData
        })
        .then(function () { // Write successful
            $("#error-alert").hide();
            $("#success-alert").show();

            if (document.getElementById("success-alert").classList.contains("d-none")) {
                document.getElementById("success-alert").classList.remove("d-none");
            }

            $("#" + activeFormID + " :checkbox:enabled").prop("checked", false);
            $("#" + activeFormID + " label").removeClass("active");
            $("#" + senderRootID + " .btn-valider").attr("disabled", "disabled");
            $("#" + activeFormID + " .swap2").addClass("d-none");
            $("#" + activeFormID + " .c2").removeAttr('disabled');
            $("#" + activeFormID + " .swap4").addClass("d-none");
            $("#" + activeFormID + " .c4").removeAttr('disabled');

            window.setTimeout(function () {
                $("#success-alert").hide();
                //document.getElementById('success-alert').classList.add('d-none');
            }, 5000);
        })
        .catch(function (error) {
            $("#error-alert").show();
            if (document.getElementById("error-alert").classList.contains("d-none")) {
                document.getElementById("error-alert").classList.remove("d-none");
            }
        });
});
