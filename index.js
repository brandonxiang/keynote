function getQueryObj() {
    var obj = {};
    var str = decodeURI(location.search.replace('?', ''));
    var arr = str.split('&');
    arr.forEach(function (value) {
        let k = value.match(/(.+)=.+|$/)[1];
        let v = decodeURI(value.match(/.+=(.+)|$/)[1]);
        if (k && v) obj[k] = v;
    });
    return obj;
};

document.addEventListener('DOMContentLoaded', function() {
    var page = document.getElementById('page')
    var query = getQueryObj()
    var mdName = query.page || 'index'
    page.dataset.markdown = 'markdown/' + mdName + '.md'

    Reveal.initialize({
        width: 960,
        height: 700,

        // Factor of the display size that should remain empty around the content
        margin: 0.1,

        // Bounds for smallest/largest possible scale to apply to content
        minScale: 0.2,
        maxScale: 1.5,

        history: true,

        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/notes/notes.js', async: true },
            { src: 'plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } }
        ]
    });

}, false)
