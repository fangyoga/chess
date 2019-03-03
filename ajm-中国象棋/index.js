/************************************************************
 *************************  游戏界面绘制    **********************
 * **********************************************************/
var pen = document.querySelector("canvas").getContext("2d");

//绘制棋盘边框
pen.beginPath();
pen.lineWidth = 4
pen.rect(60, 30, 480, 540); //绘制矩形
pen.stroke();

//绘制棋盘基线
function drawChessboard(start_top, end_top) {
	for (var i = 0; i < 5; i++) {
		pen.beginPath();
		pen.moveTo(60, start_top + 60 * i);
		pen.lineTo(540, start_top + 60 * i); //棋格大小为60px，分为上下绘制
		pen.stroke();
		for (var j = 0; j < 7; j++) {
			pen.beginPath();
			pen.moveTo(120 + j * 60, start_top);
			pen.lineTo(120 + j * 60, end_top);
			pen.stroke();
		}
	}
}
drawChessboard(30, 270);
drawChessboard(330, 570);

//绘制米格
function drawMiLine(sx, sy, ex, ey) {
	pen.beginPath();
	pen.moveTo(sx, sy);
	pen.lineTo(ex, ey);
	pen.lineWidth = 1;
	pen.stroke();
}
drawMiLine(240, 30, 360, 150);
drawMiLine(360, 30, 240, 150);
drawMiLine(240, 450, 360, 570);
drawMiLine(360, 450, 240, 570);
//绘制文字
pen.save(); //保留刚才笔的状态
pen.beginPath();
pen.font = "900 50px 华文行楷";
pen.translate(300, 300);
pen.rotate(270 * Math.PI / 180);;
pen.fillText("楚", -25, -180);
pen.fillText("河", -25, -120);
pen.beginPath();
pen.font = "900 50px 华文行楷";
pen.rotate(180 * Math.PI / 180);
pen.fillText("汉", -25, -180);
pen.fillText("界", -25, -120);
pen.restore(); //返回笔状态

//给炮、兵特殊位置做标记
function drawMark(x, y) {
	var m, n;
	var i = 0;
	j = 4;
	if (x == 60) {
		i = 0;
		j = 2
	} else if (x == 540) {
		i = 2;
	}
	for (i; i < j; i++) {
		switch (i) {
			case 0:
				m = 1;
				n = -1;
				break;
			case 1:
				m = 1;
				n = 1;
				break;
			case 2:
				m = -1;
				n = 1;
				break;
			case 3:
				m = -1;
				n = -1;
				break;
		}
		pen.beginPath();
		pen.lineWidth = 1;
		pen.moveTo(x + m * 6, y + n * 16);
		pen.lineTo(x + m * 6, y + n * 6);
		pen.lineTo(x + m * 16, y + n * 6);
		pen.stroke();
	}
}
//红方位置
drawMark(120, 150);
drawMark(480, 150);
drawMark(60, 210);
drawMark(180, 210);
drawMark(300, 210);
drawMark(420, 210);
drawMark(540, 210);
//黑方位置
drawMark(120, 450);
drawMark(480, 450);
drawMark(60, 390);
drawMark(180, 390);
drawMark(300, 390);
drawMark(420, 390);
drawMark(540, 390);
//简化选择器
function $(a) {
	return document.querySelector(a);
}
//布局棋子位置，建立一个棋盘序号坐标
var innerNum = 0;
var fragment = document.createDocumentFragment();
for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 9; j++) {
		var chessPosition;
		chessPosition = document.createElement("div");
		fragment.appendChild(chessPosition);
		chessPosition.className = "chessPosition";
		chessPosition.style.left = 60 - 28 + j * 60 + "px";
		chessPosition.style.top = 30 - 28 + i * 60 + "px";
		chessPosition.innerText = innerNum;
		chessPosition.id = "P-" + innerNum;
		innerNum++;
	}
}
$("#chessboard").appendChild(fragment);
//初始化棋盘棋子排列
var chessPoses = document.querySelectorAll(".chessPosition"); //图上所有点

