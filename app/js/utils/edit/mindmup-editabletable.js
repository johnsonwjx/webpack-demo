/*global $, window*/
$.fn.editableTableWidget = function(options) {
    'use strict';
    return $(this).each(function() {
        var buildDefaultOptions = function() {
                var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
                return opts;
            },
            createEditor = function(dom) {
                var editor = $(dom).css('position', 'absolute').hide().appendTo(element.parent());
                editor.blur(function() {
                    setActiveText();
                    currentEditor.hide();
                }).keydown(function(e) {
                    if (e.which === ENTER && getCurrentEditType(active) !== 'textarea') {
                        setActiveText();
                        currentEditor.hide();
                        active.focus();
                        e.preventDefault();
                        e.stopPropagation();
                    } else if (e.which === ESC) {
                        currentEditor.val(active.text());
                        e.preventDefault();
                        e.stopPropagation();
                        // currentEditor.hide();
                        active.focus();
                    } else if (e.which === TAB) {
                        active.focus();
                    } else if (this.selectionEnd - this.selectionStart === this.value.length) {
                        var possibleMove = movement(active, e.which);
                        if (possibleMove.length > 0) {
                            possibleMove.focus();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }).on('input paste', function() {
                    var evt = $.Event('validate');
                    active.trigger(evt, editor.val());
                    if (evt.result === false) {
                        currentEditor.addClass('error');
                    } else {
                        currentEditor.removeClass('error');
                    }
                });
                return editor;
            },
            initEditor = function() {
                var editor = {};
                editor.inputEditor = createEditor('<input>');
                editor.dataTypeEditor = createEditor('<input>');
                editor.textareaEditor = createEditor('<textarea>');
                // var dateEditor = flatpickr(editor.dataTypeEditor.get(0));
                // dateEditor.set('onChange', function (d) {
                //     setActiveText();
                // });
                return editor;
            },
            getEditor = function(editType) {
                if (editType === null || editType === undefined) {
                    return null;
                }
                switch (editType) {
                    case 'datetype':
                        return editor.dataTypeEditor;
                    case 'textarea':
                        return editor.textareaEditor;
                }
                return editor.inputEditor;
            },
            getCurrentEditType = function(active) {
                if (activeOptions.idsfields) {
                    var idfield = activeOptions.idsfields[active.get(0).id];
                    if (idfield) {
                        return idfield.editType;
                    }
                }
                var ediable = activeOptions.editorColumns.hasOwnProperty(active.index());
                if (!ediable) {
                    return null;
                }
                return activeOptions.editorColumns[active.index()];
            },
            getCurrentEditor = function() {
                if (!active.length) {
                    return null;
                }
                var currentEditType = getCurrentEditType(active);
                return getEditor(currentEditType);
            },
            activeOptions = $.extend(buildDefaultOptions(), options),
            ARROW_LEFT = 37,
            ARROW_UP = 38,
            ARROW_RIGHT = 39,
            ARROW_DOWN = 40,
            ENTER = 13,
            ESC = 27,
            TAB = 9,
            element = $(this),
            active,
            editor = initEditor(),
            currentEditor,
            showEditor = function(select) {
                active = element.find('td:focus');
                currentEditor = getCurrentEditor();
                if (!currentEditor) {
                    return;
                }
                currentEditor.val(active.text())
                    .removeClass('error')
                    .show()
                    .offset(active.offset())
                    .css(active.css(activeOptions.cloneProperties))
                    .width(active.width())
                    .height(active.height())
                    .focus();

                if (select) {
                    currentEditor.select();
                }
            },
            setActiveText = function() {
                var text = currentEditor.val(),
                    evt = $.Event('change'),
                    originalContent;
                if (active.text() === text || currentEditor.hasClass('error')) {
                    return true;
                }
                originalContent = active.html();
                active.text(text).trigger(evt, text);
                if (evt.result === false) {
                    active.html(originalContent);
                }
            },
            movement = function(element, keycode) {
                if (keycode === ARROW_RIGHT) {
                    return element.next('td');
                } else if (keycode === ARROW_LEFT) {
                    return element.prev('td');
                } else if (keycode === ARROW_UP) {
                    return element.parent().prev().children().eq(element.index());
                } else if (keycode === ARROW_DOWN) {
                    return element.parent().next().children().eq(element.index());
                }
                return [];
            };


        element.on('click keypress dblclick', showEditor)
            .css('cursor', 'pointer')
            .keydown(function(e) {
                var prevent = true,
                    possibleMove = movement($(e.target), e.which);
                if (possibleMove.length > 0) {
                    possibleMove.focus();
                } else if (e.which === ENTER) {
                    showEditor(false);
                } else if (e.which === 17 || e.which === 91 || e.which === 93) {
                    showEditor(true);
                    prevent = false;
                } else {
                    prevent = false;
                }
                if (prevent) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        element.find('td').prop('tabindex', 1);
        $(window).on('resize', function() {
            if (currentEditor.is(':visible')) {
                currentEditor.offset(active.offset())
                    .width(active.width())
                    .height(active.height());
            }
        });
    });

};
$.fn.editableTableWidget.defaultOptions = {
    cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
        'text-align', 'font', 'font-size', 'font-family', 'font-weight',
        'border', 'border-top', 'border-bottom', 'border-left', 'border-right'
    ]
};
