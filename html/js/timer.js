var timerHH = 0;
	var timerH = 0;
	var timerMM = 0;
	var timerM = 0;
	var timerSS = 0;
	var timerS = 0;
	var timerTotal = 0;

	var timerTimer = null;

	var countingUp = false;
	var countingDown = false;

	function timerChange(amountChange){
		if(amountChange == -9)
		{
			timerTotal = 0;
		}
		else if(timerTotal + amountChange < 0){
			if(countingDown)
			{
				$('#countDown').empty().append('<i class="fa fa-fw fa-arrow-down"> </i>');
				countingDown = false;
				clearInterval(timerTimer);
			}
			return;
		}
		else {
			timerTotal += amountChange;
		}

		timerHH = Math.floor(timerTotal/36000);
		timerH = Math.floor((timerTotal-(timerHH*36000))/3600);
		timerMM = Math.floor((timerTotal-(timerHH*36000)-(timerH*3600))/600);
		timerM = Math.floor((timerTotal-(timerHH*36000)-(timerH*3600)-(timerMM*600))/60);
		timerSS = Math.floor((timerTotal-(timerHH*36000)-(timerH*3600)-(timerMM*600)-(timerM*60))/10);
		timerS = timerTotal-(timerHH*36000)-(timerH*3600)-(timerMM*600)-(timerM*60)-(timerSS*10);


		
	//	console.log('amountChange: '+amountChange);
	//	console.log('Timer: '+timerTotal);
	//	console.log('HH: '+timerHH);
	//	console.log('H:  '+timerH);
	//	console.log('MM: '+timerMM);
	//	console.log('M:  '+timerM);
	//	console.log('SS: '+timerSS);
	//	console.log('S:  '+timerS);

		$('#timerDigitHH').empty().append(timerHH);
		$('#timerDigitH').empty().append(timerH);
		$('#timerDigitMM').empty().append(timerMM);
		$('#timerDigitM').empty().append(timerM);
		$('#timerDigitSS').empty().append(timerSS);
		$('#timerDigitS').empty().append(timerS);
	}

	$(window).load(function() {
			$('.timer-digits').bigtext({maxfontsize: ( $(window).height() - 60 ) * .28});
			$('.buttons').bigtext({maxfontsize: ( $(window).height() - 60 ) * .07});

			$(".topHalf").fadeTo(1,0.01);
			$(".bottomHalf").fadeTo(1,0.01);

			$(".topHalf").hover(
				function(){
					$(this).fadeTo(100,0.35);
				},
				function(){
					$(this).fadeTo(100,0.01);
				}
				);
			$(".bottomHalf").hover(
				function(){
					$(this).fadeTo(100,0.35);
				},
				function(){
					$(this).fadeTo(100,0.01);
				}
				);

			$(".topHalf").click(
				function()
				{
					var i = parseInt($(this).siblings('.timerDigit').text());

					var increase = 0;

					var ii = $(this).siblings('.timerDigit').attr('id');
					switch (ii){
						case 'timerDigitS': increase = 1; break;
						case 'timerDigitSS': increase = 10; break;
						case 'timerDigitM': increase = 60; break;
						case 'timerDigitMM': increase = 600; break;
						case 'timerDigitH': increase = 3600; break;
						case 'timerDigitHH': increase = 36000; break;
					}

					timerChange(increase);
				
				});

			$(".bottomHalf").click(
				function()
				{
					var decrease = 0;

					var ii = $(this).siblings('.timerDigit').attr('id');
					switch (ii){
						case 'timerDigitS': decrease = -1; break;
						case 'timerDigitSS': decrease = -10; break;
						case 'timerDigitM': decrease = -60; break;
						case 'timerDigitMM': decrease = -600; break;
						case 'timerDigitH': decrease = -3600; break;
						case 'timerDigitHH': decrease = -36000; break;
					}

					timerChange(decrease);
				
				});

			$("#countUp").click(
				function(){
					if(countingUp)
					{
						clearInterval(timerTimer);
						$('#countUp').empty().append('<i class="fa fa-fw fa-arrow-up"> </i>');
						countingUp = false;
					}
					else
					{
						clearInterval(timerTimer);
						timerTimer=setInterval(function(){timerChange(1)},1000);
						$('#countUp').empty().append('<i class="fa fa-fw fa-pause"> </i>');
						countingUp = true;
						$('#countDown').empty().append('<i class="fa fa-fw fa-arrow-down"> </i>');
						countingDown = false;
					}
				});
			$("#countDown").click(
				function(){
					if(countingDown)
					{
						clearInterval(timerTimer);
						$('#countDown').empty().append('<i class="fa fa-fw fa-arrow-down"> </i>');
						countingDown = false;
					}
					else
					{

						if(timerTotal>0)
						{
							clearInterval(timerTimer);
							timerTimer=setInterval(function(){timerChange(-1)},1000);
							$('#countDown').empty().append('<i class="fa fa-fw fa-pause"> </i>');
							countingDown = true;
							$('#countUp').empty().append('<i class="fa fa-fw fa-arrow-up"> </i>');
							countingUp = false;
						}
					}
				});
			$("#reset").click(
				function(){
					$('#countUp').empty().append('<i class="fa fa-fw fa-arrow-up"> </i>');
					$('#countDown').empty().append('<i class="fa fa-fw fa-arrow-down"> </i>');
					countingDown = false;
					countingUp = false;
					clearInterval(timerTimer);
					timerChange(-9);
				});
});