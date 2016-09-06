var
    timeChange = require('./time_change'),
    menuUtil = require('./menu_util'),
    commonUtil = require('./common_util'),
    screenfull = require('screenfull'),
    rootpath = commonUtil.rootpath,
    allDatas,
    year,
    month,
    editFlag = false,
    business,
    pageEditor;

function init(editFlagTemp, businessTemp) {
    business = businessTemp;
    editFlag = editFlagTemp;
    business.createMenu();
    timeChange.init(commonUtil.$dataContent, loadData);
    openTime(true);
}

function openTime(init) {
    var y, m;
    if (init) {
        var date = new Date();
        y = date.getFullYear() + '';
        m = business.getInitMonth(date);
        if (m < 10) {
            m = '0' + m;
        }
        timeChange.openTimeSelect(y, m);
    } else {
        timeChange.openTimeSelect();
    }
}

function before() {
    allDatas = null;
    year = null;
    month = null;
    $(document).off('scroll');
    if (pageEditor) {
        pageEditor.reset();
    }
    commonUtil.$dataContent.empty();
    menuUtil.menuSelect(null);
}

function initData(year, month) {
    $.getJSON(rootpath + 'BusinessAction.do?action=initData', {
        year: year,
        month: month,
        type: business.type,
        filename: business.editFileName
    }, function(responseData) {
        finishLoadData(responseData, year, month);
        alert('初始化成功');
    }).fail(commonUtil.handleError);
}

function getFileUrl(year, month, filename) {
    return rootpath + 'datas/' + year + '/' + month + '/' + filename + '?t=' + new Date().getTime();
}

function loadData(year, month) {
    $.ajaxSetup({
        async: false
    });
    var tempDatas, url = getFileUrl(year, month, business.publishFileName),
        finish = false;
    $.getJSON(url, function(responseData) {
        if (editFlag) {
            if (confirm(year + '年' + month + '月已发布，确定要重新编辑吗？')) {
                $.get(rootpath + 'BusinessAction.do?action=resetPublish', {
                    year: year,
                    month: month,
                    filename: business.editFileName,
                    publicfilename: business.publishFileName
                }, function() {
                    tempDatas = responseData;
                });
            } else {
                finish = true;
                $.ajaxSetup({
                    async: true
                });
            }
        } else {
            tempDatas = responseData;
        }
    });
    if (finish) return;
    if (!tempDatas && editFlag) {
        url = getFileUrl(year, month, business.editFileName);
        $.getJSON(url, function(responseData) {
            tempDatas = responseData;
        });
    }
    if (tempDatas) {
        finishLoadData(tempDatas, year, month);
    } else if (editFlag) {
        if (confirm(year + '年' + month + '月未生成数据，是否初始化？')) {
            initData(year, month);
        }
    } else {
        alert(year + '年' + month + '月数据未发布');
    }
    $.ajaxSetup({
        async: true
    });

}

function finishLoadData(responseData, y, m) {
    before();
    allDatas = responseData;
    year = y;
    month = m;
    business.initDom(commonUtil.$dataContent, editFlag, allDatas, year, month);
    if (pageEditor) {
        pageEditor.addEditBtn2PageContainer();
    }
    commonUtil.changeFootHeight();
    timeChange.closeTimeSelect();
    timeChange.updateTime(year, month);
    if (screenfull.enabled && !screenfull.isFullscreen) {
        screenfull.request();
    } else {
        commonUtil.maxWindow();
    }
    $('.pure-menu-item:first>a').trigger('click');
}

function addPageEditor(p) {
    pageEditor = p;
}

module.exports = {
    getAllDatas: function() {
        return allDatas;
    },
    getYear: function() {
        return year;
    },
    getMonth: function() {
        return month;
    },
    openTime: openTime,
    before: before,
    init: init,
    addPageEditor: addPageEditor
};