function initialPieces() {
	var txt = ""; //象棋棋子内的文字
	var fixNum; //固定值数字15(黑棋、红骑在各自数组中的最大下标)
	var redPieces, blackPieces; //红黑棋子双方
	//分为红黑两方并给象棋定位初始位置
	for (var i = 0; i < chessPoses.length; i++) {
		if (i < 9 || i == 19 || i == 25 || i == 27 || i == 29 || i == 31 || i == 33 || i == 35) {
			chessPoses[i].classList.add("chessPiece", "red");
		} else if (i == 54 || i == 56 || i == 58 || i == 60 || i == 62 || i == 64 || i == 70 || i > 80) {
			chessPoses[i].classList.add("chessPiece", "black");
		}
		chessPoses[i].innerText = i;
	}
	//给红黑双方棋子内加上文字，并加上name属性，格式如：red-車、black-車
	redPieces = document.querySelectorAll(".red");
	blackPieces = document.querySelectorAll(".black");
	for (var i = 0; i < 2; i++) {
		if (i == 0) {
			fixNum = 0;
		} else {
			fixNum = 15;
		}
		for (var j = 0; j < 16; j++) {
			switch (j) {
				case Math.abs(fixNum - 0):
				case Math.abs(fixNum - 8):
					txt = "車";
					break;
				case Math.abs(fixNum - 1):
				case Math.abs(fixNum - 7):
					txt = "馬";
					break;
				case Math.abs(fixNum - 2):
				case Math.abs(fixNum - 6):
					if (i == 0) {
						txt = "相"
					} else {
						txt = "象"
					};
					break;
				case Math.abs(fixNum - 3):
				case Math.abs(fixNum - 5):
					if (i == 0) {
						txt = "仕"
					} else {
						txt = "士"
					};
					break;
				case Math.abs(fixNum - 4):
					if (i == 0) {
						txt = "帅"
					} else {
						txt = "将"
					};
					break;
				case Math.abs(fixNum - 9):
				case Math.abs(fixNum - 10):
					txt = "炮";
					break;
				case Math.abs(fixNum - 11):
				case Math.abs(fixNum - 12):
				case Math.abs(fixNum - 13):
				case Math.abs(fixNum - 14):
				case Math.abs(fixNum - 15):
					if (i == 0) {
						txt = "兵"
					} else {
						txt = "卒"
					};
					break;
			}
			if (i == 0) {
				redPieces[j].innerText = txt;
				redPieces[j].name = "red-" + txt;
				redPieces[j].className = "chessPiece red";
			} else {
				blackPieces[j].innerText = txt;
				blackPieces[j].name = "black-" + txt;
				blackPieces[j].className = "chessPiece black";
			}
		}
	}
}
/************************************************************
 ************************  实现游戏功能    ***********************
 ************************************************************/
var color = "red"; //棋子颜色，决定红方先走
var takePiece = null; //拿起的棋子
var chooseablePieces; //可以选择拿起的棋子
var jiangNum = 85,
	shuaiNum = 4; //将帅所在坐标的数字
var isFirstEnter = true; //是否是第一次进入
var m = 0,
	s = 0; //计时板的分钟和秒
