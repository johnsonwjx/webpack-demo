require("purecss/build/menus.css");
require("purecss/build/buttons.css");
require("../../css/index.scss");
var
    projectname = 'weihe',
    rootpath = location.href.substring(0, location.href.indexOf(projectname) + projectname.length + 1),
    menuResponsive = function() {
        var layout = document.getElementById('layout'),
            menu = document.getElementById('menu'),
            menuLink = document.getElementById('menuLink');

        function toggleClass(element, className) {
            var classes = element.className.split(/\s+/),
                length = classes.length,
                i = 0;
            for (; i < length; i++) {
                if (classes[i] === className) {
                    classes.splice(i, 1);
                    break;
                }
            }
            // The className is not found
            if (length === classes.length) {
                classes.push(className);
            }

            element.className = classes.join(' ');
        }

        menuLink.onclick = function(e) {
            var active = 'active';
            e.preventDefault();
            toggleClass(layout, active);
            toggleClass(menu, active);
            toggleClass(menuLink, active);
        };
    },
    throttle = function(fn, delay, context) {
        var timer = null;
        return function() {
            if (!context) context = this;
            args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        };
    },
    changeFootHeight = function() {
        if (!this.$dataContent) {
            return;
        }
        $('#foot').height($(window).innerHeight() - this.$dataContent.find('>:last-child').height() - 5);
    },
    init = function() {
        window.location.hash = "no-back-button";
        window.location.hash = "Again-No-back-button"; //again because google chrome don't insert first hash into history
        window.onhashchange = function() {
            window.location.hash = "no-back-button";
        };
        // window.onbeforeunload = function(e) {
        //     return "确定操作吗?未保存数据有可能丢失";
        // };
        menuResponsive();
        this.$dataContent = $('#dataContent');
        $(window).on('resize', throttle(changeFootHeight, 100, this));
    },
    handleError = function(response) {
        alert(response.responseText);
    },
    relogin = function() {
        window.open("login.do?action=relogin", "_top");
    };
module.exports = {
    rootpath: rootpath,
    throttle: throttle,
    init: init,
    changeFootHeight: changeFootHeight,
    handleError: handleError
};
