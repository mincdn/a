function JsIntval(str) {
    const parsedInt = parseInt(str, 10);
    return parsedInt ? parsedInt : 0;
}
function ToTop(h) {
    $('body,html').animate({
        scrollTop: h
    }, 500);
}
function showMessage(elementId, message, fadeOutDelay) {
    const element = $(elementId);
    element.html(message).fadeIn(400).delay(2000).fadeOut(400);
    if (fadeOutDelay) {
        setTimeout(() => {
            element.html('').removeClass('no');
        }, fadeOutDelay);
    }
}
$(function() {
    $('#GoTop a').hover(function() {
        $(this).addClass('no').text($(this).attr('alt'));
    }, function() {
        $(this).removeClass('no').text('');
    });

    $(window).scroll(function() {
        const Div = $('#DivNav');
        const DivTop = (Div.length) ? (Div.offset().top - JsIntval(Div.attr('for'))) : 400;

        if ($(window).scrollTop() > DivTop) {
            $('#GoTop').fadeIn(800);
            $('#DivTop').addClass('fixed');
        } else {
            $('#GoTop').fadeOut(300);
            $('#DivTop').removeClass('fixed');
        }
    });
});
function toggleEV(elementId, show) {
    const element = $(elementId);
    if (show) {
        element.show();
    } else {
        element.hide();
    }
}
var clipboardShare = new Clipboard('#CopyShare');
clipboardShare.on('error', function(e) {
    showMessage('#CopyShare', '复制失败，请手动复制文案~', null);
    $('#CopyShare').text('复制失败').addClass('no');
});
clipboardShare.on('success', function(e) {
    showMessage('#CopyShare', '文案复制成功，赶快分享吧~', 5000);
    $('#CopyShare').text('复制成功').addClass('no');
});

var clipboardLing = new Clipboard('#CopyLing');
clipboardLing.on('error', function(e) {
    showMessage('#CopyLing', '复制失败，请手动复制口令~', null);
    $('#CopyText').html('<b>复制失败！请<em>长按口令</em>选择复制，再打开<em>手机淘宝</em>~</b>');
});
clipboardLing.on('success', function(e) {
    showMessage('#CopyLing', '复制成功', null);
    $('#CopyText').html('<b>复制成功！请打开<em>手机淘宝</em>，会自动弹出商品~</b>');
    setTimeout(() => {
        $('#CopyLing').html('再次复制').removeClass();
        $('#CopyText').html('↓↓复制下方口令，打开<em>手机淘宝</em>，即可购买↓↓');
    }, 5000);
});

function ShowDesc() {
    const descTxt = $('#DescTxt');
    const descIco = $('#DescIco');
    const isOn = descIco.hasClass('act');
    const infoLink = "https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?" + descTxt.attr('value');

    if (isOn) {
        descIco.removeClass('act');
        descTxt.hide();
    } else {
        descIco.addClass('act');
        descTxt.fadeIn(400);
    }

    if (descTxt.html().length < 50) {
        $.getJSON(infoLink + '&callback=?', function(ret) {
            const arr = ret.data.pcDescContent.match(/src="(.+?)"/gi);
            let msg = '';
            $.each(arr, function(k, v) {
                if (v.indexOf('spaceball.gif') < 0) {
                    msg += '<img ' + v.replace('src="//', 'src="https://') + '>';
                }
            });
            if (msg.length > 50) {
                descTxt.html(msg);
            } else {
                descTxt.html('加载失败，再点一下试试~');
            }
        });
    }
}

function KLGM(s, n) {
    const itemLink = $('#ItemLink');
    const copyLing = $('#CopyLing');
    const Txt = itemLink.html();

    if (copyLing.attr('data-clipboard-text').length > 3) {
        toggleEV('#LingBox', 1);
        return false;
    }

    $.ajax({
        url: itemLink.attr('value'),
        type: 'get',
        dataType: 'html',
        timeout: 3000,
        cache: false,
        beforeSend: function() {
            itemLink.html('<b></b>');
        },
        error: function() {
            showMessage('#ItemLink', '亲，网络错误，请稍后重试~', 800);
        },
        success: function(Msg) {
            if (Msg.length > 3) {
                $('#CopyMsg').html(Msg);
                copyLing.attr('data-clipboard-text', Msg);
                toggleEV('#LingBox', 1);
            } else {
                showMessage('#ItemLink', '亲，链接出错，请刷新后重试~');
            }
            setTimeout(function() {
                itemLink.html(Txt);
            }, 800);
        }
    });
}
