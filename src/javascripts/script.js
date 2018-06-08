let myform = document.getElementById('myform');
let reader = new FileReader();

myform.myfile.addEventListener('change', function (e) {
  reader.readAsText(e.target.files[0]);
  reader.addEventListener('load', function (ev) {
    datas = JSON.parse(ev.target.result);
  });
});

const showAll = () => {
  let table = document.getElementById('result-table');

  for (let i = 0; i < datas.length; i++) {
    let data = datas[i];
    createRecord(table, data, i);
  }
}

const createRecord = (table, data, count) => {
  let tr = table.insertRow(-1);

  tr.insertCell(-1).innerHTML = count + 1;;
  tr.insertCell(-1).innerHTML = data.event_name;;
  tr.insertCell(-1).innerHTML = data.category;;
  tr.insertCell(-1).innerHTML = data.start_date;;
  tr.insertCell(-1).innerHTML = data.end_date;;
  tr.insertCell(-1).innerHTML = data.description;;
  tr.insertCell(-1).innerHTML = data.schedule_description;;
  tr.insertCell(-1).innerHTML = data.contact;;
  tr.insertCell(-1).innerHTML = data.contact_phone_number;;
  tr.insertCell(-1).innerHTML = data.event_place;;
  tr.insertCell(-1).innerHTML = data.latitude;;
  tr.insertCell(-1).innerHTML = data.longitude;;
  tr.insertCell(-1).innerHTML = data.city;;
}
