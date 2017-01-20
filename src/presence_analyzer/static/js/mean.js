(function($) {
    $(document).ready(function(){
        var $loading = $('#loading');

        getDataJSON('/api/v1/users', $loading);

        $('#user-id').change(function(){
            var $chartDiv = $('#chart-div'),
                selectedUser = $('#user-id').val();

            if(selectedUser) {
                $loading.show();
                $chartDiv.hide();

                $.getJSON('/api/v1/mean_time_weekday/' + selectedUser, function(result) {
                    var chart = new google.visualization.ColumnChart($chartDiv[0]),
                        data = new google.visualization.DataTable(),
                        formatter = new google.visualization.DateFormat({pattern: 'HH:mm:ss'}),
                        options = {
                            hAxis: {title: 'Weekday'}
                        };

                    $.each(result, function(index, value) {
                        value[1] = parseInterval(value[1]);
                    });

                    data.addColumn('string', 'Weekday');
                    data.addColumn('datetime', 'Mean time (h:m:s)');
                    data.addRows(result);
                    formatter.format(data, 1);

                    drawChart($chartDiv, $loading, chart, data, options);
                });
            }
        });
    });
})(jQuery);