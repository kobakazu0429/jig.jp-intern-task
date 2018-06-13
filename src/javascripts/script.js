let myform = document.getElementById('myform');
let reader = new FileReader();
let table = document.getElementById('result-table');
let tbody = document.getElementById('result-table-body');
let ths = document.getElementsByTagName('th');
let skip, lastIndex;
let select = document.getElementById('category');

myform.myfile.addEventListener('change', function (e) {
  reader.readAsText(e.target.files[0]);
  reader.addEventListener('load', function (ev) {
    datas = JSON.parse(ev.target.result);
    refine();
    show(datas);
    createEventListener();
  });
});

const show = (arr) => {
  lastIndex = 0;
  for (let i = 0, arrLength = arr.length; i < arrLength; i++) {
    createRow(arr[i], i);
  }
}

const showPart10 = () => {
  skip = 10;
  lastIndex = 0;
  clearTBody();
  showPart(0, skip);
}

const showPart30 = () => {
  skip = 30;
  lastIndex = 0;
  clearTBody();
  showPart(0, skip);
}

const showPart = (begin, type) => {
  lastIndex += type;
  for (let i = begin; i < begin + Math.abs(type); i++) {
    createRow(datas[i], i);
  }
}

const next = () => {
  clearTBody();
  showPart(lastIndex, skip);
}

const previous = () => {
  clearTBody();
  showPart(lastIndex - (2 * skip), (-1 * skip));
}

const createRow = (data, count) => {
  if (count < 0) {
    lastIndex = 0;
    return;
  }

  let tr = tbody.insertRow(-1);

  tr.insertCell(-1).innerHTML = count + 1;
  tr.insertCell(-1).innerHTML = data.event_name;
  tr.insertCell(-1).innerHTML = data.category;
  tr.insertCell(-1).innerHTML = data.start_date;
  tr.insertCell(-1).innerHTML = data.end_date;
  tr.insertCell(-1).innerHTML = data.description;
  tr.insertCell(-1).innerHTML = data.schedule_description;
  tr.insertCell(-1).innerHTML = data.contact;
  tr.insertCell(-1).innerHTML = data.contact_phone_number;
  tr.insertCell(-1).innerHTML = data.event_place + createGoogleMapsURL(data.latitude, data.longitude);
  tr.insertCell(-1).innerHTML = data.city;
}

const clearTBody = () => {
  let rowLength = tbody.rows.length;
  for (let i = rowLength; i > 0; i--) {
    tbody.deleteRow(-1);
  }
}

const refine = () => {
  let tmp_arr = [];

  for (let i = 0, datasLength = datas.length; i < datasLength; i++) {
    tmp_arr.push(datas[i].category);
  }

  let addtional_option = Array.from(new Set(tmp_arr));

  for (let i = 0, addLen = addtional_option.length; i < addLen; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', addtional_option[i]);
    option.innerHTML = addtional_option[i];
    select.appendChild(option);
  }
}

const filter = arg => {
  clearTBody();

  let tmp_arr = [];

  for (let i = 0, datasLength = datas.length; i < datasLength; i++) {
    if (arg === datas[i].category) {
      tmp_arr.push(datas[i]);
    }
  }

  show(tmp_arr);
}

const search = query => {
  clearTBody();

  reg = new RegExp(query);
  let tmp_arr = [];

  for (let i = 0, datasLength = datas.length; i < datasLength; i++) {
    if (reg.test(datas[i].event_name)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].category)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].start_date)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].end_date)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].description)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].schedule_description)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].contact)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].contact_phone_number)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].event_place)) {
      tmp_arr.push(datas[i]);
    } else if (reg.test(datas[i].city)) {
      tmp_arr.push(datas[i]);
    }
  }

  if (tmp_arr.length === 0) show([{ "event_name": "一致するものがありませんでした", "category": "", "start_date": "", "end_date": "", "description": "", "schedule_description": "", "contact": "", "contact_phone_number": "", "event_place": "", "latitude": "", "longitude": "", "city": "" }]);

  show(tmp_arr);
}

const createGoogleMapsURL = (lat, lon) => {
  return '<br><a href="https://www.google.com/maps?q=' + lat + ',' + lon + '" target="_blank">GoogleMapsで確認する</a>';
}

const createEventListener = () => {
  for (let i = 0, thsLen = ths.length; i < thsLen; i++) {
    ths[i].addEventListener("click", sortEvent(table.tBodies[0], i));
  }
}

const sortEvent = (tbody, idx) => {
  let mode = true;
  return () => {
    mode ? sort(tbody, asc(idx)) : sort(tbody, desc(idx));
    mode = !mode;
  }
}

const sort = (tbody, compareFunction) => {
  const rows = tbody.rows;
  if (!rows || !rows[0] || rows.length == 1) return;

  const rowLen = rows.length;
  const tmp_arr = [];

  for (let row of rows) tmp_arr.push(row);

  tmp_arr.sort(compareFunction);

  for (let i = rowLen - 1; i > 0; i--) tbody.insertBefore(tmp_arr[i - 1], tmp_arr[i]);
}

const numConvert = s => (s == Number(s)) ? Number(s) : s;

const getValue = (tr, idx) => tr.children[idx].innerText;

const asc = idx => (a, b) => (numConvert(getValue(a, idx)) > numConvert(getValue(b, idx))) ? 1 : -1;
const desc = idx => (a, b) => (numConvert(getValue(a, idx)) < numConvert(getValue(b, idx))) ? 1 : -1;
