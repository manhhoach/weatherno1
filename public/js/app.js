


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('#img-weather');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://${location.host}/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location;
                let description = '';
                data.weather.weather_descriptions.forEach((ele, index) => {
                    if (index === 0)
                        description += ele;
                    else if (index === data.length - 1) {
                        description += ` and ${ele}`
                    }
                    else
                        description += `, ${ele}`
                })

                messageTwo.textContent = `Today ${data.weather.temperature} degrees. It's ${description.toLowerCase()}`;
                img.src=data.weather.weather_icons[0];


            }

        })
    })

})
