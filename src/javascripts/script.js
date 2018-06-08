let myform = document.getElementById('myform');
let reader = new FileReader();

myform.myfile.addEventListener('change', function (e) {
  reader.readAsText(e.target.files[0]);
  reader.addEventListener('load', function (ev) {
    datas = JSON.parse(ev.target.result);
  });
});

function showAll() {
  let table = document.getElementById('result-table');

  for (let i = 0; i < datas.length; i++) {
    let tmp = datas[i];

    let tr = table.insertRow(-1);

    let td1 = tr.insertCell(-1);
    let td2 = tr.insertCell(-1);
    let td3 = tr.insertCell(-1);
    let td4 = tr.insertCell(-1);
    let td5 = tr.insertCell(-1);
    let td6 = tr.insertCell(-1);
    let td7 = tr.insertCell(-1);
    let td8 = tr.insertCell(-1);
    let td9 = tr.insertCell(-1);
    let td10 = tr.insertCell(-1);
    let td11 = tr.insertCell(-1);
    let td12 = tr.insertCell(-1);
    let td13 = tr.insertCell(-1);

    td1.innerHTML = i + 1;
    td2.innerHTML = tmp.event_name;
    td3.innerHTML = tmp.category;
    td4.innerHTML = tmp.start_date;
    td5.innerHTML = tmp.end_date;
    td6.innerHTML = tmp.description;
    td7.innerHTML = tmp.schedule_description;
    td8.innerHTML = tmp.contact;
    td9.innerHTML = tmp.contact_phone_number;
    td10.innerHTML = tmp.event_place;
    td11.innerHTML = tmp.latitude;
    td12.innerHTML = tmp.longitude;
    td13.innerHTML = tmp.city;
  }
}
