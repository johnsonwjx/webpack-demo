var
    domUtil = require('js/utils/dom_util'),
    menuUtil = require('js/utils/menu_util'),
    dataModel = require('js/utils/dataModel'),

    initDom = function($dataContent, editFlag, allDatas, year, month) {
        var menus = menuUtil.planMenus,
            pageSize = 28,
            data, opt;
        domUtil.initData2Dom(allDatas, menus[0].name, menus[0].text, $dataContent);
        if (!editFlag) domUtil.addPrintPageStart($dataContent);
        domUtil.initData2Dom(allDatas, menus[1].name, menus[1].text, $dataContent);

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
        // var
        //     menus = menuUtil.planMenus,
        //     id = menus[0].name,
        //     name = menus[0].text;
        // if (!allDatas[id]) dataModel.createIdContendData(allDatas, id, name, '<h2 style="text-align: center">' + name + '</h2>');
        // id = menus[1].name;
        // name = menus[1].text;
        // if (!allDatas[id]) dataModel.createIdContendData(allDatas, id, name, '<h2 style="text-align: center">' + name + '</h2>');
    };
var business = {
    type: 'plan',
    initDom: initDom,
    editFileName: 'edit-plan',
    publishFileName: 'publish-plan',
    createMenu: menuUtil.createPlanMenu,
    getInitMonth: function(date) {
        return date.getMonth() + 2;
    },
    initIdDatas: initIdDatas
};
module.exports = business;
