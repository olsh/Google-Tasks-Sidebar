addon.port.emit("initialized");

addon.port.on("loadTasks", function (sidebarOptions) {
    window.location = sidebarOptions.url;
});