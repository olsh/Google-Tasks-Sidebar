addon.port.emit("initialized");

addon.port.on("loadTasks", function (sidebarOptions) {
    document.getElementById("taskList").src = sidebarOptions.url;
});
