var
    domUtil = require('js/utils/dom_util'),
    menuUtil = require('js/utils/menu_util'),
    dataModel = require('js/utils/dataModel'),
    initDom = function($dataContent, editFlag, allDatas, year, month) {
        var menus = menuUtil.planFinishedMenus,
            pageSize = 28,
            id, $table, $tablebody, title;
        domUtil.generateDomByNameArr(menus[0].name, $dataContent, allDatas, ['power_finish', 'reliable_finish'], pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[1].name, $dataContent, allDatas, 'economic1_finish', pageSize, !editFlag);
        domUtil.generateDomByName(menus[1].name, $dataContent, allDatas, 'economic2_finish', pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[2].name, $dataContent, allDatas, 'fueldetail_finish', pageSize, !editFlag);
        id = 'overhauling_finish';
        $table = domUtil.generateDomByName(menus[2].name, $dataContent, allDatas, id, pageSize, true);
        $tablebody = $table.children('tbody');
        $('<tr><td></td><td tabindex="1">任务完成情况</td><td colspan="6" style="height: 40px;" id="finish_detial" tabindex="1"><div class="id-content"></div></td></tr>').appendTo($tablebody);
        domUtil.setData2Dom(allDatas[id], $tablebody);
        if (editFlag) {
            domUtil.initEditTableByName(id, allDatas[id], $table);
        }

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        id = menus[3].name;
        domUtil.initData2Dom(allDatas, id, menus[3].text, $dataContent);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        title = $('<h2>').text('部门效益奖考核表 (' + year + '年' + month + '月)').css('textAlign', 'center');
        domUtil.generateDomByNameArr(menus[4].name, $dataContent, allDatas, ['departmentbenifitproduct_finish', 'departmentbenifitlife_finish'], pageSize, !editFlag);
        $('#' + menus[4].name).prepend(title);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        title = $('<h2>').text('部门效益奖考核表 (' + year + '年' + month + '月)').css('textAlign', 'center');
        domUtil.generateDomByName(menus[5].name, $dataContent, allDatas, 'departmentbenifitmanager_finish', pageSize, !editFlag);
        $('#' + menus[5].name).prepend(title);
    };
var business = {
    type: 'planfinish',
    initDom: initDom,
    editFileName: 'edit-planfinish',
    publishFileName: 'publish-planfinish',
    createMenu: menuUtil.createPlanFinishMenu,
    getInitMonth: function(date) {
        return date.getMonth();
    }
};
module.exports = business;
