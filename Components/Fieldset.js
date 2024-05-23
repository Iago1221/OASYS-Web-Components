class Fieldset extends Recipient {

    init() {
        super.init();
        this.title = '';
    }

    styles() {
        const style = super.styles();
        style.textContent += `
            fieldset {
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 10px;
            }
            
        `;

        return style;
    }

    html() {
        const fieldset = document.createElement('fieldset');
        fieldset.appendChild(this.createLegend());

        this.components.forEach(component => {
            fieldset.appendChild(component.render());
        });

        return fieldset;
    }

    createLegend() {
        const legend = document.createElement('legend');
        legend.innerHTML = this.title;

        return legend;
    }

    setTitle(title) {
        this.title = title;
    }
}

customElements.define('fieldset-component', Fieldset);