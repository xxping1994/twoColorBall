//加载红蓝区
function addBall(listid,aClass,le){
	var list = document.getElementById(listid);
	for(var i=1;i<=le;i++){
		var li=document.createElement("li");
		var a=document.createElement("a");
		a.innerHTML=i>9?i:"0"+i;
		a.id=aClass+i;
		a.className=aClass;
	    li.appendChild(a);
		list.appendChild(li);
	}	
}
addBall( "redBalls","reda",33);
addBall( "blueBalls","bluea",16);

//选中红球
var checkList_red=[];
//选中蓝球
var checkList_blue=[];

//选中区显示
function checkList(arr,checkId){
	var check =document.getElementById(checkId);
	var html="";

	for(var i=0;i<arr.length;i++){
		html+="<li>"+arr[i]+"</li>"

	}
	check.innerHTML=html;
}

//选球
function checkedBall(aclass,le,checkId,type){
	for(var i=1;i<=le;i++){
		var a = document.getElementById(aclass+i);
		a.addEventListener('click', getData, false); //给红蓝区小球绑定点击事件  
		function getData(event) {	
			var num = event.toElement.textContent ;
			if(type == 1){//如果是红球
				if (checkList_red.length > 0) {
				for (var j = 0; j < checkList_red.length; j++) {
				  var t = checkList_red[j];
				  if (parseInt(num) === parseInt(t)) {//已经选过的红球，再点一次就会取消掉
					 checkList_red.splice(j, 1);//splice删除数组元素，会改变原数组，返回的是删除的元素
					 checkList(checkList_red,"check_red");//刷新一次选中的红球区
					return;
				  }
				}
			  }
			  if (checkList_red.length < 6) {//选中红球区的红球个数小于6的时候可以继续选择
				checkList_red.push(num);
				checkList(checkList_red,"check_red");
			  } else {//否则弹出提示
				alert("最多选6个红球");
			  }
			}
			else{
				checkList_blue=[num];	//蓝球直接更改
				checkList(checkList_blue,"check_blue");
			}
		}
	}
}
checkedBall("reda",33,"check_red",1);
checkedBall("bluea",16,"check_blue",2);



//重置
function reset(){
	 checkList_red=[];
	 checkList(checkList_red,"check_red");
     checkList_blue=[];
	 checkList(checkList_blue,"check_blue");
}


 //机选
 function getRandom() {
   checkList_red = [];
   checkList_blue = [];
      //red
      var redArr = new Array(33);
      for (var i = 0; i < 33; i++) {
        redArr[i] = i>8?(i+1):'0'+(i+1);
      }

      while ( checkList_red.length < 6) {
        var temp = Math.random() * redArr.length;
        checkList_red.push(redArr.splice(temp, 1)[0]);
      }
      bubbleSort(checkList_red);
	  checkList(checkList_red,"check_red");
      var num = Math.floor(Math.random() * 15 + 1);
      checkList_blue.push(num>9?num:'0'+num);
	  checkList(checkList_blue,"check_blue");
 }



    //冒泡排序
  function  bubbleSort(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    }
  