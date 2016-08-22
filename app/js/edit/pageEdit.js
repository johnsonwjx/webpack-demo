var
    $pageEditor,
    $pageEditorContainer,
    $container,
    curentId,
    curentData,
    Quill = require('quill'),
    templateData = require('js/common/templateData'),
    dataModel = require('js/common/dataModel'),
    domUtil,
    addPageEditor = function(data, id, domUtilTemp) {
        if (!domUtil) domUtil = domUtilTemp;
        $('#' + id).prepend($('<button  class="pure-button pure-button-primary  button-xsmall" style="margin-top: 10px">编辑-' +
            (data.name ? data.name : '') + '</button>').click(function() {
            curentId = id;
            curentData = data;
            $pageEditorContainer.html(data.idsfieldsData[id].text);
            $(this).after($pageEditor);
            $pageEditor.removeAttr('hidden');
        }));
    },
    clear = function() {
        $pageEditorContainer.html('');
        if ($pageEditor) $pageEditor.attr('hidden', 'true');
        curentId = null;
        curentData = null;
    },
    pageSave = function() {
        dataModel.setIdFieldData(curentData, curentId, $pageEditorContainer.html());
        domUtil.setData2Dom(curentData, $container);
        clear();
    },
    initPageEditor = function($dataContent) {
        $container = $dataContent;
        $container.after(templateData.templateFile('page-edit'));
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
    };
module.exports = {
    initPageEditor: initPageEditor,
    addPageEditor: addPageEditor
};
