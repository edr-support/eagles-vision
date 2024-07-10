$(document).ready(function() {
    // Assuming your JSON data is in a string format
    const jsonData = `
    [
        {
            "id": 1,
            "user": "John Doe",
            "action": "Logged in",
            "timestamp": "2024-07-10 12:34:56"
        },
        {
            "id": 2,
            "user": "Jane Smith",
            "action": "Viewed profile",
            "timestamp": "2024-07-10 12:35:10"
        }
        // Add more entries as needed
    ]
    `;

    // Parse the JSON string into a JavaScript object
    const activityLogData = JSON.parse(jsonData);

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
});
