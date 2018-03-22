//jshint esnext:true

//date = new Date('1981.06.29').getTime() / 1000;

const  timeConverter = (time) => {
  const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //if isNaN is true the time is not a unix time and needs to be checked for natural time
  if(isNaN(time)){
    const naturalDate = time.toLowerCase().split(" ");
      naturalDate[1] = parseInt(naturalDate[1]);
        const conversionArr = [];
        
        for(let i = 1; i < months.length; i++){
          if(months[i] === naturalDate[0]){
            conversionArr[1]= i+1;
            break;
          }else if(i == months.length-1){
            return false;
          }
        }
      if(naturalDate[1] > 0 && naturalDate[1] < monthDays[conversionArr[1]-1]){
        conversionArr[2] = naturalDate[1];
      }else{
        return false;
      }
      if(naturalDate[2] > 0 && naturalDate[2] < 3000){
        conversionArr[0] = naturalDate[2];
      }else{
        return false;
      }
      let unixConvertedDate = new Date(conversionArr.join('.')).getTime() / 1000;
      let dates = {
        "unix": unixConvertedDate,
        "natural": time
      }
      return dates;        
  } else{
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
console.log('natural conversion is: ', timeConverter('June 29, 1917'));
console.log('unix conversion is: ', timeConverter(-1657051200));



//var unix = new Date(365227200*1000);


//console.log('regular time is '+unix)
//console.log("unix to regular time is "+unix.getFullYear());
