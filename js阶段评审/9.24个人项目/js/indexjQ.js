$(function(){
	//轮播
	let c=0;
	let t = setInterval(lb,3000);
	$(".banner-btn li").hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
	$(".banner-img li").hover(()=>clearInterval(t),()=>t=setInterval(lb,3000));
	function lb(){
		c++;
		if(c>=$(".banner-btn li").length){
			c=0;
		}
		$(".banner-btn li").removeClass('active');
		$(".banner-btn li").eq(c).addClass("active");
		$(".banner-img li").removeClass('active');
		$(".banner-img li").eq(c).addClass('active');
	}
	// index  搜索匹配的元素，并返回相应元素的索引值，从0开始计数。
	$(".banner-btn li").click(function(){
		c=$(this).index();
		$(".banner-btn li").removeClass('active');
		$(this).addClass("active");
		$(".banner-img li").removeClass('active');
		$(".banner-img li").eq(c).addClass('active');
	});

	//对戒轮播
	duijie();
	function duijie() {
    let asa = $('.owl-carousel li');
    let flag=true;
    let t;
    let d = 0;
    t=setInterval(qhcp,5000);
	    function qhcp(){
	        if(flag){
	            $(".owl-carousel").animate({ 'margin-left': '-1140px' }, 1000);
	            flag=false;
	        }else{
	            $(".owl-carousel").animate({ 'margin-left': '0' }, 1000, function() {});
	            flag=true;
	        }
	    }
	}
})