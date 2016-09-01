var
    commonUtil = require('js/utils/common_util'),
    loadObj = require('js/utils/load_util'),
    business = require('js/plan/business'),
    util = require('js/utils/edit/edit_util'),
    pageEdit = require('js/utils/edit/page_edit'),
    menuUtil = require('js/utils/menu_util'),
    editflag = true;
$(function() {
    commonUtil.init();
    loadObj.init(editflag, business);
    util.init(loadObj, business);
    pageEdit.initPageEditor(commonUtil.$dataContent);
    loadObj.addPageEditor(pageEdit);
});
