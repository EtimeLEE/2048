/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-10 13:50:59
 * @version $Id$
 */

;(function(){
	var Dialog = function(config){
		var _this = this;

		// 默认配置参数
		this.config = {
			// 宽 高
			width: "auto",
			height: "auto",
			// 对话框提示信息
			message: null,
			//会话框类型
			type: "waiting",
			//按钮配置
			buttons: null,
			//弹出框延迟多久关闭
			delay: null,
			// 延时关闭的回调函数
			delayCallback:null,
			// 对话框遮罩层透明度
			maskOpacity: null,
			// 点击遮罩层是否关闭
			maskClose:false,

			// 是否启用动画
			effect: true
		};

		// 默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}else{
			this.isConfig = true;
		}

		// 创建基本DOM
		this.body = $("body");
		// 创建遮罩层
		this.mask = $('<div class="g-dialog-container">');
		// 创建弹出框
		this.win = $('<div class="dialog-window">');
		// 创建弹出框头部
		this.winHeader = $('<div class="dialog-header">');
		// 创建提示信息
		this.winContent = $('<div class="dialog-content">');
		// 创建弹出框按钮组
		this.winFooter = $('<div class="dialog-footer">');

		//渲染DOM
		this.creat();
	};
	// 记录弹窗层级
	Dialog.zIndex = 10000;
	Dialog.prototype = {
		creat:function(){
			var _this = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				winHeader = this.winHeader,
				winContent = this.winContent,
				winFooter= this.winFooter,
				body = this.body;
			// 增加弹窗层级
			Dialog.zIndex++;
			this.mask.css("zIndex",Dialog.zIndex);
			if(this.isConfig){
				// 默认
				win.append(winHeader.html('<i class="fa fa-spinner fa-spin"></i>'));
				if(config.effect){
					this.animate();
				}
				mask.append(win);
				body.append(mask);
			}else{
				// 自定义参数
				if(config.type=="warning"){
					winHeader.html('<i class="fa fa-exclamation-circle"></i>');
					// winHeader.html(config.message);
				}
				if(config.type=="ok"){
					winHeader.html('<i class="fa fa-check"></i>');
					// winHeader.html(config.message);
				}
				if(config.type=="waiting"){
					winHeader.html('<i class="fa fa-spinner fa-spin"></i>');
					// winHeader.html(config.message);
				}
				winHeader.addClass(config.type);
				win.append(winHeader);
				if(config.message){
					win.append(winContent.html(config.message));
				}

				// 按钮
				if(config.buttons){
					this.creatButtons(winFooter,config.buttons);
					win.append(winFooter);
				}

				mask.append(win);
				body.append(mask);

				// 设置宽高
				if(config.width != "auto"){
					win.width(config.width);
				}
				if(config.height != "auto"){
					win.height(config.height);
				}

				if(config.maskOpacity){
					mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")");
				}

				if(config.delay && config.delay !== 0){
					window.setTimeout(function(){
						_this.close();
						// 执行延时的回调函数
						config.delayCallback && config.delayCallback();
					}, config.delay);
				}

				if(config.effect){
					this.animate();
				}

				// 遮罩层点击是否关闭
				if(config.maskClose){
					mask.click(function(){
						_this.close();
					});
				}
			}
		},
		close:function(){
			this.mask.remove();
		},
		creatButtons:function(footer,buttons){
			var _this = this;
			$(buttons).each(function(){
				var type = this.type ? "class='" + this.type + "'":"";
				var btnText = this.text?this.text:"按钮"+(++i);
				var callback = this.callback?this.callback:null;

				var button = $("<button "+type+">"+btnText+"</button>");
				footer.append(button);

				if(callback){
					button.click(function(e){
						var isClose = callback();
						// 阻止事件冒泡
						e.stopPropagation();
						if(isClose !== false){
							_this.close();
						}
						
					});
				}else{
					button.click(function(e){
						e.stopPropagation();
						_this.close();
					});
				}
			});
		},
		animate:function(){
			var _this = this;
			this.win.css("-webkit-transform","scale(0,0)");
			setTimeout(function(){
				_this.win.css("-webkit-transform","scale(1,1)");
			}, 100);
		}
	};


	window.Dialog = Dialog;
	$.Dialog = function(config){
		return new Dialog(config);
	};
})(jQuery);