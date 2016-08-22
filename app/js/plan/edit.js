var
    commonUtil = require('js/common/commonUtil'),
    loadObj = require('js/common/loadObj'),
    business = require('js/plan/business'),
    util = require('js/edit/util'),
    pageEdit = require('js/edit/pageEdit'),
    editflag = true;
$(function() {
    commonUtil.init();
    loadObj.init(editflag, business);
    util.init(loadObj, business);
    pageEdit.initPageEditor(commonUtil.$dataContent);
});

// var target = {
//     before: before,
//     addPageEditor: pageEdit.addPageEditor
// };
// flatpickr.init.prototype.l10n.weekdays.shorthand = ['日', '一', '二', '三', '四', '五', '六'];
// flatpickr.init.prototype.l10n.weekdays.longhand = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
// flatpickr.init.prototype.l10n.months.shorthand = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// flatpickr.init.prototype.l10n.months.longhand = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
//
// business.init(true, target);
