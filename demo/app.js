document.addEventListener('DOMContentLoaded', () => {
    const exampleJsonData = '[{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""},{"KO":"1111","EN":"2222","JP":"3333","CN":"4444444","TW":"555555","category_no":"","collect_standard_overseas":"","collect_standard_default_shop":"안녕? 반가워!","url":"안녕? 반가워!","is_use":"Y","used_date":""}]'
    const exampleId = 'category_fix_json'

    document.getElementById('btnSetData').addEventListener('click', () => {
        const jsonData = JSON.parse(exampleJsonData)
        if (typeof jsonData==='object') {
            jsonTemplate.removeAll(exampleId);

            if (jsonData.length>0) {
                jsonData.forEach(row => {
                    jsonTemplate.addRow(exampleId, row);
                });
            } else {
                jsonTemplate.addRow(exampleId);
            }
        }
    })
});