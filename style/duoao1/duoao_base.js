/*
 * 多奥淘宝客 - 专业的淘宝客程序
 * 官方网站: http://www.duoao.cn
 */
var $id = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};
function AddFavorite(sURL, sTitle){
	try { window.external.addFavorite(sURL, sTitle); }
	catch (e) {
		try { window.sidebar.addPanel(sTitle, sURL, ""); }
		catch (e) { alert("加入收藏失败，请使用Ctrl+D进行添加"); }
	}
}
function SetHome(obj,vrl){
	try{ obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); }
	catch(e){ 
		if(window.netscape) {
			try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }
			catch (e) { 
				alert("温馨提示:\n浏览器不允许网页设置首页。\n请手动进入浏览器选项设置主页。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',vrl);
		}
	}
}
function showCategory(b, c, d) {
	var e = $("#duoao_cn" + '_' + b)[0];
	var f = e.offsetHeight;
	if (f - c > 50) {
		e.style.height = d + "px";
		$('#morebutton').className = '';
		$('#moretext').innerHTML = '更多'
	} else {
		e.style.height = 'auto';
		$('#morebutton').className = 'up';
		$('#moretext').innerHTML = '收起'
	}
}
