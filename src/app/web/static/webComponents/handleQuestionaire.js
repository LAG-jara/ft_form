
const urlparams = new URLSearchParams(window.location.search);
let formId = urlparams.get('formId');
let userId = urlparams.get('userId');

if (formId){
    
    try{
        let response = await fetch(`http://localhost:8000/api/sent-form/${userId}/${formId}`);
        if (!response.ok){
            throw new Error('Error: failed to fetch form');
        }
        let data = await response.json();
        renderQuestionaire(data);
    }catch(error){
        console.log(error);
    }
}

function renderQuestionaire(data){
   let content =  document.getElementsByTagName('body')[0];
   let estile = document.createElement('style');
   estile.textContent = `
        body{
            color: #000;
        }
        .inactive {
            display: none;
        }
        .active {
            display: block;
        }
   `;
    content.appendChild(estile);

    let container = document.createElement('div');
    container.id = 'questionaire-container';
    content.appendChild(container);

    let questionElements = [];

	function createQuestionElement(question, type) {
		let questionElement;
		if (type === 'text') {
		  questionElement = document.createElement('text-tag');
		  questionElement.setAttribute('minlength', question.min_chars);
		  questionElement.setAttribute('maxlength', question.max_chars);
		} else if (type === 'boolean') {
		  questionElement = document.createElement('binary-tag');
		} else if (type === 'option') {
		  questionElement = document.createElement('options-tag'); //esto hay que cambiarlo
		  questionElement.setAttribute('options', question.options.options);
		}else if (type === 'multiple_choice'){
			questionElement = document.createElement('options-tag');
			questionElement.setAttribute('options', question.options);
		}else if (type === 'url'){
			questionElement = document.createElement('url-tag');
		}else if (type === 'date'){
			questionElement = document.createElement('date-tag');
		}
		
		// else if (type === 'number'){
		// 	questionElement = document.createElement('number-tag');
		// }
		// }else if (type === 'email'){
		// 	questionElement = document.createElement('email-tag');
		// }
		// }else if (type === 'scale'){
		// 	questionElement = document.createElement('scale-tag');
		// 	questionElement.setAttribute('min', question.min);
		// 	questionElement.setAttribute('max', question.max);
		// }
		questionElement.setAttribute('question', question.text);
		questionElement.setAttribute('numQuestion', question.order);
		return questionElement;
	  }

	data.questions.forEach((question) => {
		let questionElement;
		switch (question.type) {
			case 'text':
				questionElement = createQuestionElement(question, 'text');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'text' , id: question.id , response: ''});
				break;
			case 'boolean':
				questionElement = createQuestionElement(question, 'boolean');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'boolean' , id: question.id , response: ''});
				break;
			case 'option':
				questionElement = createQuestionElement(question, 'option');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'option' , id: question.id , response: []});
				break;
			case 'multiple_choice':
				questionElement = createQuestionElement(question, 'multiple_choice');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'multiple_choice' , id: question.id , response: []});
				break;
			case 'number':
				questionElement = createQuestionElement(question, 'number');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'number' , id: question.id , response: ''});
				break;
			case 'date':
				questionElement = createQuestionElement(question, 'date');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'date' , id: question.id , response: ''});
				break;
			case 'email':
				questionElement = createQuestionElement(question, 'email');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'email' , id: question.id , response: ''});
				break;
			case 'url':
				questionElement = createQuestionElement(question, 'url');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'url' , id: question.id , response: ''});
				break;
			case 'scale':
				questionElement = createQuestionElement(question, 'scale');
				var questionContainer = document.createElement('div');
				questionContainer.appendChild(questionElement);
				questionElements.push({ element: questionContainer, order: question.order , type: 'scale' , id: question.id , response: ''});
				break;
			case 'default':
				console.log('eso no existe');
	  }
	});

	  questionElements.sort((a, b) => a.order - b.order);

	  questionElements.forEach((item, index) => {
		if(index === 0){
			item.element.classList.add('active');
		}
		else{
			item.element.classList.add('inactive');
		}
		container.appendChild(item.element);
		let customElement = item.element.firstElementChild;
		let shadow = customElement.shadowRoot;

		let nextButton = shadow.querySelector('#next-btn');
		let prevButton = shadow.querySelector('#prev-btn');

		function saveResponse(){
			let inputs = shadow.querySelectorAll('input');
			let responses = [];
			inputs.forEach(input => {
			if (input.type === 'checkbox' || input.type === 'radio'){
				if (input.checked){
						responses.push(input.value);
					}
			}else{
				responses.push(input.value);
			}
		});
		//console.log(responses);
		item.response = responses;
}

async function sendAnswers(){
	let response = []; 
	questionElements.forEach(question => {
		let answer = {
			"question_id" : question.id,
			"response" : question.response,
			"question_type" : question.type
		}
		//console.table(answer);
		response.push(answer);
	});
	let token = getCookie('access_token');
	console.log(token);
	let url = `http://localhost:8000/api/sent-form/${userId}/${formId}/`;
	try {
			let answer = fetch(url, {
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({
				"responses" : response
			})
		})
		if (answer.ok){
			console.log('respuesta enviada');
		}else{
			throw new Error('Error: failed to send answers');
		}
	}catch(error){
		console.log(error);
	}
}

		if (nextButton) {
		  nextButton.addEventListener('click', (event) => {
			event.preventDefault();
			saveResponse();
			if (index < questionElements.length - 1) {
			  	showQuestion(index + 1);
			}else if (index === questionElements.length - 1){
				sendAnswers();	
			}
		  });
		}
	  
		if (prevButton) {
		  prevButton.addEventListener('click', (event) => {
			event.preventDefault();
			if (index > 0) {
			  showQuestion(index - 1);
			}
		  });
		}
});
	 
    let currentIndex = 0;
	

    function showQuestion(index) {
		if (questionElements[currentIndex]) {
			//console.log(questionElements[currentIndex]);
			questionElements[currentIndex].element.classList.remove('active');
			questionElements[currentIndex].element.classList.add('inactive');
		  }
		  if (questionElements[index]) {
			//console.log(questionElements[index]);
			questionElements[index].element.classList.remove('inactive');
			questionElements[index].element.classList.add('active');
			currentIndex = index;
		  } else {
			console.error('Invalid index:', index);
		  }
		}
}


export function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}