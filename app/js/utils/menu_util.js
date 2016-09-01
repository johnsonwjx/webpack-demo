var
    commonUtil = require('./common_util'),
    menuSelectClass = 'pure-menu-selected',
    templateUtil = require('./template_util'),
    menuRender,
    planMenus = [{
        "name": "establishment",
        "text": "编制说明"
    }, {
        "name": "emphasiswork",
        "text": "重点工作"
    }, {
        "name": "loadPowerReliableEconomic",
        "text": "主要指标"
    }, {
        "name": "loadEconomic2",
        "text": "其它指标"
    }, {
        "name": "loadManager",
        "text": "管理系统"
    }, {
        "name": "loadProduct",
        "text": "生产系统"
    }, {
        "name": "loadLife",
        "text": "生活后勤"
    }],
    planFinishedMenus = [{
        "name": "loadPowerReliableFinish",
        "text": "主要指标"
    }, {
        "name": "loadEconomic1Economic2Finish",
        "text": "其它指标"
    }, {
        "name": "loadFueldetailOverhaulingFinish",
        "text": "燃料及机组检修情况"
    }, {
        "name": "analyze",
        "text": "指标分析"
    }, {
        "name": "loadDepartmentBenifit1",
        "text": "考勤表一"
    }, {
        "name": "loadDepartmentBenifit2",
        "text": "考勤表二"
    }],

    menuSelect = function($menu) {
        $('.' + menuSelectClass).blur();
        $('.' + menuSelectClass).removeClass(menuSelectClass);
        if ($menu) {
            $menu.addClass(menuSelectClass);
        }
    },

    createMenu = function(menus, id) {
        if (!menuRender) {
            menuRender = templateUtil.compileFile('menu-item');
        }
        $(id).append(menuRender({
            list: menus
        }));
        var $menus = $(id + ' a'),
            menulen = $menus.length;
        var onScroll = function() {
            var scrollPos = $(this).scrollTop();
            if (scrollPos > $($menus.last().get(0).hash).position().top) {
                menuSelect($menus.last());
                return;
            }
            if (scrollPos <= $($menus.first().get(0).hash).position().top) {
                menuSelect($menus.first());
                return;
            }
            $menus.slice(1, menulen - 1).each(function() {
                var $target = $(this.hash);
                if ($target.position().top <= scrollPos && $target.position().top + $target.height() > scrollPos) {
                    menuSelect($(this));
                    return false;
                }
            });
        };
        $menus.on('click', function(e) {
            e.preventDefault();
            $(document).off('scroll');
            var $target = $(this.hash);
            if (!$target.length) return;
            var location = $target.offset().top;
            menuSelect($(this));
            $('body,html').stop().animate({
                'scrollTop': location
            }, 600, 'swing', function() {
                $(document).on('scroll', commonUtil.throttle(onScroll, 100));
            });
        });
    },
    createPlanMenu = function() {
        createMenu(planMenus, '#menu .pure-menu-list');
    },
    createPlanFinishMenu = function() {
        createMenu(planFinishedMenus, '#menu .pure-menu-list');
    };
module.exports = {
    createMenu: createMenu,
    createPlanMenu: createPlanMenu,
    createPlanFinishMenu: createPlanFinishMenu,
    planMenus: planMenus,
    planFinishedMenus: planFinishedMenus,
    menuSelect: menuSelect
};
