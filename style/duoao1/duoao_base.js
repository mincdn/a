/*
 * ����Ա��� - רҵ���Ա��ͳ���
 * �ٷ���վ: http://www.duoao.cn
 */
var $id = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};
function AddFavorite(sURL, sTitle){
	try { window.external.addFavorite(sURL, sTitle); }
	catch (e) {
		try { window.sidebar.addPanel(sTitle, sURL, ""); }
		catch (e) { alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������"); }
	}
}
function SetHome(obj,vrl){
	try{ obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); }
	catch(e){ 
		if(window.netscape) {
			try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }
			catch (e) { 
				alert("��ܰ��ʾ:\n�������������ҳ������ҳ��\n���ֶ����������ѡ��������ҳ��");
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
		$('#moretext').innerHTML = '����'
	} else {
		e.style.height = 'auto';
		$('#morebutton').className = 'up';
		$('#moretext').innerHTML = '����'
	}
}
