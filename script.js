<<<<<<< HEAD
function processJson() {
    const input = document.getElementById('inputJson').value;
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
=======
$(document).ready(function() {
    $.ajax({
        url: 'path/to/your/json/data.json', // Replace with the URL to your JSON data
        method: 'GET',
        dataType: 'json',
        success: function(activityLogData) {
            $('#activityLogTable').DataTable({
                data: activityLogData,
                columns: [
                    { data: 'id' },
                    { data: 'user' },
                    { data: 'action' },
                    { data: 'timestamp' }
                ],
                initComplete: function () {
                    this.api().columns().every(function () {
                        var column = this;
                        var select = $('<select><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
                                column
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            });

                        column.data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>')
                        });
                    });
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching JSON:', textStatus, errorThrown);
            // Handle error appropriately, e.g., show an alert or log it
        }
>>>>>>> 61ef342650059ca915de9be68996d3a285b96f27
    });
});
