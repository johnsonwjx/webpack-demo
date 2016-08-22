var
    commonUtil = require('js/common/commonUtil'),
    loadObj = require('js/common/loadObj'),
    business = require('js/planfinish/business'),
    util = require('js/runtime/util'),
    editflag = false;
$(function() {
    commonUtil.init();
    loadObj.init(editflag, business);
    util.init(commonUtil.$dataContent);
});
