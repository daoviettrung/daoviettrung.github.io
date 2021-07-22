/**
 * Desciption: Form đặt câu hỏi
 */

function formRegister(form) {
	var idForm 	= "#" + form;
	var urlAjax = "https://langmaster.vn/erp/api/hbr-form-data/add";
    var textBtn = $(idForm + ' .btnSuccess .btn').val();
	$.ajax({
		type: "POST",
		url: urlAjax,
		data: $(idForm).serialize(),
        dataType: "json",
        cache: false,
		beforeSend: function() {
			$(idForm + ' .form-group').removeClass('has-error');
			$(idForm + ' .alert').remove();
			$(idForm + ' .btnSuccess .btn').val('Đang gửi thông tin...').attr('disabled', 'disabled');
			$('body').append('<div class="page-loading"><div class="loader"></div></div>');
		},
		success: function(result){
			if(result.error) {
				if(result.error.form_id) {
					$(idForm + ' .btnSuccess').prepend('<div class="alert alert-danger">'+ result.error.form_id +'</div>');
				} else {
					$.each(result.error, function(key, value) {
						$(idForm + ' #input-'+ key).addClass('has-error');
					})
					$(idForm + ' .btnSuccess').prepend('<div class="alert alert-danger">Vui lòng điền đầy đủ các thông tin bắt buộc</div>');
				}
			} else {
				$(idForm + ' .btnSuccess').prepend('<div class="alert alert-success">Cám ơn Anh/chị đã đăng kí tham gia khóa học của Trường doanh nhân HBR. HBR sẽ liên hệ với Anh/chị trong thời gian sớm nhất!</div>');
                $(idForm + ' .form-control').val('');
                $(idForm + ' .step_1').addClass('hidden');
                $(idForm + ' .step_2').removeClass('hidden');
			}
			
			$(idForm + ' .btnSuccess .btn').val(textBtn).removeAttr('disabled', 'disabled');
			$('body .page-loading').remove();
		}
	});
}

$('#box_noiDung .title').click(function() {
    var parent = $(this).parent();
    $('.content', parent).slideToggle();
    /* $(this).css('padding','50px 24px 20px 60px'); */
});
if ($(".fancybox-button").size() > 0) {
    $(".fancybox-button").fancybox({
        groupAttr: 'data-rel',
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: true,
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });

    $('.fancybox-video').fancybox({
        type: 'iframe'
    });
}


// Menu sticky
function stickyMenu() {
    var boxMenu = '#box_menu';
    var topPage = $(window).scrollTop();
    var topFix = 72;
    if(topPage >= topFix) {
        $(boxMenu).addClass('sticky');
        $(boxMenu).css({'box-shadow' : '0 2px 5px 0 rgba(0,0,0,0.1)'});
    } else {
        $(boxMenu).removeClass('sticky');
        $(boxMenu).removeAttr('style');
    }
}

// Menu Mobile
function close_memu_mobile() {
    if($('.box_header .menu.mobile').size() > 0) {
        $('.box_header .menu.mobile').addClass('hidden-xs hidden-sm');
        
    }
    if($('.menu_mobile_bg').size() > 0) {
        $('.menu_mobile_bg').remove();
    }
}
$('.menu_mobile a').click(function() {
    $('.box_header .menu').removeClass('hidden-xs hidden-sm').addClass('mobile');
    $('.box_header').append('<div class="menu_mobile_bg" onclick="javascript:close_memu_mobile();"></div>');
});

// Popup video
function play_video(url) {
    var html = '';
    html += '<div class="popup_video" onclick="close_popup()">';
    html += '<div class="popup_content">';
    html += '<div class="embed-responsive embed-responsive-16by9">';
    html += '<iframe class="embed-responsive-item" src="'+ url +'" frameborder="0" allowfullscreen></iframe>';
    html += '</div>';
    html += '<a href="javascript:void(0)" onclick="close_popup()" class="popup_close"><i class="fa fa-times"></i></a>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
}

// Close Popup video
function close_popup() {
    $('.popup_video').remove();
}

$(document).ready(function () {
	$(window).scroll(function () {
       stickyMenu();
   });
	
    //Chi nhap so
    $(".auto_init").keypress(function (e) {
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    });
    
    // Menu go box
    $('.go_box').click(function() {
        var box = $(this).attr('data-box');
        if($('#' + box).length) {
            var top_scroll = 0;
            top_scroll = $("#" + box).offset().top;
            $('html,body').animate({
                scrollTop: top_scroll - 60
            }, 'slow');
        }
        $('.box_header .menu.mobile').addClass('hidden-xs hidden-sm');
        $('.go_box').removeClass('active');
        $(this).addClass('active');
        $('.menu_mobile_bg').remove();
    });

    // Popup video, image
    if ($(".fancybox-button").size() > 0) {
        $(".fancybox-button").fancybox({
            groupAttr: 'data-rel',
            prevEffect: 'none',
            nextEffect: 'none',
            closeBtn: true,
            helpers: {
                title: {
                    type: 'inside'
                }
            }
        });

        $('.fancybox-video').fancybox({
            type: 'iframe'
        });
    }
});