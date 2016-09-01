var
    commonUtil = require('js/utils/common_util'),
    loadUtil = require('js/utils/load_util'),
    runtimeUtil = require('js/utils/runtime/runtime_util'),
    business = require('js/planfinish/business'),
    editflag = false;
$(function() {
    commonUtil.init();
    loadUtil.init(editflag, business);
    runtimeUtil.init(commonUtil.$dataContent);
});
