$(function(){
	//添加日程
	$(".inp").focusin(function () {
		if($(this).val()=="添加ToDo"){
			$(this).val("")
		}
	})

	$(".inp").keydown(function(e){
		if(e.keyCode==13 && e.target.value!=""){
			let htmlStr=$(".cnt_main").html();
			let str=$(this).val();
			htmlStr=`<li class="lis clearfix">
						<i></i>
						<div class="checkBox">
							<input type="checkbox" class="ingInp">
						</div>
						<span class="ingStr">${str}</span>
						<a class="delect" href="javascrit:;"></a>
					</li>
					${htmlStr}`;
			$(".cnt_main").html(htmlStr);
			//加数量
			let num=parseInt($(".ingCounts").html());
			num++;
			$(".ingCounts").html(num);
			
			//删除日程
// 			$(".delect").click(function () {
// 				//删除事件
// 				if(confirm("您确认要删除该活动吗?")){
// 					$(this).parent().remove();
// 					
// 					//减数量
// 					let num=parseInt($(".ingCounts").html());
// 					num--;
// 					$(".ingCounts").html(num);
// 					
// 				}
// 			})

			
			
			
		}
	});

})

$(function(){
	//获取cookie
	if(getCookie("ingStr")){
		let ingObj=JSON.parse(getCookie("ingStr"))
		let ingNum=JSON.parse(getCookie("ingNum"))
		let doneObj=JSON.parse(getCookie("doneStr"))
		let doneNum=JSON.parse(getCookie("doneNum"))
			
		let ingHtmlStr="";
		let doneHtmlStr="";
		$(".ingCounts").html(ingNum)
		for(let i in ingObj){
			ingHtmlStr+=`<li class="lis clearfix">
							<i></i>
							<div class="checkBox">
								<input type="checkbox" class="ingInp">
							</div><span class="ingStr">${ingObj[i]}</span>
							<a class="delect" href="javascrit:;"></a>
						</li>`
		}
		$(".cnt_main").html(ingHtmlStr);
		
		$(".doneCounts").html(doneNum);
		for(let i in doneObj){
			doneHtmlStr+=`<li" class="lis finsLi clearfix">
							<i style="background: #B1B1B1;"></i>
							<div class="checkBox"  style="background: #E6E6E6;">
								<input type="checkbox" class="doneInp" checked></div>
							<span class="doneStr" style="background: #E6E6E6;">${doneObj[i]}</span>
							<a class="delect_f" href="javascrit:;" style="background-image: url('img/4.jpg');background-color: #E6E6E6;"></a>
						</li>`
		}
		$(".finished").html(doneHtmlStr);
	}
	
	$(".cnt").click(function(e){
		
		//完成日程
		if(e.target.className=="ingInp"){
			
				//从进行中删除
				let str=e.target.parentNode.nextElementSibling.innerHTML;
			
				e.target.parentNode.parentNode.remove();
				
				//减数量
				let num=parseInt($(".ingCounts").html());
				num--;
				$(".ingCounts").html(num);
				
				//在完成事件中添加
				let htmlStr=$(".finished").html();
					htmlStr+=`<li" class="lis finsLi clearfix">
								<i style="background: #B1B1B1;"></i>
								<div class="checkBox"  style="background: #E6E6E6;">
									<input type="checkbox" class="doneInp" checked></div>
								<span class="doneStr" style="background: #E6E6E6;">${str}</span>
								<a class="delect_f" href="javascrit:;" style="background-image: url('img/4.jpg');background-color: #E6E6E6;"></a>
							</li>`;
				$(".finished").html(htmlStr);
				
				
				let doneNum=parseInt($(".doneCounts").html());
				doneNum++;
				$(".doneCounts").html(doneNum);
				
				
				
			
		}
		
		//删除日程
		if(e.target.className=="delect"){
			if(confirm("您确认要删除该活动吗?")){
				e.target.parentNode.remove();
				//减数量
				let num=parseInt($(".ingCounts").html());
				num--;
				$(".ingCounts").html(num);
				
			}
		}
		
		//删除已完成事件
		
		if(e.target.className=="delect_f"){
			//删除事件
			if(confirm("您确认要删除该活动吗?")){
				e.target.parentNode.remove();
				
				
				//减数量
				let doneNum=parseInt($(".doneCounts").html());
				doneNum--;
				$(".doneCounts").html(doneNum);
				
			}
		}
		
	})
})
window.onbeforeunload=function(){
	let ingArr=[];
	$(".ingStr").each(function(){
		ingArr.push($(this).html())
	})
	let ingStr=JSON.stringify(ingArr)
	addCookie("ingStr",ingStr,1)
	
	let ingNum=JSON.stringify($(".ingCounts").html())
	addCookie("ingNum",ingNum,1)
	
	let doneArr=[];
	$(".doneStr").each(function(){
		doneArr.push($(this).html())
	})
	let doneStr=JSON.stringify(doneArr)
	addCookie("doneStr",doneStr,1)
	
	let doneNum=JSON.stringify($(".doneCounts").html())
	addCookie("doneNum",doneNum,1)
}