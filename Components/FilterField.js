class FilterField extends Field {
    
    html() {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('field-div');
        fieldDiv.appendChild(this.createInput());

        return fieldDiv;
    }

    createInput() {
        const input = document.createElement('input');
        input.setAttribute('type', this.type);
        input.setAttribute('id', this.name);
        input.setAttribute('name', this.name);
        input.setAttribute('placeholder', this.title);
        
        return input;
    }
}

customElements.define('filter-field-component', FilterField);