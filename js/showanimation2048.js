function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-"+i+"-"+j);
	numberCell.css({
		"backgroundColor": getNumberBackgroundColor(randNumber),
		"color": getNumberColor(randNumber)
	});
	numberCell.text(randNumber);
	numberCell.animate({
		width: cellSlideLength,
		height: cellSlideLength,
		top: getPosTop(i,j),
		left: getPosLeft(i,j)
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top: getPosTop(tox,toy),
		left: getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}