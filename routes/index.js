const express = require('express');
const router = express.Router();
//function used to convert unix and natural dates
const  dateConverter = (time) => {
	const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
	const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//if isNaN is true the time is not a unix time and needs to be checked for natural time
	if(isNaN(time)){
    	const naturalDate = time.toLowerCase().split(" ");
    	naturalDate[1] = parseInt(naturalDate[1]);
        const conversionArr = [];
        
        for(let i = 0; i < months.length; i++){
        	if(months[i] === naturalDate[0]){
            	conversionArr[1]= i+1;
            	break;
        	}else if(i == months.length-1){
          		//if month format is wrong return false to identify invalid date format
            	return false;
        	}
        }
      	if(naturalDate[1] > 0 && naturalDate[1] <= monthDays[conversionArr[1]-1]){
        	conversionArr[2] = naturalDate[1];
      	}else{
      		//if day is outside possible days of the month return false to identify invaild date
        	return false;
    	}
    	if(naturalDate[2] >= 0 && naturalDate[2] <= 5000){
        	conversionArr[0] = naturalDate[2];
    	}else{
      	//if year is less than 0AD or grearter than 3000AD retrun false to identify invalid date format
        return false;
    	}
    	let unixConvertedDate = new Date(conversionArr.join('.')).getTime() / 1000;
    	let dates = {
        	"unix": unixConvertedDate,
        	"natural": time
    	}
    	return dates;        
	} else{
  		//convert unix time to natural time
    	var date = new Date(time * 1000);
    	var year = date.getFullYear();
    	var month = months[date.getMonth()].split('');
    	var day = date.getDate();
        month[0] = month[0].toUpperCase();
        month = month.join('');
        let naturalConvertedDate = month+" "+day+", "+year;
        let dates = {
          "unix": time,
          "natural": naturalConvertedDate
        }
        return dates;
	}
}

router.use('/static',express.static('public'));

//get requests to timeis without a time are redirected to the current time
router.get('/', (req, res)=> {
	const date = new Date();
	const print = date.getTime();
	console.log('redirecting to time'+print);
	res.redirect(`/convert/${print}`);
});

//POST request from the submit form are redirected to the time submited
router.post('/', (req, res)=>{
	var queryTime = req.body.timeInput;
	queryTime = queryTime.toString();
	console.log("queryTime is: ", queryTime);
	res.redirect(`/convert/${queryTime}`);
});


router.get('/:time', (req, res)=>{
	const { time } = req.params;
	const templateData = {'timeValid': true};
	const convertedTime = dateConverter(time);
	if(convertedTime===false){
		console.log('in final direct if, time invalid');
		templateData.timeValid = false;
	}else{
		console.log('in if time is valid');
		templateData.unixTime = convertedTime.unix;
		templateData.naturalTime = convertedTime.natural;
	}
	console.log(templateData);
	//console.log('in the 8====DK<--~' +JSON.stringify(templateData));
	res.render('convertTime.pug', templateData);
});
	
module.exports = router;