window.addEventListener( 'load',  () => {
        
    const iconImg = document.getElementById('weather-icon');
            const loc = document.querySelector('#location');
            const tempC = document.querySelector('.c') ;
            const tempF= document.querySelector('.f') ;
            const press= document.querySelector('.p') ;
            const desc = document.querySelector('.desc');
            const sunriseDOM = document.querySelector('.sunrise');
            const sunsetDOM = document.querySelector('.sunset');

   let lat;
   let long;
   //accessing user's geolocation
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
              lat= position.coords.latitude;
              long = position.coords.longitude;
        
    
     const base =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a23786c66869f6a34431e4fd96bacfcc&units=metric`;
        fetch(base).then ((response) => {
            return response.json();
        })
        .then ((data) => {
            console.log(data);
           
        const {temp, pressure} = data.main;
        const place = data.name;
        const {description, icon} = data.weather[0];
        const {sunrise, sunset}  = data.sys;

        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const fahreheit =  (temp*9)/5+32;


        const sunriseGMT = new Date(sunrise*1000);
        const sunsetGMT = new Date(sunset*1000);

        //display of data in DOM
             
        iconImg.src = iconUrl;
        loc.textContent = `${place}`;
        desc.textContent = `${description}`;
        tempC.textContent = `${temp.toFixed(2)} °C`;
        tempF.textContent = `${fahreheit.toFixed(2)} °F`;
        press.textContent = `${pressure}  N/㎡ `;
        sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
        sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
        
        localStorage.setItem('data' , JSON.stringify(data));

        });
      });  
    }
});
