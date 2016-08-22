var
    commonUtil = require('js/common/commonUtil'),
    loadObj = require('js/common/loadObj'),
    business = require('js/planfinish/business'),
    util = require('js/edit/util'),
    pageEdit = require('js/edit/pageEdit'),
    editflag = true;
$(function() {
    commonUtil.init();
    loadObj.init(editflag, business);
    util.init(loadObj, business);
    pageEdit.initPageEditor(commonUtil.$dataContent);
});
