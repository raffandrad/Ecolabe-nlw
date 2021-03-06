//preencher estados e cidades no formulario usando a api do ibge

function populateUFs() {
	const ufSelect = document.querySelector("select[name=uf]")

	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( (res) => { return res.json() }).then( (states) => {
		
		for(state of states) {
			ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
		}
	} )	
}

populateUFs()

function getCities(event) {
	const citySelect = document.querySelector("[name=city]")
	const stateInput = document.querySelector("[name=state]")
	const ufValue = event.target.value
	const indexOfSelectedState = event.target.selectedIndex
	stateInput.value = event.target.options[indexOfSelectedState].text
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
`
	citySelect.innerHTML = "<option value>Selecione a cidade</option>"
	citySelect.disabled = true
	fetch(url).then( res => res.json() ).then( cities => {
		for(city of cities) {
			citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
		}
		citySelect.disabled = false
	})
}


document.querySelector("select[name=uf]")
		.addEventListener("change", getCities)

//items de coleta
const itemsToCollet = document.querySelectorAll(".items-grid li")

for (item of itemsToCollet ) {
	item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
	const itemId = event.target.dataset.id
	const itemLi = event.target
	//adicionar ou remover uma classe no li
	itemLi.classList.toggle("selected")

	//verificar se existem items selecionados
	//pegar os items selecionados

	const alreadySelected = selectedItems.findIndex( item => {
	 	const itemFound = item === itemId
	 	return itemFound
	})
	//se ja tiver sido selecionado, retirar da seleção
	if (alreadySelected >= 0) {
		const filteredItems = selectedItems.filter( item => {
			const itemIsDifferent = item != itemId 
			return itemIsDifferent
		})

		selectedItems = filteredItems 
	} else {
	//se não estiver selecionado, adicionar à seleção
		selectedItems.push(itemId)
	}
	//atualizar o campo que passa os items selecionados para o back-end
	collectedItems.value = selectedItems
}