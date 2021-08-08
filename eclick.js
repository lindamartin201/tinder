function closingConfirm() {
    return 'Are you sure you want to close this page?';
}

function handleError(msg, data) {
    $.post(
        "/frontlog.php",
        {
            message: msg || '(no message)',
            data: data
        }
    );
}

$(document).ready(function () {
    $('.click').click(function () {
        $.get(
            '/click.php',
            {sid: sid},
            function (data, textStatus) {
                var obj;

                try {
                    obj = $.parseJSON(data);
                } catch (err) {
                    handleError('Error parsing click response (ajax: ' + textStatus + ')', data);
                    return;
                }

                if (undefined === obj.url) {
                    handleError('No url in click response (ajax: ' + textStatus + ')', obj);
                    return;
                }

                try {
                    window.onbeforeunload = null;
                    window.location.href = obj.url;
                } catch (err) {
                    handleError(err.message);
                }
            }
        );
    });

    window.onbeforeunload = closingConfirm;
});