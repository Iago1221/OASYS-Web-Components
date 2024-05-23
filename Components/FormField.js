class FormField extends Field {
    
    html() {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('field-div');
        fieldDiv.appendChild(this.createLabel());
        fieldDiv.appendChild(this.createInput());

        return fieldDiv;
    }

    createLabel() {
        const label = document.createElement('label');
        label.innerHTML = this.title + ':';
        label.setAttribute('for', this.name);
        return label;
    }

    createInput() {
        const input = document.createElement('input');
        input.setAttribute('type', this.type);
        input.setAttribute('id', this.name);
        input.setAttribute('name', this.name);
        
        return input;
    }
}

customElements.define('form-field-component', FormField);