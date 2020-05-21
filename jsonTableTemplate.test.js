const jsonTemplate = require('./jsonTableTemplate');

test ('defined check- getHTML', () => {
    expect(typeof jsonTemplate.getHTML).toBe('function');
})

test ('defined check- removeAll', () => {
    expect(typeof jsonTemplate.removeAll).toBe('function');
})

test ('defined check- addRow', () => {
    expect(typeof jsonTemplate.addRow).toBe('function');
})

test ('defined check- deleteRow', () => {
    expect(typeof jsonTemplate.deleteRow).toBe('function');
})

test ('defined check- afterDrawRow', () => {
    expect(typeof jsonTemplate.afterDrawRow).toBe('function');
})

test ('defined check- reOrderPointer', () => {
    expect(typeof jsonTemplate.reOrderPointer).toBe('function');
})
