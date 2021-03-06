import Component from '../framework/Component';
import ItemModel from '../model/ItemModel';
import {CLOSE_FORM} from '../events';

interface EditOptions {
	model: ItemModel;
}

export default class Edit extends Component {

	constructor(private options: EditOptions) {
		super();
	}

	render(): string {
		const {name, phoneNumber, isNew} = this.options.model;

		return `<div class="card">
			<div class="card-body">
				${isNew ? `
					<h4 class="card-title">Новый контакт</h4>
				` : `
					<h4 class="card-title">Редактирование</h4>
					<h6 class="card-subtitle mb-2 text-muted">${name}</h6>`
				}
				<form>
				  <div class="form-group">
					<label for="nameInput">Имя</label>
					<input 
						autofocus
						class="form-control" 
						id="nameInput" 
						name="name" 
						placeholder="Иноконтактий Новинских" 
						value="${name}"
					>
				  </div>
				  <div class="form-group mb-4">
					<label for="phoneInput">Номер телефона</label>
					<input 
						type="phone" 
						class="form-control" 
						name="phoneNumber" 
						id="phoneInput"
						placeholder="+7 (916) 123-45-67" 
						value="${phoneNumber}"
					>
				  </div>
				  <div class="form-group m-0">
					<button type="submit" class="btn btn-primary">Сохранить</button>
					<button type="button" data-name="cancel" class="btn btn-secondary">Отмена</button>
				  </div>
				</form>
			</div>
		</div>`;
	}

	get formElement() {
		return this.domElement.querySelector('form');
	}

	get cancelButtonElement() {
		return this.domElement.querySelector('[data-name="cancel"]');
	}

	handleSubmit = () => {
		const {options, formElement} = this;
		const {model} = options;

		model.name = formElement.name.value;
		model.phoneNumber = formElement.phoneNumber.value;

		model.save();

		return this.triggerEvent(CLOSE_FORM);
	};

	handleCancel = () => {
		const {options} = this;
		const {model} = options;

		model.reset();

		this.triggerEvent(CLOSE_FORM)
	};

	onRender() {
		const {cancelButtonElement, formElement} = this;

		formElement.onsubmit = this.handleSubmit;
		cancelButtonElement.onclick = this.handleCancel;
	}
}
