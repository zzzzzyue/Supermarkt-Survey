layui.use(['element'], function () {
	$ = layui.jquery;
	element = layui.element;

	//navbar hover
	if ($(window).width() < 750) {
		trun = 0;
	} else {
		trun = 1;
	}

	$('.larry-side-menu').click(function () {
		if (trun) {
			$('.x-side').animate({ left: '0px' }, 200).siblings('.x-main').animate({ left: '220px' }, 200);
			trun = 0;
		} else {
			$('.x-side').animate({ left: '-220px' }, 200).siblings('.x-main').animate({ left: '0px' }, 200);
			trun = 1;
		}

	});



	//nav side bar
	element.on('nav(side)', function (elem) {
		if ($(elem[0]).attr('class') == 'site-children') {
			title = $(elem[0]).text();
			url = $(elem[0]).attr('_href');
			// alert(url);
			for (var i = 0; i < $('.x-iframe').length; i++) {
				if ($('.x-iframe').eq(i).attr('src') == url) {
					$('.layui-tab-title li').eq(i).addClass('layui-this').siblings('li').removeClass('layui-this')
					$('.layui-tab-content div').eq(i).addClass('layui-show').siblings('div').removeClass('layui-show')
					return;
				}
			};

			res = element.tabAdd('x-tab', {
				title: title
				, content: '<iframe frameborder="0" src="' + url + '" class="x-iframe"></iframe>'
			});
			$('.layui-tab-title li').eq($('.layui-tab-content div').length - 1).addClass('layui-this').siblings('li').removeClass('layui-this')
			$('.layui-tab-content div').eq($('.layui-tab-content div').length - 1).addClass('layui-show').siblings('div').removeClass('layui-show')
		}

		$('.layui-tab-title li').eq(0).find('i').remove();
	});


});


