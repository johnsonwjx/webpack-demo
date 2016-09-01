require('./mindmup-editabletable.js');
require('quill/dist/quill.snow.css');
var
    loadObj,
    business,
    commonUtil = require('../common_util'),
    rootpath = commonUtil.rootpath,
    init = function(loadObjTemp, businessTemp) {
        loadObj = loadObjTemp;
        business = businessTemp;
        $('#reset').on('click', clearReset);
        $('#save').on('click', saveData);
        $('#publish').on('click', publish);
    },
    validate = function() {
        if (!loadObj.getAllDatas()) {
            alert('数据为空!');
            return false;
        }
        return true;
    },
    saveData = function() {
        if (!validate()) {
            return;
        }
        if (!confirm('确定保存?')) {
            return;
        }
        $.post(rootpath + 'BusinessAction.do?action=saveData', {
            data: encodeURIComponent(encodeURIComponent(JSON.stringify(loadObj.getAllDatas()))),
            year: loadObj.getYear(),
            month: loadObj.getMonth(),
            filename: business.editFileName
        }).fail(commonUtil.handleError);
    },
    publish = function() {
        if (!validate()) {
            return;
        }
        if (!confirm('确定发布?')) {
            return;
        }
        $.post(rootpath + 'BusinessAction.do?action=saveData', {
            data: encodeURIComponent(encodeURIComponent(JSON.stringify(loadObj.getAllDatas()))),
            year: loadObj.getYear(),
            month: loadObj.getMonth(),
            filename: business.editFileName,
            publicfilename: business.publishFileName
        }, function() {
            alert('发布成功');
            loadObj.before();
            loadObj.openTime();
        }).fail(commonUtil.handleError);
    },
    clearReset = function() {
        if (!validate()) {
            return;
        }
        if (!confirm('确定删除?')) {
            return;
        }
        $.get(rootpath + 'BusinessAction.do?action=clearReset', {
            year: loadObj.getYear(),
            month: loadObj.getMonth(),
            filename: business.editFileName,
            publicfilename: business.publishFileName
        }, function() {
            loadObj.before();
            loadObj.openTime();
        }).fail(commonUtil.handleError);
    };
module.exports = {
    init: init
};
