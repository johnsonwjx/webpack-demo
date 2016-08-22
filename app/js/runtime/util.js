var
    printDom,
    PHE = require("print-html-element"),
    printPage = function() {
        var opts = {
            // printMode: 'popup',//popup/iframe
            pageTitle: '-'
                // templateString: string,
                // popupProperties: ;set the window features (such as menubar, scrollbars, etc. in popup mode
                // stylesheets: string | string[];
                // styles: string | string[];
        };
        PHE.printElement(printDom, opts);
    },
    init = function($dataContent) {
        printDom = $dataContent.get(0);
        $('#print').on('click', printPage);
    };
module.exports = {
    init: init
};
