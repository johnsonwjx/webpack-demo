var
    template = require("art-template"),
    dataModel = require('./dataModel'),
    templateFiles = ['template1', "template2", 'template3', "template4", "template5", 'template6', 'template7', 'template8', 'page-edit-container'],
    templateObj;

var createContentTemplate = function(fields) {
        var templ = '{{each list}}<tr>';
        $.each(fields, function(index, field) {
            templ += '<td>{{$value.' + field + '}}</td>';
        });
        templ += '</tr>{{/each}}';
        return templ;
    },
    templateFile = function(filename, obj) {
        return template.render(require('tpl/' + filename + '.html'), obj);
    },
    compileFile = function(filename) {
        return template.compile(require('tpl/' + filename + '.html'));
    };
templateObj = (function() {
    var
        templateObj = {},
        i, len, name, allFields = dataModel.allFields;
    for (i = 0, len = templateFiles.length; i < len; i++) {
        name = templateFiles[i];
        templateObj[name] = (compileFile(name));
    }
    for (name in allFields) {
        templateObj[name] = template.compile(createContentTemplate(allFields[name]));
    }
    return templateObj;
})();
module.exports = {
    getTemplate: function(name) {
        return templateObj[name];
    },
    templateFile: templateFile,
    compileFile: compileFile
};
