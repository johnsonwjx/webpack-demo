var
    domUtil = require('js/common/domUtil'),
    menuObj = require('js/common/menuObj'),
    dataModel = require('js/common/dataModel'),

    initDom = function($dataContent, editFlag, allDatas, year, month) {
        var menus = menuObj.planMenus,
            pageSize = 28,
            id, data, opt;
        id = 'establishment';
        domUtil.initData2Dom(allDatas, id, $dataContent, editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        id = 'emphasiswork';
        domUtil.initData2Dom(allDatas, id, $dataContent, editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByNameArr(menus[2].name, $dataContent, allDatas, ['power', 'reliable', 'economic1'], pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[3].name, $dataContent, allDatas, 'economic2', pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[4].name, $dataContent, allDatas, 'manager', pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[5].name, $dataContent, allDatas, 'product', pageSize, !editFlag);

        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.generateDomByName(menus[6].name, $dataContent, allDatas, 'life', pageSize, !editFlag);
    },
    initIdDatas = function(allDatas) {
        var
            id = 'establishment',
            name = '编制说明';
        if (!allDatas[id]) dataModel.createIdContendData(allDatas, id, name, '<h2 style="text-align: center">' + name + '</h2>');
        id = "emphasiswork";
        name = '重点工作';
        if (!allDatas[id]) dataModel.createIdContendData(allDatas, id, name, '<h2 style="text-align: center">' + name + '</h2>');
    };
var business = {
    type: 'plan',
    initDom: initDom,
    editFileName: 'edit-plan',
    publishFileName: 'publish-plan',
    createMenu: menuObj.createPlanMenu,
    getInitMonth: function(date) {
        return date.getMonth() + 2;
    },
    initIdDatas: initIdDatas
};
module.exports = business;
