var
    Quill = require('quill'),
    templateUtil = require('../template_util'),
    dataModel = require('../dataModel'),
    domUtil = require('../dom_util'),
    loadUtil = require('../load_util'),
    $pageEditor,
    $pageEditorContainer,
    $container,
    curentId;

function clear() {
    $pageEditorContainer.html('');
    if ($pageEditor) $pageEditor.attr('hidden', 'true;');
}

function pageSave() {
    var allDatas = loadUtil.getAllDatas();
    var curentData = allDatas[curentId];
    if (!curentData) {
        curentData = {};
        allDatas[curentId] = curentData;
    }
    dataModel.setIdFieldData(curentData, curentId, $pageEditorContainer.html());
    domUtil.setData2Dom(curentData, $container);
    clear();
}

function edit(id, htmldata, $ele) {
    curentId = id;
    $pageEditorContainer.html(htmldata);
    $ele.after($pageEditor);
    $pageEditor.removeAttr('hidden');
}

function initPageEditor($dataContent) {
    $container = $dataContent;
    $container.after(templateUtil.templateFile('page-edit'));
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
    $('#page-cancel').on('click', clear);

}
/**
 * [addEditBtn2PageContainer ]
 */
function addEditBtn2PageContainer() {
    var $pageContainer = $('.page-container'),
        id = $pageContainer.attr('id');
    $('<button pageid="' + id + '" class="pure-button pure-button-primary  button-xsmall">编辑</button>').prependTo($pageContainer).on('click', function() {
        var $btn = $(this),
            pageId = $btn.attr('pageId'),
            data = $btn.siblings('.id-content').html();
        edit(pageId, data, $btn);
        $btn.after($pageEditor);
        $pageEditor.removeAttr('hidden');
    });

}
module.exports = {
    initPageEditor: initPageEditor,
    addEditBtn2PageContainer: addEditBtn2PageContainer
};