var starTime; //计时器
//开始游戏     程序入口
$("#start-btn").onclick = function () {
	if (isFirstEnter) {
		isFirstEnter = false;
		startGame(); //程序入口
		startTime = setInterval(countTime, 1000);
		//暂停游戏
		$("#pause-btn").onclick = function () {
			$("#alert-cover").style.display = "block";
			$("#window-hint").innerHTML = "<b>暂停中</b>";
			$("#window-btn").innerHTML = "继续游戏";
			clearInterval(startTime);
		}
		//继续游戏、再来一局
		$("#window-btn").onclick = function () {
			switch ($("#window-btn").innerHTML) {
				//继续游戏
				case "继续游戏":
					$("#alert-cover").style.display = "none";
					startTime = setInterval(countTime, 1000);
					break;
					//再来一局
				case "再来一局":
					location.reload();
					break;
			}
		}
		//重新开始
		$("#restart-btn").onclick = function () {
			window.location.reload();
		}
		//发起投降
		$("#surrender-btn").onclick = function () {
			s = 0;
			m = 0;
			$("#alert-cover").style.display = "block";
			$("#window-btn").innerHTML = "再来一局";
			clearInterval(startTime);
			if (color == "red") {
				$("#window-hint").innerHTML = "<b>黑方胜</b>";
			} else if (color == "black") {
				$("#window-hint").innerHTML = "<b>红方胜</b>";
			}
		}
	}
}
//开始游戏    
function startGame() {
	initialPieces(); //初始化棋子位置
	think(); //思考待落子
}
//思考  
function think() {
	console.log(color + "思考中......")
	$("#red-think").style.display = "none";
	$("#black-think").style.display = "none";
	$("#" + color + "-think").style.display = "block";
	for (var i = 0; i < chessPoses.length; i++) {
		chessPoses[i].onmouseenter = function (e) {
			if (e.target.name == null) { //如果是空白处
				this.classList.add(color + "PosHover");
			} else { //如果在棋子上
				if (this.classList.contains(color)) {
					this.classList.add(color + "ChessHover");
				}
			}
		}
		chessPoses[i].onmouseleave = function () {
			this.classList.remove(color + "PosHover");
			this.classList.remove(color + "ChessHover");
		}
	}
	takeStep();
}
//拿起棋子
function takeStep() {
	chooseablePieces = document.querySelectorAll("." + color);
	for (var i = 0; i < chooseablePieces.length; i++) {
		chooseablePieces[i].onclick = function () {
			takePiece = this;
			if ($("." + color + "ClickChess") != null) {
				$("." + color + "ClickChess").style.top = $("." + color + "ClickChess").offsetTop + 5 + "px";
				$("." + color + "ClickChess").classList.remove(color + "ClickChess")
			}
			takePiece.classList.add(color + "ClickChess");
			takePiece.style.top = takePiece.offsetTop - 5 + "px";
			judgeDrop()
		}
	}
}
//放下棋子
function putChess(canPos) {
	var canDrop = false;
	for (var i = 0; i < chessPoses.length; i++) {
		chessPoses[i].onclick = function () {
			var posNum = this.id.split("-")[1];
			for (var i = 0; i < canPos.length; i++) {
				if (posNum == canPos[i]) {
					canDrop = true;
					break;
				}
			}
			//落子到空白处或者吃掉对方
			if ($("." + color + "ClickChess") && this.classList.contains(color) == false && canDrop) {
				if (takePiece.innerText == "将") {
					jiangNum = parseInt(this.id.split("-")[1]);
				} else if (takePiece.innerText == "帅") {
					shuaiNum = parseInt(this.id.split("-")[1]);
				}
				if (this.innerText == "将") {
					$("#alert-cover").style.display = "block";
					$("#window-btn").innerHTML = "再来一局";
					clearInterval(startTime);
					$("#window-hint").innerHTML = "<b>红方胜</b>";
				} else if (this.innerText == "帅") {
					$("#alert-cover").style.display = "block";
					$("#window-btn").innerHTML = "再来一局";
					clearInterval(startTime);
					$("#window-hint").innerHTML = "<b>黑方胜</b>";
				}
				this.name = takePiece.name;
				this.innerText = takePiece.innerText;
				this.classList = "chessPiece " + color;
				takePiece.name = null;
				takePiece.style.top = takePiece.offsetTop + 5 + "px";
				takePiece.innerText = takePiece.id.split("-")[1];
				takePiece.classList = "chessPosition";
				takePiece = null;
				for (var j = 0; j < chooseablePieces.length; j++) {
					chooseablePieces[j].onclick = null; //************/
				}
				//改变棋子颜色   换对方落子
				color = (color == "red" ? "black" : "red");
				think();
			}
		}
	}
	takeStep(); //chessPoses[i]和takeStep()中的点击事件并排，才能让用户有可选点击性
}
//判断棋子的落子的位置
function judgeDrop() {
	var temp = 0,	//棋子的运行规则（步数）
		idNum = 0; //可放置在棋盘上的编号(最终加入到canpos数组中)
	var takeNum = parseInt(takePiece.id.split("-")[1]); //拿起的棋子的编号
	var canPos = []; //把棋手可能走的所有位置都装在这个数组里面
	var fixNum; //区别红黑双方士、将的数字，红方时，fixNum=0，黑方时，fixNum=63（只能在米格内运行）
	if (color == "red") {
		fixNum = 0;
	} else if (color == "black") {
		fixNum = 63;
	}
	switch (takePiece.innerText) {
		case "車":
			car();
			break;
		case "馬":
			horse();
			break;
		case "相":
		case "象":
			xiang();
			break;
		case "仕":
		case "士":
			shi();
			break;
		case "将":
		case "帅":
			jiang();
			break;
		case "炮":
			pao();
			break;
		case "兵":
		case "卒":
			bing();
			break;
	}
	//車
	function car() {
		for (var i = 0; i < 4; i++) { //从上下左右四个方向看看有没有棋子挡路
			if ((i == 1 && takeNum % 9 == 8) || (i == 3 && takeNum % 9 == 0)) { //当棋子在最右侧或者最左侧的纵轴上时，不允许往右和往左寻找可能的位置
				continue;
			} else {
				switch (i) {
					case 0:
						temp = 9;
						break; //上
					case 1:
						temp = -1;
						break; //右
					case 2:
						temp = -9;
						break; //下
					case 3:
						temp = 1;
						break; //左
				}
				idNum = takeNum - temp;
				if (idNum >= 0 && idNum <= 89) {
					while (!$("#P-" + idNum).classList.contains(color)) {
						canPos.push(idNum);
						if ($("#P-" + idNum).name != null || (i == 1 && idNum % 9 == 8) || (i == 3 && idNum % 9 == 0)) {
							break;
						}
						idNum = idNum - temp;
						if (idNum < 0 || idNum > 89) {
							break;
						}
					}
				}
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	//馬
	function horse() {
		var poorNum;
		for (var i = 0; i < 8; i++) { //从右竖日上、右横日上、右横日下、右竖日下……八个方向看看有没有棋子挡路
			switch (i) {
				case 0:
					temp = 17, poorNum = 8;
					break; //右竖日上
				case 1:
					temp = 7, poorNum = 8;
					break; //右横日上
				case 2:
					temp = -11, poorNum = -10;
					break; //右横日下
				case 3:
					temp = -19, poorNum = -10;
					break; //右竖日下
				case 4:
					temp = -17, poorNum = -8;
					break; //左竖日下
				case 5:
					temp = -7, poorNum = -8;
					break; //左横日下
				case 6:
					temp = 11, poorNum = 10;
					break; //左横日上
				case 7:
					temp = 19, poorNum = 10;
					break; //左竖日上
			}
			idNum = takeNum - temp;
			if (idNum >= 0 && idNum <= 89) {
				if (!$("#P-" + idNum).classList.contains(color) && $("#P-" + (idNum + poorNum)).name == null) {
					canPos.push(idNum);
				}
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	//相、象
	function xiang() {
		for (var i = 0; i < 4; i++) {
			
			switch (i) {
				case 0:
					temp = 16;
					break; //右上
				case 1:
					temp = -20;
					break; //右下
				case 2:
					temp = -16;
					break; //左下
				case 3:
					temp = 20;
					break; //左上
			}
			idNum = takeNum - temp;
			if(fixNum==0&&idNum<45) {		//象不能过河
				if (idNum >= 0 && idNum <= 89) {
					if (!$("#P-" + idNum).classList.contains(color) && $("#P-" + (idNum + temp / 2)).name == null) {
						canPos.push(idNum);
					}
				}
			}
			if(fixNum==63&&idNum>44) {		//象不能过河
				if (idNum >= 0 && idNum <= 89) {
					if (!$("#P-" + idNum).classList.contains(color) && $("#P-" + (idNum + temp / 2)).name == null) {
						canPos.push(idNum);
					}
				}
			}

		}
		console.log("可落子的位置：" + canPos);
	}
	//仕、士
	function shi() {
		for (var i = 0; i < 4; i++) {
			switch (i) {
				case 0:
					temp = 8;
					break; //右上
				case 1:
					temp = -10;
					break; //右下
				case 2:
					temp = -8;
					break; //左下
				case 3:
					temp = 10;
					break; //左上
			}
			idNum = takeNum - temp;
			if (idNum == 3 + fixNum || idNum == 5 + fixNum || idNum == 13 + fixNum || idNum == 21 + fixNum || idNum == 23 + fixNum) {
				if (!$("#P-" + idNum).classList.contains(color)) {
					canPos.push(idNum);
				}
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	//帅、将
	function jiang() {
		for (var i = 0; i < 4; i++) {
			switch (i) {
				case 0:
					temp = 9;
					break; //上
				case 1:
					temp = -1;
					break; //右
				case 2:
					temp = -9;
					break; //下
				case 3:
					temp = 1;
					break; //左
			}
			idNum = takeNum - temp;
			if ((idNum >= 3 + fixNum && idNum <= 5 + fixNum) || (idNum >= 12 + fixNum && idNum <= 14 + fixNum) || (idNum >= 21 + fixNum && idNum <= 23 + fixNum)) {
				if (!$("#P-" + idNum).classList.contains(color)) {
					canPos.push(idNum);
				}
			}
		}
		//将帅相遇时
		if ((jiangNum - shuaiNum) % 9 == 0) { //说明将帅处在同一纵轴上
			var hasPiece; //布尔值，将帅所在的纵轴的直线上，它们之间是否还有棋子
			var tempArr = [];
			var tempNum = shuaiNum;
			var count = (jiangNum - shuaiNum) / 9 - 1; //将帅之间的横轴数量
			for (var i = 0; i < count; i++) {
				tempNum += 9;
				tempArr.push($("#P-" + tempNum));
			}
			hasPiece = tempArr.some(function (item) {
				return item.classList.contains("chessPiece")
			})
			if (!hasPiece) {
				if (color == "red") {
					canPos.push(jiangNum);
				} else if (color == "black") {
					canPos.push(shuaiNum);
				}
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	//炮
	function pao() {
		for (var i = 0; i < 4; i++) {
			if ((i == 1 && takeNum % 9 == 8) || (i == 3 && takeNum % 9 == 0)) { //当棋子在最右侧或者最左侧的纵轴上时，不允许往右和往左寻找可能的位置
				continue;
			} else {
				switch (i) {
					case 0:
						temp = 9;
						break; //上
					case 1:
						temp = -1;
						break; //右
					case 2:
						temp = -9;
						break; //下
					case 3:
						temp = 1;
						break; //左
				}
				idNum = takeNum - temp;
				if (idNum >= 0 && idNum <= 89) {
					while ($("#P-" + idNum).name == null) {
						canPos.push(idNum);
						if ((i == 1 && idNum % 9 == 8) || (i == 3 && idNum % 9 == 0)) {
							break;
						}
						idNum = idNum - temp;
						if (idNum < 0 || idNum > 89) {
							break;
						}
					}
					if ($("#P-" + idNum) && $("#P-" + idNum).name != null) {
						if ((i == 3 && idNum % 9 >= 1) || (i == 1 && idNum % 9 <= 7) || i == 0 || i == 2) {
							do { //炮打翻山
								idNum = idNum - temp;
								if (idNum >= 0 && idNum <= 89) {
									if ($("#P-" + idNum).name != null && $("#P-" + idNum).name.split("-")[0] != color) {
										canPos.push(idNum);
										break;
									} else if ($("#P-" + idNum).name != null && $("#P-" + idNum).name.split("-")[0] == color) {
										break;
									}
								} else {
									break;
								}
								if ((i == 1 && idNum % 9 == 8) || (i == 3 && idNum % 9 == 0)) {
									break;
								}
							} while ($("#P-" + idNum).name == null)
						}
					}
				}
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	//兵、卒
	function bing() {
		var tempArr = [];
		for (var i = 0; i < 4; i++) {
			switch (i) {
				case 0:
					if (color == "black") {
						temp = 9
					};
					break; //上
				case 1:
					if ((color == "red" && takeNum > 44) || (color == "black" && takeNum < 45)) {
						temp = -1;
					}
					break; //右
				case 2:
					if (color == "red") {
						temp = -9
					};
					break; //下
				case 3:
					if ((color == "red" && takeNum > 44) || (color == "black" && takeNum < 45)) {
						temp = 1;
					}
					break; //左
			}
			idNum = takeNum - temp;
			if (idNum >= 0 && idNum <= 89) {
				if (!$("#P-" + idNum).classList.contains(color)) {
					tempArr.push(idNum)
				}
			}
		}
		//数组去重
		for (var i = 0; i < tempArr.length; i++) {
			//如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
			if (tempArr.indexOf(tempArr[i]) == i) {
				canPos.push(tempArr[i])
			}
		}
		console.log("可落子的位置：" + canPos);
	}
	putChess(canPos);
}
//格式化时间
function countTime() {
	s++;
	if (s == 60) {
		m++;
		s = 0;
	}
	m = parseInt(m);
	if (s < 10) {
		s = "0" + s;
	}
	if (m < 10) {
		m = "0" + m;
	}
	$("#time").innerText = m + ":" + s;
}
//禁止选中和复制界面（网页）上的内容
document.body.onselectstart = document.body.oncontextmenu = function () {
	return false;
}