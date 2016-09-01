var
    commonUtil = require('js/utils/common_util'),
    loadUtil = require('js/utils/load_util'),
    business = require('js/planfinish/business'),
    util = require('js/utils/edit/edit_util'),
    pageEdit = require('js/utils/edit/page_edit'),
    editflag = true;
$(function() {
    commonUtil.init();
    loadUtil.init(editflag, business);
    util.init(loadUtil, business);
    pageEdit.initPageEditor(commonUtil.$dataContent);
    loadUtil.addPageEditor(pageEdit);
});
