function processJson() {
    const input = document.getElementById('inputJson').value.trim();
    const jsonEntries = input.match(/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g);
    const table = $('#logTable').DataTable();
    table.clear();

    if (jsonEntries) {
        jsonEntries.forEach(entry => {
            try {
                const jsonObject = JSON.parse(entry);
                table.row.add([
                    jsonObject.id || '',
                    jsonObject.userId || '',
                    jsonObject.item || '',
                    jsonObject.action || '',
                    jsonObject.relatedId || '',
                    jsonObject.createdOn || '',
                    JSON.stringify(jsonObject.body, null, 2) || '',
                    JSON.stringify(jsonObject.query, null, 2) || '',
                    JSON.stringify(jsonObject.params, null, 2) || '',
                    JSON.stringify(jsonObject.userIdentity, null, 2) || ''
                ]);
            } catch (e) {
                console.error('Invalid JSON entry:', entry);
            }
        });
        table.draw();
        document.getElementById('logTable').style.display = 'table';
    } else {
        alert('No valid JSON entries found.');
    }
}

$(document).ready(function() {
    $('#logTable').DataTable({
        columns: [
            { title: "ID" },
            { title: "User ID" },
            { title: "Item" },
            { title: "Action" },
            { title: "Related ID" },
            { title: "Created On" },
            { title: "Body" },
            { title: "Query" },
            { title: "Params" },
            { title: "User Identity" }
        ],
        searching: true,
        paging: true,
        info: true,
        autoWidth: true
    });
});
