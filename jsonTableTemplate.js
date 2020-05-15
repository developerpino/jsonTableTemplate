const jsonTemplate = {
    getHTML : (type, name, value, title, max, defaultValue, pointer, jsonKey) => {
        if (type==='text') {
            return `<input type='text' class='fText inputTextFull' name='${name}' value='${value}' title='${title}' maxlength='${max}' placeholder="" data-key='${jsonKey}'/>`;
        } else if (type==='checkbox') {
            return `<label class='gLabel'><input type='checkbox' class='' name='${name}' value='${defaultValue}' data-key='${jsonKey}' ${value==='Y' ? 'checked' : ''}> ${__(title)}</label>`;
        } else if (type==='numberingText') {
            return `${defaultValue}<span class='json_numbering'>${pointer+1}</span>`;
        } else if (type==='select') {
            let selectHTML = `<select class='jsonSelect' name='${name}' title='${title}' data-key='${jsonKey}'>`;

            for (let [k, o] of Object.entries(defaultValue)) {
                const selectedHTML = k===value ? 'selected' : '';
                selectHTML += `<option value='${k}' ${selectedHTML}>${o}</option>`
            }

            selectHTML += '</select>';

            return selectHTML;
        } else {
            return type;
        }
    },
    removeAll : (id) => {
        const targetLength = document.querySelector(`#${id}`).rows.length;
        for (let idx=0;idx<targetLength;idx++) {
            document.querySelector(`#${id}`).deleteRow(0);
        }
    },
    addRow : (id, data) => {
        let table = document.querySelector(`#${id}`);
        let maxRowLength = table.getAttribute('max-row-length') || 10;
        const pointer = table.rows.length;
        if (pointer<maxRowLength) {
            fields = table.dataset.fields || '';
            data = data || [];
            if (fields.length>0) {
                let decodeFields = JSON.parse(fields);
                let row = table.insertRow(pointer);
                let idx = 0;

                for (let [k, v] of Object.entries(decodeFields)) {
                    row.insertCell(idx).innerHTML = jsonTemplate.getHTML(
                        v.type,
                        `${id}_${idx}`,
                        typeof data[k]==='string' ? data[k] : '',
                        v.title || '',
                        v.max || 0,
                        v.default || '',
                        pointer,
                        k
                    );
                    idx++;
                }

                let lastCell = row.insertCell(idx);
                let tmpMinusStyle = pointer===0 ? 'display:none;' : '';
                let tmpPlusStyle = pointer===maxRowLength-1 ? 'display:none;' : '';

                lastCell.innerHTML += `<a href='#none' class='btnIcon icoMinus' onclick="jsonTemplate.deleteRow('${id}', '${pointer}')" style="${tmpMinusStyle}"><span>삭제</span></a>`;
                lastCell.innerHTML += ` <a href='#none' class='btnIcon icoPlus' onclick="jsonTemplate.addRow('${id}')" style="${tmpPlusStyle}"><span>추가</span></a>`;
                row.setAttribute('pointer', pointer);
                jsonTemplate.afterDrawRow(id, pointer, 'add');
            }
        } else {
            STF.notify(maxRowLength+__('개 까지 입력 가능합니다.'));
        }
    },
    deleteRow : (id, pointer) => {
        document.querySelector(`#${id}`).deleteRow(pointer);
        jsonTemplate.reOrderPointer(id);
        jsonTemplate.afterDrawRow(id, document.querySelector(`#${id}`).rows.length, 'delete');
    },
    afterDrawRow : function (id, pointer, type) {
        // row 가 그려진 이후 minus, plus 버튼을 control 해주기 위한 logic
        if (type==='add') {
            // 첫번째 row 가 추가되는 경우가 아니라면 minus 버튼을 살리고 plus 버튼을 없앤다.(마지막 row 에만 plus 버튼이 존재하기 위함)
            if (pointer>0) {
                document.querySelector(`#${id} .icoMinus`).style.display = '';
                document.querySelector(`#${id} .icoPlus`).style.display = 'none';
                document.querySelectorAll(`#${id} .icoPlus`)[pointer-1].style.display = 'none';
            }
        } else {
            // 첫번째 row 만 남는 경우 minus 버튼을 plus 버튼으로 교체 해준다.
            if (pointer===1) {
                document.querySelector(`#${id} .icoMinus`).style.display = 'none';
                document.querySelector(`#${id} .icoPlus`).style.display = '';
            } else {
                // 삭제 후 마지막 row 의 plus 버튼은 무조건 노출될 수 있게 해주기 위함
                document.querySelectorAll(`#${id} .icoPlus`)[pointer-1].style.display = '';
            }
        }
    },
    reOrderPointer : (id) => {
        let pointer = 0;
        document.querySelectorAll(`#${id} tr`).forEach(row=>{
            row.lastElementChild.firstElementChild.setAttribute('onclick',`jsonTemplate.deleteRow('${id}', '${pointer}')`);
            row.setAttribute('pointer', pointer);

            // 단순 text 가 numbering 되어야 하는 경우에 대한 예외 처리 logic (ex: 추가이미지1, 추가이미지2, 추가이미지3)
            if (row.firstElementChild.firstElementChild!==null && row.firstElementChild.firstElementChild.classList.contains('json_numbering')) {
                row.firstElementChild.firstElementChild.innerHTML = `${pointer+1}`;
            }
            pointer++;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('tbody[json-table-template]').forEach(root => {
        if (root.rows.length===0) {
            jsonTemplate.addRow(root.id);
        }
    });
});