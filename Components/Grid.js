class Grid extends Recipient {

    init() {
        super.init();
        this.actions     = [];
        this.columns     = []; 
        this.rows        = []; 
        this.footerInfos = [];
        this.filters     = [];
    }

    addColum(colum) {
        this.columns.push(colum);
    }

    addRow(row) {
        this.rows.push(row);
    }

    setFooterInfos(footerInfos) {
        this.footerInfos = footerInfos;
    }

    addFilter(filter) {
        this.filters.push(filter);
    }

    resetRows() {
        this.rows = [];
    }

    resetFooterInfos() {
        this.footerInfos = [];
    }

    styles() {
        const style = super.styles();
        style.textContent += `            
            .grid {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            i {
                font-size: 16px;
                color: inherit;
                margin-right: 5px;
            }

            .main-table {
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%; 
            }

            .main-table td, .grid th {
                border: 1px solid #ddd;
                padding: 8px;
            }

            .main-table tr:nth-child(even) {
                background-color: #f2f2f2;
            }

            .main-table tr:hover {
                background-color: #ddd;
            }

            .main-table th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #04AA6D;
                color: white;
            }

            .grid header {
                display: flex;
                flex-direction: column;
                height: 20%;
                background-color: #efefef; 
                justify-content: space-between;
            }

            .top-header-div,
            .bottom-header-div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }

            .top-header-div ul {
                list-style: none;
                padding: 0;
                margin: 0.5em;
                display: flex;
                flex-wrap: wrap;
            }

            .bottom-header-div ul {
                list-style: none;
                padding: 0;
                margin: 0.5em;
                display: flex;
                flex-wrap: wrap;
            }
            
            .bottom-header-div li {
                margin: 0.5em;
            }

            .action,
            .atualizar {
                padding: 0.5em;
                background-color: #e0e0e0;
                border-radius: 0.2em;
                transition: background-color 0.3s ease;
            }

            .action:hover,
            .atualizar:hover {
                color: white;
                background-color: #04AA6D;
            }

            .action {
                margin-right: 0.5em;
            }

            .excluir:hover {
                color: white;
                background-color: red;
            }
            
            .grid main {
                height: 75%; 
                background-color: #FFFFFF;
            }

            .grid footer {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 5%;
                background-color: #efefef; 
            }

            .footer-div {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .footer-div ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
            }
            
            .footer-div li {
                margin: 0.5em;
            }
            
            .footer-div a {
                text-decoration: none;
                padding: 0.5em;
                background-color: #e0e0e0;
                border-radius: 0.2em;
                transition: background-color 0.3s ease;
            }

            .footer-div a:hover {
                color: white;
                background-color: #04AA6D;
            }
        `;

        return style;
    }

    html() {
        const grid = this.createGrid();

        grid.appendChild(this.createHeader());
        grid.appendChild(this.createMain());
        grid.appendChild(this.createFooter());

        this.components.forEach(component => {
            grid.appendChild(component.render());
        });

        return grid;
    }


    createGrid() {
        const grid = document.createElement('div');
        grid.classList.add('grid');
        return grid;
    }

    createHeader() {
        const header = document.createElement('header');
        
        const bottomHeaderDiv = document.createElement('div');
        bottomHeaderDiv.classList.add('bottom-header-div');

        const topHeaderDiv = document.createElement('div');
        topHeaderDiv.classList.add('top-header-div');

        const headerFitersUl = document.createElement('ul');

        this.filters.forEach(filter => {
            let elementFilterLi = document.createElement('li');
            elementFilterLi.classList.add('filter'); 
            elementFilterLi.appendChild(filter.render());
            headerFitersUl.appendChild(elementFilterLi);
        });
        
        topHeaderDiv.appendChild(headerFitersUl);

        const headerActionsUl = document.createElement('ul');

        this.actions.forEach(action => {
            let elementActionLi = document.createElement('li');
            let elementAction = document.createElement('a');
            
            elementAction.classList.add('action');
            
            if (action.title == 'Excluir') {
                elementAction.classList.add('excluir');
            }

            elementAction.addEventListener('click', this.doAjaxAction);
            elementAction.innerHTML = action.title;
            
            elementActionLi.appendChild(elementAction);
            headerActionsUl.appendChild(elementActionLi);
        });

        bottomHeaderDiv.appendChild(headerActionsUl);
        bottomHeaderDiv.appendChild(this.createAtualizar());

        header.appendChild(topHeaderDiv);
        header.appendChild(bottomHeaderDiv);
        
        return header;
    }

    createAtualizar() {
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-solid', 'fa-magnifying-glass');

        const headerAtualizarUl = document.createElement('ul');
        const headerAtualizarLi = document.createElement('li');
        const headerAtualizar = document.createElement('a');
        headerAtualizar.innerHTML = 'Atualizar';
        headerAtualizar.classList.add('atualizar');

        headerAtualizar.prepend(icon);

        headerAtualizarLi.appendChild(headerAtualizar);
        headerAtualizarUl.appendChild(headerAtualizarLi);

        return headerAtualizarUl;
    }

    createMain() {
        const main = document.createElement('main');
        main.appendChild(this.createTable());

        return main;
    }

    createTable() {
        const table = document.createElement('table');
        table.classList.add('main-table');

        table.appendChild(this.createTableHead());
        table.appendChild(this.createTableBody());

        return table;
    }

    createTableHead() {
        const tableHead = document.createElement('thead');
        const headTr = document.createElement('tr');
        
        const thSelect = document.createElement('th');
        thSelect.setAttribute('width' , '5%');

        headTr.appendChild(thSelect);

        this.columns.forEach(colum => {
            let th = document.createElement('th');
            th.setAttribute('visible', colum.visible);
            th.innerHTML = colum.title;
            headTr.appendChild(th);
        });

        tableHead.appendChild(headTr);

        return tableHead;
    }

    toggleRowCheckbox(event) {
        const checkbox = this.querySelector('input[type="checkbox"]');

        if (event.target != checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    }

    createTableBody() {
        const tableBody = document.createElement('tbody');

        this.rows.forEach(row => {
            let bodyTr = document.createElement('tr');
            bodyTr.appendChild(this.createTdSelect(row.id));

            this.columns.forEach(colum => {
                let td = document.createElement('td');
                td.setAttribute('visible', colum.visible);
                td.innerHTML = row[colum.name];
                bodyTr.appendChild(td);
            });

            bodyTr.addEventListener('click', this.toggleRowCheckbox);

            tableBody.appendChild(bodyTr);
        });

        return tableBody;
    }

    createTdSelect(id) {
        const tdSelect = document.createElement('td');
        tdSelect.setAttribute('width' , '5%');
        const checkBoxTdSelect = document.createElement('input');
        checkBoxTdSelect.setAttribute('type', 'checkbox');
        checkBoxTdSelect.setAttribute('id', id);
        tdSelect.appendChild(checkBoxTdSelect);

        return tdSelect;
    }

    createFooter() {
        const footer = document.createElement('footer');
        const footerDiv = document.createElement('div');
        footerDiv.classList.add('footer-div');

        const footerUl = document.createElement('ul');

        const footerInfos = ['<< ', '< ', this.footerInfos[0], ' de ', this.footerInfos[1], ' >', ' >> ', `Resultados: ${this.footerInfos[2]}`];

        footerInfos.forEach(info => {
            footerUl.appendChild(this.createFooterComponent(info));
        });
        
        footerDiv.appendChild(footerUl);
        footer.appendChild(footerDiv);

        return footer;
    }

    createFooterComponent(html) {
        const componentLi = document.createElement('li');
        const component = document.createElement('a');
        component.classList.add('footer-component');
        component.innerHTML = html;

        componentLi.appendChild(component);

        return componentLi;
    }

    addAction(title, route) {
        this.actions.push({title: title, route: route});
    }

    addActionIncluir(route) {
        this.addAction('Incluir', route);
    }

    addActionEditar(route) {
        this.addAction('Editar', route);
    }

    addActionExcluir(route) {
        this.addAction('Excluir', route);
    }
}

customElements.define('grid-component', Grid);