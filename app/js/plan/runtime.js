var
    commonUtil = require('js/utils/common_util'),
    loadObj = require('js/utils/load_util'),
    business = require('js/plan/business'),
    util = require('js/utils/runtime/runtime_util'),
    editflag = false;
$(function() {
    commonUtil.init();
    loadObj.init(editflag, business);
    util.init(commonUtil.$dataContent);
});
