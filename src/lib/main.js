"use strict";

let data = require("sdk/self").data;
let { ToggleButton } = require("sdk/ui/button/toggle");
let sidebarSdk = require("sdk/ui/sidebar");
let prefs = require("sdk/simple-prefs").prefs;

let appGlobal = {};

appGlobal.button = ToggleButton({
    id: "toggle-button",
    label: "Google Tasks",
    icon: {
        "16": data.url("images/icon16.png"),
        "32": data.url("images/icon32.png")
    },
    onChange: function (state) {
        toggleSidebar(state.checked);
    }
});

appGlobal.sidebar = sidebarSdk.Sidebar({
    title: "Google Tasks",
    url: data.url("index.html"),
    onAttach: function (worker) {
        worker.port.on("initialized", function() {
            worker.port.emit("loadTasks", {
                url: prefs.advancedTasksView ?
                    "https://mail.google.com/tasks/canvas" :
                    "https://mail.google.com/tasks/ig"
            });
        });
    },
    // Keeps button state in sync when the sidebar X is used to close
    onHide: function () {
        appGlobal.button.state("window", { checked: false });
    }
});

/**
 * Toggles the sidebar with Google tasks
 * @param isEnable
 */
function toggleSidebar(isEnable) {
    if (isEnable) {
        appGlobal.sidebar.show();
    } else {
        appGlobal.sidebar.hide();
    }
}
