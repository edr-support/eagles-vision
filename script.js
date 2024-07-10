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
    });
});
