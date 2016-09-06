var
    Quill = require('quill'),
    templateUtil = require('../template_util'),
    dataModel = require('../dataModel'),
    domUtil = require('../dom_util'),
    loadUtil = require('../load_util'),
    $pageEditor,
    $pageEditorContainer,
    $dataContent,
    curentId;

function clear() {
    $pageEditorContainer.html('');
    if ($pageEditor) $pageEditor.attr('hidden', 'true;');
}

/**
 * [reset 放回dataContent以外的位置 防止clear dataContent 时清空了]
 */
function reset() {
    clear();
    $dataContent.after($pageEditor);
}

function pageSave() {
    var allDatas = loadUtil.getAllDatas();
    var curentData = allDatas[curentId];
    if (!curentData) {
        curentData = {};
        allDatas[curentId] = curentData;
    }
    dataModel.setIdFieldData(curentData, curentId, $pageEditorContainer.html());
    domUtil.setData2Dom(curentData, $dataContent);
    clear();
}

function edit(id, htmldata, $ele) {
    curentId = id;
    $pageEditorContainer.html(htmldata);
    $ele.after($pageEditor);
    $pageEditor.removeAttr('hidden');
}

function initPageEditor($dataContentTemp) {
    $dataContent = $dataContentTemp;
    $dataContent.after(templateUtil.templateFile('page-edit'));
    $pageEditor = $('#page-editor');
    new Quill('#editor-container', {
        modules: {
            toolbar: '#toolbar-container'
        },
        placeholder: '输入',
        theme: 'snow'
    });
    $pageEditorContainer = $pageEditor.find('.ql-editor');
    $('#page-save').click(pageSave);
    $('#page-cancel').click(clear);
}
/**
 * [addEditBtn2PageContainer ]
 */
function addEditBtn2PageContainer() {
    var btnEditEvent = function() {
        var $btn = $(this),
            pageId = $btn.attr('pageId'),
            data = $btn.siblings('.id-content').html();
        edit(pageId, data, $btn);
        $btn.after($pageEditor);
        $pageEditor.removeAttr('hidden');
    };
    $('.page-container').each(function(index, item) {
        var id = this.id;
        $('<button pageid="' + id + '" class="pure-button pure-button-primary  button-xsmall">编辑</button>').prependTo(this).on('click', btnEditEvent);
    });
}

module.exports = {
    initPageEditor: initPageEditor,
    addEditBtn2PageContainer: addEditBtn2PageContainer,
    reset: reset
};
