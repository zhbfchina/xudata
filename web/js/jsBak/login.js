/// <reference path="jquery-3.2.1.js" />

$(function () {
    //��ȡ�û�������
    var $user_name = $("input[type=text]").val();
    var $password = $("input[type=password]").val();
    
    //����ȡ���û�ͨ��ajax���봫����̨�ж��Ƿ���ȷ
    $.ajax({
        type: "post",
        url: "http://192.168.8.108/xhq/SystemApi.ashx?req_type=1&username=" + $user_name + "&password=" + $password,
        //data: "",
        cache: false,
        aysnc:false,
            success: function (jsonString) {
                var Data = eval("(" + jsonString + ")");//��̨��������json�ַ������ݼ������ţ�������ת��json����ʱҪȥ�����ţ�ͬʱdataType:"json"��ҲҪ��������Ϊ��̨��������json�ַ����������ţ��Ͳ���json���͵������ˣ������������dataType:json����̨�����ھ���http���佫���ݽ�����json���͵�����ʱ�ͻᱨ��parsererror

                //var Data = eval(jsonString);//��̨��Ӧ����Ϣ��ȥ�������ţ����Դ˴�ҲҪȥ�������򣬱���Uncaught SyntaxError: Unexpected identifier
                if (Data.IsOk == 1) {
                    alert("��������û�����������ȷ��");

                    //����̨�ж��û�������û�����������ȷʱ��Ϊ����¼����ťע�����¼�
                    $(".login").click(function () {
                        //�������¼��ʱ���ڵ�ǰҳ����ת��ҳ��
                        location.href = '../page/planList.html';//�൱��<a href="../page/planList.html" target="_self"><img src="img.jpg" /></a>
                        //�������¼��ʱ������ת��ҳ�����µĿհ�ҳ����ʾ
                        //window.open('../page/planList.html');//�൱��<a href="../page/planList.html" target="_blank"><img src="img.jpg" /></a>
                    })
                } else {
                    alert("��������û��������벻��ȷ�����������룡");
                    return false;
                }

            },
    error: function (err, XMLHttpRequest, textStatus, errorThrown) {//XMLHttpRequest ���󣬴�����Ϣ�������ܣ�����Ĵ������ 
        alert("error");
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }
    });

    
})