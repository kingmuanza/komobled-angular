$.fn.wrapInTag = function (opts) {
    //console.log("Wrap in tag");
    var tag = opts.tag || 'strong',
            words = opts.words || [],
            regex = RegExp(words.join('|'), 'gi'),
            replacement = '<' + tag + '>$&</' + tag + '>';

    //console.log(words);

    return this.html(function () {
        var text = $(this).text().replace(regex, replacement);
        //console.log(text)
        return text;
    });
};
var bashenga = {
    formatDate: function (date) {
        var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('');
    }
}