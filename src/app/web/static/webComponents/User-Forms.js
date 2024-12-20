function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
class UserForms extends HTMLElement {
	constructor() {
	  super();
	  this.shadow = this.attachShadow({ mode: 'open' });
	  this._query = '';
	  this.container = document.createElement('div');
	  this.container.classList.add('container', 'mt-4');
	  this.container.innerHTML = `
		<div id="appendCardsHere" class="row g-3">
		
		</div>

	  `;
	  this.importStyles();

  
	  this.shadow.appendChild(this.container);
	}
  
	importStyles() {
	
	  const styleLink = document.createElement('link');
	  styleLink.setAttribute('rel', 'stylesheet');
	  styleLink.setAttribute('href', window.djangoStaticUrls.studentHomeStyles);
  
	  const bootstrap = document.createElement('link');
	  bootstrap.setAttribute('rel', 'stylesheet');
	  bootstrap.setAttribute('href', window.djangoStaticUrls.bootstrapCSS);
  
	  this.shadow.appendChild(styleLink);
	//   this.shadow.appendChild(generalBootstrap);
	  this.shadow.appendChild(bootstrap);
	}
	addNoForms() {
		const GridOfCards = this.container.querySelector('#appendCardsHere');
	
		if (GridOfCards) {
			const noFormsMessage = document.createElement('h2');
			noFormsMessage.textContent = 'There are no questionnaires available yet, but exciting content is coming soon!';
			// Apply styles to the h2 for absolute centering
			noFormsMessage.style.position = 'fixed';
			noFormsMessage.style.top = '50%';
			noFormsMessage.style.left = '50%';
			noFormsMessage.style.transform = 'translate(-50%, -50%)';
			noFormsMessage.style.textAlign = 'center';
			noFormsMessage.style.maxWidth = '600px';
			noFormsMessage.style.wordWrap = 'break-word';
			GridOfCards.appendChild(noFormsMessage);
		}
	}
	addCard({ id, title, startDate, endDate, state, color, minutes, imageUrl, theme_color }) {
		const GridOfCards = this.container.querySelector('#appendCardsHere');
	
		if (GridOfCards) {
			const card = document.createElement('section');
			card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
			card.setAttribute('data-id', id);
			card.innerHTML = `
				   <div class="card" >
                <div id="header-${id}"class="card-header" style="height:150px " >
			
                </div>
                <div class="container" style="">
                    <!-- First Row -->
            <div class="row g-3 d-flex align-items-center justify-content-between mt-1 ms-2 me-2" >
                <!-- First column, aligned to the start -->
                <div class="col-2 d-flex align-items-center pe-1">
                    
                </div>

                <!-- Second column, aligned to the center -->
                <div  class="col-2 d-flex flex-column align-items-center justify-content-center pe-1 mb-5 position-relative ">
                    <!-- Stars stacked vertically -->
                     <div id="trophy-${id}"class="star-container d-flex flex-column align-items-center justify-content-center  mb-5">
						
                        
                        <!-- Checkbox behind the stars -->
                     </div>
                </div>

                <!-- Third column, aligned to the end -->
                <div class="col-2 d-flex align-items-center pe-1">
                    <abbr title="${startDate} - ${endDate}">
                        <img class="calendars mb-3" src="${window.djangoStaticUrls.calendarIcon}" width="30" height="30">
                    </abbr>
                </div>
            </div>
            </div>
                    <!-- Second Row -->
                    <div class="row ms-1 me-1">
                        <h3 class="card-title" >${title}</h2>
                    </div>

                    <!-- Third Row -->
                    <div class="row ms-2 me-2">
                        <!-- <div class="col-md-12"> -->
                            <div class="p-3 d-flex justify-content-start">${minutes ? minutes :  '5'} min</div>
                        <!-- </div> -->
                    </div>
                    
                    <div class="row ms-2 me-2 mt-5">
                        <div class="col-md-12 d-flex justify-content-end align-items-end mt-3">
                          
                            <button onclick="window.location.href='http://localhost:8000/answerForm?formId=${id}&userId=${localStorage.getItem('id')}';" type="button" class="btn " style="background-color: ${color}; border 0px; font-weight: bold; color: white;">ENTER</button>
                        </div>
                    </div>
			`;
	
			const style = document.createElement('style');
			style.textContent = `
				.card-tall {
					height: 400px;
				}
				.card-header {
					
					background-size: cover;
					background-repeat: no-repeat;
					background-position: center;
			}
			`;
		
			let cardHeader = card.querySelector(`#header-${id}`);


			cardHeader.style.backgroundImage = `url('${imageUrl}')`;
			cardHeader.style.backgroundSize = 'cover';
			cardHeader.style.backgroundRepeat = 'no-repeat';
			cardHeader.style.backgroundPosition = 'center';
			
				

			card.appendChild(style);

			if (state === 'New')
			{
				let trophyParent = card.querySelector(`#trophy-${id}`); 
				if (trophyParent) {
					let completeTrophy = document.createElement('img');
					completeTrophy.src = window.djangoStaticUrls.trophy
					completeTrophy.width = 30;
					completeTrophy.height = 30;
					
					trophyParent.appendChild(completeTrophy);
				}
				let newTitle = card.querySelector(`#header-${id}`); 
				if (newTitle) {
					let completeTrophy = document.createElement('h3');
					completeTrophy.textContent = 'New';
					completeTrophy.style.color = `${color}`;
					completeTrophy.style.fontSize = '24px'; 
					completeTrophy.style.fontWeight = 'bold'; 
			
					newTitle.appendChild(completeTrophy);
				}
	

			}
			else if (state == 'Complete')
			{
				let trophyParent = card.querySelector(`#trophy-${id}`); 
				let completeTrophy = document.createElement('img');
				completeTrophy.src = window.djangoStaticUrls.trophy;
				completeTrophy.width = 30;
				completeTrophy.height = 30;

				trophyParent.appendChild(completeTrophy);
			}
			else 
			{
				let trophyParent = card.querySelector(`#trophy-${id}`); 
				if (trophyParent) {

					let completeTrophy = document.createElement('img');
					completeTrophy.src = window.djangoStaticUrls.trophyBlack
					completeTrophy.width = 30;
					completeTrophy.height = 30;
					
					trophyParent.appendChild(completeTrophy);
				}
			} 
		
			
			
			GridOfCards.appendChild(card);
		}
	}

	
	connectedCallback() {
		const baseUrl = window.location.origin; 
		const userId = localStorage.getItem('id'); 
		const theme = this.getAttribute('theme');
		let theme_color = '#f8f9fa';
		const generalBootstrap = document.createElement('link');

		console.log('THEME', theme);
		if (theme === 'light') {
			generalBootstrap.setAttribute('rel', 'stylesheet');
			generalBootstrap.setAttribute('href', window.djangoStaticUrls.bootstrapChangesWhite);
			window.djangoStaticUrls.calendarIcon = window.djangoStaticUrls.calendarIconBlack;
			window.djangoStaticUrls.trophy = window.djangoStaticUrls.trophyBlack;
			this.shadow.appendChild(generalBootstrap);
		}
		else {
			generalBootstrap.setAttribute('rel', 'stylesheet');
			generalBootstrap.setAttribute('href', window.djangoStaticUrls.bootstrapChangesBlack);
			window.djangoStaticUrls.calendarIcon = window.djangoStaticUrls.calendarIconWhite;
			window.djangoStaticUrls.trophy = window.djangoStaticUrls.trophyWhite;
			this.shadow.appendChild(generalBootstrap);
		}
	
		const url = `${baseUrl}/api/user-forms/${userId}/`;

		// Make the GET request
		let token = getCookie('access_token');
		fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				if (data.length === 0) {
					console.log('No forms found');
					this.addNoForms()
					return;
				}
				data.forEach(element => {
					console.log(element);
					this.addCard({
						id: element.id,
						title: element.form_details.name,
						startDate: new Date(element.sended).toLocaleString(),
						endDate: "No End Date",
						state: element.is_new ? 'New' : 'Normal',
						color: localStorage.getItem('color'),
						imageUrl: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
					})
				});
				
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}
  }
  
  window.customElements.define('user-forms', UserForms);
  