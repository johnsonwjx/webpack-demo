var
    allFields = {
        fields1: ['tag', 'class_name1', 'class_name2', 'sum', 'machine3', 'machine4', 'machine5', 'machine6'],
        fields2: ['tag', 'planmx_content', 'planmx_begdate', 'planmx_enddate', 'execmx_deptname', 'assist_deptname'],
        fields3: ['tag', 'class_name1', 'class_name3', 'class_name2', 'month_plan', 'month_finish', 'year_total', 'lastyear_month_finish', 'lastyear_year_total'],
        fields4: ['tag', 'class_name1', 'class_name2', 'month_plan3', 'month_plan4', 'month_plan5', 'month_plan6', 'month_finish3', 'month_finish4', 'month_finish5', 'month_finish6', 'month_total3', 'month_total4', 'month_total5', 'month_total6'],
        fields5: ['tag', 'class_name1', 'class_name2', 'month_detail', 'total_detail', 'lastyear_month_detail', 'lastyear_total_detail'],
        fields6: ['tag', 'class_name1', 'class_name3', 'class_name2', 'machine3', 'machine4', 'machine5', 'machine6'],
        fields7: ['tag', 'generalmx_desc2', 'generalmx_desc6', 'generalmx_float2', 'generalmx_float1'],
        fields8: ['tag', 'generalmx_desc2', 'average', 'generalmx_desc6', 'generalmx_float2', 'generalmx_float1']
    },
    opts = {
        'power': {
            title: '电量指标',
            template: 'template1',
            fields: 'fields1',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: '',
                7: ''
            }
        },
        'reliable': {
            title: '可靠性指标',
            template: 'template1',
            fields: 'fields1',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: '',
                7: ''
            }
        },
        'economic1': {
            title: '经济性指标(一)',
            template: 'template1',
            fields: 'fields1',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: '',
                7: ''
            }
        },
        'economic2': {
            title: '经济性指标(二)',
            template: 'template1',
            fields: 'fields1',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: '',
                7: ''
            }
        },
        'manager': {
            title: '管理系统重点工作',
            template: 'template2',
            fields: 'fields2'
        },
        'product': {
            title: '生产系统重点工作',
            template: 'template2',
            fields: 'fields2'
        },
        'life': {
            title: '生活后勤系统重点工作',
            template: 'template2',
            fields: 'fields2'
        },
        'power_finish': {
            title: '电量指标',
            template: 'template3',
            fields: 'fields3',
            editorColumns: {
                4: '',
                5: '',
                6: '',
                7: '',
                8: ''
            }
        },
        'reliable_finish': {
            title: '可靠性指标',
            template: 'template3',
            fields: 'fields3',
            editorColumns: {
                4: '',
                5: '',
                6: '',
                7: '',
                8: ''
            }
        },
        'economic1_finish': {
            title: '经济性指标(一)',
            template: 'template3',
            fields: 'fields3',
            editorColumns: {
                4: '',
                5: '',
                6: '',
                7: '',
                8: ''
            }
        },
        'economic2_finish': {
            title: '经济性指标(二)',
            template: 'template4',
            fields: 'fields4',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: '',
                10: '',
                11: '',
                12: '',
                13: '',
                14: ''
            }
        },
        'fueldetail_finish': {
            title: '燃料情况一览表',
            template: 'template5',
            fields: 'fields5',
            editorColumns: {
                3: '',
                4: '',
                5: '',
                6: ''
            }
        },
        'overhauling_finish': {
            title: '机组运行及检修情况表',
            template: 'template6',
            fields: 'fields6',
            editorColumns: {
                4: '',
                5: '',
                6: '',
                7: ''
            },
            idsfields: {
                'finish_detial': {
                    editType: 'textarea'
                }
            }
        },
        'departmentbenifitproduct_finish': {
            title: '(一)生产系统',
            template: 'template7',
            fields: 'fields7'
        },
        'departmentbenifitlife_finish': {
            title: '(二)生活后勤系统',
            template: 'template7',
            fields: 'fields7',
            editorColumns: {
                2: '',
                3: '',
                4: ''
            }
        },
        'departmentbenifitmanager_finish': {
            title: '(三)管理系统',
            template: 'template8',
            fields: 'fields8',
            editorColumns: {
                2: '',
                3: '',
                4: '',
                5: ''
            }
        }
    },
    setIdFieldData = function(data, id, value) {
        if (!data.idsfieldsData) {
            data.idsfieldsData = {};
        }
        if (!data.idsfieldsData[id]) {
            data.idsfieldsData[id] = {};
        }
        data.idsfieldsData[id].text = value;
    },
    getRecordByTag = function(records, tag) {
        if (!records) {
            return null;
        }
        var result = null;
        $.each(records, function(index, record) {
            if (record.tag === tag) {
                result = record;
                return false;
            }
        });
        return result;
    },
    createIdContendData = function(allDatas, id, name, value) {
        var data = allDatas[id];
        if (!data) {
            data = allDatas[id] = {};
        }
        data.name = name;
        setIdFieldData(data, id, value);
    };
module.exports = {
    allFields: allFields,
    getFields: function(name) {
        return allFields[name];
    },
    getOpt: function(name) {
        return opts[name];
    },
    setIdFieldData: setIdFieldData,
    getRecordByTag: getRecordByTag,
    createIdContendData: createIdContendData
};
