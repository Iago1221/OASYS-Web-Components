class Form extends Recipient {

    init() {
        super.init();
        this.title = '';
        this.name = '';
        this.draggableForm = false;
    }

    styles() {
        const style = super.styles();
        style.textContent += `

            form {
                margin: 0 auto;
                padding: 1em;
                border: 1px solid #04AA6D;
                border-radius: 10px;
                background-color: #f9f9f9;
                position: relative;
                width: 100%;
                height: 100%;
            }
            
            form::before {
                content: attr(data-title);
                display: block;
                width: 100%;
                padding: 0.5em;
                background-color: #04AA6D;
                color: white;
                font-size: 1em;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                box-sizing: border-box;
                margin-bottom: 2em;
                position: absolute;
                top: 0;
                left: 0;
            }

            fieldset.principal-fieldset {
                margin-top: 2em;
                padding: 1em;
                border: 1px solid #04AA6D;
                border-radius: 10px;
                background-color: #f9f9f9;
            }

            input[type="text"],
            input[type="email"],
            input[type="password"],
            textarea {
                width: 100%;
                padding: 0.5em;
                margin: 0.5em 0;
                border: 1px solid #04AA6D;
                border-radius: 5px;
                box-sizing: border-box;
            }
            
            input[type="submit"],
            button {
                background-color: #04AA6D;
                color: white;
                padding: 0.4em 0.6em;
                margin: 0 5px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1em;
                transition: background-color 0.3s ease;
            }
            
            input[type="submit"]:hover,
            button:hover {
                background-color: #038a5c;
            }

            .button-cancel {
                color: black;
                border: 1px solid #04AA6D;
                background-color: #f9f9f9;
            }

            .button-cancel:hover {
                color: #FFF;
                background-color: #04AA6D;
            }
            
            label {
                font-size: 1em;
                color: #333;
            }
            
            input:required,
            textarea:required {
                border-left: 0.5em solid #04AA6D;
            }
            
            .error {
                color: #ff0000;
                font-size: 1em;
            }
            
            select {
                width: 100%;
                padding: 1em;
                margin: 1em 0;
                border: 1px solid #04AA6D;
                border-radius: 5px;
                background-color: white;
                box-sizing: border-box;
            }
            
            form.side-by-side .field-div {
                display: flex;
                justify-content: space-between;
            }
            
            form.side-by-side .field-div > div {
                flex: 1;
                margin: 0 1em;
            }
            
            form.side-by-side .field-div > div:first-child {
                margin-left: 0;
            }
            
            form.side-by-side .field-div > div:last-child {
                margin-right: 0;
            }
            
            form.stacked .field-div {
                display: block;
            }
            
            form.stacked .field-div > div {
                margin: 1em 0;
            }

            form > div {
                display: flex;
                justify-content: flex-end;
                margin-top: 1em;
                padding-top: 1em;
                border-top: 1px solid #e0e0e0;
            }
            
            form > div > input[type="submit"],
            form > div > button {
                margin: 0 0.5em;
            }
        `;

        return style;
    }
    
    html() {
        const form = document.createElement('form');
        form.classList.add('form', 'stacked');
        form.setAttribute('data-title', this.title);
        
        const formFieldset = document.createElement('fieldset');
        formFieldset.classList.add('principal-fieldset');
        
        this.components.forEach(component => {
            formFieldset.appendChild(component.render());
        });

        form.appendChild(formFieldset);
        form.appendChild(this.createButtons());

        return form;
    }

    createButtons() {
        const buttonsDiv = document.createElement('div');
        
        const buttonConfirm = document.createElement('input');
        buttonConfirm.setAttribute('type', 'submit');
        buttonConfirm.value = 'Confirmar';

        const buttonCancel = document.createElement('button');
        buttonCancel.setAttribute('type', 'button');
        buttonCancel.textContent = 'Cancelar';
        buttonCancel.classList.add('button-cancel');

        buttonsDiv.appendChild(buttonConfirm);
        buttonsDiv.appendChild(buttonCancel);

        return buttonsDiv;
    }

    setTitle(title) {
        this.title = title;
    }
}

customElements.define('form-component', Form);
