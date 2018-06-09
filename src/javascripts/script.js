let myform = document.getElementById('myform');
let reader = new FileReader();
let table = document.getElementById('result-table');
let skip, lastIndex;
let select = document.getElementById('category');

myform.myfile.addEventListener('change', function (e) {
  reader.readAsText(e.target.files[0]);
  reader.addEventListener('load', function (ev) {
    datas = JSON.parse(ev.target.result);
    refine();
  });
});

const show = (arr) => {
  for (let i = 0, arrLength = arr.length; i < arrLength; i++) {
    createRecord(table, arr[i], i);
  }
}

const showPart10 = () => {
  skip = 10;
  lastIndex = 0;
  clearTable();
  showPart(0, skip);
}

const showPart30 = () => {
  skip = 30;
  lastIndex = 0;
  clearTable();
  showPart(0, skip);
}

const showPart = (begin, type) => {
  lastIndex += type;
  for (let i = begin; i < begin + Math.abs(type); i++) {
    createRecord(table, datas[i], i);
  }
}

const next = () => {
  clearTable();
  showPart(lastIndex, skip);
}

const previous = () => {
  clearTable();
  showPart(lastIndex - (2 * skip), (-1 * skip));
}

const createRecord = (table, data, count) => {
  let tr = table.insertRow(-1);

  tr.insertCell(-1).innerHTML = count + 1;
  tr.insertCell(-1).innerHTML = data.event_name;
  tr.insertCell(-1).innerHTML = data.category;
  tr.insertCell(-1).innerHTML = data.start_date;
  tr.insertCell(-1).innerHTML = data.end_date;
  tr.insertCell(-1).innerHTML = data.description;
  tr.insertCell(-1).innerHTML = data.schedule_description;
  tr.insertCell(-1).innerHTML = data.contact;
  tr.insertCell(-1).innerHTML = data.contact_phone_number;
  tr.insertCell(-1).innerHTML = data.event_place;
  tr.insertCell(-1).innerHTML = data.latitude;
  tr.insertCell(-1).innerHTML = data.longitude;
  tr.insertCell(-1).innerHTML = data.city;
}

const clearTable = () => {
  let recordLength = table.rows.length;
  for (let i = recordLength - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

const refine = () => {
  let tmp_arr = [];

  for (let i = 0; i < datas.length; i++) {
    tmp_arr.push(datas[i].category);
  }

  let addtional_option = Array.from(new Set(tmp_arr));

  for (let i = 0; i < addtional_option.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', addtional_option[i]);
    option.innerHTML = addtional_option[i];
    select.appendChild(option);
  }
}

const filter = arg => {
  clearTable();

  let tmp_arr = [];

  for (let i = 0; i < datas.length; i++) {
    if (arg === datas[i].category) {
      tmp_arr.push(datas[i]);
    }
  }

  show(tmp_arr);
}
