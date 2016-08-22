var
    templateData = require('./templateData'),
    $timeEdit,
    yearReg = /199[0-9]|2[0-1][0-9]{2}/,
    $year,
    $month,
    callback,
    year,
    month,
    open = false,
    openTimeSelect = function(y, m) {
        if (open) return;
        if (y || m) {
            year = y;
            month = m;
        }
        $year.val(year);
        $month.val(month);
        $timeEdit.removeAttr('hidden');
        open = true;
    },
    closeTimeSelect = function() {
        $year.val('');
        $month.val('');
        $timeEdit.attr('hidden', 'true');
        open = false;
    },
    validate = function() {
        var
            year = $year.val();
        if (!yearReg.test(year)) {
            alert('年份格式错误');
            return false;
        }
        return true;
    },
    init = function($container, func) {
        $container.after(templateData.templateFile('timeChange'));
        $timeEdit = $('#time-edit');
        $year = $('#year-edit');
        $month = $('#month-edit');
        callback = func;
        var item;
        for (var i = 1; i <= 12; i++) {
            item = i < 10 ? '0' + i : i;
            $('<option value="' + item + '">' + item + '</option>').appendTo($month);
        }
        $('.cancel').on('click', closeTimeSelect);
        $('#time-edit-btn').on('click', function() {
            openTimeSelect();
        });
        $('#time-edit-submit').on('click', function() {
            if (!validate()) {
                return;
            }
            callback($year.val(), $month.val());
        });
    },
    updateTime = function(y, m) {
        year = y;
        month = m;
        if (year && month) {
            $('#time').text(year + '年' + month + '月');
        } else {
            $('#time').empty();
        }
    };
module.exports = {
    init: init,
    openTimeSelect: openTimeSelect,
    closeTimeSelect: closeTimeSelect,
    updateTime: updateTime
};
