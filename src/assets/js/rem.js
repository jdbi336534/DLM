(function(doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function() {
        var clientWidth = docEl.clientWidth;
        var clientHeight = docEl.clientHeight;
        if (!clientWidth) return;
        if (clientWidth >= 1280) {
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
        }
        if (clientWidth < 1280) {
            docEl.style.fontSize = 100 * (1280 / 1920) + 'px';
        }
        if (!clientHeight) return;
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
