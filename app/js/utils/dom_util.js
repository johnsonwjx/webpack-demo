var
    templateUtil = require('./template_util'),
    dataModel = require('./dataModel'),
    colspanTableContent = function($tablebody, spans) {
        if (!spans) {
            return;
        }
        $.each(spans, function(index, item) {
            var $tr = $tablebody.find('tr td:nth-child(1)').filter(function() {
                    return $(this).text() === item.tag;
                }).parent(),
                $td = $tr.children('td:eq(' + item.colIndex + ')');
            if (!$td) {
                return;
            }
            if (item.colspan > 1 && $td.attr('colspan', item.colspan)) {
                $tr.children().slice(item.colIndex + 1, item.colIndex + item.colspan).hide();
            }
            if (item.rowspan > 1) {
                var
                    trs = $($tablebody).children('tr'),
                    nextTr, nextTd, rowIndex = $tr.index();
                $td.attr('rowspan', item.rowspan);
                for (var i = 1; i < item.rowspan; i++) {
                    nextTr = $(trs[rowIndex + i]);
                    nextTd = nextTr.children('td:eq(' + item.colIndex + ')').hide();
                    if (item.colspan > 1) nextTr.children().slice(item.colIndex + 1, item.colIndex + item.colspan).hide();
                }
            }
        });
    },
    initEditTableByName = function(name, data, $table) {
        var opt = dataModel.getOpt(name);
        initEditTable(opt, data, $table);
    },
    initEditTable = function(opt, data, $table) {
        if (!opt.editorColumns || !data.records) {
            return;
        }
        var
            $tablebody = $table.children('tbody');
        $table.editableTableWidget({
            editorColumns: opt.editorColumns,
            idsfields: opt.idsfields
        });
        $tablebody.find('td').on('change', function(evt, newValue) {
            if (opt.idsfields && opt.idsfields[this.id]) {
                dataModel.setIdFieldData(data, this.id, newValue);
                return;
            }
            var
                $td = $(this),
                fields = dataModel.getFields(opt.fields),
                $tr = $($td.parent()),
                tag = $tr.children(':first').text(),
                record = dataModel.getRecordByTag(data.records, tag),
                field;
            if (!fields || !record) {
                return;
            }
            field = fields[$td.index()];
            record[field] = newValue;
        });
    },
    addTableData = function($dataContent, tableRender, contentRender, opt, data, records, spans, dontEdit) {
        var
            $dom = $(tableRender({
                title: opt.title,
            })),
            $table = $dom.last('table'),
            $tablebody = $table.children('tbody');
        $dataContent.append($dom);
        $tablebody.append(contentRender({
            list: records
        }));
        if (spans) {
            colspanTableContent($tablebody, spans);
        }
        if (!dontEdit) {
            initEditTable(opt, data, $table);
        }
        return $table;
    },
    generateDom = function($dataContent, data, name, pageSize, dontEdit) {
        var
            opt = dataModel.getOpt(name),
            records,
            tableRender = templateUtil.getTemplate(opt.template),
            contentRender = templateUtil.getTemplate(opt.fields),
            total, pages, spans,
            mutiPage = false,
            pageRecords, $table;
        if (!contentRender || !data) {
            return;
        }
        if (data.spans) {
            spans = data.spans;
        }
        records = data.records ? data.records : data;
        total = records.length;
        mutiPage = pageSize && total > pageSize;
        pageRecords = mutiPage ? getDataByPage(records, 1, pageSize) : records;
        $table = addTableData($dataContent, tableRender, contentRender, opt, data, pageRecords, spans, dontEdit);
        if (mutiPage) {
            pages = total / pageSize + (total % pageSize === 0 ? 0 : 1);
            for (var i = 2; i < pages; i++) {
                pageRecords = getDataByPage(records, i, pageSize);
                addTableData($dataContent, tableRender, contentRender, opt, data, pageRecords, spans, dontEdit);
            }
        }
        return $table;
    },
    getDataByPage = function(records, page, pageSize) {
        var
            end = pageSize * page,
            start = end - pageSize;
        return records.slice(start, end);
    },
    generateDomByName = function(contentId, $dataContent, allDatas, name, pageSize, dontEdit) {
        return generateDomByNameArr(contentId, $dataContent, allDatas, [name], pageSize, dontEdit);
    },
    generateDomByNameArr = function(contentId, $dataContent, allDatas, arr, pageSize, dontEdit) {
        if (!allDatas && !arr) {
            return;
        }
        var $div = $('#' + contentId),
            $table = null;
        if (!$div.length) $div = $('<div>').attr('id', contentId).appendTo($dataContent);
        $.each(arr, function(index, name) {
            $table = generateDom($div, allDatas[name], name, pageSize, dontEdit);
        });
        return $table;
    },
    initData2Dom = function(allDatas, id, title, $container) {
        var render = templateUtil.getTemplate('page-edit-container');
        var data = allDatas[id];
        $container.append(render({
            id: id,
            title: title
        }));
        setData2Dom(data, $container);
    },
    setData2Dom = function(data, $container) {
        var
            id,
            $dom,
            item;
        if (data && data.idsfieldsData) {
            for (id in data.idsfieldsData) {
                $dom = $container.find('#' + id + ' .id-content');
                if (!$dom.length) {
                    continue;
                }
                item = data.idsfieldsData[id];
                $dom.html(item.text);
            }
        }
    };
module.exports = {
    initEditTableByName: initEditTableByName,
    generateDomByName: generateDomByName,
    generateDomByNameArr: generateDomByNameArr,
    initData2Dom: initData2Dom,
    setData2Dom: setData2Dom,
    addPrintPageStart: function($dataContent) {
        $dataContent.append('<div class="pageStart"></div>');
    }
};
