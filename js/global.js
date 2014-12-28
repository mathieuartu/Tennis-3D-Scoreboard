$(function(){

	var	$ = window.jQuery,
		jDoc = $(document),

		lettersArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","stop","space","nothing"],
		numbersArray = ["number-0","number-1","number-2","number-3","number-4","number-5","number-6","number-7","number-8","number-9"],
		scoreArray = ["score-0","score-15","score-30","score-ad"],
		eachLetter = $(".rlx-scoreboard span[data-letter='true']"),

		scoreBoard = $(".rlx-scoreboard"),
		scoreBoardPanel = $(".rlx-scoreboard-panel"),
		scoreBoardMask = $(".rlx-scoreboard-mask"),
		scoreBoardWidth = scoreBoard.width(),
		scoreBoardHeight = scoreBoard.height(),
		scoreBoardPosition = scoreBoard.offset();


	//Content display

	//LETTERS
	//Generic
	function mixLetters(){
		var randNumber = Math.floor(Math.random() * (lettersArray.length - 1) + 1);
		return lettersArray[randNumber];
	}

	function changeLetter(targetLetter, letter){
		var newLetter = letter || mixLetters();
		if (newLetter == " "){ newLetter = "space"}
		targetLetter.removeClass().addClass(newLetter);
	}

	function increaseLetter(targetLetter){
		var oldLetter = targetLetter.attr("class") || "a",
			newLetter;
		for(var i = 0; i < lettersArray.length -1; i++){
			if(lettersArray[i] == oldLetter){
				targetLetter.removeClass().addClass(lettersArray[i+1]);
			}
		}
	}

	//A-Z interval
	var letterIntervalIterative, iterativeSpeed = 22;

	function letterIterative(thisSentence, sentenceArray, iterativeSpeed){
		var theseLetters = thisSentence.find("span[data-letter='true']");

		letterIntervalIterative = setInterval(function(){

			theseLetters.each(function(i){
				var jThis = $(this),
					curLetter = jThis.attr("class");

				if(curLetter != sentenceArray[i]){
					increaseLetter($(this));
					if(curLetter == "nothing"){
						jThis.removeClass().addClass("a");
					}
				}
			});
		}, iterativeSpeed);

		setTimeout(function(){
			clearInterval(letterIntervalIterative);
			if( iterativeSpeed < 200 ) letterIterative(thisSentence, sentenceArray, iterativeSpeed*2);
		},400);
	}

	//Display sentence
	function displaySentence(targetSentence, displayMethod, sentence){

		targetSentence.empty();

		if(sentence == " "){
			targetSentence.append("<span class='empty-line'></span>");
		} else {
			//Create letter placeholders
			var sentenceLetters = sentence.split('');

			for(var i = 0; i < sentenceLetters.length; i++){
				if(sentenceLetters[i] == " "){
					sentenceLetters[i] = "space";
				} else if(sentenceLetters[i] == "."){
					sentenceLetters[i] = "stop"
				}
				targetSentence.append("<span class='"+mixLetters()+"' data-letter='true'></span>");
			}

			var targetLetters = targetSentence.find("span[data-letter='true']");

			//Display method

			//--Display : Megamix
			if(displayMethod == undefined || displayMethod == "megamix"){
				letterMegamix(targetSentence, intervalSpeed);
				
				setTimeout(function(){
					for(var i = 0; i < targetLetters.length; i++){
						changeLetter($(targetLetters[i]),sentenceLetters[i]);
					}
				},2000);
			}

			//--Display : A-Z, stops when it encounters the right letter
			else if(displayMethod == "iterative"){
				letterIterative(targetSentence, sentenceLetters, iterativeSpeed);
			}
		}
		
	}

	//NUMBERS
	function flashNumber(targetNumber){
		var flashFlag = 0, flashTimeout;
		var flashInterval = setInterval(function(){
			
			if(flashFlag < 3){
				flashFlag++;
				targetNumber.css("opacity","0");
				flashTimeout = setTimeout(function(){
					targetNumber.css("opacity","1");
				},Math.random() * 100);
			} else {
				clearInterval(flashInterval);
			}
			
		},Math.random() * 200);
	}

	//Display a number
	function displayNumber(targetElement, number){
		targetElement.empty();
		var numberArray = number.split('');
		for(var i=0;i<numberArray.length;i++){
			targetElement.append("<span class='number-"+numberArray[i]+"' data-number='true'></span>");
			flashNumber(targetElement.find(".number-"+numberArray[i]), 100);
		}
	}

	//Display the current points
	function displayPoints(targetElement, points){
		targetElement.empty();
		targetElement.append("<span class='score-"+points+"' data-number='true'></span>");
		flashNumber(targetElement.find(".score-"+points), 100);
	}

	//Display who currently has the service
	function displayService(targetElement){
		$(".rlx-scoreboard-service div").removeClass("rlx-active");
		targetElement.addClass("rlx-active");
		flashNumber(targetElement);
	}

	
	//---Display !

	//CENTER - Names display - only lowercase
	displaySentence($(".rlx-scoreboard-center-line-1"), "iterative", " ");
	displaySentence($(".rlx-scoreboard-center-line-2"), "iterative", "antoine ollivier");
	displaySentence($(".rlx-scoreboard-center-line-3"), "iterative", "vs.");
	displaySentence($(".rlx-scoreboard-center-line-4"), "iterative", "simon ertel");
	displaySentence($(".rlx-scoreboard-center-line-5"), "iterative", " ");

	//CENTER - Display service
	displayService($(".rlx-scoreboard-service-line-4"));

		//FPO
		setTimeout(function(){
			displayService($(".rlx-scoreboard-service-line-2"));
		},3000);

	//LEFT - Previous sets display
	displayNumber($(".rlx-previous-set-p1-1"),"6");
	displayNumber($(".rlx-previous-set-p1-2"),"6");
	displayNumber($(".rlx-previous-set-p1-3"),"3");

	displayNumber($(".rlx-previous-set-p2-1"),"2");
	displayNumber($(".rlx-previous-set-p2-2"),"4");
	displayNumber($(".rlx-previous-set-p2-3"),"1");

		//FPO
		setTimeout(function(){
			displayNumber($(".rlx-previous-set-p2-3"),"2");
		},2000);

	//RIGHT - Current set display
	displayNumber($(".rlx-current-set-p1"),"1");
	displayNumber($(".rlx-current-set-p2"),"2");

	//RIGHT - Current games display
	displayNumber($(".rlx-games-p1"),"3");
	displayNumber($(".rlx-games-p2"),"1");

	//RIGHT - Current score display
	displayPoints($(".rlx-points-p1"),"15");
	displayPoints($(".rlx-points-p2"),"40");

		//FPO
		setTimeout(function(){
			displayPoints($(".rlx-points-p2"),"ad");
		},3000);


	//Animate scoreboard
	//Interval
	var animateInterval, zeroInterval;
	var pageX, pageY, newX, newY, curBG, lastY = 0, lastX = 0, lastBG = 0,
	percentY, percentX;

	function updateAnimation(percentY){
		lastY += (newY - lastY)/30;					
		lastX += (newX - lastX)/30;

		lastBG += (curBG - lastBG)/30;		
				
		scoreBoard.css({
			"-webkit-transform":"rotateX("+lastY+"deg) rotateY("+lastX+"deg)"
		});
		scoreBoardPanel.css({
			"-webkit-transform":"rotateX("+lastY+"deg) rotateY("+lastX+"deg)"
		});
		scoreBoardMask.css({
			"-webkit-transform":"rotateX("+lastY+"deg) rotateY("+lastX+"deg)",
			"background-position": lastBG+"% 0",
			"opacity": (percentY/100)
		});
	}

	function animationInterval(){
		clearInterval(zeroInterval);
		animateInterval = setInterval(function(){
			
			newX = (20*(percentX/100) - 10)/2,
			newY = -(20*(percentY/100) - 10)/2,
			curBG = (percentX/0.5)-40;
			updateAnimation(percentY);
			
		},17);
	}

	function resetScoreboard(){
		clearInterval(animateInterval);
		zeroInterval = setInterval(function(){

			newX = 0, newY = 0, curBG = 0;
			updateAnimation(50);
		
		},17);
	}

	//Actions on the scoreboard
	jDoc.on("mouseenter",".rlx-scoreboard-panel",animationInterval);

	jDoc.on("mouseleave",".rlx-scoreboard-panel", resetScoreboard);

	jDoc.on("mousemove",".rlx-scoreboard-panel", function(e){
		percentX = ((e.pageX - scoreBoardPosition.left) * 100)/scoreBoardWidth,
		percentY = ((e.pageY - scoreBoardPosition.top) * 100)/scoreBoardHeight;
	});

});
